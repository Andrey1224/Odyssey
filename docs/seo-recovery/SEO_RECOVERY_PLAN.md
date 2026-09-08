# Odyssey Baths SEO recovery plan

Status: proposed; no remediation has been applied.  
Goal: restore the public domain as the only canonical origin, recover legacy URL equity and content, then measure reindexing and commercial-query recovery.

## Recovery principles

1. Fix canonical ownership and legacy URL continuity as one coordinated release.
2. Prefer one-to-one permanent redirects to the most relevant equivalent page.
3. Restore valuable missing content; do not redirect unrelated articles to the homepage.
4. Keep every signal consistent: redirect destination, canonical, internal link, sitemap URL, structured data, Open Graph URL, and hostname.
5. Validate before deployment, then make one controlled production release.

## Phase 0 — Preserve evidence and establish the baseline

Owner: SEO/development  
Timing: before code changes

- Keep the Search Console exports used in the audit.
- Export the full 236 excluded-URL table, including all 100 “Crawled — currently not indexed” rows and the 52 alternate-canonical rows.
- Build a complete legacy URL inventory from:
  - Search Console page exports;
  - the 69 known 404s;
  - the old WordPress XML sitemap, database/export, or backup;
  - analytics landing pages if access becomes available;
  - backlink tools and Wayback captures. A 8 September check confirmed 60 unique archived HTML URLs from 2024–2025, including several of the highest-value missing pages.
- Record current baselines: indexed URLs 27, excluded URLs 236, latest daily impressions, clicks, commercial-query impressions, and homepage/category inspection status.

Exit criterion: every known old URL has an explicit decision: direct replacement, restore, intentional retirement, or investigation.

## Phase 1 — P0 canonical and hostname repair

Owner: development/Vercel  
Priority: **P0**

Implement together:

1. Change the single source of truth for the public origin from the Vercel hostname to `https://odysseybaths.co.uk`.
2. Prefer an environment-controlled production site URL with a safe public-domain default, so preview deployments cannot leak their host into production canonicals.
3. Regenerate and verify:
   - canonical links;
   - `metadataBase`;
   - Open Graph URLs;
   - LocalBusiness, Product, Offer, and BlogPosting URLs;
   - robots.txt sitemap reference;
   - every sitemap `<loc>`.
4. Configure the Vercel technical hostname to permanently redirect to the apex domain if the deployment platform allows it without affecting previews. At minimum, it must never be canonical for production content.
5. Fix the `www` domain certificate and make `https://www.odysseybaths.co.uk/*` permanently redirect in one hop to `https://odysseybaths.co.uk/*`.

Files expected to change later:

- `lib/site.ts`
- `app/layout.tsx` or environment configuration
- `app/robots.ts`
- `app/sitemap.ts`
- `lib/schema.ts`
- Vercel domain/redirect configuration

Pre-deploy tests:

- Every indexable public URL returns 200 and self-canonicalizes to the apex HTTPS URL.
- No production HTML, JSON-LD, robots.txt, or sitemap contains `odyssey-navy-theta.vercel.app`.
- `www` presents a valid certificate and redirects in one hop while preserving path and query.
- The Vercel hostname does not serve a competing indexable copy.

## Phase 2 — P0 legacy redirect map

Owner: development + content/SEO review  
Priority: **P0**

1. Review every row in `REDIRECT_MAP_DRAFT.csv`.
2. Implement `ready` rows as permanent server-side redirects (301 or 308).
3. Strip irrelevant cache-busting query parameters by redirecting to the clean final URL.
4. Expand the map from the complete legacy URL inventory; 69 known 404s are only the minimum set.
5. Avoid redirect chains. Every old URL must go directly to its final 200, self-canonical destination.
6. Do not send unrelated expired content to `/`; use a relevant replacement, restore it, or allow a genuine 404/410 when it had no value or substitute.
7. Keep migration redirects for at least one year and preferably indefinitely for linked/high-value URLs.

Suggested implementation: a reviewed redirect array in `next.config.ts`, plus a generated test table to ensure every source has one destination and no destination is a 404.

Exit criterion: all approved legacy category and product URLs redirect in one hop to relevant 200 pages; no approved legacy path remains a 404.

## Phase 3 — P0/P1 content restoration

Owner: client/content + SEO + development  
Priority: **P0 for former high-impression pages; P1 for the remainder**

Restore first:

1. `/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk/` — 2,001 pre-collapse impressions.
2. `/installing-a-walk-in-bath/` — 981 impressions.
3. `/best-shower-walk-in-tubs-for-small-bathrooms-space-saving-solutions/` — 265 impressions.
4. `/how-microbubbles-can-transform-your-skin-and-bathing-experience/` — 169 impressions and a click.
5. Other legacy articles in the 404/indexing exports, prioritized by historical impressions, clicks, backlinks, and business relevance.

Preferred recovery for high-value articles: restore the original content at the original path with a self-canonical public-domain URL. If the permanent content architecture must use `/blog/<slug>`, publish the complete equivalent there and direct-redirect the old root URL to it.

