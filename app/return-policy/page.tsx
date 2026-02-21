import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbs } from "@/lib/breadcrumbs";
import { ReturnPolicyContent } from "./ReturnPolicyContent";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy",
  description:
    "Odyssey Baths returns and refunds policy. Learn about our return authorization process, timelines, and conditions for bespoke and standard bath products.",
  alternates: { canonical: `${SITE_DOMAIN}/return-policy` },
};

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs("/return-policy")} />
      </div>
      <ReturnPolicyContent />
      <Footer />
    </main>
  );
}
