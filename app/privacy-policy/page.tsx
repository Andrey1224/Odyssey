import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbs } from "@/lib/breadcrumbs";
import { PrivacyPolicyContent } from "./PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Odyssey Baths privacy policy. Learn how we collect, use, and protect your personal data in accordance with UK GDPR and data protection law.",
  alternates: { canonical: `${SITE_DOMAIN}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs("/privacy-policy")} />
      </div>
      <PrivacyPolicyContent />
      <Footer />
    </main>
  );
}
