import { NextRequest, NextResponse } from "next/server";

/**
 * Proteção CSRF para APIs cookie-authenticated:
 * exige Origin/Referer same-origin em métodos mutáveis.
 */
function expandLocalAliases(origin: string, into: Set<string>) {
  try {
    const url = new URL(origin);
    into.add(url.origin);
    if (url.hostname === "localhost") {
      into.add(`${url.protocol}//127.0.0.1${url.port ? `:${url.port}` : ""}`);
    }
    if (url.hostname === "127.0.0.1") {
      into.add(`${url.protocol}//localhost${url.port ? `:${url.port}` : ""}`);
    }
  } catch {
    // ignore
  }
}

export function assertSameOrigin(request: NextRequest): void {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") return;

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");
  if (!host) throw new Error("FORBIDDEN");

  const allowed = new Set<string>();
  const proto = request.headers.get("x-forwarded-proto") || "http";
  expandLocalAliases(`${proto}://${host}`, allowed);
  expandLocalAliases(`http://${host}`, allowed);
  expandLocalAliases(`https://${host}`, allowed);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    expandLocalAliases(siteUrl, allowed);
  }

  if (origin) {
    if (![...allowed].some((a) => a === origin)) {
      throw new Error("FORBIDDEN");
    }
    return;
  }

  if (referer) {
    try {
      const refOrigin = new URL(referer).origin;
      if (![...allowed].some((a) => a === refOrigin)) {
        throw new Error("FORBIDDEN");
      }
      return;
    } catch {
      throw new Error("FORBIDDEN");
    }
  }

  // Sem Origin/Referer em mutação → rejeita (navegadores modernos enviam Origin em fetch)
  throw new Error("FORBIDDEN");
}

export function isSafeHttpUrl(value: string | null | undefined): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    // permite caminhos relativos do site
    return value.startsWith("/") && !value.startsWith("//");
  }
}

export function sanitizeExternalUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!isSafeHttpUrl(trimmed)) {
    throw new Error("URL inválida");
  }
  return trimmed;
}

export function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Cache-Control", "no-store");
  return response;
}
