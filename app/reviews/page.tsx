import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Customer Reviews | Odyssey Baths",
    description: "Read what our customers say about their Odyssey Baths experience.",
};

export default function ReviewsPage() {
    return (
        <main className="min-h-screen bg-cream-50 flex flex-col items-center justify-center px-6 py-24 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Customer Reviews
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mb-10">
                We&apos;re collecting our customer reviews and will be publishing them here very soon.
                In the meantime, please don&apos;t hesitate to get in touch — we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href="tel:08001234567"
                    className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-lg px-8 py-4 rounded-full transition-colors"
                >
                    <Phone size={22} fill="currentColor" />
                    0800 123 4567
                </a>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border-2 border-teal-700 text-teal-700 hover:bg-teal-50 font-bold text-lg px-8 py-4 rounded-full transition-colors"
                >
                    Send Us a Message
                </Link>
            </div>
        </main>
    );
}
