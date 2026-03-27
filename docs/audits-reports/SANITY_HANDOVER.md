# Sanity Handover (Blog/Guides)

## 1) Purpose
This document explains what was integrated with Sanity, how it works in this repository, and how future developers should maintain it.

Primary goal of this phase:
- Move Blog/Guides content to Sanity.
- Keep existing Blog UI/markup and visual style.
- Keep product catalog, VAT logic, PLP/PDP logic in code (not in CMS).

## 2) Scope Implemented
Sanity currently powers:
- Blog listing (`/blog`)
- Blog detail (`/blog/[slug]`)
- Blog categories
- Blog post content (Portable Text + FAQ + tags + SEO)
- Blog CTA defaults via `siteSettings`
- Blog URLs in sitemap

Still code-driven (intentionally):
- Product data and product routes
- VAT logic
- Product filters and PDP/PLP logic
- Non-blog static pages content

## 3) Key Files (Architecture Map)
Core Sanity setup:
- `sanity.config.ts`
- `sanity.cli.ts`
- `sanity/schemaTypes/index.ts`
- `sanity/schemaTypes/category.ts`
- `sanity/schemaTypes/post.ts`
- `sanity/schemaTypes/siteSettings.ts`
- `sanity/lib/client.ts`
- `sanity/lib/queries.ts`
- `sanity/lib/types.ts`

Next.js integration points:
- `app/blog/page.tsx`
- `app/blog/BlogContent.tsx`
- `app/blog/[slug]/page.tsx`
- `app/blog/[slug]/BlogArticleContent.tsx`
- `app/sitemap.ts`
- `lib/schema.ts`
- `next.config.ts` (Sanity image domain)

Environment template:
- `.env.example`
- `.env.local`

## 4) Data Contracts Used by UI
Defined in `sanity/lib/types.ts`.

Main DTOs:
- `PostCardDTO`
- `PostPageDTO`
- `CategoryDTO`
- `SiteSettingsDTO`

Important runtime mapping helpers:
- `postCardFromSanity(...)`
- `postPageFromSanity(...)`
- `formatPublishedDate(...)`
- `buildTocFromPortableText(...)`

## 5) Sanity Schemas (What Editors Can Manage)
Defined in `sanity/schemaTypes/*`.

### `category` document
Fields:
- `title` (required)
- `slug` (required, from title)
- `order` (number, default `0`)

### `post` document
Fields:
- `title` (required)
- `slug` (required, from title)
- `legacyId` (optional numeric ID for old `/blog/{id}` links)
- `category` (required reference -> `category`)
- `excerpt` (required, max 240)
- `coverImage` (required image, hotspot)
- `coverImageAlt` (required)
- `publishedAt` (required datetime, defaults to current time)
- `readTime` (optional string)
- `body` (required Portable Text; supports blocks + image with required alt)
- `tags` (optional string array)
- `faq` (optional array of `{q, a}`)
- `seo` (optional object: `title`, `description`, `ogImage`, `noindex`)
- `previousSlugs` (optional string array for slug-change redirects)

### `siteSettings` document
Fields:
- `phone`, `email`, `address`, `openingHours`
- `defaultSeoTitle`, `defaultSeoDescription`, `defaultOgImage`
- `blogCtaBlock`:
  - `title`
  - `text`
  - `primaryButtonLabel`
  - `primaryButtonHref`
  - `secondaryButtonLabel`
  - `secondaryButtonHref`

## 6) Query Layer (Server-Side Data Access)
All GROQ queries live in `sanity/lib/queries.ts`.

Main fetch functions:
- `getCategories()`
- `getPosts({ page, pageSize, categorySlug, q })`
- `getPostBySlug(slug)`
- `getRelatedPosts({ categoryId, tags, excludeId })`
- `getSiteSettings()`
- `getAllBlogSlugs()`
- `getPostByPreviousSlug(slug)`
- `getPostByLegacyId(legacyId)`

Guard behavior:
- `sanity/lib/client.ts` exports `isSanityConfigured`.
- If env is not configured, query functions return safe empty/null values instead of crashing.

## 7) Route Behavior

### `/blog` (listing)
File: `app/blog/page.tsx` + `app/blog/BlogContent.tsx`

Supports:
- Category filter via `?category={slug}`
- Search via `?q={text}`
- Pagination via `?page={n}` with cumulative "Load more" behavior

Empty states:
- If no filters/search: "No articles yet."
- If filtered/search has no results: "No matching articles." + "Clear filters"

### `/blog/[slug]` (detail)
File: `app/blog/[slug]/page.tsx`

Resolution order:
1. If param is numeric, treat it as legacy ID and find matching post by `legacyId`.
2. Else resolve by current slug.
3. Else resolve by `previousSlugs` and permanently redirect to current slug.
4. If nothing found: `notFound()`.

Additional detail page features:
- Portable Text rendering (`@portabletext/react`)
- FAQ rendering if present
- Related posts (same category or shared tags, max 3)
- CTA block from `siteSettings.blogCtaBlock` with code-level fallback copy
- Table of contents auto-generated from Portable Text headings

## 8) SEO and Structured Data
Listing and detail use `generateMetadata`.

Fallback strategy:
- Post page prefers `post.seo.*`
- Falls back to post/core fields
- Falls back to `siteSettings` defaults where applicable

Implemented:
- Canonical URLs
- OpenGraph + Twitter image/title/description
- `noindex` support from `post.seo.noindex`
- BlogPosting JSON-LD on detail page (`lib/schema.ts`)

## 9) Sitemap Integration
File: `app/sitemap.ts`

Blog URLs are generated dynamically from Sanity using `getAllBlogSlugs()` and appended to sitemap output.

## 10) Environment and Config
Expected env vars:
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`
- `SANITY_READ_TOKEN` (optional, for authenticated reads/drafts)

Template files:
- `.env.example`
- `.env.local`

Important note:
- `sanity.config.ts` currently uses explicit `projectId` and `dataset` values.
- `sanity.cli.ts` reads project/dataset from env.
- Keep these consistent when changing project or dataset.

## 11) Local Runbook
Install deps:
```bash
npm install
```

Run Next app:
```bash
npm run dev
```

Run Sanity Studio:
```bash
npx sanity dev
```

If `npx sanity dev` fails with missing CLI binary:
```bash
npm install -D sanity
```

## 12) Content Editor Workflow
Recommended order for new content:
1. Create categories.
2. Create/update one `siteSettings` document (SEO defaults + blog CTA).
3. Create posts with full required fields.
4. For migrated old URLs, set `legacyId` if an old numeric URL existed.
5. When changing slug, add old slug into `previousSlugs` before publish.

## 13) Troubleshooting
No posts on `/blog`:
- Check `.env.local` values.
- Check that posts are published in Sanity dataset.
- Check `isSanityConfigured` conditions in `sanity/lib/client.ts`.

`/blog/123` does not redirect:
- Ensure target post has `legacyId: 123`.

Old slug returns 404:
- Ensure old slug is present in `previousSlugs`.

Missing OG images:
- Check `post.seo.ogImage` or `siteSettings.defaultOgImage`.

Images not rendering:
- Ensure `next.config.ts` includes `cdn.sanity.io` remote pattern.

## 14) Known Constraints / Non-Goals
- No embedded Studio route in Next app in this phase.
- No draft/preview mode wired into frontend.
- No webhook/tag revalidation implemented in this phase.
- Product content remains code-driven by design.

