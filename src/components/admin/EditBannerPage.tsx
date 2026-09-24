"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileDropzone } from "@/components/admin/FileDropzone";
import { cmsFetch } from "@/components/admin/cmsFetch";
import {
  AdminAlert,
  AdminCard,
  AdminPageHeader,
  Field,
  GhostButton,
  PrimaryButton,
  inputClass,
  selectClass,
  selectStyle,
} from "@/components/admin/ui";
import { uploadCmsFile } from "@/components/admin/useCmsModuleDocuments";

type Campaign = {
  Id: number;
  Title: string;
  IsPublished: boolean;
  CtaLabel: string | null;
  CtaHref: string | null;
  CtaVariant: string | null;
  SortOrder: number;
  StartsAt: string | null;
  EndsAt: string | null;
  imageDesktopUrl?: string | null;
  imageMobileUrl?: string | null;
};

function toLocalInput(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function EditBannerPage({ campaignId }: { campaignId: number }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  const [title, setTitle] = useState("");
  const [desktop, setDesktop] = useState<File | null>(null);
  const [mobile, setMobile] = useState<File | null>(null);
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaHref, setCtaHref] = useState("");
  const [ctaVariant, setCtaVariant] = useState("primary");
  const [sortOrder, setSortOrder] = useState(0);
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [published, setPublished] = useState(true);

  useEffect(() => {
    async function load() {
      const me = await cmsFetch("/api/cms/auth/me");
      if (!me.ok) {
        router.replace("/admin/login");
        return;
      }
      const res = await cmsFetch(`/api/cms/campaigns/${campaignId}`);
      if (!res.ok) {
        setError("Campanha não encontrada.");
        setLoading(false);
        return;
      }
      const json = await res.json();
      const item = json.campaign as Campaign;
      setCampaign(item);
      setTitle(item.Title);
      setCtaLabel(item.CtaLabel || "");
      setCtaHref(item.CtaHref || "");
      setCtaVariant(item.CtaVariant || "primary");
      setSortOrder(item.SortOrder || 0);
      setStartsAt(toLocalInput(item.StartsAt));
      setEndsAt(toLocalInput(item.EndsAt));
      setPublished(item.IsPublished);
      setDesktop(null);
      setMobile(null);
      setLoading(false);
    }
    void load();
  }, [campaignId, router]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {
        title,
        ctaLabel: ctaLabel || null,
        ctaHref: ctaHref || null,
        ctaVariant,
        sortOrder,
        startsAt: startsAt || null,
        endsAt: endsAt || null,
        isPublished: published,
      };
      if (desktop) {
        payload.imageDesktopPath = await uploadCmsFile("banners", desktop);
      }
      if (mobile) {
        payload.imageMobilePath = await uploadCmsFile("banners", mobile);
      }

      const res = await cmsFetch(`/api/cms/campaigns/${campaignId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Erro ao atualizar");

      router.push("/admin/banners");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <AdminPageHeader
        badge="Home"
        title="Editar campanha"
        description="Carregando..."
      />
    );
  }

  if (!campaign) {
    return (
      <div className="space-y-4">
        <AdminPageHeader badge="Home" title="Editar campanha" description="Não encontrada." />
        {error ? <AdminAlert>{error}</AdminAlert> : null}
        <Link href="/admin/banners" className="text-sm font-semibold text-[#00A79D] hover:underline">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AdminPageHeader
          badge="Home"
          title="Editar campanha"
          description="Ao enviar uma nova imagem, a anterior é removida do servidor."
        />
        <Link
          href="/admin/banners"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#003641] hover:bg-gray-50"
        >
          Voltar
        </Link>
      </div>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <AdminCard title="Dados da campanha">
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field label="Título interno">
              <input
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Field>
          </div>

          <div className="space-y-2">
            <FileDropzone
              label="Atualizar imagem desktop"
              accept="image/webp,image/jpeg,image/png,.webp,.jpg,.jpeg,.png"
              value={desktop}
              onChange={setDesktop}
              hint="Opcional. Substitui e apaga a imagem anterior."
            />
            {campaign.imageDesktopUrl && !desktop ? (
              <p className="text-xs text-[#003641]/60">
                Atual:{" "}
                <a
                  href={campaign.imageDesktopUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#00A79D] hover:underline"
                >
                  abrir
                </a>
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <FileDropzone
              label="Atualizar imagem mobile"
              accept="image/webp,image/jpeg,image/png,.webp,.jpg,.jpeg,.png"
              value={mobile}
              onChange={setMobile}
              hint="Opcional. Substitui e apaga a imagem anterior."
            />
            {campaign.imageMobileUrl && !mobile ? (
              <p className="text-xs text-[#003641]/60">
                Atual:{" "}
                <a
                  href={campaign.imageMobileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#00A79D] hover:underline"
                >
                  abrir
                </a>
              </p>
            ) : null}
          </div>

          {(desktop || mobile) && (
            <div className="md:col-span-2">
              <AdminAlert tone="info">
                A imagem anterior será removida do disco após salvar.
              </AdminAlert>
            </div>
          )}

          <Field label="Texto do botão (CTA)">
            <input
              className={inputClass}
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
            />
          </Field>
          <Field label="Link do botão">
            <input
              className={inputClass}
              value={ctaHref}
              onChange={(e) => setCtaHref(e.target.value)}
            />
          </Field>
          <Field label="Estilo do botão">
            <select
              className={selectClass}
              style={selectStyle}
              value={ctaVariant}
              onChange={(e) => setCtaVariant(e.target.value)}
            >
              <option value="primary">primary</option>
              <option value="secondary">secondary</option>
              <option value="outline">outline</option>
              <option value="verde">verde</option>
            </select>
          </Field>
          <Field label="Ordem">
            <input
              type="number"
              className={inputClass}
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />
          </Field>
          <Field label="Início da campanha">
            <input
              type="datetime-local"
              className={inputClass}
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
            />
          </Field>
          <Field label="Fim da campanha">
            <input
              type="datetime-local"
              className={inputClass}
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
            />
          </Field>

          <label className="flex items-center gap-2 text-sm font-medium md:col-span-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Publicado no site
          </label>

          <div className="flex flex-wrap items-center gap-3 md:col-span-2">
            <PrimaryButton busy={busy}>Salvar alterações</PrimaryButton>
            <GhostButton onClick={() => router.push("/admin/banners")}>
              Cancelar
            </GhostButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