Do not replace these pages with short, generic copy. Preserve the search intent, headings, useful detail, media, internal links, and any unique facts that earned historical visibility.

For `/shop/`, either restore a useful all-products catalogue at that path or create an equivalent all-products hub and redirect there. Do not redirect a multi-category shop page to an unrelated single category.

Exit criterion: the highest-value missing pages return 200 at their retained URL or redirect directly to a content-equivalent 200 page.

## Phase 4 — P1 sitemap and internal discovery

Owner: development/content  
Priority: **P1**

- Sitemap URLs must all use `https://odysseybaths.co.uk`.
- Include only indexable, canonical 200 URLs.
- Remove test/junk slugs.
- Include all intended live blog posts, products, categories, and static pages.
- Use genuine content modification dates where available; do not stamp every URL with the build time.
- Ensure navigation, category cards, breadcrumbs, product links, and article links point directly to canonical destinations.
- Remove internal links to 404s, query-parameter variants, and redirects.
- Decide whether old blog pagination should be retained, redirected to a genuinely equivalent listing state, or retired.

Exit criterion: a crawl of the generated sitemap finds only apex-domain, 200, indexable, self-canonical URLs and no orphaned priority page.

## Phase 5 — P1 metadata and structured data

Owner: development/SEO  
Priority: **P1 after canonical recovery**

- Validate unique, query-aligned title and description metadata for the homepage, four category pages, and all product pages.
- Add valid `BreadcrumbList` JSON-LD matching the visible breadcrumbs.
- Make Product and Offer URLs and images absolute apex-domain URLs.
- Validate product price, availability, image, and identifier fields against the visible page.
- Add Organization/LocalBusiness identifiers consistently rather than creating disconnected entities.
- Test representative product and article pages in Google's Rich Results Test.

Structured-data work will not by itself restore the lost impressions; it follows the canonical, redirects, and content recovery.

## Phase 6 — Controlled release checklist

Run these checks against a preview, then again against production immediately after release:

| Test | Required result |
|---|---|
| Homepage and four category pages | 200, indexable, self-canonical apex URL |
| Representative product in every category | 200, self-canonical, absolute valid JSON-LD URLs |
| Top 20 legacy URLs | one-hop permanent redirect to relevant 200 destination |
| All known legacy category/product URLs | no 404; no chains or loops |
| robots.txt | allows intended crawling and points to apex sitemap |
| sitemap.xml | apex URLs only; all 200/indexable/self-canonical |
| Vercel hostname | not a competing indexable canonical origin |
| `www` HTTPS | valid certificate and path-preserving permanent redirect |
| Internal crawl | no broken internal links or orphaned priority pages |
| Build/tests | clean production build and route/redirect test suite |

Rollback rule: do not roll back merely because rankings do not recover immediately. Roll back only for functional regressions or incorrect redirect/canonical behavior; Google reprocessing normally takes time.

## Phase 7 — Search Console actions after the production fix

Owner: SEO/site owner  
Priority: **P0 immediately after verified deployment**

1. Submit the corrected `https://odysseybaths.co.uk/sitemap.xml`.
2. Inspect the homepage, the four category pages, and the highest-value restored articles.
3. Confirm the live test sees the apex self-canonical, then request indexing for this limited priority set.
4. Start validation for the alternate-canonical and 404 issues only after the live tests pass.
5. Do not repeatedly request indexing for hundreds of URLs; use sitemap and internal discovery for scale.

## Monitoring and recovery scorecard

Measure at 7, 14, 28, and 56 days after release.

| Metric | Baseline | Recovery signal |
|---|---:|---|
| Indexed URLs | 27 | steady increase toward the valid sitemap count |
| Alternate-canonical exclusions | 52 | decline as apex pages become selected canonicals |
| Known 404s | 69 | decline for redirected/restored URLs |
| Daily impressions | about 15–53 after cliff | sustained multi-week rise, not a one-day spike |
| Homepage impressions | 380 in collapse window vs 15,087 before | material recovery after reindexing |
| Commercial queries | 96–100% impression losses | renewed impressions for `walk in baths`, `walk in bath`, `easy access baths`, and variants |
| Product-snippet impressions | 56 vs 7,256 before | return only after pages are indexed and markup recognized |

Expected order:

1. Google recrawls redirects and new canonicals.
2. Apex pages change from alternate/excluded to indexed.
3. Impressions return before clicks become statistically stable.
4. Query positions and rich-result coverage normalize later.

No exact recovery date or full restoration can be guaranteed. The first decision checkpoint should be 28 days after a clean release, with a deeper review at 56 days.

## Ownership and client communication

The evidence supports a factual, non-defensive explanation:

- Launch-day performance was broadly stable.
- A delayed indexing loss appeared after Google reprocessed the migration signals.
- Search Console shows no manual action or security issue.
- The technical causes are identifiable and reversible: canonical hostname, sitemap hostname, missing redirects, and missing legacy content.
- Recovery work is prioritized, testable, and measurable.

Avoid promising instant restoration or presenting the apparent average-position improvement as success. Report progress using indexed URLs, recovered commercial impressions, fixed legacy URLs, and URL Inspection canonical status.
