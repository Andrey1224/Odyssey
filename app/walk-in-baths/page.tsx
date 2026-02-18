import { Suspense } from "react";

import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CatalogListContent } from "@/components/CatalogListContent";
import { TrustBar } from "@/components/TrustBar";
import { TAGS } from "@/data/tags";
import { WALK_IN_BATHS, WALK_IN_BATHS_CATEGORY } from "@/data/walkInBaths";

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
      <Suspense fallback={null}>
        <WalkInBathsContent />
      </Suspense>
      <TrustBar />
      <FAQSection />
      <Footer />
    </main>
  );
}
