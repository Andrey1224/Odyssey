# Legacy WordPress content recovery

Status: recovery sources confirmed; no content has been republished yet.

## Feasibility conclusion

Loss of access to the WordPress admin does not prevent recovery. Moving DNS to Vercel normally changes where the domain resolves; it does not itself delete the old hosting account, database, uploads, or backups.

Even if the old hosting was cancelled, a public archive is available. A Wayback CDX check on 8 September 2026 found **60 unique archived HTML URLs** for `odysseybaths.co.uk` with successful captures between February 2024 and March 2025.

Confirmed retrievable examples:

- `https://odysseybaths.co.uk/installing-a-walk-in-bath/` — archived 15 April 2024; archived HTML retrieved successfully.
- `https://odysseybaths.co.uk/product-category/walk-in-baths/` — archived 6 March 2025; archived HTML retrieved successfully.
- `https://odysseybaths.co.uk/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk/` — archived 8 March 2025; archived HTML retrieved successfully.
- many historical products, categories, legal pages, help pages, and articles are also present in the archive inventory.

Archive calendar: `https://web.archive.org/web/*/https://odysseybaths.co.uk/*`

## Best recovery sources, in order

1. Existing hosting backup or suspended hosting account.
2. Webmaster's local backup, WordPress export, database dump, and `wp-content/uploads` archive.
3. Hosting-provider automatic backups or snapshots.
4. Internet Archive captures for page copy, headings, metadata, internal links, and some assets.
5. Search Console exports for historical URL and performance priority.
6. Current repository product data and `docs/product-specs` for product content.
7. Analytics landing-page exports, backlink data, search snippets, and client source documents for remaining gaps.

## What can probably be restored

- The public-domain canonical, sitemap, robots, redirects, and HTTPS behavior: fully controllable in the new application/platform.
- Old product and category URL continuity: high confidence because relevant new equivalents exist.
- High-value old articles: high confidence for pages with complete archive captures.
- Historical URL inventory: high confidence for the union of Search Console, Wayback, old sitemaps/backlinks, and any available backup.
- Images: variable; some may be present in Wayback, current repo, Sanity, the old host, or client files.

## What cannot be guaranteed

- An exact byte-for-byte reconstruction of pages/assets that were never archived and have no backup.
- Historical WordPress plugins, admin settings, form submissions, or database-only content without a database/hosting backup.
- Immediate or exact return to every former Google position. Google will recrawl and re-evaluate the repaired site.

The recovery target should be functional and SEO-equivalent restoration, not reconstruction of the WordPress software itself.

## Request to the previous webmaster/host

Ask the following without requesting that anything be reactivated publicly:

1. Was only DNS changed, or was the hosting account deleted?
2. Is the old hosting account suspended, retained, or within a backup-retention period?
3. Can they provide:
   - a complete site backup;
   - SQL database dump;
   - `wp-content/uploads` archive;
   - WordPress XML export;
   - old XML sitemap files;
   - redirect rules from `.htaccess` or an SEO/redirect plugin;
   - a list/export of all published posts, pages, products, categories, titles, and slugs?
4. Were any backups stored in cPanel, Plesk, UpdraftPlus, ManageWP, hosting snapshots, cloud storage, or locally?

## Practical recovery order

1. Implement the canonical/domain repair and known exact redirects without waiting for WordPress access.
2. Obtain the old backup if it exists; it is the highest-quality content source.
3. Build the full URL inventory by merging Search Console and Wayback.
4. Restore the highest-impression archived articles first.
5. Recover images from the old host/client/archive where possible; use appropriate replacements only when necessary.
6. Validate restored pages against their historical search intent, metadata, headings, and internal links.
7. Add the restored canonical URLs to the corrected sitemap and monitor reindexing.


## Restoration Status (2026-09-10)

The two highest-priority informational articles have been restored locally from Wayback Machine snapshots:
- `/installing-a-walk-in-bath/` (Snapshot: 20240415115910)
- `/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk/` (Snapshot: 20250308065003)

These have been restored directly at their root paths, added to the static Next.js sitemap, and populated with authentic JSON-LD and content from the snapshots without requiring Sanity configuration. Images from the old domain were intentionally omitted to guarantee safety unless they exist in the new local structure. They are awaiting production deployment.
