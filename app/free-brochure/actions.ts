"use server";

import {
  getActionLeadContext,
  submitBrochureLeadRecord,
} from "@/lib/lead-submissions";

type FormState = {
  success: boolean;
  firstName?: string;
  errors?: Record<string, string>;
  formError?: string;
};

export async function submitBrochureLead(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    postcode: String(formData.get("postcode") ?? ""),
    address1: String(formData.get("address1") ?? ""),
    address2: String(formData.get("address2") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    bestTimeToCall: String(formData.get("bestTimeToCall") ?? ""),
    productSlug: String(formData.get("productSlug") ?? ""),
    _hp: String(formData.get("_hp") ?? ""),
  };

  const result = await submitBrochureLeadRecord(
    raw,
    await getActionLeadContext("/free-brochure", {
      productSlug: raw.productSlug || undefined,
    }),
  );

  if (!result.ok) {
    return {
      success: false,
      errors: result.fieldErrors,
      formError: result.formError ?? result.error,
    };
  }

  return { success: true, firstName: raw.firstName };
}
