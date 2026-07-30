"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SITE_ACCESS_COOKIE,
  SITE_ACCESS_PASSWORD,
  SITE_ACCESS_SECRET,
} from "@/lib/site-access";

export type UnlockState = {
  error: string;
};

export async function unlockSite(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const password = String(formData.get("password") ?? "");

  if (password !== SITE_ACCESS_PASSWORD) {
    return { error: "Senha incorreta. Tente novamente." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SITE_ACCESS_COOKIE, SITE_ACCESS_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/");
}
