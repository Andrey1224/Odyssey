# Legacy content recovery runbook

## Purpose

Restore valuable WordPress-era content without changing historical URLs, fabricating material, duplicating current Sanity content, or destabilizing the ongoing SEO recovery.

The authoritative queue is `CONTENT_RECOVERY_QUEUE.csv`. Work on one URL at a time.

## Decision process

1. Confirm the URL exists in the recovery queue or add it from verified GSC/Wayback evidence.
2. Search current production routes, Sanity slugs, redirects and repository text for an equivalent page.
3. If a complete equivalent already exists, propose a direct permanent redirect instead of creating a duplicate. Redirect changes require Andrii's approval.
4. If no equivalent exists, inspect the recorded Wayback snapshot and any WordPress/hosting backup.
5. Classify source completeness:
   - `complete`: title, useful body and heading structure are recoverable;
   - `partial`: substantial material is missing or only snippets remain;
   - `missing`: no trustworthy body source;
   - `existing_equivalent`: current page satisfies the same intent.
6. Only `complete` content can proceed directly to restoration. Partial/missing content requires Paul and Andrii to choose another original source or commission a clearly new expert replacement.

## Source record

Before implementation, create:

```text
docs/seo-recovery/content-sources/<article-slug>.md
```

Copy `SOURCE_RECORD_TEMPLATE.md` and record:

- original URL and capture timestamp;
- exact archive/source URL;
- original title, description, H1, author, published/modified dates when available;
- headings/body completeness;
- original internal/external links and how broken internal links will map;
- every image source and publication-rights status;
- elements intentionally omitted and why;
- duplication check against current static and Sanity content.

The source record must not contain secrets or personal customer data.

## Implementation standard

For a queue item marked `restore_same_url`:

1. Create `app/<exact-old-slug>/page.tsx`. Keep the public root path; do not silently move it under `/blog`.
2. Reuse `components/LegacyArticleLayout.tsx` unless a reviewed shared local article system supersedes it.
3. Add `Metadata` with:
   - verified title and description;
   - `alternates.canonical` using `SITE_DOMAIN` and the exact path;
   - verified social image only when available.
4. Add `BlogPosting` JSON-LD with only verified dates/author/images. The URL must use `SITE_DOMAIN`.
5. Preserve one H1, logical H2/H3 order, useful original copy and search intent.
6. Update historical internal links to their live canonical destinations. Do not link through known redirects.
7. Put permitted local images in `public/images/articles/<slug>/`, use meaningful alt text, and never hotlink Wayback.
8. Add the exact canonical URL to `app/sitemap.ts` without a fabricated `lastModified` value.
9. Update the queue to `restored_locally`; after verified production deployment update it to `restored_production` with the commit/date in notes.
10. Update the relevant recovery report if historical priority or source evidence changed.

## Verification

Run:

```bash
npm run verify:paul
git diff --check
npm run start
```

Against the local production server confirm:

- exact URL returns 200;
- trailing-slash normalization does not create a bad destination;
- self-canonical is exactly on `https://odysseybaths.co.uk`;
- no robots `noindex` or `X-Robots-Tag: noindex`;
- valid BlogPosting JSON-LD with verified facts;
- sitemap includes the URL;
- internal links reach relevant 200 pages;
- images load with useful alt text;
- desktop and mobile layout are readable.

After merge and client-fork sync, repeat the checks against production. Request GSC indexing only when the recovery lead explicitly approves it; repeated submissions do not increase crawl priority.

## Prohibited shortcuts

- AI-generating copy and presenting it as the historical original.
- Restoring only a title and a few generic paragraphs.
- Redirecting an unrelated article to `/` or an arbitrary product page.
- Changing a historical slug for style.
- Publishing incomplete archive navigation, cookie banners or Wayback rewrite code as article content.
- Using archive URLs as production image sources.
- Removing Sanity while live Sanity routes still depend on it.
- Restoring several articles in one pull request.

