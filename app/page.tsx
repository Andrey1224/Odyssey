import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/schema";
import { HomeContent } from "./HomeContent";

export const metadata: Metadata = {
  title: "Walk-In Baths & Accessible Bathing Solutions",
  description:
    "Odyssey Baths supply and install walk-in baths, shower baths, and deep soakers across the UK. VAT relief available for eligible customers.",
  alternates: { canonical: SITE_DOMAIN },
  openGraph: { url: SITE_DOMAIN },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <HomeContent />
    </>
  );
}
