"use client";

import * as React from "react";
import { HandingTool } from "./HandingTool";
import { Phone } from "lucide-react";

export default function HandingCard() {
    const [handing, setHanding] = React.useState<"left" | "right">("left");

    return (
        <section className="w-full bg-cream-50 py-12 md:py-24" id="handing-guide">
            <div className="w-full max-w-4xl mx-auto px-4 md:px-0 scroll-mt-24">
                <div className="rounded-[2.5rem] bg-[#0F172A] p-6 md:p-12 text-white shadow-2xl overflow-hidden relative">

                {/* Decorative background blob */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start relative z-10">

                    {/* Left Column: Content */}
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 border border-teal-500/20 px-4 py-1.5 text-xs font-bold text-teal-300 uppercase tracking-widest">
                            <span>Avoid Mistakes</span>
                        </div>

                        <h2 className="font-serif text-3xl md:text-5xl font-bold leading-[1.1]">
                            Left Hand?
                            <br />
                            <span className="text-teal-400">Right Hand?</span>
                        </h2>

                        <p className="text-lg text-slate-300 leading-relaxed max-w-md">
                            Ordering the wrong orientation is a common mistake. Use this quick interactive check to visualize your bathroom layout.
                        </p>

                        <p className="text-sm text-slate-400 italic border-l-2 border-teal-500/30 pl-4 py-1">
                            Don't worry — we verify everything during your free home survey.
                        </p>

                        <a
                            href={`/contact?handing=${handing}`}
                            className="hidden lg:flex w-full bg-white text-slate-900 hover:bg-teal-50 font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition-all items-center justify-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50"
                        >
                            Check My Bathroom Layout
                        </a>

                        {/* Secondary CTA (Desktop placement) */}
                        <div className="hidden lg:block mt-6 p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                            <div className="font-semibold text-white mb-3">
                                Still unsure? Call us and we’ll help you choose.
                            </div>
                            <a
                                href="tel:08001234567"
                                className="inline-flex items-center justify-center rounded-xl bg-teal-600/90 hover:bg-teal-500 px-5 py-3 text-base font-bold text-white transition-colors w-full gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                            >
                                <Phone size={18} fill="currentColor" />
                                Call free: 0800 123 4567
                            </a>
                            <div className="mt-3 text-center text-xs text-white/70 font-medium tracking-wide">
                                MON–FRI 9AM–5PM • FREE ADVICE
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Interactive Tool */}
                    <div className="w-full lg:w-auto flex-1 flex flex-col items-center">
                        {/* White card container for the tool */}
                        <div className="w-full bg-white rounded-3xl p-2 md:p-6 shadow-xl text-slate-900">
                            <HandingTool value={handing} onChange={setHanding} />
                        </div>

                        {/* Mobile Buttons (below tool) */}
                        <div className="w-full lg:hidden mt-8 space-y-4">
                            <a
                                href={`/contact?handing=${handing}`}
                                className="flex w-full bg-white text-slate-900 hover:bg-teal-50 font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition-all items-center justify-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50"
                            >
                                Check My Bathroom Layout
                            </a>

                            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                                <div className="font-semibold text-white mb-3 text-center">
                                    Still unsure? Call us.
                                </div>
                                <a
                                    href="tel:08001234567"
                                    className="flex items-center justify-center rounded-xl bg-teal-600/90 hover:bg-teal-500 px-5 py-3 text-base font-bold text-white transition-colors w-full gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                                >
                                    <Phone size={18} fill="currentColor" />
                                    Call free: 0800 123 4567
                                </a>
                                <div className="mt-3 text-center text-xs text-white/70 font-medium tracking-wide">
                                    MON–FRI 9AM–5PM
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
                </div>
                </section>
    );
}
