# Task 02 — Implement high-confidence legacy redirects

## Objective

Preserve WordPress URL equity by adding permanent, direct redirects for every unambiguous legacy category/product alias, plus hostname canonicalization. Do not restore articles or make unrelated SEO changes in this task.

## Sources of truth

- `docs/seo-recovery/REDIRECT_MAP_DRAFT.csv`
- `docs/seo-recovery/WAYBACK_URL_INVENTORY_2024-2025.csv`
- current route/product data in `app/` and `data/`
- audit findings in `GSC_MIGRATION_AUDIT_2026-09-08.md`

## Required implementation

1. Work only on `fix/seo-migration-recovery`.
2. Implement every row in `REDIRECT_MAP_DRAFT.csv` whose status is `ready` (26 rows).
3. Add the following additional high-confidence archived aliases:
   - `/about-us/` -> `/about`
   - `/returns-policy/` -> `/return-policy`
   - `/product-category/serenity-range/` -> `/walk-in-baths`
   - `/product-category/shower-baths/` -> `/walk-in-shower-baths`
   - `/product/affinity/` -> `/deep-soaker-baths/affinity`
   - `/product/ambiance/` -> `/deep-soaker-baths/ambiance`
   - `/product/ambiance-the-king-of-front-entry-baths/` -> `/deep-soaker-baths/ambiance`
   - `/product/athena/` -> `/deep-soaker-baths/athena`
   - `/product/aventis-1700/` -> `/standard-size-baths/aventis-1700-plastic`
   - `/product/avrail-1500-and-1700-with-plastic-door/` -> `/standard-size-baths/avrail-1500-1700-plastic`
   - `/product/avrail-rv-1500-and-1700-with-plastic-door/` -> `/standard-size-baths/avrail-rv-1500-1700-plastic`
   - `/product/carnelian/` -> `/walk-in-shower-baths/carnelian`
   - `/product/caversham/` -> `/deep-soaker-baths/caversham`
   - `/product/cordova-1700-with-plastic-door/` -> `/standard-size-baths/cordova-1700-plastic`
   - `/product/cortega-1700-with-glass-door/` -> `/standard-size-baths/cortega-1700-glass`
   - `/product/highgrove/` -> `/walk-in-shower-baths/highgrove`
   - `/product/larimar/` -> `/walk-in-shower-baths/larimar`
   - `/product/maestro/` -> `/deep-soaker-baths/maestro`
   - `/product/olivia/` -> `/walk-in-shower-baths/olivia`
   - `/product/priya/` -> `/deep-soaker-baths/priya`
   - `/product/serenity-66-classic/` -> `/walk-in-baths/serenity-66-classic`
   - `/product/serenity-66-plus/` -> `/walk-in-baths/serenity-66-plus`
   - `/product/serenity-75-classic/` -> `/walk-in-baths/serenity-75-classic`
   - `/product/serenity-75-plus/` -> `/walk-in-baths/serenity-75-plus`
   - `/product/serenity-75-special/` -> `/walk-in-baths/serenity-75-special`
   - `/product/serenity-75-special-large-and-fully-featured/` -> `/walk-in-baths/serenity-75-special`
   - `/product/stamford-75-classic/` -> `/walk-in-baths/stamford-75-classic`
4. Add exact host-based permanent redirects that preserve path:
   - `odyssey-navy-theta.vercel.app` -> `https://odysseybaths.co.uk`
   - `www.odysseybaths.co.uk` -> `https://odysseybaths.co.uk`
   Code cannot repair the `www` TLS certificate; record that as a later Vercel/DNS action.
5. Use the smallest maintainable Next.js-native implementation. Prefer explicit reviewed mappings; do not build a CMS/middleware redirect system now.
6. `permanent: true` must produce a permanent status supported by the installed Next.js version.
7. Do not add redirects for rows marked `restore` or `review`.
8. Do not redirect legacy articles, `/shop`, `/terms`, `/features`, `/help-info`, `/vat-registration`, or ambiguous Athena/Athena Mini content in this task.

## Required behavior

- Each old path redirects directly to its final destination, not through another legacy URL.
- Final destinations return 200 and self-canonicalize to `https://odysseybaths.co.uk`.
- Both trailing-slash URLs observed by Google and normalized no-slash variants must not end in 404.
- Representative `?nocache=...` legacy URLs must redirect to the relevant destination rather than 404. A retained irrelevant query parameter is non-blocking for this task if the destination canonical is clean.
- No redirect loop or collision with current product/category routes.
- Host redirects preserve the requested path and do not affect localhost or unrelated preview hosts.

## Verification

1. Run `npm run lint` and `npm run build`.
2. Start the production server locally.
3. Generate a table for every implemented path containing:
   - source;
   - HTTP status;
   - Location;
   - destination status;
   - destination canonical.
4. Test both slash forms for representative category/product sources.
5. Test at least two legacy `nocache` variants.
6. Test host redirects locally using the appropriate Host header.
7. Prove current canonical category/product routes still return 200.
8. Run `git diff --check` and report `git status --short`.

## Scope limits

- No article/content restoration.
- No sitemap membership/lastModified cleanup.
- No structured-data redesign.
- No UI/content changes.
- No Vercel, DNS, GSC, Sanity, push, merge, deploy, or commit.

## Completion report

Return the standard runbook report plus the redirect verification table or its saved artifact path. Leave changes uncommitted for technical-lead review.

