export type CmsModule =
  | "relatorios"
  | "normativos"
  | "etica"
  | "tarifas"
  | "assembleia";

export type DocumentUiType =
  | "annual"
  | "semestral"
  | "monthly"
  | "quarterly"
  | "list"
  | "card";

export type CtaVariant = "primary" | "secondary" | "outline" | "verde";

export interface DocumentCategoryRow {
  Id: number;
  Module: CmsModule;
  Slug: string;
  Title: string;
  UiType: DocumentUiType | null;
  SortOrder: number;
  IsActive: boolean;
}

export interface DocumentRow {
  Id: number;
  CategoryId: number;
  Title: string;
  Label: string | null;
  Description: string | null;
  Year: string | null;
  Month: string | null;
  Semester: "1S" | "2S" | null;
  Quarter: "1T" | "2T" | "3T" | "4T" | null;
  FilePath: string | null;
  ExternalUrl: string | null;
  IsPublished: boolean;
  IsCurrent: boolean;
  SortOrder: number;
  PublishedAt: Date | null;
  CategorySlug?: string;
  CategoryTitle?: string;
  CategoryUiType?: DocumentUiType | null;
  Module?: CmsModule;
}

export interface HeroCampaignRow {
  Id: number;
  Title: string;
  ImageDesktopPath: string;
  ImageMobilePath: string | null;
  CtaLabel: string | null;
  CtaHref: string | null;
  CtaVariant: CtaVariant | null;
  SortOrder: number;
  StartsAt: Date | null;
  EndsAt: Date | null;
  IsPublished: boolean;
}

export interface DocumentInput {
  categoryId: number;
  title: string;
  label?: string | null;
  description?: string | null;
  year?: string | null;
  month?: string | null;
  semester?: "1S" | "2S" | null;
  quarter?: "1T" | "2T" | "3T" | "4T" | null;
  filePath?: string | null;
  externalUrl?: string | null;
  isPublished?: boolean;
  isCurrent?: boolean;
  sortOrder?: number;
}

export interface HeroCampaignInput {
  title: string;
  imageDesktopPath: string;
  imageMobilePath?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  ctaVariant?: CtaVariant | null;
  sortOrder?: number;
  startsAt?: string | null;
  endsAt?: string | null;
  isPublished?: boolean;
}
