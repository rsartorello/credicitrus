"use client";

import Link from "next/link";
import { Eye, EyeOff, Pencil, Star, Trash2 } from "lucide-react";
import {
  AdminAlert,
  AdminCard,
  AdminPageHeader,
  IconActionButton,
  IconActionLink,
  StatusPill,
} from "@/components/admin/ui";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import {
  monthLabel,
  useCmsModuleDocuments,
  type AdminDocument,
} from "@/components/admin/useCmsModuleDocuments";
import type { ReactNode } from "react";

type DocModule = "relatorios" | "normativos" | "etica" | "tarifas" | "assembleia";

const LIST_META: Record<
  DocModule,
  { title: string; description: string; badge: string; newLabel: string }
> = {
  relatorios: {
    title: "Relatórios",
    description: "Itens publicados nas páginas de Transparência · Relatórios.",
    badge: "Transparência",
    newLabel: "Novo relatório",
  },
  normativos: {
    title: "Normativos",
    description: "Documentos oficiais da página de Normativos.",
    badge: "Transparência",
    newLabel: "Novo normativo",
  },
  etica: {
    title: "Ética e Integridade",
    description: "Cards da página de Ética e Integridade.",
    badge: "Transparência",
    newLabel: "Novo card",
  },
  tarifas: {
    title: "Tabela de Tarifas",
    description: "Arquivos da tabela de tarifas (o vigente aparece no Header/Rodapé).",
    badge: "Transparência",
    newLabel: "Nova tabela",
  },
  assembleia: {
    title: "Assembleias",
    description: "Documentos complementares da página de Assembleia.",
    badge: "Transparência",
    newLabel: "Novo documento",
  },
};

function DocumentTable({
  module,
  documents,
  loading,
  empty,
  onToggle,
  onRemove,
  detail,
  extraAction,
}: {
  module: DocModule;
  documents: AdminDocument[];
  loading: boolean;
  empty: string;
  onToggle: (doc: AdminDocument) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
  detail?: (doc: AdminDocument) => string;
  extraAction?: (doc: AdminDocument) => ReactNode;
}) {
  const rows = documents.map((doc) => ({
    id: doc.Id,
    cells: {
      item: (
        <>
          <p className="font-semibold text-[#003641]">{doc.Title}</p>
          {detail ? (
            <p className="mt-1 text-xs text-[#003641]/55">{detail(doc)}</p>
          ) : null}
          {doc.publicUrl ? (
            <a
              href={doc.publicUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-xs font-semibold text-[#00A79D] hover:underline"
            >
              Abrir
            </a>
          ) : null}
        </>
      ),
      status: (
        <StatusPill
          published={doc.IsPublished}
          extra={doc.IsCurrent ? "Vigente" : undefined}
        />
      ),
      actions: (
        <div className="flex flex-wrap items-center gap-1.5">
          <IconActionLink href={`/admin/${module}/${doc.Id}`} label="Editar">
            <Pencil className="h-4 w-4" strokeWidth={2} />
          </IconActionLink>
          <IconActionButton
            label={doc.IsPublished ? "Despublicar" : "Publicar"}
            tone={doc.IsPublished ? "warning" : "success"}
            onClick={() => void onToggle(doc)}
          >
            {doc.IsPublished ? (
              <EyeOff className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={2} />
            )}
          </IconActionButton>
          {extraAction?.(doc)}
          <IconActionButton
            label="Excluir"
            tone="danger"
            onClick={() => void onRemove(doc.Id)}
          >
            <Trash2 className="h-4 w-4" strokeWidth={2} />
          </IconActionButton>
        </div>
      ),
    },
  }));

  return (
    <AdminCard
      title="Itens cadastrados"
      description={
        loading
          ? "Carregando..."
          : documents.length > 0
            ? `${documents.length} ${documents.length === 1 ? "registro" : "registros"}`
            : undefined
      }
    >
      <AdminDataTable
        empty={empty}
        pageSize={10}
        columns={[
          { key: "item", header: "Item" },
          { key: "status", header: "Status" },
          { key: "actions", header: "Ações" },
        ]}
        rows={rows}
      />
    </AdminCard>
  );
}

function ModuleListPage({
  module,
  empty,
  detail,
  extraAction,
}: {
  module: DocModule;
  empty: string;
  detail?: (doc: AdminDocument) => string;
  extraAction?: (
    doc: AdminDocument,
    helpers: { toggleCurrent: (doc: AdminDocument) => Promise<void> },
  ) => ReactNode;
}) {
  const meta = LIST_META[module];
  const {
    documents,
    error,
    loading,
    togglePublish,
    toggleCurrent,
    removeDocument,
  } = useCmsModuleDocuments(module);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <AdminPageHeader
          badge={meta.badge}
          title={meta.title}
          description={meta.description}
        />
        <Link
          href={`/admin/${module}/novo`}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#00A79D] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#008f86]"
        >
          {meta.newLabel}
        </Link>
      </div>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <DocumentTable
        module={module}
        loading={loading}
        documents={documents}
        empty={empty}
        onToggle={togglePublish}
        onRemove={removeDocument}
        detail={detail}
        extraAction={
          extraAction
            ? (doc) => extraAction(doc, { toggleCurrent })
            : undefined
        }
      />
    </div>
  );
}

export function RelatoriosAdminPage() {
  return (
    <ModuleListPage
      module="relatorios"
      empty="Nenhum relatório cadastrado."
      detail={(doc) =>
        [doc.CategoryTitle, doc.Year, doc.Month ? monthLabel(doc.Month) : null, doc.Semester]
          .filter(Boolean)
          .join(" · ")
      }
    />
  );
}

export function ListLinkAdminPage({
  module,
  title,
  description,
  badge,
}: {
  module: "normativos" | "assembleia";
  title: string;
  description: string;
  badge: string;
}) {
  // title/description/badge kept for call-site compatibility; list meta is canonical
  void title;
  void description;
  void badge;
  return (
    <ModuleListPage
      module={module}
      empty="Nenhum documento cadastrado."
    />
  );
}

export function EticaAdminPage() {
  return (
    <ModuleListPage
      module="etica"
      empty="Nenhum card cadastrado."
      detail={(doc) => doc.Description || ""}
    />
  );
}

export function TarifasAdminPage() {
  return (
    <ModuleListPage
      module="tarifas"
      empty="Nenhuma tabela cadastrada."
      detail={(doc) => (doc.IsCurrent ? "Arquivo vigente no site" : "Histórico")}
      extraAction={(doc, { toggleCurrent }) => (
        <IconActionButton
          label={doc.IsCurrent ? "Já vigente" : "Tornar vigente"}
          tone={doc.IsCurrent ? "success" : "neutral"}
          disabled={doc.IsCurrent}
          onClick={() => void toggleCurrent(doc)}
        >
          <Star
            className="h-4 w-4"
            strokeWidth={2}
            fill={doc.IsCurrent ? "currentColor" : "none"}
          />
        </IconActionButton>
      )}
    />
  );
}
