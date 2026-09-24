import { query, execute } from "./db";
import type {
  CmsModule,
  DocumentCategoryRow,
  DocumentInput,
  DocumentRow,
} from "./types";
import { toPublicUrl } from "./storage";

function asBool(value: unknown): boolean {
  return value === true || value === 1;
}

function mapCategory(row: DocumentCategoryRow): DocumentCategoryRow {
  return { ...row, IsActive: asBool(row.IsActive) };
}

function mapDocument(row: DocumentRow): DocumentRow {
  return {
    ...row,
    IsPublished: asBool(row.IsPublished),
    IsCurrent: asBool(row.IsCurrent),
  };
}

export async function listCategories(
  module?: CmsModule,
): Promise<DocumentCategoryRow[]> {
  const rows = module
    ? await query<DocumentCategoryRow>(
        `SELECT Id, Module, Slug, Title, UiType, SortOrder, IsActive
         FROM DocumentCategory
         WHERE IsActive = 1 AND Module = @module
         ORDER BY SortOrder, Title`,
        { module },
      )
    : await query<DocumentCategoryRow>(
        `SELECT Id, Module, Slug, Title, UiType, SortOrder, IsActive
         FROM DocumentCategory
         WHERE IsActive = 1
         ORDER BY Module, SortOrder, Title`,
      );

  return rows.map(mapCategory);
}

export async function getCategoryById(
  id: number,
): Promise<DocumentCategoryRow | null> {
  const rows = await query<DocumentCategoryRow>(
    `SELECT Id, Module, Slug, Title, UiType, SortOrder, IsActive
     FROM DocumentCategory
     WHERE Id = @id`,
    { id },
  );
  return rows[0] ? mapCategory(rows[0]) : null;
}

type ListDocumentsOptions = {
  module?: CmsModule;
  categoryId?: number;
  publishedOnly?: boolean;
  includeAdmin?: boolean;
};

