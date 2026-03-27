# Sanity Coverage Audit: Odyssey Baths

**Date:** February 24, 2026
**Project:** Odyssey Baths (Next.js App Router)
**Objective:** Map all hardcoded content to Sanity CMS schemas for a full "no-code" client handover.

## 1. Site Structure & Content Sources

The following table maps the current application structure to its data sources.

| Route / Section | Dynamic? | Current Data Source | Content Type |
| :--- | :--- | :--- | :--- |
| `/` (Home) | No | `app/HomeContent.tsx` | Hero text, Features, Trust signals |
| `/about` | No | `app/about/page.tsx` | Mission statement, Company history, Values |
| `/contact` | No | `app/contact/ContactContent.tsx` | Form labels, Office hours, Phone/Email |
| `/blog` | Yes | `data/blogPosts.ts` | Article list, Categories |
| `/blog/[slug]` | Yes | `data/blogPosts.ts` | Full article content (Rich Text needed) |
| `/walk-in-baths` | Yes | `data/walkInBaths.ts` | Product catalog (PLP), Filters |
| `/walk-in-baths/[id]` | Yes | `data/walkInBaths.ts` | Product details (PDP), Specs, Gallery |
| `/deep-soaker-baths` | Yes | `data/deepSoakerBaths.ts` | Product catalog (PLP) |
| `/standard-size-baths`| Yes | `data/standardSizeBaths.ts`| Product catalog (PLP) |
| `/walk-in-shower-baths`| Yes| `data/walkInShowerBaths.ts`| Product catalog (PLP) |
| `/faq` | No | `components/FAQSection.tsx` | Questions & Answers list |
| `/reviews` | No | `components/Testimonials.tsx` | Customer testimonials list |
| `/privacy-policy` | No | `app/privacy-policy/PrivacyPolicyContent.tsx` | Legal text (long-form) |
| `/return-policy` | No | `app/return-policy/ReturnPolicyContent.tsx` | Legal text (long-form) |
| `/free-brochure` | No | `app/free-brochure/BrochureForm.tsx` | Form steps, confirmation text |
| **Global/Footer** | N/A | `lib/site.ts`, `components/Footer.tsx` | Phone, Email, Address, Social Links |

---

## 2. Sanity Coverage Map

This table defines what *should* be moved to Sanity and the priority level.

| Route / Section | What to Move to Sanity | SEO Fields Needed | Recommended Schema | Priority | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Global Settings** | Site Title, Phone, Email, Address, Social Links, Logo | Default Meta Title, Description, OG Image | `siteSettings` (Singleton) | **P0** | Central place for client contact info. |
| **Products** | Title, Price (Ex VAT), Images, Specs, Highlights, Stock Status, VAT Rules | Meta Title, Description, Canonical | `product` (Document) | **P0** | Critical for business logic. Needs strict validation. |
| **Blog Posts** | Title, Slug, Excerpt, Main Image, Rich Text Body, Author, Category | Meta Title, Description | `post` (Document) | **P1** | Essential for SEO growth. |
| **Home Page** | Hero Headline/Subhead, Hero Image, Feature Blocks, CTA Text | Meta Title, Description | `homePage` (Singleton) | **P1** | High visibility, frequent A/B testing likely. |
| **Testimonials** | Author Name, Rating, Quote, Date, Verified Badge | N/A (embedded) | `review` (Document) | **P2** | Used across Home, PDP, and Reviews page. |
| **FAQs** | Question, Answer, Category (General, Product, VAT) | N/A (embedded) | `faq` (Document) | **P2** | Useful for "Help" center. |
| **About Page** | Mission Statement, Team Bios, Values List, Images | Meta Title, Description | `aboutPage` (Singleton) | **P2** | Infrequent changes. |
| **Legal Pages** | Page Title, Last Updated Date, Rich Text Body | Meta Title, Description | `legalPage` (Document) | **P2** | "Privacy Policy" & "Return Policy" as docs. |
| **Contact Page** | Intro Text, Form Success Message, Map Coordinates | Meta Title, Description | `contactPage` (Singleton) | **P3** | Mostly static. |
| **Brochure/Quote** | Form Headlines, "Thank You" Message | Meta Title, Description | `landingPage` (Document) | **P3** | Marketing landing pages. |

