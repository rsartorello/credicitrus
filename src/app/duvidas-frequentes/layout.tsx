import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PageGeoJsonLd } from "@/components/seo/PageGeoJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";

export const metadata: Metadata = buildPageMetadata("/duvidas-frequentes");

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageGeoJsonLd path="/duvidas-frequentes" />
      <FaqPageJsonLd />
      {children}
    </>
  );
}
