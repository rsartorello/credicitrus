import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PageGeoJsonLd } from "@/components/seo/PageGeoJsonLd";

export const metadata: Metadata = buildPageMetadata("/para-voce/emprestimos-e-financiamentos");

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageGeoJsonLd path="/para-voce/emprestimos-e-financiamentos" />
      {children}
    </>
  );
}
