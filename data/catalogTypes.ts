export type DoorHanding = "L" | "R" | "InSwing";
export type DoorPosition = "Tap End" | "Seat End";
export type LengthBucket = "compact" | "standard" | "large";
export type KeyFeature =
  | "poweredSeatLift"
  | "hydrotherapy"
  | "chromotherapy"
  | "layDownOption";

export type TrustItem = { iconKey: string; label: string };

export type Highlight = {
  iconKey: string;
  title: string;
  text: string;
};

export type TechSpecs = Partial<{
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  doorOpeningMm: number;
  internalSeatWidthMm: number;
  maxUserWeightKg: number;
  maxUserWeightLabel: string;
  shellMaterial: string;
  frameMaterial: string;
  stepHeightMm: number;
  waterDepthMm: number;
  volumeL: number;
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

export type CatalogProductVariant = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  baseModelId: string;
  packageLevel: string;

  heroTagline?: string;
  doorStyleLabel?: string;
  badges?: string[];
  featurePills?: FeaturePill[];
  hasFoldDownSeat?: boolean;
  doorPosition?: DoorPosition;
  isDoubleEnded?: boolean;

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
  pricingModeDefault?: "ex" | "inc";
  wasPriceIncVat?: number;

  isInStock?: boolean;
  stockNote?: string;

  highlights?: Highlight[];
  techSpecs?: TechSpecs;
  testimonials?: Testimonial[];
  faqs?: FAQ[];
};

export type PackageFeatureMatrix = {
  rows: string[];
  [packageLevel: string]: string[] | boolean[];
};

export type CatalogBaseModel = {
  id: string;
  title: string;
  range: string;
  variantIds: string[];
  packageFeatureMatrix?: PackageFeatureMatrix;
};

export type CategoryExplainer = {
  headline: string;
  body: string;
  bullets: string[];
  image?: { src: string; alt: string };
  ctaLabel: string;
  placeholderLabel?: string;
};

export type CatalogCategory = {
  title: string;
  heroHeadline: string;
  heroSubhead: string;
  trustStrip: TrustItem[];
  explainer: CategoryExplainer;
};
