const DEFAULT_SITE_URL = "https://www.credicitrus.com.br";
const DEFAULT_DEV_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    (process.env.NODE_ENV === "development"
      ? DEFAULT_DEV_SITE_URL
      : DEFAULT_SITE_URL);
  return raw.replace(/\/$/, "");
}

/**
 * Indexação pública.
 * SITE_ROBOTS_INDEX=true/false força o comportamento.
 * Se omitido: não indexa enquanto o gate /acesso estiver ativo.
 */
export function isPublicIndexingEnabled(): boolean {
  if (process.env.SITE_ROBOTS_INDEX === "false") return false;
  if (process.env.SITE_ROBOTS_INDEX === "true") return true;
  // Evita circular import: mesma regra do gate
  if (process.env.SITE_ACCESS_ENABLED !== "true") return true;
  const gatePassword = process.env.SITE_ACCESS_PASSWORD?.trim();
  const gateSecret = process.env.SITE_ACCESS_SECRET?.trim();
  return !gatePassword && !gateSecret;
}
