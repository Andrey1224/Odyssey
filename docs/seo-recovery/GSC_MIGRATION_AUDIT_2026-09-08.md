# Google Search Console migration audit

Site: `https://odysseybaths.co.uk`  
Audit date: 8 September 2026  
Migration boundary used: 10 June 2026  
Migration: WordPress to custom Next.js site on Vercel  
Scope: read-only Search Console, live-site, Vercel production-source, and local-source inspection

## Executive verdict

The migration did not cause an immediate ranking collapse on 10 June. For the first equal 28-day window after migration, clicks were down 7.3%, impressions down 4.0%, and average position changed only from 38.3 to 39.1. The first seven days after launch had more impressions and a better average position than the preceding seven days.

The major loss was delayed. Impressions began declining around 14 July and fell from 227 on 26 July to 39 on 27 July. Comparing 27 July–23 August with the preceding 28 days, clicks fell 62.8% and impressions fell 96.0%.

This delay is consistent with Google gradually recrawling and reprocessing the migrated URLs:

- Indexed URLs fell from 74 on 12 June to 59 on 30 June, 38 on 10 July, 34 on 24 July, and 27 on 28 August.
- Known 404 URLs rose from 3 on 13 June to 26 on 30 June, 60 on 10 July, 64 on 24 July, and 69 by 21 August.
- URL Inspection says the homepage and `/walk-in-baths` are not indexed because they are alternate pages. Both the user-declared and Google-selected canonical point to `odyssey-navy-theta.vercel.app`.

The primary root cause is therefore not a manual penalty, a security problem, or an exact-day algorithmic loss. It is a technically recoverable migration configuration: the production site tells Google that the Vercel hostname is canonical, while many valuable WordPress URLs disappeared as 404s without relevant permanent redirects.

## Timeline and evidence

| Period | Clicks | Impressions | CTR | Average position | Interpretation |
|---|---:|---:|---:|---:|---|
| 13 May–9 Jun, before migration | 41 | 35,187 | 0.1% | 38.3 | Baseline |
| 10 Jun–7 Jul, after migration | 38 | 33,779 | 0.1% | 39.1 | No launch-day cliff; impressions -4.0% |
| 3–9 Jun | 10 | 8,294 | — | 38.38 weighted | Week before |
| 10–16 Jun | 9 | 8,894 | — | 35.53 weighted | Week after; impressions +7.2%, position better |
| 29 Jun–26 Jul | 43 | 22,075 | 0.2% | 41.9 | Pre-collapse comparison |
| 27 Jul–23 Aug | 16 | 882 | 1.8% | 8.7 | Impressions -96.0%; apparent position gain is survivor bias |
| Latest 28 days in report | 24 | 795 | 3.0% | 9.6 | Still approximately 91.2% below the preceding 28-day impression level |

The better CTR and average position after 27 July are not evidence of improvement. Broad commercial-query impressions disappeared, leaving only a small set of brand, local, and niche queries where the site already ranked relatively well.

### Daily break point

- 14 July: 865 impressions
- 15 July: 611
- 18 July: 467
- 24 July: 391
- 25 July: 356
- 26 July: 227
- **27 July: 39**
- 27 July–2 August average: 35.7 impressions/day, versus 442.7/day during 20–26 July

Conclusion: the major loss began through recrawl in mid-July and became a hard cliff on 27 July, not on the migration date.

## Root-cause assessment

### RC1 — Production pages canonicalize to the Vercel hostname

Confidence: **99% — primary cause**

Evidence:

- `lib/site.ts` hardcodes `SITE_DOMAIN` as `https://odyssey-navy-theta.vercel.app`.
- `app/layout.tsx` uses that value as `metadataBase`.
- page metadata builds canonical and Open Graph URLs from the same value.
- `lib/schema.ts` uses it in LocalBusiness and page-level structured data.
- Live URL Inspection for the homepage and `/walk-in-baths` reports “Alternate page with proper canonical”; both user-declared and Google-selected canonical are on the Vercel hostname.
- Search Console shows 52 URLs excluded as alternate pages with a proper canonical.

