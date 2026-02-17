Ок. Тогда делаем **один `data`-файл** с типами + захардкоженными моделями, и UI (PLP/PDP) питается только от него. Потом этот же shape легко заменишь на Sanity/API.

Ниже готовый старт:

---

## 1) Структура (файлы)

* `src/data/walkInBaths.ts` — **все модели + серии + тексты PLP**
* `src/lib/walkInBaths.ts` — **хелперы**: цены, “Save”, фильтрация, поиск по slug

---

## 2) `src/data/walkInBaths.ts` (хардкод)

```ts
// src/data/walkInBaths.ts

export type DoorHanding = "L" | "R" | "InSwing";
export type LengthBucket = "compact" | "standard" | "large";
export type KeyFeature = "poweredSeatLift" | "hydrotherapy" | "chromotherapy" | "layDownOption";
export type PackageLevel = "classic" | "plus" | "special" | "unique";
export type PricingMode = "ex" | "inc";

export type TrustItem = { iconKey: string; label: string };

export type Highlight = {
  iconKey: string;
  title: string;
  text: string;
};

export type TechSpecs = Partial<{
  lengthMm: number;
  widthMm: number;
  internalSeatWidthMm: number;
  maxUserWeightKg: number;
  maxUserWeightStone: number;
  shellMaterial: string;
  frameMaterial: string;
}>;

export type Testimonial = {
  quote: string;
  authorName: string;
  rating?: number;
};

export type FAQ = {
  question: string;
  answer: string;
  tags?: string[];
};

export type ProductVariant = {
  id: string;
  slug: string; // used for PDP route
  title: string; // "Serenity 66 Classic"
  baseModelId: string; // links to series
  packageLevel: PackageLevel;

  heroTagline?: string;
  badges?: string[];

  // Images: for now, just static paths
  primaryImage: { src: string; alt: string };
  gallery?: Array<{ src: string; alt: string }>;
  installedInLabel?: string; // PLP overlay "Installed in Leeds"

  // PLP mini-specs
  lengthMm: number; // shown as "SIZE 1675mm" in your cards
  stepLabel: string; // "Low"
  doorHandingAvailable: DoorHanding[];
  defaultDoorHanding: DoorHanding;
  lengthBucket: LengthBucket;
  keyFeatures: KeyFeature[];

  // Pricing
  priceExVat: number;
  vatRate: number; // 0.2 typical
  pricingModeDefault?: PricingMode;
  wasPriceIncVat?: number; // only if you truly have "was price" on PDP

  // Stock
  isInStock?: boolean;
  stockNote?: string;

  // PDP blocks
  highlights?: Highlight[];
  techSpecs?: TechSpecs;
  testimonials?: Testimonial[];
  faqs?: FAQ[];
};

export type BaseModel = {
  id: string;
  title: string; // "Serenity 66"
  range: "serenity" | "stamford";
  variantIds: string[]; // classic/plus/special for this series

  // For the PDP comparison table
  packageFeatureMatrix?: {
    rows: string[]; // feature labels
    classic: boolean[];
    plus: boolean[];
    special: boolean[];
  };
};

export type WalkInBathsCategory = {
  title: string;
  heroHeadline: string;
  heroSubhead: string;
  trustStrip: TrustItem[];

  explainer: {
    headline: string;
    body: string;
    bullets: string[];
    image: { src: string; alt: string };
    ctaLabel: string;
  };

  filterConfig: {
    enableLength: boolean;
    enableHanding: boolean;
    enableKeyFeatures: boolean;
  };
};

// ----------------------
// Shared content (Serenity)
// ----------------------

const SERENITY_HIGHLIGHTS: Highlight[] = [
  {
    iconKey: "threshold",
    title: "Zero Height Threshold",
    text: "Eliminates the risk of trips. Sit on the seat and slide your legs in.",
  },
  {
    iconKey: "weight",
    title: "Supports 35 Stone (222kg)",
    text: "Built on a stainless steel box frame for strength and stability.",
  },
  {
    iconKey: "drain",
    title: "Quick Drain Technology",
    text: "High-flow waste drains water faster, reducing waiting time.",
  },
  {
    iconKey: "maintenance",
    title: "Easy Maintenance",
    text: "One-piece acrylic shell reduces seams where mould can grow.",
  },
];

// ----------------------
// Base Models (series)
// ----------------------

export const BASE_MODELS: BaseModel[] = [
  {
    id: "serenity-66",
    title: "Serenity 66",
    range: "serenity",
    variantIds: ["serenity-66-classic", "serenity-66-plus", "serenity-66-special"],
    packageFeatureMatrix: {
      rows: [
        "Low Threshold Door",
        "Reinforced Shell",
        "Air Spa / Water Jets",
        "Heated Seat & Back",
      ],
      classic: [true, true, false, false],
      plus: [true, true, true, false],
      special: [true, true, true, true],
    },
  },
  {
    id: "serenity-75",
    title: "Serenity 75",
    range: "serenity",
    variantIds: ["serenity-75-classic", "serenity-75-plus", "serenity-75-special"],
    packageFeatureMatrix: {
      rows: [
        "Low Threshold Door",
        "Reinforced Shell",
        "Air Spa / Water Jets",
        "Heated Seat & Back",
      ],
      classic: [true, true, false, false],
      plus: [true, true, true, false],
      special: [true, true, true, true],
    },
  },
  {
    id: "stamford-75",
    title: "Stamford 75",
    range: "stamford",
    variantIds: ["stamford-75-classic"],
  },
];

// ----------------------
// Product Variants (7 models)
// ----------------------
// NOTE: some technical values for Serenity 75 / Stamford 75 may be unknown right now.
// Keep them undefined and render "—" in UI until you confirm.

export const WALK_IN_BATHS: ProductVariant[] = [
  // Serenity 66
  {
    id: "serenity-66-classic",
    slug: "serenity-66-classic",
    title: "Serenity 66 Classic",
    baseModelId: "serenity-66",
    packageLevel: "classic",
    heroTagline: "The UK's most robust walk-in bath. Built for comfort.",
    badges: ["BEST SELLER"],

    primaryImage: { src: "/images/products/serenity-66-classic/main.jpg", alt: "Serenity 66 Classic" },
    gallery: [
      { src: "/images/products/serenity-66-classic/1.jpg", alt: "Serenity 66 Classic view 1" },
      { src: "/images/products/serenity-66-classic/2.jpg", alt: "Serenity 66 Classic view 2" },
      { src: "/images/products/serenity-66-classic/3.jpg", alt: "Serenity 66 Classic view 3" },
    ],
    installedInLabel: "Installed in Manchester",

    lengthMm: 1675,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "L",
    lengthBucket: "standard",
    keyFeatures: [],

    priceExVat: 2708,
    vatRate: 0.2,
    pricingModeDefault: "ex",

    isInStock: true,
    stockNote: "Ready for installation",

    highlights: SERENITY_HIGHLIGHTS,
    techSpecs: {
      lengthMm: 1675,
      widthMm: 750,
      internalSeatWidthMm: 550,
      maxUserWeightKg: 222,
      maxUserWeightStone: 35,
      shellMaterial: "Marine-grade acrylic + 4 layers fiberglass",
      frameMaterial: "Stainless Steel Box Section",
    },
  },
  {
    id: "serenity-66-plus",
    slug: "serenity-66-plus",
    title: "Serenity 66 Plus",
    baseModelId: "serenity-66",
    packageLevel: "plus",
    primaryImage: { src: "/images/products/serenity-66-plus/main.jpg", alt: "Serenity 66 Plus" },
    installedInLabel: "Installed in Leeds",
    lengthMm: 1675,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "R",
    lengthBucket: "standard",
    keyFeatures: ["hydrotherapy"],
    priceExVat: 3208,
    vatRate: 0.2,
    highlights: SERENITY_HIGHLIGHTS,
  },
  {
    id: "serenity-66-special",
    slug: "serenity-66-special",
    title: "Serenity 66 Special",
    baseModelId: "serenity-66",
    packageLevel: "special",
    primaryImage: { src: "/images/products/serenity-66-special/main.jpg", alt: "Serenity 66 Special" },
    installedInLabel: "Installed in Birmingham",
    lengthMm: 1675,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "L",
    lengthBucket: "standard",
    keyFeatures: ["hydrotherapy", "chromotherapy"],
    priceExVat: 3908,
    vatRate: 0.2,
    highlights: SERENITY_HIGHLIGHTS,
  },

  // Serenity 75
  {
    id: "serenity-75-classic",
    slug: "serenity-75-classic",
    title: "Serenity 75 Classic",
    baseModelId: "serenity-75",
    packageLevel: "classic",
    primaryImage: { src: "/images/products/serenity-75-classic/main.jpg", alt: "Serenity 75 Classic" },
    installedInLabel: "Installed in Edinburgh",
    // TODO: confirm actual length for Serenity 75 cards (your screenshot had 1900mm on another model)
    lengthMm: 1900,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "R",
    lengthBucket: "large",
    keyFeatures: [],
    priceExVat: 2708,
    vatRate: 0.2,
    highlights: SERENITY_HIGHLIGHTS,
  },
  {
    id: "serenity-75-plus",
    slug: "serenity-75-plus",
    title: "Serenity 75 Plus",
    baseModelId: "serenity-75",
    packageLevel: "plus",
    primaryImage: { src: "/images/products/serenity-75-plus/main.jpg", alt: "Serenity 75 Plus" },
    lengthMm: 1900,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "L",
    lengthBucket: "large",
    keyFeatures: ["hydrotherapy"],
    priceExVat: 3208,
    vatRate: 0.2,
    highlights: SERENITY_HIGHLIGHTS,
  },
  {
    id: "serenity-75-special",
    slug: "serenity-75-special",
    title: "Serenity 75 Special",
    baseModelId: "serenity-75",
    packageLevel: "special",
    primaryImage: { src: "/images/products/serenity-75-special/main.jpg", alt: "Serenity 75 Special" },
    lengthMm: 1900,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "R",
    lengthBucket: "large",
    keyFeatures: ["hydrotherapy", "chromotherapy"],
    priceExVat: 3908,
    vatRate: 0.2,
    highlights: SERENITY_HIGHLIGHTS,
  },

  // Stamford 75 Classic
  {
    id: "stamford-75-classic",
    slug: "stamford-75-classic",
    title: "Stamford 75 Classic",
    baseModelId: "stamford-75",
    packageLevel: "unique",
    primaryImage: { src: "/images/products/stamford-75-classic/main.jpg", alt: "Stamford 75 Classic" },
    lengthMm: 1900, // TODO confirm
    stepLabel: "190–200mm",
    doorHandingAvailable: ["InSwing"],
    defaultDoorHanding: "InSwing",
    lengthBucket: "large",
    keyFeatures: [],
    priceExVat: 2608,
    vatRate: 0.2,
  },

  // If you decide “Serenity 75 Grand £4,100” is real, add it here as an 8th item.
];

// ----------------------
// PLP category content
// ----------------------

export const WALK_IN_BATHS_CATEGORY: WalkInBathsCategory = {
  title: "Walk-in Baths",
  heroHeadline: "Walk-in Baths",
  heroSubhead: "Safety, comfort, and easy access tailored to your home.\nBrowse our UK-made collection.",
  trustStrip: [
    { iconKey: "trustpilot", label: "4.9/5 Trustpilot" },
    { iconKey: "warranty", label: "10 Year Warranty" },
    { iconKey: "uk", label: "Made in UK" },
    { iconKey: "vat", label: "VAT Relief Handled" },
  ],
  explainer: {
    headline: "What is a walk-in bath?",
    body:
      "A walk-in bath is a bathtub with a watertight door and a low step-in entry, designed to make bathing safer and easier for those with limited mobility.",
    bullets: [
      "Low threshold entry (reduced trip risk)",
      "Built-in seat for safer transfers",
      "Easy-to-use door handle and secure seal",
      "Optional spa comfort (jets, heated seat)",
    ],
    image: { src: "/images/diagrams/walk-in-diagram.png", alt: "Walk-in bath diagram" },
    ctaLabel: "See how it works (30 sec)",
  },
  filterConfig: { enableLength: true, enableHanding: true, enableKeyFeatures: true },
};
```

