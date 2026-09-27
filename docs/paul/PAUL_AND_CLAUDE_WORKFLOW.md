# Paul + Claude Code safe workflow

This is the day-to-day process for two approved task types:

1. replace or add website images;
2. restore one verified legacy article at a time.

It is intentionally designed so that unfinished work creates a Preview rather than changing the production website.

## What Paul actually has to do

Paul can use normal language. Two examples are enough:

```text
Replace the main product photo on [URL] with this attached image.
```

```text
Restore the next safe article from our recovery queue.
```

Claude Code reads the repository instructions, inspects the current state, asks only for genuinely missing information, and handles the technical workflow. Paul normally needs to do only three things:

1. provide the photo or approve the article source;
2. look at the Preview link Claude Code returns;
3. say whether it looks correct.

The remaining sections describe what Claude Code does automatically. They are not a list of commands Paul must execute.

## Roles

- **Paul** supplies or approves content and images and reviews the Preview.
- **Claude Code** performs the scoped repository work and runs checks.
- **Andrii** reviews SEO/technical changes and approves the upstream pull request.
- **Vercel Preview** is the visual test environment. Production updates only after approval and merge.

## Before every task

Claude Code must automatically:

1. Read `CLAUDE.md` and the relevant workflow document.
2. Show:

   ```bash
   git remote -v
   git branch --show-current
   git status --short
   git log -3 --oneline
   ```

3. Confirm that the working tree is clean.
4. Sync the fork's `main` from `Andrey1224/Odyssey:main`.
5. Create a new branch:
   - `images/<short-scope>` for photographs;
   - `content/<article-slug>` for one restored article.

If there are unknown local changes, conflicts, a detached HEAD, or uncertainty about the upstream repository, Claude Code must stop before editing.

## Work and review cycle

1. Paul gives Claude Code one task using `CLAUDE_TASK_TEMPLATES.md`.
2. Claude Code changes only the files needed for that task.
3. Claude Code runs:

   ```bash
   npm run verify:paul
   git diff --check
   git status --short
   ```

4. Claude Code explains every affected public URL and shows the diff summary.
5. After Paul's approval of the proposed diff, Claude Code commits and pushes the feature branch to Paul's fork.
6. Claude Code opens a pull request from Paul's branch to `Andrey1224/Odyssey:main` when GitHub authentication is available.
7. Claude Code waits for GitHub checks and returns the pull-request and Vercel Preview links.
8. Paul visually checks desktop and mobile. Andrii checks SEO-sensitive changes.
9. Andrii merges the pull request.
10. Claude Code fast-forward syncs Paul's fork `main` after the upstream merge when authenticated and safe. The client Vercel project then deploys the approved commit. If authentication is unavailable, Claude Code asks Paul for only the single required GitHub action.

Never push a task branch directly to either repository's `main`.

## Preview acceptance

Every Preview must be checked for:

- intended page loads without errors;
- header, footer and navigation still work;
- desktop and mobile layout;
- no stretched, cropped or blurry important image;
- meaningful alt text;
- no unexpected page or product changed;
- no accidental draft text, TODO, test content or broken link;
- canonical URL still uses `https://odysseybaths.co.uk`;
- forms remain out of scope unless the task is specifically about forms.

## Stop conditions

Stop and ask Andrii before continuing if the task would:

- change a public URL or slug;
- edit `next.config.ts`, `app/sitemap.ts`, `app/robots.ts` or `lib/site.ts` outside an approved article restoration;
- remove Sanity or its environment variables;
- publish content whose source cannot be verified;
- replace a shared image used by several pages;
- add a secret or customer data to Git;
- require a force push, conflict resolution on `main`, DNS, GSC or Vercel domain changes.

## Recovery and rollback

- An unmerged branch can simply remain unmerged; production is unchanged.
- A bad Preview should be fixed on the same feature branch.
- A production regression should be reverted through a new reviewed commit or Vercel's known-good deployment. Do not rewrite shared Git history.
- Record completed content recovery in the recovery queue and source record so work is not repeated.
