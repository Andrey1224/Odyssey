# Odyssey Baths SEO recovery workspace

Status: remediation implemented and verified locally; release is on hold pending client Vercel access.

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

## Current release status

- Working branch: `fix/seo-migration-recovery`.
- Recovery implementation and verification are complete locally through commit `baac732`.
- The local release gate passes: 40 sitemap URLs, 53 path redirects, 53 trailing-slash variants, 53 query-string variants, 3 host redirects, and both restored priority articles.
- No recovery commit has been pushed, merged, or deployed.
- **Confirmed production scheme (from Vercel dashboard, read-only):** production repository `Odycode8/Odyssey`, production branch `main`, current production commit `31e526d`, canonical domain `odysseybaths.co.uk`, client stable Vercel domain `odyssey-alpha-eosin.vercel.app` (now covered by a permanent host redirect to the canonical apex). `www.odysseybaths.co.uk` is attached but shows **No Deployment**. Preview deployments are protected by Vercel Authentication. Environment variables visible in the dashboard: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`. `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and Resend variables are **not visible** in the dashboard — recorded as an open release risk, not assumed present or absent, and no values were invented.
- Next stage: deploy this branch as a **Preview** (not a push to `main`), verify contact/brochure lead-form submissions end-to-end on that Preview, and run `scripts/seo/verify-recovery.mjs` against it before any production release.

## Current conclusion

The rankings did **not** collapse on the 10 June migration boundary. The decisive loss was delayed: impressions began falling around 14 July and collapsed on 27 July, after Google recrawled the migrated site.

The strongest evidence identified two migration defects acting together:

1. Canonicals, sitemap URLs, robots sitemap reference, Open Graph URLs, and structured-data URLs identified the Vercel preview hostname instead of `https://odysseybaths.co.uk`.
2. Important WordPress categories, products, and articles returned 404 instead of a one-to-one permanent redirect or restored content.

The canonical origin, sitemap signals, known high-confidence redirects, and two highest-priority recoverable articles are now repaired locally. Two lower-volume articles remain unrestored because no trustworthy source content was found; their recovery requires a WordPress database/XML export, hosting backup, or another original source.

This is a recoverable technical migration problem. Search Console reports no manual action or security issue.

## Change-control rule

Do not make isolated SEO changes directly in production. After Vercel access is available, inspect both projects read-only, push only the recovery branch, validate it on a Preview with `scripts/seo/verify-recovery.mjs`, then release the verified package once and monitor the defined recovery metrics in Google Search Console.
