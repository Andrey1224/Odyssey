# SANITY COVERAGE AUDIT (CODEX)

Date: 2026-02-24  
Repo: `oddyseyweb`  
Scope: Read-only audit of current Next.js App Router implementation to define pragmatic Sanity CMS coverage for handover + SEO.

Safety note: `.env*`/keys/tokens were not opened (skipped for safety).

## Step 1: Site Map (App Router)

### Route inventory (from `app/**`)
- Root layout: `app/layout.tsx`
- Home: `app/page.tsx`
- About: `app/about/page.tsx`
- FAQ: `app/faq/page.tsx`
- Contact: `app/contact/page.tsx`
- Reviews: `app/reviews/page.tsx`
- Blog index: `app/blog/page.tsx`
- Blog post (dynamic): `app/blog/[id]/page.tsx`
- Product listing: `app/walk-in-baths/page.tsx`
- Product PDP (dynamic): `app/walk-in-baths/[id]/page.tsx`
- Product listing: `app/walk-in-shower-baths/page.tsx`
- Product PDP (dynamic): `app/walk-in-shower-baths/[id]/page.tsx`
- Product listing: `app/standard-size-baths/page.tsx`
- Product PDP (dynamic): `app/standard-size-baths/[id]/page.tsx`
- Product listing: `app/deep-soaker-baths/page.tsx`
- Product PDP (dynamic): `app/deep-soaker-baths/[id]/page.tsx`
- Free brochure: `app/free-brochure/page.tsx`
- Free quote (redirect): `app/free-quote/page.tsx`
- Privacy policy: `app/privacy-policy/page.tsx`
- Return policy: `app/return-policy/page.tsx`
- API route: `app/api/leads/route.ts`
- Robots: `app/robots.ts`
- Sitemap: `app/sitemap.ts`
- Error surfaces: `app/not-found.tsx`, `app/error.tsx`

### Dynamic/segment analysis
- Dynamic segments present: `[id]` in blog and all four product PDP sections.
- Route groups `(group)` found: none.
- Optional/catch-all segments `[[...slug]]` found: none.

### Grouped site map
- Core pages: `/`, `/about`, `/faq`, `/contact`, `/reviews`, `/privacy-policy`, `/return-policy`
- Blog: `/blog`, `/blog/[id]` (no dedicated `/blog/category/[slug]`; category filtering is client-side in `app/blog/BlogContent.tsx`)
- Products: `/walk-in-baths`, `/walk-in-baths/[id]`, `/walk-in-shower-baths`, `/walk-in-shower-baths/[id]`, `/standard-size-baths`, `/standard-size-baths/[id]`, `/deep-soaker-baths`, `/deep-soaker-baths/[id]`
- Lead-gen flows: `/contact` (intent-based form states), `/free-brochure`, `/free-quote` (redirect)

### Route cross-check sources used
- Navigation links: `components/Header.tsx`, `components/Footer.tsx`, wizard modals in `components/*WizardModal.tsx`
- Sitemap generator: `app/sitemap.ts`
- Route label/constants: `lib/breadcrumbs.ts`

## Step 2: Current Sources of Truth (content + SEO)

### Primary content stores
- Hardcoded page/component JSX + arrays:
  - `app/HomeContent.tsx`, `app/about/page.tsx`, `app/faq/FaqContent.tsx`, `app/contact/ContactContent.tsx`, `app/reviews/ReviewsContent.tsx`
  - `app/privacy-policy/PrivacyPolicyContent.tsx`, `app/return-policy/ReturnPolicyContent.tsx`
- Product data modules:
  - `data/walkInBaths.ts`, `data/walkInShowerBaths.ts`, `data/standardSizeBaths.ts`, `data/deepSoakerBaths.ts`, `data/tags.ts`, `data/catalogTypes.ts`
- Blog data modules:
  - `data/blogPosts.ts`, `app/blog/[id]/articleBodies.tsx`
