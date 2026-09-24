"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, UserX } from "lucide-react";
import { cmsFetch } from "@/components/admin/cmsFetch";
import { useConfirm } from "@/components/admin/ConfirmDialog";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import {
  AdminAlert,
  AdminCard,
  AdminPageHeader,
  IconActionButton,
  IconActionLink,
  StatusPill,
} from "@/components/admin/ui";
import type { PermissionLevel, PermissionModule } from "@/lib/cms/permissions";

type UserRow = {
  Id: number;
  Username: string;
  DisplayName: string;
  IsSuperAdmin: boolean;
  IsActive: boolean;
  permissions: Record<PermissionModule, PermissionLevel>;
};

export default function UsuariosAdminPage() {
  const router = useRouter();
  const confirm = useConfirm();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const me = await cmsFetch("/api/cms/auth/me");
    if (!me.ok) {
      router.replace("/admin/login");
      return;
    }
    const meJson = await me.json();
    if (!meJson.isSuperAdmin) {
      setError("Apenas administradores podem gerenciar usuários.");
      setLoading(false);
      return;
    }

    const res = await cmsFetch("/api/cms/users");
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(
        json.error ||
          "Falha ao carregar usuários. Confira se o SQL 003_users foi aplicado.",
      );
      setLoading(false);
      return;
    }
    const json = await res.json();
    setUsers(json.users || []);
    setError("");
    setLoading(false);
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  async function deactivate(id: number) {
    const ok = await confirm({
      title: "Desativar este usuário?",
      description:
        "O usuário perderá o acesso ao CMS. Você poderá reativá-lo depois na edição.",
      confirmLabel: "Desativar definitivamente",
      tone: "danger",
      doubleConfirm: true,
      doubleConfirmTitle: "Confirma a desativação?",
      doubleConfirmDescription:
        "Esta é a última confirmação. O usuário não conseguirá mais entrar no painel.",
    });
    if (!ok) return;
    await cmsFetch(`/api/cms/users/${id}`, { method: "DELETE" });
    await load();
  }

  const rows = users.map((user) => ({
    id: user.Id,
    cells: {
      item: (
        <>
          <p className="font-semibold text-[#003641]">
            {user.DisplayName}{" "}
            <span className="font-medium text-[#003641]/55">
              @{user.Username}
            </span>
          </p>
          <p className="mt-1 text-xs text-[#003641]/55">
            {user.IsSuperAdmin ? "Super admin" : "Editor"}
          </p>
        </>
      ),
      status: (
        <StatusPill
          published={user.IsActive}
          labels={{ on: "Ativo", off: "Inativo" }}
        />
      ),
      actions: (
        <div className="flex flex-wrap items-center gap-1.5">
          <IconActionLink href={`/admin/usuarios/${user.Id}`} label="Editar">
            <Pencil className="h-4 w-4" strokeWidth={2} />
          </IconActionLink>
          {user.IsActive ? (
            <IconActionButton
              label="Desativar"
              tone="danger"
              onClick={() => void deactivate(user.Id)}
            >
              <UserX className="h-4 w-4" strokeWidth={2} />
            </IconActionButton>
          ) : null}
        </div>
      ),
    },
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <AdminPageHeader
          badge="Acesso"
          title="Usuários e permissões"
          description="Cadastre editores e defina o nível por módulo: nenhum, visualizar, editar ou publicar."
        />
        <Link
          href="/admin/usuarios/novo"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#00A79D] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#008f86]"
        >
          Novo usuário
        </Link>
      </div>

      {error ? <AdminAlert>{error}</AdminAlert> : null}

      <AdminCard
        title="Itens cadastrados"
        description={
          loading
            ? "Carregando..."
            : users.length > 0
              ? `${users.length} ${users.length === 1 ? "registro" : "registros"}`
              : undefined
        }
      >
        <AdminDataTable
          empty="Nenhum usuário no banco ainda. Você ainda pode entrar com o admin do `.env.local`."
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
