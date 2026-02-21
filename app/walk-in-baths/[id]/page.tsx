import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CatalogProductDetail } from "@/components/CatalogProductDetail";
import { BASE_MODELS, WALK_IN_BATHS } from "@/data/walkInBaths";
import { getBySlug } from "@/lib/catalog";
import { SITE_DOMAIN } from "@/lib/site";
import { productJsonLd } from "@/lib/schema";

const CATEGORY_PATH = "/walk-in-baths";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return WALK_IN_BATHS.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getBySlug(WALK_IN_BATHS, id);
  if (!product) return { robots: { index: false } };

  const canonical = `${SITE_DOMAIN}${CATEGORY_PATH}/${product.slug}`;
  const description =
    product.subtitle ??
    `The ${product.title} is a premium walk-in bath from Odyssey Baths. VAT relief may apply.`;

  return {
    title: product.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${product.title} | Odyssey Baths`,
      description,
      url: canonical,
      images: [{ url: product.primaryImage.src, alt: product.primaryImage.alt }],
    },
    twitter: { images: [product.primaryImage.src] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getBySlug(WALK_IN_BATHS, id);
  if (!product) notFound();

  const canonical = `${SITE_DOMAIN}${CATEGORY_PATH}/${product.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product, canonical)) }}
      />
      <CatalogProductDetail
        product={product}
        products={WALK_IN_BATHS}
        baseModels={BASE_MODELS}
        categoryHref={CATEGORY_PATH}
      />
    </>
  );
}