---

## 3) `src/lib/walkInBaths.ts` (цены, “Save”, фильтры, поиск)

```ts
// src/lib/walkInBaths.ts
import type { ProductVariant, PricingMode, DoorHanding, KeyFeature, LengthBucket } from "@/data/walkInBaths";

export function priceIncVat(v: ProductVariant): number {
  // Round to nearest pound
  return Math.round(v.priceExVat * (1 + v.vatRate));
}

export function vatReliefSave(v: ProductVariant): number {
  return priceIncVat(v) - v.priceExVat;
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function displayPrice(v: ProductVariant, mode: PricingMode): number {
  return mode === "ex" ? v.priceExVat : priceIncVat(v);
}

// Optional: if you use wasPriceIncVat for “offer”, keep it separate from VAT relief.
export function offerSaveIncVat(v: ProductVariant): number | null {
  if (!v.wasPriceIncVat) return null;
  const currentInc = priceIncVat(v);
  const save = v.wasPriceIncVat - currentInc;
  return save > 0 ? save : null;
}

export type PlpFilters = Partial<{
  length: LengthBucket[];
  handing: DoorHanding[];
  keyFeatures: KeyFeature[];
}>;

export function filterVariants(items: ProductVariant[], filters: PlpFilters): ProductVariant[] {
  return items.filter((v) => {
    if (filters.length?.length && !filters.length.includes(v.lengthBucket)) return false;

    if (filters.handing?.length) {
      // match if variant supports ANY selected handing
      const ok = filters.handing.some((h) => v.doorHandingAvailable.includes(h));
      if (!ok) return false;
    }

    if (filters.keyFeatures?.length) {
      // require ALL selected features (usually expected in filters)
      const ok = filters.keyFeatures.every((f) => v.keyFeatures.includes(f));
      if (!ok) return false;
    }

    return true;
  });
}

export function getBySlug(items: ProductVariant[], slug: string): ProductVariant | undefined {
  return items.find((v) => v.slug === slug);
}

export function getSiblings(items: ProductVariant[], baseModelId: string): ProductVariant[] {
  return items
    .filter((v) => v.baseModelId === baseModelId)
    .sort((a, b) => a.priceExVat - b.priceExVat);
}
```

