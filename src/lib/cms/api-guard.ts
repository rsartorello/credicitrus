import { NextRequest, NextResponse } from "next/server";
import { assertSameOrigin } from "./security";
import { assertCsrf, csrfErrorResponse } from "./csrf";
import {
  checkRateLimit,
  clientIpFromRequest,
} from "./rate-limit";

/**
 * CSRF (Origin + token) + rate limit para rotas mutáveis do CMS.
 */
export function enforceCmsMutationGuards(
  request: NextRequest,
  options?: {
    limit?: number;
    windowMs?: number;
    keyPrefix?: string;
    /** Login ainda não tem cookie de sessão; Origin basta. */
    requireCsrf?: boolean;
  },
): NextResponse | null {
  try {
    assertSameOrigin(request);
  } catch {
    return NextResponse.json({ error: "Origem não permitida" }, { status: 403 });
  }

  if (options?.requireCsrf !== false) {
    try {
      assertCsrf(request);
    } catch {
      return csrfErrorResponse();
    }
  }

  const ip = clientIpFromRequest(request);
  const prefix = options?.keyPrefix || "cms:mutate";
  const result = checkRateLimit(`${prefix}:${ip}`, {
    limit: options?.limit ?? 90,
    windowMs: options?.windowMs ?? 60_000,
    blockMs: 60_000,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde e tente novamente." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(1, result.retryAfterSec)),
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return null;
}
