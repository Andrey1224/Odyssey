import { type Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbs } from "@/lib/breadcrumbs";
import { ContactContent, type IntentId } from "./ContactContent";
import { SITE_DOMAIN } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Odyssey Baths. Request a free quote, book a home survey, or ask our UK specialists about walk-in baths and safe bathing solutions.",
  alternates: { canonical: `${SITE_DOMAIN}/contact` },
};

const VALID_INTENTS: IntentId[] = ["quote", "survey", "question", "handing"];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await searchParams;
  const defaultIntent: IntentId =
    intent && (VALID_INTENTS as string[]).includes(intent)
      ? (intent as IntentId)
      : "quote";

  return (
    <main className="min-h-screen bg-cream-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs("/contact")} />
      </div>
      <ContactContent defaultIntent={defaultIntent} />
      <Footer />
    </main>
  );
}
