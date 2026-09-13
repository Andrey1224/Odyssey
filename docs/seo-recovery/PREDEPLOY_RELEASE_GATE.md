# SEO Recovery Release Candidate — Pre-deployment Gate

## Commit Information
* **Recovery branch verified through:** `baac73209733191d94d7a94efeea561cbe2d3930`
* **Diff checked against:** `origin/main` at `31e526d4ae0e3c6331d36969dd0f14f97305f6dc`

## Verification Checklist

### 1. Canonical Origin (PASS)
* All indexable pages use `https://odysseybaths.co.uk`.
* No Vercel canonicals are present in the active code.

### 2. Legacy Redirects (PASS)
* **Path mappings verified:** 53 explicit checks executed (matches `REDIRECT_VERIFICATION.md` expectations).
* **Trailing-slash variants verified:** 53 checks executed (maximum 2 hops allowed).
* **Query-string variants verified:** 53 checks executed (ensuring preservation).
* Realized path mappings route to correct final URLs directly (max 1 hop).
* No redirect loops detected.
* Final response codes are strictly 200.
* Final canonical accurately reflects the destination.

### 3. Host Redirects (PASS locally)
* **Host header redirects verified:** 3 locally executed checks (`www.odysseybaths.co.uk`, `odyssey-navy-theta.vercel.app`, and `odyssey-alpha-eosin.vercel.app` — the confirmed client stable Vercel domain).
* All three yield `308` redirecting to the canonical apex `https://odysseybaths.co.uk`.
* Path and query strings are accurately preserved.
* *Note: Verification against remote Preview domains requires Vercel client access and cannot be fully validated locally without DNS overrides.*

### 3a. Confirmed Production Scheme (from Vercel dashboard, read-only)
* **Production repository:** `Odycode8/Odyssey`
* **Production branch:** `main`
* **Current production commit:** `31e526d`
* **Canonical domain:** `odysseybaths.co.uk`
* **Client stable Vercel domain:** `odyssey-alpha-eosin.vercel.app` (now covered by the host redirect above)
* **`www.odysseybaths.co.uk`:** attached to the project but currently shows **No Deployment**
* **Preview deployments:** protected by Vercel Authentication
* **Environment variables visible in the Vercel dashboard:** `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`
* **Release risk — unresolved:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and the Resend variables are **not visible** in the dashboard. Both the contact and brochure forms depend on `persistLead()` in `lib/lead-submissions.ts`, which requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to save a lead — this logic already exists in the production baseline (`31e526d`) and was not introduced or changed by the SEO recovery branch. If those two variables are absent in production, both forms will return an error and will not save the submission; this is recorded as an existing **production configuration risk**, not a SEO recovery regression. No values were read, inferred, or added.

### 4. Sitemap and Robots (PASS)
* Sitemap URLs return 200.
* Self-canonical tags match the `https://odysseybaths.co.uk` domain.
* No `noindex` attributes found on sitemap URLs.
* No redirect, 404, Vercel, or `www` URLs in the sitemap.
* Restored legacy articles are correctly listed.
* No garbage slugs present.
* No dummy `lastmod` tags artificially applied.

### 5. Restored Articles (PASS)
* Placed at their correct root URLs.
* Contain appropriate Title, Description, and H1 tags.
* Valid `BlogPosting` JSON-LD implemented, including precise historical `datePublished` and `dateModified` fields.
* The publisher logo (`ODYSSEY_Transparent-File-2048x735.webp`) is correctly referenced and available locally.
* Internal links are valid and return 200.
* No broken image links.

### 6. General Release Safety (PASS)
* Business-critical routes (lead, contact, brochure) remain intact.
* API and environment variables are undisturbed.
* No secrets were committed or printed.
* Diff contains no temporary files, archives, build output, or `.env`.

## Mandatory Pre-Production Check: Lead Forms
Both forms persist to Supabase, not to a local file: the contact form (`app/api/leads/route.ts`) calls `submitContactLead()`, the brochure form (`app/free-brochure/actions.ts`) calls `submitBrochureLeadRecord()`, and both share `persistLead()` in `lib/lead-submissions.ts`, which requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to save the submission. Resend (`RESEND_API_KEY` / `LEAD_EMAIL_TO`) is used only for an optional email notification sent after a successful Supabase save — it is not required for the lead to be saved. This dependency already exists in the production baseline (`31e526d`) and was not added by the SEO recovery branch.

Before any production release, verify — on the Preview deployment, not just locally:
- [ ] **Contact form** submits successfully and the lead is actually saved (Supabase insert succeeds), end-to-end.
- [ ] **Brochure form** submits successfully and the lead is actually saved (Supabase insert succeeds), end-to-end.
- Do **not** read, print, or log any secret/environment variable values while performing this check.
- If `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` are confirmed genuinely absent from the production environment, both forms will return an error and will not save submissions. Record that as an existing **production configuration risk** (pre-existing in `31e526d`, not a SEO recovery regression) — do not invent or add values to work around it.

## Readiness
**Status:** READY FOR PREVIEW — NEXT STAGE IS PREVIEW BRANCH DEPLOYMENT

The local implementation is complete, including the confirmed client stable Vercel host redirect. The local gate has been re-verified with 3 host-redirect checks. The production project, repository, branch, and current production commit are now confirmed (see section 3a). The next step is deploying this branch to a Preview environment (not merging to `main`) and running the lead-forms check above and `scripts/seo/verify-recovery.mjs` against that Preview URL.

## Vercel Pre-Flight Checklist
Status before deploying this branch as a Preview and, subsequently, before any production push:
- [x] **GitHub Repository:** Confirmed — `Odycode8/Odyssey`.
- [x] **Production Branch:** Confirmed — `main`.
- [x] **Current Production Commit:** Confirmed — `31e526d`.
- [ ] **Project Ownership:** Verify the Vercel project correctly owns the `odysseybaths.co.uk` domain.
- [ ] **Environment Variables:** Sanity vars confirmed visible; **`SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` visibility is an open risk** — both lead forms fail to save without them (pre-existing production dependency, not a SEO recovery change). Resend vars are optional (email notification only). Confirm presence/values are configured (without reading values here).
- [ ] **Domain Assignments:** Apex (`odysseybaths.co.uk`) attached; `www.odysseybaths.co.uk` is attached but currently shows **No Deployment** — needs resolution before relying on the `www` redirect in production.
- [ ] **www/TLS:** SSL certificates are valid for all domains.
- [ ] **Deployment Protection:** Preview deployments are currently protected by Vercel Authentication (expected for Preview); confirm this is DISABLED for the production domain only, to allow Googlebot crawling.
- [ ] **Preview URL:** Ensure preview environments do NOT leak canonical authority (e.g., they apply `x-robots-tag: noindex`).
- [ ] **Lead Forms:** Contact and brochure form submissions verified end-to-end on Preview (see checklist above).

**DO NOT PUSH TO PRODUCTION UNTIL THE PREVIEW DEPLOYMENT, LEAD-FORM SUBMISSIONS, AND REMAINING ENVIRONMENT-VARIABLE / DOMAIN ITEMS ABOVE ARE CONFIRMED.**
