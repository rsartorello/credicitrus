import { NextResponse } from "next/server";
import { ensureCsrfCookie } from "@/lib/cms/csrf";

export async function GET() {
  try {
    const token = await ensureCsrfCookie();
    return NextResponse.json(
      { token },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Não foi possível emitir CSRF" },
      { status: 500 },
    );
  }
}
