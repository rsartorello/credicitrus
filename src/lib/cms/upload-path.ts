import path from "path";
import { UPLOAD_MODULES, type UploadModule } from "./config";

const UPLOAD_PATH_RE = new RegExp(
  `^(${UPLOAD_MODULES.join("|")})/[0-9]+-[a-f0-9-]{8,}-[a-z0-9._-]+\\.[a-z0-9]+$`,
  "i",
);

export function isManagedUploadPath(
  value: string | null | undefined,
): value is string {
  if (!value) return false;
  if (value.includes("..") || value.includes("\\") || path.isAbsolute(value)) {
    return false;
  }
  return UPLOAD_PATH_RE.test(value);
}

export function assertManagedUploadPath(
  value: string | null | undefined,
  required = false,
): string | null {
  if (!value) {
    if (required) throw new Error("Caminho de arquivo inválido");
    return null;
  }
  // Conteúdo legado em /public/files (seed inicial)
  if (
    (value.startsWith("/files/") || value.startsWith("/soltas/")) &&
    !value.includes("..") &&
    !value.includes("\\")
  ) {
    return value;
  }
  if (!isManagedUploadPath(value)) {
    throw new Error("Caminho de arquivo inválido");
  }
  return value;
}

export function uploadModuleFromPath(filePath: string): UploadModule | null {
  const module = filePath.split("/")[0];
  if ((UPLOAD_MODULES as readonly string[]).includes(module)) {
    return module as UploadModule;
  }
  return null;
}
