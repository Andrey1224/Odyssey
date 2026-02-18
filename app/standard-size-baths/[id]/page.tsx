import { notFound } from "next/navigation";

import { CatalogProductDetail } from "@/components/CatalogProductDetail";
import { STANDARD_SIZE_BASE_MODELS, STANDARD_SIZE_BATHS } from "@/data/standardSizeBaths";
import { getBySlug } from "@/lib/catalog";

export function generateStaticParams() {
  return STANDARD_SIZE_BATHS.map((p) => ({ id: p.slug }));
}

export default async function StandardSizeBathProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getBySlug(STANDARD_SIZE_BATHS, id);
  if (!product) notFound();

  return (
    <CatalogProductDetail
      product={product}
      products={STANDARD_SIZE_BATHS}
      baseModels={STANDARD_SIZE_BASE_MODELS}
      categoryTitle="Standard Size Baths"
      categoryHref="/standard-size-baths"
    />
  );
}
