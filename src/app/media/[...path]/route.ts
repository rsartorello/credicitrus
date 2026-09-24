import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getAdminSession } from "@/lib/cms/auth";
import { isPublishedMediaPath } from "@/lib/cms/documents";
import { canAccess, isPermissionModule } from "@/lib/cms/permissions";
import { resolveMediaAbsolutePath } from "@/lib/cms/storage";

const MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xls": "application/vnd.ms-excel",
};

async function canServeMedia(relative: string): Promise<boolean> {
  try {
    if (await isPublishedMediaPath(relative)) return true;
  } catch {
    // se DB falhar, não libera rascunhos
  }

  const session = await getAdminSession();
  if (!session) return false;

  const module = relative.split("/")[0];
  if (isPermissionModule(module)) {
    return canAccess(session, module, "view");
  }
  return session.isSuperAdmin;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await context.params;
  const relative = parts.join("/");
  const absolute = resolveMediaAbsolutePath(relative);

  if (!absolute) {
    return NextResponse.json({ error: "Arquivo inválido" }, { status: 400 });
  }

  if (!(await canServeMedia(relative))) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }

  try {
    const data = await readFile(absolute);
    const ext = path.extname(absolute).toLowerCase();
    const contentType = MIME[ext] || "application/octet-stream";
    const filename = path.basename(absolute).replace(/"/g, "");

    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, max-age=3600",
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }
}
