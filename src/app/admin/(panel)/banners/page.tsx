"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { cmsFetch } from "@/components/admin/cmsFetch";
import {
  AdminAlert,
  AdminCard,
  AdminPageHeader,
  IconActionButton,
  IconActionLink,
  StatusPill,
} from "@/components/admin/ui";
import { useConfirmDelete } from "@/components/admin/ConfirmDialog";
import { AdminDataTable } from "@/components/admin/AdminDataTable";

type Campaign = {
  Id: number;
  Title: string;
  IsPublished: boolean;
  CtaLabel: string | null;
  imageDesktopUrl?: string | null;
};

export default function AdminBannersPage() {
  const router = useRouter();
  const confirmDelete = useConfirmDelete();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const me = await cmsFetch("/api/cms/auth/me");
    if (!me.ok) {
      router.replace("/admin/login");
      return;
    }
    const res = await cmsFetch("/api/cms/campaigns");
    if (!res.ok) {
      setError("Falha ao carregar campanhas.");
      setLoading(false);
      return;
    }
    const json = await res.json();
    setCampaigns(json.campaigns || []);
    setError("");
    setLoading(false);
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  async function togglePublish(item: Campaign) {
    await cmsFetch(`/api/cms/campaigns/${item.Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !item.IsPublished }),
    });
    await load();
  }

  async function removeItem(id: number) {
    if (!(await confirmDelete("esta campanha"))) return;
    await cmsFetch(`/api/cms/campaigns/${id}`, { method: "DELETE" });
    await load();
  }

  const rows = campaigns.map((item) => ({
    id: item.Id,
    cells: {
      item: (
        <div className="flex items-start gap-3">
          {item.imageDesktopUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageDesktopUrl}
              alt=""
              className="h-12 w-20 shrink-0 rounded-lg object-cover"
            />
          ) : null}
          <div className="min-w-0">
            <p className="font-semibold text-[#003641]">{item.Title}</p>
            <p className="mt-1 text-xs text-[#003641]/55">
              {item.CtaLabel ? `CTA: ${item.CtaLabel}` : "Sem CTA"}
            </p>
          </div>
        </div>
      ),
      status: <StatusPill published={item.IsPublished} />,
      actions: (
        <div className="flex flex-wrap items-center gap-1.5">
          <IconActionLink href={`/admin/banners/${item.Id}`} label="Editar">
            <Pencil className="h-4 w-4" strokeWidth={2} />
          </IconActionLink>
          <IconActionButton
            label={item.IsPublished ? "Despublicar" : "Publicar"}
            tone={item.IsPublished ? "warning" : "success"}
            onClick={() => void togglePublish(item)}
          >
            {item.IsPublished ? (
              <EyeOff className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={2} />
            )}
          </IconActionButton>
          <IconActionButton
            label="Excluir"
            tone="danger"
            onClick={() => void removeItem(item.Id)}
          >
            <Trash2 className="h-4 w-4" strokeWidth={2} />
          </IconActionButton>
        </div>
      ),
    },
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <AdminPageHeader
          badge="Home"
          title="Banners da home"
          description="Campanhas do hero desktop/mobile."
        />
        <Link
          href="/admin/banners/novo"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#00A79D] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#008f86]"
        >
          Nova campanha
        </Link>
      </div>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <AdminCard
        title="Itens cadastrados"
        description={
          loading
            ? "Carregando..."
            : campaigns.length > 0
              ? `${campaigns.length} ${campaigns.length === 1 ? "registro" : "registros"}`
              : undefined
        }
      >
        <AdminDataTable
          empty="Nenhuma campanha cadastrada."
          pageSize={10}
          columns={[
            { key: "item", header: "Item" },
            { key: "status", header: "Status" },
            { key: "actions", header: "Ações" },
          ]}
          rows={rows}
        />
      </AdminCard>
    </div>
  );
}
