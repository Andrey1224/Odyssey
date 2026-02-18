import type { CatalogProductVariant } from "@/data/catalogTypes";

export function priceIncVat(v: Pick<CatalogProductVariant, "priceExVat" | "vatRate">): number {
  return Math.round(v.priceExVat * (1 + v.vatRate));
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getBySlug<T extends { slug: string }>(items: T[], slug: string): T | undefined {
  return items.find((v) => v.slug === slug);
}

export function getSiblings<T extends { baseModelId: string; priceExVat: number }>(
  items: T[],
  baseModelId: string,
): T[] {
  return items
    .filter((v) => v.baseModelId === baseModelId)
    .sort((a, b) => a.priceExVat - b.priceExVat);
}
