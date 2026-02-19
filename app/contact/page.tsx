"use client";

import { useSearchParams } from "next/navigation";
import { Phone, CheckCircle2 } from "lucide-react";
import { Suspense } from "react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

function ContactContent() {
    const searchParams = useSearchParams();
    const handing = searchParams.get("handing"); // 'left' or 'right'

    return (
        <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
            <Header />

            <div className="mx-auto max-w-7xl px-6 py-5">
                <Breadcrumbs items={getBreadcrumbs("/contact")} />
            </div>

            <section className="mx-auto max-w-xl px-4 py-12 md:py-20">
                <div className="bg-cream-50 rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">

                    <div className="bg-slate-900 p-8 md:p-10 text-white text-center">
                        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                            Your Free Quote
                        </h1>
                        <p className="text-slate-300 text-lg">
                            Confirm your details below. We&apos;ll check your plumbing layout during your free survey.
                        </p>
                    </div>

                    <div className="p-8 md:p-10 space-y-8">

                        {/* Handing Confirmation Block */}
                        {handing && (
                            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex items-start gap-4">
                                <div className="bg-cream-50 p-2 rounded-full text-teal-800 shadow-sm shrink-0">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">Interest</div>
                                    <div className="text-slate-900 font-bold text-lg">
                                        {handing === 'left' ? 'Left-Hand Bath' : 'Right-Hand Bath'}
                                    </div>
                                    <div className="text-slate-600 text-sm mt-1">
                                        (Door on the {handing === 'left' ? 'LEFT' : 'RIGHT'})
                                    </div>
                                </div>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-0 font-medium text-lg text-slate-900 placeholder:text-slate-600 transition-colors bg-slate-50"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-0 font-medium text-lg text-slate-900 placeholder:text-slate-600 transition-colors bg-slate-50"
                                        placeholder="07123 456 789"
                                    />
                                </div>
                            </div>

                            <button className="w-full bg-teal-600 hover:bg-teal-900 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50">
                                Get My Free Quote
                            </button>

                            <p className="text-center text-xs text-slate-600 leading-relaxed">
                                By submitting this form, you agree to our Privacy Policy. Since we respect your time, <strong className="text-slate-600">we promise no hard sell tactics.</strong>
                            </p>
                        </form>

                    </div>
                </div>

                {/* Alternative Contact */}
                <div className="mt-12 text-center">
                    <p className="text-slate-600 mb-4 font-medium">Prefer to speak to someone?</p>
                    <a href="tel:08001234567" className="inline-flex items-center gap-2 text-slate-900 font-bold text-xl hover:text-teal-800 transition-colors">
                        <Phone size={24} className="text-teal-800" />
                        0800 123 4567
                    </a>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-cream-50 flex items-center justify-center text-slate-600">Loading...</div>}>
            <ContactContent />
        </Suspense>
    );
}