- Filtering/presets:
  - `components/CatalogListContent.tsx`, `components/FilterSidebar.tsx`, `components/DeepSoakerFilterSidebar.tsx`, `components/StandardSizeFilterSidebar.tsx`, `components/WalkInShowerFilterSidebar.tsx`, `config/filters.ts`
- Lead form logic:
  - `app/contact/ContactContent.tsx` + `app/api/leads/route.ts`
  - `app/free-brochure/BrochureForm.tsx` + `app/free-brochure/actions.ts` (writes `data/leads.json`)

### SEO sources
- Global defaults: `app/layout.tsx`, `lib/site.ts`
- Route metadata declarations: page-level `metadata` + PDP/blog `generateMetadata` in route files
- JSON-LD helpers and usage:
  - Helpers: `lib/schema.ts`
  - Injected in: `app/page.tsx`, `app/contact/page.tsx`, product PDP pages, `app/blog/[id]/page.tsx`
- Crawl control endpoints: `app/sitemap.ts`, `app/robots.ts`

## A) Sanity Coverage Map

| Route/Section | Indexable? (Yes/No) | Current source of truth (exact file paths) | What to move to Sanity (fields/blocks) | SEO fields needed (title/description/canonical/robots/OG/Twitter) | Proposed Sanity schema type (document/singleton/object/reference) | Priority (P0/P1/P2) | Notes (slug changes, redirects, revalidation) |
|---|---|---|---|---|---|---|---|
| Global site settings + shared metadata | Yes | `app/layout.tsx`, `lib/site.ts`, `components/Header.tsx`, `components/Footer.tsx`, `app/robots.ts`, `app/sitemap.ts` | Brand name, primary domain, phone/email/address, nav/footer link labels, trust badges, default social image | Global defaults for all SEO fields + OG/Twitter fallback image | `siteSettings` singleton + `seo` object | P0 | Use one canonical domain source; current domain is hardcoded in `lib/site.ts`. Revalidate all with `siteSettings` tag. |
| `/` Home | Yes | `app/page.tsx`, `app/HomeContent.tsx`, `components/Testimonials.tsx`, `components/TrustStrip.tsx`, `components/TrustBar.tsx`, `components/HandingCard.tsx` | Hero block, trust ticker items, category cards, founder quote block, CTA labels, testimonial references | Route-level SEO object with canonical + OG/Twitter overrides | `homePage` singleton + `review` references + `seo` object | P1 | Keep interaction logic in code (wizard triggers, sticky CTA). Revalidate path `/` when `homePage`/`review` changes. |
| `/about` | Yes | `app/about/page.tsx` | Mission/values/steps/safety cards, CTA copy, image refs | Full SEO object with canonical override | `aboutPage` singleton + `seo` object | P2 | Low logic risk; mostly content blocks. Revalidate `/about`. |
| `/faq` | Yes | `app/faq/page.tsx`, `app/faq/FaqContent.tsx`, `components/FAQSection.tsx` | FAQ groups/items, CTA copy; optionally shared FAQ snippets used on product pages | Route SEO object + optional FAQPage JSON-LD toggle | `faqItem` document + `faqPage` singleton + references | P2 | Deduplicate FAQ content between `/faq` and product-page FAQ section. Revalidate `/faq` + product listing pages. |
| `/contact` | Yes | `app/contact/page.tsx`, `app/contact/ContactContent.tsx`, `app/api/leads/route.ts`, `lib/schema.ts` | Hero copy, intent card labels/descriptions, trust steps, FAQ items, success-state messaging | Route SEO object + LocalBusiness JSON-LD enable/override | `contactPage` singleton + `faqItem` references + `seo` object | P1 | Keep submit/rate-limit logic in code. Revalidate `/contact`. |
| `/reviews` | Yes | `app/reviews/page.tsx`, `app/reviews/ReviewsContent.tsx`, `components/Testimonials.tsx` | Review stories, trustpilot excerpts, filter tags, CTA copy | Route SEO object with canonical + OG/Twitter image | `review` document + `reviewsPage` singleton + `seo` object | P2 | Current ratings/copy differ across files; centralize to avoid drift. Revalidate `/reviews` and home testimonial sections. |
| `/privacy-policy` | Yes | `app/privacy-policy/page.tsx`, `app/privacy-policy/PrivacyPolicyContent.tsx` | Legal title, last-updated date, rich text body, compliance cards | Route SEO object including canonical and robots flags | `legalPage` document + `seo` object | P2 | Best as rich text document; keep print behavior in code. Revalidate `/privacy-policy`. |
| `/return-policy` | Yes | `app/return-policy/page.tsx`, `app/return-policy/ReturnPolicyContent.tsx` | Legal title, last-updated date, rich text body, support CTA | Route SEO object including canonical and robots flags | `legalPage` document + `seo` object | P2 | Revalidate `/return-policy`. |
| `/free-brochure` | Yes | `app/free-brochure/page.tsx`, `app/free-brochure/BrochureForm.tsx`, `app/free-brochure/actions.ts` | Form page headline/body/value bullets/trust strip/success copy; optional product-context intro copy | Route SEO object + OG/Twitter image override | `landingPage` singleton (brochure) + `seo` object | P1 | Keep form validation/action code in app. Revalidate `/free-brochure`. |
| `/free-quote` | No (redirect) | `app/free-quote/page.tsx`, `app/sitemap.ts` | Do not model as content page; treat as redirect rule | N/A (should not be indexed as standalone destination) | `redirect` document | P0 | Remove from sitemap or keep only if intentional canonical redirect strategy. |
| `/blog` index | Yes | `app/blog/page.tsx`, `app/blog/BlogContent.tsx`, `data/blogPosts.ts` | Blog intro blocks, category taxonomy, pagination settings, post listing from references | Route SEO object with canonical + OG/Twitter | `blogSettings` singleton + `blogCategory` document + `post` references + `seo` object | P1 | Category pages currently not routes; decide if future `/blog/category/[slug]` needed for SEO. Revalidate `/blog`. |
| `/blog/[id]` post | Yes | `app/blog/[id]/page.tsx`, `app/blog/[id]/BlogArticleContent.tsx`, `app/blog/[id]/articleBodies.tsx`, `data/blogPosts.ts`, `lib/schema.ts` | Title, slug, excerpt, publish date, read time, hero image, body (portable text), TOC, related posts logic inputs | Full SEO object + article-specific OG/Twitter + canonical | `post` document + `blogCategory` reference + `seo` object | P1 | Current URL uses numeric id; migrate to slug and redirect old `/blog/{id}` paths with 301. Revalidate post path + `/blog` + `/sitemap.xml`. |
| `/walk-in-baths` listing | Yes | `app/walk-in-baths/page.tsx`, `components/CatalogListContent.tsx`, `data/walkInBaths.ts`, `data/tags.ts`, `components/FilterSidebar.tsx`, `config/filters.ts` | Category hero/explainer/trust strip copy, filter facet labels, product card content via product refs | Category SEO object + canonical + OG/Twitter | `productCategory` document + `product` references + `filterFacetConfig` object + `seo` object | P0 | Keep filtering algorithm in code; fetch facets/options from CMS. Revalidate listing tag + path. |
| `/walk-in-baths/[id]` PDP | Yes | `app/walk-in-baths/[id]/page.tsx`, `components/CatalogProductDetail.tsx`, `data/walkInBaths.ts`, `lib/schema.ts` | Product title/subtitle, slug, pricing, badges, gallery, highlights, tech specs, testimonials, FAQs, package matrix refs | Product SEO object with canonical + robots + OG/Twitter image | `product` document + `productSeries` reference + `seo` object | P0 | Add `previousSlugs[]` and automatic redirect generation on slug change. Revalidate product tag + category listing + sitemap. |
| `/walk-in-shower-baths` listing | Yes | `app/walk-in-shower-baths/page.tsx`, `components/CatalogListContent.tsx`, `data/walkInShowerBaths.ts`, `components/WalkInShowerFilterSidebar.tsx` | Category content blocks, facet labels/options, product cards via refs | Category SEO object | `productCategory` document + `product` references + `filterFacetConfig` object + `seo` object | P0 | Revalidate listing + related PDPs when facets/category copy change. |
| `/walk-in-shower-baths/[id]` PDP | Yes | `app/walk-in-shower-baths/[id]/page.tsx`, `components/CatalogProductDetail.tsx`, `data/walkInShowerBaths.ts`, `lib/schema.ts` | Same product fields + shower-specific options (shape, seat, glass thickness, door action, dual waste) | Product SEO object | `product` document + `productSeries` reference + `seo` object | P0 | Keep rendering logic in code; make option/facet values content-driven. |
| `/standard-size-baths` listing | Yes | `app/standard-size-baths/page.tsx`, `components/CatalogListContent.tsx`, `data/standardSizeBaths.ts`, `components/StandardSizeFilterSidebar.tsx` | Category blocks, filter options (length, door material, door position, bath type, waste type), product cards | Category SEO object | `productCategory` document + `product` references + `filterFacetConfig` object + `seo` object | P0 | Revalidate listing + sitemap on product/category updates. |
| `/standard-size-baths/[id]` PDP | Yes | `app/standard-size-baths/[id]/page.tsx`, `components/CatalogProductDetail.tsx`, `data/standardSizeBaths.ts`, `lib/schema.ts` | Product content + options (door material, door position tap/seat end, single/double ended) | Product SEO object | `product` document + `productSeries` reference + `seo` object | P0 | Add slug-history redirects for changed slugs. |
| `/deep-soaker-baths` listing | Yes | `app/deep-soaker-baths/page.tsx`, `components/CatalogListContent.tsx`, `data/deepSoakerBaths.ts`, `components/DeepSoakerFilterSidebar.tsx` | Category blocks, deep-soaker filter options (door type/material, entry point, seat height, spa options), product cards | Category SEO object | `productCategory` document + `product` references + `filterFacetConfig` object + `seo` object | P0 | Revalidate listing + dependent PDPs on category/facet changes. |
| `/deep-soaker-baths/[id]` PDP | Yes | `app/deep-soaker-baths/[id]/page.tsx`, `components/CatalogProductDetail.tsx`, `data/deepSoakerBaths.ts`, `lib/schema.ts` | Product content + compact specs + option metadata (entry/door/seat/spa) | Product SEO object | `product` document + `productSeries` reference + `seo` object | P0 | Slug redirects + sitemap refresh required on publish changes. |
| `/sitemap.xml` + `/robots.txt` | No (crawler endpoints) | `app/sitemap.ts`, `app/robots.ts`, `lib/site.ts`, product/blog data imports in `app/sitemap.ts` | Optional settings: index inclusion toggles, route priorities, disallow overrides | Canonical site domain + route inclusion strategy | `seoSettings` singleton + `redirect` references | P0 | Generate from Sanity slugs; exclude redirected paths; revalidate `/sitemap.xml` and `/robots.txt` on relevant updates. |
| `/api/leads` + brochure lead action | No | `app/api/leads/route.ts`, `app/free-brochure/actions.ts` | Keep operational logic in code; only UI copy should move | N/A | No CMS model (code-owned) | P0 (keep in code) | Do not move validation, anti-bot, or persistence logic to CMS. |
| Wizard recommendation flows (modal, non-route) | No | `components/BathWizardModal.tsx`, `components/WalkInBathsWizardModal.tsx`, `components/WalkInShowerWizardModal.tsx`, `components/StandardSizeWizardModal.tsx`, `components/DeepSoakerWizardModal.tsx`, `lib/wizardStore.ts` | Optional: question text + result copy; keep decision trees and navigation logic in code | Optional embedded SEO not needed | `wizardCopy` singleton (optional) + object fields | P2 | Current logic/product mapping is tightly coupled to UI flow; move copy only unless business requires non-dev logic editing. |