Affected signals:

- HTML canonical links
- Open Graph page/image URLs
- LocalBusiness, Product, Offer, and BlogPosting URLs
- XML sitemap locations
- robots.txt sitemap reference

Google treats redirects and `rel=canonical` as strong canonicalization signals, and sitemap inclusion as a weaker signal. Sending all of these signals toward a technical hostname gives Google a consistent reason to exclude the public-domain URLs.

Code references:

- `../../lib/site.ts:1`
- `../../app/layout.tsx:18`
- `../../app/robots.ts:7`
- `../../app/sitemap.ts:13`
- `../../lib/schema.ts:18`

### RC2 — Legacy WordPress URLs were not mapped with permanent redirects

Confidence: **98% — primary cause**

Evidence:

- Search Console reports 69 “Not found (404)” URLs.
- `next.config.ts` contains no redirects.
- There is no middleware or Vercel redirect configuration in the supplied source.
- Old URLs only receive an automatic trailing-slash removal, then land on a 404. That automatic 308 is not a migration mapping.
- Important old categories, products, and articles have direct relevant equivalents or should have been preserved.

Examples:

| Old URL | Current result | Correct destination/action |
|---|---|---|
| `/product-category/walk-in-baths/` | 404 after slash normalization | 308 to `/walk-in-baths` |
| `/product-category/deep-soaker-bath/` | 404 | 308 to `/deep-soaker-baths` |
| `/product-category/walk-in-shower-baths/` | 404 | 308 to `/walk-in-shower-baths` |
| `/product/carnelian-curvy-and-stunning-p-shaped-bath/` | 404 | 308 to `/walk-in-shower-baths/carnelian` |
| `/product/serenity-75-plus-large-walk-in-bath-with-water-jets/` | 404 | 308 to `/walk-in-baths/serenity-75-plus` |
| `/product/olivia-available-in-a-larger-size/` | 404 | 308 to `/walk-in-shower-baths/olivia` |
| `/installing-a-walk-in-bath/` | 404 | Restore this valuable article at its original URL, or restore under `/blog/...` and direct-redirect it |

Google recommends permanent server-side redirects from each old URL to the relevant new URL, avoiding irrelevant mass redirects to the homepage. See the complete draft in `REDIRECT_MAP_DRAFT.csv`.

Code reference: `../../next.config.ts:3`

### RC3 — High-performing informational content was removed or moved without preservation

Confidence: **95% — major contributing cause**

The old site ranked with category and article content that is absent from the new route inventory. Several pages that previously generated substantial impressions now return 404 and have no migrated equivalent.

Most affected examples in the collapse comparison:

| Page | Impressions before | Impressions after | Loss |
|---|---:|---:|---:|
| `/product-category/walk-in-baths/` | 4,892 | 0 | -100% |
| `/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk/` | 2,001 | 0 | -100% |
| `/product-category/deep-soaker-bath/` | 1,503 | 0 | -100% |
| `/installing-a-walk-in-bath/` | 981 | 0 | -100% |
| `/product-category/walk-in-shower-baths/` | 790 | 0 | -100% |
| `/best-shower-walk-in-tubs-for-small-bathrooms-space-saving-solutions/` | 265 | 0 | -100% |
| `/how-microbubbles-can-transform-your-skin-and-bathing-experience/` | 169 | 0 | -100% |

The current Sanity routing can permanently redirect numeric IDs or previous slugs only inside `/blog/[slug]`. It does not catch the old WordPress root-level article URLs.

Code references:

- `../../app/blog/[slug]/page.tsx:24`
- `../../app/blog/[slug]/page.tsx:92`

### RC4 — The sitemap is on the wrong host and is incomplete/stale

Confidence: **95% — major contributing cause**

Evidence:

