"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  CheckCircle2,
  Flag,
  Percent,
  PlayCircle,
  SlidersHorizontal,
  Star,
} from "lucide-react";

import { BrochureBridge } from "@/components/BrochureBridge";
import { CollectionProductCard } from "@/components/CollectionProductCard";
import { DeepSoakerFilterSidebar } from "@/components/DeepSoakerFilterSidebar";
import { StandardSizeFilterSidebar } from "@/components/StandardSizeFilterSidebar";
import { WalkInShowerFilterSidebar } from "@/components/WalkInShowerFilterSidebar";
import {
  EMPTY_FILTERS,
  FilterSidebar,
  type FilterState,
} from "@/components/FilterSidebar";
import type { CatalogCategory, CatalogProductVariant } from "@/data/catalogTypes";
import type { DeepSoakerFilterTag } from "@/data/deepSoakerBaths";
import type { StandardSizeFilterTag } from "@/data/standardSizeBaths";
import type { WalkInShowerFilterTag } from "@/data/walkInShowerBaths";

type TagRecord = {
  widthMm: number;
  doorType: string;
  variant: string;
  handing: string[];
  features: string[];
  doorOpeningMm?: number;
};

type CatalogListContentProps = {
  category: CatalogCategory;
  products: CatalogProductVariant[];
  detailHrefBase: string;
  tags?: Record<string, TagRecord>;
  enableFilterLogic?: boolean;
  filterPreset?: "default" | "deepSoaker" | "walkInShower" | "standardSize";
  deepSoakerFilterTags?: Record<string, DeepSoakerFilterTag>;
  standardSizeFilterTags?: Record<string, StandardSizeFilterTag>;
  walkInShowerFilterTags?: Record<string, WalkInShowerFilterTag>;
  queryParamKeys?: Partial<Record<keyof Omit<FilterState, "vatExempt">, string>>;
};

