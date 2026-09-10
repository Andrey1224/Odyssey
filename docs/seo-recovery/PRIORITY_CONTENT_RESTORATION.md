# Priority Content Restoration Report

This document tracks the restoration of high-priority legacy WordPress content that was lost during the initial Next.js migration, as instructed.

## Restored Pages

### 1. Dual-Function Walk-in Baths Article
- **Target URL:** `/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk/`
- **Source:** Wayback Machine
- **Snapshot Date:** `2025-03-08` (Snapshot ID: `20250308065003`)
- **Real Publication Date:** `2025-03-08T06:40:11+00:00`
- **Real Modified Date:** `2025-03-08T06:48:01+00:00`
- **Restored Elements:**
  - Original title (`<title>`) and Meta Description
  - H1: "Walk-In Baths with Showers: The Best Dual-Function Options in the UK"
  - Complete article text maintaining the exact search intent
  - Original H2 headings
  - Internal links repointed correctly
  - Correct JSON-LD as `BlogPosting` with authentic dates and local publisher logo.
- **Missing Elements:**
  - The original WordPress images attached to the article were omitted to avoid broken links from external archives, as they were not present in the local repository.
- **Verification Status:** Restored locally, `200 OK`, no `noindex`, self-canonical is accurate, present in sitemap.

### 2. Installing a Walk-in Bath Article
- **Target URL:** `/installing-a-walk-in-bath/`
- **Source:** Wayback Machine
- **Snapshot Date:** `2024-04-15` (Snapshot ID: `20240415115910`)
- **Real Publication Date:** `2023-03-02T17:50:46+00:00`
- **Real Modified Date:** `2024-01-30T06:00:42+00:00`
- **Original Author:** Paul
- **Restored Elements:**
  - Original title (`<title>`) and Meta Description
  - H1: "Installing a Walk In Bath"
  - Complete step-by-step article text maintaining exact intent
  - Original step H3 headings
  - Internal link mapping to new structure
  - Correct JSON-LD as `BlogPosting` with authentic publication/modified dates, original author, and local publisher logo.
- **Missing Elements:**
  - The original WordPress SVG/webp image showing installation was omitted for the same reasons.
- **Verification Status:** Restored locally, `200 OK`, no `noindex`, self-canonical is accurate, present in sitemap.

## Technical Implementation Details
- Content is statically rendered using a new `LegacyArticleLayout` component designed to preserve proper accessibility, styling, and structured elements (like Breadcrumbs).
- Valid `BlogPosting` JSON-LD has been added statically for both pages, omitting fake claims and strictly using confirmed historical metadata.
- Added to `app/sitemap.ts` manually with a `yearly` change frequency. No dummy `lastmod` was added.
