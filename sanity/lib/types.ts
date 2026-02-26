export type PortableTextSpan = {
  _type?: "span";
  text?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type: string;
  style?: string;
  children?: PortableTextSpan[];
  [key: string]: unknown;
};

export type PostCardDTO = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categoryTitle: string;
  categorySlug: string;
  publishedAt: string;
  readTime?: string;
  tags?: string[];
  seo?: {
    noindex?: boolean;
  };
  coverImage?: {
    url: string;
    alt: string;
  };
};

export type PostFaqItem = {
  q: string;
  a: string;
};

export type PostPageDTO = {
  id: string;
  slug: string;
  legacyId?: number;
  previousSlugs?: string[];
  title: string;
  excerpt: string;
  categoryId: string;
  categoryTitle: string;
  categorySlug: string;
  publishedAt: string;
  readTime?: string;
  coverImage: {
    url: string;
    alt: string;
  };
  body: PortableTextBlock[];
  tableOfContents?: Array<{ id: string; title: string }>;
  tags?: string[];
  faq?: PostFaqItem[];
  seo?: {
    title?: string;
    description?: string;
    ogImageUrl?: string;
    noindex?: boolean;
  };
};

export type CategoryDTO = {
  id: string;
  title: string;
  slug: string;
  order: number;
  postCount: number;
};

export type BlogCtaBlockDTO = {
  title?: string;
  text?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
};

export type SiteSettingsDTO = {
  phone?: string;
  email?: string;
  address?: string;
  openingHours?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultOgImageUrl?: string;
  blogCtaBlock?: BlogCtaBlockDTO;
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeHeadingKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 16);
}

export function buildPortableHeadingId(title: string, key?: string, index?: number): string {
  const base = slugify(title || "section");

  if (typeof key === "string" && key.trim()) {
    return `${base}-${normalizeHeadingKey(key)}`;
  }

  if (typeof index === "number" && Number.isFinite(index) && index >= 0) {
    return `${base}-${index + 1}`;
  }

  return base;
}

export function formatPublishedDate(dateIso: string): string {
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) return dateIso;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function postCardFromSanity(input: {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category?: {
    title?: string;
    slug?: string;
  };
  categoryTitle?: string;
  categorySlug?: string;
  publishedAt: string;
  readTime?: string;
  tags?: string[];
  seo?: {
    noindex?: boolean;
  };
  coverImage?: {
    url?: string;
    alt?: string;
  };
  coverImageUrl?: string;
  coverImageAlt?: string;
}): PostCardDTO {
  const imageUrl = input.coverImage?.url ?? input.coverImageUrl;
  const imageAlt = input.coverImage?.alt ?? input.coverImageAlt ?? input.title;

  return {
    id: input._id,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    categoryTitle: input.category?.title ?? input.categoryTitle ?? "Uncategorized",
    categorySlug: input.category?.slug ?? input.categorySlug ?? "uncategorized",
    publishedAt: input.publishedAt,
    readTime: input.readTime,
    tags: input.tags ?? [],
    seo: input.seo,
    coverImage: imageUrl
      ? {
          url: imageUrl,
          alt: imageAlt,
        }
      : undefined,
  };
}

export function postPageFromSanity(input: {
  _id: string;
  slug: string;
  legacyId?: number;
  previousSlugs?: string[];
  title: string;
  excerpt: string;
  category?: {
    id?: string;
    title?: string;
    slug?: string;
  };
  categoryId?: string;
  categoryTitle?: string;
  categorySlug?: string;
  publishedAt: string;
  readTime?: string;
  body?: PortableTextBlock[];
  tags?: string[];
  faq?: PostFaqItem[];
  coverImage?: {
    url?: string;
    alt?: string;
  };
  coverImageUrl?: string;
  coverImageAlt?: string;
  seo?: {
    title?: string;
    description?: string;
    ogImageUrl?: string;
    noindex?: boolean;
  };
}): PostPageDTO {
  const categoryId = input.categoryId ?? input.category?.id ?? "uncategorized";
  const categoryTitle = input.category?.title ?? input.categoryTitle ?? "Uncategorized";
  const categorySlug = input.category?.slug ?? input.categorySlug ?? "uncategorized";
  const coverImageUrl = input.coverImage?.url ?? input.coverImageUrl ?? "";
  const coverImageAlt = input.coverImage?.alt ?? input.coverImageAlt ?? input.title;

  return {
    id: input._id,
    slug: input.slug,
    legacyId: input.legacyId,
    previousSlugs: input.previousSlugs,
    title: input.title,
    excerpt: input.excerpt,
    categoryId,
    categoryTitle,
    categorySlug,
    publishedAt: input.publishedAt,
    readTime: input.readTime,
    coverImage: {
      url: coverImageUrl,
      alt: coverImageAlt,
    },
    body: input.body ?? [],
    tags: input.tags ?? [],
    faq: input.faq ?? [],
    seo: input.seo,
  };
}

export function buildTocFromPortableText(body: PortableTextBlock[]): Array<{ id: string; title: string }> {
  const toc: Array<{ id: string; title: string }> = [];

  for (let blockIndex = 0; blockIndex < body.length; blockIndex += 1) {
    const block = body[blockIndex];
    if (block._type !== "block") continue;
    if (block.style !== "h2" && block.style !== "h3") continue;

    const title = (block.children ?? [])
      .map((child) => child.text ?? "")
      .join("")
      .trim();

    if (!title) continue;

    const id = buildPortableHeadingId(
      title,
      typeof block._key === "string" ? block._key : undefined,
      blockIndex,
    );

    toc.push({ id, title });
  }

  return toc;
}
