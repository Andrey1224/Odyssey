# Lead-Gen Code Audit: Odyssey Baths

Date: 2026-03-26  
Repo: `oddyseyweb`  
Scope: Read-only code audit of the current Next.js lead-generation site  
Method: Source review of App Router routes, components, metadata, forms, API/server actions, content structure, and non-mutating verification commands

## Status Update — 2026-03-27
This document is the original audit snapshot from 2026-03-26. It should not be read as the current implementation status by itself.

P0 pre-launch stabilization work was completed after this audit. In particular:
- Lead handling was unified behind a shared backend path with durable-first Supabase persistence in [`lib/lead-submissions.ts`](/home/dev/dev/repos/oddyseyweb/lib/lead-submissions.ts).
- Contact and brochure flows no longer use `console.log` or local JSON as the primary submit path.
- The fake quote form component was removed, and quote CTAs were consolidated onto the real contact flow.
- `href="#"` placeholders were removed from production navigation.
- `/free-quote` was removed from the sitemap.
- ESLint no longer scans `dist/**`, so the previous OOM issue is no longer the current lint status.

Still open after stabilization:
- Final custom-domain SEO switch remains pending client/domain access.
- Analytics/conversion tracking is still not implemented.
- Performance/client-boundary cleanup was not part of the P0 stabilization pass.
- The audit findings below still contain valid longer-term issues unless explicitly superseded by later status docs.

Current follow-up status is tracked in [`LEAD_GEN_STABILIZATION_STATUS_2026-03-27.md`](/home/dev/dev/repos/oddyseyweb/docs/audits-reports/LEAD_GEN_STABILIZATION_STATUS_2026-03-27.md).

Verification note added on 2026-03-27:
- `npm run build` was later confirmed passing on the local machine.
- The earlier non-conclusive build investigation should be treated as environment-specific and not as the current repository build status.

## 1. Executive Summary
This is a Next.js App Router lead-gen site for accessible baths in the UK. Its likely primary conversion goal is inbound leads via phone calls, quote requests, brochure requests, and survey/contact enquiries.

The site is commercially recognizable and already has several useful lead-gen foundations: focused service/category routes, strong phone visibility, trust-oriented messaging, JSON-LD on key pages, sitemap/robots support, and a brochure flow with real server-side validation and persistence.

The main weaknesses are not visual polish but business reliability. The biggest gaps are: inconsistent lead handling between forms, placeholder/incorrect commercial links, weak analytics readiness, hardcoded content spread across many files, and SEO fundamentals tied to a `vercel.app` domain instead of a production canonical domain.

Overall verdict: the site is directionally strong, but only partially ready as a dependable SMB lead-gen website. It is closer to a polished prototype/MVP than a production-hardened commercial lead machine.

## 2. Overall Score

Overall score: **62 / 100**

Category scores:

| Category | Score |
|---|---:|
| Architecture | 7/10 |
| Lead-gen UX | 7/10 |
| Information Architecture / Pages | 7/10 |
| Header / Navigation / Footer | 6/10 |
| Content Structure / UX | 7/10 |
| Forms / Lead Capture | 5/10 |
| SEO | 6/10 |
| Performance | 6/10 |
| Accessibility | 6/10 |
| Security / Robustness | 5/10 |
| Analytics / Business Readiness | 2/10 |
| Code Quality / Maintainability | 6/10 |

Weighted score basis:
- Architecture 15
- Lead-gen UX 15
- Information Architecture / Pages 10
- Forms / Lead Capture 15
- SEO 15
- Performance 10
- Accessibility 10
- Security / Robustness 5
- Analytics / Business Readiness 5
- Code Quality / Maintainability 10

## 3. Detailed Findings

### 1. General Architecture
**Status:** Partial  
**Score:** 7/10

