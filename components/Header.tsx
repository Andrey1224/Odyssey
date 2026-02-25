"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, Sparkles } from "lucide-react";
import { BathWizardModal } from "@/components/BathWizardModal";
import { WalkInBathsWizardModal } from "@/components/WalkInBathsWizardModal";
import { WalkInShowerWizardModal } from "@/components/WalkInShowerWizardModal";
import { StandardSizeWizardModal } from "@/components/StandardSizeWizardModal";
import { DeepSoakerWizardModal } from "@/components/DeepSoakerWizardModal";
import { useWizardStore } from "@/lib/wizardStore";
import { PHONE, PHONE_TEL } from "@/lib/site";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { activeWizard, openWizard, closeWizard } = useWizardStore();

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-cream-50 border-b border-slate-200 shadow-sm transition-all duration-300 overflow-x-clip">
                <div className="max-w-7xl mx-auto px-4 h-20 md:h-[88px] flex items-center justify-between gap-2">
                    {/* Logo (Updated) */}
                    <div className="relative w-28 h-10 md:w-60 md:h-14 shrink-0">
                        <Link href="/" className="block relative w-full h-full">
                            <Image
                                src="/images/ODYSSEY_Transparent-File-2048x735.webp"
                                alt="Odyssey Baths"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-4 lg:gap-10 min-w-0">

                        {/* Desktop: Free Brochure Button */}
                        <Link href="/free-brochure" className="hidden lg:inline-flex items-center px-6 py-3 rounded-full border-2 border-teal-700 text-teal-800 font-bold text-lg tracking-wide hover:bg-teal-50 transition-colors active:scale-95">
                            Free Brochure
                        </Link>

                        {/* Desktop: Phone Info Block (Text Stack) */}
                        <div className="hidden lg:flex flex-col items-end leading-tight">
                            <a href={`tel:+${PHONE_TEL}`} className="group flex items-center gap-3 text-[28px] font-bold text-slate-900 hover:text-teal-800 transition-colors">
                                <Phone size={26} className="text-teal-800 group-hover:scale-110 transition-transform" fill="currentColor" />
                                {PHONE}
                            </a>
                            <div className="text-sm font-medium text-slate-600 mt-1 flex gap-3">
                                <span className="text-teal-800 font-bold uppercase tracking-wider">Call Free</span>
                                <span>Mon–Fri 9am–5pm</span>
                            </div>
                        </div>

                        {/* Mobile: Compact Call Button */}
                        <a href={`tel:+${PHONE_TEL}`} className="lg:hidden flex items-center gap-1.5 bg-teal-800 hover:bg-teal-900 px-3 py-2.5 rounded-full shadow-md transition-all group text-white shrink-0">
                            <Phone size={18} fill="currentColor" />
                            <span className="font-bold text-sm">Call Us</span>
                        </a>

                        {/* Menu Toggle (Visible on both Mobile and Desktop) */}
                        <button
                            className="flex items-center gap-1.5 md:gap-3 px-3 py-2 md:px-6 md:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl md:rounded-2xl transition-all active:scale-95 group border border-slate-200 shrink-0 mr-1"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <span className="font-bold tracking-wider text-sm md:text-xl">MENU</span>
                            <Menu size={20} className="md:w-[34px] md:h-[34px] group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu Overlay (Visible on both Mobile and Desktop) */}
            <MenuOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onOpenWizard={() => openWizard("global")}
            />

            <BathWizardModal
                key={activeWizard === "global" ? "global-open" : "global-closed"}
                isOpen={activeWizard === "global"}
                onClose={closeWizard}
            />
            <WalkInBathsWizardModal
                key={activeWizard === "walk-in-baths" ? "walkin-open" : "walkin-closed"}
                isOpen={activeWizard === "walk-in-baths"}
                onClose={closeWizard}
            />
            <WalkInShowerWizardModal
                key={activeWizard === "walk-in-shower-baths" ? "shower-open" : "shower-closed"}
                isOpen={activeWizard === "walk-in-shower-baths"}
                onClose={closeWizard}
            />
            <StandardSizeWizardModal
                key={activeWizard === "standard-size-baths" ? "standard-open" : "standard-closed"}
                isOpen={activeWizard === "standard-size-baths"}
                onClose={closeWizard}
            />
            <DeepSoakerWizardModal
                key={activeWizard === "deep-soaker-baths" ? "deepsoaker-open" : "deepsoaker-closed"}
                isOpen={activeWizard === "deep-soaker-baths"}
                onClose={closeWizard}
            />
        </>
    );
};

