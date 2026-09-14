# Odyssey Baths — Post-deploy GSC Verification

**Verified:** 14 September 2026  
**Mode:** read-only, except Google Search Console live URL tests (no sitemap submission, indexing request, or issue-validation action was started)

## Deployment confirmed

- Client Vercel project: `pauls-projects-4076fc33/odyssey`
- Connected repository: `Odycode8/Odyssey`
- Production branch: `main`
- Production commit shown by Vercel: `957440f18c7919d0986121b6f477c3d6b957b4a3`
- Deployment status: **Ready**
- Vercel observability at inspection time: 0% error rate
- Production domains shown: `odysseybaths.co.uk`, `www.odysseybaths.co.uk`, and the project Vercel hostname

## Live production verification

The following were verified against the public production deployment:

- `https://www.odysseybaths.co.uk/about?check=1` returns `308` to `https://odysseybaths.co.uk/about?check=1`.
- `https://odyssey-alpha-eosin.vercel.app/about?check=1` returns `308` to the canonical apex with path and query preserved.
- Representative legacy paths (`/home`, old product categories, and old product URLs) return `308` to their mapped destinations.
- Both restored priority articles return `200`.
- `robots.txt` allows crawling, disallows `/api/`, and references `https://odysseybaths.co.uk/sitemap.xml`.
- The live sitemap contains 46 URLs and all use the canonical apex hostname.
- The 53 path mappings, 53 trailing-slash cases, 53 query-string cases, and restored-article checks passed against production.

### Verification-script false positive

The current script reports six sitemap pages as `noindex`, but manual response inspection proved this is a false positive. The script searches for the word `noindex` anywhere in the HTML and matches Next.js/Sanity serialized data such as `"noindex":false`. These pages return `200`, have self-canonicals, do not emit a `noindex` robots meta tag, and do not emit an `X-Robots-Tag: noindex` header.

The verification script should be corrected to inspect only actual robots meta directives and `X-Robots-Tag` headers.

## Search performance state

Search Console performance was last updated about 7.5 hours before inspection and only contains data through **12 September 2026**, before the recovery release. It cannot yet show recovery impact.

### Last three months (13 June–12 September 2026)

- Clicks: **98**
- Impressions: **44,000**
- CTR: **0.2%**
- Average position: **39.2**

### Last 28 days

- Clicks: **22**
- Impressions: **802**
- CTR: **2.7%**
- Average position: **9.9**

The 28-day totals reflect the already-collapsed visibility and are not evidence of post-fix recovery.

### Highest-impact pages in the three-month report

| Page | Clicks | Impressions | Recovery treatment |
|---|---:|---:|---|
| `/` | 55 | 24,765 | canonical origin corrected |
| `/product-category/walk-in-baths/` | 9 | 10,300 | permanent redirect to `/walk-in-baths` |
| `/product/cordova-double-ended-1700-with-plastic-door/` | 7 | 13 | permanent product redirect |
| `/product-category/deep-soaker-bath/` | 4 | 3,021 | permanent redirect to `/deep-soaker-baths` |
| `/walk-in-baths-and-mental-health-how-hydrotherapy-relieves-stress/` | 4 | 430 | legacy URL still requires content/source review |
| `/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk/` | 3 | 9,094 | restored at canonical non-trailing-slash URL |
| `/serenity-range-self-cleaning-walk-in-baths/` | 3 | 18 | legacy URL/content status requires review |
| `/product/olivia-available-in-a-larger-size/` | 3 | 16 | permanent product redirect |
| `/how-microbubbles-can-transform-your-skin-and-bathing-experience/` | 2 | 330 | original content unavailable; do not fabricate |
| `/free-brochure` | 2 | 26 | current route retained |

### Queries, countries, devices, and appearance

- Important high-impression queries included `walk in baths` (1,283 impressions), `walk in baths and showers` (784), and `walk in baths near me` (321).
- United Kingdom accounted for 89 clicks and 40,891 impressions, confirming that UK is the primary recovery market.
- Device split: mobile 54 clicks / 7,206 impressions; desktop 38 clicks / 36,338 impressions; tablet 6 clicks / 407 impressions.
- Product snippets were the only reported search appearance: 25 clicks / 15,508 impressions.

