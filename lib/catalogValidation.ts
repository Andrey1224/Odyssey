import type { CatalogBaseModel, CatalogProductVariant } from "@/data/catalogTypes";

export function validateCatalogDataset(
  datasetName: string,
  products: CatalogProductVariant[],
  baseModels: CatalogBaseModel[],
): void {
  if (process.env.NODE_ENV === "production") return;

  const productIds = new Set<string>();
  const productSlugs = new Set<string>();
  const issues: string[] = [];

  for (const product of products) {
    if (!product.id || !product.title || !product.slug) {
      issues.push(`Missing required id/title/slug for product: ${JSON.stringify(product)}`);
    }

    if (productIds.has(product.id)) issues.push(`Duplicate product id: ${product.id}`);
    if (productSlugs.has(product.slug)) issues.push(`Duplicate product slug: ${product.slug}`);

    productIds.add(product.id);
    productSlugs.add(product.slug);
  }

  for (const base of baseModels) {
    for (const variantId of base.variantIds) {
      if (!productIds.has(variantId)) {
        issues.push(`Base model ${base.id} references unknown variant id: ${variantId}`);
      }
    }
  }

  if (issues.length > 0) {
    // Keep runtime non-fatal for local data filling iterations.
    console.warn(`[catalog-validation:${datasetName}]`, issues);
  }
}