const MenuOverlay = ({ isOpen, onClose, onOpenWizard }: { isOpen: boolean; onClose: () => void; onOpenWizard: () => void }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return (
        <>
            {isOpen && (
            <div
                className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm"
                onClick={onClose}
            />
            )}
            {isOpen && (
            <div
                className="fixed right-0 inset-y-0 z-[60] w-[85%] max-w-sm bg-cream-50 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 md:p-8 border-b border-slate-100">
                    <span className="font-serif text-2xl md:text-4xl font-bold text-slate-900">Menu</span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-slate-900 hover:bg-slate-100 transition"
                    >
                        <X size={32} className="md:w-10 md:h-10" strokeWidth={2.5} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto py-6 px-6 md:py-8 md:px-8">

                    {/* Section 1: Our Products */}
                    <div className="mb-8 md:mb-10">
                        <h4 className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-widest mb-4 md:mb-6">Our Products</h4>
                        <nav className="flex flex-col gap-4 md:gap-6 text-xl md:text-2xl font-medium text-slate-800">
                            <Link href="/walk-in-baths" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">Walk-in Baths</Link>
                            <Link href="/walk-in-shower-baths" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">Walk-in Shower Baths</Link>
                            <Link href="/standard-size-baths" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">Standard Size Baths</Link>
                            <Link href="/deep-soaker-baths" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">Deep Soaker Baths</Link>
                        </nav>
                    </div>

                    {/* Section 2: Help & Advice */}
                    <div>
                        <h4 className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-widest mb-4 md:mb-6">Help & Advice</h4>
                        <nav className="flex flex-col gap-4 md:gap-6 text-lg md:text-xl font-medium text-slate-800">
                            <Link href="/about" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">About</Link>
                            <button
                                onClick={() => { onClose(); onOpenWizard(); }}
                                className="py-3 md:py-4 border-b border-slate-100 text-teal-800 font-bold flex items-center gap-3 w-full text-left"
                            >
                                <Sparkles size={20} className="text-teal-800 md:w-6 md:h-6" />
                                Help Me Choose
                            </button>
                            <a href="#" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">VAT Relief Guide</a>
                            <a href="#" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">Right vs Left Hand?</a>
                            <Link href="/blog" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">Advice & Guides</Link>
                            <Link href="/faq" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">FAQ</Link>
                            <Link href="/reviews" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">Customer Reviews</Link>
                            <Link href="/contact" className="py-3 md:py-4 border-b border-slate-100 hover:text-teal-800">Contact</Link>
                        </nav>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 md:p-8 bg-cream-50 border-t border-slate-100 mt-auto">
                    <p className="text-center text-slate-600 text-sm md:text-lg mb-4 md:mb-6">Need to speak to a human?</p>
                    <div className="flex flex-col gap-3 md:gap-4">
                        <a href={`tel:+${PHONE_TEL}`} className="bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 md:py-5 rounded-xl md:rounded-2xl shadow-md flex items-center justify-center gap-2 md:gap-3 text-lg md:text-2xl active:scale-95 transition-transform">
                            <Phone size={20} className="md:w-7 md:h-7" fill="currentColor" />
                            Call Now
                        </a>
                        <Link
                            href="/free-quote"
                            onClick={onClose}
                            className="bg-cream-50 border-2 border-slate-300 text-slate-800 font-bold py-3 md:py-5 rounded-xl md:rounded-2xl hover:bg-slate-50 flex items-center justify-center text-lg md:text-2xl active:scale-95 transition-transform"
                        >
                            Get Quote
                        </Link>
                    </div>
                </div>
            </div>
            )}
        </>
    );
};
