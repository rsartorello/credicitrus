"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  PERMISSION_MODULE_LABELS,
  PERMISSION_MODULES,
  type PermissionLevel,
  type PermissionModule,
} from "@/lib/cms/permissions";

export function emptyPerms(): Record<PermissionModule, PermissionLevel> {
  return {
    relatorios: "none",
    normativos: "none",
    etica: "none",
    tarifas: "none",
    assembleia: "none",
    banners: "none",
  };
}

export function PermissionsTable({
  permissions,
  isSuperAdmin,
  onChange,
}: {
  permissions: Record<PermissionModule, PermissionLevel>;
  isSuperAdmin: boolean;
  onChange: (next: Record<PermissionModule, PermissionLevel>) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[#f8f9fa] text-xs uppercase tracking-wide text-[#003641]/45">
          <tr>
            <th className="px-3 py-2">Módulo</th>
            <th className="px-3 py-2">Permissão</th>
          </tr>
        </thead>
        <tbody>
          {PERMISSION_MODULES.map((module) => (
            <tr key={module} className="border-t border-gray-100">
              <td className="px-3 py-2 font-medium">
                {PERMISSION_MODULE_LABELS[module]}
              </td>
              <td className="px-3 py-2">
                <select
                  className={selectClass}
                  style={selectStyle}
                  value={permissions[module]}
                  disabled={isSuperAdmin}
                  onChange={(e) =>
                    onChange({
                      ...permissions,
                      [module]: e.target.value as PermissionLevel,
                    })
                  }
                >
                  <option value="none">Sem acesso</option>
                  <option value="view">Visualizar</option>
                  <option value="edit">Editar</option>
                  <option value="publish">Publicar</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CreateUserPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [permissions, setPermissions] = useState(emptyPerms());

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await cmsFetch("/api/cms/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          displayName,
          password,
          isSuperAdmin,
          permissions,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Erro ao criar usuário");
      router.push("/admin/usuarios");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AdminPageHeader
          badge="Acesso"
          title="Novo usuário"
          description="Defina login, senha e o nível por módulo."
        />
        <Link
          href="/admin/usuarios"
          className="text-sm font-semibold text-[#00A79D] hover:underline"
        >
          Voltar à lista
        </Link>
      </div>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <AdminCard
        title="Dados do usuário"
        description="Níveis: view (só lê), edit (cria/altera), publish (publica no site)."
      >
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <Field label="Login">
            <input
              className={inputClass}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
            />
          </Field>
          <Field label="Nome de exibição">
            <input
              className={inputClass}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </Field>
          <Field label="Senha" hint="Mínimo 8 caracteres">
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </Field>
          <label className="flex items-center gap-2 self-end pb-2 text-sm font-medium text-[#003641]">
            <input
              type="checkbox"
              checked={isSuperAdmin}
              onChange={(e) => setIsSuperAdmin(e.target.checked)}
            />
            Super admin (acesso total + usuários)
          </label>

          <div className="md:col-span-2">
            <PermissionsTable
              permissions={permissions}
              isSuperAdmin={isSuperAdmin}
              onChange={setPermissions}
            />
          </div>

          <div className="flex flex-wrap gap-2 md:col-span-2">
            <PrimaryButton busy={busy}>Criar usuário</PrimaryButton>
            <GhostButton onClick={() => router.push("/admin/usuarios")}>
              Cancelar
            </GhostButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
