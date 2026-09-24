import type { ReactNode } from "react";
import { requireSuperAdminPage } from "@/lib/cms/require-page";

export default async function Layout({ children }: { children: ReactNode }) {
  await requireSuperAdminPage();
  return children;
}
