import { notFound } from "next/navigation";

import { CatalogProductDetail } from "@/components/CatalogProductDetail";
import {
  WALK_IN_SHOWER_BATHS,
  WALK_IN_SHOWER_BATHS_BASE_MODELS,
} from "@/data/walkInShowerBaths";
import { getBySlug } from "@/lib/catalog";

export function generateStaticParams() {
  return WALK_IN_SHOWER_BATHS.map((p) => ({ id: p.slug }));
}

export default async function WalkInShowerBathProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getBySlug(WALK_IN_SHOWER_BATHS, id);
  if (!product) notFound();

  return (
    <CatalogProductDetail
      product={product}
      products={WALK_IN_SHOWER_BATHS}
      baseModels={WALK_IN_SHOWER_BATHS_BASE_MODELS}
      categoryTitle="Walk-in Shower Baths"
      categoryHref="/walk-in-shower-baths"
    />
  );
}
