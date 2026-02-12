"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    Phone,
    Menu,
    X,
    Star,
    Check,
    ShieldCheck,
    Wand2,
    ArrowRight,
    FileText,
    Hammer,
    Info
} from "lucide-react";

// --- Design V3 Implementation ---

export default function DesignV3() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="min-h-screen bg-[#FAFAF9] font-sans text-slate-900 antialiased pb-20 md:pb-0">
            {/* 1. Mobile-Optimized Sticky Header */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Left: Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <a href="#" className="relative w-32 h-10 md:w-40 md:h-12 block">
                                {/* Using existing logo asset */}
                                <Image
                                    src="/images/ODYSSEY_Transparent-File-2048x735.webp"
                                    alt="Odyssey Baths"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </a>
                        </div>

                        {/* Center: Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            <a href="#baths" className="text-slate-600 hover:text-[#0D9488] font-medium transition-colors">Walk-in Baths</a>
                            <a href="#showers" className="text-slate-600 hover:text-[#0D9488] font-medium transition-colors">Showers</a>
                            <a href="#reviews" className="text-slate-600 hover:text-[#0D9488] font-medium transition-colors">Reviews</a>
                            <a href="#contact" className="text-slate-600 hover:text-[#0D9488] font-medium transition-colors">Contact</a>
                        </nav>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3 md:gap-4">

                            {/* Desktop Secondary CTA */}
                            <a href="#brochure" className="hidden md:inline-flex items-center justify-center border-2 border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white px-5 py-2 rounded-lg font-bold transition-colors text-base">
                                Free Brochure
                            </a>

                            {/* Phone Block (Mobile: Button, Desktop: Text Block) */}
                            <div className="flex items-center">
                                {/* Mobile Button */}
                                <a href="tel:08001234567" className="md:hidden flex items-center justify-center bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm sm:text-base group">
                                    <Phone className="mr-2" size={16} fill="currentColor" />
                                    <span className="hidden xs:inline">Call Us</span>
                                    <span className="xs:hidden">Call</span>
                                </a>

                                {/* Desktop Text Block */}
                                <div className="hidden md:flex flex-col items-end">
                                    <a href="tel:08001234567" className="flex items-center font-bold text-xl text-slate-900 hover:text-[#0D9488] transition-colors leading-tight">
                                        <Phone className="mr-2" size={20} fill="currentColor" />
                                        <span>0800 123 4567</span>
                                    </a>
                                    <div className="text-xs text-slate-500 font-medium mt-0.5 text-right">
                                        <span className="block">Mon–Fri 9am–5pm</span>
                                        <span className="block text-[#0D9488] font-bold uppercase tracking-wider">Call Free</span>
                                    </div>
                                </div>
                            </div>

                            {/* Burger Button (Mobile Only) */}
                            <button
                                onClick={toggleMenu}
                                className="md:hidden p-2 text-slate-900 hover:text-[#0D9488] focus:outline-none transition-colors"
                                aria-label="Menu"
                            >
                                <Menu size={32} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-[#FAFAF9] w-full h-full overflow-y-auto transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <span className="font-serif font-bold text-2xl text-slate-900">Menu</span>
                        <button onClick={closeMenu} className="text-slate-900 hover:text-[#0D9488] p-2 transition-colors">
                            <X size={36} />
                        </button>
                    </div>

                    {/* Products Group */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Our Products</h3>
                        <nav className="flex flex-col space-y-4">
                            <a href="#baths" onClick={closeMenu} className="text-xl font-medium text-slate-900 border-b border-slate-200 pb-2 hover:text-[#0D9488] transition-colors">Walk-in Baths</a>
                            <a href="#showers" onClick={closeMenu} className="text-xl font-medium text-slate-900 border-b border-slate-200 pb-2 hover:text-[#0D9488] transition-colors">Walk-in Showers</a>
                            <a href="#wetrooms" onClick={closeMenu} className="text-xl font-medium text-slate-900 border-b border-slate-200 pb-2 hover:text-[#0D9488] transition-colors">
                                Wet Rooms <span className="text-xs bg-[#0D9488] text-white px-2 py-0.5 rounded ml-2 align-middle">New</span>
                            </a>
                            <a href="#soakers" onClick={closeMenu} className="text-xl font-medium text-slate-900 border-b border-slate-200 pb-2 hover:text-[#0D9488] transition-colors">Deep Soakers</a>
                        </nav>
                    </div>

                    {/* Help Group */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Help & Advice</h3>
                        <nav className="flex flex-col space-y-4">
                            <a href="#quiz" onClick={closeMenu} className="text-xl font-bold text-[#0D9488] flex items-center hover:text-[#0F766E] transition-colors">
                                <Wand2 className="mr-3" size={20} /> Help Me Choose
                            </a>
                            <a href="#vat" onClick={closeMenu} className="text-lg font-medium text-slate-900 hover:text-[#0D9488] transition-colors">VAT Relief Guide</a>
                            <a href="#layout" onClick={closeMenu} className="text-lg font-medium text-slate-900 hover:text-[#0D9488] transition-colors">Right vs Left Hand?</a>
                            <a href="#reviews" onClick={closeMenu} className="text-lg font-medium text-slate-900 hover:text-[#0D9488] transition-colors">Customer Reviews</a>
                        </nav>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-200 text-center">
                        <p className="text-slate-500 mb-4">Need to speak to a human?</p>
                        <a href="tel:08001234567" className="block w-full bg-slate-900 text-white font-bold py-4 rounded-xl text-xl hover:bg-slate-800 transition-colors">0800 123 4567</a>
                    </div>
                </div>
            </div>

            {/* 2. Hero Section (Variant A - Static) */}
            <section className="relative bg-white overflow-hidden pb-12 pt-8">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">

                    {/* Trust Header Line (Mobile Specific) */}
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 mb-6 font-medium">
                        <span className="flex items-center text-[#0D9488]">
                            <Star className="mr-1 fill-current" size={14} /> Trustpilot 4.9/5
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="flex items-center">
                            🇬🇧 Made in UK
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-900">VAT Relief Handled</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* Text */}
                        <div>
                            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight mb-4">
                                Rediscover Your <br />
                                <span className="text-[#0D9488]">Independence.</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
                                Safety, comfort, and easy access tailored to your home. We guarantee no hard sell tactics—just honest support.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col gap-4">
                                <a href="#brochure" className="w-full sm:w-auto bg-[#0D9488] hover:bg-[#0F766E] text-white text-center text-lg font-bold px-8 py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center">
                                    Request Free Brochure
                                </a>
                                <div className="text-center text-sm text-slate-500 -mt-2 flex justify-center items-center">
                                    <Check className="text-[#0D9488] mr-1" size={16} /> No obligation · Takes 30 seconds
                                </div>

                                <a href="#quote" className="w-full sm:w-auto bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-center text-lg font-bold px-8 py-4 rounded-xl transition-colors flex items-center justify-center">
                                    Get Free Quote
                                </a>
                            </div>
                        </div>

                        {/* Hero Image (Static, Rounded) */}
                        <div className="relative mt-6 lg:mt-0">
                            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] relative bg-slate-200">
                                <Image
                                    src="/images/HeroImage.png"
                                    alt="Senior relaxing in a walk-in bath"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            {/* Trust Badge Overlay */}
                            <div className="absolute -bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-slate-100 flex items-center gap-2 z-10">
                                <ShieldCheck className="text-[#0D9488]" size={28} />
                                <div className="leading-tight">
                                    <div className="font-bold text-slate-900 text-sm">15 Year</div>
                                    <div className="text-xs text-slate-500">Warranty Included</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Range Hub (Product Categories) */}
            <section className="py-12 bg-[#FAFAF9] border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="font-serif font-bold text-3xl text-slate-900">Find Your Perfect Bath</h2>
                        <a href="#quiz" className="hidden sm:inline-flex items-center text-[#0D9488] font-bold hover:underline">
                            Help me choose <ArrowRight className="ml-1" size={16} />
                        </a>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Card 1: Walk-In Baths */}
                        <a href="#baths" className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all">
                            <div className="h-48 overflow-hidden relative bg-slate-100">
                                <Image
                                    src="/images/Walk-inBath.png"
                                    alt="Walk-in Bath"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">Walk-In Baths</h3>
                                <p className="text-sm text-slate-500 mb-4">Full length comfort & low threshold</p>
                                <span className="text-[#0D9488] font-bold text-sm uppercase tracking-wide group-hover:underline">View Range</span>
                            </div>
                        </a>

                        {/* Card 2: Walk-In Showers */}
                        <a href="#showers" className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all">
                            <div className="h-48 overflow-hidden relative bg-slate-100">
                                <Image
                                    src="/images/AccessibleShower.png"
                                    alt="Walk-in Shower"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">Walk-In Showers</h3>
                                <p className="text-sm text-slate-500 mb-4">Level access, no stepping over</p>
                                <span className="text-[#0D9488] font-bold text-sm uppercase tracking-wide group-hover:underline">View Range</span>
                            </div>
                        </a>

                        {/* Card 3: Wet Rooms */}
                        <a href="#wetrooms" className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all">
                            <div className="h-48 overflow-hidden relative bg-slate-100">
                                <Image
                                    src="/images/StandardEasy-Access.png"
                                    alt="Wet Room"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">Wet Rooms</h3>
                                <p className="text-sm text-slate-500 mb-4">Complete open-plan safety</p>
                                <span className="text-[#0D9488] font-bold text-sm uppercase tracking-wide group-hover:underline">View Range</span>
                            </div>
                        </a>

                        {/* Card 4: Deep Soakers */}
                        <a href="#soakers" className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all">
                            <div className="h-48 overflow-hidden relative bg-slate-100">
                                <Image
                                    src="/images/DeepSoaker.png"
                                    alt="Deep Soaker"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">Deep Soakers</h3>
                                <p className="text-sm text-slate-500 mb-4">Ideal for small spaces</p>
                                <span className="text-[#0D9488] font-bold text-sm uppercase tracking-wide group-hover:underline">View Range</span>
                            </div>
                        </a>

                    </div>

                    {/* Mobile Only Helper CTA */}
                    <div className="mt-8 sm:hidden">
                        <a href="#quiz" className="flex items-center justify-center w-full bg-slate-900 text-white py-3 rounded-lg font-bold shadow-md hover:bg-slate-800 transition-colors">
                            <Wand2 className="mr-2 text-[#0D9488]" size={20} /> Help me choose in 30s
                        </a>
                    </div>
                </div>
            </section>

            {/* 4. Trust Blocks (The "Why Us") */}
            <section className="py-12 bg-[#0D9488]/5 border-y border-[#0D9488]/10">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full text-[#0D9488] shadow-sm shrink-0">
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg">No Hard Sell Guarantee</h4>
                                <p className="text-slate-600 text-sm">Our advisors are not on commission. We give you the price and leave you to decide.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full text-[#0D9488] shadow-sm shrink-0">
                                <FileText size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg">VAT Relief Handled</h4>
                                <p className="text-slate-600 text-sm">Most customers save 20% due to chronic conditions. We do all the paperwork for you.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full text-[#0D9488] shadow-sm shrink-0">
                                <Hammer size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg">Nationwide Installation</h4>
                                <p className="text-slate-600 text-sm">Expert fitting teams across the UK. Installed in as little as 1 day.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. Decision Helper: Configuration */}
            <section className="py-16 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="bg-slate-900 rounded-2xl p-6 md:p-12 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-block bg-[#0D9488] text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-3">Avoid Mistakes</div>
                                <h2 className="font-serif font-bold text-3xl mb-4">Left Hand? Right Hand?</h2>
                                <p className="text-slate-300 mb-6 text-lg">Ordering the wrong orientation is the #1 mistake. Don't worry about technical terms—our free survey checks your plumbing.</p>
                                <a href="#survey" className="inline-block w-full sm:w-auto text-center bg-white text-slate-900 hover:bg-[#0D9488] hover:text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                    Check My Bathroom Layout
                                </a>
                            </div>
                            <div className="flex justify-center opacity-90">
                                <div className="bg-white/10 p-4 rounded-xl border border-white/20 relative aspect-[4/3] w-full max-w-sm">
                                    <Image
                                        src="/images/LeftHandCorner.png"
                                        alt="Diagram showing left vs right hand bath orientation"
                                        fill
                                        className="object-contain rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Ethical Promise (Simplified) */}
            <section className="py-16 bg-[#FAFAF9]">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <div className="w-16 h-16 bg-slate-300 rounded-full mx-auto mb-4 overflow-hidden border-2 border-white shadow relative">
                        {/* Placeholder for Paul's face if available, otherwise just initials or placeholder */}
                        <div className="w-full h-full bg-slate-400 flex items-center justify-center text-white font-bold text-xl">P</div>
                    </div>
                    <h2 className="font-serif font-bold text-2xl text-slate-900 mb-4">"Respect, Not Targets"</h2>
                    <p className="text-lg text-slate-600 italic mb-6">"At Odyssey, we believe choosing a bath is a decision for your future independence. We are strictly against aggressive sales calls."</p>
                    <p className="text-sm font-bold text-slate-900 uppercase">— Paul, Founder</p>
                </div>
            </section>

            {/* 7. Footer (Simplified) */}
            <footer className="bg-slate-900 text-slate-400 py-12 pb-32 md:pb-12">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="text-white font-bold mb-4">Odyssey Baths</h4>
                            <p className="text-sm">Reg: 08009999<br />Bath, UK</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Products</h4>
                            <ul className="text-sm space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">Walk-in Baths</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Showers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Wet Rooms</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Support</h4>
                            <ul className="text-sm space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">VAT Relief</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-700 pt-8 text-sm">
                        &copy; 2026 Odyssey Baths. Proudly British.
                    </div>
                </div>
            </footer>

            {/* 8. Mobile Sticky Bottom Bar (The "Money" Bar) */}
            <div
                className="sticky-bottom-bar fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 md:hidden flex gap-3"
                style={{ paddingBottom: "env(safe-area-inset-bottom, 20px)" }}
            >
                <a href="tel:08001234567" className="flex-1 bg-slate-900 text-white text-center font-bold py-3 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors">
                    <Phone className="mr-2" size={18} fill="currentColor" /> Call Now
                </a>
                <a href="#quote" className="flex-1 bg-[#0D9488] text-white text-center font-bold py-3 rounded-lg flex items-center justify-center hover:bg-[#0F766E] transition-colors">
                    Get Quote
                </a>
            </div>
        </div>
    );
}
