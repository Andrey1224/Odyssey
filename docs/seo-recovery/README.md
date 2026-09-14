# Odyssey Baths SEO recovery workspace

Status: remediation is implemented, verified, and pushed to the upstream `main`; client production is awaiting the fork sync.

This folder records the read-only Google Search Console and source-code audit performed on 8 September 2026 after the WordPress-to-Next.js migration.

## Documents

- `GSC_MIGRATION_AUDIT_2026-09-08.md` — evidence, timeline, affected pages and queries, root-cause analysis, and report-by-report GSC findings.
- `SEO_RECOVERY_PLAN.md` — ordered implementation, verification, release, and monitoring plan.
- `REDIRECT_MAP_DRAFT.csv` — first-pass mapping of legacy WordPress URLs. Rows marked `ready` can be implemented after review; rows marked `restore` or `investigate` require content decisions.
- `RESPONSIBILITY_ASSESSMENT.md` — separates developer implementation responsibility from formal scope, client dependencies, content ownership, and launch-process failures.
- `LEGACY_CONTENT_RECOVERY.md` — confirmed archive availability and the source-by-source plan for recovering the old WordPress pages without admin access.
- `WAYBACK_URL_INVENTORY_2024-2025.csv` — 60 confirmed archived HTML URLs with capture timestamps.
- `AGENT_EXECUTION_RUNBOOK.md` — roles, safety rules, review gates, and the task sequence for supervised implementation.
- `TASK_00_BASELINE_AND_RECONCILIATION.md` — the first bounded assignment for the coding agent.
- `TASK_01_P0_CANONICAL_ORIGIN.md` — the first implementation task: replace the temporary Vercel canonical origin and verify generated output.
- `TASK_02_P0_LEGACY_REDIRECTS.md` — implement and verify the unambiguous WordPress URL mappings and canonical host redirects.
- `LOCAL_COPY_RECONCILIATION.md` — confirms the recovered Git repository is the correct implementation baseline.
- `REDIRECT_VERIFICATION.md` — verified redirect inventory and final destinations.
- `SITEMAP_INDEXABILITY_VERIFICATION.md` — sitemap, canonical, robots, and indexability verification.
- `PRIORITY_CONTENT_RESTORATION.md` — evidence and implementation details for the two restored high-priority articles.
- `SECONDARY_CONTENT_SOURCE_RECOVERY.md` — records the unsuccessful source search for two additional missing articles so the work is not repeated.
- `PREDEPLOY_RELEASE_GATE.md` — final local release gate and Vercel pre-flight checklist.
- `CURRENT_HANDOFF_2026-09-13.md` — exact current repository, Vercel, client-fork, release, and next-action state.
- `POSTDEPLOY_GSC_VERIFICATION_2026-09-14.md` — client production and Google Search Console evidence collected after the recovery deployment, including the stale sitemap finding and next GSC actions.

## Current release status

- Upstream repository: `Andrey1224/Odyssey`.
- Upstream `main` and local `main` before this documentation update: `20553a6` (`docs(seo): record postdeploy GSC verification`).
- The local `fix/seo-migration-recovery` branch points to the same accepted recovery commit.
- The local release gate passes: 40 sitemap URLs, 53 path redirects, 53 trailing-slash variants, 53 query-string variants, 3 host redirects, and both restored priority articles.
- The accepted recovery package has been pushed to `Andrey1224/Odyssey/main` at `55ccd4d`.
- Vercel reported the upstream deployment for `55ccd4d` as successful. Its immutable deployment URL is protected by Vercel Authentication and returns `x-robots-tag: noindex`, so unauthenticated remote verification is intentionally blocked. The upstream stable Vercel hostname returns the expected `308` to the canonical apex and preserves path/query strings.
- **Confirmed client production scheme:** repository `Odycode8/Odyssey`, production branch `main`, current production commit `957440f`, canonical domain `odysseybaths.co.uk`, and client stable Vercel domain `odyssey-alpha-eosin.vercel.app`. The previous production baseline was `31e526d`. Environment variables visible in the dashboard were `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_VERSION`.
- **Current release boundary:** Paul synced the client fork and Vercel successfully deployed production commit `957440f` from `Odycode8/Odyssey/main`.
- **Open pre-existing risk:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and Resend variables were not visible in the client Vercel project. Both lead forms require Supabase to save submissions. This dependency already existed in production baseline `31e526d`; it was not introduced by the SEO recovery.
- **Post-deploy update (14 September 2026):** Paul synced the fork and client Vercel deployed `957440f` successfully. Live host redirects, legacy redirects, restored pages, robots, sitemap hostnames, and Googlebot live availability were verified.
- **GSC recovery actions completed (14 September 2026):** the sitemap was resubmitted and accepted as a Sitemap with 46 discovered pages; the homepage and two restored priority articles were added to Google’s priority crawl queue; validation was started for the 52 URLs in **Alternate page with proper canonical tag**. See `POSTDEPLOY_GSC_VERIFICATION_2026-09-14.md`.
- Next stage: monitor crawl and validation movement after 3–7 days, then assess impressions, clicks, position, and indexed-page recovery over 2–4 weeks.

## Current conclusion

The rankings did **not** collapse on the 10 June migration boundary. The decisive loss was delayed: impressions began falling around 14 July and collapsed on 27 July, after Google recrawled the migrated site.

The strongest evidence identified two migration defects acting together:

1. Canonicals, sitemap URLs, robots sitemap reference, Open Graph URLs, and structured-data URLs identified the Vercel preview hostname instead of `https://odysseybaths.co.uk`.
2. Important WordPress categories, products, and articles returned 404 instead of a one-to-one permanent redirect or restored content.

The canonical origin, sitemap signals, known high-confidence redirects, and two highest-priority recoverable articles are now repaired locally. Two lower-volume articles remain unrestored because no trustworthy source content was found; their recovery requires a WordPress database/XML export, hosting backup, or another original source.

This is a recoverable technical migration problem. Search Console reports no manual action or security issue.

## Change-control rule

Do not make additional isolated SEO changes while Google is recrawling the accepted recovery package. Production is verified, the current sitemap is accepted, priority crawling is requested, and canonical validation is running. Monitor the defined recovery metrics before deciding on further SEO changes.
