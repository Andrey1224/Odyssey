# Responsibility assessment: WordPress-to-Next.js SEO migration

Date: 8 September 2026  
Purpose: distinguish technical causation, contractual scope, client dependencies, and launch-process responsibility.

## Bottom line

This is **not accurately described as entirely the developer's fault**. It is a shared migration and launch-control failure with two different categories:

1. The production canonical remaining on the Vercel hostname is a developer/release implementation miss once the custom domain went live.
2. The absence of a complete WordPress redirect/content-preservation plan is a shared scope and migration-process gap. Redirect configuration belongs to development, but it depends on a legacy URL/content inventory, ownership decision, access, and an explicit migration-SEO deliverable that the formal Phase 1 SOW did not contain.

The developer is not blameless. If the developer personally approved or performed the final domain launch, the known deferred domain switch and pre-launch SEO validation should have been completed before launch. However, the repository also shows that these tasks were explicitly deferred pending domain access, while full legacy SEO migration was not part of the signed Phase 1 deliverables.

## Evidence from the agreed scope

The formal Phase 1 SOW promises an “SEO Foundation” consisting of:

- semantic HTML and performance-first implementation;
- metadata titles/descriptions;
- Product and LocalBusiness schema.

It also includes Vercel deployment with domain connection and lists client DNS access as a client requirement.

The formal SOW does **not** explicitly include:

- SEO migration management;
- Search Console/Analytics analysis;
- a historical WordPress URL crawl/export;
- a one-to-one legacy redirect map;
- migration of the historical blog;
- preservation of historical rankings or traffic;
- post-launch SEO monitoring.

References: `../../docs/architecture-specs/SowPhase1.md:9`, `../../docs/architecture-specs/SowPhase1.md:26`, `../../docs/architecture-specs/SowPhase1.md:27`, `../../docs/architecture-specs/SowPhase1.md:42`.

## Evidence from internal project instructions and checklists

The pre-launch task explicitly states that:

- the custom domain was not yet connected because access/DNS had not been supplied;
- the Vercel URL was temporary;
- the final canonical/domain SEO configuration was a pending client dependency, not then considered an implementation defect;
- final-domain work was P2 and should not be implemented without domain access;
- a checklist should be prepared for `SITE_URL`, `metadataBase`, canonical, sitemap, robots, schema, and post-domain checks.

References: `../../TASK.md:6`, `../../TASK.md:9`, `../../TASK.md:70`, `../../TASK.md:74`, `../../TASK.md:95`.

The stabilization status later recorded the final custom-domain canonical/metadata switch as still open and blocked by domain access. It also recorded post-domain checks for metadataBase, sitemap, robots, and schema as still pending.

References: `../../docs/audits-reports/LEAD_GEN_STABILIZATION_STATUS_2026-03-27.md:32`, `../../docs/audits-reports/LEAD_GEN_STABILIZATION_STATUS_2026-03-27.md:39`.

The project context separately warned that changing URL structure requires a 301 redirect map and that blog content produced SEO traffic. This shows the risk was known, but it was not converted into an executed launch gate.

Reference: project context lines 296–311 in `Odyssey_Full_Context.md`.

The Sanity audit recommended a redirect schema, middleware, canonical-only sitemap, and a migration checklist. The final implementation contains only limited previous-slug handling inside `/blog/[slug]`; the general redirect layer was not implemented.

References: `../../docs/audits-reports/SANITY_AUDIT_CODEX.md:185`, `../../docs/audits-reports/SANITY_AUDIT_CODEX.md:225`, `../../app/blog/[slug]/page.tsx:92`.

## What was delivered correctly within Phase 1

- The main site, categories, product pages, lead flows, and responsive application were implemented.
- Metadata infrastructure exists.
- Product, LocalBusiness, and BlogPosting JSON-LD helpers exist.
- robots.txt and sitemap generators exist.
- A blog/Sanity integration was delivered even though the original Phase 1 SOW did not list a blog.
- Limited legacy blog ID/slug redirect behavior exists within `/blog/[slug]`.
- The project documentation explicitly disclosed that final-domain SEO switching remained open.

