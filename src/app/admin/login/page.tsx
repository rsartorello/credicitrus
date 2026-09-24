"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cmsFetch, ensureClientCsrf } from "@/components/admin/cmsFetch";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void ensureClientCsrf();
    cmsFetch("/api/cms/auth/me")
      .then(async (res) => {
        if (!res.ok) return;
        const data = (await res.json()) as { mustChangePassword?: boolean };
        router.replace(data.mustChangePassword ? "/admin/trocar-senha" : "/admin");
      })
      .catch(() => undefined);
  }, [router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const res = await cmsFetch("/api/cms/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });

    setLoading(false);
    if (!res.ok) {
      if (res.status === 429) {
        setError("Muitas tentativas. Aguarde e tente novamente.");
      } else {
        setError("Usuário ou senha inválidos.");
      }
      return;
    }

    const data = (await res.json().catch(() => ({}))) as {
      mustChangePassword?: boolean;
    };
    router.replace(data.mustChangePassword ? "/admin/trocar-senha" : "/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/10 bg-[#003641] text-white">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
          <span className="text-lg font-extrabold tracking-wide">
            CMS Credicitrus
          </span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#003641]">Acesso ao CMS</h1>
          <p className="mt-2 text-sm text-[#003641]/65">
            Entre com seu usuário para gerenciar o conteúdo.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-[#003641]">
              Usuário
              <input
                name="username"
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20"
                autoComplete="username"
              />
            </label>
            <label className="block text-sm font-medium text-[#003641]">
              Senha
              <input
                name="password"
                type="password"
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20"
                autoComplete="current-password"
              />
            </label>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#00A79D] px-4 py-2.5 font-bold text-white hover:bg-[#008f86] disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
