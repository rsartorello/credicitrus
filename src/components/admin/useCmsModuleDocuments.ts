"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cmsFetch } from "@/components/admin/cmsFetch";
import { useConfirmDelete } from "@/components/admin/ConfirmDialog";

export type AdminCategory = {
  Id: number;
  Module: string;
  Slug: string;
  Title: string;
  UiType: string | null;
};

export type AdminDocument = {
  Id: number;
  CategoryId: number;
  Title: string;
  Label: string | null;
  Description: string | null;
  Year: string | null;
  Month: string | null;
  Semester: string | null;
  ExternalUrl: string | null;
  FilePath: string | null;
  IsPublished: boolean;
  IsCurrent: boolean;
  SortOrder: number;
  CategoryTitle?: string;
  CategorySlug?: string;
  CategoryUiType?: string | null;
  Module?: string;
  publicUrl?: string | null;
};

export async function uploadCmsFile(
  module: string,
  file: File,
): Promise<string> {
  const form = new FormData();
  form.set("module", module);
  form.set("file", file);
  const res = await cmsFetch("/api/cms/upload", { method: "POST", body: form });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Falha no upload");
  return json.relativePath as string;
}

export function useCmsModuleDocuments(module: string) {
  const router = useRouter();
  const confirmDelete = useConfirmDelete();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [documents, setDocuments] = useState<AdminDocument[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const me = await cmsFetch("/api/cms/auth/me");
    if (!me.ok) {
      router.replace("/admin/login");
      return;
    }

    const [catRes, docRes] = await Promise.all([
      cmsFetch(`/api/cms/categories?module=${module}`),
      cmsFetch(`/api/cms/documents?module=${module}`),
    ]);

    if (!catRes.ok || !docRes.ok) {
      setError("Não foi possível carregar os dados. Confira o SQL Server e o CMS_ENABLED.");
      setLoading(false);
      return;
    }

    const catJson = await catRes.json();
    const docJson = await docRes.json();
    setCategories(catJson.categories || []);
    setDocuments(docJson.documents || []);
    setError("");
    setLoading(false);
  }, [module, router]);

  useEffect(() => {
    void load();
  }, [load]);

  async function createDocument(payload: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      const res = await cmsFetch("/api/cms/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Erro ao salvar");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
      throw err;
    } finally {
      setBusy(false);
    }
  }

  async function updateDocument(id: number, payload: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      const res = await cmsFetch(`/api/cms/documents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Erro ao atualizar");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar");
      throw err;
    } finally {
      setBusy(false);
    }
  }

  async function togglePublish(doc: AdminDocument) {
    await cmsFetch(`/api/cms/documents/${doc.Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !doc.IsPublished }),
    });
    await load();
  }

  async function toggleCurrent(doc: AdminDocument) {
    await cmsFetch(`/api/cms/documents/${doc.Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCurrent: !doc.IsCurrent, isPublished: true }),
    });
    await load();
  }

  async function removeDocument(id: number) {
    if (!(await confirmDelete("este item"))) return;
    await cmsFetch(`/api/cms/documents/${id}`, { method: "DELETE" });
    await load();
  }

  return {
    categories,
    documents,
    error,
    setError,
    busy,
    loading,
    load,
    createDocument,
    updateDocument,
    togglePublish,
    toggleCurrent,
    removeDocument,
  };
}

export const MONTHS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

export function monthLabel(month?: string | null) {
  return MONTHS.find((m) => m.value === month)?.label || month || "—";
}
