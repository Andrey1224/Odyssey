import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Advice & Guides | Odyssey Baths",
  description:
    "Helpful articles on safe bathing, VAT relief, and bathroom adaptations. Written by our UK experts to help you make the right choice.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs("/blog")} />
      </div>
      <BlogContent />
      <Footer />
    </main>
  );
}
