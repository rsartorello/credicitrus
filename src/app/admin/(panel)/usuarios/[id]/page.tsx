import { EditUserPage } from "@/components/admin/EditUserPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditUserPage id={Number(id)} />;
}
