# GEMINI.md

This file provides context and instructions for AI agents working on the Odyssey Baths repository.

## Project Overview

**Odyssey Baths** is a Next.js 16 (App Router) website for a UK-based ethical bathing products company specializing in senior-focused (65+) accessible bathing solutions.

- **Primary Audience:** UK seniors (65+).
- **Key Focus:** Accessibility, transparency, and ethical sales (no "hard sell").
- **Core Features:** Product listing (PLP) for walk-in baths, interactive filtering, VAT relief pricing toggle, and lead generation (brochure requests).

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19 (React Compiler enabled)
- **Styling:** Tailwind CSS v4 (PostCSS)
- **State Management:** Zustand (for VAT toggle)
- **Validation:** Zod
- **Icons:** Lucide React
- **Language:** TypeScript

## Building and Running

### Development
```bash
npm run dev
```
Starts the development server at `http://localhost:3000`.

### Production
```bash
npm run build
npm run start
```
Builds the application for production and starts the server.

### Linting
```bash
npm run lint
```
Runs ESLint to check for code quality and style issues.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `/walk-in-baths`: Product listing page (PLP).
  - `/walk-in-baths/[id]`: Product detail page (PDP).
  - `/contact`: Contact/Leads form.
  - `/free-brochure`: Physical brochure request form.
- `components/`: Modular UI components (Header, Footer, ProductCards, Filters).
- `data/`: Centralized mock data (`walkInBaths.ts`) and local JSON storage.
- `config/`: Configuration for filters and business logic mappings.
- `lib/`: Shared utility functions (e.g., filtering logic).
- `public/`: Static assets (images, icons).

## Development Conventions

### Accessibility (Mandatory)
Target: **WCAG 2.2 AA**.
- **Font Size:** Minimum 20px for body text (`html { font-size: 20px; }`).
- **Contrast:** Minimum 4.5:1 contrast ratio for all text.
- **Touch Targets:** Minimum 48x48px for all interactive elements.
- **Keyboard Nav:** Ensure all interactive elements have visible focus states (`focus-visible:ring-4`).
- **Semantics:** Use semantic HTML (`article`, `section`, `h1-h6`) correctly.

### Styling
Tailwind v4 is used with design tokens defined in `app/globals.css`.
- **Brand Colors:**
  - Teal 700 (`#0F766E`) - Primary actions.
  - Cream 50 (`#FAFAF9`) - Background.
  - Orange 700 (`#C2410C`) - VAT relief/attention.
- **Fonts:**
  - Serif: Merriweather (Headings)
  - Sans: Inter (Body)

### State & Logic
- **VAT Toggle:** Managed via Zustand and persisted/shared via URL search params (`?vat=standard`).
- **Filtering:** Synchronized with URL query parameters for shareable URLs.
- **Data-Driven:** Pages should be driven by configurations in `data/` and `config/` to allow easy category replication.

### Imports
Use the `@/*` alias for imports from the root (e.g., `@/components/...`).

## Key Context
- **No Backend/CMS:** The project currently uses static mock data.
- **VAT Relief:** Most customers are eligible for 0% VAT. Pricing components must handle both "Ex VAT" and "Inc VAT" displays based on the global toggle.
- **UK Context:** All terminology (e.g., "Handing", "Stone" weight, "£" currency) follows UK standards.
