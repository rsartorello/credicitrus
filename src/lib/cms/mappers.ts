import type { DocumentItem, DocumentOption } from "@/components/DocumentAccordion/DocumentAccordion";
import type { DocumentRow, HeroCampaignRow } from "./types";
import { toPublicUrl } from "./storage";

export function documentPublicUrl(doc: DocumentRow): string | null {
  if (doc.ExternalUrl) return doc.ExternalUrl;
  return toPublicUrl(doc.FilePath);
}

export function mapDocumentsToAccordion(docs: DocumentRow[]): DocumentItem[] {
  const byCategory = new Map<
    number,
    { title: string; type?: DocumentItem["type"]; options: DocumentOption[] }
  >();

  for (const doc of docs) {
    const url = documentPublicUrl(doc);
    if (!url) continue;

    let entry = byCategory.get(doc.CategoryId);
    if (!entry) {
      const uiType = doc.CategoryUiType;
      entry = {
        title: doc.CategoryTitle || doc.Title,
        type:
          uiType === "annual" ||
          uiType === "semestral" ||
          uiType === "monthly" ||
          uiType === "quarterly"
            ? uiType
            : undefined,
        options: [],
      };
      byCategory.set(doc.CategoryId, entry);
    }

    entry.options.push({
      label: doc.Label || doc.Title,
      url,
      year: doc.Year || undefined,
      month: doc.Month || undefined,
      semester: doc.Semester || undefined,
      quarter: doc.Quarter || undefined,
    });
  }

  return Array.from(byCategory.values());
}

export function mapDocumentsToList(
  docs: DocumentRow[],
): Array<{ name: string; link: string }> {
  return docs
    .map((doc) => {
      const link = documentPublicUrl(doc);
      if (!link) return null;
      return { name: doc.Title, link };
    })
    .filter((item): item is { name: string; link: string } => Boolean(item));
}

export function mapDocumentsToCards(
  docs: DocumentRow[],
): Array<{ title: string; description: string; link: string }> {
  return docs
    .map((doc) => {
      const link = documentPublicUrl(doc);
      if (!link) return null;
      return {
        title: doc.Title,
        description: doc.Description || "",
        link,
      };
    })
    .filter(
      (item): item is { title: string; description: string; link: string } =>
        Boolean(item),
    );
}

export function mapCampaignsToHero(campaigns: HeroCampaignRow[]): {
  backgroundImage: string[];
  mobileBackgroundImage: string[];
  imageAlts: string[];
  buttons: Array<{
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline" | "verde";
  }>;
} {
  const backgroundImage = campaigns.map(
    (c) => toPublicUrl(c.ImageDesktopPath) || c.ImageDesktopPath,
  );
  const mobileBackgroundImage = campaigns.map(
    (c) =>
      toPublicUrl(c.ImageMobilePath || c.ImageDesktopPath) ||
      c.ImageMobilePath ||
      c.ImageDesktopPath,
  );
  const imageAlts = campaigns.map((c) => c.Title || "Banner Credicitrus");

  const firstWithCta = campaigns.find((c) => c.CtaLabel && c.CtaHref);
  const buttons = firstWithCta
    ? [
        {
          label: firstWithCta.CtaLabel!,
          href: firstWithCta.CtaHref!,
          variant: (firstWithCta.CtaVariant || "primary") as
            | "primary"
            | "secondary"
            | "outline"
            | "verde",
        },
      ]
    : [];

  return { backgroundImage, mobileBackgroundImage, imageAlts, buttons };
}
