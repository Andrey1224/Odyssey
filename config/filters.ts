import type { Feature } from "@/data/tags";

export const WIDTH_OPTIONS: Array<{ label: string; value: "660" | "750" }> = [
  { label: "660mm — Serenity 66", value: "660" },
  { label: "750mm — Serenity 75 & Stamford", value: "750" },
];

export const DOOR_TYPE_OPTIONS: Array<{ label: string; value: "standard" | "inSwing" }> = [
  { label: "Standard (Low Threshold)", value: "standard" },
  { label: "In-Swing Door", value: "inSwing" },
];

export const PACKAGE_OPTIONS: Array<{ label: string; value: "classic" | "plus" | "special" }> = [
  { label: "Classic", value: "classic" },
  { label: "Plus", value: "plus" },
  { label: "Special", value: "special" },
];

export const HANDING_OPTIONS: Array<{ label: string; value: "left" | "right" }> = [
  { label: "Left Hand", value: "left" },
  { label: "Right Hand", value: "right" },
];

export const FEATURE_OPTIONS: Array<{ label: string; value: Feature }> = [
  { label: "Water Jet Jacuzzi", value: "jets" },
  { label: "Shower System", value: "shower" },
  { label: "Dual Flow Faucet", value: "dualFlow" },
  { label: "Heated Seat & Back", value: "heatedSeat" },
  { label: "Microbubbles", value: "microbubbles" },
  { label: "Chromotherapy", value: "chromotherapy" },
  { label: "Aromatherapy", value: "aromatherapy" },
  { label: "Ozone Purifier", value: "ozonePurifier" },
];

export const ACCESS_OPTIONS: Array<{ label: string; value: "wideDoor" }> = [
  { label: "850mm Door Opening (Serenity 75)", value: "wideDoor" },
];
