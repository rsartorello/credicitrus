import { NextRequest, NextResponse } from "next/server";
import {
  SITE_ACCESS_COOKIE,
  SITE_ACCESS_SECRET,
} from "@/lib/site-access";

const NOINDEX_HEADER = "noindex, nofollow, noarchive, nosnippet, noimageindex";

function withNoIndex(response: NextResponse) {
  response.headers.set("X-Robots-Tag", NOINDEX_HEADER);
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SITE_ACCESS_COOKIE)?.value;
  const isAuthenticated = token === SITE_ACCESS_SECRET;

  if (pathname === "/acesso" || pathname.startsWith("/acesso/")) {
    if (isAuthenticated) {
      return withNoIndex(NextResponse.redirect(new URL("/", request.url)));
    }
    return withNoIndex(NextResponse.next());
  }

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/acesso";
    url.search = "";
    return withNoIndex(NextResponse.redirect(url));
  }

  return withNoIndex(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|.*\\..*).*)",
  ],
};