**What is done well**
- Project structure is understandable at a high level: App Router pages under `app`, reusable UI under `components`, content/data helpers under `data`, `lib`, and Sanity integration under `sanity`.
- The route inventory is commercially sensible: homepage, contact, brochure, reviews, blog, FAQ, legal pages, category pages, and PDPs.
- Dynamic SEO logic exists on PDP/blog pages via `generateMetadata`, and shared schema helpers live in [`lib/schema.ts`](/home/dev/dev/repos/oddyseyweb/lib/schema.ts).

**Problems found**
- The codebase mixes hardcoded content, route composition, business copy, and stateful UI heavily across page components such as [`app/HomeContent.tsx`](/home/dev/dev/repos/oddyseyweb/app/HomeContent.tsx) and [`components/CatalogProductDetail.tsx`](/home/dev/dev/repos/oddyseyweb/components/CatalogProductDetail.tsx).
- Many major UI sections are client components even when most content is static, including homepage and large PDP rendering paths.
- There are parallel content sources: static TS data, Sanity-backed blog/settings, and local JSON lead persistence. That increases maintenance complexity.
- The repository includes build output under `dist/`, and `eslint` attempted to process a large generated file there, causing an out-of-memory failure during verification.

**Why it matters**
- This architecture is still workable at current size, but it will get harder to maintain once copy, offers, SEO variants, or local landing pages expand.
- Generated artifacts inside the repo degrade tooling reliability and developer confidence.

**Recommended fixes**
- Move generated/static build artifacts out of the lint surface and ensure `dist/` is excluded from linting if it is not source.
- Reduce `use client` scope on content-heavy pages.
- Continue consolidating content sources so non-blog marketing content is not split between many TS files and page components.

### 2. Lead-Gen Site Structure
**Status:** Partial  
**Score:** 7/10

**What is done well**
- The site clearly pushes users toward calling, requesting a brochure, or submitting a quote/contact enquiry.
- Primary CTA visibility is good on homepage and contact flows, with repeated CTA patterns in header, sticky mobile bar, reviews, brochure, and product pages.
- Trust framing is present through testimonials, warranty language, “no hard sell” messaging, VAT relief messaging, and review pages.

**Problems found**
- The homepage hero splits attention between brochure and quote instead of asserting one dominant conversion path.
- Some CTA destinations are weak or misleading: [`app/free-quote/page.tsx`](/home/dev/dev/repos/oddyseyweb/app/free-quote/page.tsx) redirects to contact, while [`app/free-quote/FreeQuoteForm.tsx`](/home/dev/dev/repos/oddyseyweb/app/free-quote/FreeQuoteForm.tsx) contains a standalone form component that is not actually routed.
- There are placeholder/support links in navigation (`VAT Relief Guide`, `Right vs Left Hand?`) using `href="#"` in [`components/Header.tsx`](/home/dev/dev/repos/oddyseyweb/components/Header.tsx).

**Why it matters**
- Conversion systems need clarity and trust. If users click dead-end or pseudo-destination links, trust drops quickly.
- Multiple overlapping enquiry paths are fine only if each one is real, measurable, and operationally reliable.

**Recommended fixes**
- Pick one primary homepage CTA and keep the secondary CTA clearly subordinate.
- Remove or complete placeholder navigation items.
- Either fully implement a dedicated quote flow or standardize on `/contact?intent=quote` everywhere.

### 3. Information Architecture and Pages
**Status:** Good  
**Score:** 7/10

**What is done well**
- The site includes the expected base pages for a lead-gen SMB site: home, about, contact, FAQ, reviews, blog, privacy policy, return policy, category listings, and product details.
- Category/service pages exist for four major product groups, which is useful for SEO and buyer intent.
- URLs are readable and route names are generally clear.

**Problems found**
- There is no dedicated Terms page even though footer navigation implies one.
- No location/service-area landing pages exist despite the site presenting itself as UK-wide; that limits local/regional SEO breadth.
- `free-quote` exists as a redirect-only route and is also listed in the sitemap, which is a weak pattern for indexable IA.