## B) Recommended Sanity Models (schemas)

### P0 models (handover + SEO baseline)
- `siteSettings` (singleton)
  - `siteName`, `siteDomain`, `phone`, `email`, `address`, `socialLinks[]`, `defaultSeo` (`seo` object), `defaultOgImage`, header/footer link groups.
- `seo` (object; reusable)
- `redirect` (document)
  - `fromPath`, `toPath` (internal reference or URL), `statusCode` (301/302/307/308), `isActive`, `note`, `expiresAt`.
- `productCategory` (document)
  - `slug` (`walk-in-baths`, etc), hero/explainer blocks, trust strip items, filter facet configuration, SEO.
- `productSeries` (document)
  - Mirrors base-model families and package matrix currently in `data/walkInBaths.ts` / `data/*Baths.ts`.
  - Fields: `title`, `range`, `packageFeatureMatrix.rows[]`, per-package boolean columns.
- `product` (document)
  - Core: `title`, `slug`, `previousSlugs[]`, `category` reference, `series` reference.
  - Pricing: `priceExVat`, `vatRate`, `wasPriceIncVat`, `isInStock`, `stockNote`.
  - Merch: `subtitle`, `heroTagline`, `badges[]`, `featurePills[]`, `primaryImage`, `gallery[]`.
  - Specs: `techSpecs` object (`lengthMm`, `widthMm`, `heightMm`, `doorOpeningMm`, `stepHeightMm`, `volumeL`, etc).
  - Content blocks: `highlights[]`, `testimonials[]`, `faqs[]` (or references), CTA text.
  - **Variants/handing/options coverage (explicit)**:
    - `doorHandingAvailable[]` (`L`, `R`, `InSwing`)
    - `defaultDoorHanding`
    - `packageLevel` (`classic`, `plus`, `special`, `unique`)
    - `doorStyleLabel`, `doorPosition` (tap/seat end), `isDoubleEnded`, `hasFoldDownSeat`
    - category-specific option facets (shape, door action, seat, material, waste, spa options) either in `filterFacets` object or normalized references.
  - SEO: `seo` object.

