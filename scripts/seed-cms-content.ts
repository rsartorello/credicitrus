/**
 * Cadastra no CMS o conteúdo estático atual (fallbacks / public/files).
 * Idempotente. Não cria banners nem assembleias (sem lista estática de PDFs).
 *
 * Uso: npx tsx scripts/seed-cms-content.ts
 */
import fs from "fs";
import path from "path";
import sql from "mssql";
import { eticaFallback } from "../src/data/etica-fallback";
import { normativosFallback } from "../src/data/normativos-fallback";
import { relatoriosFallback } from "../src/data/relatorios-fallback";

const ROOT = path.resolve(__dirname, "..");

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvLocal();

const TARIFA_PDF =
  "/files/transparencia/tabela_tarifa_atualizada_2025_A4_nov-1.pdf";

const RELATORIO_SLUG: Record<string, string> = {
  "Relatórios Anuais": "anuais",
  "Relatórios Semestrais": "semestrais",
  "Balancete de verificação mensal": "balancetes",
  "Relatórios da Ação Social Cooperada": "acao-social",
  "Relatórios da Ouvidoria": "ouvidoria",
  "Relatórios do Canal de Conduta Ética": "canal-etica",
  "Relatórios de Transparência Salarial": "transparencia-salarial",
};

type SeedDoc = {
  module: string;
  categorySlug: string;
  title: string;
  label?: string | null;
  description?: string | null;
  year?: string | null;
  month?: string | null;
  semester?: string | null;
  quarter?: string | null;
  filePath?: string | null;
  externalUrl?: string | null;
  isPublished?: boolean;
  isCurrent?: boolean;
  sortOrder?: number;
};

function splitLink(link: string): { filePath: string | null; externalUrl: string | null } {
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return { filePath: null, externalUrl: link };
  }
  // Mantém caminho público estático (servido por /public)
  return { filePath: link, externalUrl: null };
}

function buildSeeds(): SeedDoc[] {
  const docs: SeedDoc[] = [];
  let sort = 0;

  for (const card of eticaFallback) {
    const { filePath, externalUrl } = splitLink(card.link);
    docs.push({
      module: "etica",
      categorySlug: "cards",
      title: card.title,
      description: card.description,
      filePath,
      externalUrl,
      isPublished: true,
      sortOrder: sort++,
    });
  }

  sort = 0;
  for (const item of normativosFallback) {
    const { filePath, externalUrl } = splitLink(item.link);
    docs.push({
      module: "normativos",
      categorySlug: "lista",
      title: item.name,
      filePath,
      externalUrl,
      isPublished: true,
      sortOrder: sort++,
    });
  }

  for (const group of relatoriosFallback) {
    const slug = RELATORIO_SLUG[group.title];
    if (!slug) {
      console.warn(`Categoria de relatório sem slug: ${group.title}`);
      continue;
    }
    let order = 0;
    for (const opt of group.options) {
      const { filePath, externalUrl } = splitLink(opt.url);
      const year =
        opt.year ||
        (group.type === "annual" && /^\d{4}/.test(opt.label)
          ? opt.label.slice(0, 4)
          : null);
      docs.push({
        module: "relatorios",
        categorySlug: slug,
        title: `${group.title} — ${opt.label}`,
        label: opt.label,
        year: year || null,
        month: opt.month || null,
        semester: opt.semester || null,
        quarter: null,
        filePath,
        externalUrl,
        isPublished: true,
        sortOrder: order++,
      });
    }
  }

  const tarifa = splitLink(TARIFA_PDF);
  docs.push({
    module: "tarifas",
    categorySlug: "vigente",
    title: "Tabela de Tarifas",
    description: "Tabela vigente exibida no Header e Rodapé.",
    filePath: tarifa.filePath,
    externalUrl: tarifa.externalUrl,
    isPublished: true,
    isCurrent: true,
    sortOrder: 0,
  });

  return docs;
}

async function getCategoryId(
  pool: sql.ConnectionPool,
  module: string,
  slug: string,
): Promise<number | null> {
  const result = await pool
    .request()
    .input("module", sql.NVarChar, module)
    .input("slug", sql.NVarChar, slug)
    .query(
      `SELECT Id FROM DocumentCategory WHERE Module = @module AND Slug = @slug`,
    );
  return result.recordset[0]?.Id ?? null;
}

