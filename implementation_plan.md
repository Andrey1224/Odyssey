# Implementation Plan: Design V2 (60+ Optimized)

## Goal
Create `app/design-v2/page.tsx` by refining V1.
Focus: Reducing cognitive load, increasing readability, and prioritizing "Phone/Contact" for the 60+ demographic.

## Proposed Changes

### 1. Base Implementation
#### [NEW] [app/design-v2/page.tsx](file:///wsl.localhost/Ubuntu/home/dev/dev/repos/oddyseyweb/app/design-v2/page.tsx)
- **Start point**: Copy full code from V1.

### 2. Component Overrides (in the same file)

#### Header
- **Remove**: `isVatExempt` toggle and context (reduce complexity).
- **Add**: "Reviews" and "Contact" links.
- **Change**: Phone icon -> Large "Call Free" button.

#### Hero
- **Add**: 3 Bullet points below lead text (e.g., "Free Home Survey", "Installed in 7 Days").
- **Change**: CTA "View Brochure" -> "Request a Brochure" (Clearer action).

#### Product Grid
- **Add**: "Pricing Note" block above the grid explaining VAT relief clearly.
- **Change**: Prices in cards to "From £1,995" (Simplified).
- **Change**: CTA "View Range" -> "View Details".

#### Handing Selector
- **Change**: Visuals to "Door Hinge" diagram (using icons).
- **Add**: "Not sure? Call us on 0800..." button.

#### Footer & Typography
- **Global**: Remove italic fonts (hard to read).
- **Global**: Darken all `text-slate-500` to `text-slate-600` or `700` for contrast.
- **Footer**: Add "Opening Hours" and "Support Number" block.

## Verification
- **Visual**: Confirm no "faint" text exists.
- **UX**: Verify Phone number is the most prominent element in Header.
- **Interaction**: Verify "Left/Right" selector has a "Call us" backup option.
