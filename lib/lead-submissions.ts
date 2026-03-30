import "server-only";

import { headers as nextHeaders } from "next/headers";
import { z } from "zod";

const UK_POSTCODE_REGEX =
  /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
const PHONE_REGEX = /^[0-9+()\-\s]{7,25}$/;

const optionalTrimmedString = z.preprocess((value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}, z.string().optional());

const requiredTrimmedString = (message: string, min = 1) =>
  z.string().trim().min(min, message);

const optionalEmail = z.preprocess((value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}, z.string().email("Enter a valid email address").optional());

const handingSchema = z.enum(["left", "right"]);

const contactLeadSchema = z
  .object({
    intent: z.enum(["quote", "survey", "question", "handing"]),
    name: requiredTrimmedString("Enter your full name", 2),
    phone: z
      .string()
      .trim()
      .regex(PHONE_REGEX, "Enter a valid phone number"),
    postcode: z
      .string()
      .trim()
      .toUpperCase()
      .regex(UK_POSTCODE_REGEX, "Enter a valid UK postcode"),
    email: optionalEmail,
    message: optionalTrimmedString,
    handing: handingSchema.optional(),
    website: optionalTrimmedString,
  })
  .superRefine((data, ctx) => {
    if (data.intent === "question" && !data.message) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: "Enter your question",
      });
    }

    if (data.intent === "handing" && !data.handing) {
      ctx.addIssue({
        code: "custom",
        path: ["handing"],
        message: "Choose left or right side",
      });
    }
  });

const brochureLeadSchema = z.object({
  firstName: requiredTrimmedString("Enter your first name", 2),
  lastName: requiredTrimmedString("Enter your last name", 2),
  postcode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(UK_POSTCODE_REGEX, "Enter a valid UK postcode"),
  address1: requiredTrimmedString("Enter your full address", 5),
  address2: optionalTrimmedString,
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(PHONE_REGEX, "Enter a valid phone number"),
  bestTimeToCall: optionalTrimmedString,
  productSlug: optionalTrimmedString,
  _hp: optionalTrimmedString,
});

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;
export type BrochureLeadInput = z.infer<typeof brochureLeadSchema>;

type LeadSource = "contact" | "free-brochure";
type LeadIntent = ContactLeadInput["intent"] | "brochure";

type LeadContext = {
  sourceRoute: string;
  pathname?: string;
  referrer?: string;
  ip?: string;
  userAgent?: string;
  extra?: Record<string, unknown>;
};

type LeadSubmissionRow = {
  id: string;
  created_at: string;
  source: LeadSource;
  intent: LeadIntent;
  product_slug: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  postcode: string | null;
  address1: string | null;
  address2: string | null;
  best_time_to_call: string | null;
  message: string | null;
  handing: string | null;
  status: "new";
  meta: Record<string, unknown>;
};

export type LeadSubmissionResult =
  | { ok: true; id: string }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string>;
      formError?: string;
    };

function issuesToFieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }

  return fieldErrors;
}

function getLeadEnv() {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    return {
      ok: false as const,
      error:
        "Lead capture is not configured. Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  return {
    ok: true as const,
    url,
    serviceRoleKey,
  };
}

async function persistLead(row: LeadSubmissionRow): Promise<LeadSubmissionResult> {
  const env = getLeadEnv();
  if (!env.ok) {
    console.error("[LEAD_SUBMIT_CONFIG_ERROR]", env.error);
    return {
      ok: false,
      error: "Lead storage is not configured.",
      formError:
        "This form is temporarily unavailable. Please call us instead while we finish setup.",
    };
  }

  let response: Response;
  try {
    response = await fetch(`${env.url}/rest/v1/lead_submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: env.serviceRoleKey,
        Authorization: `Bearer ${env.serviceRoleKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify([row]),
    });
  } catch (error) {
    console.error("[LEAD_SUBMIT_NETWORK_ERROR]", {
      id: row.id,
      source: row.source,
      intent: row.intent,
      error,
    });

    return {
      ok: false,
      error: "Unable to save your request right now.",
      formError:
        "We could not save your request right now. Please try again in a moment or call us directly.",
    };
  }

  if (!response.ok) {
    const details = await response.text();
    console.error("[LEAD_SUBMIT_PERSIST_ERROR]", {
      status: response.status,
      details,
      id: row.id,
      source: row.source,
      intent: row.intent,
    });

    return {
      ok: false,
      error: "Unable to save your request right now.",
      formError:
        "We could not save your request right now. Please try again in a moment or call us directly.",
    };
  }

  const inserted = (await response.json().catch(() => [])) as Array<{ id?: string }>;
  const id = inserted[0]?.id ?? row.id;

  return { ok: true, id };
}

