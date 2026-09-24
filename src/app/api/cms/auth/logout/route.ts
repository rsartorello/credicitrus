import { NextResponse } from "next/server";
import { logoutAdmin } from "@/lib/cms/auth";
import { enforceCmsMutationGuards } from "@/lib/cms/api-guard";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const blocked = enforceCmsMutationGuards(request, {
    keyPrefix: "cms:logout",
    limit: 30,
  });
  if (blocked) return blocked;

  await logoutAdmin();
  return NextResponse.json({ ok: true });
}
