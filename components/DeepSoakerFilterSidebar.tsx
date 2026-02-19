"use client";

import { Check, Info, X } from "lucide-react";
import { useWizardStore } from "@/lib/wizardStore";

import type { FilterSidebarProps } from "@/components/FilterSidebar";
import { EMPTY_FILTERS } from "@/components/FilterSidebar";

const LENGTH_OPTIONS = [
  { label: "900mm", value: "900" },
  { label: "985mm", value: "985" },
  { label: "1045mm", value: "1045" },
  { label: "1060mm", value: "1060" },
  { label: "1175mm", value: "1175" },
  { label: "1220mm", value: "1220" },
  { label: "1270mm", value: "1270" },
] as const;

const DOOR_OPERATION_OPTIONS = [
  { label: "Bi-fold", value: "biFold" },
  { label: "Inward", value: "inward" },
  { label: "Outward", value: "outward" },
] as const;

const DOOR_MATERIAL_OPTIONS = [
  { label: "Toughened Glass", value: "glass" },
  { label: "Rugged Plastic", value: "plastic" },
] as const;

const ENTRY_DIRECTION_OPTIONS = [
  { label: "Front Entry", value: "front" },
  { label: "Side Entry", value: "side" },
] as const;

const SEAT_HEIGHT_OPTIONS = [
  { label: "Low (<300mm)", value: "low" },
  { label: "High (>300mm)", value: "high" },
] as const;

const SPA_OPTIONS = [
  { label: "Hydrotherapy", value: "hydrotherapy" },
  { label: "Chromotherapy", value: "chromotherapy" },
  { label: "Microbubbles", value: "microbubbles" },
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
            : "border-slate-300 bg-white group-hover:border-teal-400"
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

export function DeepSoakerFilterSidebar({ filters, setFilters, onClose }: FilterSidebarProps) {
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

      <div className="mb-6 rounded-lg bg-[#0f172a] p-5 text-center text-white">
        <span className="mb-2 block font-bold">Need compact-fit advice?</span>
        <div className="mb-2.5 text-[0.9rem]">Find the right sit-in bath for your layout in 30 seconds.</div>
        <button onClick={() => openWizard("deep-soaker-baths")} className="mt-2 inline-block w-full rounded bg-white px-4 py-2 text-[0.9rem] font-semibold text-[#0f172a] transition-colors hover:bg-slate-100">
          Help Me Choose
        </button>
      </div>

      <div className="mb-6 rounded-lg border border-[#117a7a] bg-[#e0f2f1] p-4">
        <span className="mb-2 block text-[0.95rem] font-bold text-[#117a7a]">Your Pricing:</span>
        <div className="flex rounded border border-[#ccc] bg-white p-0.5">
          <div
            onClick={() => toggleVat(true)}
            className={`flex-1 cursor-pointer rounded-sm p-2 text-center text-[0.85rem] transition-all ${
              filters.vatExempt ? "bg-[#117a7a] font-semibold text-white" : ""
            }`}
          >
            VAT Exempt
          </div>
          <div
            onClick={() => toggleVat(false)}
            className={`flex-1 cursor-pointer rounded-sm p-2 text-center text-[0.85rem] transition-all ${
              !filters.vatExempt ? "bg-[#117a7a] font-semibold text-white" : ""
            }`}
          >
            Standard
          </div>
        </div>
        <div className="mt-3 space-y-2 text-[0.75rem] leading-[1.4] text-[#0d6161]">
          <div className="flex gap-1.5 align-top">
            <Info size={12} className="mt-0.5 shrink-0" />
            <span>Most customers with a chronic condition are eligible for VAT relief.</span>
          </div>
          <div className="mt-2 border-t border-[#117a7a]/20 pt-2 pl-4.5 opacity-90">
            <p className="mb-1 font-semibold">Self-declaration, no doctor&apos;s note needed.</p>
            <p>You must confirm eligibility at checkout.</p>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full rounded-lg border border-teal-200 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
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

        <FilterGroup title="Door Operation">
          {DOOR_OPERATION_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.doorType.includes(opt.value)}
              onChange={() => toggle("doorType", opt.value)}
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

        <FilterGroup title="Entry Direction">
          {ENTRY_DIRECTION_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.handing.includes(opt.value)}
              onChange={() => toggle("handing", opt.value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Seat Height">
          {SEAT_HEIGHT_OPTIONS.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.access.includes(opt.value)}
              onChange={() => toggle("access", opt.value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Spa & Wellness">
          {SPA_OPTIONS.map((opt) => (
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
