import type { MetadataRoute } from "next";
import { SITE_DOMAIN } from "@/lib/site";
import { WALK_IN_BATHS } from "@/data/walkInBaths";
import { DEEP_SOAKER_BATHS } from "@/data/deepSoakerBaths";
import { WALK_IN_SHOWER_BATHS } from "@/data/walkInShowerBaths";
import { STANDARD_SIZE_BATHS } from "@/data/standardSizeBaths";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_DOMAIN}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_DOMAIN}/walk-in-baths`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_DOMAIN}/walk-in-shower-baths`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_DOMAIN}/standard-size-baths`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_DOMAIN}/deep-soaker-baths`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_DOMAIN}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/free-brochure`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/free-quote`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const walkInBathPdps: MetadataRoute.Sitemap = WALK_IN_BATHS.map((p) => ({
    url: `${SITE_DOMAIN}/walk-in-baths/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const showerBathPdps: MetadataRoute.Sitemap = WALK_IN_SHOWER_BATHS.map((p) => ({
    url: `${SITE_DOMAIN}/walk-in-shower-baths/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const standardSizePdps: MetadataRoute.Sitemap = STANDARD_SIZE_BATHS.map((p) => ({
    url: `${SITE_DOMAIN}/standard-size-baths/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const deepSoakerPdps: MetadataRoute.Sitemap = DEEP_SOAKER_BATHS.map((p) => ({
    url: `${SITE_DOMAIN}/deep-soaker-baths/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...walkInBathPdps,
    ...showerBathPdps,
    ...standardSizePdps,
    ...deepSoakerPdps,
  ];
}
