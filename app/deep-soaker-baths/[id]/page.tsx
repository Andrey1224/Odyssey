import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CatalogProductDetail } from "@/components/CatalogProductDetail";
import { DEEP_SOAKER_BASE_MODELS, DEEP_SOAKER_BATHS } from "@/data/deepSoakerBaths";
import { getBySlug } from "@/lib/catalog";
import { SITE_DOMAIN } from "@/lib/site";
import { productJsonLd } from "@/lib/schema";

const CATEGORY_PATH = "/deep-soaker-baths";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return DEEP_SOAKER_BATHS.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getBySlug(DEEP_SOAKER_BATHS, id);
  if (!product) return { robots: { index: false } };

  const canonical = `${SITE_DOMAIN}${CATEGORY_PATH}/${product.slug}`;
  const description =
    product.subtitle ??
    `The ${product.title} is a premium deep soaker bath from Odyssey Baths. VAT relief may apply.`;

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

export default async function DeepSoakerBathProductPage({ params }: Props) {
  const { id } = await params;
  const product = getBySlug(DEEP_SOAKER_BATHS, id);
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
        products={DEEP_SOAKER_BATHS}
        baseModels={DEEP_SOAKER_BASE_MODELS}
        categoryHref={CATEGORY_PATH}
      />
    </>
  );
}
