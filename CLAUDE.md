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

**Next.js 16 App Router** site for Odyssey Baths — a UK senior-focused (65+) ethical bathing products company. Currently static/mock data with no backend or CMS integration.

### Pages (`app/`)
- `/` — Home: hero, trust ticker, product categories, testimonials, handing selector, ethical promise
- `/walk-in-baths` — Product catalog with filter sidebar
- `/contact` — Contact form

### Components (`components/`)
Reusable UI building blocks: `Header`, `Footer`, `Testimonials`, `FilterSidebar`, `CollectionProductCard`, `HandingCard`, `HandingTool`, `TrustBar`, `TrustStrip`, `FAQSection`, `BrochureBridge`.

### State Management
Zustand (`zustand`) is used — currently for VAT relief toggle state.

### Path Aliases
`@/*` maps to the repository root. Use `@/components/...` and `@/app/...` for imports.

## Styling Conventions

Tailwind CSS v4 via PostCSS. Custom design tokens defined in `app/globals.css`:

- **Brand color:** `--color-teal-700: #0F766E` (hover: `--color-teal-800`)
- **Background:** `--color-cream-50: #FAFAF9`
- **Primary text:** `--color-slate-900` (high contrast)
- **Secondary text:** `--color-slate-600` (4.5:1 contrast minimum)
- **Accent:** `--color-orange-700` (VAT/attention)
- **Fonts:** `--font-serif` (Merriweather, headings) / `--font-sans` (Inter, body)
- **Base font:** 20px, line-height 1.6 (senior accessibility)

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
| `app/globals.css` | Tailwind config and CSS custom properties |
| `app/layout.tsx` | Root layout — fonts, metadata |
| `next.config.ts` | `reactCompiler: true` (React 19 compiler enabled) |
| `spec1.md` | Detailed frontend specification (Russian) |
| `implementation_plan.md` | Design V2 implementation plan |
