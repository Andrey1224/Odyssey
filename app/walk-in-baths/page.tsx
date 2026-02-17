"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, PlayCircle, Star, CheckCircle2, Flag, Percent, SlidersHorizontal } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBar } from "@/components/TrustBar";
import { FilterSidebar, FilterState } from "@/components/FilterSidebar";
import { CollectionProductCard } from "@/components/CollectionProductCard";
import { BrochureBridge } from "@/components/BrochureBridge";
import { FAQSection } from "@/components/FAQSection";
import { WALK_IN_BATHS } from "@/data/walkInBaths";
import { TAGS } from "@/data/tags";
import { EMPTY_FILTERS } from "@/components/FilterSidebar";

function WalkInBathsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const parseFilters = (): FilterState => ({
        vatExempt: searchParams.get('vat') !== 'standard',
        width: searchParams.get('width')?.split(',').filter(Boolean) ?? [],
        doorType: searchParams.get('doorType')?.split(',').filter(Boolean) ?? [],
        package: searchParams.get('pkg')?.split(',').filter(Boolean) ?? [],
        handing: searchParams.get('handing')?.split(',').filter(Boolean) ?? [],
        features: searchParams.get('features')?.split(',').filter(Boolean) ?? [],
        access: searchParams.get('access')?.split(',').filter(Boolean) ?? [],
    });

    const [filters, setFilters] = useState<FilterState>(parseFilters);
    const [showDrawer, setShowDrawer] = useState(false);

    const updateFilters = (next: FilterState) => {
        setFilters(next);
        const params = new URLSearchParams();
        if (!next.vatExempt) params.set('vat', 'standard');
        if (next.width.length) params.set('width', next.width.join(','));
        if (next.doorType.length) params.set('doorType', next.doorType.join(','));
        if (next.package.length) params.set('pkg', next.package.join(','));
        if (next.handing.length) params.set('handing', next.handing.join(','));
        if (next.features.length) params.set('features', next.features.join(','));
        if (next.access.length) params.set('access', next.access.join(','));
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    // Tag-based filtering (AND between groups, OR within group; features requires ALL selected)
    const filteredProducts = WALK_IN_BATHS.filter(product => {
        const tags = TAGS[product.id];
        if (!tags) return true;

        if (filters.width.length && !filters.width.includes(String(tags.widthMm))) return false;
        if (filters.doorType.length && !filters.doorType.includes(tags.doorType)) return false;
        if (filters.package.length && !filters.package.includes(tags.variant)) return false;
        if (filters.handing.length && !filters.handing.some(h => tags.handing.includes(h as "left" | "right"))) return false;
        if (filters.features.length && !filters.features.every(f => tags.features.includes(f as never))) return false;
        if (filters.access.includes("wideDoor") && !tags.doorOpeningMm) return false;

        return true;
    });

    return (
        <>
            {/* HERO SECTION */}
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

            {/* TRUST STRIP */}
            <div className="bg-[#f1f5f9] py-2 border-b border-[#e2e8f0] mb-5">
                <div className="max-w-[1280px] mx-auto px-5">
                    <div className="flex justify-center flex-wrap gap-10">
                        <div className="flex items-center gap-2 text-[0.9rem] font-medium text-[#1e293b]">
                            <span className="text-[#117a7a]"><Star size={14} /></span> 4.9/5 Trustpilot
                        </div>
                        <div className="flex items-center gap-2 text-[0.9rem] font-medium text-[#1e293b]">
                            <span className="text-[#117a7a]"><CheckCircle2 size={14} /></span> 10 Year Warranty
                        </div>
                        <div className="flex items-center gap-2 text-[0.9rem] font-medium text-[#1e293b]">
                            <span className="text-[#117a7a]"><Flag size={14} /></span> Made in UK
                        </div>
                        <div className="flex items-center gap-2 text-[0.9rem] font-medium text-[#1e293b]">
                            <span className="text-[#117a7a]"><Percent size={14} /></span> VAT Relief Handled
                        </div>
                    </div>
                </div>
            </div>

            {/* INFO SECTION */}
            <section className="bg-white py-2 mb-5 border-b border-slate-100">
                <div className="max-w-[1280px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a walk-in bath?</h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            A walk-in bath is a bathtub with a watertight door and a low step-in entry,
                            designed to make bathing safer and easier for those with limited mobility.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-3 text-slate-700">
                                <Check size={20} className="text-[#117a7a] shrink-0 mt-0.5" />
                                <span>Low threshold entry (reduced trip risk)</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <Check size={20} className="text-[#117a7a] shrink-0 mt-0.5" />
                                <span>Built-in seat for safer transfers</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <Check size={20} className="text-[#117a7a] shrink-0 mt-0.5" />
                                <span>Easy-to-use door handle and secure seal</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <Check size={20} className="text-[#117a7a] shrink-0 mt-0.5" />
                                <span>Optional spa comfort (jets, heated seat)</span>
                            </li>
                        </ul>
                        <button className="flex items-center gap-2 text-teal-700 font-bold border border-teal-200 px-5 py-2.5 rounded-full hover:bg-teal-50 transition-colors">
                            <PlayCircle size={20} />
                            See how it works (30 sec)
                        </button>
                    </div>
                    <div className="relative bg-slate-50 rounded-xl overflow-hidden border border-slate-200 p-2">
                        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-white">
                            <Image
                                src="/images/Walkin.jpg"
                                alt="Walk-in Bath Diagram showing door, seat, and seal"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Desktop Sidebar — hidden on mobile */}
                    <div className="hidden lg:block sticky top-24 z-10 w-full lg:w-auto">
                        <FilterSidebar filters={filters} setFilters={updateFilters} />
                    </div>

                    {/* Mobile Filter Drawer Overlay */}
                    {showDrawer && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div
                                className="absolute inset-0 bg-black/40"
                                onClick={() => setShowDrawer(false)}
                            />
                            <div className="absolute top-0 left-0 h-full w-[320px] max-w-full bg-white overflow-y-auto p-5 shadow-xl">
                                <FilterSidebar
                                    filters={filters}
                                    setFilters={updateFilters}
                                    onClose={() => setShowDrawer(false)}
                                                                    />
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1 w-full">

                        {/* Results Count + Mobile Filter Button */}
                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
                            <span className="font-bold text-slate-700">
                                Showing {filteredProducts.length} results
                            </span>
                            <button
                                onClick={() => setShowDrawer(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                            >
                                <SlidersHorizontal size={16} />
                                Filters
                            </button>
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
                                    onClick={() => updateFilters({ vatExempt: filters.vatExempt, ...EMPTY_FILTERS })}
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
        </>
    );
}

export default function WalkInBathsPage() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200">
            <Header />
            <Suspense fallback={null}>
                <WalkInBathsContent />
            </Suspense>
            <TrustBar />
            <FAQSection />
            <Footer />
        </main>
    );
}