- Live robots.txt advertises `https://odyssey-navy-theta.vercel.app/sitemap.xml`.
- Every live sitemap `<loc>` is on the Vercel hostname; none use the public domain.
- Search Console's only submitted sitemap record was submitted on 16 February 2023, last read on 1 March 2025, and reports zero discovered pages.
- The generated sitemap uses the build time as `lastModified` for every URL, rather than a true content-modification date.
- The live sitemap contained only two blog URLs while the live blog index showed five posts; it also contained a junk Cyrillic test slug.

Code references:

- `../../app/robots.ts:7`
- `../../app/sitemap.ts:10`
- `../../app/sitemap.ts:56`

### RC5 — `www` HTTPS is broken

Confidence: **90% that the issue exists; medium SEO impact**

Evidence:

- `http://www.odysseybaths.co.uk` redirects to HTTPS.
- The TLS certificate presented for `https://www.odysseybaths.co.uk` does not include the `www` hostname, so strict clients fail before the later redirect to the apex domain can occur.
- With certificate verification bypassed, the server would redirect `www` to the apex domain.

Search Console's HTTPS report shows no detected issue, but it has almost no indexed eligible URLs and therefore does not disprove the live certificate failure.

### RC6 — Structured-data coverage is weak, but this is not the traffic-cliff cause

Confidence: **85% as a secondary issue**

- Product snippets report: 0 valid and 0 invalid items.
- Merchant listings report: 0 valid and 0 invalid items.
- Breadcrumbs report: 0 valid and 0 invalid items.
- The UI renders visual breadcrumbs but no `BreadcrumbList` JSON-LD.
- Product image URLs in JSON-LD may be relative rather than absolute.
- Product-snippet impressions fell from 7,256 to 56 (-99.2%) during the collapse window, primarily because the underlying canonical and indexing signals failed.

Code references:

- `../../components/Breadcrumbs.tsx:10`
- `../../lib/schema.ts:49`

## Most affected pages

27 July–23 August compared with 29 June–26 July:

| Page | Clicks before → after | Impressions before → after | Change |
|---|---:|---:|---|
| Homepage `/` | 27 → 11 | 15,087 → 380 | impressions -97.5%; clicks -59.3% |
| `/product-category/walk-in-baths/` | 4 → 0 | 4,892 → 0 | lost entirely |
| Dual-function baths article | 1 → 0 | 2,001 → 0 | lost entirely |
| `/product-category/deep-soaker-bath/` | 3 → 0 | 1,503 → 0 | lost entirely |
| `/installing-a-walk-in-bath/` | 0 → 0 | 981 → 0 | lost entirely |
| `/product-category/walk-in-shower-baths/` | 0 → 0 | 790 → 0 | lost entirely |

The few post-collapse survivors include `/lh-rh/`, `/deep-soaker-baths/athena`, `/standard-size-baths/abalone-1500-1700-glass`, `/standard-size-baths`, `/contact`, and a small number of blog URLs.

## Most affected queries

| Query | Impressions before | Impressions after | Change |
|---|---:|---:|---:|
| `walk in baths` | 702 | 7 | -99.0% |
| `walk in bath` | 553 | 3 | -99.5% |
| `easy access baths` | 434 | 0 | -100% |
| `walk in baths and showers` | 434 | 3 | -99.3% |
| `walk-in baths` | 426 | 6 | -98.6% |
| `walk in shower bath` | 388 | 1 | -99.7% |
| `easy access bath` | 338 | 0 | -100% |
| `walk in shower baths` | 329 | 1 | -99.7% |
| `accessible baths` | 307 | 0 | -100% |
| `walk in baths uk` | 305 | 6 | -98.0% |
| `walk in bath shower` | 251 | 8 | -96.8% |

## Segment findings

### Countries

The UK market accounts for the meaningful loss. UK clicks fell from 41 to 14 (-65.9%) and UK impressions from 20,789 to 717 (-96.6%) in the collapse comparison. The improved average position is survivor bias.

### Devices

