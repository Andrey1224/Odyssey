import { notFound } from "next/navigation";

import { CatalogProductDetail } from "@/components/CatalogProductDetail";
import { BASE_MODELS, WALK_IN_BATHS } from "@/data/walkInBaths";
import { getBySlug } from "@/lib/catalog";

export function generateStaticParams() {
  return WALK_IN_BATHS.map((p) => ({ id: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getBySlug(WALK_IN_BATHS, id);
  if (!product) notFound();

  return (
    <CatalogProductDetail
      product={product}
      products={WALK_IN_BATHS}
      baseModels={BASE_MODELS}
      categoryTitle="Walk-in Baths"
      categoryHref="/walk-in-baths"
    />
  );
}
