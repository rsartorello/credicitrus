export function isCmsEnabled(): boolean {
  return process.env.CMS_ENABLED === "true";
}

export function getDatabaseConfig() {
  const host = process.env.DATABASE_HOST;
  const database = process.env.DATABASE_NAME;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;

  if (!host || !database || !user || !password) {
    return null;
  }

  return {
    server: host,
    port: Number(process.env.DATABASE_PORT || 1433),
    database,
    user,
    password,
    options: {
      encrypt: process.env.DATABASE_ENCRYPT !== "false",
      trustServerCertificate:
        process.env.DATABASE_TRUST_SERVER_CERTIFICATE === "true",
      enableArithAbort: true,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  };
}

export function getUploadRoot(): string {
  const path = process.env.CMS_UPLOAD_PATH;
  if (!path) {
    throw new Error("CMS_UPLOAD_PATH não configurado no .env");
  }
  return path;
}

export function getMediaPublicPrefix(): string {
  return process.env.CMS_MEDIA_PUBLIC_PREFIX || "/media";
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "",
    secret: process.env.ADMIN_AUTH_SECRET || "",
  };
}

/**
 * Bootstrap via ADMIN_USERNAME/PASSWORD do .env.
 * Bloqueado em production (use usuário no banco). Em outros ambientes,
 * desligue com ADMIN_ALLOW_ENV_BOOTSTRAP=false.
 */
export function isEnvBootstrapAllowed(): boolean {
  if (process.env.NODE_ENV === "production") return false;
  return process.env.ADMIN_ALLOW_ENV_BOOTSTRAP !== "false";
}

export const UPLOAD_MODULES = [
  "relatorios",
  "normativos",
  "etica",
  "tarifas",
  "assembleia",
  "banners",
] as const;

export type UploadModule = (typeof UPLOAD_MODULES)[number];
