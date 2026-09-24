import { createHmac, timingSafeEqual } from "crypto";

/** Gate temporário — desligado por padrão. Ative só com SITE_ACCESS_ENABLED=true. */
export const SITE_ACCESS_COOKIE = "site_access";

const TOKEN_TTL_SEC = 60 * 60 * 24 * 7; // 7 dias

export function getSiteAccessPassword(): string {
  return process.env.SITE_ACCESS_PASSWORD || "";
}

export function getSiteAccessSecret(): string {
  return process.env.SITE_ACCESS_SECRET || "";
}

/**
 * Gate ativo somente quando:
 * - SITE_ACCESS_ENABLED=true
 * - senha e secret configurados
 * Por padrão permanece desligado.
 */
export function isSiteAccessGateEnabled(): boolean {
  if (process.env.SITE_ACCESS_ENABLED !== "true") return false;
  return Boolean(getSiteAccessPassword() && getSiteAccessSecret());
}

function base64UrlEncode(value: string | Buffer): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value: string): Buffer {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, "base64");
}

function sign(payloadB64: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

function safeEqualString(a: string, b: string): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * Token opaco assinado (HMAC-SHA256). Não embute o secret no cookie.
 * Formato: base64url(json).assinatura
 */
export function createSiteAccessToken(secret: string, nowSec = Math.floor(Date.now() / 1000)): string {
  const payload = JSON.stringify({
    v: 1,
    iat: nowSec,
    exp: nowSec + TOKEN_TTL_SEC,
  });
  const payloadB64 = base64UrlEncode(payload);
  return `${payloadB64}.${sign(payloadB64, secret)}`;
}

export function verifySiteAccessToken(
  token: string,
  secret: string,
  nowSec = Math.floor(Date.now() / 1000),
): boolean {
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, signature] = parts;
  if (!payloadB64 || !signature) return false;

  const expected = sign(payloadB64, secret);
  if (!safeEqualString(signature, expected)) return false;

  try {
    const raw = base64UrlDecode(payloadB64).toString("utf8");
    const data = JSON.parse(raw) as { v?: number; exp?: number };
    if (data.v !== 1 || typeof data.exp !== "number") return false;
    if (data.exp < nowSec) return false;
    return true;
  } catch {
    return false;
  }
}

export function getSiteAccessCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: TOKEN_TTL_SEC,
  };
}

/** @deprecated use getters */
export const SITE_ACCESS_PASSWORD = process.env.SITE_ACCESS_PASSWORD || "";
export const SITE_ACCESS_SECRET = process.env.SITE_ACCESS_SECRET || "";
