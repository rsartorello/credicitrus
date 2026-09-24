import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PageGeoJsonLd } from "@/components/seo/PageGeoJsonLd";
import { AgenciasJsonLd } from "@/components/seo/AgenciasJsonLd";

export const metadata: Metadata = buildPageMetadata("/nossas-agencias");

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageGeoJsonLd path="/nossas-agencias" />
      <AgenciasJsonLd />
      {children}
    </>
  );
}
