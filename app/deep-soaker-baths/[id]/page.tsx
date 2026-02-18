import { notFound } from "next/navigation";

import { CatalogProductDetail } from "@/components/CatalogProductDetail";
import { DEEP_SOAKER_BASE_MODELS, DEEP_SOAKER_BATHS } from "@/data/deepSoakerBaths";
import { getBySlug } from "@/lib/catalog";

export function generateStaticParams() {
  return DEEP_SOAKER_BATHS.map((p) => ({ id: p.slug }));
}

export default async function DeepSoakerBathProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getBySlug(DEEP_SOAKER_BATHS, id);
  if (!product) notFound();

  return (
    <CatalogProductDetail
      product={product}
      products={DEEP_SOAKER_BATHS}
      baseModels={DEEP_SOAKER_BASE_MODELS}
      categoryTitle="Deep Soaker Baths"
      categoryHref="/deep-soaker-baths"
    />
  );
}
