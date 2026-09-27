# CLAUDE.md

This is the operating guide for Claude Code in the Odyssey Baths repository. Read it before changing anything.

## Paul interaction contract

Paul is not expected to know the repository structure, Git commands, SEO implementation details, or deployment terminology. When Paul describes a task in ordinary language, Claude Code must route and manage the workflow for him.

### Automatic routing

- If Paul mentions changing, adding or replacing a photo/image, read `docs/paul/IMAGE_WORKFLOW.md` before acting.
- If Paul mentions an old article, Wayback, restoring content or “the next article”, read `docs/seo-recovery/CONTENT_RECOVERY_RUNBOOK.md` and `docs/seo-recovery/CONTENT_RECOVERY_QUEUE.csv` before acting.
- If Paul mentions forms, enquiries, leads or Supabase, read the lead-form section below and `docs/api-integrations/SUPABASE_LEAD_SUBMISSIONS.sql` before acting.

### Minimize Paul's work

1. Inspect the repository and documentation before asking Paul a technical question.
2. Ask only for information that cannot be discovered locally. Use plain language and ask the smallest number of questions needed.
3. For an image task, normally ask only for the image file, exact target page/product, intended position, and confirmation of permission to publish.
4. For “restore the next article”, select the first actionable queue item yourself, explain it briefly, and investigate its sources. Ask Paul only when source rights, factual approval, or missing original material requires his decision.
5. Run Git status/remote checks, create the feature branch, edit files, optimize placement, run validation, commit, push and prepare the pull request yourself when credentials and authorization are available.
6. Never ask Paul to type Git commands that Claude Code can safely run.
7. Present Paul with a short outcome: what changed, the Preview/PR link, and exactly what he should visually approve.
8. If GitHub or Vercel authentication is missing, explain the single smallest action Paul needs to take, then continue automatically.

Natural-language requests are sufficient. Paul does not need to copy a long prompt; `docs/paul/CLAUDE_TASK_TEMPLATES.md` is an advanced fallback for ambiguous work.

## Non-negotiable safety rules

1. Never work directly on `main`. Create one short-lived branch per article or image task.
2. Never push to `main`, deploy manually, change Vercel/DNS/GSC/Sanity settings, or alter redirects unless the task explicitly authorizes it.
3. Preserve public URLs, slugs, canonicals, redirect destinations, publication dates, and authors unless the task provides verified replacement data.
4. Do not invent historical article copy, testimonials, product claims, prices, dates, authors, specifications, or image provenance.
5. Never commit `.env*`, API keys, tokens, customer submissions, or downloaded private backups.
6. One article or one clearly scoped image group per pull request. Do not mix cleanup or refactors into content work.
7. Before handing off, run `npm run verify:paul` and report its exact result plus `git status --short`.

Detailed workflows:

- `docs/paul/PAUL_AND_CLAUDE_WORKFLOW.md`
- `docs/paul/IMAGE_WORKFLOW.md`
- `docs/seo-recovery/CONTENT_RECOVERY_RUNBOOK.md`
- `docs/paul/CLAUDE_TASK_TEMPLATES.md`

## Commands

```bash
npm ci                  # install exactly the locked dependencies
npm run dev             # local development server
npm run lint            # ESLint
npm run build           # production build
npm run verify:content  # local content/image/SEO guardrails
npm run verify:paul     # required complete check before a pull request
npm run start           # serve the production build locally
```

No unit-test framework is currently configured. Pull requests are checked by the repository content-safety workflow, but a human must still review the Vercel Preview visually.

## Actual architecture

This is a Next.js 16 App Router site. Content is currently **hybrid**; do not assume the project is CMS-free.

### Static application content

- Product/catalog data lives in `data/*.ts`.
- Site-owned local images live under `public/images/`.
- Most static pages live under `app/<route>/page.tsx`.
- Two recovered legacy articles currently live as static root routes:
  - `app/installing-a-walk-in-bath/page.tsx`
  - `app/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk/page.tsx`
- `components/LegacyArticleLayout.tsx` is the shared layout for recovered root-level articles.

### Sanity-backed blog (still active)

- `/blog` and `/blog/[slug]` query published posts from Sanity.
- Sanity queries and mapping live in `sanity/lib/queries.ts` and `sanity/lib/types.ts`.
- Post schema lives in `sanity/schemaTypes/post.ts`.
- Sanity post cover/body/OG images are served from `cdn.sanity.io`.
- `app/sitemap.ts` obtains current `/blog/<slug>` entries from Sanity.