**Why it matters**
- Missing or implied-but-not-real pages reduce commercial trust and SEO completeness.
- Redirect-only pages in sitemap/indexation flows can dilute crawl quality.

**Recommended fixes**
- Add the missing Terms page or remove the footer link until it exists.
- Remove redirect-only utility routes from sitemap unless intentionally indexable.
- Consider service-area or regional intent pages if local SEO is part of acquisition strategy.

### 4. Header / Navigation / Footer
**Status:** Partial  
**Score:** 6/10

**What is done well**
- The header keeps phone CTA prominent and uses a sticky pattern that fits a lead-gen site.
- Footer includes phone, address, product links, customer care links, and legal links.
- Mobile users also get a dedicated sticky CTA bar on the homepage.

**Problems found**
- Navigation quality is undermined by placeholder `href="#"` links in both header and footer: `VAT Relief Guide`, `Right vs Left Hand?`, and `Terms of Service`.
- Header is implemented as a large client-side overlay/menu system with multiple wizard modals mounted globally, which increases JS cost on all pages.
- Business details are present, but some visible phone numbers are hardcoded inconsistently in UI instead of consistently sourcing from [`lib/site.ts`](/home/dev/dev/repos/oddyseyweb/lib/site.ts).

**Why it matters**
- Navigation is a trust surface. Dead links and inconsistent business details weaken credibility.
- Heavy header logic increases performance and maintenance cost across the whole site.

**Recommended fixes**
- Replace placeholder links with real destinations or remove them.
- Normalize displayed phone/contact details to a single source of truth.
- Consider deferring modal code or loading wizard flows only when invoked.

### 5. Content Structure and UX
**Status:** Partial  
**Score:** 7/10

**What is done well**
- The homepage generally follows a sensible commercial pattern: hero, trust, testimonials, category choice, credibility/about block, and persistent CTA support.
- Content is easy to scan in many places, especially brochure/contact experiences and catalog layouts.
- Trust language and reassurance are well integrated rather than bolted on.

**Problems found**
- Some sections are more polished than disciplined. The homepage uses animated ticker and several CTA/trust elements, but the hierarchy is not as crisp as it could be.
- Product/category pages rely heavily on generic trust claims like “4.9/5 Trustpilot”, “Made in UK”, and “10 Year Warranty” rendered in component code; these are not obviously evidenced or centrally managed.
- About/contact copy is strong but very hardcoded, making future content testing or refinement expensive.

**Why it matters**
- For lead-gen UX, clarity beats ornament. Too many competing emphasis points reduce scan efficiency.
- Hardcoded trust claims create legal/commercial risk if they drift from reality.

**Recommended fixes**
- Simplify homepage emphasis and make the main conversion path more explicit.
- Centralize trust claims so they are auditable and easier to update.
- Make core marketing blocks more content-driven.

### 6. Forms and Lead Capture
**Status:** Weak  
**Score:** 5/10

**What is done well**
- The brochure flow is the strongest implemented form path: [`app/free-brochure/BrochureForm.tsx`](/home/dev/dev/repos/oddyseyweb/app/free-brochure/BrochureForm.tsx) uses labels, correct input types, autocomplete, server-side Zod validation, error handling, honeypot support, and a success state.
- The contact form posts to a real API route with basic validation and rate limiting in [`app/api/leads/route.ts`](/home/dev/dev/repos/oddyseyweb/app/api/leads/route.ts).
- Contact and brochure flows both show reassuring success messaging and next-step framing.

**Problems found**
- The quote form component in [`app/free-quote/FreeQuoteForm.tsx`](/home/dev/dev/repos/oddyseyweb/app/free-quote/FreeQuoteForm.tsx) is not connected to backend processing. It simulates success with `setTimeout` and `console.log`, creating a silent-failure risk if ever exposed.
- Contact form validation is only minimal on the server: required fields only, no robust phone/email normalization, no schema validation, and no durable storage or integration.
- Lead destination is weak: contact API only logs to console, and brochure flow writes to local `data/leads.json`, which is not a production-grade lead pipeline.
- Success measurement, CRM/email delivery, and thank-you tracking are absent in code.