async function exists(
  pool: sql.ConnectionPool,
  categoryId: number,
  doc: SeedDoc,
): Promise<boolean> {
  const request = pool
    .request()
    .input("categoryId", sql.Int, categoryId)
    .input("title", sql.NVarChar, doc.title)
    .input("year", sql.NVarChar, doc.year ?? null)
    .input("month", sql.NVarChar, doc.month ?? null)
    .input("semester", sql.NVarChar, doc.semester ?? null)
    .input("label", sql.NVarChar, doc.label ?? null);

  const result = await request.query(`
    SELECT TOP 1 Id FROM Document
    WHERE CategoryId = @categoryId
      AND Title = @title
      AND ((@year IS NULL AND Year IS NULL) OR Year = @year)
      AND ((@month IS NULL AND Month IS NULL) OR Month = @month)
      AND ((@semester IS NULL AND Semester IS NULL) OR Semester = @semester)
      AND ((@label IS NULL AND Label IS NULL) OR Label = @label)
  `);
  return Boolean(result.recordset[0]);
}

async function insertDoc(
  pool: sql.ConnectionPool,
  categoryId: number,
  doc: SeedDoc,
) {
  await pool
    .request()
    .input("categoryId", sql.Int, categoryId)
    .input("title", sql.NVarChar, doc.title)
    .input("label", sql.NVarChar, doc.label ?? null)
    .input("description", sql.NVarChar, doc.description ?? null)
    .input("year", sql.NVarChar, doc.year ?? null)
    .input("month", sql.NVarChar, doc.month ?? null)
    .input("semester", sql.NVarChar, doc.semester ?? null)
    .input("quarter", sql.NVarChar, doc.quarter ?? null)
    .input("filePath", sql.NVarChar, doc.filePath ?? null)
    .input("externalUrl", sql.NVarChar, doc.externalUrl ?? null)
    .input("isPublished", sql.Bit, doc.isPublished === false ? 0 : 1)
    .input("isCurrent", sql.Bit, doc.isCurrent ? 1 : 0)
    .input("sortOrder", sql.Int, doc.sortOrder ?? 0)
    .query(`
      INSERT INTO Document (
        CategoryId, Title, Label, Description, Year, Month, Semester, Quarter,
        FilePath, ExternalUrl, IsPublished, IsCurrent, SortOrder, PublishedAt
      ) VALUES (
        @categoryId, @title, @label, @description, @year, @month, @semester, @quarter,
        @filePath, @externalUrl, @isPublished, @isCurrent, @sortOrder,
        CASE WHEN @isPublished = 1 THEN SYSUTCDATETIME() ELSE NULL END
      )
    `);
}

async function main() {
  const config = {
    server: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT || 1433),
    database: process.env.DATABASE_NAME || "CredicitrusCms",
    user: process.env.DATABASE_USER || "sa",
    password: process.env.DATABASE_PASSWORD || "",
    options: {
      encrypt: process.env.DATABASE_ENCRYPT !== "false",
      trustServerCertificate:
        process.env.DATABASE_TRUST_SERVER_CERTIFICATE === "true",
    },
  };

  if (!config.password) {
    throw new Error("DATABASE_PASSWORD não configurado (.env.local)");
  }

  const seeds = buildSeeds();
  console.log(`Preparando ${seeds.length} documentos...`);

  const pool = await sql.connect(config);
  const categoryCache = new Map<string, number>();
  let inserted = 0;
  let skipped = 0;
  let missingCategory = 0;
  let missingFile = 0;

  try {
    for (const doc of seeds) {
      const cacheKey = `${doc.module}:${doc.categorySlug}`;
      let categoryId = categoryCache.get(cacheKey);
      if (categoryId === undefined) {
        const id = await getCategoryId(pool, doc.module, doc.categorySlug);
        if (id == null) {
          console.warn(`Categoria ausente: ${cacheKey}`);
          missingCategory += 1;
          continue;
        }
        categoryCache.set(cacheKey, id);
        categoryId = id;
      }

      if (doc.filePath?.startsWith("/files/")) {
        const absolute = path.join(ROOT, "public", doc.filePath.replace(/^\//, ""));
        if (!fs.existsSync(absolute)) {
          console.warn(`Arquivo ausente (cadastrado mesmo assim): ${doc.filePath}`);
          missingFile += 1;
        }
      }

      if (await exists(pool, categoryId, doc)) {
        skipped += 1;
        continue;
      }

      await insertDoc(pool, categoryId, doc);
      inserted += 1;
    }
  } finally {
    await pool.close();
  }

  console.log(
    JSON.stringify(
      { inserted, skipped, missingCategory, missingFile, total: seeds.length },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
