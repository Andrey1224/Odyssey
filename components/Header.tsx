"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, Menu, X, Sparkles } from "lucide-react";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-24 flex items-center justify-between">
                    {/* Logo (Updated) */}
                    <div className="relative w-32 h-10 md:w-48 md:h-12 shrink-0">
                        <a href="/" className="block relative w-full h-full">
                            <Image
                                src="/images/ODYSSEY_Transparent-File-2048x735.webp"
                                alt="Odyssey Baths"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </a>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex gap-10 items-center">
                        <a href="/walk-in-baths" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Walk-in Baths</a>
                        <a href="#" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Showers</a>
                        <a href="#" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Reviews</a>
                        <a href="/contact" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Contact</a>
                    </nav>

                    {/* Right Actions (Mobile: Call Pill + Menu) */}
                    <div className="flex items-center gap-4 lg:gap-8">

                        {/* Desktop: Free Brochure Button */}
                        <a href="/free-brochure" className="hidden lg:inline-flex items-center px-6 py-2.5 rounded-full border border-teal-700 text-teal-700 font-bold text-sm tracking-wide hover:bg-teal-50 transition-colors active:scale-95">
                            Free Brochure
                        </a>

                        {/* Desktop: Phone Info Block (Text Stack) */}
                        <div className="hidden lg:flex flex-col items-end leading-tight">
                            <a href="tel:08001234567" className="group flex items-center gap-2 text-2xl font-bold text-slate-900 hover:text-teal-700 transition-colors">
                                <Phone size={24} className="text-teal-700 group-hover:scale-110 transition-transform" fill="currentColor" />
                                0800 123 4567
                            </a>
                            <div className="text-xs font-medium text-slate-500 mt-1 flex gap-2">
                                <span className="text-teal-700 font-bold uppercase tracking-wider">Call Free</span>
                                <span>Mon–Fri 9am–5pm</span>
                            </div>
                        </div>

                        {/* Mobile: Compact Call Button */}
                        <a href="tel:08001234567" className="lg:hidden flex items-center gap-2 bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded-full shadow-sm transition-all group text-white">
                            <Phone size={18} fill="currentColor" />
                            <span className="font-bold text-sm">Call Us</span>
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 z-[60] lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
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
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <span className="font-serif text-3xl font-bold text-slate-900">Menu</span>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-slate-900 hover:bg-slate-100 transition"
                    >
                        <X size={32} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto py-6 px-6">

                    {/* Section 1: Our Products */}
                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Our Products</h4>
                        <nav className="flex flex-col gap-4 text-xl font-medium text-slate-800">
                            <a href="/walk-in-baths" className="py-3 border-b border-slate-100 hover:text-teal-700">Walk-in Baths</a>
                            <a href="#" className="py-3 border-b border-slate-100 hover:text-teal-700">Walk-in Showers</a>
                            <a href="#" className="py-3 border-b border-slate-100 hover:text-teal-700 flex items-center">
                                Wet Rooms
                                <span className="ml-3 bg-teal-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">New</span>
                            </a>
                            <a href="#" className="py-3 border-b border-slate-100 hover:text-teal-700">Deep Soakers</a>
                        </nav>
                    </div>

                    {/* Section 2: Help & Advice */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Help & Advice</h4>
                        <nav className="flex flex-col gap-4 text-lg font-medium text-slate-800">
                            <a href="#" className="py-3 border-b border-slate-100 text-teal-700 font-bold flex items-center gap-2">
                                <Sparkles size={20} className="text-teal-600" />
                                Help Me Choose
                            </a>
                            <a href="#" className="py-3 border-b border-slate-100 hover:text-teal-700">VAT Relief Guide</a>
                            <a href="#" className="py-3 border-b border-slate-100 hover:text-teal-700">Right vs Left Hand?</a>
                            <a href="#" className="py-3 border-b border-slate-100 hover:text-teal-700">Customer Reviews</a>
                        </nav>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-white border-t border-slate-100 mt-auto">
                    <p className="text-center text-slate-500 text-sm mb-4">Need to speak to a human?</p>
                    <div className="flex gap-3">
                        <a href="tel:08001234567" className="flex-1 bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2 text-lg active:scale-95 transition-transform">
                            <Phone size={20} fill="currentColor" />
                            Call Now
                        </a>
                        <button className="flex-1 bg-white border-2 border-slate-300 text-slate-800 font-bold py-3.5 rounded-xl hover:bg-slate-50 flex items-center justify-center text-lg active:scale-95 transition-transform">
                            Get Quote
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
