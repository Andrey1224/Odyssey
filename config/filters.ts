export type FilterConfig = {
  lengthOptions: string[];
  handingOptions: string[];
  featureOptions: string[];
  sizeLabelToBucket: Record<string, string>;
};

export const WALK_IN_BATHS_FILTERS: FilterConfig = {
  lengthOptions: ["< 1500mm (Compact)", "1500 - 1699mm (Standard)", "1700mm+ (Large)"],
  handingOptions: ["Left Hand", "Right Hand"],
  featureOptions: ["Powered Seat Lift", "Hydrotherapy", "Chromotherapy", "Lay-down Option"],
  sizeLabelToBucket: {
    "< 1500mm (Compact)": "compact",
    "1500 - 1699mm (Standard)": "standard",
    "1700mm+ (Large)": "large",
  },
};
