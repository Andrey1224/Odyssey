import React from "react";
import { ShieldCheck, CheckCircle2, Wrench } from "lucide-react";

export const TrustBar = () => (
    <section className="bg-teal-50 border-t border-b border-teal-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {[
                {
                    icon: ShieldCheck,
                    title: "No Hard Sell Guarantee",
                    desc: "Our advisors are not on commission. We give you the price and leave you to decide."
                },
                {
                    icon: CheckCircle2,
                    title: "VAT Relief Handled",
                    desc: "Most customers save 20% due to chronic conditions. We do all the paperwork for you."
                },
                {
                    icon: Wrench,
                    title: "Nationwide Installation",
                    desc: "Expert fitting teams across the UK. Installed in as little as 1 day."
                },
            ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                    <div className="bg-cream-50 p-4 rounded-full shadow-sm text-teal-800 ring-1 ring-slate-900/5 shrink-0">
                        <item.icon size={28} />
                    </div>
                    <div>
                        <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 leading-tight">{item.title}</h3>
                        <p className="text-slate-600 text-base leading-relaxed">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);
