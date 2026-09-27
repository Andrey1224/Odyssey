# Start here, Paul

You do not need to learn Git, Vercel, Next.js or the folder structure to update photographs or recover an old article.

Open Claude Code in the Odyssey repository and describe one task in ordinary language.

## Change a photograph

Attach the photograph and write:

```text
Replace the [main/gallery/hero] photo on [exact page or product URL] with this image.
```

Claude Code will check whether the current image is shared, put the new file in the correct place, update only the requested page, run the safety checks and give you a Preview link. It will ask if it needs confirmation that Odyssey Baths may publish the image.

## Restore an old article

Write:

```text
Restore the next safe article from our recovery queue.
```

Claude Code will select the next candidate, check Wayback and the current site for duplicates, record the source and restore it only if the original material is sufficiently complete. It will not invent a missing historical article. It will run the SEO/build checks and give you a Preview link.

## What you approve

For an image, check that it is the correct photograph, crop and page.

For an article, check that the content represents Odyssey Baths accurately and that any photographs are approved for publication.

Reply `approved` only when the Preview looks correct. Claude Code will then prepare the Git commit and pull request. It must not push directly to production `main`.

If Claude Code gives you a long list of Git commands instead of doing the work, tell it:

```text
Follow the Paul interaction contract in CLAUDE.md. Handle the Git and verification steps yourself and ask me only for information or approval you cannot obtain from the repository.
```