export function CatalogListContent({
  category,
  products,
  detailHrefBase,
  tags,
  enableFilterLogic = false,
  filterPreset = "default",
  deepSoakerFilterTags,
  standardSizeFilterTags,
  walkInShowerFilterTags,
  queryParamKeys,
}: CatalogListContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryKeys = {
    width: queryParamKeys?.width ?? "width",
    doorType: queryParamKeys?.doorType ?? "doorType",
    package: queryParamKeys?.package ?? "pkg",
    handing: queryParamKeys?.handing ?? "handing",
    features: queryParamKeys?.features ?? "features",
    access: queryParamKeys?.access ?? "access",
  };

  const parseFilters = (): FilterState => ({
    vatExempt: searchParams.get("vat") !== "standard",
    width: searchParams.get(queryKeys.width)?.split(",").filter(Boolean) ?? [],
    doorType: searchParams.get(queryKeys.doorType)?.split(",").filter(Boolean) ?? [],
    package: searchParams.get(queryKeys.package)?.split(",").filter(Boolean) ?? [],
    handing: searchParams.get(queryKeys.handing)?.split(",").filter(Boolean) ?? [],
    features: searchParams.get(queryKeys.features)?.split(",").filter(Boolean) ?? [],
    access: searchParams.get(queryKeys.access)?.split(",").filter(Boolean) ?? [],
  });

  const [filters, setFilters] = useState<FilterState>(parseFilters);
  const [showDrawer, setShowDrawer] = useState(false);

  const updateFilters = (next: FilterState) => {
    setFilters(next);
    const params = new URLSearchParams();
    if (!next.vatExempt) params.set("vat", "standard");
    if (next.width.length) params.set(queryKeys.width, next.width.join(","));
    if (next.doorType.length) params.set(queryKeys.doorType, next.doorType.join(","));
    if (next.package.length) params.set(queryKeys.package, next.package.join(","));
    if (next.handing.length) params.set(queryKeys.handing, next.handing.join(","));
    if (next.features.length) params.set(queryKeys.features, next.features.join(","));
    if (next.access.length) params.set(queryKeys.access, next.access.join(","));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const canFilter = enableFilterLogic && !!tags;
  const isDeepSoakerPreset = filterPreset === "deepSoaker";
  const isWalkInShowerPreset = filterPreset === "walkInShower";
  const isStandardSizePreset = filterPreset === "standardSize";
  const SidebarComponent = isDeepSoakerPreset
    ? DeepSoakerFilterSidebar
    : isWalkInShowerPreset
      ? WalkInShowerFilterSidebar
      : isStandardSizePreset
        ? StandardSizeFilterSidebar
      : FilterSidebar;

  const filteredProducts =
    isDeepSoakerPreset && deepSoakerFilterTags
      ? products.filter((product) => {
          const tag = deepSoakerFilterTags[product.id];
          if (!tag) return true;

          if (filters.width.length && !filters.width.some((length) => tag.lengths.includes(length))) {
            return false;
          }

          if (filters.doorType.length && !filters.doorType.includes(tag.doorType)) {
            return false;
          }

          if (filters.package.length && !filters.package.includes(tag.doorMaterial)) {
            return false;
          }

          if (filters.handing.length && !filters.handing.includes(tag.entryPoint)) {
            return false;
          }

          if (filters.access.length && !filters.access.includes(tag.seatHeight)) {
            return false;
          }

          if (
            filters.features.length &&
            !filters.features.every((spa) =>
              tag.spaOptions.includes(spa as "hydrotherapy" | "chromotherapy" | "microbubbles"),
            )
          ) {
            return false;
          }

          return true;
        })
      : isWalkInShowerPreset && walkInShowerFilterTags
        ? products.filter((product) => {
            const tag = walkInShowerFilterTags[product.id];
            if (!tag) return true;

            if (filters.doorType.length && !filters.doorType.includes(tag.bathShape)) {
              return false;
            }

            if (filters.width.length && !filters.width.some((length) => tag.lengths.includes(length))) {
              return false;
            }

            if (filters.package.length && !filters.package.includes(tag.integratedSeat)) {
              return false;
            }

            if (filters.handing.length && !filters.handing.includes(tag.doorAction)) {
              return false;
            }

            if (filters.features.length && !filters.features.includes(tag.glassThickness)) {
              return false;
            }

            if (filters.access.length && !filters.access.includes(tag.dualWaste)) {
              return false;
            }

            return true;
          })
      : isStandardSizePreset && standardSizeFilterTags
        ? products.filter((product) => {
            const tag = standardSizeFilterTags[product.id];
            if (!tag) return true;

            if (filters.width.length && !filters.width.some((length) => tag.lengths.includes(length))) {
              return false;
            }

            if (filters.package.length && !filters.package.includes(tag.doorMaterial)) {
              return false;
            }

            if (filters.handing.length && !filters.handing.includes(tag.doorPosition)) {
              return false;
            }

            if (filters.doorType.length && !filters.doorType.includes(tag.bathType)) {
              return false;
            }

            if (filters.features.length && !filters.features.every((waste) => tag.wasteType.includes(waste as "twinWaste" | "plugAndChain"))) {
              return false;
            }

            return true;
          })
      : canFilter
        ? products.filter((product) => {
            const tag = tags?.[product.id];
            if (!tag) return true;

            if (filters.width.length && !filters.width.includes(String(tag.widthMm))) return false;
            if (filters.doorType.length && !filters.doorType.includes(tag.doorType)) return false;
            if (filters.package.length && !filters.package.includes(tag.variant)) return false;
            if (filters.handing.length && !filters.handing.some((h) => tag.handing.includes(h))) return false;
            if (filters.features.length && !filters.features.every((f) => tag.features.includes(f))) return false;
            if (filters.access.includes("wideDoor") && !tag.doorOpeningMm) return false;

            return true;
          })
        : products;

  return (
    <>
      <section className="bg-cream-50 py-10 text-center">
        <div className="mx-auto max-w-[1280px] px-5">
          <h1 className="mb-2.5 text-2xl font-bold text-slate-900 md:text-[2.5rem]">{category.heroHeadline}</h1>
          <p className="mx-auto max-w-[600px] text-[1.1rem] leading-[1.5] text-slate-600">
            {category.heroSubhead}
          </p>
        </div>
      </section>

      <div className="mb-5 border-b border-slate-200 bg-slate-100 py-2">
        <div className="mx-auto max-w-[1280px] px-5">
          <div className="flex flex-wrap justify-center gap-3 md:gap-10">
            <div className="flex items-center gap-2 text-[0.9rem] font-medium text-slate-800">
              <span className="text-teal-800"><Star size={14} /></span> 4.9/5 Trustpilot
            </div>
            <div className="flex items-center gap-2 text-[0.9rem] font-medium text-slate-800">
              <span className="text-teal-800"><CheckCircle2 size={14} /></span> 10 Year Warranty
            </div>
            <div className="flex items-center gap-2 text-[0.9rem] font-medium text-slate-800">
              <span className="text-teal-800"><Flag size={14} /></span> Made in UK
            </div>
            <div className="flex items-center gap-2 text-[0.9rem] font-medium text-slate-800">
              <span className="text-teal-800"><Percent size={14} /></span> VAT Relief Handled
            </div>
          </div>
        </div>
      </div>

      <section className="mb-5 border-b border-slate-100 bg-cream-50 py-2">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">{category.explainer.headline}</h2>
            <p className="mb-6 leading-relaxed text-slate-600">{category.explainer.body}</p>
            <ul className="mb-8 space-y-3">
              {category.explainer.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-slate-700">
                  <Check size={20} className="mt-0.5 shrink-0 text-teal-800" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <button className="flex items-center gap-2 rounded-full border border-teal-200 px-5 py-2.5 font-bold text-teal-800 transition-colors hover:bg-teal-50">
              <PlayCircle size={20} />
              {category.explainer.ctaLabel}
            </button>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2">
            {category.explainer.image?.src ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-cream-50">
                <Image
                  src={category.explainer.image.src}
                  alt={category.explainer.image.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-200 px-6 text-center text-base font-semibold text-slate-600">
                {category.explainer.placeholderLabel ?? "Image placeholder - will be replaced"}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-start gap-12 lg:flex-row">
          <div className="sticky top-24 z-10 hidden w-full lg:block lg:w-auto">
            <SidebarComponent filters={filters} setFilters={updateFilters} />
          </div>

          {showDrawer && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowDrawer(false)} />
              <div className="absolute left-0 top-0 h-full w-[320px] max-w-full overflow-y-auto bg-cream-50 p-5 shadow-xl">
                <SidebarComponent
                  filters={filters}
                  setFilters={updateFilters}
                  onClose={() => setShowDrawer(false)}
                />
              </div>
            </div>
          )}

          <div className="w-full flex-1">
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-6">
              <span className="font-bold text-slate-700">Showing {filteredProducts.length} results</span>
              <button
                onClick={() => setShowDrawer(true)}
                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {filteredProducts.map((product) => (
                <CollectionProductCard
                  key={product.id}
                  {...product}
                  vatExempt={filters.vatExempt}
                  detailHrefBase={detailHrefBase}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-cream-50 py-20 text-center">
                <h3 className="mb-2 text-xl font-bold text-slate-900">No baths found fitting criteria</h3>
                <p className="mb-6 text-slate-600">Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => updateFilters({ vatExempt: filters.vatExempt, ...EMPTY_FILTERS })}
                  className="font-bold text-teal-800 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            <BrochureBridge />
          </div>
        </div>
      </div>
    </>
  );
}
