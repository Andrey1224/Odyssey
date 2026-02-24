"use client";

import React from "react";
import Link from "next/link";
import { Star, Check } from "lucide-react";

export function Testimonials() {
    return (
        <section className="bg-cream-50 py-10 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Trusted by families across the UK
                    </h2>
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        We don't just sell baths; we restore confidence. Here is what our customers have to say about their experience.
                    </p>

                    {/* Trustpilot Badge */}
                    <a
                        href="https://www.trustpilot.com/review/odysseybaths.co.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-cream-50 px-6 py-2 rounded-full shadow-sm border border-slate-200 gap-3 hover:border-slate-300 transition-colors"
                    >
                        <div className="flex gap-1 text-teal-800">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                            ))}
                        </div>
                        <span className="text-[16px] font-bold text-slate-900">
                            Rated 4.2/5 on <span className="font-black">Trustpilot</span>
                        </span>
                    </a>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <ReviewCard
                        initial="C"
                        name="Courtney Stokes"
                        date="28 February 2025"
                        title="Great communications and fast delivery"
                        body="Superb choice of products at a competitive price. So helpful about updating our order as we worked out exactly what we needed. Great communications and product delivered as fast as possible. Thanks to all at Odyssey — you were wonderful to deal with."
                    />

                    <ReviewCard
                        initial="L"
                        name="Lorraine Clarke"
                        date="28 February 2025"
                        title="Walk In bath problem"
                        body="Excellent service from this company. Paul was very helpful and went over and above to help me sort out a bath problem I had. He answered emails quickly too and he also rang me back when he missed my call. Great service thank you."
                    />

                    <ReviewCard
                        initial="N"
                        name="Nicole Ohnstad"
                        date="9 February 2026"
                        title="I sent them a photo of my bathroom"
                        body="I sent them a photo of my bathroom so they could see how the usable space was situated, Odyssey suggested which baths would be most suitable and the correct handings, recommend getting in touch and talking through your build."
                    />

                </div>

                {/* CTA to reviews page */}
                <div className="mt-12 text-center">
                    <Link
                        href="/reviews"
                        className="inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-900 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Read all customer reviews
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ReviewCard({
    initial,
    name,
    date,
    title,
    body
}: {
    initial: string;
    name: string;
    date: string;
    title: string;
    body: string;
}) {
    return (
        <div className="bg-cream-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">

            {/* Card Top: Stars & Date */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-0.5 text-teal-800">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                </div>
                <span className="text-[15px] font-medium text-slate-600">{date}</span>
            </div>

            {/* Content */}
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-3 leading-tight group-hover:text-teal-800 transition-colors">
                {title}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                "{body}"
            </p>

            {/* Reviewer Info */}
            <div className="pt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-lg">
                    {initial}
                </div>
                <div>
                    <div className="font-bold text-slate-900 text-[16px]">{name}</div>
                    <div className="flex items-center gap-1 text-slate-600 text-[14px] mt-0.5">
                        <Check size={12} className="text-teal-800" strokeWidth={3} />
                        Verified Customer
                    </div>
                </div>
            </div>

        </div>
    );
}
