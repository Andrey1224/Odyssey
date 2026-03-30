import React from "react";

export const TrustStrip = () => (
    <div className="bg-cream-50 border-b border-slate-100 py-1.5 flex justify-center items-center shadow-sm relative z-10 overflow-x-hidden">
        <div className="flex gap-4 md:gap-8 text-[11px] md:text-sm font-bold text-slate-700 uppercase tracking-tight">
            <span className="flex items-center gap-1.5">
                <span className="text-teal-800 text-sm md:text-lg">★</span> Trustpilot 4.2/5
            </span>
            <span className="w-px h-3 bg-slate-300 my-auto"></span>
            <span className="flex items-center">
                <span className="mr-1.5" aria-hidden="true">🇬🇧</span>
                Made in UK
            </span>
            <span className="w-px h-3 bg-slate-300 my-auto"></span>
            <span className="flex items-center gap-1.5">
                VAT Relief
            </span>
        </div>
    </div>
);