export async function listDocuments(
  options?: ListDocumentsOptions,
): Promise<DocumentRow[]> {
  const clauses: string[] = [];
  const params: Record<string, unknown> = {};

  if (options?.module) {
    clauses.push("c.Module = @module");
    params.module = options.module;
  }
  if (options?.categoryId) {
    clauses.push("d.CategoryId = @categoryId");
    params.categoryId = options.categoryId;
  }
  if (options?.publishedOnly !== false && !options?.includeAdmin) {
    clauses.push("d.IsPublished = 1");
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  const rows = await query<DocumentRow>(
    `SELECT
       d.Id, d.CategoryId, d.Title, d.Label, d.Description,
       d.Year, d.Month, d.Semester, d.Quarter,
       d.FilePath, d.ExternalUrl, d.IsPublished, d.IsCurrent,
       d.SortOrder, d.PublishedAt,
       c.Slug AS CategorySlug, c.Title AS CategoryTitle,
       c.UiType AS CategoryUiType, c.Module
     FROM Document d
     INNER JOIN DocumentCategory c ON c.Id = d.CategoryId
     ${where}
     ORDER BY c.SortOrder, d.SortOrder, d.Year DESC, d.Month DESC, d.Id DESC`,
    params,
  );

  return rows.map(mapDocument);
}

export async function getDocumentById(
  id: number,
): Promise<DocumentRow | null> {
  const rows = await query<DocumentRow>(
    `SELECT
       d.Id, d.CategoryId, d.Title, d.Label, d.Description,
       d.Year, d.Month, d.Semester, d.Quarter,
       d.FilePath, d.ExternalUrl, d.IsPublished, d.IsCurrent,
       d.SortOrder, d.PublishedAt,
       c.Slug AS CategorySlug, c.Title AS CategoryTitle,
       c.UiType AS CategoryUiType, c.Module
     FROM Document d
     INNER JOIN DocumentCategory c ON c.Id = d.CategoryId
     WHERE d.Id = @id`,
    { id },
  );

  return rows[0] ? mapDocument(rows[0]) : null;
}

export async function createDocument(
  input: DocumentInput,
): Promise<number> {
  const rows = await query<{ Id: number }>(
    `INSERT INTO Document (
       CategoryId, Title, Label, Description, Year, Month, Semester, Quarter,
       FilePath, ExternalUrl, IsPublished, IsCurrent, SortOrder, PublishedAt
     )
     OUTPUT INSERTED.Id
     VALUES (
       @categoryId, @title, @label, @description, @year, @month, @semester, @quarter,
       @filePath, @externalUrl, @isPublished, @isCurrent, @sortOrder,
       CASE WHEN @isPublished = 1 THEN SYSUTCDATETIME() ELSE NULL END
     )`,
    {
      categoryId: input.categoryId,
      title: input.title,
      label: input.label ?? null,
      description: input.description ?? null,
      year: input.year ?? null,
      month: input.month ?? null,
      semester: input.semester ?? null,
      quarter: input.quarter ?? null,
      filePath: input.filePath ?? null,
      externalUrl: input.externalUrl ?? null,
      isPublished: input.isPublished ? 1 : 0,
      isCurrent: input.isCurrent ? 1 : 0,
      sortOrder: input.sortOrder ?? 0,
    },
  );

  return rows[0]?.Id ?? 0;
}

export async function updateDocument(
  id: number,
  input: Partial<DocumentInput>,
): Promise<void> {
  const current = await getDocumentById(id);
  if (!current) throw new Error("Documento não encontrado");

  const next = {
    categoryId: input.categoryId ?? current.CategoryId,
    title: input.title ?? current.Title,
    label: input.label !== undefined ? input.label : current.Label,
    description:
      input.description !== undefined ? input.description : current.Description,
    year: input.year !== undefined ? input.year : current.Year,
    month: input.month !== undefined ? input.month : current.Month,
    semester:
      input.semester !== undefined ? input.semester : current.Semester,
    quarter: input.quarter !== undefined ? input.quarter : current.Quarter,
    filePath: input.filePath !== undefined ? input.filePath : current.FilePath,
    externalUrl:
      input.externalUrl !== undefined ? input.externalUrl : current.ExternalUrl,
    isPublished:
      input.isPublished !== undefined ? input.isPublished : current.IsPublished,
    isCurrent:
      input.isCurrent !== undefined ? input.isCurrent : current.IsCurrent,
    sortOrder: input.sortOrder ?? current.SortOrder,
  };

  await execute(
    `UPDATE Document SET
       CategoryId = @categoryId,
       Title = @title,
       Label = @label,
       Description = @description,
       Year = @year,
       Month = @month,
       Semester = @semester,
       Quarter = @quarter,
       FilePath = @filePath,
       ExternalUrl = @externalUrl,
       IsPublished = @isPublished,
       IsCurrent = @isCurrent,
       SortOrder = @sortOrder,
       PublishedAt = CASE
         WHEN @isPublished = 1 AND IsPublished = 0 THEN SYSUTCDATETIME()
         WHEN @isPublished = 0 THEN NULL
         ELSE PublishedAt
       END,
       UpdatedAt = SYSUTCDATETIME()
     WHERE Id = @id`,
    {
      id,
      categoryId: next.categoryId,
      title: next.title,
      label: next.label,
      description: next.description,
      year: next.year,
      month: next.month,
      semester: next.semester,
      quarter: next.quarter,
      filePath: next.filePath,
      externalUrl: next.externalUrl,
      isPublished: next.isPublished ? 1 : 0,
      isCurrent: next.isCurrent ? 1 : 0,
      sortOrder: next.sortOrder,
    },
  );
}

export async function deleteDocument(
  id: number,
): Promise<DocumentRow | null> {
  const current = await getDocumentById(id);
  if (!current) return null;

  await execute(`DELETE FROM Document WHERE Id = @id`, { id });
  return current;
}

export async function getCurrentTariffUrl(): Promise<string | null> {
  const rows = await listDocuments({ module: "tarifas", publishedOnly: true });
  const current = rows.find((d) => d.IsCurrent) ?? rows[0];
  if (!current) return null;
  if (current.ExternalUrl) return current.ExternalUrl;
  return toPublicUrl(current.FilePath);
}

/** Indica se o arquivo está publicado no CMS (documento ou campanha). */
export async function isPublishedMediaPath(
  relativePath: string,
): Promise<boolean> {
  const docs = await query<{ Id: number }>(
    `SELECT TOP 1 Id FROM Document
     WHERE FilePath = @path AND IsPublished = 1`,
    { path: relativePath },
  );
  if (docs[0]) return true;

  const campaigns = await query<{ Id: number }>(
    `SELECT TOP 1 Id FROM HeroCampaign
     WHERE IsPublished = 1
       AND (ImageDesktopPath = @path OR ImageMobilePath = @path)`,
    { path: relativePath },
  );
  return Boolean(campaigns[0]);
}

export async function writeAuditLog(input: {
  actor: string;
  action: string;
  entityType: string;
  entityId?: number | null;
  details?: string | null;
}): Promise<void> {
  try {
    await execute(
      `INSERT INTO CmsAuditLog (Actor, Action, EntityType, EntityId, Details)
       VALUES (@actor, @action, @entityType, @entityId, @details)`,
      {
        actor: input.actor,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId ?? null,
        details: input.details ?? null,
      },
    );
  } catch {
    // não interromper fluxo editorial por falha de audit
  }
}
