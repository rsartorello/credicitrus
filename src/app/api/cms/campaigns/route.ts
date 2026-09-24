import { NextRequest, NextResponse } from "next/server";
import {
  requireAdminSession,
  requireModule,
  sessionErrorResponse,
} from "@/lib/cms/auth";
import { enforceCmsMutationGuards } from "@/lib/cms/api-guard";
import { createCampaign, listCampaigns } from "@/lib/cms/campaigns";
import { writeAuditLog } from "@/lib/cms/documents";
import { toPublicUrl } from "@/lib/cms/storage";
import { sanitizeExternalUrl } from "@/lib/cms/security";
import { assertManagedUploadPath } from "@/lib/cms/upload-path";

export async function GET() {
  try {
    const session = await requireAdminSession();
    requireModule(session, "banners", "view");
    const campaigns = await listCampaigns({ includeAdmin: true });
    return NextResponse.json({
      campaigns: campaigns.map((c) => ({
        ...c,
        imageDesktopUrl: toPublicUrl(c.ImageDesktopPath),
        imageMobileUrl: toPublicUrl(c.ImageMobilePath),
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
    if (!body?.title || !body?.imageDesktopPath) {
      return NextResponse.json(
        { error: "title e imageDesktopPath são obrigatórios" },
        { status: 400 },
      );
    }

    requireModule(
      session,
      "banners",
      body.isPublished ? "publish" : "edit",
    );

    const imageDesktopPath = assertManagedUploadPath(body.imageDesktopPath, true)!;
    const imageMobilePath = assertManagedUploadPath(body.imageMobilePath ?? null);

    if (!imageDesktopPath.startsWith("banners/")) {
      return NextResponse.json(
        { error: "Imagem desktop deve estar em banners/" },
        { status: 400 },
      );
    }
    if (imageMobilePath && !imageMobilePath.startsWith("banners/")) {
      return NextResponse.json(
        { error: "Imagem mobile deve estar em banners/" },
        { status: 400 },
      );
    }

    let ctaHref: string | null = null;
    try {
      ctaHref = sanitizeExternalUrl(body.ctaHref ?? null);
    } catch {
      return NextResponse.json({ error: "CTA URL inválida" }, { status: 400 });
    }

    const id = await createCampaign({
      title: String(body.title).slice(0, 300),
      imageDesktopPath,
      imageMobilePath,
      ctaLabel: body.ctaLabel != null ? String(body.ctaLabel).slice(0, 120) : null,
      ctaHref,
      ctaVariant: body.ctaVariant ?? null,
      sortOrder: Number(body.sortOrder ?? 0),
      startsAt: body.startsAt ?? null,
      endsAt: body.endsAt ?? null,
      isPublished: Boolean(body.isPublished),
    });

    await writeAuditLog({
      actor: session.username,
      action: "create",
      entityType: "HeroCampaign",
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