---

## 4) Мини-план интеграции в UI (без привязки к Sanity)

1. **PLP** (страница списка):

   * импортируешь `WALK_IN_BATHS` и `WALK_IN_BATHS_CATEGORY`
   * в state держишь:

     * pricing: `VAT Exempt` → `mode="ex"`, `Standard` → `mode="inc"`
     * filters (length/handing/keyFeatures)
   * `filterVariants(WALK_IN_BATHS, filters)` → мапишь в карточки
   * цена:

     * основной текст = `formatGBP(displayPrice(v, mode))`
     * подценник (если mode=ex) = `formatGBP(priceIncVat(v)) + " inc. VAT"`
     * “Save … (VAT Relief)” = `formatGBP(vatReliefSave(v))`

2. **PDP**:

   * `getBySlug(WALK_IN_BATHS, params.slug)` → текущий вариант
   * `getSiblings(WALK_IN_BATHS, current.baseModelId)` → таблица сравнения Classic/Plus/Special
   * toggle Ex/Inc:

     * `displayPrice(current, mode)`
   * handing selector:

     * кнопки по `doorHandingAvailable`

---

## 5) Важное (чтобы не было багов как на скринах)

На скриншотах сейчас конфликт: “Save” иногда выглядит как **VAT relief**, а иногда как **скидка/was price**.
В этом хардкоде я разделил:

* `vatReliefSave()` — всегда Inc−Ex
* `offerSaveIncVat()` — только если ты реально задашь `wasPriceIncVat`

Так ты не перепутаешь смыслы.

---

Если ты скинешь (текстом) **точные длины/ширины/seat width для Serenity 75 и Stamford 75**, я сразу обновлю `techSpecs` и `lengthMm` так, чтобы совпало 1:1 с твоими исходниками и карточками.
