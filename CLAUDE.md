# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

**Next.js 16.1.6 App Router** site for Odyssey Baths — a UK senior-focused (65+) ethical bathing products company. Currently static/mock data with no backend or CMS integration. React 19 compiler is enabled (`next.config.ts`), so manual `memo()` calls are unnecessary.

### Pages (`app/`)

| Route | Description |
|-------|-------------|
| `/` | Home: hero, trust ticker, product categories, testimonials, handing selector |
| `/walk-in-baths` | Catalog with filter sidebar |
| `/walk-in-shower-baths` | Catalog with filter sidebar |
| `/deep-soaker-baths` | Catalog with filter sidebar |
| `/standard-size-baths` | Catalog with filter sidebar |
| `/walk-in-baths/[id]` | Product detail |
| `/walk-in-shower-baths/[id]` | Product detail |
| `/deep-soaker-baths/[id]` | Product detail |
| `/standard-size-baths/[id]` | Product detail |
| `/about` | About page |
| `/faq` | FAQ page |
| `/reviews` | Customer reviews |
| `/contact` | Contact form (posts to `/api/leads`) |
| `/free-quote` | Quote request form |
| `/free-brochure` | Brochure request form (server action, writes to `data/leads.json`) |
| `/blog` | Blog listing with category filter |
| `/privacy-policy` | Static privacy policy page |
| `/return-policy` | Static returns & refunds policy page |

### Data Layer (`data/`)

All product data is static/mock — no backend or CMS.

- `data/catalogTypes.ts` — canonical shared TypeScript types (`CatalogProductVariant`, `CatalogBaseModel`, `CatalogCategory`, etc.). Always import types from here.
- `data/walkInBaths.ts`, `data/deepSoakerBaths.ts`, `data/walkInShowerBaths.ts`, `data/standardSizeBaths.ts` — product arrays, base models, category config, and per-product filter tag records
- `data/tags.ts` — filter tag metadata; `ProductTags` interface maps each product to its filterable attributes (`Feature` union, `DoorHanding`, width buckets, etc.)
- `data/blogPosts.ts` — mock blog data (`BLOG_CATEGORIES`, `BlogPost` type, `BLOG_POSTS` array)
- `data/leads.json` — brochure leads written by the server action; not committed with real data

### Catalog Page Pattern

Every category catalog page follows this structure:

```
page.tsx (server — exports metadata)
  └─ <Suspense fallback={null}>          ← required: CatalogListContent uses useSearchParams()
       └─ <CatalogListContent            ← "use client" generic component
            category={...}
            products={...}
            filterPreset="deepSoaker"    ← selects which FilterSidebar variant to render
            queryParamKeys={{...}}       ← maps FilterState keys to URL param names
          />
```

`CatalogListContent` handles: filter state synced to URL search params (enabling shareable filtered URLs), mobile drawer, product grid, VAT toggle, empty state. Each category has its own `FilterSidebar` variant (`FilterSidebar`, `DeepSoakerFilterSidebar`, `StandardSizeFilterSidebar`, `WalkInShowerFilterSidebar`). Filter option metadata (labels, values) lives in `config/filters.ts`.

### Product Detail Page Pattern

```
[id]/page.tsx (server — generateStaticParams + notFound())
  └─ <CatalogProductDetail              ← "use client" component, includes Header/Footer
       product={product}
       products={allProducts}
       baseModels={BASE_MODELS}
       categoryHref="/walk-in-baths"
     />
```

### Server / Client Split

Pages that export `metadata` must be server components. When client features are needed (state, search params), split into:
- `page.tsx` — server component, metadata export, renders `<Header>` + `<Breadcrumbs>` + `<Footer>`
- `*Content.tsx` — `"use client"`, contains all stateful logic

`CatalogProductDetail` is an exception — it manages its own `<Header>`/`<Footer>` internally.

### Forms & API

