export type BreadcrumbItem = {
  label: string;
  href?: string;
};

const SEGMENT_LABELS: Record<string, string> = {
  about: "About",
  faq: "FAQ",
  reviews: "Reviews",
  contact: "Contact",
  "free-quote": "Free Quote",
  "free-brochure": "Free Brochure",
  "return-policy": "Return Policy",
  "privacy-policy": "Privacy Policy",
  "walk-in-baths": "Walk-in Baths",
  "walk-in-shower-baths": "Walk-in Shower Baths",
  "standard-size-baths": "Standard Size Baths",
  "deep-soaker-baths": "Deep Soaker Baths",
  blog: "Advice & Guides",
};

function toTitleCaseSegment(segment: string): string {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getBreadcrumbs(
  pathname: string,
  options?: { productTitle?: string },
): BreadcrumbItem[] {
  const cleanPath = pathname.split("?")[0].split("#")[0] || "/";
  const normalized = cleanPath.endsWith("/") && cleanPath !== "/" ? cleanPath.slice(0, -1) : cleanPath;
  const segments = normalized.split("/").filter(Boolean);

  if (!segments.length) return [{ label: "Home" }];

  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    const label =
      isLast && options?.productTitle
        ? options.productTitle
        : SEGMENT_LABELS[segment] ?? toTitleCaseSegment(segment);

    items.push({
      label,
      href: isLast ? undefined : currentPath,
    });
  });

  return items;
}
