import { EditDocumentPage } from "@/components/admin/EditDocumentPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditDocumentPage module="tarifas" documentId={Number(id)} />;
}
