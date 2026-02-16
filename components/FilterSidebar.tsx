"use client";

import React from "react";
import { Sparkles, Check, Info, X } from "lucide-react";
import type { FilterConfig } from "@/config/filters";

export type FilterState = {
    vatExempt: boolean;
    size: string[];
    handing: string[];
    features: string[];
};

const DEFAULT_LENGTH_OPTIONS = ["< 1500mm (Compact)", "1500 - 1699mm (Standard)", "1700mm+ (Large)"];
const DEFAULT_HANDING_OPTIONS = ["Left Hand", "Right Hand"];
const DEFAULT_FEATURE_OPTIONS = ["Powered Seat Lift", "Hydrotherapy", "Chromotherapy", "Lay-down Option"];

interface FilterSidebarProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    onClose?: () => void;
    filterConfig?: FilterConfig;
}

export const FilterSidebar = ({ filters, setFilters, onClose, filterConfig }: FilterSidebarProps) => {

    const lengthOptions  = filterConfig?.lengthOptions  ?? DEFAULT_LENGTH_OPTIONS;
    const handingOptions = filterConfig?.handingOptions ?? DEFAULT_HANDING_OPTIONS;
    const featureOptions = filterConfig?.featureOptions ?? DEFAULT_FEATURE_OPTIONS;

    const toggleFilter = (category: keyof FilterState, value: string) => {
        const current = filters[category] as string[];
        if (typeof current === 'boolean') return;
        const updated = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value];
        setFilters({ ...filters, [category]: updated });
    };

    const toggleVat = (val: boolean) => {
        setFilters({ ...filters, vatExempt: val });
    }

    return (
        <aside className="w-full lg:w-72 shrink-0 space-y-8">

            {/* Close button for drawer mode */}
            {onClose && (
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900 text-lg">Filters</span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                        aria-label="Close filters"
                    >
                        <X size={20} className="text-slate-600" />
                    </button>
                </div>
            )}

            {/* Help Me Choose Banner - Matching .wizard-banner */}
            <div className="bg-[#0f172a] text-white p-5 rounded-lg text-center mb-6">
                <span className="block font-bold mb-2">Not sure which model?</span>
                <div className="text-[0.9rem] mb-2.5">Take our 30-second quiz to find your perfect fit.</div>
                <button className="inline-block bg-white text-[#0f172a] px-4 py-2 rounded font-semibold text-[0.9rem] mt-2 w-full hover:bg-slate-100 transition-colors">
                    Help Me Choose
                </button>
            </div>

            {/* VAT Toggle - Matching .vat-toggle-box */}
            <div className="bg-[#e0f2f1] p-4 rounded-lg mb-6 border border-[#117a7a]">
                <span className="block font-bold text-[#117a7a] mb-2 text-[0.95rem]">Your Pricing:</span>

                <div className="flex bg-white rounded p-0.5 border border-[#ccc]">
                    <div
                        onClick={() => toggleVat(true)}
                        className={`flex-1 text-center p-2 cursor-pointer text-[0.85rem] rounded-sm transition-all ${filters.vatExempt ? "bg-[#117a7a] text-white font-semibold" : ""
                            }`}
                    >
                        VAT Exempt
                    </div>
                    <div
                        onClick={() => toggleVat(false)}
                        className={`flex-1 text-center p-2 cursor-pointer text-[0.85rem] rounded-sm transition-all ${!filters.vatExempt ? "bg-[#117a7a] text-white font-semibold" : ""
                            }`}
                    >
                        Standard
                    </div>
                </div>

                <div className="text-[0.75rem] text-[#0d6161] mt-3 leading-[1.4] space-y-2">
                    <div className="flex gap-1.5 align-top">
                        <Info size={12} className="shrink-0 mt-0.5" />
                        <span>Most customers with a chronic condition are eligible for VAT relief.</span>
                    </div>
                    <div className="pl-4.5 opacity-90 border-t border-[#117a7a]/20 pt-2 mt-2">
                        <p className="font-semibold mb-1">Self-declaration, no doctor’s note needed.</p>
                        <p>You must confirm eligibility at checkout.</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="space-y-6">

                {/* Length */}
                <div>
                    <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Length</h4>
                    <div className="space-y-2">
                        {lengthOptions.map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.size.includes(opt)
                                    ? "bg-teal-600 border-teal-600"
                                    : "bg-white border-slate-300 group-hover:border-teal-400"
                                    }`}>
                                    {filters.size.includes(opt) && <Check size={12} className="text-white" strokeWidth={3} />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={filters.size.includes(opt)}
                                    onChange={() => toggleFilter('size', opt)}
                                />
                                <span className={`text-sm ${filters.size.includes(opt) ? "text-slate-900 font-medium" : "text-slate-600"}`}>
                                    {opt}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Handing */}
                <div>
                    <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Handing</h4>
                    <div className="space-y-2">
                        {handingOptions.map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.handing.includes(opt)
                                    ? "bg-teal-600 border-teal-600"
                                    : "bg-white border-slate-300 group-hover:border-teal-400"
                                    }`}>
                                    {filters.handing.includes(opt) && <Check size={12} className="text-white" strokeWidth={3} />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={filters.handing.includes(opt)}
                                    onChange={() => toggleFilter('handing', opt)}
                                />
                                <span className={`text-sm ${filters.handing.includes(opt) ? "text-slate-900 font-medium" : "text-slate-600"}`}>
                                    {opt}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div>
                    <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Key Features</h4>
                    <div className="space-y-2">
                        {featureOptions.map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.features.includes(opt)
                                    ? "bg-teal-600 border-teal-600"
                                    : "bg-white border-slate-300 group-hover:border-teal-400"
                                    }`}>
                                    {filters.features.includes(opt) && <Check size={12} className="text-white" strokeWidth={3} />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={filters.features.includes(opt)}
                                    onChange={() => toggleFilter('features', opt)}
                                />
                                <span className={`text-sm ${filters.features.includes(opt) ? "text-slate-900 font-medium" : "text-slate-600"}`}>
                                    {opt}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

            </div>
        </aside>
    );
};
