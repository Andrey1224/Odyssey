# Odyssey Baths SEO Recovery — Current Handoff

**Recorded:** 13 September 2026  
**Current stage:** upstream recovery release complete; waiting for the client fork sync and client production deployment.

## Repository state

- Upstream repository: `Andrey1224/Odyssey`
- Upstream production branch: `main`
- Upstream recovery commit: `55ccd4d8dec51399e4124682dcb39b8db562f5cc`
- Local `main`: `55ccd4d`
- Local `fix/seo-migration-recovery`: `55ccd4d`
- Working tree was clean immediately after the release push.

The recovery package in this commit contains the corrected canonical origin, 53 legacy path mappings, canonical host redirects, sitemap/indexability corrections, two restored legacy articles, the verification script, and the audit/recovery documentation.

## Verification completed

The final local production build passed:

- 40 sitemap URLs
- 53 legacy path redirects
- 53 trailing-slash variants
- 53 query-string preservation checks
- 3 canonical host redirects
- 2 restored priority articles
- lint, build, and `git diff --check`

Vercel reported the upstream deployment for `55ccd4d` as successful. The immutable deployment URL was protected by Vercel Authentication, returned a `302` to Vercel login, and included `x-robots-tag: noindex`; therefore the unauthenticated remote verification script could not inspect its application responses. This is deployment protection, not evidence of an application failure.

The upstream stable hostname `odyssey-navy-theta.vercel.app` was checked after deployment and returned the expected `308` redirect to `https://odysseybaths.co.uk`, preserving path and query strings.

## Client production state before sync

- Client GitHub fork: `Odycode8/Odyssey`
- Client Vercel production branch: `main`
- Last observed client production commit: `31e526d`
- Client production domain: `odysseybaths.co.uk`
- Client stable Vercel domain: `odyssey-alpha-eosin.vercel.app`
- `www.odysseybaths.co.uk`: attached, but showed **No Deployment** before release
- Client Preview deployments: protected by Vercel Authentication
- Visible Vercel variables: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`

No client production update was confirmed at the time this handoff was written.

## Exact next action

Paul should open `Odycode8/Odyssey` in GitHub and use:

1. **Sync fork**
2. **Update branch**

This should update the client fork from upstream `main` and automatically trigger the client Vercel production deployment. If GitHub reports conflicts or offers a destructive/force action, do not proceed; capture the screen and inspect the divergence first.

## Immediate checks after client Vercel reports Ready

1. Confirm the deployment source contains the recovery package corresponding to upstream `55ccd4d`.
2. Run `node scripts/seo/verify-recovery.mjs https://odysseybaths.co.uk`.
3. Verify representative legacy URLs return permanent redirects to the intended live destinations.
4. Verify page canonicals, `robots.txt`, and `sitemap.xml` use `https://odysseybaths.co.uk`.
5. Verify both restored articles return `200`, are indexable, and appear in the sitemap.
6. Verify `odyssey-alpha-eosin.vercel.app` returns `308` to the apex domain with path/query preservation.
7. Verify `https://www.odysseybaths.co.uk` has valid TLS and returns a permanent redirect to the apex domain; confirm the former **No Deployment** state is gone.
8. Verify production is publicly accessible without Vercel authentication and does not send `noindex` to Googlebot.
9. Check contact and brochure submissions end-to-end with an agreed test lead, confirming that the lead is actually stored.
10. Record the live verification result in this recovery folder before making further SEO changes.

## Existing lead-form risk

Both contact and brochure submissions use `persistLead()` and require `SUPABASE_URL` plus `SUPABASE_SERVICE_ROLE_KEY`. These variables were not visible in the client Vercel screenshot. Without them, both forms return an error and do not save the lead. Resend variables are optional for persistence and only control the follow-up email notification.

This dependency already existed at production baseline `31e526d`; it is not a regression caused by the SEO recovery. Do not invent values. Confirm the intended lead-storage destination with the client or recover the existing Supabase configuration.

## Google Search Console follow-up

Only after the live production gate passes:

1. Resubmit or confirm `https://odysseybaths.co.uk/sitemap.xml`.
2. Inspect representative restored and redirected URLs.
3. Request indexing only for the small set of restored/canonical priority URLs where appropriate.
4. Monitor Pages, clicks, impressions, queries, and average position according to `SEO_RECOVERY_PLAN.md`.
5. Do not promise an immediate ranking return; Google must recrawl and consolidate the repaired signals.
