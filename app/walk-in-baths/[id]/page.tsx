import { notFound } from "next/navigation";
import { WALK_IN_BATHS } from "@/data/walkInBaths";
import { getBySlug } from "@/lib/walkInBaths";
import { ProductDetail } from "./ProductDetail";

export function generateStaticParams() {
    return WALK_IN_BATHS.map(p => ({ id: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = getBySlug(WALK_IN_BATHS, id);
    if (!product) notFound();
    return <ProductDetail product={product} />;
}
