# Claude Code task templates

Copy one template, fill in the brackets, and give it to Claude Code. Do not combine the two templates in one task.

## Replace or add product/site images

```text
Read CLAUDE.md and docs/paul/IMAGE_WORKFLOW.md completely before acting.

Task: update images for [EXACT PAGE OR PRODUCT URL].
Image position: [PRIMARY / GALLERY / HERO / ARTICLE COVER / INLINE].
Supplied files: [FILENAMES OR PATHS].
Publication rights confirmed by Paul: [YES].
Desired factual alt/context: [TEXT].

Start read-only: identify every current use of the existing image and tell me whether it is shared. Work on a new images/<scope> branch from synced upstream main. Do not overwrite shared/global images for a single-product change. Put product-specific files under public/images/products/<product-slug>/ and article images under public/images/articles/<article-slug>/.

Do not change URLs, slugs, redirects, SEO copy, product claims, prices, unrelated files, Vercel, DNS, GSC, Sanity settings or secrets. Optimize web assets and remove sensitive EXIF metadata when present.

Run npm run verify:paul and git diff --check. Show affected URLs, files, image provenance, whether any shared image changed, and git status. Do not commit or push until I approve the diff. After approval, commit and push only the feature branch and open a PR to Andrey1224/Odyssey:main; never push directly to main.
```

## Restore one legacy article

```text
Read CLAUDE.md, docs/seo-recovery/CONTENT_RECOVERY_RUNBOOK.md, docs/seo-recovery/CONTENT_RECOVERY_QUEUE.csv, docs/seo-recovery/WAYBACK_URL_INVENTORY_2024-2025.csv and docs/seo-recovery/REDIRECT_MAP_DRAFT.csv completely before acting.

Task: investigate and, only if the original source is sufficiently complete, restore this one legacy article:
[EXACT OLD URL]

Work on a new content/<slug> branch from synced upstream main. First compare the old URL with all current static and Sanity URLs to prevent duplication. Locate the verified Wayback snapshot or another approved original source. Record the source timestamp, original metadata, dates, author, headings, body completeness, links and available images in a new source record based on SOURCE_RECORD_TEMPLATE.md.

Do not invent missing historical text, claims, dates, author, images or metadata. Do not publish a thin placeholder. If source completeness is insufficient, update only the source record/queue with evidence and stop without creating a public route.

If restoration is safe, preserve the queue's exact public path, add an apex self-canonical, authentic metadata, BlogPosting JSON-LD, internal links to live canonical destinations, local permitted images with alt text, and the sitemap entry. Do not edit unrelated redirects or remove Sanity.

Run npm run verify:paul and git diff --check. Start a local production server and verify 200, canonical, no noindex, JSON-LD, sitemap inclusion, desktop and mobile rendering. Report provenance, completeness, omissions, affected URLs and git status. Do not commit or push until I approve the diff. After approval, commit and push only the feature branch and open a PR to Andrey1224/Odyssey:main; never push directly to main.
```