---

## 3. Proposed Sanity Model List

### Singletons (One-off pages)
1.  **`siteSettings`**: Global configuration (Phone, Email, Address, Socials).
2.  **`homePage`**: Hero section, Featured Products list (references), Trust bar toggle.
3.  **`aboutPage`**: Fields for "Mission", "History", "Team" array.
4.  **`contactPage`**: Office hours, Map location, Intro text.

### Documents (Collections)
1.  **`product`**:
    *   `title` (string)
    *   `slug` (slug)
    *   `category` (string dropdown: "walk-in", "deep-soaker", "shower", "standard")
    *   `priceExVat` (number)
    *   `images` (array of images)
    *   `specs` (object: length, width, seat height, etc.)
    *   `highlights` (array of objects: icon + text)
    *   `stockStatus` (boolean + text note)
    *   `seo` (object)
2.  **`post`**:
    *   `title`, `slug`, `publishedAt`, `excerpt`, `body` (Portable Text), `mainImage`, `seo`.
3.  **`review`**:
    *   `author`, `rating` (1-5), `text`, `date`.
4.  **`faq`**:
    *   `question`, `answer` (text), `tags`.
5.  **`legalPage`**:
    *   `title` ("Privacy Policy"), `slug`, `lastUpdated`, `content` (Portable Text), `seo`.

### Objects (Reusable components)
1.  **`seo`**: See section 4.
2.  **`productSpec`**: Reusable tech spec block.
3.  **`highlight`**: Icon selector + Title + Text.
4.  **`blockContent`**: Standard Portable Text (H1-H6, Bold, Italic, Links, Images).

---

## 4. SEO Object Recommendation

Every page-level document (`homePage`, `product`, `post`, `legalPage`) should include this object field named `seo`:

```javascript
// schema/objects/seo.js
export default {
  name: 'seo',
  title: 'SEO & Metadata',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for browser tab and Google search result (50-60 chars).',
      validation: Rule => Rule.max(60).warning('Longer titles may be truncated by search engines')
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Summary for search results (150-160 chars).',
      validation: Rule => Rule.max(160).warning('Longer descriptions may be truncated')
    },
    {
      name: 'shareImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image for Facebook/Twitter (1200x630px recommended).'
    },
    {
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      initialValue: false,
      description: 'Enable to prevent Google from indexing this page.'
    }
  ]
}
```

---

## 5. Migration Checklist

### Phase 1: Setup & Core Data (P0)
- [ ] **Init Sanity:** Run `npm create sanity@latest` inside the repo (or separate folder).
- [ ] **Install Client:** `npm install next-sanity @sanity/client @portabletext/react`.
- [ ] **Create Schemas:** Implement `product`, `siteSettings`, and `seo` schemas first.
- [ ] **Migrate Products:** Write a script to read `data/*.ts` and push 20+ products to Sanity API.
- [ ] **Update Frontend:** Replace `WALK_IN_BATHS` constant in `app/walk-in-baths/page.tsx` with `client.fetch(query)`.

### Phase 2: Marketing Content (P1)
- [ ] **Create Schemas:** `post`, `homePage`, `review`.
- [ ] **Migrate Blog:** Move `data/blogPosts.ts` to Sanity.
- [ ] **Migrate Reviews:** Move `components/Testimonials.tsx` content to Sanity.
- [ ] **Rich Text:** Replace hardcoded blog body with `<PortableText />`.

### Phase 3: Polish & Settings (P2/P3)
- [ ] **Create Schemas:** `legalPage`, `faq`.
- [ ] **Migrate Legal:** Copy/paste Privacy Policy text into Sanity editor.
- [ ] **Global Config:** Connect `Footer.tsx` to `siteSettings` singleton.
- [ ] **Webhooks:** Configure On-Demand Revalidation (ISR) so site updates when Sanity content changes.