### P1 models
- `blogSettings` (singleton)
  - Blog hero copy, CTA blocks, pagination defaults.
- `blogCategory` (document)
  - `title`, `slug`, optional description, order.
- `post` (document)
  - `title`, `slug`, `previousSlugs[]`, `excerpt`, `publishedAt`, `readTime`, `mainImage`, portable text body, `tableOfContents` (optional manual override), `category` reference, `seo`.

### P2 models
- `faqItem` (document)
  - `question`, `answer` (portable text), `group`, `tags[]`, optional `relatedCategories[]`.
- `faqPage` (singleton)
  - Page intro/hero blocks and grouped FAQ references.
- `legalPage` (document)
  - `title`, `slug` (`privacy-policy`, `return-policy`), `lastUpdated`, legal body, `seo`.
- `landingPage` (document/singleton by need)
  - `slug` (`free-brochure`), content blocks for lead-gen pages.
- `review` (document)
  - `name`, `location`, `date`, `rating`, `title`, `body`, `tags[]`, `product` reference.

## C) SEO Object Recommendation

### Minimal reusable `seo` object fields
- `metaTitle` (string)
- `metaDescription` (text)
- `canonicalUrl` (string; optional full override)
- `robotsNoIndex` (boolean)
- `robotsNoFollow` (boolean)
- `ogTitle` (string; optional override)
- `ogDescription` (text; optional override)
- `ogImage` (image)
- `twitterTitle` (string; optional override)
- `twitterDescription` (text; optional override)
- `twitterImage` (image)