**Why it matters**
- Lead capture reliability is core business functionality. A visually good form that does not reliably deliver leads is a severe business risk.

**Recommended fixes**
- Standardize all lead forms on one real backend pattern with shared schema validation.
- Replace console/local-file persistence with durable lead delivery to CRM/email/database.
- Add explicit tracking events and thank-you conversion hooks.
- Remove dead/demo quote form code if it is not part of the real flow.

### 7. SEO Foundations
**Status:** Partial  
**Score:** 6/10

**What is done well**
- Global metadata defaults exist in [`app/layout.tsx`](/home/dev/dev/repos/oddyseyweb/app/layout.tsx).
- Many pages define route-level metadata, and PDP/blog pages use dynamic metadata with canonicals.
- `robots.ts`, `sitemap.ts`, LocalBusiness JSON-LD, Product JSON-LD, and BlogPosting JSON-LD are implemented.
- Category and PDP coverage is stronger than on many SMB brochure sites.

**Problems found**
- Canonical/source domain is set to `https://odyssey-navy-theta.vercel.app` in [`lib/site.ts`](/home/dev/dev/repos/oddyseyweb/lib/site.ts), which is not a suitable production canonical if the real brand domain is `odysseybaths.co.uk`.
- Metadata coverage is inconsistent. For example, [`app/free-brochure/page.tsx`](/home/dev/dev/repos/oddyseyweb/app/free-brochure/page.tsx) only sets a title and lacks description/canonical.
- Sitemap includes `/free-quote`, which is only a redirect route.
- Internal navigation contains placeholder links that are not crawlable destinations.
- Not all commercial claims/pages appear deeply content-rich enough to support strong long-tail SEO beyond product/blog coverage.

**Why it matters**
- Wrong canonical domain is a high-priority technical SEO issue.
- Incomplete metadata and redirect-only URLs reduce index quality and relevance signaling.

**Recommended fixes**
- Switch all canonical and metadata base settings to the real production domain.
- Complete metadata coverage for all indexable pages.
- Remove redirect-only routes from sitemap.
- Expand content depth for service/decision-stage pages where SEO matters.

### 8. Performance
**Status:** Partial  
**Score:** 6/10

**What is done well**
- The site uses `next/image` in many major surfaces, including homepage hero, blog, and product imagery.
- Fonts are loaded through `next/font`, which is generally a good baseline.
- Images often include `sizes` on key surfaces, which helps responsive loading.

**Problems found**
- Large portions of the site are client-rendered unnecessarily, including homepage and product detail UI.
- Header mounts multiple modal systems globally, increasing baseline JS cost on every page.
- The homepage includes animated ticker and sticky CTA behavior that add client-side work without obvious conversion necessity.
- Verification showed `eslint` hitting memory problems partly due to a very large generated file in `dist/static`, suggesting repository/tooling bloat.
- Real performance could not be measured from code alone; no field metrics or budget enforcement are present.

**Why it matters**
- SMB lead-gen sites win when they are fast, stable, and simple. Excess client JS and global modal logic directly threaten LCP, INP, and maintainability.

**Recommended fixes**
- Move static marketing surfaces back to server components where possible.
- Lazy-load wizard/modal code and avoid shipping all flows by default.
- Remove generated artifacts from source control/lint scope.
- Run Lighthouse/Web Vitals in staging and set a performance budget.

### 9. Accessibility
**Status:** Partial  
**Score:** 6/10

**What is done well**
- Many interactive controls use semantic buttons/links rather than clickable `div`s.
- Forms generally include labels, and brochure/contact flows use good autocomplete coverage.
- Breadcrumbs, some accordion controls, and success messaging include useful ARIA patterns.

