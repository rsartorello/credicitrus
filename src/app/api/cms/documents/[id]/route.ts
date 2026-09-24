import { NextRequest, NextResponse } from "next/server";
import {
  requireAdminSession,
  requireModule,
  sessionErrorResponse,
} from "@/lib/cms/auth";
import { enforceCmsMutationGuards } from "@/lib/cms/api-guard";
import {
  deleteDocument,
  getCategoryById,
  getDocumentById,
  updateDocument,
  writeAuditLog,
} from "@/lib/cms/documents";
import { deleteUpload, toPublicUrl } from "@/lib/cms/storage";
import { isPermissionModule } from "@/lib/cms/permissions";
import { sanitizeExternalUrl } from "@/lib/cms/security";
import {
  assertManagedUploadPath,
  uploadModuleFromPath,
} from "@/lib/cms/upload-path";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAdminSession();
    const { id } = await context.params;
    const doc = await getDocumentById(Number(id));
    if (!doc || !doc.Module || !isPermissionModule(doc.Module)) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }
    requireModule(session, doc.Module, "view");

    return NextResponse.json({
      document: {
        ...doc,
        publicUrl: doc.ExternalUrl || toPublicUrl(doc.FilePath),
      },
    });
  } catch (error) {
    return sessionErrorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const blocked = enforceCmsMutationGuards(request);
    if (blocked) return blocked;

    const session = await requireAdminSession();
    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Body inválido" }, { status: 400 });
    }

    const current = await getDocumentById(Number(id));
    if (!current?.Module || !isPermissionModule(current.Module)) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    let targetModule = current.Module;
    if (body.categoryId !== undefined) {
      const category = await getCategoryById(Number(body.categoryId));
      if (!category || !isPermissionModule(category.Module)) {
        return NextResponse.json({ error: "Categoria inválida" }, { status: 400 });
      }
      targetModule = category.Module;
      requireModule(session, current.Module, "edit");
      requireModule(session, targetModule, "edit");
    }

    const publishChange =
      body.isPublished !== undefined && body.isPublished !== current.IsPublished;
    const currentChange =
      body.isCurrent !== undefined && body.isCurrent !== current.IsCurrent;

    requireModule(
      session,
      targetModule,
      publishChange || currentChange ? "publish" : "edit",
    );

    let filePath = current.FilePath;
    if (body.filePath !== undefined) {
      filePath = assertManagedUploadPath(body.filePath);
      if (
        filePath &&
        !filePath.startsWith("/files/") &&
        !filePath.startsWith("/soltas/")
      ) {
        const fileModule = uploadModuleFromPath(filePath);
        if (fileModule !== targetModule) {
          return NextResponse.json(
            { error: "Arquivo não pertence ao módulo da categoria" },
            { status: 400 },
          );
        }
      }
    }

    let externalUrl = current.ExternalUrl;
    if (body.externalUrl !== undefined) {
      try {
        externalUrl = sanitizeExternalUrl(body.externalUrl);
      } catch {
        return NextResponse.json({ error: "URL externa inválida" }, { status: 400 });
      }
    }

    const previousFilePath = current.FilePath;

    await updateDocument(Number(id), {
      categoryId: body.categoryId !== undefined ? Number(body.categoryId) : undefined,
      title: body.title !== undefined ? String(body.title).slice(0, 300) : undefined,
      label: body.label,
      description: body.description,
      year: body.year,
      month: body.month,
      semester: body.semester,
      quarter: body.quarter,
      filePath: body.filePath !== undefined ? filePath : undefined,
      externalUrl: body.externalUrl !== undefined ? externalUrl : undefined,
      isPublished: body.isPublished,
      isCurrent: body.isCurrent,
      sortOrder: body.sortOrder !== undefined ? Number(body.sortOrder) : undefined,
    });

    // Substituição de arquivo: remove o anterior do disco (mantém sanitização)
    if (
      body.filePath !== undefined &&
      previousFilePath &&
      previousFilePath !== filePath
    ) {
      await deleteUpload(previousFilePath);
    }

    await writeAuditLog({
      actor: session.username,
      action: "update",
      entityType: "Document",
      entityId: Number(id),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Documento não encontrado" ||
        error.message.includes("inválido"))
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return sessionErrorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const blocked = enforceCmsMutationGuards(request);
    if (blocked) return blocked;

    const session = await requireAdminSession();
    const { id } = await context.params;
    const current = await getDocumentById(Number(id));
    if (!current?.Module || !isPermissionModule(current.Module)) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    requireModule(
      session,
      current.Module,
      current.IsPublished ? "publish" : "edit",
    );

    const removed = await deleteDocument(Number(id));
    if (!removed) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    await deleteUpload(removed.FilePath);
    await writeAuditLog({
      actor: session.username,
      action: "delete",
      entityType: "Document",
      entityId: Number(id),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return sessionErrorResponse(error);
  }
}