| Device | Impressions before | Impressions after | Change |
|---|---:|---:|---:|
| Desktop | 18,689 | 190 | -99.0% |
| Mobile | 3,217 | 655 | -79.6% |
| Tablet | 169 | 37 | -78.1% |

The desktop loss is especially severe, but the cross-device pattern confirms a site/indexing problem rather than a layout-only problem.

### Search appearance

Product-snippet impressions fell from 7,256 to 56 (-99.2%), with clicks falling from 10 to 0. This loss follows the same indexing/canonical event.

## Indexing report

Last report update: 3 September 2026.

| Status/reason | URLs |
|---|---:|
| Indexed | 27 |
| Not indexed, total | 236 |
| Not found (404) | 69 |
| Alternate page with proper canonical | 52 |
| Page with redirect | 8 |
| Blocked due to 403 | 4 |
| Excluded by `noindex` | 3 |
| Crawled — currently not indexed | 100 |

The “Crawled — currently not indexed” group includes legacy articles, old product routes, policy URLs, blog pagination, and other WordPress-era debris. It must be split into: restore, relevant redirect, intentionally retire with 410/404, and canonical cleanup.

## URL Inspection

### Homepage

- Status: URL is not on Google.
- Reason: Alternate page with proper canonical.
- Crawl allowed: yes.
- Fetch: successful.
- Indexing allowed: yes.
- User-declared canonical: `https://odyssey-navy-theta.vercel.app/`.
- Google-selected canonical: same Vercel URL.
- No referring sitemap detected.
- Last crawl observed: 7 September 2026.

### `/walk-in-baths`

- Status: URL is not on Google.
- Reason: Alternate page with proper canonical.
- User-declared canonical: `https://odyssey-navy-theta.vercel.app/walk-in-baths`.
- Google-selected canonical: same Vercel URL.
- Last crawl observed: 23 June 2026.
- Sitemap reference showed a temporary processing error.

## Other Search Console reports

| Report | Finding | Root-cause relevance |
|---|---|---|
| Core Web Vitals | Insufficient CrUX usage data for mobile and desktop | Not evidence of the cliff |
| HTTPS | 0 HTTP and 0 HTTPS indexed URLs; “No issues detected” | Inconclusive; live `www` certificate issue exists |
| Manual Actions | No issues detected | Rules out a manual penalty |
| Security Issues | No issues detected | Rules out a reported security action |
| Removals | No temporary removal requests in the last six months | Not a cause |
| Product snippets | 0 valid, 0 invalid | Coverage absent after deindexing |
| Merchant listings | 0 valid, 0 invalid | Coverage absent |
| Breadcrumbs | 0 valid, 0 invalid | Secondary enhancement gap |

## What is not supported by the evidence

- There is no evidence that the site stopped ranking on the exact migration date.
- There is no Search Console evidence of a manual action, reported security incident, or removal request.
- Core Web Vitals cannot be assessed from field data because the report has insufficient usage data.
- The improved post-collapse average position is not a real recovery; it is caused by losing almost all lower-ranking impressions.

## Causality statement

The 10 June migration changed the site's URL, canonical, sitemap, and content architecture. Google initially continued serving historical signals, which explains the stable first month. As Google recrawled the site, it found public-domain pages declaring the Vercel host as canonical and discovered that many historical WordPress URLs now returned 404. Index coverage declined through June and July; the performance cliff on 27 July followed. The timing and URL-level evidence make this the most likely causal chain.

## Data limitations

- Search Console data is sampled/aggregated and may omit low-volume rows.
- 10 June is the migration boundary recorded for this audit; Vercel production source shows a 2 July production commit, so deployments and Google's processing dates are not the same event.
- The copied local folder has no `.git` directory. SEO-critical files match the inspected production source, but local Git provenance cannot be independently verified from that folder.
- Full historical WordPress content and an authoritative old-URL inventory were not available locally. The 69 Search Console 404 rows are therefore the minimum known redirect/content-recovery set, not necessarily the complete set.

## Official implementation references

- Google: [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- Google: [Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- Google: [Canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- Google: [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Google: [URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en)

