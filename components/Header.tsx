"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, Sparkles } from "lucide-react";
import { BathWizardModal } from "@/components/BathWizardModal";
import { WalkInBathsWizardModal } from "@/components/WalkInBathsWizardModal";
import { useWizardStore } from "@/lib/wizardStore";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { activeWizard, openWizard, closeWizard } = useWizardStore();

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 h-20 md:h-[88px] flex items-center justify-between">
                    {/* Logo (Updated) */}
                    <div className="relative w-40 h-10 md:w-60 md:h-14 shrink-0">
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
                    <div className="flex items-center gap-4 lg:gap-10">

                        {/* Desktop: Free Brochure Button */}
                        <Link href="/free-brochure" className="hidden lg:inline-flex items-center px-6 py-3 rounded-full border-2 border-teal-700 text-teal-700 font-bold text-lg tracking-wide hover:bg-teal-50 transition-colors active:scale-95">
                            Free Brochure
                        </Link>

                        {/* Desktop: Phone Info Block (Text Stack) */}
                        <div className="hidden lg:flex flex-col items-end leading-tight">
                            <a href="tel:08001234567" className="group flex items-center gap-3 text-[28px] font-bold text-slate-900 hover:text-teal-700 transition-colors">
                                <Phone size={26} className="text-teal-700 group-hover:scale-110 transition-transform" fill="currentColor" />
                                0800 123 4567
                            </a>
                            <div className="text-sm font-medium text-slate-500 mt-1 flex gap-3">
                                <span className="text-teal-700 font-bold uppercase tracking-wider">Call Free</span>
                                <span>Mon–Fri 9am–5pm</span>
                            </div>
                        </div>

                        {/* Mobile: Compact Call Button */}
                        <a href="tel:08001234567" className="lg:hidden flex items-center gap-3 bg-teal-700 hover:bg-teal-800 px-6 py-3 rounded-full shadow-md transition-all group text-white">
                            <Phone size={22} fill="currentColor" />
                            <span className="font-bold text-lg">Call Us</span>
                        </a>

                        {/* Menu Toggle (Visible on both Mobile and Desktop) */}
                        <button
                            className="flex items-center gap-3 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl transition-all active:scale-95 group border border-slate-200"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <span className="font-bold tracking-wider text-base md:text-xl">MENU</span>
                            <Menu size={34} className="group-hover:scale-110 transition-transform" />
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
        </>
    );
};

const MenuOverlay = ({ isOpen, onClose, onOpenWizard }: { isOpen: boolean; onClose: () => void; onOpenWizard: () => void }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div
                className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />
            <div
                className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-8 border-b border-slate-100">
                    <span className="font-serif text-4xl font-bold text-slate-900">Menu</span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-slate-900 hover:bg-slate-100 transition"
                    >
                        <X size={40} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto py-8 px-8">

                    {/* Section 1: Our Products */}
                    <div className="mb-10">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Our Products</h4>
                        <nav className="flex flex-col gap-6 text-2xl font-medium text-slate-800">
                            <Link href="/walk-in-baths" className="py-4 border-b border-slate-100 hover:text-teal-700">Walk-in Baths</Link>
                            <Link href="/walk-in-shower-baths" className="py-4 border-b border-slate-100 hover:text-teal-700">Walk-in Shower Baths</Link>
                            <Link href="/standard-size-baths" className="py-4 border-b border-slate-100 hover:text-teal-700">Standard Size Baths</Link>
                            <Link href="/deep-soaker-baths" className="py-4 border-b border-slate-100 hover:text-teal-700">Deep Soaker Baths</Link>
                        </nav>
                    </div>

                    {/* Section 2: Help & Advice */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Help & Advice</h4>
                        <nav className="flex flex-col gap-6 text-xl font-medium text-slate-800">
                            <Link href="/about" className="py-4 border-b border-slate-100 hover:text-teal-700">About</Link>
                            <button
                                onClick={() => { onClose(); onOpenWizard(); }}
                                className="py-4 border-b border-slate-100 text-teal-700 font-bold flex items-center gap-3 w-full text-left"
                            >
                                <Sparkles size={24} className="text-teal-600" />
                                Help Me Choose
                            </button>
                            <a href="#" className="py-4 border-b border-slate-100 hover:text-teal-700">VAT Relief Guide</a>
                            <a href="#" className="py-4 border-b border-slate-100 hover:text-teal-700">Right vs Left Hand?</a>
                            <Link href="/faq" className="py-4 border-b border-slate-100 hover:text-teal-700">FAQ</Link>
                            <Link href="/reviews" className="py-4 border-b border-slate-100 hover:text-teal-700">Customer Reviews</Link>
                            <Link href="/contact" className="py-4 border-b border-slate-100 hover:text-teal-700">Contact</Link>
                        </nav>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-8 bg-white border-t border-slate-100 mt-auto">
                    <p className="text-center text-slate-500 text-lg mb-6">Need to speak to a human?</p>
                    <div className="flex flex-col gap-4">
                        <a href="tel:08001234567" className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-5 rounded-2xl shadow-md flex items-center justify-center gap-3 text-2xl active:scale-95 transition-transform">
                            <Phone size={28} fill="currentColor" />
                            Call Now
                        </a>
                        <button className="bg-white border-2 border-slate-300 text-slate-800 font-bold py-5 rounded-2xl hover:bg-slate-50 flex items-center justify-center text-2xl active:scale-95 transition-transform">
                            Get Quote
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