Paul does not want to use Sanity for future editing. That is a planned migration, not a completed one. Do not remove Sanity or its environment variables until every live Sanity URL has been inventoried, migrated or redirected, tested, and accepted. Until then, recovered legacy articles should follow the static recovery runbook.

### Lead forms

Both public forms persist through the shared server-only implementation in `lib/lead-submissions.ts`:

- Contact: `app/api/leads/route.ts` -> `submitContactLead()` -> `persistLead()`
- Brochure: `app/free-brochure/actions.ts` -> `submitBrochureLeadRecord()` -> `persistLead()`
- Durable storage requires server-side `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
- Resend variables are optional and only control email notification after a successful Supabase save.
- The required table schema is `docs/api-integrations/SUPABASE_LEAD_SUBMISSIONS.sql`.

Never expose the service-role key to browser code or prefix it with `NEXT_PUBLIC_`.

## SEO recovery constraints

The site is recovering from a WordPress-to-Next.js migration. Historical URLs and signals are intentional.

- Canonical origin: `https://odysseybaths.co.uk`, defined in `lib/site.ts`.
- Redirects live in `next.config.ts`; do not edit them during ordinary article/image work.
- Canonical sitemap is generated by `app/sitemap.ts`.
- Recovery evidence and decisions live in `docs/seo-recovery/`.
- The authoritative work queue is `docs/seo-recovery/CONTENT_RECOVERY_QUEUE.csv`.
- Wayback inventory is `docs/seo-recovery/WAYBACK_URL_INVENTORY_2024-2025.csv`.
- Redirect decisions are in `docs/seo-recovery/REDIRECT_MAP_DRAFT.csv`.

For a legacy article, retain the original root URL when the queue says `restore_same_url`. A restored page must return 200, be indexable, have an apex self-canonical, authentic metadata/dates, BlogPosting JSON-LD, useful internal links, and a sitemap entry. Never redirect an unrelated article to the homepage.

## Image rules

- New article images: `public/images/articles/<article-slug>/`.
- Product-specific images: `public/images/products/<product-slug>/`.
- Shared/global artwork remains in `public/images/`; replacing a shared filename can change several pages at once.
- Add new filenames and update only the intended references. Do not silently overwrite a shared image.
- Use descriptive lowercase kebab-case filenames, correct alt text, and web-friendly formats (`.webp`, `.avif`, `.jpg`, `.png`; SVG only from a trusted source).
- Do not commit an image if its ownership or permission to publish is unknown.
- Keep originals outside the repo; commit optimized web assets only.
- `next/image` should be used for rendered images where practical.

## Git workflow

Paul works from his fork, while `Andrey1224/Odyssey` is the upstream source. Safe flow:

1. Sync fork `main` from upstream.
2. Create `images/<scope>` or `content/<slug>` from the synced `main`.
3. Make one scoped change.
4. Run `npm run verify:paul`.
5. Push the branch to Paul's fork, not `main`.
6. Open a PR to `Andrey1224/Odyssey:main`.
7. Review CI and the Vercel Preview.
8. Andrii approves/merges.
9. Paul syncs his fork; client Vercel then receives the approved production commit.

Claude Code should perform steps 1-7 and prepare step 9 whenever authenticated. Paul should normally only provide/approve the content and review the Preview. Do not manually deploy a feature branch: pushing the branch should let the connected Vercel project create the Preview automatically.

If branch/fork state is unclear, stop and report `git remote -v`, `git branch --show-current`, `git status --short`, and `git log -3 --oneline`. Do not guess or force-push.

## Application conventions

- Pages exporting metadata are server components; stateful UI belongs in a separate client component.
- Use `SITE_DOMAIN` and other constants from `lib/site.ts`; do not hardcode contact details or Vercel hosts.
- Use path aliases (`@/...`).
- Maintain WCAG 2.2 AA, readable sizing for the senior audience, semantic headings, meaningful alt text, and keyboard accessibility.
- Preserve the existing Tailwind v4 brand tokens in `app/globals.css`.

## Required final report

Every Claude Code task must report:

1. Scope completed.
2. Files changed.
3. Source/provenance of every new article or image.
4. URLs affected and whether any shared image was touched.
5. Results of `npm run verify:paul`.
6. `git diff --check` result.
7. Current branch and `git status --short`.
8. Confirmation that no direct push to `main`, production deployment, secret handling, DNS, GSC, or unrelated redirect changes occurred.
