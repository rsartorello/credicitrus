import { mkdir, writeFile, unlink, access } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import {
  getMediaPublicPrefix,
  getUploadRoot,
  UPLOAD_MODULES,
  type UploadModule,
} from "./config";

const ALLOWED_MIME: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "image/webp": [".webp"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "application/vnd.ms-excel": [".xls"],
};

const MAX_BYTES = 40 * 1024 * 1024; // 40 MB

function resolveUploadRoot(): string {
  const root = getUploadRoot();
  return path.isAbsolute(root) ? root : path.resolve(process.cwd(), root);
}

export function isUploadModule(value: string): value is UploadModule {
  return (UPLOAD_MODULES as readonly string[]).includes(value);
}

export async function ensureUploadDirs(): Promise<void> {
  const root = resolveUploadRoot();
  await mkdir(root, { recursive: true });
  for (const mod of UPLOAD_MODULES) {
    await mkdir(path.join(root, mod), { recursive: true });
  }
}

function sanitizeFilename(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 120);
}

function startsWithBytes(buffer: Buffer, signature: number[]): boolean {
  if (buffer.length < signature.length) return false;
  return signature.every((byte, index) => buffer[index] === byte);
}

function assertMagicBytes(buffer: Buffer, mime: string): void {
  if (mime === "application/pdf") {
    if (!startsWithBytes(buffer, [0x25, 0x50, 0x44, 0x46])) {
      throw new Error("Conteúdo do arquivo não corresponde a um PDF válido");
    }
    return;
  }
  if (mime === "image/png") {
    if (!startsWithBytes(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
      throw new Error("Conteúdo do arquivo não corresponde a um PNG válido");
    }
    return;
  }
  if (mime === "image/jpeg") {
    if (!startsWithBytes(buffer, [0xff, 0xd8, 0xff])) {
      throw new Error("Conteúdo do arquivo não corresponde a um JPEG válido");
    }
    return;
  }
  if (mime === "image/webp") {
    const isRiff = startsWithBytes(buffer, [0x52, 0x49, 0x46, 0x46]);
    const isWebp =
      buffer.length >= 12 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50;
    if (!isRiff || !isWebp) {
      throw new Error("Conteúdo do arquivo não corresponde a um WEBP válido");
    }
    return;
  }
  if (
    mime ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    // XLSX = ZIP (PK)
    if (!startsWithBytes(buffer, [0x50, 0x4b])) {
      throw new Error("Conteúdo do arquivo não corresponde a um XLSX válido");
    }
    return;
  }
  if (mime === "application/vnd.ms-excel") {
    // OLE Compound File
    if (
      !startsWithBytes(buffer, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])
    ) {
      throw new Error("Conteúdo do arquivo não corresponde a um XLS válido");
    }
  }
}

export async function saveUpload(
  module: UploadModule,
  file: File,
): Promise<{ relativePath: string; publicUrl: string }> {
  if (file.size > MAX_BYTES) {
    throw new Error("Arquivo excede o limite de 40 MB");
  }

  const extFromMime = ALLOWED_MIME[file.type];
  if (!extFromMime) {
    throw new Error(`Tipo de arquivo não permitido: ${file.type || "desconhecido"}`);
  }

  const originalExt = path.extname(file.name).toLowerCase();
  const ext = extFromMime.includes(originalExt) ? originalExt : extFromMime[0];
  const base = sanitizeFilename(path.basename(file.name, path.extname(file.name))) || "arquivo";
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}-${base}${ext}`;
  const relativePath = path.posix.join(module, filename);
  const absolutePath = path.join(resolveUploadRoot(), module, filename);

  await ensureUploadDirs();
  const buffer = Buffer.from(await file.arrayBuffer());
  assertMagicBytes(buffer, file.type);
  await writeFile(absolutePath, buffer);

  return {
    relativePath,
    publicUrl: toPublicUrl(relativePath)!,
  };
}

export function toPublicUrl(relativePath: string | null | undefined): string | null {
  if (!relativePath) return null;
  if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
    return relativePath;
  }
  if (relativePath.startsWith("/files/") || relativePath.startsWith("/soltas/")) {
    return relativePath;
  }
  const prefix = getMediaPublicPrefix().replace(/\/$/, "");
  const clean = relativePath.replace(/^\/+/, "");
  return `${prefix}/${clean}`;
}

export function resolveMediaAbsolutePath(relativePath: string): string | null {
  const clean = relativePath.replace(/^\/+/, "").replace(/\\/g, "/");
  if (
    !clean ||
    clean.includes("\0") ||
    clean.includes("..") ||
    path.isAbsolute(clean)
  ) {
    return null;
  }

  const parts = clean.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  if (!isUploadModule(parts[0])) return null;
  if (parts.some((part) => part === "." || part === "..")) return null;

  const root = resolveUploadRoot();
  const absolute = path.resolve(root, ...parts);
  const rootResolved = path.resolve(root);
  const prefix = rootResolved.endsWith(path.sep)
    ? rootResolved
    : `${rootResolved}${path.sep}`;

  if (absolute !== rootResolved && !absolute.startsWith(prefix)) {
    return null;
  }

  return absolute;
}

export async function mediaFileExists(relativePath: string): Promise<boolean> {
  const absolute = resolveMediaAbsolutePath(relativePath);
  if (!absolute) return false;
  try {
    await access(absolute);
    return true;
  } catch {
    return false;
  }
}

export async function deleteUpload(relativePath: string | null | undefined): Promise<void> {
  if (!relativePath) return;
  if (relativePath.startsWith("/files/") || relativePath.startsWith("http")) return;

  const absolute = resolveMediaAbsolutePath(relativePath);
  if (!absolute) return;
  try {
    await unlink(absolute);
  } catch {
    // arquivo já ausente
  }
}
