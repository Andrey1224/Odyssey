"use client";

import Link from "next/link";

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-white font-sans flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          We&apos;re sorry — an unexpected error occurred. Please try again or return to the home page.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="h-14 px-8 bg-teal-800 hover:bg-teal-900 text-white text-lg font-bold rounded-xl shadow-md transition-colors flex items-center justify-center w-full sm:w-auto"
          >
            Try again
          </button>
          <Link
            href="/"
            className="h-14 px-8 border-2 border-slate-300 text-slate-800 text-lg font-bold rounded-xl hover:border-teal-700 hover:text-teal-800 transition-colors flex items-center justify-center w-full sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
