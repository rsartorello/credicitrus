import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ module?: string }>;
}) {
  const params = await searchParams;
  const module = params.module;
  const map: Record<string, string> = {
    relatorios: "/admin/relatorios",
    normativos: "/admin/normativos",
    etica: "/admin/etica",
    tarifas: "/admin/tarifas",
    assembleia: "/admin/assembleia",
  };
  redirect(map[module || ""] || "/admin/relatorios");
}
