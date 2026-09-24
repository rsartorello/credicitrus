"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
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
import {
  MONTHS,
  monthLabel,
  uploadCmsFile,
  type AdminCategory,
  type AdminDocument,
} from "@/components/admin/useCmsModuleDocuments";

function buildRelatorioLabel(
  category: AdminCategory | undefined,
  year: string,
  month: string,
  semester: string,
) {
  if (!category) return year || "Documento";
  if (category.UiType === "monthly") {
    return `${year} · ${monthLabel(month)}`;
  }
  if (category.UiType === "semestral") {
    return `${year} (${semester === "2S" ? "2º Semestre" : "1º Semestre"})`;
  }
  if (semester) {
    return `${year} (${semester === "2S" ? "2º Semestre" : "1º Semestre"})`;
  }
  return year || category.Title;
}

export type EditDocumentModule =
  | "relatorios"
  | "normativos"
  | "etica"
  | "tarifas"
  | "assembleia";

const MODULE_META: Record<
  EditDocumentModule,
  { listHref: string; title: string; badge: string }
> = {
  relatorios: {
    listHref: "/admin/relatorios",
    title: "Editar relatório",
    badge: "Transparência",
  },
  normativos: {
    listHref: "/admin/normativos",
    title: "Editar normativo",
    badge: "Transparência",
  },
  etica: {
    listHref: "/admin/etica",
    title: "Editar card de ética",
    badge: "Transparência",
  },
  tarifas: {
    listHref: "/admin/tarifas",
    title: "Editar tabela de tarifas",
    badge: "Transparência",
  },
  assembleia: {
    listHref: "/admin/assembleia",
    title: "Editar documento de assembleia",
    badge: "Transparência",
  },
};

