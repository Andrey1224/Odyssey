import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          <p className="text-teal-800 font-bold uppercase tracking-widest text-sm mb-4">404</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Sorry, we couldn&apos;t find the page you were looking for. It may have moved or the address may be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="h-14 px-8 bg-teal-800 hover:bg-teal-900 text-white text-lg font-bold rounded-xl shadow-md transition-colors flex items-center justify-center w-full sm:w-auto"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="h-14 px-8 border-2 border-slate-300 text-slate-800 text-lg font-bold rounded-xl hover:border-teal-700 hover:text-teal-800 transition-colors flex items-center justify-center w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
