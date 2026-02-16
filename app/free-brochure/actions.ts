"use server";

import path from "path";
import { promises as fs } from "fs";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(2, "Enter your first name"),
  lastName: z.string().min(2, "Enter your last name"),
  postcode: z
    .string()
    .regex(
      /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
      "Enter a valid UK postcode"
    ),
  address1: z.string().min(5, "Enter your full address"),
  address2: z.string().optional(),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  bestTimeToCall: z.string().optional(),
  productSlug: z.string().optional(),
  _hp: z.string().max(0).optional(),
});

type FormState = {
  success: boolean;
  firstName?: string;
  errors?: Record<string, string>;
};

export async function submitBrochureLead(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    postcode: formData.get("postcode"),
    address1: formData.get("address1"),
    address2: formData.get("address2"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    bestTimeToCall: formData.get("bestTimeToCall"),
    productSlug: formData.get("productSlug"),
    _hp: formData.get("_hp"),
  };

  const result = schema.safeParse(raw);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!errors[field]) errors[field] = issue.message;
    }
    return { success: false, errors };
  }

  const data = result.data;

  // Honeypot check — silently succeed without saving
  if (data._hp && data._hp.length > 0) {
    return { success: true, firstName: data.firstName };
  }

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    sourcePage: "free-brochure",
    status: "new",
    firstName: data.firstName,
    lastName: data.lastName,
    postcode: data.postcode,
    address1: data.address1,
    address2: data.address2 ?? "",
    email: data.email,
    phone: data.phone,
    bestTimeToCall: data.bestTimeToCall ?? "",
    productSlug: data.productSlug ?? "",
  };

  // TODO: Supabase — replace with: await supabase.from('brochure_leads').insert(lead)
  const file = path.join(process.cwd(), "data", "leads.json");
  let leads: typeof lead[] = [];
  try {
    const content = await fs.readFile(file, "utf-8");
    leads = JSON.parse(content);
  } catch {
    leads = [];
  }
  leads.push(lead);
  await fs.writeFile(file, JSON.stringify(leads, null, 2));

  return { success: true, firstName: data.firstName };
}
