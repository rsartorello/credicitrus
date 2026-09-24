import { NextRequest, NextResponse } from "next/server";
import {
  requireAdminSession,
  sessionErrorResponse,
} from "@/lib/cms/auth";
import { enforceCmsMutationGuards } from "@/lib/cms/api-guard";
import { assertSuperAdmin } from "@/lib/cms/permissions";
import {
  createUser,
  listUsers,
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

export async function GET() {
  try {
    const session = await requireAdminSession();
    assertSuperAdmin(session);
    const users = await listUsers();
    return NextResponse.json({ users });
  } catch (error) {
    return sessionErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const blocked = enforceCmsMutationGuards(request);
    if (blocked) return blocked;

    const session = await requireAdminSession();
    assertSuperAdmin(session);

    const body = await request.json().catch(() => null);
    if (!body?.username || !body?.displayName || !body?.password) {
      return NextResponse.json(
        { error: "username, displayName e password são obrigatórios" },
        { status: 400 },
      );
    }

    try {
      assertPasswordPolicy(String(body.password));
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Senha inválida" },
        { status: 400 },
      );
    }

    const id = await createUser({
      username: String(body.username),
      displayName: String(body.displayName),
      password: String(body.password),
      isSuperAdmin: Boolean(body.isSuperAdmin),
      isActive: body.isActive !== false,
      permissions: parsePermissions(body.permissions),
    });

    await writeAuditLog({
      actor: session.username,
      action: "create",
      entityType: "CmsUser",
      entityId: id,
      details: String(body.username),
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && !["UNAUTHORIZED", "FORBIDDEN"].includes(error.message)) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return sessionErrorResponse(error);
  }
}
