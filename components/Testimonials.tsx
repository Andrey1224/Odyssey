"use client";

import React from "react";
import { Star, Check } from "lucide-react";

export function Testimonials() {
    return (
        <section className="bg-slate-50 py-10 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Trusted by families across the UK
                    </h2>
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        We don't just sell baths; we restore confidence. Here is what our customers have to say about their experience.
                    </p>

                    {/* Trustpilot Badge Imitation */}
                    <div className="inline-flex items-center bg-cream-50 px-6 py-2 rounded-full shadow-sm border border-slate-200 gap-3">
                        <div className="flex gap-1 text-teal-800">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                            Rated 4.9/5 on <span className="font-black">Trustpilot</span>
                        </span>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Review 1 */}
                    <ReviewCard
                        initial="S"
                        name="Sarah Jenkins"
                        date="2 days ago"
                        title="Excellent service from start to finish"
                        body="The installer was polite, tidy, and very efficient. My mother is absolutely delighted with her new walk-in shower. It has transformed her daily routine completely."
                    />

                    {/* Review 2 */}
                    <ReviewCard
                        initial="M"
                        name="Michael Thompson"
                        date="1 week ago"
                        title="Feeling safe again"
                        body="I was worried about the disruption, but the team handled everything in just one day. The bath itself is high quality and very easy to access. Highly recommended."
                    />

                    {/* Review 3 */}
                    <ReviewCard
                        initial="D"
                        name="David & Jean"
                        date="3 weeks ago"
                        title="No hard sell, just honest advice"
                        body="Unlike other companies, Odyssey gave us a quote and left us to decide. No pressure at all. That's why we chose them. The installation was flawless."
                    />

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
                <span className="text-xs font-medium text-slate-600">{date}</span>
            </div>

            {/* Content */}
            <h3 className="font-bold text-lg text-slate-900 mb-3 leading-tight group-hover:text-teal-800 transition-colors">
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
                    <div className="font-bold text-slate-900 text-sm">{name}</div>
                    <div className="flex items-center gap-1 text-slate-600 text-xs mt-0.5">
                        <Check size={12} className="text-teal-800" strokeWidth={3} />
                        Verified Customer
                    </div>
                </div>
            </div>

        </div>
    );
}
