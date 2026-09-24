"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cmsFetch, ensureClientCsrf } from "@/components/admin/cmsFetch";
import { MIN_PASSWORD_LENGTH } from "@/lib/cms/password-policy";

export default function AdminChangePasswordPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    void ensureClientCsrf();
    cmsFetch("/api/cms/auth/me")
      .then(async (res) => {
        if (!res.ok) {
          router.replace("/admin/login");
          return;
        }
        const data = (await res.json()) as {
          username?: string;
          mustChangePassword?: boolean;
        };
        setUsername(data.username || "");
        if (!data.mustChangePassword) {
          router.replace("/admin");
          return;
        }
        setChecking(false);
      })
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [router]);

  async function onLogout() {
    await cmsFetch("/api/cms/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const currentPassword = String(form.get("currentPassword") ?? "");
    const newPassword = String(form.get("newPassword") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (newPassword !== confirmPassword) {
      setLoading(false);
      setError("A confirmação não confere com a nova senha.");
      return;
    }

    const res = await cmsFetch("/api/cms/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || "Não foi possível alterar a senha.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="text-sm text-[#003641]/70">Carregando...</p>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/10 bg-[#003641] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-lg font-extrabold tracking-wide">
            CMS Credicitrus
          </span>
          <button
            type="button"
            onClick={() => void onLogout()}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium hover:bg-white/20"
          >
            Sair{username ? ` (${username})` : ""}
          </button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#003641]">
            Troca de senha obrigatória
          </h1>
          <p className="mt-2 text-sm text-[#003641]/65">
            Por segurança, defina uma nova senha antes de acessar o painel.
            Mínimo de {MIN_PASSWORD_LENGTH} caracteres.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-[#003641]">
              Senha atual
              <input
                name="currentPassword"
                type="password"
                required
                autoComplete="current-password"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20"
              />
            </label>
            <label className="block text-sm font-medium text-[#003641]">
              Nova senha
              <input
                name="newPassword"
                type="password"
                required
                minLength={MIN_PASSWORD_LENGTH}
                autoComplete="new-password"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20"
              />
            </label>
            <label className="block text-sm font-medium text-[#003641]">
              Confirmar nova senha
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={MIN_PASSWORD_LENGTH}
                autoComplete="new-password"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20"
              />
            </label>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#00A79D] px-4 py-2.5 font-bold text-white hover:bg-[#008f86] disabled:opacity-60"
            >
              {loading ? "Salvando..." : "Salvar nova senha"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
