import { type Metadata } from "next";
import { BrochureForm } from "./BrochureForm";

import { SITE_DOMAIN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request Free Brochure | Odyssey Baths",
  alternates: { canonical: `${SITE_DOMAIN}/free-brochure` },
};

export default async function FreeBrochurePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  return <BrochureForm productSlug={product} />;
}
