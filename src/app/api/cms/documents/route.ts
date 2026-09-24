import { NextRequest, NextResponse } from "next/server";
import {
  requireAdminSession,
  requireModule,
  sessionErrorResponse,
} from "@/lib/cms/auth";
import { enforceCmsMutationGuards } from "@/lib/cms/api-guard";
import {
  createDocument,
  getCategoryById,
  listDocuments,
  writeAuditLog,
} from "@/lib/cms/documents";
import type { CmsModule } from "@/lib/cms/types";
import { isPermissionModule } from "@/lib/cms/permissions";
import { toPublicUrl } from "@/lib/cms/storage";
import { sanitizeExternalUrl } from "@/lib/cms/security";
import {
  assertManagedUploadPath,
  uploadModuleFromPath,
} from "@/lib/cms/upload-path";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdminSession();
    const module = request.nextUrl.searchParams.get("module");
    const categoryId = request.nextUrl.searchParams.get("categoryId");

    if (module) {
      if (!isPermissionModule(module)) {
        return NextResponse.json({ error: "Módulo inválido" }, { status: 400 });
      }
      requireModule(session, module, "view");
    }

    let documents = await listDocuments({
      module: (module as CmsModule) || undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      includeAdmin: true,
    });

    if (!module) {
      documents = documents.filter(
        (doc) =>
          doc.Module &&
          isPermissionModule(doc.Module) &&
          (session.isSuperAdmin ||
            session.permissions[doc.Module] !== "none"),
      );
    }

    return NextResponse.json({
      documents: documents.map((d) => ({
        ...d,
        publicUrl: d.ExternalUrl || toPublicUrl(d.FilePath),
      })),
    });
  } catch (error) {
    return sessionErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const blocked = enforceCmsMutationGuards(request);
    if (blocked) return blocked;

    const session = await requireAdminSession();
    const body = await request.json().catch(() => null);
    if (!body?.categoryId || !body?.title) {
      return NextResponse.json(
        { error: "categoryId e title são obrigatórios" },
        { status: 400 },
      );
    }

    const category = await getCategoryById(Number(body.categoryId));
    if (!category || !isPermissionModule(category.Module)) {
      return NextResponse.json({ error: "Categoria inválida" }, { status: 400 });
    }

    const wantsPublish = Boolean(body.isPublished) || Boolean(body.isCurrent);
    requireModule(session, category.Module, wantsPublish ? "publish" : "edit");

    const filePath = assertManagedUploadPath(body.filePath ?? null);
    if (filePath && !filePath.startsWith("/files/") && !filePath.startsWith("/soltas/")) {
      const fileModule = uploadModuleFromPath(filePath);
      if (fileModule !== category.Module) {
        return NextResponse.json(
          { error: "Arquivo não pertence ao módulo da categoria" },
          { status: 400 },
        );
      }
    }

    let externalUrl: string | null = null;
    try {
      externalUrl = sanitizeExternalUrl(body.externalUrl ?? null);
    } catch {
      return NextResponse.json({ error: "URL externa inválida" }, { status: 400 });
    }

    const id = await createDocument({
      categoryId: Number(body.categoryId),
      title: String(body.title).slice(0, 300),
      label: body.label != null ? String(body.label).slice(0, 200) : null,
      description:
        body.description != null ? String(body.description).slice(0, 2000) : null,
      year: body.year ?? null,
      month: body.month ?? null,
      semester: body.semester ?? null,
      quarter: body.quarter ?? null,
      filePath,
      externalUrl,
      isPublished: Boolean(body.isPublished),
      isCurrent: Boolean(body.isCurrent),
      sortOrder: Number(body.sortOrder ?? 0),
    });

    await writeAuditLog({
      actor: session.username,
      action: "create",
      entityType: "Document",
      entityId: id,
      details: String(body.title).slice(0, 300),
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("inválido")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return sessionErrorResponse(error);
  }
}
