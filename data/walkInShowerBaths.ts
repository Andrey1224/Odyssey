import type {
  CatalogBaseModel,
  CatalogCategory,
  CatalogProductVariant,
  Highlight,
} from "@/data/catalogTypes";
import { validateCatalogDataset } from "@/lib/catalogValidation";

const SHOWER_BATH_HIGHLIGHTS: Highlight[] = [
  {
    iconKey: "threshold",
    title: "Low Threshold Access",
    text: "Reduced step-in height improves confidence for daily bathing and showering.",
  },
  {
    iconKey: "doorOpen",
    title: "Watertight Door System",
    text: "Precision door seals support safe soaking without compromising shower convenience.",
  },
  {
    iconKey: "arrowLeftRight",
    title: "Bath + Shower in One",
    text: "Designed to serve both full-body bathing and practical everyday showering.",
  },
  {
    iconKey: "drain",
    title: "Fast Drain Performance",
    text: "Twin waste options help users exit sooner after bathing.",
  },
];

export const WALK_IN_SHOWER_BATHS_CATEGORY: CatalogCategory = {
  title: "Walk-in Shower Baths",
  heroHeadline: "Walk-in Shower Baths",
  heroSubhead:
    "2-in-1 bath and shower models combining accessible entry, family flexibility, and modern design.",
  trustStrip: [
    { iconKey: "trustpilot", label: "4.9/5 Trustpilot" },
    { iconKey: "warranty", label: "10 Year Warranty" },
    { iconKey: "uk", label: "Made in UK" },
    { iconKey: "vat", label: "VAT Relief Handled" },
  ],
  explainer: {
    headline: "What is a walk-in shower bath?",
    body:
      "A walk-in shower bath combines a full-length soak with everyday shower usability, while adding safer low-threshold door access.",
    bullets: [
      "2-in-1 bath and shower functionality",
      "Low-threshold entry for safer access",
      "P-shape and L-shape options for shower room",
      "Suitable for mixed-age households",
    ],
    ctaLabel: "See how it works (30 sec)",
    placeholderLabel: "Image placeholder - walk-in shower bath explainer",
  },
};

export const WALK_IN_SHOWER_BATHS_BASE_MODELS: CatalogBaseModel[] = [
  { id: "carnelian", title: "Carnelian", range: "walk-in-shower-bath", variantIds: ["carnelian"] },
  { id: "highgrove", title: "Highgrove", range: "walk-in-shower-bath", variantIds: ["highgrove"] },
  { id: "larimar", title: "Larimar", range: "walk-in-shower-bath", variantIds: ["larimar"] },
  { id: "olivia", title: "Olivia", range: "walk-in-shower-bath", variantIds: ["olivia"] },
];

