/**
 * Rate limiter in-memory (por processo).
 * Em multi-instância, TI deve complementar com WAF/gateway.
 */

type Bucket = {
  count: number;
  resetAt: number;
  blockedUntil?: number;
};

const buckets = new Map<string, Bucket>();

const MAX_KEYS = 10_000;

function prune(now: number) {
  if (buckets.size < MAX_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now && (!bucket.blockedUntil || bucket.blockedUntil < now)) {
      buckets.delete(key);
    }
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
};

export function checkRateLimit(
  key: string,
  options: { limit: number; windowMs: number; blockMs?: number },
): RateLimitResult {
  const now = Date.now();
  prune(now);

  const existing = buckets.get(key);
  if (existing?.blockedUntil && existing.blockedUntil > now) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.ceil((existing.blockedUntil - now) / 1000),
    };
  }

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return { ok: true, remaining: options.limit - 1, retryAfterSec: 0 };
  }

  existing.count += 1;
  if (existing.count > options.limit) {
    if (options.blockMs) {
      existing.blockedUntil = now + options.blockMs;
    }
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.ceil(
        ((existing.blockedUntil ?? existing.resetAt) - now) / 1000,
      ),
    };
  }

  return {
    ok: true,
    remaining: Math.max(0, options.limit - existing.count),
    retryAfterSec: 0,
  };
}

/** Zera contadores de uma chave (ex.: login bem-sucedido). */
export function resetRateLimit(key: string): void {
  buckets.delete(key);
}

export function clientIpFromRequest(request: Request): string {
  return clientIpFromHeaders(request.headers);
}

/**
 * IP do cliente.
 * Só confia em X-Forwarded-For / X-Real-IP quando TRUST_PROXY=true
 * (ou em production, onde se assume reverse proxy na frente).
 * Em dev local, ignora headers forjáveis pelo browser.
 */
export function clientIpFromHeaders(headers: Headers): string {
  const trustProxy =
    process.env.TRUST_PROXY === "true" ||
    (process.env.NODE_ENV === "production" &&
      process.env.TRUST_PROXY !== "false");

  if (trustProxy) {
    const forwarded = headers.get("x-forwarded-for");
    if (forwarded) {
      return forwarded.split(",")[0]?.trim() || "unknown";
    }
    const realIp = headers.get("x-real-ip")?.trim();
    if (realIp) return realIp;
  }

  return "local";
}

export function rateLimitResponse(retryAfterSec: number) {
  return new Response(
    JSON.stringify({
      error: "Muitas tentativas. Aguarde e tente novamente.",
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(Math.max(1, retryAfterSec)),
        "Cache-Control": "no-store",
      },
    },
  );
}
