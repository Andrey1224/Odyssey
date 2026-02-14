"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustStrip } from "@/components/TrustStrip";
import { TrustBar } from "@/components/TrustBar";
import { FilterSidebar, FilterState } from "@/components/FilterSidebar";
import { CollectionProductCard } from "@/components/CollectionProductCard";
import { BrochureBridge } from "@/components/BrochureBridge";

// Mock Data
const PRODUCTS = [
    {
        id: "1",
        title: "Serenity 66 Classic",
        priceExVat: 2708,
        image: "/images/Walk-inBath.png",
        description: "Our core model offering essential safety and comfort with a low-step entry.",
        features: ["Low-level entry", "Slip-resistant seat", "Leak-free door"],
        dimensions: "1675mm",
        capacity: "Low",
        category: "walk-in",
        handing: "Left Hand",
        size: "66\" (Standard)",
        keyFeatures: [],
        stepLevel: "Low",
        system: "Classic"
    },
    {
        id: "2",
        title: "Serenity 66 Plus",
        priceExVat: 3208,
        image: "/images/DeepSoaker.png",
        description: "Enhanced comfort featuring our signature Air Spa system for gentle relaxation.",
        features: ["Air Spa System", "Digital controls", "Rapid fill technology"],
        dimensions: "1675mm",
        capacity: "Air Spa",
        category: "walk-in",
        handing: "Right Hand",
        size: "66\" (Standard)",
        keyFeatures: ["Air Spa Jets"],
        stepLevel: "Low",
        system: "Air Spa"
    },
    {
        id: "3",
        title: "Serenity 66 Special",
        priceExVat: 3908,
        image: "/images/StandardEasy-Access.png",
        description: "The ultimate luxury experience with heated seating and chromotherapy.",
        features: ["Heated Seat & Back", "Chromotherapy", "Luxury Headrest"],
        dimensions: "1675mm",
        capacity: "Heated",
        category: "walk-in",
        handing: "Left Hand",
        size: "66\" (Standard)",
        keyFeatures: ["Heated Seat", "Chromotherapy"],
        stepLevel: "Low",
        system: "Luxury"
    },
    {
        id: "4",
        title: "Serenity 75 Grand",
        priceExVat: 4100,
        image: "/images/Walk-inBath.png",
        description: "Extended length for taller bathers, offering extra legroom and comfort.",
        features: ["Extended legroom", "Reinforced frame", "High-flow waste"],
        dimensions: "1900mm",
        capacity: "260L",
        category: "lay-down",
        handing: "Right Hand",
        size: "75\" (Extended)",
        keyFeatures: ["Heated Seat"],
        stepLevel: "Low",
        system: "Grand"
    }
];

export default function WalkInBathsPage() {
    const [filters, setFilters] = useState<FilterState>({
        vatExempt: true,
        size: [],
        handing: [],
        features: []
    });

    // Filtering Logic
    const filteredProducts = PRODUCTS.filter(product => {
        // Size Filter
        if (filters.size.length > 0 && !filters.size.includes(product.size)) return false;
        // Handing Filter
        if (filters.handing.length > 0 && !filters.handing.includes(product.handing)) return false;
        // Features Filter (Must have ALL selected features? Or ANY? Let's go with ANY for now to be permissive, or ALL for strict. Let's do ANY match for better UX typically, but strict is often expected. Let's do strict intersection.)
        // Actually, usually filters are "OR" within category, "AND" between categories.
        // But here `features` implies capability. Let's simplify: checks if product has *at least one* of the selected features if any are selected.
        // Or if strict: product.keyFeatures includes ALL selected.
        // Let's stick to simple: if filter selected, product must match.
        if (filters.features.length > 0) {
            const hasFeature = filters.features.some(f => product.keyFeatures?.includes(f));
            if (!hasFeature) return false;
        }

        return true;
    });

    return (
        <main className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200">
            <Header />

            {/* HERO SECTION - Strictly matching .cat-hero */}
            <section className="bg-white py-10 text-center">
                <div className="max-w-[1280px] mx-auto px-5">
                    <h1 className="text-[2.5rem] font-bold text-[#0f172a] mb-2.5">
                        Walk-in Baths
                    </h1>
                    <p className="text-[#475569] max-w-[600px] mx-auto text-[1.1rem] leading-[1.5]">
                        Safety, comfort, and easy access tailored to your home. Browse our UK-made collection.
                    </p>
                </div>
            </section>

            {/* TRUST STRIP - Strictly matching .trust-strip */}
            <div className="bg-[#f1f5f9] py-3 border-b border-[#e2e8f0] mb-10">
                <div className="max-w-[1280px] mx-auto px-5">
                    <div className="flex justify-center flex-wrap gap-10">
                        <div className="flex items-center gap-2 text-[0.9rem] font-medium text-[#1e293b]">
                            <span className="text-[#117a7a]"><i className="fas fa-star"></i></span> 4.9/5 Trustpilot
                        </div>
                        <div className="flex items-center gap-2 text-[0.9rem] font-medium text-[#1e293b]">
                            <span className="text-[#117a7a]"><i className="fas fa-check-circle"></i></span> 10 Year Warranty
                        </div>
                        <div className="flex items-center gap-2 text-[0.9rem] font-medium text-[#1e293b]">
                            <span className="text-[#117a7a]"><i className="fas fa-flag"></i></span> Made in UK
                        </div>
                        <div className="flex items-center gap-2 text-[0.9rem] font-medium text-[#1e293b]">
                            <span className="text-[#117a7a]"><i className="fas fa-percentage"></i></span> VAT Relief Handled
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Sidebar */}
                    <div className="sticky top-24 z-10 w-full lg:w-auto">
                        <FilterSidebar filters={filters} setFilters={setFilters} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 w-full">

                        {/* Results Count */}
                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
                            <span className="font-bold text-slate-700">
                                Showing {filteredProducts.length} results
                            </span>
                            {/* Mobile Filter Toggle could go here */}
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredProducts.map(product => (
                                <CollectionProductCard
                                    key={product.id}
                                    {...product}
                                    vatExempt={filters.vatExempt}
                                />
                            ))}
                        </div>

                        {/* No Results Fallback */}
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No baths found fitting criteria</h3>
                                <p className="text-slate-500 mb-6">Try adjusting your filters to see more results.</p>
                                <button
                                    onClick={() => setFilters({ vatExempt: true, size: [], handing: [], features: [] })}
                                    className="text-teal-700 font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {/* Brochure Bridge */}
                        <BrochureBridge />

                    </div>
                </div>
            </div>

            <TrustBar />
            <Footer />
        </main>
    );
}
