import { NextRequest, NextResponse } from "next/server";
import {
  requireAdminSession,
  requireModule,
  sessionErrorResponse,
} from "@/lib/cms/auth";
import { listCategories } from "@/lib/cms/documents";
import type { CmsModule } from "@/lib/cms/types";
import { isPermissionModule } from "@/lib/cms/permissions";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdminSession();
    const module = request.nextUrl.searchParams.get("module") as CmsModule | null;

    if (module) {
      if (!isPermissionModule(module)) {
        return NextResponse.json({ error: "Módulo inválido" }, { status: 400 });
      }
      requireModule(session, module, "view");
    }

    let categories = await listCategories(module || undefined);
    if (!module) {
      categories = categories.filter(
        (cat) =>
          isPermissionModule(cat.Module) &&
          (session.isSuperAdmin || session.permissions[cat.Module] !== "none"),
      );
    }

    return NextResponse.json({ categories });
  } catch (error) {
    return sessionErrorResponse(error);
  }
}
