"use client";

import React from "react";
import { Check, Info, X } from "lucide-react";
import { useWizardStore } from "@/lib/wizardStore";
import {
    WIDTH_OPTIONS,
    DOOR_TYPE_OPTIONS,
    PACKAGE_OPTIONS,
    HANDING_OPTIONS,
    FEATURE_OPTIONS,
    ACCESS_OPTIONS,
} from "@/config/filters";

export type FilterState = {
    vatExempt: boolean;
    width: string[];
    doorType: string[];
    package: string[];
    handing: string[];
    features: string[];
    access: string[];
};

export const EMPTY_FILTERS: Omit<FilterState, "vatExempt"> = {
    width: [],
    doorType: [],
    package: [],
    handing: [],
    features: [],
    access: [],
};

export interface FilterSidebarProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    onClose?: () => void;
}

function FilterCheckbox({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                    checked
                        ? "bg-teal-600 border-teal-600"
                        : "bg-cream-50 border-slate-300 group-hover:border-teal-400"
                }`}
            >
                {checked && <Check size={12} className="text-white" strokeWidth={3} />}
            </div>
            <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
            <span className={`text-sm ${checked ? "text-slate-900 font-medium" : "text-slate-600"}`}>
                {label}
            </span>
        </label>
    );
}

function FilterGroup({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">{title}</h4>
            <div className="space-y-2">{children}</div>
        </div>
    );
}

export const FilterSidebar = ({ filters, setFilters, onClose }: FilterSidebarProps) => {
    const { openWizard } = useWizardStore();

    const toggle = (field: keyof typeof EMPTY_FILTERS, value: string) => {
        const current = filters[field] as string[];
        const updated = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];
        setFilters({ ...filters, [field]: updated });
    };

    const toggleVat = (val: boolean) => setFilters({ ...filters, vatExempt: val });

    const hasActiveFilters = Object.values(EMPTY_FILTERS).some((_, i) => {
        const key = Object.keys(EMPTY_FILTERS)[i] as keyof typeof EMPTY_FILTERS;
        return (filters[key] as string[]).length > 0;
    });

    const clearAll = () => setFilters({ vatExempt: filters.vatExempt, ...EMPTY_FILTERS });

    return (
        <aside className="w-full lg:w-72 shrink-0 space-y-8">

            {/* Close button (drawer mode) */}
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

            {/* Help Me Choose Banner */}
            <div className="bg-slate-900 text-white p-5 rounded-lg text-center mb-6">
                <span className="block font-bold mb-2">Not sure which model?</span>
                <div className="text-[0.9rem] mb-2.5">Take our 30-second quiz to find your perfect fit.</div>
                <button onClick={() => openWizard("walk-in-baths")} className="inline-block bg-cream-50 text-slate-900 px-4 py-2 rounded font-semibold text-[0.9rem] mt-2 w-full hover:bg-slate-100 transition-colors">
                    Help Me Choose
                </button>
            </div>

            {/* VAT Toggle */}
            <div className="bg-teal-50 p-4 rounded-lg mb-6 border border-teal-700">
                <span className="block font-bold text-teal-800 mb-2 text-[0.95rem]">Your Pricing:</span>
                <div className="flex bg-cream-50 rounded p-0.5 border border-slate-300">
                    <div
                        onClick={() => toggleVat(true)}
                        className={`flex-1 text-center p-2 cursor-pointer text-[0.85rem] rounded-sm transition-all ${
                            filters.vatExempt ? "bg-teal-800 text-white font-semibold" : ""
                        }`}
                    >
                        VAT Exempt
                    </div>
                    <div
                        onClick={() => toggleVat(false)}
                        className={`flex-1 text-center p-2 cursor-pointer text-[0.85rem] rounded-sm transition-all ${
                            !filters.vatExempt ? "bg-teal-800 text-white font-semibold" : ""
                        }`}
                    >
                        Standard
                    </div>
                </div>
                <div className="text-[0.75rem] text-teal-800 mt-3 leading-[1.4] space-y-2">
                    <div className="flex gap-1.5 align-top">
                        <Info size={12} className="shrink-0 mt-0.5" />
                        <span>Most customers with a chronic condition are eligible for VAT relief.</span>
                    </div>
                    <div className="pl-4.5 opacity-90 border-t border-teal-700/20 pt-2 mt-2">
                        <p className="font-semibold mb-1">Self-declaration, no doctor&apos;s note needed.</p>
                        <p>You must confirm eligibility at checkout.</p>
                    </div>
                </div>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
                <button
                    onClick={clearAll}
                    className="w-full text-sm text-teal-800 font-semibold border border-teal-200 rounded-lg py-2 hover:bg-teal-50 transition-colors"
                >
                    Clear all filters
                </button>
            )}

            {/* Filter Groups */}
            <div className="space-y-6">

                <FilterGroup title="Bath Width">
                    {WIDTH_OPTIONS.map(opt => (
                        <FilterCheckbox
                            key={opt.value}
                            label={opt.label}
                            checked={filters.width.includes(opt.value)}
                            onChange={() => toggle("width", opt.value)}
                        />
                    ))}
                </FilterGroup>

                <FilterGroup title="Door Type">
                    {DOOR_TYPE_OPTIONS.map(opt => (
                        <FilterCheckbox
                            key={opt.value}
                            label={opt.label}
                            checked={filters.doorType.includes(opt.value)}
                            onChange={() => toggle("doorType", opt.value)}
                        />
                    ))}
                </FilterGroup>

                <FilterGroup title="Package">
                    {PACKAGE_OPTIONS.map(opt => (
                        <FilterCheckbox
                            key={opt.value}
                            label={opt.label}
                            checked={filters.package.includes(opt.value)}
                            onChange={() => toggle("package", opt.value)}
                        />
                    ))}
                </FilterGroup>

                <FilterGroup title="Handing">
                    {HANDING_OPTIONS.map(opt => (
                        <FilterCheckbox
                            key={opt.value}
                            label={opt.label}
                            checked={filters.handing.includes(opt.value)}
                            onChange={() => toggle("handing", opt.value)}
                        />
                    ))}
                </FilterGroup>

                <FilterGroup title="Features">
                    {FEATURE_OPTIONS.map(opt => (
                        <FilterCheckbox
                            key={opt.value}
                            label={opt.label}
                            checked={filters.features.includes(opt.value)}
                            onChange={() => toggle("features", opt.value)}
                        />
                    ))}
                </FilterGroup>

                <FilterGroup title="Accessibility">
                    {ACCESS_OPTIONS.map(opt => (
                        <FilterCheckbox
                            key={opt.value}
                            label={opt.label}
                            checked={filters.access.includes(opt.value)}
                            onChange={() => toggle("access", opt.value)}
                        />
                    ))}
                </FilterGroup>

            </div>
        </aside>
    );
};