## Page indexing evidence

The Page indexing report was last updated **3 September 2026**, before the release:

- Indexed: **27**
- Not indexed: **236**
- Not found (404): **69**
- Alternate page with proper canonical: **52**
- Page with redirect: **8**
- Blocked due to 403: **4**
- Excluded by `noindex`: **3**
- Crawled, currently not indexed: **100**

These counts must not be interpreted as the post-fix state until Google recrawls the site.

### Direct canonical proof from URL Inspection

The Google Index view for `https://odysseybaths.co.uk/` showed:

- Status: not indexed, alternate page with proper canonical
- Last crawl: 7 September 2026
- Old user-declared canonical: `https://odyssey-navy-theta.vercel.app/`
- Google-selected canonical: the same Vercel URL

This directly confirms the canonical migration defect identified by the audit.

The live test on 14 September 2026 showed:

- URL is available to Google
- HTTP `200 OK`
- Page can be indexed
- All page resources loaded
- No JavaScript console messages
- HTML contains `index, follow`
- Canonical and Open Graph URL use `https://odysseybaths.co.uk`

### Restored high-impact article

For `/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk/`:

- The old trailing-slash URL was last crawled on 16 July 2026 and returned `404`.
- The new canonical non-trailing-slash URL was unknown to Google because no referring sitemap was detected.
- A live test on 14 September 2026 showed the canonical URL is available to Google and can be indexed.

### Other indexing categories

- The 52 alternate-canonical examples include the homepage, FAQ, category pages, and cache-busting URL variants. The core cause is expected to clear after recrawl now that the canonical origin is fixed.
- The four 403 examples are legacy WordPress PDFs/DOCX files and a theme wildcard, not current indexable HTML pages.
- The three historic `noindex` examples are legacy article URLs last crawled in November 2025. Their intended Sanity/content status should be checked separately; they are not evidence of a global production `noindex`.
- The 100 crawled-not-indexed examples mix legacy WordPress pages/assets with routes such as `/blog/`, `/returns-policy/`, and older articles. Redirected URLs should consolidate after recrawl; missing articles still require source/content decisions.

## Sitemap finding — immediate priority

The only submitted sitemap entry is `https://odysseybaths.co.uk/sitemap.xml`, but Search Console currently records it as an old **Sitemap index**:

- Submitted: 16 February 2023
- Last read: 1 March 2025
- Status: Success
- Discovered pages: **0**
- Child sitemaps: **0**

The live sitemap is valid and contains 46 canonical URLs, but GSC has not processed its current form. This explains why the restored canonical article reports “No referring sitemaps detected.”

## Other GSC reports

- Manual Actions: **No issues detected**
- Security Issues: **No issues detected**
- HTTPS: **No critical issues** (report still shows zero classified URLs and is not yet representative)
- Core Web Vitals: not enough Chrome UX data for mobile or desktop
- Product snippets: 0 invalid; optional `aggregateRating` and `review` improvements only
- Merchant listings: 0 invalid; optional return policy, shipping, `validFrom`, and product-identifier improvements only
- Breadcrumbs: 0 invalid; no issues detected

## Recommended GSC actions (not yet executed)

1. Resubmit `https://odysseybaths.co.uk/sitemap.xml` so Google processes the current 46-URL sitemap.
2. Request indexing for the small priority set, starting with the homepage and the two restored articles.
3. After sitemap submission, start validation for **Alternate page with proper canonical tag** because the common canonical-origin defect is fixed.
4. Do not start validation for the entire 404 group yet: some examples are now redirected/restored, but intentionally unavailable legacy articles and assets remain.
5. Do not validate the 403 or historic `noindex` groups until their individual intended outcomes are confirmed.
6. Recheck live GSC performance after 3–7 days for crawl/discovery movement and after 2–4 weeks for ranking/traffic movement.

## Current conclusion

The deployment successfully corrected the central canonical and redirect defects. Google’s stored index evidence still reflects the broken pre-release site, while Googlebot live tests now see indexable canonical pages. The next high-value action is to submit the current sitemap and request indexing for a small priority set; ranking recovery cannot be judged on the day after deployment.
