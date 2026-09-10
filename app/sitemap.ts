import type { MetadataRoute } from "next";
import { SITE_DOMAIN } from "@/lib/site";
import { WALK_IN_BATHS } from "@/data/walkInBaths";
import { DEEP_SOAKER_BATHS } from "@/data/deepSoakerBaths";
import { WALK_IN_SHOWER_BATHS } from "@/data/walkInShowerBaths";
import { STANDARD_SIZE_BATHS } from "@/data/standardSizeBaths";
import { getAllBlogSlugs } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_DOMAIN}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_DOMAIN}/walk-in-baths`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_DOMAIN}/walk-in-shower-baths`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_DOMAIN}/standard-size-baths`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_DOMAIN}/deep-soaker-baths`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_DOMAIN}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/reviews`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/blog`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/free-brochure`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/return-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_DOMAIN}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_DOMAIN}/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_DOMAIN}/installing-a-walk-in-bath`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const walkInBathPdps: MetadataRoute.Sitemap = WALK_IN_BATHS.map((p) => ({
    url: `${SITE_DOMAIN}/walk-in-baths/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const showerBathPdps: MetadataRoute.Sitemap = WALK_IN_SHOWER_BATHS.map((p) => ({
    url: `${SITE_DOMAIN}/walk-in-shower-baths/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const standardSizePdps: MetadataRoute.Sitemap = STANDARD_SIZE_BATHS.map((p) => ({
    url: `${SITE_DOMAIN}/standard-size-baths/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const deepSoakerPdps: MetadataRoute.Sitemap = DEEP_SOAKER_BATHS.map((p) => ({
    url: `${SITE_DOMAIN}/deep-soaker-baths/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogSlugs = await getAllBlogSlugs();
  const excludedSlugs = new Set(["фыафыафы"]);
  const blogArticles: MetadataRoute.Sitemap = blogSlugs
    .filter(slug => !excludedSlugs.has(slug))
    .map((slug) => ({
      url: `${SITE_DOMAIN}/blog/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...walkInBathPdps,
    ...showerBathPdps,
    ...standardSizePdps,
    ...deepSoakerPdps,
    ...blogArticles,
  ];
}
