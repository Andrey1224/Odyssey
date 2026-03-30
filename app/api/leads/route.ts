import { NextRequest, NextResponse } from "next/server";
import { submitContactLead } from "@/lib/lead-submissions";

// Simple in-memory rate limit: IP → [timestamps]
const rateMap = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_REQUESTS = 5;

export async function POST(req: NextRequest) {
  // Rate limiting by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const times = (rateMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_REQUESTS) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }
  rateMap.set(ip, [...times, now]);

  const body = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );

  const result = await submitContactLead(body, {
    sourceRoute: "/api/leads",
    pathname: "/contact",
    referrer: req.headers.get("referer") ?? undefined,
    userAgent: req.headers.get("user-agent") ?? undefined,
    ip,
    extra: {
      forwardedFor: req.headers.get("x-forwarded-for") ?? undefined,
    },
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: result.formError ?? result.error,
        fieldErrors: result.fieldErrors,
      },
      { status: result.fieldErrors ? 422 : 500 },
    );
  }

  return NextResponse.json({ ok: true, id: result.id });
}
