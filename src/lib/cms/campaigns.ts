import { query, execute } from "./db";
import type { HeroCampaignInput, HeroCampaignRow } from "./types";

function mapBit(row: HeroCampaignRow): HeroCampaignRow {
  return {
    ...row,
    IsPublished: Boolean(row.IsPublished),
  };
}

export async function listCampaigns(options?: {
  publishedOnly?: boolean;
  includeAdmin?: boolean;
}): Promise<HeroCampaignRow[]> {
  const publishedOnly = options?.publishedOnly !== false && !options?.includeAdmin;
  const nowFilter = publishedOnly
    ? `AND (StartsAt IS NULL OR StartsAt <= SYSUTCDATETIME())
       AND (EndsAt IS NULL OR EndsAt >= SYSUTCDATETIME())`
    : "";

  const rows = await query<HeroCampaignRow>(
    `SELECT
       Id, Title, ImageDesktopPath, ImageMobilePath,
       CtaLabel, CtaHref, CtaVariant, SortOrder,
       StartsAt, EndsAt, IsPublished
     FROM HeroCampaign
     WHERE (@publishedOnly = 0 OR IsPublished = 1)
       ${nowFilter}
     ORDER BY SortOrder, Id DESC`,
    { publishedOnly: publishedOnly ? 1 : 0 },
  );

  return rows.map(mapBit);
}

export async function getCampaignById(id: number): Promise<HeroCampaignRow | null> {
  const rows = await query<HeroCampaignRow>(
    `SELECT
       Id, Title, ImageDesktopPath, ImageMobilePath,
       CtaLabel, CtaHref, CtaVariant, SortOrder,
       StartsAt, EndsAt, IsPublished
     FROM HeroCampaign
     WHERE Id = @id`,
    { id },
  );
  return rows[0] ? mapBit(rows[0]) : null;
}

export async function createCampaign(input: HeroCampaignInput): Promise<number> {
  const rows = await query<{ Id: number }>(
    `INSERT INTO HeroCampaign (
       Title, ImageDesktopPath, ImageMobilePath,
       CtaLabel, CtaHref, CtaVariant, SortOrder,
       StartsAt, EndsAt, IsPublished
     )
     OUTPUT INSERTED.Id
     VALUES (
       @title, @imageDesktopPath, @imageMobilePath,
       @ctaLabel, @ctaHref, @ctaVariant, @sortOrder,
       @startsAt, @endsAt, @isPublished
     )`,
    {
      title: input.title,
      imageDesktopPath: input.imageDesktopPath,
      imageMobilePath: input.imageMobilePath ?? null,
      ctaLabel: input.ctaLabel ?? null,
      ctaHref: input.ctaHref ?? null,
      ctaVariant: input.ctaVariant ?? null,
      sortOrder: input.sortOrder ?? 0,
      startsAt: input.startsAt ? new Date(input.startsAt) : null,
      endsAt: input.endsAt ? new Date(input.endsAt) : null,
      isPublished: input.isPublished ? 1 : 0,
    },
  );
  return rows[0]?.Id ?? 0;
}

export async function updateCampaign(
  id: number,
  input: Partial<HeroCampaignInput>,
): Promise<void> {
  const current = await getCampaignById(id);
  if (!current) throw new Error("Campanha não encontrada");

  await execute(
    `UPDATE HeroCampaign SET
       Title = @title,
       ImageDesktopPath = @imageDesktopPath,
       ImageMobilePath = @imageMobilePath,
       CtaLabel = @ctaLabel,
       CtaHref = @ctaHref,
       CtaVariant = @ctaVariant,
       SortOrder = @sortOrder,
       StartsAt = @startsAt,
       EndsAt = @endsAt,
       IsPublished = @isPublished,
       UpdatedAt = SYSUTCDATETIME()
     WHERE Id = @id`,
    {
      id,
      title: input.title ?? current.Title,
      imageDesktopPath: input.imageDesktopPath ?? current.ImageDesktopPath,
      imageMobilePath:
        input.imageMobilePath !== undefined
          ? input.imageMobilePath
          : current.ImageMobilePath,
      ctaLabel: input.ctaLabel !== undefined ? input.ctaLabel : current.CtaLabel,
      ctaHref: input.ctaHref !== undefined ? input.ctaHref : current.CtaHref,
      ctaVariant:
        input.ctaVariant !== undefined ? input.ctaVariant : current.CtaVariant,
      sortOrder: input.sortOrder ?? current.SortOrder,
      startsAt:
        input.startsAt !== undefined
          ? input.startsAt
            ? new Date(input.startsAt)
            : null
          : current.StartsAt,
      endsAt:
        input.endsAt !== undefined
          ? input.endsAt
            ? new Date(input.endsAt)
            : null
          : current.EndsAt,
      isPublished:
        input.isPublished !== undefined
          ? input.isPublished
            ? 1
            : 0
          : current.IsPublished
            ? 1
            : 0,
    },
  );
}

export async function deleteCampaign(id: number): Promise<HeroCampaignRow | null> {
  const current = await getCampaignById(id);
  if (!current) return null;
  await execute(`DELETE FROM HeroCampaign WHERE Id = @id`, { id });
  return current;
}
