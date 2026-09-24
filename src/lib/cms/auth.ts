import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAdminCredentials, isEnvBootstrapAllowed } from "./config";
import { ensureCsrfCookie } from "./csrf";
import { MAX_PASSWORD_LENGTH, verifyPassword } from "./password";
import {
  assertModuleAccess,
  fullPermissions,
  type CmsSession,
  type PermissionModule,
} from "./permissions";
import {
  changeOwnPassword,
  getUserById,
  getUserByUsername,
  listUserPermissions,
} from "./users";

export const ADMIN_COOKIE = "cms_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

type TokenPayload = {
  userId: number | null;
  username: string;
  sv: number;
  ts: number;
};

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

function buildToken(payload: TokenPayload, secret: string): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body, secret)}`;
}

function parseToken(token: string, secret: string): TokenPayload | null {
  try {
    const [body, signature] = token.split(".");
    if (!body || !signature) return null;
    const expected = sign(body, secret);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as TokenPayload;

    const ageMs = Date.now() - Number(payload.ts);
    if (!Number.isFinite(ageMs) || ageMs < 0 || ageMs > MAX_AGE_SECONDS * 1000) {
      return null;
    }
    if (!payload.username) return null;
    if (!Number.isFinite(Number(payload.sv))) return null;
    return { ...payload, sv: Number(payload.sv) };
  } catch {
    return null;
  }
}

function safeEqualString(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    const pad = Buffer.alloc(Math.max(bufA.length, 1));
    timingSafeEqual(pad, pad);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

async function setSessionCookie(payload: TokenPayload): Promise<void> {
  const creds = getAdminCredentials();
  if (!creds.secret || creds.secret.length < 32) {
    throw new Error("ADMIN_AUTH_SECRET inválido (mín. 32 caracteres)");
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, buildToken(payload, creds.secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  await ensureCsrfCookie();
}

export async function loginAdmin(
  username: string,
  password: string,
): Promise<boolean> {
  const login = username.trim().toLowerCase();
  if (!login || !password) return false;
  if (password.length > MAX_PASSWORD_LENGTH) return false;

  try {
    const dbUser = await getUserByUsername(login);
    if (dbUser && dbUser.IsActive) {
      const ok = await verifyPassword(password, dbUser.PasswordHash);
      if (!ok) return false;
      await setSessionCookie({
        userId: dbUser.Id,
        username: dbUser.Username,
        sv: dbUser.SessionVersion,
        ts: Date.now(),
      });
      return true;
    }
  } catch {
    // DB pode estar indisponível; tenta bootstrap do .env
  }

  if (!isEnvBootstrapAllowed()) return false;

  const creds = getAdminCredentials();
  if (!creds.password || !creds.secret || creds.secret.length < 32) return false;
  if (
    !safeEqualString(login, creds.username.toLowerCase()) ||
    !safeEqualString(password, creds.password)
  ) {
    return false;
  }

  await setSessionCookie({
    userId: null,
    username: creds.username,
    sv: 0,
    ts: Date.now(),
  });
  return true;
}

export async function logoutAdmin(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function getAdminSession(): Promise<CmsSession | null> {
  const creds = getAdminCredentials();
  if (!creds.secret || creds.secret.length < 32) return null;

  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return null;

  const payload = parseToken(token, creds.secret);
  if (!payload) return null;

  if (payload.userId == null) {
    if (!isEnvBootstrapAllowed()) return null;
    if (payload.username !== creds.username) return null;
    return {
      userId: null,
      username: creds.username,
      isSuperAdmin: true,
      isEnvAdmin: true,
      mustChangePassword: false,
      permissions: fullPermissions(),
    };
  }

  try {
    const user = await getUserById(payload.userId);
    if (!user || !user.IsActive) return null;
    if (user.SessionVersion !== payload.sv) return null;
    return {
      userId: user.Id,
      username: user.Username,
      isSuperAdmin: user.IsSuperAdmin,
      isEnvAdmin: false,
      mustChangePassword: user.MustChangePassword,
      permissions: user.IsSuperAdmin
        ? fullPermissions()
        : await listUserPermissions(user.Id),
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession(options?: {
  /** Permite sessão com MustChangePassword (me / change-password / logout). */
  allowMustChangePassword?: boolean;
}): Promise<CmsSession> {
  const session = await getAdminSession();
  if (!session) throw new Error("UNAUTHORIZED");
  if (session.mustChangePassword && !options?.allowMustChangePassword) {
    throw new Error("PASSWORD_CHANGE_REQUIRED");
  }
  return session;
}

export async function completePasswordChange(
  currentPassword: string,
  newPassword: string,
): Promise<CmsSession> {
  const session = await requireAdminSession({ allowMustChangePassword: true });
  if (session.userId == null) {
    throw new Error("Troca de senha indisponível para admin via .env");
  }

  const { sessionVersion } = await changeOwnPassword(
    session.userId,
    currentPassword,
    newPassword,
  );

  await setSessionCookie({
    userId: session.userId,
    username: session.username,
    sv: sessionVersion,
    ts: Date.now(),
  });

  const refreshed = await getAdminSession();
  if (!refreshed) throw new Error("UNAUTHORIZED");
  return refreshed;
}

export function sessionErrorResponse(error: unknown) {
  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    if (error.message === "PASSWORD_CHANGE_REQUIRED") {
      return NextResponse.json(
        {
          error: "É necessário trocar a senha antes de continuar",
          code: "PASSWORD_CHANGE_REQUIRED",
        },
        { status: 403 },
      );
    }
    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }
  }
  return NextResponse.json({ error: "Erro interno" }, { status: 500 });
}

export function requireModule(
  session: CmsSession,
  module: PermissionModule,
  level: "view" | "edit" | "publish",
) {
  assertModuleAccess(session, module, level);
}