function renderLeadNotification(row: LeadSubmissionRow) {
  const lines = [
    `Lead ID: ${row.id}`,
    `Created: ${row.created_at}`,
    `Source: ${row.source}`,
    `Intent: ${row.intent}`,
    `Full name: ${row.full_name ?? ""}`.trim(),
    `First name: ${row.first_name ?? ""}`.trim(),
    `Last name: ${row.last_name ?? ""}`.trim(),
    `Phone: ${row.phone ?? ""}`.trim(),
    `Email: ${row.email ?? ""}`.trim(),
    `Postcode: ${row.postcode ?? ""}`.trim(),
    `Address 1: ${row.address1 ?? ""}`.trim(),
    `Address 2: ${row.address2 ?? ""}`.trim(),
    `Best time to call: ${row.best_time_to_call ?? ""}`.trim(),
    `Product slug: ${row.product_slug ?? ""}`.trim(),
    `Handing: ${row.handing ?? ""}`.trim(),
    `Message: ${row.message ?? ""}`.trim(),
    `Meta: ${JSON.stringify(row.meta)}`,
  ].filter((line) => !line.endsWith(": "));

  return lines.join("\n");
}

async function sendLeadNotification(row: LeadSubmissionRow) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.LEAD_EMAIL_TO?.trim();

  if (!apiKey || !to) {
    return;
  }

  const from =
    process.env.LEAD_EMAIL_FROM?.trim() ||
    "Odyssey Baths <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New lead: ${row.intent} from ${row.full_name ?? row.first_name ?? "Unknown"}`,
        text: renderLeadNotification(row),
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("[LEAD_NOTIFICATION_ERROR]", {
        status: response.status,
        details,
        id: row.id,
        source: row.source,
        intent: row.intent,
      });
    }
  } catch (error) {
    console.error("[LEAD_NOTIFICATION_NETWORK_ERROR]", {
      id: row.id,
      source: row.source,
      intent: row.intent,
      error,
    });
  }
}

function buildMeta(context: LeadContext): Record<string, unknown> {
  return {
    sourceRoute: context.sourceRoute,
    pathname: context.pathname ?? null,
    referrer: context.referrer ?? null,
    ip: context.ip ?? null,
    userAgent: context.userAgent ?? null,
    ...(context.extra ?? {}),
  };
}

export async function getActionLeadContext(
  sourceRoute: string,
  extra?: Record<string, unknown>,
): Promise<LeadContext> {
  const headerStore = await nextHeaders();
  return {
    sourceRoute,
    referrer: headerStore.get("referer") ?? undefined,
    userAgent: headerStore.get("user-agent") ?? undefined,
    extra,
  };
}

export async function submitContactLead(
  raw: unknown,
  context: LeadContext,
): Promise<LeadSubmissionResult> {
  const record = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
  if (
    record &&
    typeof record.website === "string" &&
    record.website.trim().length > 0
  ) {
    return { ok: true, id: crypto.randomUUID() };
  }

  const parsed = contactLeadSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed.",
      fieldErrors: issuesToFieldErrors(parsed.error.issues),
    };
  }

  const data = parsed.data;

  const row: LeadSubmissionRow = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    source: "contact",
    intent: data.intent,
    product_slug: null,
    first_name: null,
    last_name: null,
    full_name: data.name,
    phone: data.phone,
    email: data.email ?? null,
    postcode: data.postcode,
    address1: null,
    address2: null,
    best_time_to_call: null,
    message: data.message ?? null,
    handing: data.handing ?? null,
    status: "new",
    meta: buildMeta(context),
  };

  console.info("[LEAD_SUBMIT_START]", {
    source: row.source,
    intent: row.intent,
    id: row.id,
  });

  const persisted = await persistLead(row);
  if (!persisted.ok) return persisted;

  void sendLeadNotification(row);

  console.info("[LEAD_SUBMIT_SUCCESS]", {
    source: row.source,
    intent: row.intent,
    id: persisted.id,
  });

  return persisted;
}

export async function submitBrochureLeadRecord(
  raw: unknown,
  context: LeadContext,
): Promise<LeadSubmissionResult> {
  const record = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
  if (
    record &&
    typeof record._hp === "string" &&
    record._hp.trim().length > 0
  ) {
    return { ok: true, id: crypto.randomUUID() };
  }

  const parsed = brochureLeadSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed.",
      fieldErrors: issuesToFieldErrors(parsed.error.issues),
    };
  }

  const data = parsed.data;

  const row: LeadSubmissionRow = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    source: "free-brochure",
    intent: "brochure",
    product_slug: data.productSlug ?? null,
    first_name: data.firstName,
    last_name: data.lastName,
    full_name: `${data.firstName} ${data.lastName}`.trim(),
    phone: data.phone,
    email: data.email,
    postcode: data.postcode,
    address1: data.address1,
    address2: data.address2 ?? null,
    best_time_to_call: data.bestTimeToCall ?? null,
    message: null,
    handing: null,
    status: "new",
    meta: buildMeta(context),
  };

  console.info("[LEAD_SUBMIT_START]", {
    source: row.source,
    intent: row.intent,
    id: row.id,
  });

  const persisted = await persistLead(row);
  if (!persisted.ok) return persisted;

  void sendLeadNotification(row);

  console.info("[LEAD_SUBMIT_SUCCESS]", {
    source: row.source,
    intent: row.intent,
    id: persisted.id,
  });

  return persisted;
}
