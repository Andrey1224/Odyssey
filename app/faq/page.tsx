import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/lib/site";
import { FaqContent } from "./FaqContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about Odyssey Baths walk-in baths, installation, VAT relief, safety, and after-care support.",
  alternates: { canonical: `${SITE_DOMAIN}/faq` },
};

export default function FaqPage() {
  return <FaqContent />;
}
