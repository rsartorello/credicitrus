import type { ReactNode } from "react";
import { requireModulePage } from "@/lib/cms/require-page";

export default async function Layout({ children }: { children: ReactNode }) {
  await requireModulePage("banners");
  return children;
}
