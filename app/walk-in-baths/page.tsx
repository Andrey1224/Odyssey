import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE_DOMAIN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Walk-In Baths",
  description:
    "Browse our range of UK walk-in baths with low threshold doors, heated seats, and hydrotherapy options. VAT relief for eligible customers.",
  alternates: { canonical: `${SITE_DOMAIN}/walk-in-baths` },
};

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CatalogListContent } from "@/components/CatalogListContent";
import { TrustBar } from "@/components/TrustBar";
import { TAGS } from "@/data/tags";
import { WALK_IN_BATHS, WALK_IN_BATHS_CATEGORY } from "@/data/walkInBaths";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

function WalkInBathsContent() {
  return (
    <CatalogListContent
      category={WALK_IN_BATHS_CATEGORY}
      products={WALK_IN_BATHS}
      detailHrefBase="/walk-in-baths"
      tags={TAGS}
      enableFilterLogic
    />
  );
}

export default function WalkInBathsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs("/walk-in-baths")} />
      </div>
      <Suspense fallback={null}>
        <WalkInBathsContent />
      </Suspense>
      <TrustBar />
      <FAQSection />
      <Footer />
    </main>
  );
}
