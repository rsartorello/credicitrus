import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/Header/SiteHeader";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import {
  DEFAULT_DESCRIPTION,
  getSiteUrl,
  isPublicIndexingEnabled,
  SITE_NAME,
} from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = getSiteUrl();
const indexable = isPublicIndexingEnabled();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Cooperativa de Crédito`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  // Paths relative to the current origin (not metadataBase) so local/dev
  // never points icons at production. ?v= busts stale Next.js default caches.
  icons: {
    icon: [
      { url: "/favicon.ico?v=sicoob2", sizes: "any" },
      { url: "/icon.png?v=sicoob2", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png?v=sicoob2", type: "image/png", sizes: "180x180" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Cooperativa de Crédito`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Cooperativa de Crédito`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: indexable
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          noarchive: true,
          nosnippet: true,
        },
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <OrganizationJsonLd />
        <SiteHeader />
        <main className="flex-1 w-full flex flex-col">{children}</main>
      </body>
    </html>
  );
}
