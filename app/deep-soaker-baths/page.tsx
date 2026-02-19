import { Suspense } from "react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CatalogListContent } from "@/components/CatalogListContent";
import { TrustBar } from "@/components/TrustBar";
import {
  DEEP_SOAKER_BATHS,
  DEEP_SOAKER_CATEGORY,
  DEEP_SOAKER_FILTER_TAGS,
} from "@/data/deepSoakerBaths";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

function DeepSoakerBathsContent() {
  return (
    <CatalogListContent
      category={DEEP_SOAKER_CATEGORY}
      products={DEEP_SOAKER_BATHS}
      detailHrefBase="/deep-soaker-baths"
      filterPreset="deepSoaker"
      deepSoakerFilterTags={DEEP_SOAKER_FILTER_TAGS}
      queryParamKeys={{
        width: "length_mm",
        doorType: "door_type",
        package: "door_material",
        handing: "entry_point",
        access: "seat_height",
        features: "spa_options",
      }}
    />
  );
}

export default function DeepSoakerBathsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs("/deep-soaker-baths")} />
      </div>
      <Suspense fallback={null}>
        <DeepSoakerBathsContent />
      </Suspense>
      <TrustBar />
      <FAQSection />
      <Footer />
    </main>
  );
}
