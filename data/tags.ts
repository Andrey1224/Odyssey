export type Feature =
  | "jets"
  | "shower"
  | "dualFlow"
  | "heatedSeat"
  | "microbubbles"
  | "chromotherapy"
  | "aromatherapy"
  | "ozonePurifier";

export type DoorType = "standard" | "inSwing";

export type ProductTags = {
  family: "serenity" | "stamford";
  variant: "classic" | "plus" | "special";
  widthMm: 660 | 750;
  doorOpeningMm?: 850;
  doorType: DoorType;
  handing: Array<"left" | "right">;
  features: Feature[];
};

export const TAGS: Record<string, ProductTags> = {
  "serenity-66-classic": {
    family: "serenity",
    variant: "classic",
    widthMm: 660,
    doorType: "standard",
    handing: ["left", "right"],
    features: [],
  },
  "serenity-66-plus": {
    family: "serenity",
    variant: "plus",
    widthMm: 660,
    doorType: "standard",
    handing: ["left", "right"],
    features: ["jets", "shower", "dualFlow"],
  },
  "serenity-66-special": {
    family: "serenity",
    variant: "special",
    widthMm: 660,
    doorType: "standard",
    handing: ["left", "right"],
    features: [
      "jets",
      "shower",
      "dualFlow",
      "heatedSeat",
      "microbubbles",
      "chromotherapy",
      "aromatherapy",
      "ozonePurifier",
    ],
  },
  "serenity-75-classic": {
    family: "serenity",
    variant: "classic",
    widthMm: 750,
    doorOpeningMm: 850,
    doorType: "standard",
    handing: ["left", "right"],
    features: [],
  },
  "serenity-75-plus": {
    family: "serenity",
    variant: "plus",
    widthMm: 750,
    doorOpeningMm: 850,
    doorType: "standard",
    handing: ["left", "right"],
    features: ["jets", "shower", "dualFlow"],
  },
  "serenity-75-special": {
    family: "serenity",
    variant: "special",
    widthMm: 750,
    doorOpeningMm: 850,
    doorType: "standard",
    handing: ["left", "right"],
    features: [
      "jets",
      "shower",
      "dualFlow",
      "heatedSeat",
      "microbubbles",
      "chromotherapy",
      "aromatherapy",
      "ozonePurifier",
    ],
  },
  "stamford-75-classic": {
    family: "stamford",
    variant: "classic",
    widthMm: 750,
    doorType: "inSwing",
    handing: ["left", "right"],
    features: [],
  },
};
