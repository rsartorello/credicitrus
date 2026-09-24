import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/cms/auth";
import { ensureCsrfCookie } from "@/lib/cms/csrf";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  let csrfToken: string | null = null;
  try {
    csrfToken = await ensureCsrfCookie();
  } catch {
    csrfToken = null;
  }

  return NextResponse.json({
    authenticated: true,
    username: session.username,
    userId: session.userId,
    isSuperAdmin: session.isSuperAdmin,
    isEnvAdmin: session.isEnvAdmin,
    permissions: session.permissions,
    csrfToken,
  });
}
