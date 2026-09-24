import { NextRequest, NextResponse } from "next/server";
import {
  requireAdminSession,
  sessionErrorResponse,
} from "@/lib/cms/auth";
import { enforceCmsMutationGuards } from "@/lib/cms/api-guard";
import { assertSuperAdmin } from "@/lib/cms/permissions";
import {
  deactivateUser,
  getUserById,
  toPublicUser,
  updateUser,
} from "@/lib/cms/users";
import { writeAuditLog } from "@/lib/cms/documents";
import {
  isPermissionLevel,
  PERMISSION_MODULES,
  type PermissionLevel,
  type PermissionModule,
} from "@/lib/cms/permissions";
import { assertPasswordPolicy } from "@/lib/cms/password";

function parsePermissions(raw: unknown) {
  const permissions: Partial<Record<PermissionModule, PermissionLevel>> = {};
  if (!raw || typeof raw !== "object") return permissions;
  for (const module of PERMISSION_MODULES) {
    const value = (raw as Record<string, unknown>)[module];
    if (typeof value === "string" && isPermissionLevel(value)) {
      permissions[module] = value;
    }
  }
  return permissions;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAdminSession();
    assertSuperAdmin(session);
    const { id } = await context.params;
    const user = await getUserById(Number(id));
    if (!user) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ user: await toPublicUser(user) });
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
    assertSuperAdmin(session);
    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Body inválido" }, { status: 400 });
    }

    if (session.userId === Number(id) && body.isActive === false) {
      return NextResponse.json(
        { error: "Você não pode desativar a si mesmo" },
        { status: 400 },
      );
    }

    if (body.password) {
      try {
        assertPasswordPolicy(String(body.password));
      } catch (error) {
        return NextResponse.json(
          { error: error instanceof Error ? error.message : "Senha inválida" },
          { status: 400 },
        );
      }
    }

    await updateUser(Number(id), {
      displayName: body.displayName,
      password: body.password || undefined,
      isSuperAdmin: body.isSuperAdmin,
      isActive: body.isActive,
      permissions: body.permissions ? parsePermissions(body.permissions) : undefined,
    });

    await writeAuditLog({
      actor: session.username,
      action: "update",
      entityType: "CmsUser",
      entityId: Number(id),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && !["UNAUTHORIZED", "FORBIDDEN"].includes(error.message)) {
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
    assertSuperAdmin(session);
    const { id } = await context.params;

    if (session.userId === Number(id)) {
      return NextResponse.json(
        { error: "Você não pode desativar a si mesmo" },
        { status: 400 },
      );
    }

    await deactivateUser(Number(id));
    await writeAuditLog({
      actor: session.username,
      action: "delete",
      entityType: "CmsUser",
      entityId: Number(id),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && !["UNAUTHORIZED", "FORBIDDEN"].includes(error.message)) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return sessionErrorResponse(error);
  }
}
