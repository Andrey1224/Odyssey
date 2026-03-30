# Lead-Gen Stabilization Status

Date: 2026-03-27  
Repo: `oddyseyweb`  
Purpose: current implementation status after P0 pre-launch stabilization

## Summary
This document is the current status reference for launch-readiness work.  
It supersedes the P0 portions of the 2026-03-26 audit where implementation has already changed.

Primary outcome:
- The site no longer relies on fake quote UX or split lead persistence patterns.
- Real lead flows now share one backend contract and durable-first persistence design.
- Build readiness is now confirmed locally.
- Remaining open work is mostly external setup, analytics, and non-P0 cleanup.

## Completed
- Shared lead backend added in [`lib/lead-submissions.ts`](/home/dev/dev/repos/oddyseyweb/lib/lead-submissions.ts).
- Contact flow now submits through the shared lead service via [`app/api/leads/route.ts`](/home/dev/dev/repos/oddyseyweb/app/api/leads/route.ts).
- Brochure flow now submits through the same shared lead service via [`app/free-brochure/actions.ts`](/home/dev/dev/repos/oddyseyweb/app/free-brochure/actions.ts).
- Lead validation is server-side for both real form flows.
- Durable storage contract is Supabase-first; setup SQL is in [`SUPABASE_LEAD_SUBMISSIONS.sql`](/home/dev/dev/repos/oddyseyweb/docs/api-integrations/SUPABASE_LEAD_SUBMISSIONS.sql).
- Optional notification hook is implemented for Resend and does not block persistence.
- Fake quote form component was removed from [`app/free-quote/FreeQuoteForm.tsx`](/home/dev/dev/repos/oddyseyweb/app/free-quote/FreeQuoteForm.tsx).
- Quote CTAs now resolve to the real route `/contact?intent=quote`.
- Handing CTA path now resolves to `/contact?intent=handing&handing=...`.
- `href="#"` placeholders were removed from production header/footer UI.
- `/free-quote` was removed from [`app/sitemap.ts`](/home/dev/dev/repos/oddyseyweb/app/sitemap.ts).
- Touched contact data was centralized further in [`lib/site.ts`](/home/dev/dev/repos/oddyseyweb/lib/site.ts).
- ESLint now ignores `dist/**`, removing the earlier OOM verification problem.

## Open
- Analytics/conversion tracking is still not implemented.
- Final custom-domain canonical/metadata switch is still pending.
- `free-brochure` metadata is still minimal and has not been expanded yet.
- Wider client/server boundary cleanup and performance optimization were not part of this pass.
- Some business/contact data may still be hardcoded outside the touched launch-critical flows.

## Blocked By Client / Domain Access
- Supabase account access or project invite from client so the durable persistence chain can be completed and verified end-to-end
- Runtime Supabase credentials if they are provisioned outside shared project access:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Final custom domain connection
- Final canonical domain switch
- Final branded sender domain for email
- Final post-domain checks for metadataBase, sitemap, robots, schema, and sender identity

## Waiting On Others
- Waiting on client to provide Supabase login/invite so we can complete real persistence verification
- Waiting on another party to provide the information/access needed for final domain connection
- Until those arrive, remaining work is limited to external setup follow-through, optional analytics work, and documentation updates

## Verification Status
- `npm run lint`: passes cleanly
- `npm run build`: confirmed passing locally on 2026-03-27
  - local result completed successfully through compile, typecheck, page data collection, static page generation, and final optimization
  - dynamic product routes and blog SSG routes were included in the final route output
  - prior non-passing build investigation should be treated as environment-specific, not as the current repo status
- Build-debug note:
  - a sandboxed investigation environment previously failed to resolve `fonts.googleapis.com` for `next/font/google` in [`app/layout.tsx`](/home/dev/dev/repos/oddyseyweb/app/layout.tsx)
  - that behavior did not reproduce on the real local machine where the build completed successfully

## Environment / Setup Needed
- Required for durable lead capture:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Optional for notifications:
  - `RESEND_API_KEY`
  - `LEAD_EMAIL_TO`
  - `LEAD_EMAIL_FROM`

## Related Docs
- Original audit snapshot: [`LEAD_GEN_CODE_AUDIT_2026-03-26.md`](/home/dev/dev/repos/oddyseyweb/docs/audits-reports/LEAD_GEN_CODE_AUDIT_2026-03-26.md)
- Resend setup: [`RESEND_SETUP.md`](/home/dev/dev/repos/oddyseyweb/docs/api-integrations/RESEND_SETUP.md)
- Supabase table setup: [`SUPABASE_LEAD_SUBMISSIONS.sql`](/home/dev/dev/repos/oddyseyweb/docs/api-integrations/SUPABASE_LEAD_SUBMISSIONS.sql)
