"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "crypto";
import {
  SITE_ACCESS_COOKIE,
  createSiteAccessToken,
  getSiteAccessCookieOptions,
  getSiteAccessPassword,
  getSiteAccessSecret,
  isSiteAccessGateEnabled,
} from "@/lib/site-access";
import {
  checkRateLimit,
  clientIpFromHeaders,
  resetRateLimit,
} from "@/lib/cms/rate-limit";

export type UnlockState = {
  error: string;
};

function safeEqual(a: string, b: string): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function unlockSite(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  if (!isSiteAccessGateEnabled()) {
    redirect("/");
  }

  const headerStore = await headers();
  const ip = clientIpFromHeaders(headerStore);
  const rate = checkRateLimit(`site-access:ip:${ip}`, {
    limit: 8,
    windowMs: 15 * 60_000,
    blockMs: 15 * 60_000,
  });
  if (!rate.ok) {
    return {
      error: `Muitas tentativas. Aguarde ${rate.retryAfterSec}s e tente novamente.`,
    };
  }

  const password = String(formData.get("password") ?? "");
  const expected = getSiteAccessPassword();
  const secret = getSiteAccessSecret();

  if (!expected || !secret || !safeEqual(password, expected)) {
    return { error: "Senha incorreta. Tente novamente." };
  }

  resetRateLimit(`site-access:ip:${ip}`);

  const cookieStore = await cookies();
  cookieStore.set(
    SITE_ACCESS_COOKIE,
    createSiteAccessToken(secret),
    getSiteAccessCookieOptions(),
  );

  redirect("/");
}
