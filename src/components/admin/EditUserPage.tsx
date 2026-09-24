"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cmsFetch } from "@/components/admin/cmsFetch";
import {
  emptyPerms,
  PermissionsTable,
} from "@/components/admin/CreateUserPage";
import {
  AdminAlert,
  AdminCard,
  AdminPageHeader,
  Field,
  GhostButton,
  PrimaryButton,
  inputClass,
} from "@/components/admin/ui";
import type { PermissionLevel, PermissionModule } from "@/lib/cms/permissions";

type UserDetail = {
  Id: number;
  Username: string;
  DisplayName: string;
  IsSuperAdmin: boolean;
  IsActive: boolean;
  permissions: Record<PermissionModule, PermissionLevel>;
};

export function EditUserPage({ id }: { id: number }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDetail | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [permissions, setPermissions] = useState(emptyPerms());

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const me = await cmsFetch("/api/cms/auth/me");
      if (!me.ok) {
        router.replace("/admin/login");
        return;
      }
      const res = await cmsFetch(`/api/cms/users/${id}`);
      if (!res.ok) {
        if (!cancelled) {
          setError("Usuário não encontrado.");
          setLoading(false);
        }
        return;
      }
      const json = await res.json();
      const next = json.user as UserDetail;
      if (cancelled) return;
      setUser(next);
      setDisplayName(next.DisplayName);
      setIsSuperAdmin(next.IsSuperAdmin);
      setIsActive(next.IsActive);
      setPermissions({ ...emptyPerms(), ...next.permissions });
      setError("");
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [id, router]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await cmsFetch(`/api/cms/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName,
          password: password || undefined,
          isSuperAdmin,
          isActive,
          permissions,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Erro ao atualizar");
      router.push("/admin/usuarios");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          badge="Acesso"
          title="Editar usuário"
          description="Carregando..."
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          badge="Acesso"
          title="Editar usuário"
          description="Não encontrado."
        />
        {error ? <AdminAlert>{error}</AdminAlert> : null}
        <Link
          href="/admin/usuarios"
          className="text-sm font-semibold text-[#00A79D] hover:underline"
        >
          Voltar à lista
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AdminPageHeader
          badge="Acesso"
          title="Editar usuário"
          description={`Atualize os dados de @${user.Username}.`}
        />
        <Link
          href="/admin/usuarios"
          className="text-sm font-semibold text-[#00A79D] hover:underline"
        >
          Voltar à lista
        </Link>
      </div>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <AdminCard title="Dados do usuário">
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <Field label="Login">
            <input className={inputClass} value={user.Username} disabled />
          </Field>
          <Field label="Nome de exibição">
            <input
              className={inputClass}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </Field>
          <Field label="Nova senha" hint="Deixe em branco para manter a atual">
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              autoComplete="new-password"
            />
          </Field>
          <div className="flex flex-col gap-3 self-end pb-2 text-sm font-medium text-[#003641]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isSuperAdmin}
                onChange={(e) => setIsSuperAdmin(e.target.checked)}
              />
              Super admin (acesso total + usuários)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              Usuário ativo
            </label>
          </div>

          <div className="md:col-span-2">
            <PermissionsTable
              permissions={permissions}
              isSuperAdmin={isSuperAdmin}
              onChange={setPermissions}
            />
          </div>

          <div className="flex flex-wrap gap-2 md:col-span-2">
            <PrimaryButton busy={busy}>Salvar alterações</PrimaryButton>
            <GhostButton onClick={() => router.push("/admin/usuarios")}>
              Cancelar
            </GhostButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
