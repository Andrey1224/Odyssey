# Odyssey Baths SEO recovery workspace

Status: audit complete; remediation not yet implemented.

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

## Current conclusion

The rankings did **not** collapse on the 10 June migration boundary. The decisive loss was delayed: impressions began falling around 14 July and collapsed on 27 July, after Google recrawled the migrated site.

The strongest evidence points to two migration defects acting together:

1. Canonicals, sitemap URLs, robots sitemap reference, Open Graph URLs, and structured-data URLs identify the Vercel preview hostname instead of `https://odysseybaths.co.uk`.
2. Important WordPress categories, products, and articles return 404 instead of a one-to-one permanent redirect or restored content.

This is a recoverable technical migration problem. Search Console reports no manual action or security issue.

## Change-control rule

Do not make isolated SEO changes directly in production. Implement the P0 package together, validate it on a preview, then deploy once and monitor the defined recovery metrics.
