import { NextRequest, NextResponse } from "next/server";
import {
  SITE_ACCESS_COOKIE,
  getSiteAccessSecret,
  isSiteAccessGateEnabled,
  verifySiteAccessToken,
} from "@/lib/site-access";
import { isPublicIndexingEnabled } from "@/lib/site-url";

const NOINDEX_HEADER = "noindex, nofollow, noarchive, nosnippet, noimageindex";

function withSeoHeaders(response: NextResponse, forceNoIndex = false) {
  if (forceNoIndex || !isPublicIndexingEnabled()) {
    response.headers.set("X-Robots-Tag", NOINDEX_HEADER);
  }
  return response;
}

function isMetadataAssetPath(pathname: string): boolean {
  return (
    pathname === "/favicon.ico" ||
    pathname === "/icon" ||
    pathname === "/icon.png" ||
    pathname === "/apple-icon" ||
    pathname === "/apple-icon.png" ||
    pathname === "/opengraph-image" ||
    pathname.startsWith("/opengraph-image/")
  );
}

function isAlwaysNoIndexPath(pathname: string): boolean {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/media") ||
    pathname.startsWith("/acesso")
  );
}

function isSiteUnlocked(request: NextRequest): boolean {
  const token = request.cookies.get(SITE_ACCESS_COOKIE)?.value || "";
  const secret = getSiteAccessSecret();
  return Boolean(secret) && verifySiteAccessToken(token, secret);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ícones / OG do App Router não passam pelo gate
  if (isMetadataAssetPath(pathname)) {
    return NextResponse.next();
  }

  const gateOn = isSiteAccessGateEnabled();

  if (!gateOn) {
    if (pathname === "/acesso" || pathname.startsWith("/acesso/")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return withSeoHeaders(
      NextResponse.next(),
      isAlwaysNoIndexPath(pathname),
    );
  }

  // Gate ativo: staging fechado (site + CMS + APIs + mídia + arquivos públicos)
  const unlocked = isSiteUnlocked(request);

  if (pathname === "/acesso" || pathname.startsWith("/acesso/")) {
    if (unlocked) {
      return withSeoHeaders(
        NextResponse.redirect(new URL("/", request.url)),
        true,
      );
    }
    return withSeoHeaders(NextResponse.next(), true);
  }

  if (!unlocked) {
    if (pathname.startsWith("/api/")) {
      return withSeoHeaders(
        NextResponse.json(
          { error: "Site em modo restrito. Autentique-se em /acesso." },
          { status: 401 },
        ),
        true,
      );
    }

    const url = request.nextUrl.clone();
    url.pathname = "/acesso";
    url.search = "";
    return withSeoHeaders(NextResponse.redirect(url), true);
  }

  return withSeoHeaders(NextResponse.next(), true);
}

export const config = {
  // Inclui /media e /files (com extensão) no gate; exclui só assets do Next e ícones.
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.png|apple-icon\\.png|icon$|apple-icon$|opengraph-image).*)",
  ],
};
