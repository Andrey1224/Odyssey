# Sitemap, Indexability and Internal Discovery Verification

## 1. Found Issues & Fixes

**Sitemap (`app/sitemap.ts`)**
- **Issue:** Used `const now = new Date()` as a dummy `lastModified` for all pages.
- **Fix:** Removed all dummy `lastModified` tags across `sitemap.ts` as per the requirement since the true modification dates are not tracked.
- **Issue:** Sitemap could include unwanted blog slugs indiscriminately.
- **Fix:** Updated `sitemap.ts` to strictly exclude the confirmed garbage slug (`фыафыафы`) and modified `sanity/lib/queries.ts` to explicitly exclude posts with `seo.noindex == true`.

**Canonical Metadata**
- **Issue:** Missing explicit `alternates: { canonical: ... }` on the `/reviews` and `/free-brochure` pages.
- **Fix:** Added canonical URLs to `app/reviews/page.tsx` and `app/free-brochure/page.tsx`. (Open Graph metadata is successfully inherited from the root layout without being overwritten).

## 2. Sitemap URL Verification

A full programatic test was performed locally after building the production application.
- **Total Sitemap URLs:** 38
- **Results:**
  - All 38 URLs return a `200` HTTP Status.
  - All URLs self-canonicalize correctly to the `https://odysseybaths.co.uk` hostname (no Vercel or WWW URLs in canonicals).
  - No `noindex` tags are present on the indexed sitemap pages.
  - `lastmod` was correctly removed from the output XML.
- **Note:** The homepage sitemap entry is `https://odysseybaths.co.uk/` and its internal canonical is `https://odysseybaths.co.uk` (without trailing slash). This is expected behaviour driven by Next.js's `trailingSlash: false` setting.

## 3. Internal Discovery & Links

- **Legacy URLs:** Source code inspection (`href=` searches across `app` and `components`) confirmed there are **no hardcoded internal HTML links** pointing to deprecated WordPress paths (e.g., `/product-category/...`, `/product/...`, `/shop/...`).
- **Canonical Host:** No hardcoded links to `odyssey-navy-theta.vercel.app` or `www.odysseybaths.co.uk` exist outside of redirect configurations and docs.
- **Reachability:** All category hubs (`/walk-in-baths`, `/walk-in-shower-baths`, `/standard-size-baths`, `/deep-soaker-baths`) and informational pages are correctly linked in `components/Header.tsx` and `components/Footer.tsx`.

## 4. Blocked / Out of Scope

- **Sanity/Content:** Missing Sanity CMS credentials limits the ability to verify and restore the actual missing WordPress articles (e.g. `/installing-a-walk-in-bath/`).
- **Vercel Hostname Configurations:** Vercel edge redirects and DNS settings cannot be modified locally.
- **Search Console:** Google Search Console validation cannot be initiated locally.

## 5. Commands Executed

- `npm run lint` (Passed)
- `npm run build` (Passed)
- `node scratch/check_seo.js` (Custom script verified sitemap 200s, canonicals, and noindex)
