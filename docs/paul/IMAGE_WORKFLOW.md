# Safe image management with Claude Code

## Goal

Paul can supply replacement photographs and ask Claude Code to place, connect, test and submit them without using Sanity. This workflow does not make the website a drag-and-drop CMS: the image change is a reviewed code change.

## Current image locations

### Shared/global images

Files directly under `public/images/` are reused across the site. Examples include:

- `HeroImage.png` — homepage hero;
- `Walk-inBath.png` — shared walk-in bath fallback and several product cards;
- `AccessibleShower.png` — shared by several shower-bath products;
- `DeepSoaker.png` — shared by several deep-soaker products;
- `StandardEasy-Access.png` — shared by several standard-size products;
- `ODYSSEY_Transparent-File-2048x735.webp` — site logo/publisher logo.

Do not overwrite one of these merely to update a single product. A single replacement can change many pages.

### Product-specific images

Store new files under:

```text
public/images/products/<product-slug>/
```

Product image references are in:

- `data/walkInBaths.ts`
- `data/walkInShowerBaths.ts`
- `data/deepSoakerBaths.ts`
- `data/standardSizeBaths.ts`

Use a product-specific filename and update only that product's `primaryImage` and intended gallery entries.

### Article images

Store new files under:

```text
public/images/articles/<article-slug>/
```

Do not hotlink Wayback Machine assets. Download only an image that is complete and permitted for reuse, optimize it, commit it locally, and record its source.

### Sanity images

Existing `/blog/<slug>` posts may still load cover and body images from `cdn.sanity.io`. Do not delete Sanity assets or remove the integration until the full Sanity migration is approved and completed.

## Required input from Paul

For each change Paul should provide:

- exact page or product URL;
- which position to change: primary, gallery, hero, article cover or inline image;
- the image file;
- confirmation that Odyssey Baths has permission to publish it;
- preferred factual alt text, or enough context for Claude Code to draft one;
- preferred crop/focal subject if important.

## File requirements

- Prefer WebP or AVIF for photographs; JPG/PNG are acceptable when justified.
- Use lowercase kebab-case names, for example `serenity-75-side-view.webp`.
- Avoid spaces, dates such as `final-final`, and ambiguous names such as `IMG_1234`.
- Keep optimized web assets in Git; keep full-resolution originals outside the repository.
- New nested image assets should normally be under 2 MB. Optimize larger files before committing.
- Alt text describes what is visible and useful; do not stuff keywords.

## Claude Code procedure

1. Confirm the target URL/product and all current references to the old image.
2. Determine whether the old file is shared.
3. Create a product/article-specific directory when the change is not intentionally global.
4. Add the optimized file with a new filename.
5. Update only the intended reference and alt text.
6. If relevant, update the Open Graph or JSON-LD image using the same public asset.
7. Run `npm run verify:paul`.
8. Inspect the target and neighbouring pages in the Preview on desktop and mobile.
9. Report every URL affected and whether the old image is still referenced.

## Do not do

- Do not rename a product slug to match an image.
- Do not change canonical URLs or redirects during an image task.
- Do not replace a global fallback when only one product should change.
- Do not publish copyrighted supplier/customer photography without permission.
- Do not add image secrets, private customer files or EXIF location data.
- Do not delete the former asset until a reference search confirms it is unused and the pull request explicitly includes cleanup.

