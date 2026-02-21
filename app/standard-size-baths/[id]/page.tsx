import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CatalogProductDetail } from "@/components/CatalogProductDetail";
import { STANDARD_SIZE_BASE_MODELS, STANDARD_SIZE_BATHS } from "@/data/standardSizeBaths";
import { getBySlug } from "@/lib/catalog";
import { SITE_DOMAIN } from "@/lib/site";
import { productJsonLd } from "@/lib/schema";

const CATEGORY_PATH = "/standard-size-baths";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return STANDARD_SIZE_BATHS.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getBySlug(STANDARD_SIZE_BATHS, id);
  if (!product) return { robots: { index: false } };

  const canonical = `${SITE_DOMAIN}${CATEGORY_PATH}/${product.slug}`;
  const description =
    product.subtitle ??
    `The ${product.title} is a premium standard size accessible bath from Odyssey Baths. VAT relief may apply.`;

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

export default async function StandardSizeBathProductPage({ params }: Props) {
  const { id } = await params;
  const product = getBySlug(STANDARD_SIZE_BATHS, id);
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
        products={STANDARD_SIZE_BATHS}
        baseModels={STANDARD_SIZE_BASE_MODELS}
        categoryHref={CATEGORY_PATH}
      />
    </>
  );
}
