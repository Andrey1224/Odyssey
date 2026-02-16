import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/walkInBaths";
import { ProductDetail } from "./ProductDetail";

export function generateStaticParams() {
    return PRODUCTS.map(p => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) notFound();
    return <ProductDetail product={product} />;
}