export const WALK_IN_SHOWER_BATHS: CatalogProductVariant[] = [
  {
    id: "carnelian",
    slug: "carnelian",
    title: "Carnelian",
    subtitle: "P-shape shower bath with curved toughened glass styling.",
    baseModelId: "carnelian",
    packageLevel: "unique",
    heroTagline: "Elegant dual-purpose bath with expanded shower zone and low entry door.",
    featurePills: [
      { iconKey: "sparkles", label: "Curved Glass Screen" },
      { iconKey: "arrowLeftRight", label: "P Shape Design" },
      { iconKey: "ruler", label: "1675mm Length" },
      { iconKey: "door", label: "Low Entry" },
    ],
    primaryImage: { src: "/images/AccessibleShower.png", alt: "Carnelian walk-in shower bath" },
    lengthMm: 1675,
    stepLabel: "215mm",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "L",
    lengthBucket: "standard",
    keyFeatures: ["hydrotherapy", "chromotherapy"],
    priceExVat: 1998,
    vatRate: 0.2,
    wasPriceIncVat: 2505,
    highlights: SHOWER_BATH_HIGHLIGHTS,
    techSpecs: {
      lengthMm: 1675,
      widthMm: 850,
      heightMm: 530,
      doorOpeningMm: 380,
      stepHeightMm: 215,
      volumeL: 220,
    },
  },
  {
    id: "highgrove",
    slug: "highgrove",
    title: "Highgrove",
    subtitle: "L-shape walk-in shower bath with bold geometric layout.",
    baseModelId: "highgrove",
    packageLevel: "unique",
    heroTagline: "Sharp modern profile with wider standing shower area.",
    featurePills: [
      { iconKey: "sparkles", label: "6mm Glass Screen" },
      { iconKey: "arrowLeftRight", label: "L Shape Design" },
      { iconKey: "door", label: "Low Entry" },
      { iconKey: "shield", label: "Anti-Slip Shower End" },
    ],
    primaryImage: { src: "/images/AccessibleShower.png", alt: "Highgrove walk-in shower bath" },
    lengthMm: 1700,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "R",
    lengthBucket: "standard",
    keyFeatures: ["hydrotherapy"],
    priceExVat: 1928,
    vatRate: 0.2,
    wasPriceIncVat: 2395,
    highlights: SHOWER_BATH_HIGHLIGHTS,
    techSpecs: {
      lengthMm: 1700,
      heightMm: 530,
      shellMaterial: "Gel coat",
      frameMaterial: "Reinforced frame",
    },
  },
  {
    id: "larimar",
    slug: "larimar",
    title: "Larimar",
    subtitle: "L-shape model with inward-opening 10mm glass door.",
    baseModelId: "larimar",
    packageLevel: "unique",
    heroTagline: "Bright open design with inward glass door for tighter rooms.",
    featurePills: [
      { iconKey: "sparkles", label: "10mm Glass Door" },
      { iconKey: "arrowLeftRight", label: "L Shape Design" },
      { iconKey: "door", label: "Low Entry" },
      { iconKey: "droplets", label: "Twin Waste Option" },
    ],
    primaryImage: { src: "/images/AccessibleShower.png", alt: "Larimar walk-in shower bath" },
    lengthMm: 1700,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "L",
    lengthBucket: "standard",
    keyFeatures: [],
    priceExVat: 1998,
    vatRate: 0.2,
    wasPriceIncVat: 2505,
    highlights: SHOWER_BATH_HIGHLIGHTS,
    techSpecs: {
      lengthMm: 1700,
      shellMaterial: "Gel coat",
      frameMaterial: "Reinforced frame",
    },
  },
  {
    id: "olivia",
    slug: "olivia",
    title: "Olivia",
    subtitle: "Walk-in shower bath with full-width fold-down seat.",
    baseModelId: "olivia",
    packageLevel: "unique",
    heroTagline: "Family-focused 2-in-1 model with seated shower support.",
    featurePills: [
      { iconKey: "users", label: "Full-Width Fold Seat" },
      { iconKey: "ruler", label: "1700/1800mm" },
      { iconKey: "sparkles", label: "6mm Glass Screen" },
      { iconKey: "door", label: "Low Entry" },
    ],
    primaryImage: { src: "/images/AccessibleShower.png", alt: "Olivia walk-in shower bath" },
    lengthMm: 1800,
    stepLabel: "Low",
    doorHandingAvailable: ["L", "R"],
    defaultDoorHanding: "R",
    lengthBucket: "large",
    keyFeatures: ["layDownOption"],
    hasFoldDownSeat: true,
    priceExVat: 2300,
    vatRate: 0.2,
    wasPriceIncVat: 2705,
    highlights: SHOWER_BATH_HIGHLIGHTS,
    techSpecs: {
      lengthMm: 1800,
      shellMaterial: "Gel coat",
      frameMaterial: "Stainless steel",
    },
  },
];

export type WalkInShowerFilterTag = {
  bathShape: "lShape" | "pShape" | "standard";
  lengths: string[];
  integratedSeat: "foldDownSeat" | "noSeat";
  doorAction: "inward" | "outward";
  glassThickness: "6mm" | "10mm";
  dualWaste: "yes";
};

export const WALK_IN_SHOWER_FILTER_TAGS: Record<string, WalkInShowerFilterTag> = {
  carnelian: {
    bathShape: "pShape",
    lengths: ["1675"],
    integratedSeat: "noSeat",
    doorAction: "outward",
    glassThickness: "6mm",
    dualWaste: "yes",
  },
  highgrove: {
    bathShape: "lShape",
    lengths: ["1700"],
    integratedSeat: "noSeat",
    doorAction: "outward",
    glassThickness: "6mm",
    dualWaste: "yes",
  },
  larimar: {
    bathShape: "lShape",
    lengths: ["1700"],
    integratedSeat: "noSeat",
    doorAction: "inward",
    glassThickness: "10mm",
    dualWaste: "yes",
  },
  olivia: {
    bathShape: "standard",
    lengths: ["1700", "1800"],
    integratedSeat: "foldDownSeat",
    doorAction: "outward",
    glassThickness: "6mm",
    dualWaste: "yes",
  },
};

validateCatalogDataset(
  "walk-in-shower-baths",
  WALK_IN_SHOWER_BATHS,
  WALK_IN_SHOWER_BATHS_BASE_MODELS,
);
