import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  robots: {
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

/** Shell mínimo do CMS — sem menu (login e área autenticada compartilham só o fundo). */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f6f7] text-[#003641]">
      {children}
    </div>
  );
}