**Problems found**
- Several image thumbnails in PDP gallery use empty `alt` values, which may be acceptable decoratively but should be deliberate and consistent.
- Some cards use an absolutely positioned full-card anchor over a nested button-like CTA in [`app/HomeContent.tsx`](/home/dev/dev/repos/oddyseyweb/app/HomeContent.tsx), which creates ambiguous interactive semantics.
- There is no evidence of systematic accessibility testing, skip links, or stronger dialog/focus management review for the many wizard modals.
- Contrast and keyboard behavior are not fully verifiable from code alone, but the modal-heavy experience creates likely focus-management risk.

**Why it matters**
- Accessibility issues hurt both compliance and conversion, especially for an older audience and users with mobility or visual constraints.

**Recommended fixes**
- Audit modal focus trapping, escape handling, and restoration explicitly.
- Remove overlapping interactive patterns where a whole-card link sits over inner CTA UI.
- Run axe/Lighthouse/manual keyboard testing and fix issues before launch.

### 10. Security and Robustness
**Status:** Partial  
**Score:** 5/10

**What is done well**
- Contact API has basic IP-based rate limiting and honeypot logic.
- Brochure form uses server-side validation with Zod.
- Sanity token usage stays server-side in [`sanity/lib/client.ts`](/home/dev/dev/repos/oddyseyweb/sanity/lib/client.ts).

**Problems found**
- Contact API uses ad hoc validation instead of shared schema validation.
- The in-memory rate limiter in [`app/api/leads/route.ts`](/home/dev/dev/repos/oddyseyweb/app/api/leads/route.ts) is not durable across serverless instances/restarts and is only a minimal anti-abuse layer.
- Lead data handling is not operationally robust: console logging and local JSON writes are not secure production data workflows.
- `dangerouslySetInnerHTML` is used for JSON-LD, which is normal for schema injection, but there is no broader evidence of centralized security review or input sanitization policy.

**Why it matters**
- Security baseline is acceptable for an MVP, not for a production lead system handling personal data.

**Recommended fixes**
- Move all form inputs onto shared schema validation.
- Use production-grade persistence/integration with logging, retries, and error reporting.
- Replace in-memory throttling with a durable edge/server solution if abuse becomes relevant.

### 11. Analytics / Tracking / Business Readiness
**Status:** Missing  
**Score:** 2/10

**What is done well**
- The site has distinct conversion surfaces that are trackable in principle: phone taps, brochure requests, contact submits, quote intent, and product interactions.

**Problems found**
- No evidence of analytics, tag manager, event tracking, call tracking, form submission events, or thank-you conversion measurement was found.
- No evidence of attribution handling or business reporting instrumentation exists in code.
- No production lead-delivery integration is present for contact flow.

**Why it matters**
- Without measurement, the site cannot be optimized as a lead-gen asset. You cannot validate which page, CTA, or form actually performs.

**Recommended fixes**
- Add analytics and event tracking for CTA clicks, form starts, form submits, phone taps, and thank-you states.
- Add source/medium/campaign capture where appropriate.
- Connect form delivery to a real operational pipeline and instrument success/failure.

**Not verifiable from code alone**
- Whether tracking is injected externally in the hosting platform or tag manager.

### 12. Code Quality
**Status:** Partial  
**Score:** 6/10

**What is done well**
- Naming is mostly understandable, and file organization is not chaotic.
- There is some useful reuse through shared footer/header/breadcrumb/catalog helpers and schema utilities.
- TypeScript coverage appears meaningful across route/data layers.

**Problems found**
- Large components contain content, logic, and layout in one file, notably homepage, contact content, and product detail.
- There is dead or misleading code around quote flow.
- Placeholder links and TODOs remain in production-facing surfaces.
- Business copy and trust claims are hardcoded in many places, increasing duplication and update risk.
- Tooling quality is impacted by generated assets in repo and a lint process that OOMs under current conditions.

**Why it matters**
- A codebase that feels fine at 10-20 pages can become brittle quickly when campaigns, landing pages, content variants, and SEO pages multiply.

