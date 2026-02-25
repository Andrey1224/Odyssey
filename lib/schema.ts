import type { CatalogProductVariant } from "@/data/catalogTypes";
import type { BlogPost } from "@/data/blogPosts";
import { SITE_DOMAIN, SITE_NAME, PHONE, EMAIL, CURRENCY } from "./site";
import { priceIncVat } from "./catalog";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_DOMAIN,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Northgate Avenue",
      addressLocality: "Bury St. Edmunds",
      addressRegion: "England",
      postalCode: "IP32 6BB",
      addressCountry: "GB",
    },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    currenciesAccepted: CURRENCY,
    priceRange: "££",
  };
}

export function blogPostingJsonLd(post: BlogPost, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    url,
  };
}

export function productJsonLd(product: CatalogProductVariant, url: string) {
  const price = priceIncVat(product);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.subtitle ?? undefined,
    image: [
      product.primaryImage.src,
      ...(product.gallery?.map((g) => g.src) ?? []),
    ],
    url,
    offers: {
      "@type": "Offer",
      priceCurrency: CURRENCY,
      price: price.toFixed(2),
      availability:
        product.isInStock === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url,
    },
  };
}