export function EditDocumentPage({
  module,
  documentId,
}: {
  module: EditDocumentModule;
  documentId: number;
}) {
  const router = useRouter();
  const meta = MODULE_META[module];
  const [doc, setDoc] = useState<AdminDocument | null>(null);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const [categoryId, setCategoryId] = useState<number | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [semester, setSemester] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [source, setSource] = useState<"file" | "url">("file");
  const [externalUrl, setExternalUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [published, setPublished] = useState(true);
  const [isCurrent, setIsCurrent] = useState(false);

  const selected = useMemo(
    () => categories.find((c) => c.Id === Number(categoryId)),
    [categories, categoryId],
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      const me = await cmsFetch("/api/cms/auth/me");
      if (!me.ok) {
        router.replace("/admin/login");
        return;
      }

      const [docRes, catRes] = await Promise.all([
        cmsFetch(`/api/cms/documents/${documentId}`),
        cmsFetch(`/api/cms/categories?module=${module}`),
      ]);

      if (!docRes.ok) {
        setError("Documento não encontrado.");
        setLoading(false);
        return;
      }

      const docJson = await docRes.json();
      const catJson = await catRes.json();
      const loaded = docJson.document as AdminDocument;
      if (loaded.Module && loaded.Module !== module) {
        setError("Este documento não pertence a este módulo.");
        setLoading(false);
        return;
      }

      setDoc(loaded);
      setCategories(catJson.categories || []);
      setCategoryId(loaded.CategoryId);
      setTitle(loaded.Title);
      setDescription(loaded.Description || "");
      setLabel(loaded.Label || "");
      setYear(loaded.Year || "");
      setMonth(loaded.Month || "");
      setSemester(loaded.Semester || "");
      setSortOrder(loaded.SortOrder || 0);
      setPublished(loaded.IsPublished);
      setIsCurrent(loaded.IsCurrent);
      setSource(loaded.ExternalUrl ? "url" : "file");
      setExternalUrl(loaded.ExternalUrl || "");
      setFile(null);
      setError("");
      setLoading(false);
    }

    void load();
  }, [documentId, module, router]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!doc) return;
    setBusy(true);
    setError("");

    try {
      const payload: Record<string, unknown> = {
        isPublished: published,
      };

      if (module === "relatorios") {
        if (!categoryId) throw new Error("Selecione a categoria.");
        const autoLabel =
          label || buildRelatorioLabel(selected, year, month, semester);
        payload.categoryId = Number(categoryId);
        payload.title = `${selected?.Title || "Relatório"} ${autoLabel}`.trim();
        payload.label = autoLabel;
        payload.year = year || null;
        payload.month = selected?.UiType === "monthly" ? month || null : null;
        payload.semester =
          selected?.UiType === "semestral" || semester
            ? semester || null
            : null;
      } else if (module === "etica") {
        payload.title = title;
        payload.description = description;
      } else if (module === "tarifas") {
        payload.title = title || "Tabela de Tarifas";
        payload.isCurrent = isCurrent;
      } else {
        // normativos / assembleia
        payload.title = title;
        payload.sortOrder = sortOrder;
        if (source === "url") {
          if (!externalUrl.trim()) throw new Error("Informe a URL externa.");
          payload.externalUrl = externalUrl.trim();
          payload.filePath = null;
        }
      }

      if (file) {
        payload.filePath = await uploadCmsFile(module, file);
        payload.externalUrl = null;
      } else if (module === "normativos" || module === "assembleia") {
        if (source === "file" && !doc.FilePath && !doc.ExternalUrl) {
          throw new Error("Selecione um PDF ou informe um link externo.");
        }
      }

      const res = await cmsFetch(`/api/cms/documents/${documentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Erro ao atualizar");

      router.push(meta.listHref);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <AdminPageHeader
          badge={meta.badge}
          title={meta.title}
          description="Carregando documento..."
        />
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="space-y-4">
        <AdminPageHeader
          badge={meta.badge}
          title={meta.title}
          description="Não foi possível abrir o item."
        />
        {error ? <AdminAlert>{error}</AdminAlert> : null}
        <Link href={meta.listHref} className="text-sm font-semibold text-[#00A79D] hover:underline">
          Voltar à lista
        </Link>
      </div>
    );
  }

  const showListFields = module === "normativos" || module === "assembleia";
  const currentFileUrl = doc.publicUrl;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AdminPageHeader
          badge={meta.badge}
          title={meta.title}
          description="Atualize os dados. Se enviar um novo PDF, o arquivo anterior é removido do servidor."
        />
        <Link
          href={meta.listHref}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#003641] hover:bg-gray-50"
        >
          Voltar
        </Link>
      </div>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <AdminCard title="Dados do item">
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          {module === "relatorios" ? (
            <>
              <Field label="Categoria">
                <select
                  className={selectClass}
                  style={selectStyle}
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(e.target.value ? Number(e.target.value) : "");
                    setMonth("");
                    setSemester("");
                  }}
                  required
                >
                  <option value="">Selecione...</option>
                  {categories.map((c) => (
                    <option key={c.Id} value={c.Id}>
                      {c.Title}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Ano" hint="Ex.: 2025">
                <input
                  className={inputClass}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </Field>
              {selected?.UiType === "monthly" ? (
                <Field label="Mês">
                  <select
                    className={selectClass}
                    style={selectStyle}
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                  >
                    <option value="">Selecione...</option>
                    {MONTHS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </Field>
              ) : null}
              {selected?.UiType === "semestral" ||
              selected?.Slug === "ouvidoria" ||
              selected?.Slug === "canal-etica" ||
              selected?.Slug === "transparencia-salarial" ? (
                <Field label="Semestre">
                  <select
                    className={selectClass}
                    style={selectStyle}
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  >
                    <option value="">—</option>
                    <option value="1S">1º Semestre</option>
                    <option value="2S">2º Semestre</option>
                  </select>
                </Field>
              ) : null}
              <Field label="Label no site (opcional)">
                <input
                  className={inputClass}
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </Field>
            </>
          ) : null}

          {module === "etica" || module === "tarifas" || showListFields ? (
            <Field label={module === "etica" ? "Título do card" : "Título"}>
              <input
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={module !== "tarifas"}
              />
            </Field>
          ) : null}

          {module === "etica" ? (
            <div className="md:col-span-2">
              <Field label="Descrição">
                <textarea
                  className={inputClass}
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Field>
            </div>
          ) : null}

          {showListFields ? (
            <>
              <div className="flex flex-wrap gap-2 md:col-span-2">
                <button
                  type="button"
                  onClick={() => setSource("file")}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${source === "file" ? "bg-[#003641] text-white" : "bg-white text-[#003641] ring-1 ring-gray-200"}`}
                >
                  Arquivo PDF
                </button>
                <button
                  type="button"
                  onClick={() => setSource("url")}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${source === "url" ? "bg-[#003641] text-white" : "bg-white text-[#003641] ring-1 ring-gray-200"}`}
                >
                  Link externo
                </button>
              </div>
              {source === "url" ? (
                <div className="md:col-span-2">
                  <Field label="URL externa">
                    <input
                      className={inputClass}
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      required
                    />
                  </Field>
                </div>
              ) : null}
              <Field label="Ordem de exibição">
                <input
                  type="number"
                  className={inputClass}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                />
              </Field>
            </>
          ) : null}

          {module === "tarifas" ? (
            <label className="flex items-center gap-2 text-sm font-medium md:col-span-2">
              <input
                type="checkbox"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
              />
              Marcar como vigente (Header/Rodapé)
            </label>
          ) : null}

          {(module !== "normativos" && module !== "assembleia") ||
          source === "file" ? (
            <div className="md:col-span-2 space-y-2">
              <FileDropzone
                label="Atualizar arquivo PDF"
                required={false}
                value={file}
                onChange={setFile}
                accept="application/pdf,.pdf"
                hint="Opcional. Ao enviar um novo PDF, o arquivo anterior é apagado do servidor."
              />
              {currentFileUrl && !file ? (
                <p className="text-xs text-[#003641]/60">
                  Arquivo atual:{" "}
                  <a
                    href={currentFileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#00A79D] hover:underline"
                  >
                    abrir
                  </a>
                </p>
              ) : null}
              {file ? (
                <AdminAlert tone="info">
                  O PDF anterior será removido do disco após salvar.
                </AdminAlert>
              ) : null}
            </div>
          ) : null}

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
            <GhostButton onClick={() => router.push(meta.listHref)}>
              Cancelar
            </GhostButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
