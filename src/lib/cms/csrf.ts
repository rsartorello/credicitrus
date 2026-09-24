import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getAdminCredentials } from "./config";
import { CSRF_COOKIE, CSRF_HEADER } from "./csrf-constants";

export { CSRF_COOKIE, CSRF_HEADER } from "./csrf-constants";

function signCsrf(token: string, secret: string): string {
  return createHash("sha256").update(`${token}.${secret}`).digest("hex").slice(0, 32);
}

export function createCsrfToken(): string {
  return randomBytes(24).toString("base64url");
}

export async function ensureCsrfCookie(): Promise<string> {
  const creds = getAdminCredentials();
  if (!creds.secret) throw new Error("ADMIN_AUTH_SECRET não configurado");

  const store = await cookies();
  const existing = store.get(CSRF_COOKIE)?.value;
  if (existing && existing.includes(".")) {
    return existing.split(".")[0]!;
  }

  const token = createCsrfToken();
  const signed = `${token}.${signCsrf(token, creds.secret)}`;
  store.set(CSRF_COOKIE, signed, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return token;
}

export function readCsrfTokenFromCookieValue(raw: string | undefined): string | null {
  if (!raw) return null;
  const [token, sig] = raw.split(".");
  if (!token || !sig) return null;
  const creds = getAdminCredentials();
  if (!creds.secret) return null;
  const expected = signCsrf(token, creds.secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return token;
}

export function assertCsrf(request: NextRequest): void {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") return;

  const header = request.headers.get(CSRF_HEADER)?.trim();
  const cookieRaw = request.cookies.get(CSRF_COOKIE)?.value;
  const cookieToken = readCsrfTokenFromCookieValue(cookieRaw);

  if (!header || !cookieToken) {
    throw new Error("FORBIDDEN");
  }

  const a = Buffer.from(header);
  const b = Buffer.from(cookieToken);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new Error("FORBIDDEN");
  }
}

export function csrfErrorResponse() {
  return NextResponse.json({ error: "Token CSRF inválido" }, { status: 403 });
}
