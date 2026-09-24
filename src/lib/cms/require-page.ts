import { redirect } from "next/navigation";
import { getAdminSession } from "./auth";
import {
  canAccess,
  type PermissionModule,
} from "./permissions";

export async function requireModulePage(module: PermissionModule) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (session.mustChangePassword) redirect("/admin/trocar-senha");
  if (!canAccess(session, module, "view")) redirect("/admin");
  return session;
}

export async function requireSuperAdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (session.mustChangePassword) redirect("/admin/trocar-senha");
  if (!session.isSuperAdmin) redirect("/admin");
  return session;
}
