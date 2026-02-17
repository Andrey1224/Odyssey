import type { ProductVariant, PricingMode, DoorHanding, KeyFeature, LengthBucket } from "@/data/walkInBaths";

export function priceIncVat(v: ProductVariant): number {
  return Math.round(v.priceExVat * (1 + v.vatRate));
}

export function vatReliefSave(v: ProductVariant): number {
  return priceIncVat(v) - v.priceExVat;
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function displayPrice(v: ProductVariant, mode: PricingMode): number {
  return mode === "ex" ? v.priceExVat : priceIncVat(v);
}

export function offerSaveIncVat(v: ProductVariant): number | null {
  if (!v.wasPriceIncVat) return null;
  const currentInc = priceIncVat(v);
  const save = v.wasPriceIncVat - currentInc;
  return save > 0 ? save : null;
}

export type PlpFilters = Partial<{
  length: LengthBucket[];
  handing: DoorHanding[];
  keyFeatures: KeyFeature[];
}>;

export function filterVariants(items: ProductVariant[], filters: PlpFilters): ProductVariant[] {
  return items.filter((v) => {
    if (filters.length?.length && !filters.length.includes(v.lengthBucket)) return false;

    if (filters.handing?.length) {
      const ok = filters.handing.some((h) => v.doorHandingAvailable.includes(h));
      if (!ok) return false;
    }

    if (filters.keyFeatures?.length) {
      const ok = filters.keyFeatures.every((f) => v.keyFeatures.includes(f));
      if (!ok) return false;
    }

    return true;
  });
}

export function getBySlug(items: ProductVariant[], slug: string): ProductVariant | undefined {
  return items.find((v) => v.slug === slug);
}

export function getSiblings(items: ProductVariant[], baseModelId: string): ProductVariant[] {
  return items
    .filter((v) => v.baseModelId === baseModelId)
    .sort((a, b) => a.priceExVat - b.priceExVat);
}
