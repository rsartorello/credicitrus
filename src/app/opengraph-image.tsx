import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const runtime = "edge";
export const alt = `${SITE_NAME} — Cooperativa de Crédito`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #003641 0%, #005560 55%, #00A79D 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          Cooperativa de Crédito
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, maxWidth: 820, opacity: 0.92 }}>
            Soluções financeiras para você, sua empresa e o agronegócio.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
