import { Suspense } from "react";

import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CatalogListContent } from "@/components/CatalogListContent";
import { TrustBar } from "@/components/TrustBar";
import {
  STANDARD_SIZE_BATHS,
  STANDARD_SIZE_CATEGORY,
  STANDARD_SIZE_FILTER_TAGS,
} from "@/data/standardSizeBaths";

function StandardSizeBathsContent() {
  return (
    <CatalogListContent
      category={STANDARD_SIZE_CATEGORY}
      products={STANDARD_SIZE_BATHS}
      detailHrefBase="/standard-size-baths"
      filterPreset="standardSize"
      standardSizeFilterTags={STANDARD_SIZE_FILTER_TAGS}
      queryParamKeys={{
        width: "length_mm",
        package: "door_material",
        handing: "door_position",
        doorType: "bath_type",
        features: "waste_type",
      }}
    />
  );
}

export default function StandardSizeBathsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200">
      <Header />
      <Suspense fallback={null}>
        <StandardSizeBathsContent />
      </Suspense>
      <TrustBar />
      <FAQSection />
      <Footer />
    </main>
  );
}
