import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE_DOMAIN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Walk-In Shower Baths",
  description:
    "Combination walk-in shower baths with easy-access doors for UK bathrooms. Multiple sizes available with VAT relief.",
  alternates: { canonical: `${SITE_DOMAIN}/walk-in-shower-baths` },
};

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CatalogListContent } from "@/components/CatalogListContent";
import { TrustBar } from "@/components/TrustBar";
import {
  WALK_IN_SHOWER_FILTER_TAGS,
  WALK_IN_SHOWER_BATHS,
  WALK_IN_SHOWER_BATHS_CATEGORY,
} from "@/data/walkInShowerBaths";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

function WalkInShowerBathsContent() {
  return (
    <CatalogListContent
      category={WALK_IN_SHOWER_BATHS_CATEGORY}
      products={WALK_IN_SHOWER_BATHS}
      detailHrefBase="/walk-in-shower-baths"
      filterPreset="walkInShower"
      walkInShowerFilterTags={WALK_IN_SHOWER_FILTER_TAGS}
      queryParamKeys={{
        doorType: "bath_shape",
        width: "length_mm",
        package: "integrated_seat",
        handing: "door_action",
        features: "glass_thickness",
        access: "dual_waste",
      }}
    />
  );
}

export default function WalkInShowerBathsPage() {
  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs("/walk-in-shower-baths")} />
      </div>
      <Suspense fallback={null}>
        <WalkInShowerBathsContent />
      </Suspense>
      <TrustBar />
      <FAQSection />
      <Footer />
    </main>
  );
}