### Where SEO currently comes from
- Global defaults: `app/layout.tsx`
- Per-route metadata: each `app/**/page.tsx` export of `metadata`
- Dynamic metadata logic: `generateMetadata` in product/blog PDP route files
- JSON-LD data: `lib/schema.ts` consumed in `app/page.tsx`, `app/contact/page.tsx`, product PDPs, blog PDP
- Crawl files: `app/sitemap.ts`, `app/robots.ts`

### Recommended override order
1. Document-level `seo` from Sanity.
2. Section/category defaults (e.g., `productCategory`, `blogSettings`).
3. `siteSettings.defaultSeo` fallback.
4. Code fallback string (last resort).

### Canonical + robots behavior
- Canonical default: `${siteSettings.siteDomain}${pathname}` when `canonicalUrl` absent.
- If `robotsNoIndex` or `robotsNoFollow` is true, map to Next metadata robots output.
- OG/Twitter image fallback chain: page override -> section override -> site default image.

## D) Redirect + Slug-Change Plan

### Redirect schema
- Use `redirect` document with fields listed above.
- Add validation: `fromPath` starts with `/`, prevent loops, prevent self-redirect.

### Slug-change handling
- Add `previousSlugs[]` on `product` and `post` docs.
- On publish when slug changes:
  - append old slug to `previousSlugs[]`
  - create/update `redirect` doc from old path to new canonical path (301).

