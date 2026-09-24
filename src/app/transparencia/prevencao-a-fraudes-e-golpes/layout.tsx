import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PageGeoJsonLd } from "@/components/seo/PageGeoJsonLd";

export const metadata: Metadata = buildPageMetadata("/transparencia/prevencao-a-fraudes-e-golpes");

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageGeoJsonLd path="/transparencia/prevencao-a-fraudes-e-golpes" />
      {children}
    </>
  );
}
