# Task 01 — Make the public domain the canonical origin

## Objective

Replace the temporary Vercel canonical origin with `https://odysseybaths.co.uk` everywhere it is generated from the shared site configuration. Verify the production output. Do not expand this task into redirects, content migration, or general SEO cleanup.

## Required implementation

1. Work only in `/Users/dev/Downloads/home/dev/dev/repos/oddyseyweb-git-recovered`.
2. Work on branch `fix/seo-migration-recovery`, created from the accepted audit/baseline branch.
3. Read `docs/seo-recovery/AGENT_EXECUTION_RUNBOOK.md` and the canonical findings in `GSC_MIGRATION_AUDIT_2026-09-08.md`.
4. Find every repository reference to `odyssey-navy-theta.vercel.app` and classify it before editing.
5. Change the shared production site origin to exactly `https://odysseybaths.co.uk` with no trailing slash.
6. Keep one source of truth. Do not independently hardcode the domain across page files.
7. Confirm the shared origin propagates to:
   - `metadataBase`;
   - page canonical links;
   - Open Graph URLs/images resolved from metadata;
   - LocalBusiness, Product, Offer, and BlogPosting URL fields;
   - robots.txt sitemap reference;
   - every sitemap `<loc>`.
8. Do not derive production canonical URLs from `VERCEL_URL` or the request host. Preview deployments must still declare the public production domain as canonical.
9. Do not implement legacy path redirects or hostname redirects in this task; those are Task 02.

## Required verification

- `rg` finds no active production SEO/config reference to `odyssey-navy-theta.vercel.app`. Documentation/history references are allowed.
- `npm run lint` passes.
- `npm run build` passes.
- Start the production build locally and inspect at least:
  - `/`;
  - `/walk-in-baths`;
  - one product page;
  - one available blog page if local Sanity data permits;
  - `/robots.txt`;
  - `/sitemap.xml`.
- Confirm HTML canonicals and relevant JSON-LD use `https://odysseybaths.co.uk`.
- Confirm robots.txt points to `https://odysseybaths.co.uk/sitemap.xml`.
- Confirm sitemap entries use only `https://odysseybaths.co.uk`.
- Confirm the Vercel hostname does not appear in rendered production output for the inspected routes.

## Scope limits

- Do not change page copy, design, product data, Sanity content, sitemap membership/lastModified behavior, structured-data shape, or internal links.
- Do not implement legacy redirects yet.
- Do not change Vercel, DNS, GSC, Sanity, or environment settings.
- Do not push, merge, deploy, or request indexing.
- Do not commit before technical-lead review.

## Completion report

Return:

1. exact files changed and why;
2. all active references found before/after;
3. lint/build results;
4. inspected URL results with canonical/robots/sitemap evidence;
5. `git diff --check`, diff summary, current branch, and `git status --short`;
6. confirmation that no external systems or production were changed.

