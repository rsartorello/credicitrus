import type { DocumentItem } from "@/components/DocumentAccordion/DocumentAccordion";
import { isCmsEnabled } from "./config";
import { listDocuments, getCurrentTariffUrl } from "./documents";
import { listCampaigns } from "./campaigns";
import {
  mapCampaignsToHero,
  mapDocumentsToAccordion,
  mapDocumentsToCards,
  mapDocumentsToList,
} from "./mappers";

const FALLBACK_HERO = {
  backgroundImage: ["/soltas/hero-home.webp", "/soltas/hero-home.webp"],
  mobileBackgroundImage: [
    "/soltas/hero-home-mobile.webp",
    "/soltas/hero-home-mobile.webp",
  ],
  imageAlts: ["Credicitrus", "Credicitrus"],
  buttons: [] as Array<{
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline" | "verde";
  }>,
};

const FALLBACK_TARIFF =
  "/files/transparencia/tabela_tarifa_atualizada_2025_A4_nov-1.pdf";

export async function getRelatoriosAccordionItems(
  fallback: DocumentItem[],
): Promise<DocumentItem[]> {
  if (!isCmsEnabled()) return fallback;
  try {
    const docs = await listDocuments({ module: "relatorios", publishedOnly: true });
    const mapped = mapDocumentsToAccordion(docs);
    return mapped.length > 0 ? mapped : fallback;
  } catch {
    return fallback;
  }
}

export async function getNormativosList(
  fallback: Array<{ name: string; link: string }>,
): Promise<Array<{ name: string; link: string }>> {
  if (!isCmsEnabled()) return fallback;
  try {
    const docs = await listDocuments({ module: "normativos", publishedOnly: true });
    const mapped = mapDocumentsToList(docs);
    return mapped.length > 0 ? mapped : fallback;
  } catch {
    return fallback;
  }
}

export async function getEticaCards(
  fallback: Array<{ title: string; description: string; link: string }>,
): Promise<Array<{ title: string; description: string; link: string }>> {
  if (!isCmsEnabled()) return fallback;
  try {
    const docs = await listDocuments({ module: "etica", publishedOnly: true });
    const mapped = mapDocumentsToCards(docs);
    return mapped.length > 0 ? mapped : fallback;
  } catch {
    return fallback;
  }
}

export async function getAssembleiasList(
  fallback: Array<{ name: string; link: string }>,
): Promise<Array<{ name: string; link: string }>> {
  if (!isCmsEnabled()) return fallback;
  try {
    const docs = await listDocuments({
      module: "assembleia",
      publishedOnly: true,
    });
    const mapped = mapDocumentsToList(docs);
    return mapped.length > 0 ? mapped : fallback;
  } catch {
    return fallback;
  }
}

export async function getHomeHeroFromCms() {
  if (!isCmsEnabled()) return FALLBACK_HERO;
  try {
    const campaigns = await listCampaigns({ publishedOnly: true });
    if (campaigns.length === 0) return FALLBACK_HERO;
    return mapCampaignsToHero(campaigns);
  } catch {
    return FALLBACK_HERO;
  }
}

export async function getTariffDownloadUrl(): Promise<string> {
  if (!isCmsEnabled()) return FALLBACK_TARIFF;
  try {
    const url = await getCurrentTariffUrl();
    return url || FALLBACK_TARIFF;
  } catch {
    return FALLBACK_TARIFF;
  }
}