### Enforcement point in app
- Add `middleware.ts` to resolve path-based redirects before route handlers/pages execute.
- Add route-level safety fallback in dynamic pages:
  - if current slug not found but found in `previousSlugs[]`, issue `permanentRedirect()` to canonical.
- Ensure `app/sitemap.ts` emits only canonical URLs (no legacy slugs).

## E) Revalidation Plan

### Recommended strategy
- Sanity webhook -> `/api/revalidate` in Next.js.
- Verify webhook signature.
- Revalidate by tag first (`revalidateTag`), then by path (`revalidatePath`) for dependent indexes/sitemaps.

### Suggested tag map and dependencies
| Sanity doc type | Tags to revalidate | Paths to revalidate |
|---|---|---|
| `siteSettings` | `site:settings`, `seo:global` | `/`, `/about`, `/contact`, `/faq`, `/reviews`, `/blog`, `/walk-in-baths`, `/walk-in-shower-baths`, `/standard-size-baths`, `/deep-soaker-baths`, `/privacy-policy`, `/return-policy`, `/sitemap.xml`, `/robots.txt` |
| `productCategory` | `product-category:{slug}` | corresponding listing path + `/sitemap.xml` |
| `productSeries` | `product-series:{id}` | affected PDP paths + category listing paths |
| `product` | `product:{slug}`, `product:list:{categorySlug}` | PDP path + category listing path + `/sitemap.xml` |
| `blogSettings` | `blog:settings` | `/blog` |
| `blogCategory` | `blog-category:{slug}` | `/blog` (+ future category pages if added) |
| `post` | `post:{slug}`, `post:list` | `/blog`, post path, `/sitemap.xml` |
| `faqItem` / `faqPage` | `faq:list`, `faq:page` | `/faq` and product listing pages using `components/FAQSection.tsx` |
| `legalPage` | `legal:{slug}` | `/privacy-policy` or `/return-policy` |
| `review` | `review:list` | `/reviews`, `/` (if testimonial blocks pull reviews) |
| `redirect` | `redirects` | none required for content cache; middleware cache refresh if used |

## F) Migration Checklist (least-risk order)

