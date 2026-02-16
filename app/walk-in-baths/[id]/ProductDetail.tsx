"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Check,
    Shield,
    Star,
    Flag,
    DoorOpen,
    Dumbbell,
    Droplets,
    Wrench,
    Lock,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBar } from "@/components/TrustBar";
import { FAQSection } from "@/components/FAQSection";
import { type Product, PRODUCTS } from "@/data/walkInBaths";

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
    }).format(price);

const WHY_CHOOSE_ICONS = [DoorOpen, Dumbbell, Droplets, Wrench];

const COMP_ROWS = [
    { label: "Low Threshold Door", values: [true, true, true] },
    { label: "Reinforced Shell", values: [true, true, true] },
    { label: "Air Spa / Water Jets", values: [false, true, true] },
    { label: "Heated Seat & Back", values: [false, false, true] },
];

export function ProductDetail({ product }: { product: Product }) {
    const [vatExempt, setVatExempt] = useState(true);
    const [selectedHanding, setSelectedHanding] = useState(product.handing);
    const [activeThumb, setActiveThumb] = useState(0);

    const displayPrice = vatExempt
        ? product.priceExVat
        : Math.round(product.priceExVat * 1.2);

    const series66 = PRODUCTS.filter(p => ["1", "2", "3"].includes(p.id));

    return (
        <main className="min-h-screen bg-cream-50 pb-28 lg:pb-0 selection:bg-teal-200">
            <Header />

            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-6 py-5">
                <nav className="text-base text-slate-600 flex gap-2 flex-wrap">
                    <Link href="/" className="hover:text-teal-700 transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/walk-in-baths" className="hover:text-teal-700 transition-colors">
                        Walk-in Baths
                    </Link>
                    <span>/</span>
                    <span className="text-slate-900 font-semibold">{product.title}</span>
                </nav>
            </div>

            {/* Product Hero */}
            <section className="max-w-7xl mx-auto px-6 pb-12 md:pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">

                    {/* Gallery */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative mb-4">
                            {product.badge && (
                                <span className="absolute top-4 left-4 bg-slate-900 text-white text-sm font-bold px-2.5 py-1 rounded z-10 tracking-wider">
                                    {product.badge}
                                </span>
                            )}
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover mix-blend-multiply"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {[0, 1, 2].map(i => (
                                <button
                                    key={i}
                                    onClick={() => setActiveThumb(i)}
                                    className={`w-20 h-20 rounded-lg bg-slate-100 border-2 overflow-hidden p-1 transition-colors ${
                                        activeThumb === i
                                            ? "border-teal-700"
                                            : "border-transparent hover:border-slate-300"
                                    }`}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={product.image}
                                            alt=""
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buy Card */}
                    <div>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-2 leading-tight">
                            {product.title}
                        </h1>
                        {product.tagline && (
                            <p className="text-slate-600 text-lg md:text-xl mb-5 leading-relaxed">
                                {product.tagline}
                            </p>
                        )}

                        {/* Trust Badges */}
                        <div className="flex gap-3 mb-6 flex-wrap">
                            {[
                                { Icon: Star, label: "4.9/5 Trustpilot" },
                                { Icon: Shield, label: "10 Year Warranty" },
                                { Icon: Flag, label: "Made in UK" },
                            ].map(({ Icon, label }) => (
                                <span
                                    key={label}
                                    className="flex items-center gap-1.5 text-base font-semibold bg-slate-100 px-3 py-1.5 rounded-md text-slate-700"
                                >
                                    <Icon size={16} className="text-teal-700 shrink-0" />
                                    {label}
                                </span>
                            ))}
                        </div>

                        {/* Buy Box */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-7">

                            {/* VAT Toggle */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold text-base text-slate-700">
                                    Pricing Mode:
                                </span>
                                <div className="flex bg-slate-200 rounded-full p-1">
                                    <button
                                        onClick={() => setVatExempt(true)}
                                        className={`px-3 py-1 text-sm font-semibold rounded-full transition-all ${
                                            vatExempt
                                                ? "bg-white text-teal-700 shadow-sm"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        Ex. VAT
                                    </button>
                                    <button
                                        onClick={() => setVatExempt(false)}
                                        className={`px-3 py-1 text-sm font-semibold rounded-full transition-all ${
                                            !vatExempt
                                                ? "bg-white text-teal-700 shadow-sm"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        Inc. VAT
                                    </button>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <div className="text-4xl font-bold text-slate-900 leading-none">
                                    {formatPrice(displayPrice)}
                                </div>
                                {vatExempt ? (
                                    <div className="flex items-center gap-1 text-green-600 font-semibold text-base mt-2">
                                        <Check size={16} strokeWidth={3} />
                                        VAT Relief Applied
                                    </div>
                                ) : (
                                    <div className="text-slate-600 text-base mt-2">
                                        Includes 20% VAT
                                    </div>
                                )}
                                {product.regularPrice && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-slate-400 text-base line-through">
                                            {formatPrice(product.regularPrice)}
                                        </span>
                                        <span className="text-green-600 text-sm font-semibold bg-green-50 px-2 py-0.5 rounded">
                                            Save {formatPrice(product.regularPrice - product.priceExVat)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center gap-2 text-base text-slate-600 mb-5">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                                In Stock — Ready for Installation
                            </div>

                            {/* Handing Selector */}
                            <div className="border-t border-slate-200 pt-5 mb-5">
                                <span className="block font-semibold text-base text-slate-700 mb-3">
                                    Door Position (Handing):
                                </span>
                                <div className="flex gap-3">
                                    {["Left Hand", "Right Hand"].map(h => (
                                        <button
                                            key={h}
                                            onClick={() => setSelectedHanding(h)}
                                            className={`flex-1 border-2 rounded-lg py-3 text-base font-semibold transition-all min-h-[48px] ${
                                                selectedHanding === h
                                                    ? "border-teal-700 bg-teal-50 text-teal-700"
                                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                            }`}
                                        >
                                            {h === "Left Hand" ? "← " : "→ "}
                                            {h}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-600 mt-2">
                                    Not sure? We verify this during your free home survey.
                                </p>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col gap-3">
                                <Link
                                    href={`/free-brochure?product=${product.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-xl font-bold text-lg transition-colors w-full min-h-[48px] shadow-sm text-center"
                                >
                                    Request Free Brochure
                                </Link>
                                <button className="bg-white border-2 border-slate-900 text-slate-900 py-3.5 rounded-xl font-bold text-lg transition-colors w-full hover:bg-slate-50 min-h-[48px]">
                                    Book Free Survey
                                </button>
                            </div>

                            <div className="text-center mt-4 text-sm text-slate-600 flex items-center justify-center gap-1">
                                <Lock size={14} />
                                No Hard Sell Guarantee. Just honest advice.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose */}
            {product.whyChoose && product.whyChoose.length > 0 && (
                <section className="border-t border-slate-200 py-12 md:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
                            Why the {product.title} is the Best Choice
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {product.whyChoose.map((item, i) => {
                                const Icon = WHY_CHOOSE_ICONS[i % WHY_CHOOSE_ICONS.length];
                                return (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center shrink-0">
                                            <Icon size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl font-bold text-slate-900 mb-1 leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Comparison Table */}
            <section className="border-t border-slate-200 py-12 md:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
                        Choose Your Specification
                    </h2>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                        <table className="w-full border-collapse min-w-[560px]">
                            <thead>
                                <tr>
                                    <th className="p-4 text-left bg-slate-100 font-bold text-slate-900 border-b border-slate-200 sticky left-0 border-r border-slate-200">
                                        Feature
                                    </th>
                                    {series66.map(p => (
                                        <th
                                            key={p.id}
                                            className={`p-4 text-center font-bold text-slate-900 border-b border-slate-200 ${
                                                p.id === product.id
                                                    ? "bg-teal-50 border-t-4 border-t-teal-700"
                                                    : "bg-slate-100"
                                            }`}
                                        >
                                            {p.id === product.id
                                                ? `${p.title.split(" ").pop()} (This Model)`
                                                : p.title.split(" ").pop()}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {COMP_ROWS.map((row, ri) => (
                                    <tr key={ri} className="border-b border-slate-100">
                                        <td className="p-4 text-left font-medium text-slate-700 bg-white sticky left-0 border-r border-slate-100">
                                            {row.label}
                                        </td>
                                        {series66.map((p, pi) => (
                                            <td
                                                key={p.id}
                                                className={`p-4 text-center ${
                                                    p.id === product.id ? "bg-teal-50" : "bg-white"
                                                }`}
                                            >
                                                {row.values[pi] ? (
                                                    <Check
                                                        size={18}
                                                        className="text-teal-700 mx-auto"
                                                        strokeWidth={3}
                                                    />
                                                ) : (
                                                    <span className="text-slate-300 text-lg">—</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr>
                                    <td className="p-4 text-left font-semibold text-slate-700 bg-white sticky left-0 border-r border-slate-100">
                                        Price (Ex VAT)
                                    </td>
                                    {series66.map(p => (
                                        <td
                                            key={p.id}
                                            className={`p-4 text-center font-bold ${
                                                p.id === product.id
                                                    ? "bg-teal-50 text-teal-800"
                                                    : "bg-white text-slate-900"
                                            }`}
                                        >
                                            {formatPrice(p.priceExVat)}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Technical Specs */}
            {product.techSpecs && product.techSpecs.length > 0 && (
                <section className="border-t border-slate-200 py-12 md:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
                            Technical Specifications
                        </h2>
                        <div className="max-w-2xl mx-auto">
                            {product.techSpecs.map((spec, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between py-4 border-b border-slate-200"
                                >
                                    <span className="font-semibold text-slate-900">{spec.label}</span>
                                    <span className="text-slate-600">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
                <section className="border-t border-slate-200 py-12 md:py-16 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
                            Customer Reviews
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.reviews.map((review, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl p-6 border border-slate-200"
                                >
                                    <div className="text-amber-400 text-xl mb-3">★★★★★</div>
                                    <p className="italic text-slate-600 mb-4 leading-relaxed">
                                        &ldquo;{review.text}&rdquo;
                                    </p>
                                    <span className="font-semibold text-base text-slate-900">
                                        — {review.author}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <TrustBar />
            <FAQSection />
            <Footer />

            {/* Mobile Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t-2 border-teal-700 px-4 py-3 flex items-center gap-4 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
                <div className="font-bold text-2xl text-slate-900 shrink-0">
                    {formatPrice(displayPrice)}
                </div>
                <Link
                    href={`/free-brochure?product=${product.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex-1 bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-bold text-lg transition-colors min-h-[48px] text-center"
                >
                    Request Free Brochure
                </Link>
            </div>
        </main>
    );
}
