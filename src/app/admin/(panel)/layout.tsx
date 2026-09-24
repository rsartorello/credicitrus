import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { AdminClientProviders } from "@/components/admin/AdminClientProviders";
import { getAdminSession } from "@/lib/cms/auth";
import {
  canAccess,
  type PermissionModule,
} from "@/lib/cms/permissions";

const NAV: Array<{
  href: string;
  label: string;
  module?: PermissionModule;
  superAdminOnly?: boolean;
}> = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/relatorios", label: "Relatórios", module: "relatorios" },
  { href: "/admin/normativos", label: "Normativos", module: "normativos" },
  { href: "/admin/etica", label: "Ética", module: "etica" },
  { href: "/admin/tarifas", label: "Tarifas", module: "tarifas" },
  { href: "/admin/assembleia", label: "Assembleias", module: "assembleia" },
  { href: "/admin/banners", label: "Banners", module: "banners" },
  { href: "/admin/usuarios", label: "Usuários", superAdminOnly: true },
];

export default async function AdminPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  if (session.mustChangePassword) {
    redirect("/admin/trocar-senha");
  }

  const visibleNav = NAV.filter((item) => {
    if (item.superAdminOnly) return session.isSuperAdmin;
    if (!item.module) return true;
    return canAccess(session, item.module, "view");
  });

  return (
    <>
      <header className="border-b border-white/10 bg-[#003641] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/admin" className="text-lg font-extrabold tracking-wide">
              CMS Credicitrus
            </Link>
            <form
              action={async () => {
                "use server";
                const { logoutAdmin } = await import("@/lib/cms/auth");
                await logoutAdmin();
                redirect("/admin/login");
              }}
            >
              <button
                type="submit"
                className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium hover:bg-white/20"
              >
                Sair ({session.username})
              </button>
            </form>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1 text-sm">
            {visibleNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-lg px-3 py-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <AdminClientProviders>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </AdminClientProviders>
    </>
  );
}
