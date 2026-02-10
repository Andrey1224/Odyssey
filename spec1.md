Это подробная **техническая спецификация (Frontend Spec)** для разработки главной страницы Odyssey Baths.

Этот документ написан на языке фронтенд-разработки. Вы можете скопировать его и передать разработчику (или использовать сами), чтобы получить предсказуемый результат, соответствующий нашей стратегии "Ethical & Accessible".

---

# 📑 Frontend Specification: Odyssey Baths (Homepage)

**Version:** 1.0 (Phase 1: Lead Gen)
**Target Audience:** UK Seniors (65+) & Their Families
**Key UX Goal:** Trust, Clarity, Accessibility (WCAG 2.2 AA Compliance)
**Tech Stack:** Next.js (App Router), Tailwind CSS, Lucide React (Icons), Sanity CMS (optional for content).

---

## 1. Global Design System (Tailwind Config)

Перед началом верстки необходимо настроить `tailwind.config.js`. Мы не используем стандартные цвета, мы используем палитру "Accessible Spa".

### 🎨 Colors (Semantic Tokens)

* **Background:** `bg-cream-50` -> `#FAFAF9` (Warm Stone, never pure white #FFFFFF to avoid glare).
* **Surface (Cards):** `bg-white` -> `#FFFFFF` (Only inside cards/sections).
* **Primary Text:** `text-slate-900` -> `#0F172A` (High contrast, almost black).
* **Secondary Text:** `text-slate-600` -> `#475569` (Legible grey, minimum contrast 4.5:1).
* **Brand/Action:** `bg-teal-700` -> `#0F766E` (Medical but calming).
* **Brand Hover:** `bg-teal-800` -> `#115E59`.
* **Accent (VAT/Attention):** `text-orange-700` -> `#C2410C` (Darker orange for readability).
* **Border/Divider:** `border-slate-200` -> `#E2E8F0`.

### 🔠 Typography (Accessibility First)

* **Font Family:**
* Headings: `Merriweather` (Serif) — for "Authority & Trust".
* Body: `Inter` or `Plus Jakarta Sans` (Sans-Serif) — for readability.


* **Base Size (Body):** **20px** (Mobile: 18px). *This is non-negotiable for 65+.*
* **Line Height:** `leading-relaxed` (1.6) minimum.

### 📐 Spacing & Layout

* **Container:** `max-w-7xl` (1280px) centered.
* **Padding:** `px-6` (24px) mobile, `px-8` desktop.
* **Touch Targets:** All interactive elements must be min **48px** height.

---

## 2. Global State Requirements

**Feature: VAT Relief Toggle**

* **Logic:** A global boolean state `isVatExempt` (default: `true`).
* **Behavior:**
* When `true`: Display price as **£X,XXX** (ex. VAT). Show badge "Save 20%".
* When `false`: Display price as **£X,XXX** (inc. VAT).


* **Implementation:** Use React Context or Zustand. State must persist across pages during the session.

## 2.1 Data Models (TypeScript Interfaces)
*Developer Note: Please strictly adhere to these interfaces when fetching data from Sanity.*

// Product Interface
interface Product {
  id: string;
  title: string; // e.g., "The Liberty Walk-in Bath"
  slug: string;
  priceExVat: number; // e.g., 1995 (Main price)
  priceIncVat: number; // e.g., 2394 (Derived or explicit)
  features: string[]; // List for Bento Grid cards
  category: 'walk-in' | 'soaker' | 'shower' | 'standard';
  thumbnail: Image; // Sanity Image Object
}

// Global State Interface (Zustand/Context)
interface GlobalState {
  isVatExempt: boolean; // Toggles price display globally
  toggleVat: () => void;
  selectedHanding: 'left' | 'right' | null; // For the configurator
}

---

## 3. Section-by-Section Specification

### A. Sticky Header (Navigation)

* **Position:** `sticky top-0 z-50`.
* **Styling:** White background, subtle bottom border (`border-slate-200`), shadow-sm.
* **Layout (Flexbox):**
1. **Left:** Logo (SVG, Alt text: "Odyssey Baths - Accessible Bathing").
2. **Center (Desktop):** Links: *Walk-in Baths, Showers, About Us*. Font size 18px, weight Medium.
3. **Right:**
* **Phone Block:** Icon (Phone) + Text "**0800 123 4567**" (Size 20px, Bold).
* **Subtext:** "Mon-Fri • No Robots" (Size 14px).
* **Mobile:** Only Logo and "Call" button visible. Hamburger menu for links.





### B. Hero Section (Split Layout)

* **Background:** `bg-cream-50`.
* **Grid:** 1 column (Mobile) -> 2 columns (Desktop 50/50).
* **Content (Left):**
* **Tagline:** "UK's Ethical Bathing Experts" (Uppercase, tracking-wide, text-sm, text-teal-800).
* **H1:** "Rediscover Your Independence." (Serif, text-4xl mobile / 6xl desktop).
* **Lead:** "Safe, easy-access baths tailored to your home. **No hard sell**, just expert advice." (Text-xl).
* **CTAs (Flex Row):**
1. *Primary:* "Get Free Quote" (Teal bg, White text, rounded-xl, h-14).
2. *Secondary:* "View Brochure" (White bg, Slate text, Border-2, h-14).




* **Visual (Right):**
* Image of elderly person *relaxing* (not struggling).
* **Overlay Badge:** Floating card "✅ VAT Exempt Available" anchored to the bottom-left of the image.



### C. Trust Indicators (The "Bar")

* **Styling:** `bg-teal-50` (Light Teal), padding `py-8`.
* **Layout:** 3-column grid (Desktop) / Vertical stack (Mobile).
* **Items:** Icon + Bold Title + Small description.
1. **Shield Icon:** "No Hard Sell Guarantee" (We advise, we don't push).
2. **UK Map Icon:** "Nationwide Installation" (Local experts).
3. **Check Icon:** "VAT Relief Handled" (We do the paperwork).



### D. Product Navigator (Bento Grid)

* **Container:** `max-w-6xl`.
* **Grid:** `grid-cols-1 md:grid-cols-2 gap-6`.
* **Cards (4 Items):**
* *Walk-in Baths*, *Deep Soaker*, *Showers*, *Standard Easy-Access*.


* **Card Anatomy:**
* `bg-white`, `rounded-2xl`, `border border-slate-200`.
* **Hover State:** `hover:shadow-xl hover:border-teal-500 transition-all duration-300`. (Critical for feedback).
* **Image:** Top 50% height. Object-cover.
* **Content:**
* H3 Title (Bold, 24px).
* Short desc (2 lines max).
* Link: "View Range →" (Teal, Bold).





### E. "The Handing" Educational Block (Interactive)

* **Goal:** Prevent returns by explaining Left/Right hand.
* **Layout:** Text Center + Interactive Toggle.
* **Interaction:**
* Question: "Where is the corner in your bathroom?"
* **Visual Toggle:** Two clickable images side-by-side.
* [Image A: Corner Left] [Image B: Corner Right].


* **Action:** Clicking highlights the image with a thick Teal border (4px) and displays text: *"You need a Left Hand Bath"*.



### F. Ethical Promise Block

* **Styling:** `bg-white`, `border-y-4 border-teal-600` (Left accent).
* **Typography:** Centralized, Serif font for the quote.
* **Content:**
* Large Quote: *"We are against hard sell tactics. We treat you with respect."*
* Signature/Name: "Paul Tierney, Founder".



### G. Footer (Trust & Legal)

* **Background:** `bg-slate-900` (Dark theme for footer).
* **Text:** `text-slate-300` (High contrast against dark).
* **Columns:**
1. **Contact:** Physical Address (Street, City, Postcode), Landline Number.
2. **Quick Links:** Products, About, Blog.
3. **Legal:** Privacy Policy, Terms, Returns Policy.
4. **Badges:** "Made in Britain", "Visa/Mastercard", "SSL Secure".

### H. Navigation & User Flow Logic
Since there is NO cart, use URL Parameters to pass context between pages.

1.  **From Grid to Product Page:**
    * Link: `/baths/[slug]`

2.  **From Product Page to Enquiry Form (Wizard):**
    * Button: "Get Quote"
    * Action: Navigate to `/enquiry?product=deep-soaker&handing=left`
    * *Result:* The Contact Form on the next page must read these URL params and pre-fill the "Interested In" field.

3.  **"Will it fit?" Flow:**
    * Button: "Will it fit my bathroom?"
    * Action: Open Modal or navigate to `/guide/measurement-check`



---

## 4. Accessibility (A11y) & Interaction Rules

*These are strict requirements for the developer.*

1. **Focus States:** All interactive elements (buttons, links, inputs) must have a visible `focus-visible:ring-4 focus-visible:ring-teal-300` outline for keyboard navigation.
2. **No Timeouts:** Do not use auto-advancing carousels. Users read at different speeds.
3. **Font Scaling:** All font sizes must use `rem` units to respect user's browser font size settings (100%, 125%, 150%).
4. **Contrast:** Ensure all text passes AAA contrast (7:1) where possible, minimal AA (4.5:1).
5. **Click Areas:** Add `p-4` or similar padding to small links to ensure the clickable area is at least 44x44px.
6.  **Loading States (Skeletons):**
    * Never use a spinning loader for the whole page.
    * Use "Skeleton Screens" (gray pulsing boxes) for the Product Grid while data is fetching. This reduces cognitive load.

7.  **Form Feedback:**
    * Success: If the form is sent, do NOT just show a small "Sent" message. Redirect to a dedicated `/thank-you` page with a large green checkmark and text: "We have received your request. Paul will call you shortly."
    * Error: Errors must be described in text next to the field (e.g., "Please enter your phone number"), not just a red border.

---

## 5. Assets Required (Checklist)

* [ ] **Logo:** SVG format (Horizontal version).
* [ ] **Hero Image:** High-res (WebP), showcasing comfort/lifestyle.
* [ ] **Product Thumbs:** 4 images for Bento Grid (Uniform aspect ratio, e.g., 4:3).
* [ ] **Diagrams:** Simple line drawings for "Left Hand" vs "Right Hand" walls.
* [ ] **Icons:** Use `lucide-react` (Shield, Phone, MapPin, CheckCircle).

---

## 6. Developer Handoff Note

> "Please prioritize **layout stability** (no layout shift/CLS) and **font readability**. This site is for elderly users; if it looks 'too big' to you on a standard monitor, it's probably correct for them. Do not use pure black (#000) or pure white (#FFF) for large areas."