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
} from "@/components/admin/useCmsModuleDocuments";
import type { EditDocumentModule } from "@/components/admin/EditDocumentPage";

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

const META: Record<
  EditDocumentModule,
  { listHref: string; title: string; badge: string; description: string }
> = {
  relatorios: {
    listHref: "/admin/relatorios",
    title: "Novo relatório",
    badge: "Transparência",
    description: "Escolha a categoria e envie o PDF.",
  },
  normativos: {
    listHref: "/admin/normativos",
    title: "Novo normativo",
    badge: "Transparência",
    description: "PDF local ou link externo.",
  },
  etica: {
    listHref: "/admin/etica",
    title: "Novo card de ética",
    badge: "Transparência",
    description: "Título, descrição e PDF do card.",
  },
  tarifas: {
    listHref: "/admin/tarifas",
    title: "Nova tabela de tarifas",
    badge: "Transparência",
    description: "Envie o PDF e marque como vigente se for o caso.",
  },
  assembleia: {
    listHref: "/admin/assembleia",
    title: "Novo documento de assembleia",
    badge: "Transparência",
    description: "PDF local ou link externo.",
  },
};

export function CreateDocumentPage({ module }: { module: EditDocumentModule }) {
  const router = useRouter();
  const meta = META[module];
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
  const [isCurrent, setIsCurrent] = useState(true);

  const selected = useMemo(
    () => categories.find((c) => c.Id === Number(categoryId)),
    [categories, categoryId],
  );
  const defaultCategoryId = categories[0]?.Id;

  useEffect(() => {
    async function load() {
      const me = await cmsFetch("/api/cms/auth/me");
      if (!me.ok) {
        router.replace("/admin/login");
        return;
      }
      const res = await cmsFetch(`/api/cms/categories?module=${module}`);
      if (!res.ok) {
        setError("Não foi possível carregar categorias.");
        setLoading(false);
        return;
      }
      const json = await res.json();
      setCategories(json.categories || []);
      setLoading(false);
    }
    void load();
  }, [module, router]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      let payload: Record<string, unknown>;

      if (module === "relatorios") {
        if (!categoryId) throw new Error("Selecione a categoria.");
        if (!file) throw new Error("Selecione o PDF do relatório.");
        const autoLabel =
          label || buildRelatorioLabel(selected, year, month, semester);
        payload = {
          categoryId: Number(categoryId),
          title: `${selected?.Title || "Relatório"} ${autoLabel}`.trim(),
          label: autoLabel,
          year: year || null,
          month: selected?.UiType === "monthly" ? month || null : null,
          semester:
            selected?.UiType === "semestral" || semester
              ? semester || null
              : null,
          filePath: await uploadCmsFile("relatorios", file),
          isPublished: published,
        };
      } else if (module === "etica") {
        if (!defaultCategoryId) throw new Error("Categoria de ética não encontrada.");
        if (!file) throw new Error("Selecione o PDF do card.");
        payload = {
          categoryId: defaultCategoryId,
          title,
          description,
          filePath: await uploadCmsFile("etica", file),
          isPublished: published,
        };
      } else if (module === "tarifas") {
        if (!defaultCategoryId) throw new Error("Categoria de tarifas não encontrada.");
        if (!file) throw new Error("Selecione o PDF da tabela.");
        payload = {
          categoryId: defaultCategoryId,
          title: title || "Tabela de Tarifas",
          filePath: await uploadCmsFile("tarifas", file),
          isPublished: published,
          isCurrent,
        };
      } else {
        if (!defaultCategoryId) throw new Error("Categoria não encontrada.");
        if (source === "file" && !file) {
          throw new Error("Selecione um PDF ou troque para link externo.");
        }
        if (source === "url" && !externalUrl.trim()) {
          throw new Error("Informe a URL externa.");
        }
        payload = {
          categoryId: defaultCategoryId,
          title,
          filePath:
            source === "file" && file
              ? await uploadCmsFile(module, file)
              : null,
          externalUrl: source === "url" ? externalUrl.trim() : null,
          sortOrder,
          isPublished: published,
        };
      }

      const res = await cmsFetch("/api/cms/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Erro ao salvar");

      router.push(meta.listHref);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setBusy(false);
    }
  }

  const showListFields = module === "normativos" || module === "assembleia";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AdminPageHeader
          badge={meta.badge}
          title={meta.title}
          description={meta.description}
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
                  placeholder="2025"
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
                  Upload de PDF
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
            <div className="md:col-span-2">
              <FileDropzone
                label="Arquivo PDF"
                required={
                  module === "relatorios" ||
                  module === "etica" ||
                  module === "tarifas" ||
                  source === "file"
                }
                value={file}
                onChange={setFile}
                accept="application/pdf,.pdf"
              />
            </div>
          ) : null}

          <label className="flex items-center gap-2 text-sm font-medium md:col-span-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Publicar imediatamente no site
          </label>

          <div className="flex flex-wrap items-center gap-3 md:col-span-2">
            <PrimaryButton
              busy={busy}
              disabled={loading || (module !== "relatorios" && !defaultCategoryId)}
            >
              Salvar
            </PrimaryButton>
            <GhostButton onClick={() => router.push(meta.listHref)}>
              Cancelar
            </GhostButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
