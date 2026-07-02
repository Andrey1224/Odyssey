"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/lib/site";

export function Testimonials() {
    const bullets = [
        "Helpful product guidance",
        "UK-based customer support",
        "Free brochure available",
        "Help choosing size, handing and VAT relief",
    ];

    return (
        <section className="bg-cream-50 py-12 md:py-16 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-12 items-center rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
                    <div>
                        <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-teal-800">
                            Clear support before you choose
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
                            Trusted advice for safer bathing
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                            Speak with a UK-based team about the safest bathing option for your home, with straightforward guidance and no obligation.
                        </p>
                    </div>

                    <div className="rounded-xl bg-cream-50 border border-slate-200 p-6 md:p-8">
                        <ul className="space-y-4 mb-8">
                            {bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-3 text-lg text-slate-800">
                                    <CheckCircle2 className="mt-0.5 shrink-0 text-teal-800" size={22} strokeWidth={2.5} />
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/free-brochure"
                                className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-teal-800 px-6 py-3 text-base font-bold text-white shadow-md transition-colors hover:bg-teal-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50"
                            >
                                Request Free Brochure
                            </Link>
                            <a
                                href={`tel:${PHONE_TEL}`}
                                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-900 transition-colors hover:border-teal-700 hover:text-teal-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50"
                            >
                                <Phone size={18} className="shrink-0" />
                                Call {PHONE.replace(/^(\d{5})(\d{6})$/, "$1 $2")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