**Recommended fixes**
- Break large page-level components into smaller content and behavior units.
- Remove dead/demo code and placeholder links.
- Centralize frequently reused commercial copy and claims.
- Clean lint/build scope so verification is reliable.

## 4. Critical Issues

### Critical
- **Canonical domain is wrong for SEO**: `SITE_DOMAIN` points to `https://odyssey-navy-theta.vercel.app` in [`lib/site.ts`](/home/dev/dev/repos/oddyseyweb/lib/site.ts), affecting metadata, sitemap, robots, and schema output.
- **Lead reliability is not production-safe**: contact leads only log to console in [`app/api/leads/route.ts`](/home/dev/dev/repos/oddyseyweb/app/api/leads/route.ts), while brochure leads write to local JSON in [`app/free-brochure/actions.ts`](/home/dev/dev/repos/oddyseyweb/app/free-brochure/actions.ts).

### High
- **Quote flow is inconsistent and partially fake**: `/free-quote` redirects to contact, but [`app/free-quote/FreeQuoteForm.tsx`](/home/dev/dev/repos/oddyseyweb/app/free-quote/FreeQuoteForm.tsx) simulates submission success with client-only timeout logic.
- **Placeholder navigation links remain in production UI**: header/footer contain `href="#"` links in [`components/Header.tsx`](/home/dev/dev/repos/oddyseyweb/components/Header.tsx) and [`components/Footer.tsx`](/home/dev/dev/repos/oddyseyweb/components/Footer.tsx).
- **Analytics/tracking is effectively absent**: no visible event tracking or conversion measurement was found.

### Medium
- **Too much client-side rendering on static marketing pages**: homepage/header/PDP UI ship more client logic than necessary.
- **Sitemap includes redirect-only `/free-quote` route** in [`app/sitemap.ts`](/home/dev/dev/repos/oddyseyweb/app/sitemap.ts).
- **Tooling verification is unstable**: `npm run lint` failed with Node OOM while processing large generated output.

### Low
- **Legal completeness gap**: footer links to Terms of Service, but no actual page exists.
- **Location SEO depth is limited**: no regional/service-area landing structure was found.

## 5. Quick Wins
- Replace `SITE_DOMAIN` with the real production domain and regenerate canonical outputs.
- Remove or complete all `href="#"` links.
- Remove `/free-quote` from sitemap if it remains a redirect-only route.
- Add missing metadata description/canonical to `/free-brochure` and any other thin metadata pages.
- Standardize all displayed phone numbers and contact details to the shared site config.
- Exclude generated build artifacts from linting and source review scope.
- Add basic analytics events for phone clicks, brochure submits, contact submits, and thank-you states.

## 6. Strategic Improvements
- Unify lead handling behind one production-grade submission pipeline with shared validation, durable persistence, alerting, and CRM/email integration.
- Reduce `use client` scope and lazy-load modal/wizard code so marketing pages ship less JS.
- Move hardcoded commercial copy, trust claims, and repeated CTA blocks into a structured content system.
- Expand SEO architecture with richer service-intent and regional pages if search acquisition matters.
- Introduce operational QA gates: accessibility checks, performance budgets, and a lint/build pipeline that can run reliably in CI.

## 7. Final Verdict
This project already looks and behaves more like a serious commercial site than a starter template. The main problem is not lack of pages or lack of effort; it is the gap between persuasive frontend presentation and production-grade lead-gen operations.

If the objective is “launch a credible brochure-style site,” it is close. If the objective is “run this as a dependable, measurable SMB acquisition channel,” it still needs important work on lead handling, SEO canonicals, navigation integrity, analytics, and maintainability.

## Verification Notes
- `npm run lint`: failed with Node out-of-memory while processing a very large generated file under `dist/static`.
- `npm run build`: this audit run did not confirm final build status during the original check window.
- Later follow-up on 2026-03-27 confirmed that `npm run build` passes locally; treat the original note here as historical only.
- Some items, especially runtime performance, production analytics, and external lead integrations, are **Not verifiable from code alone**.
