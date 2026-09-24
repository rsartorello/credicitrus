import { listDocuments, getCurrentTariffUrl } from "./documents";
import { listCampaigns } from "./campaigns";
import { query } from "./db";
import type { CmsModule } from "./types";
import { toPublicUrl } from "./storage";
import {
  canAccess,
  type CmsSession,
  type PermissionModule,
} from "./permissions";

export type ModuleKey = CmsModule | "banners";

export const DASHBOARD_MODULES: Array<{
  key: ModuleKey;
  label: string;
  description: string;
  href: string;
}> = [
  {
    key: "relatorios",
    label: "Relatórios",
    description: "Anuais, semestrais, balancetes e demais séries.",
    href: "/admin/relatorios",
  },
  {
    key: "normativos",
    label: "Normativos",
    description: "Políticas, leis e documentos oficiais.",
    href: "/admin/normativos",
  },
  {
    key: "etica",
    label: "Ética e Integridade",
    description: "Cards com título, descrição e PDF.",
    href: "/admin/etica",
  },
  {
    key: "tarifas",
    label: "Tabela de Tarifas",
    description: "Arquivo vigente exibido no site.",
    href: "/admin/tarifas",
  },
  {
    key: "assembleia",
    label: "Assembleias",
    description: "Documentos complementares da página.",
    href: "/admin/assembleia",
  },
  {
    key: "banners",
    label: "Banners da home",
    description: "Campanhas do hero desktop/mobile.",
    href: "/admin/banners",
  },
];

export type ModuleStats = {
  key: ModuleKey;
  label: string;
  description: string;
  href: string;
  total: number;
  published: number;
  drafts: number;
};

export type DashboardAlert = {
  tone: "warning" | "info" | "success";
  title: string;
  detail: string;
  href?: string;
};

export type AuditItem = {
  Actor: string;
  Action: string;
  EntityType: string;
  EntityId: number | null;
  Details: string | null;
  CreatedAt: Date;
};

export type RecentDocument = {
  Id: number;
  Title: string;
  Module?: CmsModule;
  CategoryTitle?: string;
  IsPublished: boolean;
  publicUrl: string | null;
};

function canViewModule(session: CmsSession, module: PermissionModule): boolean {
  return canAccess(session, module, "view");
}

export async function getDashboardData(session: CmsSession) {
  const allowedModules = DASHBOARD_MODULES.filter((m) =>
    canViewModule(session, m.key as PermissionModule),
  );

  const loadDocs = allowedModules.some((m) => m.key !== "banners");
  const loadBanners = allowedModules.some((m) => m.key === "banners");
  const loadTariff = canViewModule(session, "tarifas");

  const [documents, campaigns, tariffUrl] = await Promise.all([
    loadDocs ? listDocuments({ includeAdmin: true }) : Promise.resolve([]),
    loadBanners ? listCampaigns({ includeAdmin: true }) : Promise.resolve([]),
    loadTariff ? getCurrentTariffUrl() : Promise.resolve(null),
  ]);

  const visibleDocuments = documents.filter(
    (d) => d.Module && canViewModule(session, d.Module as PermissionModule),
  );

  let recentActivity: AuditItem[] = [];
  if (session.isSuperAdmin) {
    try {
      recentActivity = await query<AuditItem>(
        `SELECT TOP 8 Actor, Action, EntityType, EntityId, Details, CreatedAt
         FROM CmsAuditLog
         ORDER BY CreatedAt DESC`,
      );
    } catch {
      recentActivity = [];
    }
  }

  const byModule = allowedModules
    .filter((m) => m.key !== "banners")
    .map((mod) => {
      const items = visibleDocuments.filter((d) => d.Module === mod.key);
      return {
        ...mod,
        total: items.length,
        published: items.filter((d) => d.IsPublished).length,
        drafts: items.filter((d) => !d.IsPublished).length,
      } satisfies ModuleStats;
    });

  const bannersPublished = campaigns.filter((c) => c.IsPublished).length;
  const bannersDrafts = campaigns.length - bannersPublished;

  const moduleStats: ModuleStats[] = [
    ...byModule,
    ...(loadBanners
      ? [
          {
            key: "banners" as const,
            label: "Banners da home",
            description: "Campanhas do hero desktop/mobile.",
            href: "/admin/banners",
            total: campaigns.length,
            published: bannersPublished,
            drafts: bannersDrafts,
          } satisfies ModuleStats,
        ]
      : []),
  ];

  const totalDocuments = visibleDocuments.length;
  const publishedDocuments = visibleDocuments.filter((d) => d.IsPublished).length;
  const draftDocuments = totalDocuments - publishedDocuments;

  const alerts: DashboardAlert[] = [];

  if (loadTariff && !tariffUrl) {
    alerts.push({
      tone: "warning",
      title: "Tabela de tarifas sem arquivo vigente",
      detail:
        "O Header e o Rodapé ainda usam o fallback estático até haver uma tarifa publicada.",
      href: "/admin/tarifas",
    });
  }

  if (loadBanners && bannersPublished === 0) {
    alerts.push({
      tone: "info",
      title: "Nenhum banner publicado",
      detail:
        "A home segue com as imagens padrão até existir campanha ativa no CMS.",
      href: "/admin/banners",
    });
  }

  if (draftDocuments > 0) {
    alerts.push({
      tone: "info",
      title: `${draftDocuments} documento(s) em rascunho`,
      detail: "Itens ainda não visíveis no site público.",
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      tone: "success",
      title: "Conteúdo em dia",
      detail:
        "Há tarifa vigente e banners/documentos publicados sem pendências críticas.",
    });
  }

  const recentDocuments: RecentDocument[] = visibleDocuments
    .slice(0, 6)
    .map((d) => ({
      Id: d.Id,
      Title: d.Title,
      Module: d.Module,
      CategoryTitle: d.CategoryTitle,
      IsPublished: d.IsPublished,
      publicUrl: d.ExternalUrl || toPublicUrl(d.FilePath),
    }));

  const currentTariff =
    visibleDocuments.find(
      (d) => d.Module === "tarifas" && d.IsCurrent && d.IsPublished,
    ) ||
    visibleDocuments.find((d) => d.Module === "tarifas" && d.IsPublished);

  return {
    sessionReady: true,
    totals: {
      documents: totalDocuments,
      published: publishedDocuments,
      drafts: draftDocuments,
      banners: campaigns.length,
      bannersPublished,
      categoriesCovered: byModule.filter((m) => m.total > 0).length,
    },
    moduleStats,
    alerts,
    recentDocuments,
    recentActivity,
    showAudit: session.isSuperAdmin,
    tariff: {
      url: tariffUrl,
      title: currentTariff?.Title || null,
    },
    campaigns: campaigns.slice(0, 4).map((c) => ({
      Id: c.Id,
      Title: c.Title,
      IsPublished: c.IsPublished,
      CtaLabel: c.CtaLabel,
      StartsAt: c.StartsAt,
      EndsAt: c.EndsAt,
    })),
  };
}

export function formatAuditAction(action: string) {
  const map: Record<string, string> = {
    create: "criou",
    update: "atualizou",
    delete: "excluiu",
    upload: "enviou arquivo",
    login_success: "fez login",
    login_fail: "falhou no login",
    login_locked: "foi bloqueado no login",
  };
  return map[action] || action;
}

export function formatDateTime(value: Date | string | null | undefined) {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}
