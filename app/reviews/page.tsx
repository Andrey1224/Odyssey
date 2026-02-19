import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

import ReviewsContent from "./ReviewsContent";

export const metadata: Metadata = {
    title: "Customer Reviews | Odyssey Baths",
    description: "Read what our customers say about their Odyssey Baths experience. See genuine Trustpilot reviews and customer stories from across the UK.",
};

export default function ReviewsPage() {
    return (
        <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
            <Header />
            <div className="mx-auto max-w-7xl px-6 py-5">
                <Breadcrumbs items={getBreadcrumbs("/reviews")} />
            </div>
            <ReviewsContent />
            <Footer />
        </main>
    );
}
