import sql from "mssql";
import { getDatabaseConfig, isCmsEnabled } from "./config";

declare global {
  // eslint-disable-next-line no-var
  var __cmsSqlPool: sql.ConnectionPool | undefined;
}

export { sql };

export async function getPool(): Promise<sql.ConnectionPool | null> {
  if (!isCmsEnabled()) return null;

  const config = getDatabaseConfig();
  if (!config) return null;

  if (global.__cmsSqlPool?.connected) {
    return global.__cmsSqlPool;
  }

  try {
    const pool = new sql.ConnectionPool(config);
    await pool.connect();
    global.__cmsSqlPool = pool;
    return pool;
  } catch (error) {
    console.error("[cms] falha ao conectar no SQL Server:", error);
    return null;
  }
}

export async function query<T>(
  text: string,
  params?: Record<string, unknown>,
): Promise<T[]> {
  const pool = await getPool();
  if (!pool) return [];

  const req = pool.request();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      req.input(key, value as string | number | boolean | Date | null | Buffer);
    }
  }

  const result = await req.query(text);
  return (result.recordset ?? []) as T[];
}

export async function execute(
  text: string,
  params?: Record<string, unknown>,
): Promise<number> {
  const pool = await getPool();
  if (!pool) throw new Error("CMS database indisponível");

  const req = pool.request();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      req.input(key, value as string | number | boolean | Date | null | Buffer);
    }
  }

  const result = await req.query(text);
  return result.rowsAffected?.[0] ?? 0;
}
