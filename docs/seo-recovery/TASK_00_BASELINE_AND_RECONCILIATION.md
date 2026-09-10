# Task 00 — Establish the implementation baseline

## Objective

Prove that the recovered Git repository is a safe starting point for SEO remediation and classify differences from the copied source-machine folder. Do not change application code.

## Working locations

- Git repository: `/Users/dev/Downloads/home/dev/dev/repos/oddyseyweb-git-recovered`
- Comparison-only backup: `/Users/dev/Downloads/home/dev/dev/repos/oddyseyweb`
- Expected production commit: `31e526d4ae0e3c6331d36969dd0f14f97305f6dc`
- Expected audit commit: `3e7007e4d6e13b32381fe2c420a231e6564b37f2`

## Instructions for the coding agent

1. Read completely before acting:
   - `docs/seo-recovery/README.md`
   - `docs/seo-recovery/AGENT_EXECUTION_RUNBOOK.md`
   - `docs/seo-recovery/GSC_MIGRATION_AUDIT_2026-09-08.md`
   - `docs/seo-recovery/SEO_RECOVERY_PLAN.md`
2. Confirm:
   - repository root;
   - current branch and HEAD;
   - `origin/main` commit;
   - audit commit is a descendant of production commit;
   - working tree is clean before this task.
3. Fetch remote refs without merging, rebasing, pulling, pushing, or changing `main`. Report if `origin/main` moved from the expected production commit.
4. Compare the two folders while excluding:
   - `.git`, `.next`, `node_modules`, `dist`, `.sanity`, `.agents`, `.codex`;
   - `.env`, `.env.local`, and all secret values;
   - generated caches/build artifacts;
   - `docs/seo-recovery`, because it was intentionally added to the recovered repository.
5. Classify every meaningful differing source/config/content file as:
   - carry forward;
   - production should win;
   - documentation-only;
   - generated/local-only;
   - requires owner decision.
6. Do not copy or merge any differing file. Do not inspect or output secret values. Environment review is limited to variable names from `.env.example` and code references.
7. Run dependency installation using the existing lockfile without changing dependency versions. Then run the existing lint and production build commands.
8. Create only one task artifact: `docs/seo-recovery/LOCAL_COPY_RECONCILIATION.md`, containing:
   - commit/branch verification;
   - comparison methodology and exclusions;
   - complete classified difference table;
   - lint/build results;
   - environment variable names required for later preview validation, without values;
   - recommended baseline decision and blockers.
9. Do not commit. Leave the report for technical-lead review.

## Forbidden actions

- No application-code edits.
- No copying from the backup into the Git repository.
- No access-token or secret output.
- No push, deploy, DNS/Vercel/GSC/Sanity changes, or indexing requests.
- No destructive Git or filesystem commands.

## Definition of done

- The working baseline is proven or a precise blocker is documented.
- All meaningful local-copy differences are classified.
- Lint and build results are recorded with exact failures if any.
- Only `LOCAL_COPY_RECONCILIATION.md` is uncommitted.
- The agent returns the standard completion report from the runbook.

