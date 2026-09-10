# AI agent execution runbook

Repository: `/Users/dev/Downloads/home/dev/dev/repos/oddyseyweb-git-recovered`  
Audit branch: `seo-recovery-audit-2026-09-08`  
Production baseline: `31e526d`  
Audit documentation commit: `3e7007e`

## Roles

- **Owner/client representative:** supplies access, approves content/business decisions, and authorizes production deployment.
- **Technical lead/reviewer:** defines one bounded task at a time, reviews the actual diff and verification evidence, accepts or rejects the task, and decides when the next phase may begin.
- **Coding agent:** implements only the active task, runs the required checks, documents deviations/blockers, and never deploys or changes external services without explicit authorization.

Self-reported success is not sufficient. A task is complete only after technical-lead review of the working tree, diff, test output, and relevant live/preview behavior.

## Safety rules

1. Work only in `oddyseyweb-git-recovered`.
2. Keep `/Users/dev/Downloads/home/dev/dev/repos/oddyseyweb` unchanged as the source-machine backup until reconciliation is accepted.
3. Never print, commit, or copy secret values from `.env`, `.env.local`, Vercel, Sanity, Supabase, or Resend.
4. Never push, merge to `main`, deploy, change DNS/Vercel/GSC/Sanity settings, or request indexing unless the owner explicitly authorizes that exact action.
5. One implementation task per review cycle. Do not add unrelated cleanup or refactors.
6. Preserve the evidence and recovery documents in `docs/seo-recovery`.
7. Use permanent redirects only after destination equivalence is reviewed. Do not mass-redirect unrelated content to the homepage.
8. Do not claim SEO recovery based on average position alone; use indexation and impression recovery metrics from the audit.

## Branch strategy

1. Preserve `main` at the production baseline.
2. Preserve `seo-recovery-audit-2026-09-08` as the evidence/documentation branch.
3. Create `fix/seo-migration-recovery` from `seo-recovery-audit-2026-09-08` after Task 00 confirms the baseline.
4. Make small reviewed commits by phase. Do not squash evidence before final review.

## Execution sequence and gates

### Task 00 — Baseline and local-copy reconciliation

- Verify repository identity, branch ancestry, clean status, dependencies, lint, and production build.
- Compare the copied source-machine folder with the GitHub production clone without exposing secrets.
- Classify differences; do not merge them automatically.

Gate: technical lead confirms the correct working baseline and any files that must be carried forward.

### Task 01 — P0 canonical origin and host consistency

- Make `https://odysseybaths.co.uk` the only production canonical origin.
- Correct metadataBase, canonicals, Open Graph URLs, structured-data URLs, robots sitemap reference, and sitemap locations.
- Add automated assertions that production output contains no canonical reference to `odyssey-navy-theta.vercel.app`.
- Do not deploy.

Gate: lint/build/tests pass; rendered production output and generated crawl files are reviewed.

### Task 02 — P0 exact legacy redirects

- Implement reviewed `ready` mappings from `REDIRECT_MAP_DRAFT.csv`.
- Cover known aliases and legacy product/category paths.
- Validate one-hop permanent redirects, query behavior, no chains/loops, and 200 self-canonical destinations.
- Do not implement `restore` rows as homepage redirects.

Gate: automated redirect matrix and local production-server checks pass.

### Task 03 — Sitemap, indexability, and internal discovery

- Remove test/junk URLs.
- Include every intended indexable current URL and exclude redirects, 404s, noindex pages, and technical-host URLs.
- Use real modification dates where the source has them.
- Verify internal links point directly to final canonical URLs.

Gate: crawl/sitemap validation passes with no broken internal links for priority routes.

### Task 04 — High-value legacy content recovery

- Merge GSC and Wayback inventories.
- Restore highest-value former pages first, preserving intent and useful content.
- Prefer the original URL for high-performing articles; otherwise use one direct permanent redirect to a complete equivalent.
- Integrate content with Sanity only after access and content workflow are confirmed.

Gate: content owner approves accuracy; technical lead verifies metadata, canonical, internal links, and route behavior.

### Task 05 — Structured data and metadata QA

- Add/repair BreadcrumbList, Product, Offer, BlogPosting, and LocalBusiness consistency.
- Use absolute public-domain image and entity URLs.
- Validate representative pages and confirm visible content matches structured data.

Gate: automated parsing passes and representative rich-result tests have no blocking errors.

### Task 06 — Preview release candidate

- Run clean install, lint, full build, SEO tests, redirect tests, route smoke tests, and an internal crawl.
- Produce a release checklist with exact results and known limitations.
- Technical lead reviews the complete branch diff against production.

Gate: owner authorizes production deployment.

### Task 07 — Controlled production release

- Deploy the accepted commit only.
- Verify apex, `www`, Vercel host, TLS, canonical, redirects, robots, sitemap, priority pages, forms, and analytics.
- Roll back only for functional or incorrect-routing/canonical regressions, not because rankings require recrawl time.

Gate: live technical checks pass before Search Console actions.

### Task 08 — Search Console validation and monitoring

- Submit the corrected sitemap.
- Inspect a limited priority set and request indexing only after live canonical checks pass.
- Start appropriate validation flows.
- Record 7/14/28/56-day metrics using the recovery scorecard.

## When owner help is required

Stop and request help for:

- Vercel/DNS domain ownership, `www` certificate, or host redirect settings;
- Sanity write access and content approval;
- old hosting/WordPress backups or webmaster contact;
- Google Analytics access;
- production deploy approval;
- ambiguous legacy page equivalence;
- any conflict between the copied local changes and production source that changes business behavior.

## Agent completion format

Every agent response must include:

1. Task scope completed.
2. Files changed.
3. Exact commands/checks run and their results.
4. Diff summary.
5. Assumptions and unresolved blockers.
6. Confirmation that no push/deploy/external-setting changes occurred.
7. Current branch and `git status --short`.

