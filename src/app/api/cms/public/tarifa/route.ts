import { NextRequest, NextResponse } from "next/server";
import { getTariffDownloadUrl } from "@/lib/cms/content";
import {
  checkRateLimit,
  clientIpFromRequest,
  rateLimitResponse,
} from "@/lib/cms/rate-limit";

export async function GET(request: NextRequest) {
  const ip = clientIpFromRequest(request);
  const limited = checkRateLimit(`cms:public-tarifa:${ip}`, {
    limit: 60,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return rateLimitResponse(limited.retryAfterSec);
  }

  const url = await getTariffDownloadUrl();
  return NextResponse.json(
    { url },
    {
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    },
  );
}