- **`app/api/leads/route.ts`** — POST endpoint for contact/quote forms. In-memory rate limiting (5 req / 15 min per IP), honeypot check (`body.website`). Required fields: `intent`, `name`, `phone`, `postcode`. Currently logs to console; marked for future backend integration.
- **`app/free-brochure/actions.ts`** — Server action `submitBrochureLead()`. Zod validation (name, UK postcode regex, email, phone, address, `bestTimeToCall`, `productSlug`), honeypot check (`_hp`). Writes to `data/leads.json`.

### State Management

- **`lib/wizardStore.ts`** — Zustand store (`useWizardStore`) tracks which quiz/wizard modal is open (`WizardType`: `"global" | "walk-in-baths" | "walk-in-shower-baths" | "standard-size-baths" | "deep-soaker-baths"`). Wizard modal components: `BathWizardModal`, `WalkInBathsWizardModal`, `WalkInShowerWizardModal`, `StandardSizeWizardModal`, `DeepSoakerWizardModal`.
- **VAT** — toggled in `FilterState.vatExempt` local to `CatalogListContent`; displayed with `orange-700` callouts.

### Library Utilities (`lib/`)

| File | Purpose |
|------|---------|
| `lib/site.ts` | Canonical site constants: `SITE_DOMAIN`, `SITE_NAME`, `PHONE`, `PHONE_TEL`, `ADDRESS`, `EMAIL`. Use these everywhere — never hardcode contact details. |
| `lib/schema.ts` | JSON-LD helpers: `localBusinessJsonLd()`, `productJsonLd(product, url)` |
| `lib/catalog.ts` | Generic catalog math: `priceIncVat`, `formatGBP`, `getBySlug`, `getSiblings` |
| `lib/walkInBaths.ts` | Legacy walk-in-bath utilities (`vatReliefSave`, `displayPrice`, `filterVariants`). Partially duplicates `catalog.ts`; prefer `catalog.ts` for new code. |
| `lib/breadcrumbs.ts` | `getBreadcrumbs(pathname, options?)` — builds breadcrumb arrays. Add new routes to `SEGMENT_LABELS` to get correct labels. |
| `lib/wizardStore.ts` | Zustand wizard modal state |
| `lib/catalogValidation.ts` | Dev-only data integrity checks (warns on duplicate IDs/slugs, broken refs) |

### Path Aliases

`@/*` maps to the repository root. Always use `@/components/...`, `@/data/...`, `@/lib/...` for imports.

## Styling Conventions

Tailwind CSS v4 via PostCSS. Custom design tokens in `app/globals.css` (`@theme` block):

- **Brand color:** `teal-800` (`#115E59`) for primary buttons/actions; `teal-700` (`#0F766E`) for links/icons
- **Background:** `cream-50` (`#FAFAF9`) — page backgrounds, not `slate-50`
- **Primary text:** `slate-900` | **Secondary:** `slate-600`
- **VAT/attention:** `orange-700`
- **Fonts:** `font-serif` → Merriweather (all headings h1/h2/h3); `font-sans` → Inter (body)
- **Base font:** 20px, line-height 1.6 (set globally in CSS)

`clsx` and `tailwind-merge` are installed but no `cn()` utility exists — import them directly if needed. The `prose` Tailwind Typography plugin is **not** installed; set text styles explicitly.

## Accessibility Requirements

Target: WCAG 2.2 AA. Audience is UK seniors (65+):
- Minimum 20px font size for body text
- Minimum 4.5:1 contrast ratio for all text
- Touch targets 48px minimum
- Semantic HTML and keyboard navigation
- No dark patterns or high-pressure sales tactics

## Key Files

| File | Purpose |
|------|---------|
| `app/globals.css` | Tailwind v4 `@theme` tokens + base accessibility styles |
| `app/layout.tsx` | Root layout — Google Fonts (Inter + Merriweather), metadata |
| `next.config.ts` | `reactCompiler: true` (React 19 compiler enabled) |
| `data/catalogTypes.ts` | Canonical shared TypeScript types for all catalog components |
| `config/filters.ts` | Filter option metadata arrays for all sidebar variants |
| `spec1.md` | Detailed frontend specification (Russian) |
| `implementation_plan.md` | Design V2 implementation plan |
