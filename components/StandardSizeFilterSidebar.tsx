"use client";

import { Check, Info, X } from "lucide-react";
import { useWizardStore } from "@/lib/wizardStore";

import type { FilterSidebarProps } from "@/components/FilterSidebar";
import { EMPTY_FILTERS } from "@/components/FilterSidebar";

const LENGTH_OPTIONS = [
  { label: "1500mm", value: "1500" },
  { label: "1700mm", value: "1700" },
] as const;

const DOOR_MATERIAL_OPTIONS = [
  { label: "Glass Door", value: "glassDoor" },
  { label: "Plastic Door", value: "plasticDoor" },
] as const;

const DOOR_POSITION_OPTIONS = [
  { label: "Tap End", value: "tapEnd" },
  { label: "Seat End (RV)", value: "seatEnd" },
] as const;

const BATH_TYPE_OPTIONS = [
  { label: "Single Ended", value: "singleEnded" },
  { label: "Double Ended", value: "doubleEnded" },
] as const;

const WASTE_TYPE_OPTIONS = [
  { label: "Twin Waste", value: "twinWaste" },
  { label: "Plug & Chain", value: "plugAndChain" },
] as const;

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
    <label className="group flex cursor-pointer items-center gap-3">
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
          checked
            ? "border-teal-600 bg-teal-600"
            : "border-slate-300 bg-cream-50 group-hover:border-teal-400"
        }`}
      >
        {checked && <Check size={12} className="text-white" strokeWidth={3} />}
      </div>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <span className={`text-sm ${checked ? "font-medium text-slate-900" : "text-slate-600"}`}>{label}</span>
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
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function StandardSizeFilterSidebar({ filters, setFilters, onClose }: FilterSidebarProps) {
  const { openWizard } = useWizardStore();
  const toggle = (field: keyof typeof EMPTY_FILTERS, value: string) => {
    const current = filters[field] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
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
    <aside className="w-full shrink-0 space-y-8 lg:w-72">
      {onClose && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">Filters</span>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-slate-100"
            aria-label="Close filters"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>
      )}

      <div className="mb-6 rounded-lg bg-slate-900 p-5 text-center text-white">
        <span className="mb-2 block font-bold">Planning a direct replacement?</span>
        <div className="mb-2.5 text-[0.9rem]">Filter by door style and position to match your bathroom layout.</div>
        <button onClick={() => openWizard("standard-size-baths")} className="mt-2 inline-block w-full rounded bg-cream-50 px-4 py-2 text-[0.9rem] font-semibold text-slate-900 transition-colors hover:bg-slate-100">
          Help Me Choose
        </button>
      </div>

      <div className="mb-6 rounded-lg border border-teal-700 bg-teal-50 p-4">
        <span className="mb-2 block text-[0.95rem] font-bold text-teal-800">Your Pricing:</span>
        <div className="flex rounded border border-slate-300 bg-cream-50 p-0.5">
          <div
            onClick={() => toggleVat(true)}
            className={`flex-1 cursor-pointer rounded-sm p-2 text-center text-[0.85rem] transition-all ${
              filters.vatExempt ? "bg-teal-800 font-semibold text-white" : ""
            }`}
          >
            VAT Exempt
          </div>
          <div
            onClick={() => toggleVat(false)}
            className={`flex-1 cursor-pointer rounded-sm p-2 text-center text-[0.85rem] transition-all ${
              !filters.vatExempt ? "bg-teal-800 font-semibold text-white" : ""
            }`}
          >
            Standard
          </div>
        </div>
        <div className="mt-3 space-y-2 text-[0.75rem] leading-[1.4] text-teal-800">
          <div className="flex gap-1.5 align-top">
            <Info size={12} className="mt-0.5 shrink-0" />
            <span>Most customers with a chronic condition are eligible for VAT relief.</span>
          </div>
          <div className="mt-2 border-t border-teal-700/20 pt-2 pl-4.5 opacity-90">
            <p className="mb-1 font-semibold">Self-declaration, no doctor&apos;s note needed.</p>
            <p>You must confirm eligibility at checkout.</p>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full rounded-lg border border-teal-200 py-2 text-sm font-semibold text-teal-800 transition-colors hover:bg-teal-50"
        >
          Clear all filters
        </button>
      )}

      <div className="space-y-6">
        <FilterGroup title="Length">
          {LENGTH_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.width.includes(opt.value)}
              onChange={() => toggle("width", opt.value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Door Material">
          {DOOR_MATERIAL_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.package.includes(opt.value)}
              onChange={() => toggle("package", opt.value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Door Position">
          {DOOR_POSITION_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.handing.includes(opt.value)}
              onChange={() => toggle("handing", opt.value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Bath Type">
          {BATH_TYPE_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.doorType.includes(opt.value)}
              onChange={() => toggle("doorType", opt.value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Drain System">
          {WASTE_TYPE_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.features.includes(opt.value)}
              onChange={() => toggle("features", opt.value)}
            />
          ))}
        </FilterGroup>
      </div>
    </aside>
  );
}
