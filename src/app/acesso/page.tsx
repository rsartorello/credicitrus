import { redirect } from "next/navigation";
import { isSiteAccessGateEnabled } from "@/lib/site-access";
import AcessoGateForm from "./AcessoGateForm";

export default function AcessoPage() {
  if (!isSiteAccessGateEnabled()) {
    redirect("/");
  }

  return <AcessoGateForm />;
}
