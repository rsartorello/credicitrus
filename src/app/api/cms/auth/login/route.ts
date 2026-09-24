import { NextRequest, NextResponse } from "next/server";
import { loginAdmin } from "@/lib/cms/auth";
import { ensureCsrfCookie } from "@/lib/cms/csrf";
import { writeAuditLog } from "@/lib/cms/documents";
import {
  checkRateLimit,
  clientIpFromRequest,
  rateLimitResponse,
  resetRateLimit,
} from "@/lib/cms/rate-limit";
import { assertSameOrigin } from "@/lib/cms/security";
import { MAX_PASSWORD_LENGTH } from "@/lib/cms/password";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
  } catch {
    return NextResponse.json({ error: "Origem não permitida" }, { status: 403 });
  }

  const ip = clientIpFromRequest(request);
  const ipLimited = checkRateLimit(`cms:login:ip:${ip}`, {
    limit: 8,
    windowMs: 15 * 60 * 1000,
    blockMs: 15 * 60 * 1000,
  });
  if (!ipLimited.ok) {
    return rateLimitResponse(ipLimited.retryAfterSec);
  }

  const body = await request.json().catch(() => ({}));
  const username = String(body.username ?? "").slice(0, 64);
  const password = String(body.password ?? "");
  const loginKey = username.trim().toLowerCase() || "unknown";

  const userLimited = checkRateLimit(`cms:login:user:${loginKey}`, {
    limit: 6,
    windowMs: 15 * 60 * 1000,
    blockMs: 30 * 60 * 1000,
  });
  if (!userLimited.ok) {
    await writeAuditLog({
      actor: loginKey,
      action: "login_locked",
      entityType: "Auth",
      details: `ip=${ip}`,
    });
    return rateLimitResponse(userLimited.retryAfterSec);
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    await writeAuditLog({
      actor: loginKey,
      action: "login_fail",
      entityType: "Auth",
      details: `ip=${ip}`,
    });
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const ok = await loginAdmin(username, password);
  if (!ok) {
    await writeAuditLog({
      actor: loginKey,
      action: "login_fail",
      entityType: "Auth",
      details: `ip=${ip}`,
    });
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  resetRateLimit(`cms:login:user:${loginKey}`);
  await ensureCsrfCookie();
  await writeAuditLog({
    actor: loginKey,
    action: "login_success",
    entityType: "Auth",
    details: `ip=${ip}`,
  });

  const { getAdminSession } = await import("@/lib/cms/auth");
  const session = await getAdminSession();

  return NextResponse.json({
    ok: true,
    mustChangePassword: Boolean(session?.mustChangePassword),
  });
}
