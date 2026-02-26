import { groq } from "next-sanity";

import { isSanityConfigured, sanityClient } from "./client";
import {
  type CategoryDTO,
  type PostCardDTO,
  type PostPageDTO,
  type SiteSettingsDTO,
  postCardFromSanity,
  postPageFromSanity,
} from "./types";

export const getCategoriesQuery = groq`
  *[_type == "category"] | order(order asc, title asc){
    _id,
    title,
    "slug": slug.current,
    order,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

export const getPostsQuery = groq`
  {
    "total": count(*[
      _type == "post" &&
      ($categorySlug == null || category->slug.current == $categorySlug) &&
      ($q == null || title match ("*" + $q + "*"))
    ]),
    "items": *[
      _type == "post" &&
      ($categorySlug == null || category->slug.current == $categorySlug) &&
      ($q == null || title match ("*" + $q + "*"))
    ] | order(publishedAt desc)[$start...$end]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      "categoryTitle": category->title,
      "categorySlug": category->slug.current,
      "coverImageUrl": coverImage.asset->url,
      "coverImageAlt": coverImageAlt
    }
  }
`;

export const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    legacyId,
    previousSlugs,
    excerpt,
    publishedAt,
    readTime,
    "categoryId": category->_ref,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "asset": asset->{_id, url, metadata}
      }
    },
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImageAlt,
    tags,
    faq[]{q, a},
    seo{
      title,
      description,
      "ogImageUrl": ogImage.asset->url,
      noindex
    }
  }
`;

export const getPostByPreviousSlugQuery = groq`
  *[_type == "post" && $slug in previousSlugs][0]{
    _id,
    "slug": slug.current
  }
`;

export const getPostByLegacyIdQuery = groq`
  *[_type == "post" && legacyId == $legacyId][0]{
    _id,
    "slug": slug.current
  }
`;

export const getRelatedPostsQuery = groq`
  *[
    _type == "post" &&
    _id != $excludeId &&
    (
      category._ref == $categoryId ||
      count((tags[])[@ in $tags]) > 0
    )
  ] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImageAlt
  }
`;

export const getSiteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    phone,
    email,
    address,
    openingHours,
    defaultSeoTitle,
    defaultSeoDescription,
    "defaultOgImageUrl": defaultOgImage.asset->url,
    blogCtaBlock{
      title,
      text,
      primaryButtonLabel,
      primaryButtonHref,
      secondaryButtonLabel,
      secondaryButtonHref
    }
  }
`;

export const getAllBlogSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    "slug": slug.current
  }
`;

type GetPostsArgs = {
  page: number;
  pageSize: number;
  categorySlug?: string;
  q?: string;
};

type GetRelatedPostsArgs = {
  categoryId: string;
  tags?: string[];
  excludeId: string;
};

export async function getCategories(): Promise<CategoryDTO[]> {
  if (!isSanityConfigured) return [];

  const rows = await sanityClient.fetch<Array<{
    _id: string;
    title: string;
    slug: string;
    order: number;
    postCount?: number;
  }>>(getCategoriesQuery);

  return rows.map((row) => ({
    id: row._id,
    title: row.title,
    slug: row.slug,
    order: row.order,
    postCount: row.postCount ?? 0,
  }));
}

export async function getPosts({
  page,
  pageSize,
  categorySlug,
  q,
}: GetPostsArgs): Promise<{ total: number; items: PostCardDTO[] }> {
  if (!isSanityConfigured) return { total: 0, items: [] };

  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 6;

  // Cumulative pagination to match current "Load more" behavior.
  const start = 0;
  const end = safePage * safePageSize;

  const result = await sanityClient.fetch<{
    total: number;
    items: Array<{
      _id: string;
      slug: string;
      title: string;
      excerpt: string;
      categoryTitle?: string;
      categorySlug?: string;
      publishedAt: string;
      readTime?: string;
      coverImageUrl?: string;
      coverImageAlt?: string;
    }>;
  }>(getPostsQuery, {
    start,
    end,
    categorySlug: categorySlug?.trim() ? categorySlug.trim() : null,
    q: q?.trim() ? q.trim() : null,
  });

  return {
    total: result.total,
    items: result.items.map(postCardFromSanity),
  };
}

export async function getPostBySlug(slug: string): Promise<PostPageDTO | null> {
  if (!isSanityConfigured) return null;

  const row = await sanityClient.fetch<{
    _id: string;
    slug: string;
    legacyId?: number;
    previousSlugs?: string[];
    title: string;
    excerpt: string;
    categoryId: string;
    categoryTitle?: string;
    categorySlug?: string;
    publishedAt: string;
    readTime?: string;
    coverImageUrl?: string;
    coverImageAlt?: string;
    body?: PostPageDTO["body"];
    tags?: string[];
    faq?: PostPageDTO["faq"];
    seo?: PostPageDTO["seo"];
  } | null>(getPostBySlugQuery, { slug });

  return row ? postPageFromSanity(row) : null;
}

export async function getPostByPreviousSlug(slug: string): Promise<{ id: string; slug: string } | null> {
  if (!isSanityConfigured) return null;

  const row = await sanityClient.fetch<{ _id: string; slug: string } | null>(
    getPostByPreviousSlugQuery,
    { slug },
  );

  if (!row) return null;
  return { id: row._id, slug: row.slug };
}

export async function getPostByLegacyId(legacyId: number): Promise<{ id: string; slug: string } | null> {
  if (!isSanityConfigured) return null;
  if (!Number.isInteger(legacyId) || legacyId <= 0) return null;

  const row = await sanityClient.fetch<{ _id: string; slug: string } | null>(
    getPostByLegacyIdQuery,
    { legacyId },
  );

  if (!row) return null;
  return { id: row._id, slug: row.slug };
}

export async function getRelatedPosts({
  categoryId,
  tags,
  excludeId,
}: GetRelatedPostsArgs): Promise<PostCardDTO[]> {
  if (!isSanityConfigured) return [];

  const rows = await sanityClient.fetch<Array<{
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    categoryTitle?: string;
    categorySlug?: string;
    publishedAt: string;
    readTime?: string;
    coverImageUrl?: string;
    coverImageAlt?: string;
  }>>(getRelatedPostsQuery, {
    categoryId,
    tags: tags && tags.length > 0 ? tags : [],
    excludeId,
  });

  return rows.map(postCardFromSanity);
}

export async function getSiteSettings(): Promise<SiteSettingsDTO | null> {
  if (!isSanityConfigured) return null;

  return sanityClient.fetch<SiteSettingsDTO | null>(getSiteSettingsQuery);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];

  const rows = await sanityClient.fetch<Array<{ slug: string }>>(getAllBlogSlugsQuery);
  return rows.map((row) => row.slug).filter(Boolean);
}
