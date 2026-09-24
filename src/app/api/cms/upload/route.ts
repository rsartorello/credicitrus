import { NextRequest, NextResponse } from "next/server";
import {
  requireAdminSession,
  requireModule,
  sessionErrorResponse,
} from "@/lib/cms/auth";
import { enforceCmsMutationGuards } from "@/lib/cms/api-guard";
import { isUploadModule, saveUpload } from "@/lib/cms/storage";
import { writeAuditLog } from "@/lib/cms/documents";
import { isPermissionModule } from "@/lib/cms/permissions";

export async function POST(request: NextRequest) {
  try {
    const blocked = enforceCmsMutationGuards(request, {
      keyPrefix: "cms:upload",
      limit: 40,
      windowMs: 60_000,
    });
    if (blocked) return blocked;

    const session = await requireAdminSession();
    const form = await request.formData();
    const module = String(form.get("module") ?? "");
    const file = form.get("file");

    if (!isUploadModule(module)) {
      return NextResponse.json({ error: "Módulo de upload inválido" }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Arquivo obrigatório" }, { status: 400 });
    }

    if (isPermissionModule(module)) {
      requireModule(session, module, "edit");
    }

    const saved = await saveUpload(module, file);
    await writeAuditLog({
      actor: session.username,
      action: "upload",
      entityType: "File",
      details: saved.relativePath,
    });
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    if (error instanceof Error && !["UNAUTHORIZED", "FORBIDDEN"].includes(error.message)) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return sessionErrorResponse(error);
  }
}
