"use client";

import type { ReactNode } from "react";
import Link from "next/link";

export function AdminAlert({
  tone = "error",
  children,
}: {
  tone?: "error" | "info" | "success";
  children: ReactNode;
}) {
  const styles =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : tone === "success"
        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
        : "border-sky-200 bg-sky-50 text-sky-800";

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles}`}>{children}</div>
  );
}

export function AdminCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#003641]">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-relaxed text-[#003641]/65">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function AdminPageHeader({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="space-y-2">
      {badge ? (
        <span className="inline-flex rounded-full bg-[#00A79D]/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#00A79D]">
          {badge}
        </span>
      ) : null}
      <h1 className="text-2xl font-extrabold tracking-tight text-[#003641] md:text-3xl">
        {title}
      </h1>
      <p className="max-w-3xl text-sm leading-relaxed text-[#003641]/70 md:text-base">
        {description}
      </p>
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-semibold text-[#003641]">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-[#003641]/55">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "mt-0 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#003641] outline-none transition focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20";

const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23003641' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")";

/** Select com o mesmo visual dos inputs (sem aparência nativa do SO). */
export const selectClass = `${inputClass} admin-select appearance-none pr-10`;

export const selectStyle = {
  backgroundImage: SELECT_CHEVRON,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.85rem center",
  backgroundSize: "12px 12px",
} as const;

export function StatusPill({
  published,
  extra,
  labels = { on: "Publicado", off: "Rascunho" },
}: {
  published: boolean;
  extra?: string;
  labels?: { on: string; off: string };
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
        published
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${published ? "bg-emerald-500" : "bg-amber-500"}`}
      />
      {published ? labels.on : labels.off}
      {extra ? ` · ${extra}` : ""}
    </span>
  );
}

export function PrimaryButton({
  children,
  busy,
  disabled,
  type = "submit",
  onClick,
}: {
  children: ReactNode;
  busy?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || busy}
      className="inline-flex items-center justify-center rounded-xl bg-[#00A79D] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#008f86] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {busy ? "Salvando..." : children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  tone = "neutral",
}: {
  children: ReactNode;
  onClick: () => void;
  tone?: "neutral" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
        tone === "danger"
          ? "border-red-200 text-red-700 hover:bg-red-50"
          : "border-gray-200 text-[#003641] hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

const iconActionClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-40";

const iconActionTone = {
  neutral: "border-gray-200 text-[#003641] hover:bg-gray-50",
  success: "border-emerald-200 text-emerald-700 hover:bg-emerald-50",
  warning: "border-amber-200 text-amber-700 hover:bg-amber-50",
  danger: "border-red-200 text-red-700 hover:bg-red-50",
} as const;

export function IconActionButton({
  label,
  onClick,
  tone = "neutral",
  children,
  disabled,
}: {
  label: string;
  onClick: () => void;
  tone?: keyof typeof iconActionTone;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`${iconActionClass} ${iconActionTone[tone]}`}
    >
      {children}
    </button>
  );
}

export function IconActionLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      title={label}
      aria-label={label}
      className={`${iconActionClass} ${iconActionTone.neutral}`}
    >
      {children}
    </Link>
  );
}

