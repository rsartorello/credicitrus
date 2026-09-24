"use client";

import { CSRF_COOKIE, CSRF_HEADER } from "@/lib/cms/csrf-constants";

function readCsrfFromDocument(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CSRF_COOKIE}=`));
  if (!match) return null;
  const raw = decodeURIComponent(match.slice(CSRF_COOKIE.length + 1));
  const token = raw.split(".")[0];
  return token || null;
}

/** Garante cookie CSRF (via /api/cms/auth/csrf) e devolve o token. */
export async function ensureClientCsrf(): Promise<string | null> {
  const existing = readCsrfFromDocument();
  if (existing) return existing;
  try {
    const res = await fetch("/api/cms/auth/csrf", { method: "GET", cache: "no-store" });
    if (!res.ok) return null;
    const json = (await res.json()) as { token?: string };
    return json.token || readCsrfFromDocument();
  } catch {
    return null;
  }
}

export async function cmsFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const method = (init.method || "GET").toUpperCase();
  const headers = new Headers(init.headers || {});

  if (method !== "GET" && method !== "HEAD") {
    const token = await ensureClientCsrf();
    if (token) headers.set(CSRF_HEADER, token);
  }

  return fetch(input, {
    ...init,
    headers,
    credentials: init.credentials ?? "same-origin",
  });
}
