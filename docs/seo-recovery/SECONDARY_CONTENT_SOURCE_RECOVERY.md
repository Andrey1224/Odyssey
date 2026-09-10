# Secondary Content Source Recovery Report

## Overview
This document records the search and recovery attempts for legacy content that was identified as missing post-migration, specifically focusing on two articles that were former sources of impressions and clicks according to the GSC audit.

## URL 1: `/best-shower-walk-in-tubs-for-small-bathrooms-space-saving-solutions/`

* **Sources Searched:**
  * **Local Archive Backup:** `sanity-backup.tar.gz` (Extracted and inspected `data.ndjson` for titles, slugs, and text excerpts).
  * **Wayback Machine (CDX API):** Checked HTTP and HTTPS protocols, `www` and apex domains, with and without trailing slashes. Queried exact URLs, prefix variations (`/best-shower-walk-in-tubs*`), and searched the entire `odysseybaths.co.uk` domain index.
  * **Local Repository & Old Backups:** Grep search across the current repository `oddyseyweb-git-recovered` (including `docs/content-raw/` and TS data files) and the old local backup folder `oddyseyweb`.
  * **Git History:** Searched the Git commit history across branches (`main`, `fix/seo-migration-recovery`, `seo-recovery-audit-2026-09-08`).
* **Findings:** No content found. Only the slug is mentioned in migration audit files.
* **Completeness Level:** 0% (No title, meta description, H1, body text, or images found).
* **Restoration Status:** Cannot be safely restored without generating artificial content.
* **Implemented Action:** No page creation; no sitemap addition. Status remains `restore` in `REDIRECT_MAP_DRAFT.csv`.

## URL 2: `/how-microbubbles-can-transform-your-skin-and-bathing-experience/`

* **Sources Searched:**
  * **Local Archive Backup:** `sanity-backup.tar.gz` (Extracted and inspected `data.ndjson`).
  * **Wayback Machine (CDX API):** Checked HTTP and HTTPS protocols, `www` and apex domains, with and without trailing slashes. Queried exact URLs, prefix variations (`/how-microbubbles*`), and searched the entire `odysseybaths.co.uk` domain index.
  * **Local Repository & Old Backups:** Grep search across the current repository and old backups for keywords like "microbubbles" and "transform your skin".
  * **Git History:** Searched the Git commit history across all available branches.
* **Findings:** No full article found. A short excerpt mentioning microbubbles exists in `data/blogPosts.ts` for a different article ("5 Ways Warm Water Therapy Helps Arthritis Pain"), but the full target article is entirely missing.
* **Completeness Level:** 0% (No title, meta description, H1, body text, or images found).
* **Restoration Status:** Cannot be safely restored without generating artificial content.
* **Implemented Action:** No page creation; no sitemap addition. Status remains `restore` in `REDIRECT_MAP_DRAFT.csv`.

## Recommendations for Further Recovery
Since the text is completely missing from the existing Sanity exports and the Wayback Machine, restoring these pages with their original intent requires access to older data sources. The following sources might contain the missing text:
* **WordPress SQL Database Dump:** Often left behind by legacy hosting setups.
* **WordPress XML Export (WXR):** A standard WordPress export file containing posts and pages.
* **Legacy Web Hosting Backups:** Full site `.zip` or `.tar.gz` backups from the previous host.
* **Legacy Webmaster/CDN Backups:** Any older server snapshots or CDN cached HTML files.
* **Google Search Console / Analytics Exports:** Historical CSV/Excel exports might contain full titles or descriptions that were cached.
