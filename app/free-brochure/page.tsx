import { type Metadata } from "next";
import { BrochureForm } from "./BrochureForm";

export const metadata: Metadata = {
  title: "Request Free Brochure | Odyssey Baths",
};

export default async function FreeBrochurePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  return <BrochureForm productSlug={product} />;
}
