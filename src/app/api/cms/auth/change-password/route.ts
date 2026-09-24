import { NextRequest, NextResponse } from "next/server";
import {
  completePasswordChange,
  sessionErrorResponse,
} from "@/lib/cms/auth";
import { enforceCmsMutationGuards } from "@/lib/cms/api-guard";
import { writeAuditLog } from "@/lib/cms/documents";
import { MAX_PASSWORD_LENGTH } from "@/lib/cms/password";

export async function POST(request: NextRequest) {
  const blocked = enforceCmsMutationGuards(request, {
    keyPrefix: "cms:change-password",
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (blocked) return blocked;

  try {
    const body = await request.json().catch(() => ({}));
    const currentPassword = String(body.currentPassword ?? "");
    const newPassword = String(body.newPassword ?? "");

    if (
      !currentPassword ||
      !newPassword ||
      currentPassword.length > MAX_PASSWORD_LENGTH ||
      newPassword.length > MAX_PASSWORD_LENGTH
    ) {
      return NextResponse.json(
        { error: "Informe a senha atual e a nova senha" },
        { status: 400 },
      );
    }

    const session = await completePasswordChange(currentPassword, newPassword);

    await writeAuditLog({
      actor: session.username,
      action: "password_change",
      entityType: "Auth",
      entityId: session.userId,
      details: "self",
    });

    return NextResponse.json({
      ok: true,
      mustChangePassword: session.mustChangePassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Senha atual incorreta" ||
        error.message === "A nova senha deve ser diferente da senha atual" ||
        error.message.startsWith("A senha deve")
      ) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      if (error.message === "Troca de senha indisponível para admin via .env") {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }
    return sessionErrorResponse(error);
  }
}
