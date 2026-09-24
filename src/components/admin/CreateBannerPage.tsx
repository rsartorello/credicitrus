"use client";

import { FormEvent, useState } from "react";
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

export function CreateBannerPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
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

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (!desktop) throw new Error("A imagem desktop é obrigatória.");
      const imageDesktopPath = await uploadCmsFile("banners", desktop);
      const imageMobilePath = mobile
        ? await uploadCmsFile("banners", mobile)
        : null;

      const res = await cmsFetch("/api/cms/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          imageDesktopPath,
          imageMobilePath,
          ctaLabel: ctaLabel || null,
          ctaHref: ctaHref || null,
          ctaVariant,
          sortOrder,
          startsAt: startsAt || null,
          endsAt: endsAt || null,
          isPublished: published,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Erro ao criar");

      router.push("/admin/banners");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AdminPageHeader
          badge="Home"
          title="Nova campanha"
          description="Desktop é obrigatório. Mobile é recomendado para responsividade."
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

          <FileDropzone
            label="Imagem desktop"
            required
            accept="image/webp,image/jpeg,image/png,.webp,.jpg,.jpeg,.png"
            value={desktop}
            onChange={setDesktop}
          />
          <FileDropzone
            label="Imagem mobile (opcional)"
            accept="image/webp,image/jpeg,image/png,.webp,.jpg,.jpeg,.png"
            value={mobile}
            onChange={setMobile}
          />

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
            Publicar imediatamente
          </label>

          <div className="flex flex-wrap items-center gap-3 md:col-span-2">
            <PrimaryButton busy={busy}>Salvar</PrimaryButton>
            <GhostButton onClick={() => router.push("/admin/banners")}>
              Cancelar
            </GhostButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
