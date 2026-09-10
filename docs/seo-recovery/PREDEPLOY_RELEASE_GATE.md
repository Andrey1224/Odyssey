# SEO Recovery Release Candidate — Pre-deployment Gate

## Commit Information
* **Current Commit:** 549cc2cfb0c63b81832497054d7bfbed8fd05761
* **Diff Checked Against:** `origin/main`

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
* **Host header redirects verified:** 2 locally executed checks (`www.odysseybaths.co.uk` and `odyssey-navy-theta.vercel.app`).
* Both yield `308` redirecting to `https://odysseybaths.co.uk`.
* Path and query strings are accurately preserved.
* *Note: Verification against remote Preview domains requires Vercel client access and cannot be fully validated locally without DNS overrides.*

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

## Readiness
**Status:** READY FOR PREVIEW

## Vercel Pre-Flight Checklist
Before pushing to production, verify the following inside the Vercel Dashboard:
- [ ] **GitHub Repository:** Matches the intended Odyssey Baths repository.
- [ ] **Production Branch:** Properly configured (e.g. `main`).
- [ ] **Project Ownership:** Verify the Vercel project correctly owns the `odysseybaths.co.uk` domain.
- [ ] **Environment Variables:** All required production secrets are configured safely.
- [ ] **Domain Assignments:** Apex (`odysseybaths.co.uk`) and `www` properly attached, with `www` redirecting to Apex.
- [ ] **www/TLS:** SSL certificates are valid for all domains.
- [ ] **Deployment Protection:** Vercel Authentication / Password protection is DISABLED for the production domains to allow Googlebot crawling.
- [ ] **Preview URL:** Ensure preview environments do NOT leak canonical authority (e.g., they apply `x-robots-tag: noindex`).

**DO NOT PUSH UNTIL VERCEL PROJECT OWNERSHIP AND PRODUCTION BRANCH ARE CONFIRMED.**
