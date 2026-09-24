import { NextRequest, NextResponse } from "next/server";
import {
  requireAdminSession,
  requireModule,
  sessionErrorResponse,
} from "@/lib/cms/auth";
import { enforceCmsMutationGuards } from "@/lib/cms/api-guard";
import {
  deleteCampaign,
  getCampaignById,
  updateCampaign,
} from "@/lib/cms/campaigns";
import { writeAuditLog } from "@/lib/cms/documents";
import { deleteUpload, toPublicUrl } from "@/lib/cms/storage";
import { sanitizeExternalUrl } from "@/lib/cms/security";
import { assertManagedUploadPath } from "@/lib/cms/upload-path";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAdminSession();
    requireModule(session, "banners", "view");
    const { id } = await context.params;
    const campaign = await getCampaignById(Number(id));
    if (!campaign) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }
    return NextResponse.json({
      campaign: {
        ...campaign,
        imageDesktopUrl: toPublicUrl(campaign.ImageDesktopPath),
        imageMobileUrl: toPublicUrl(campaign.ImageMobilePath),
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

    const current = await getCampaignById(Number(id));
    if (!current) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    const publishChange =
      body.isPublished !== undefined && body.isPublished !== current.IsPublished;
    requireModule(session, "banners", publishChange ? "publish" : "edit");

    let imageDesktopPath = current.ImageDesktopPath;
    if (body.imageDesktopPath !== undefined) {
      imageDesktopPath = assertManagedUploadPath(body.imageDesktopPath, true)!;
      if (!imageDesktopPath.startsWith("banners/")) {
        return NextResponse.json(
          { error: "Imagem desktop deve estar em banners/" },
          { status: 400 },
        );
      }
    }

    let imageMobilePath = current.ImageMobilePath;
    if (body.imageMobilePath !== undefined) {
      imageMobilePath = assertManagedUploadPath(body.imageMobilePath);
      if (imageMobilePath && !imageMobilePath.startsWith("banners/")) {
        return NextResponse.json(
          { error: "Imagem mobile deve estar em banners/" },
          { status: 400 },
        );
      }
    }

    let ctaHref = current.CtaHref;
    if (body.ctaHref !== undefined) {
      try {
        ctaHref = sanitizeExternalUrl(body.ctaHref);
      } catch {
        return NextResponse.json({ error: "CTA URL inválida" }, { status: 400 });
      }
    }

    const previousDesktop = current.ImageDesktopPath;
    const previousMobile = current.ImageMobilePath;

    await updateCampaign(Number(id), {
      title: body.title !== undefined ? String(body.title).slice(0, 300) : undefined,
      imageDesktopPath:
        body.imageDesktopPath !== undefined ? imageDesktopPath : undefined,
      imageMobilePath:
        body.imageMobilePath !== undefined ? imageMobilePath : undefined,
      ctaLabel: body.ctaLabel,
      ctaHref: body.ctaHref !== undefined ? ctaHref : undefined,
      ctaVariant: body.ctaVariant,
      sortOrder: body.sortOrder !== undefined ? Number(body.sortOrder) : undefined,
      startsAt: body.startsAt,
      endsAt: body.endsAt,
      isPublished: body.isPublished,
    });

    if (
      body.imageDesktopPath !== undefined &&
      previousDesktop &&
      previousDesktop !== imageDesktopPath
    ) {
      await deleteUpload(previousDesktop);
    }
    if (
      body.imageMobilePath !== undefined &&
      previousMobile &&
      previousMobile !== imageMobilePath
    ) {
      await deleteUpload(previousMobile);
    }

    await writeAuditLog({
      actor: session.username,
      action: "update",
      entityType: "HeroCampaign",
      entityId: Number(id),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message.includes("inválido")) {
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
    const current = await getCampaignById(Number(id));
    if (!current) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    requireModule(
      session,
      "banners",
      current.IsPublished ? "publish" : "edit",
    );

    const removed = await deleteCampaign(Number(id));
    if (!removed) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    await deleteUpload(removed.ImageDesktopPath);
    await deleteUpload(removed.ImageMobilePath);
    await writeAuditLog({
      actor: session.username,
      action: "delete",
      entityType: "HeroCampaign",
      entityId: Number(id),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return sessionErrorResponse(error);
  }
}
