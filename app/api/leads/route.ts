import { NextRequest, NextResponse } from "next/server";

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

  // Honeypot check
  if (body.website) {
    return NextResponse.json({ ok: true }); // silently accept bots
  }

  // Required field validation
  const { intent, name, phone, postcode } = body;
  if (!intent || !name?.trim() || !phone?.trim() || !postcode?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all required fields." },
      { status: 422 },
    );
  }

  // MVP: log the lead
  console.log("[LEAD]", {
    intent,
    name,
    phone,
    postcode,
    email: body.email,
    message: body.message,
    ts: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