### P0: Products + site settings + redirects + SEO
1. Create schemas: `siteSettings`, `seo`, `redirect`, `productCategory`, `productSeries`, `product`.
2. Import existing product datasets:
   - `data/walkInBaths.ts` -> `productCategory` (`walk-in-baths`) + `productSeries` + `product`
   - `data/walkInShowerBaths.ts` -> `productCategory` (`walk-in-shower-baths`) + `product`
   - `data/standardSizeBaths.ts` -> `productCategory` (`standard-size-baths`) + `product`
   - `data/deepSoakerBaths.ts` -> `productCategory` (`deep-soaker-baths`) + `product`
   - `data/tags.ts`, category filter tags in each data file -> `filterFacetConfig` / product facet fields
3. Replace route data imports with Sanity queries in:
   - listing routes `app/*-baths/page.tsx`
   - PDP routes `app/*-baths/[id]/page.tsx`
   - shared renderers `components/CatalogListContent.tsx`, `components/CatalogProductDetail.tsx`
4. Move metadata generation to pull `seo` object for all indexable routes.
5. Implement `redirect` schema + `middleware.ts` resolution.
6. Update `app/sitemap.ts` and `app/robots.ts` to use CMS-backed canonical data.
7. Add webhook/tag revalidation endpoint and configure Sanity webhook.

### P1: Blog migration
1. Create `blogSettings`, `blogCategory`, `post` schemas.
2. Migrate `data/blogPosts.ts` + `app/blog/[id]/articleBodies.tsx` into `post` docs (portable text body).
3. Switch routing model to slug-based posts (recommended):
   - keep current route compatibility via redirects from `/blog/{id}`.
4. Update:
   - `app/blog/page.tsx`, `app/blog/BlogContent.tsx`
   - `app/blog/[id]/page.tsx` (or rename to slug route in implementation phase)
   - `app/sitemap.ts`

### P2: FAQ/legal/landing pages
1. Create `faqItem`, `faqPage`, `legalPage`, `landingPage`, `review` schemas.
2. Migrate:
   - `app/faq/FaqContent.tsx` + `components/FAQSection.tsx` -> `faqItem`/`faqPage`
   - `app/privacy-policy/PrivacyPolicyContent.tsx` and `app/return-policy/ReturnPolicyContent.tsx` -> `legalPage`
   - `app/free-brochure/BrochureForm.tsx` copy blocks -> `landingPage`
   - `app/reviews/ReviewsContent.tsx` + `components/Testimonials.tsx` -> `review`
3. Keep form behavior and backend operations in code:
   - `app/api/leads/route.ts`, `app/free-brochure/actions.ts`

## Possible orphan/unused items (called out)

- `app/free-quote/FreeQuoteForm.tsx` is not used by routing; `/free-quote` currently redirects in `app/free-quote/page.tsx`.
- `app/walk-in-baths/[id]/ProductDetail.tsx` appears unused; PDP routes render `components/CatalogProductDetail.tsx`.
- Root HTML files appear unreferenced by app code: `FAQ.html`, `PrivacyPolicy.html`, `returnPolicyPage.html`, `blogPage.html`, `BlogArticlePage.html`, `getfreequote.html`, `about.html`, `contactPage.html`, `ReviewsPage.html`, `WizardComponent.html`.
- `docs/product-specs/**` markdown files are present but not imported by route/component code.
- Placeholder links in nav/footer indicate missing route targets:
  - `components/Header.tsx` has `href="#"` for “VAT Relief Guide” and “Right vs Left Hand?”
  - `components/Footer.tsx` has `href="#"` for “Terms of Service”.

## Keep in code (recommended)

- Filtering logic and UI state (`components/CatalogListContent.tsx`, filter sidebar components).
- Wizard decision trees and modal behavior (`components/*WizardModal.tsx`, `lib/wizardStore.ts`).
- Form submission, anti-bot/rate limiting, and lead persistence (`app/api/leads/route.ts`, `app/free-brochure/actions.ts`).
- JSON-LD function implementation shape (`lib/schema.ts`) while sourcing content values from Sanity.