This means the failure is not “the whole website was built incorrectly.” It is concentrated in launch configuration, legacy URL continuity, and content migration.

## Responsibility matrix

| Finding | Technical ownership | Scope/dependency evidence | Fair assessment |
|---|---|---|---|
| Vercel hostname remained canonical after public launch | Developer or whoever owned the final production release | Explicitly deferred until domain access; still marked open | Developer/release miss if domain availability and launch were known; shared if another party connected/switched the domain without a handoff |
| Sitemap and robots advertise Vercel hostname | Developer/release owner | Same deferred final-domain checklist | Same responsibility as canonical switch |
| No general WordPress redirect map | Development implements; client/site owner supplies/approves legacy inventory and content decisions | Not explicit in formal SOW, but internal context warned it was necessary | Shared scope/process gap; developer should have raised/block-launched it, but cannot complete it reliably without old-site data and an approved migration scope |
| Old product/category URLs return 404 | Development implementation | Exact replacements can be inferred from the new catalogue | Stronger developer-side miss once a URL-changing migration was accepted |
| Old articles were removed/not migrated | Client/content owner + migration owner + developer | Blog migration not in original SOW; historical content/source inventory not supplied in the inspected repo | Shared; not solely developer responsibility |
| `www` TLS certificate invalid | Domain/Vercel administrator | DNS access explicitly a client requirement | Responsibility follows whoever controlled domain/Vercel setup and validation |
| Test/incomplete blog URLs in sitemap | Developer + CMS editor/content owner | Blog/Sanity was an extra implementation | Shared content-QA/release-QA issue |
| No post-launch GSC/Analytics monitoring | Whoever owned SEO/maintenance after launch | Analytics remained open; managed monitoring was an optional care plan; access was unavailable | Not automatically included in development responsibility |

## The specific developer mistake

The defensible developer-side statement is:

> The site was built with a temporary Vercel origin by design while the real domain was unavailable. When the real domain went live, the deferred production-domain switch and legacy URL migration checks were not completed. I should have required those items as a launch gate before considering the migration finished.

This is more accurate than either extreme:

- “I did nothing wrong” — false, because production canonical and redirect behavior should have been validated.
- “I ruined everything and it is completely my fault” — also false, because the SOW did not include full SEO migration, access/data dependencies were documented, content decisions were external, and no single launch owner closed the outstanding checklist.

## Process failure that allowed the issue

The repository contains warnings and open-item notes, but no evidence of a completed, signed-off final-domain launch checklist. The core process gap was:

1. temporary domain configuration was intentionally left in code;
2. custom-domain connection was treated as an external future event;
3. no named owner was recorded for closing the deferred SEO tasks;
4. no “do not launch until” check enforced canonical, redirects, sitemap, HTTPS, and Search Console validation;
5. historical WordPress URLs/content were not inventoried and approved before the switch;
6. post-launch monitoring did not catch the gradual deindexing before the 27 July cliff.

## Recommended client-facing position

Use transparent ownership without accepting inaccurate total blame:

> The new site launched and initially retained broadly stable search visibility. A delayed indexing issue developed when Google recrawled the migration. We found that the final custom-domain SEO switch and the legacy WordPress URL mappings were not completed at launch. The domain switch had been documented as pending access, and the full historical SEO migration was outside the original Phase 1 scope, but I should still have treated both as a launch gate once the domain went live. There is no Google penalty or security issue, and we now have a prioritized recovery plan with measurable checks.

## Evidence still needed for a final contractual conclusion

Before assigning legal or commercial responsibility, review:

- emails/messages showing who decided the go-live date;
- who connected the custom domain and whether the developer was notified;
- whether WordPress admin/export, old sitemap, GSC, and Analytics access were supplied;
- any promise to “preserve SEO/rankings” outside the repository SOW;
- who owned content migration and whether the client approved removing old articles;
- whether the optional maintenance/monitoring plan was purchased.

Those records may shift responsibility, but the technical findings above will remain the same.
