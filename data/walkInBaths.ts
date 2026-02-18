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
  doorOpeningMm: number;
  internalSeatWidthMm: number;
  maxUserWeightKg: number;
  maxUserWeightLabel: string;
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

export type FeaturePill = { iconKey: string; label: string };

export type ProductVariant = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  baseModelId: string;
  packageLevel: PackageLevel;

  heroTagline?: string;
  doorStyleLabel?: string;
  badges?: string[];
  featurePills?: FeaturePill[];

  primaryImage: { src: string; alt: string };
  gallery?: Array<{ src: string; alt: string }>;
  installedInLabel?: string;

  lengthMm: number;
  stepLabel: string;
  doorHandingAvailable: DoorHanding[];
  defaultDoorHanding: DoorHanding;
  lengthBucket: LengthBucket;
  keyFeatures: KeyFeature[];

  priceExVat: number;
  vatRate: number;
  pricingModeDefault?: PricingMode;
  wasPriceIncVat?: number;

  isInStock?: boolean;
  stockNote?: string;

  highlights?: Highlight[];
  techSpecs?: TechSpecs;
  testimonials?: Testimonial[];
  faqs?: FAQ[];
};

export type BaseModel = {
  id: string;
  title: string;
  range: "serenity" | "stamford";
  variantIds: string[];

  packageFeatureMatrix?: {
    rows: string[];
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

const SERENITY_75_PLUS_HIGHLIGHTS: Highlight[] = [
  {
    iconKey: "waves",
    title: "Water Jet Jacuzzi",
    text: "Enjoy a soothing massage effect that helps ease stiffness and improve circulation — perfect after a long day.",
  },
  {
    iconKey: "zap",
    title: "Dual Flow Faucet",
    text: "Quickly fill the bath when you need it, or switch to shower mode with a simple turn — no complicated controls.",
  },
  {
    iconKey: "showerHead",
    title: "Integrated Shower System",
    text: "The included hand shower lets you rinse easily without standing, reducing strain and improving confidence.",
  },
  {
    iconKey: "doorOpen",
    title: "850mm Door Opening",
    text: "The widest door in the range — extra space to step in or transfer from a wheelchair with ease.",
  },
];

const SERENITY_75_CLASSIC_HIGHLIGHTS: Highlight[] = [
  {
    iconKey: "arrowLeftRight",
    title: "750mm Wide Design",
    text: "More room to sit comfortably and move with confidence.",
  },
  {
    iconKey: "doorOpen",
    title: "850mm Door Opening",
    text: "Extra-wide access makes transfers easier — ideal for wheelchair and mobility aid users.",
  },
  {
    iconKey: "threshold",
    title: "Zero Height Threshold",
    text: "Step in safely without lifting your legs high — just sit and slide.",
  },
  {
    iconKey: "drain",
    title: "Quick Drain Technology",
    text: "Drains faster so you're not waiting long to open the door.",
  },
];

const SERENITY_SPECIAL_HIGHLIGHTS: Highlight[] = [
  {
    iconKey: "thermometer",
    title: "Heated Seat & Back",
    text: "Keeps you comfortable while you bathe, especially in cooler months — warm from the moment you sit down.",
  },
  {
    iconKey: "sparkles",
    title: "Microbubbles Therapy",
    text: "Soft bubbles help you unwind and feel lighter without harsh pressure. Gentle full-body relaxation.",
  },
  {
    iconKey: "lightbulb",
    title: "Chromotherapy Lighting",
    text: "A relaxing ambience that helps you feel settled and comfortable. Calming light for peace of mind.",
  },
  {
    iconKey: "leaf",
    title: "Aromatherapy System",
    text: "Adds a soothing scent to help you relax and enjoy bath time more. A spa-like experience at home.",
  },
];

const SERENITY_PLUS_HIGHLIGHTS: Highlight[] = [
  {
    iconKey: "waves",
    title: "Water Jet Jacuzzi",
    text: "Enjoy a soothing massage effect that helps ease stiffness and improve circulation — perfect after a long day.",
  },
  {
    iconKey: "zap",
    title: "Dual Flow Faucet",
    text: "Quickly fill the bath when you need it, or switch to shower mode with a simple turn — no complicated controls.",
  },
  {
    iconKey: "showerHead",
    title: "Integrated Shower System",
    text: "The included hand shower lets you rinse easily without standing, reducing strain and improving confidence.",
  },
  {
    iconKey: "door",
    title: "Zero Height Threshold",
    text: "The low-entry door and built-in seat make getting in and out safer and more comfortable.",
  },
];

const STAMFORD_HIGHLIGHTS: Highlight[] = [
  {
    iconKey: "door",
    title: "In-Swing Door Design",
    text: "Door swings inward over the knees — no need to lean out to close it.",
  },
  {
    iconKey: "weight",
    title: "Supports 35 Stone (200kg)",
    text: "Stainless steel box-section frame for maximum strength and stability.",
  },
  {
    iconKey: "drain",
    title: "Quick Drain Technology",
    text: "High-flow waste drains water faster, reducing waiting time.",
  },
  {
    iconKey: "door_wide",
    title: "750mm Wide Bath",
    text: "Extra width for greater comfort and easier movement.",
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
        "Water Jet Jacuzzi",
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
        "Water Jet Jacuzzi",
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

export const WALK_IN_BATHS: ProductVariant[] = [
  // Serenity 66
  {
    id: "serenity-66-classic",
    slug: "serenity-66-classic",
    title: "Serenity 66 Classic",
    subtitle: "Robust & Reliable. The UK standard for safety.",
    baseModelId: "serenity-66",
    packageLevel: "classic",
    heroTagline: "The UK's most robust walk-in bath. Built for comfort.",
    badges: [],
    featurePills: [
      { iconKey: "ruler", label: "660mm Width" },
      { iconKey: "door", label: "Low Threshold" },
      { iconKey: "shield", label: "Stainless Frame" },
      { iconKey: "droplets", label: "Quick Drain" },
    ],

    primaryImage: { src: "/images/Walk-inBath.png", alt: "Serenity 66 Classic" },
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
    wasPriceIncVat: 3195,

    isInStock: true,
    stockNote: "Ready for installation",

    highlights: SERENITY_HIGHLIGHTS,
    techSpecs: {
      lengthMm: 1675,
      widthMm: 660,
      internalSeatWidthMm: 550,
      maxUserWeightKg: 222,
      shellMaterial: "Acrylic + 4 layers fiberglass",
      frameMaterial: "Stainless Steel Box Section",
    },
    testimonials: [
      { quote: "After retiring I decided to splash out on the Serenity. The quality is perfect, and it was worth every penny. Installation was flawless.", authorName: "Adam Simmonds", rating: 5 },
      { quote: "My husband and I are very impressed. We have a small bathroom and didn't think we had room, but this fit perfectly.", authorName: "Grace Ellison", rating: 5 },
      { quote: "Really great service. I chewed their ears off for hours asking questions, and they were very patient. No hard sell.", authorName: "Mike Edwards", rating: 5 },
    ],
  },
  {
    id: "serenity-66-plus",
    slug: "serenity-66-plus",
    title: "Serenity 66 Plus",
    subtitle: "Water Jet Jacuzzi & Dual Flow Shower.",
    baseModelId: "serenity-66",
    packageLevel: "plus",
    badges: ["Best Seller"],
    featurePills: [
      { iconKey: "zap", label: "Dual Flow Faucet" },
      { iconKey: "showerHead", label: "Shower System" },
      { iconKey: "waves", label: "Water Jet Jacuzzi" },
      { iconKey: "sparkles", label: "Chrome Fittings" },
    ],
    primaryImage: { src: "/images/Walk-inBath.png", alt: "Serenity 66 Plus" },
    installedInLabel: "Installed in Leeds",
    lengthMm: 1675,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "R",
    lengthBucket: "standard",
    keyFeatures: ["hydrotherapy"],
    priceExVat: 3208,
    vatRate: 0.2,
    wasPriceIncVat: 3695,
    highlights: SERENITY_PLUS_HIGHLIGHTS,
    techSpecs: {
      lengthMm: 1675,
      widthMm: 660,
      maxUserWeightKg: 222,
      shellMaterial: "Acrylic + 4 layers fiberglass",
      frameMaterial: "Stainless Steel Box Section",
    },
  },
  {
    id: "serenity-66-special",
    slug: "serenity-66-special",
    title: "Serenity 66 Special",
    subtitle: "The ultimate therapy experience. Fully loaded.",
    baseModelId: "serenity-66",
    packageLevel: "special",
    badges: ["Premium Spec"],
    featurePills: [
      { iconKey: "thermometer", label: "Heated Seat & Back" },
      { iconKey: "sparkles", label: "Microbubbles" },
      { iconKey: "lightbulb", label: "Chromotherapy" },
      { iconKey: "leaf", label: "Aromatherapy" },
    ],
    primaryImage: { src: "/images/Walk-inBath.png", alt: "Serenity 66 Special" },
    installedInLabel: "Installed in Birmingham",
    lengthMm: 1675,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "L",
    lengthBucket: "standard",
    keyFeatures: ["hydrotherapy", "chromotherapy"],
    priceExVat: 3908,
    vatRate: 0.2,
    wasPriceIncVat: 4295,
    highlights: SERENITY_SPECIAL_HIGHLIGHTS,
    techSpecs: {
      lengthMm: 1675,
      widthMm: 660,
      maxUserWeightKg: 222,
      shellMaterial: "Acrylic + 4 layers fiberglass",
      frameMaterial: "Stainless Steel Box Section",
    },
  },

  // Serenity 75
  {
    id: "serenity-75-classic",
    slug: "serenity-75-classic",
    title: "Serenity 75 Classic",
    subtitle: "Extra width & wider door — 750mm wide design.",
    baseModelId: "serenity-75",
    packageLevel: "classic",
    featurePills: [
      { iconKey: "arrowLeftRight", label: "750mm Wide" },
      { iconKey: "doorOpen", label: "850mm Door Opening" },
      { iconKey: "shield", label: "Stainless Frame" },
      { iconKey: "droplets", label: "Quick Drain" },
    ],
    primaryImage: { src: "/images/products/serenity-classic/primary.png", alt: "Serenity 75 Classic" },
    gallery: [
      { src: "/images/products/serenity-classic/primary.png", alt: "Serenity 75 Classic main view" },
      { src: "/images/products/serenity-classic/gallery-1.png", alt: "Serenity 75 Classic view 1" },
      { src: "/images/products/serenity-classic/gallery-2.png", alt: "Serenity 75 Classic view 2" },
      { src: "/images/products/serenity-classic/lifestyle.png", alt: "Serenity 75 Classic lifestyle" },
    ],
    installedInLabel: "Installed in Edinburgh",
    lengthMm: 1900,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "R",
    lengthBucket: "large",
    keyFeatures: [],
    priceExVat: 2708,
    vatRate: 0.2,
    wasPriceIncVat: 3195,
    highlights: SERENITY_75_CLASSIC_HIGHLIGHTS,
    techSpecs: {
      widthMm: 750,
      doorOpeningMm: 850,
      maxUserWeightKg: 222,
      shellMaterial: "Acrylic + 4 layers fiberglass",
      frameMaterial: "Stainless Steel Box Section",
    },
  },
  {
    id: "serenity-75-plus",
    slug: "serenity-75-plus",
    title: "Serenity 75 Plus",
    subtitle: "75 Series with Water Jets & Dual Flow Shower.",
    baseModelId: "serenity-75",
    packageLevel: "plus",
    featurePills: [
      { iconKey: "zap", label: "Dual Flow Faucet" },
      { iconKey: "showerHead", label: "Shower System" },
      { iconKey: "waves", label: "Water Jet Jacuzzi" },
      { iconKey: "sparkles", label: "Chrome Fittings" },
    ],
    primaryImage: { src: "/images/Walk-inBath.png", alt: "Serenity 75 Plus" },
    lengthMm: 1900,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "L",
    lengthBucket: "large",
    keyFeatures: ["hydrotherapy"],
    priceExVat: 3208,
    vatRate: 0.2,
    wasPriceIncVat: 3695,
    highlights: SERENITY_75_PLUS_HIGHLIGHTS,
    techSpecs: {
      widthMm: 750,
      doorOpeningMm: 850,
      maxUserWeightKg: 222,
      shellMaterial: "Acrylic + 4 layers fiberglass",
      frameMaterial: "Stainless Steel Box Section",
    },
  },
  {
    id: "serenity-75-special",
    slug: "serenity-75-special",
    title: "Serenity 75 Special",
    subtitle: "75 Series with full luxury spec.",
    baseModelId: "serenity-75",
    packageLevel: "special",
    badges: ["Premium Spec"],
    featurePills: [
      { iconKey: "thermometer", label: "Heated Seat & Back" },
      { iconKey: "sparkles", label: "Microbubbles" },
      { iconKey: "lightbulb", label: "Chromotherapy" },
      { iconKey: "leaf", label: "Aromatherapy" },
    ],
    primaryImage: { src: "/images/Walk-inBath.png", alt: "Serenity 75 Special" },
    lengthMm: 1900,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "R",
    lengthBucket: "large",
    keyFeatures: ["hydrotherapy", "chromotherapy"],
    priceExVat: 3908,
    vatRate: 0.2,
    wasPriceIncVat: 4295,
    highlights: SERENITY_SPECIAL_HIGHLIGHTS,
    techSpecs: {
      widthMm: 750,
      doorOpeningMm: 850,
      maxUserWeightKg: 222,
      shellMaterial: "Acrylic + 4 layers fiberglass",
      frameMaterial: "Stainless Steel Box Section",
    },
  },

  // Stamford 75 Classic
  {
    id: "stamford-75-classic",
    slug: "stamford-75-classic",
    title: "Stamford 75 Classic",
    subtitle: "Wide entry & Inswing door design.",
    baseModelId: "stamford-75",
    packageLevel: "unique",
    heroTagline: "Available in Left Hand or Right Hand In-Swing configuration",
    doorStyleLabel: "In-Swing",
    featurePills: [
      { iconKey: "arrowLeftRight", label: "75cm Wide" },
      { iconKey: "doorOpen", label: "Inswing Door" },
      { iconKey: "users", label: "Bariatric Friendly" },
      { iconKey: "layers", label: "4-Layer Fiberglass" },
    ],
    primaryImage: { src: "/images/Walk-inBath.png", alt: "Stamford 75 Classic" },
    lengthMm: 1900,
    stepLabel: "190–200mm",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "L",
    lengthBucket: "large",
    keyFeatures: [],
    priceExVat: 2608,
    vatRate: 0.2,
    wasPriceIncVat: 3008,
    highlights: STAMFORD_HIGHLIGHTS,
    techSpecs: {
      widthMm: 750,
      maxUserWeightLabel: "35 stone (200 kg)",
      shellMaterial: "Acrylic + 4 layers fiberglass",
      frameMaterial: "Stainless Steel Box Section",
    },
  },
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
    body: "A walk-in bath is a bathtub with a watertight door and a low step-in entry, designed to make bathing safer and easier for those with limited mobility.",
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
