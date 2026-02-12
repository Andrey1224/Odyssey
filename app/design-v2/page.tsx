"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    Phone,
    ShieldCheck,
    MapPin,
    CheckCircle2,
    ChevronRight,
    Menu,
    X,
    Info,
    Sparkles,
    Wrench
} from "lucide-react";

// --- Mock Data & Types ---

type Product = {
    id: string;
    title: string;
    description: string;
    priceExVat: number;
    category: string;
    features: string[];
    image: string;
};

const PRODUCTS: Product[] = [
    {
        id: "1",
        title: "The Liberty Walk-in Bath",
        description: "Low-threshold entry with slip-resistant seating.",
        priceExVat: 1995,
        category: "walk-in",
        features: ["Ultra-low entry", "Anti-slip seat", "Hydrotherapy option"],
        image: "/images/Walk-inBath.png"
    },
    {
        id: "2",
        title: "Deep Soaker Tub",
        description: "Compact design for smaller bathrooms.",
        priceExVat: 1750,
        category: "soaker",
        features: ["Compact footprint", "Deep immersion", "Molded seat"],
        image: "/images/DeepSoaker.png"
    },
    {
        id: "3",
        title: "Easy-Access Shower",
        description: "Level access shower with folding seat.",
        priceExVat: 2150,
        category: "shower",
        features: ["Zero threshold", "Grab rails included", "Thermostatic control"],
        image: "/images/AccessibleShower.png"
    },
    {
        id: "4",
        title: "Standard Easy-Access",
        description: "Traditional look with powered seat lift.",
        priceExVat: 1495,
        category: "standard",
        features: ["Powered lift", "Battery backup", "Fits standard space"],
        image: "/images/StandardEasy-Access.png"
    },
];

// --- Sub-Components ---

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-24 flex items-center justify-between">
                    {/* Logo (Updated) */}
                    <div className="relative w-32 h-10 md:w-48 md:h-12 shrink-0">
                        <Image
                            src="/images/ODYSSEY_Transparent-File-2048x735.webp"
                            alt="Odyssey Baths"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex gap-10 items-center">
                        <a href="#" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Walk-in Baths</a>
                        <a href="#" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Showers</a>
                        <a href="#" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Reviews</a>
                        <a href="#" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Contact</a>
                    </nav>

                    {/* Right Actions (Mobile: Call Pill + Menu) */}
                    <div className="flex items-center gap-4 lg:gap-8">

                        {/* Desktop: Free Brochure Button */}
                        <a href="#brochure" className="hidden lg:inline-flex items-center px-6 py-2.5 rounded-full border border-teal-700 text-teal-700 font-bold text-sm tracking-wide hover:bg-teal-50 transition-colors active:scale-95">
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
                            <a href="#" className="py-2 border-b border-slate-100 hover:text-teal-700">Walk-in Baths</a>
                            <a href="#" className="py-2 border-b border-slate-100 hover:text-teal-700">Walk-in Showers</a>
                            <a href="#" className="py-2 border-b border-slate-100 hover:text-teal-700 flex items-center">
                                Wet Rooms
                                <span className="ml-3 bg-teal-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">New</span>
                            </a>
                            <a href="#" className="py-2 border-b border-slate-100 hover:text-teal-700">Deep Soakers</a>
                        </nav>
                    </div>

                    {/* Section 2: Help & Advice */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Help & Advice</h4>
                        <nav className="flex flex-col gap-4 text-lg font-medium text-slate-800">
                            <a href="#" className="py-2 border-b border-slate-100 text-teal-700 font-bold flex items-center gap-2">
                                <Sparkles size={20} className="text-teal-600" />
                                Help Me Choose
                            </a>
                            <a href="#" className="py-2 border-b border-slate-100 hover:text-teal-700">VAT Relief Guide</a>
                            <a href="#" className="py-2 border-b border-slate-100 hover:text-teal-700">Right vs Left Hand?</a>
                            <a href="#" className="py-2 border-b border-slate-100 hover:text-teal-700">Customer Reviews</a>
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

const TrustTicker = () => {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const items = ["Free Home Survey", "Installed in 7 Days", "Full Warranty"];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % items.length);
                setIsVisible(true);
            }, 500); // Wait for fade out
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-teal-50 border-b border-teal-100 py-2 flex justify-center items-center h-10 overflow-hidden">
            <div
                className={`flex items-center gap-2 text-sm md:text-base text-slate-800 font-medium transition-all duration-500 transform ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
                    }`}
            >
                <CheckCircle2 className="text-teal-700 shrink-0" size={16} />
                {items[index]}
            </div>
        </div>
    );
};

const TrustStrip = () => (
    <div className="bg-white border-b border-slate-100 py-1.5 flex justify-center items-center shadow-sm relative z-10">
        <div className="flex gap-4 md:gap-8 text-[11px] md:text-sm font-bold text-slate-700 uppercase tracking-tight">
            <span className="flex items-center gap-1.5">
                <span className="text-[#00b67a] text-sm md:text-lg">★</span> Trustpilot 4.9/5
            </span>
            <span className="w-px h-3 bg-slate-300 my-auto"></span>
            <span className="flex items-center">
                <img
                    src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                    className="w-4 h-3 mr-1.5 shadow-sm border border-slate-200"
                    alt="UK Flag"
                />
                Made in UK
            </span>
            <span className="w-px h-3 bg-slate-300 my-auto"></span>
            <span className="flex items-center gap-1.5">
                VAT Relief
            </span>
        </div>
    </div>
);

const Hero = () => (
    <section className="w-full bg-cream-50 py-6 md:py-16 lg:py-24 text-balance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-16 items-center">
            {/* Text Content - Second on Mobile, First on Desktop */}
            <div className="space-y-4 md:space-y-8 order-2 lg:order-1">
                <h1 className="font-serif text-[28px] sm:text-5xl md:text-7xl text-slate-900 leading-[1.2] font-bold">
                    Rediscover Your <br className="hidden sm:block" />
                    <span className="text-teal-700">Independence.</span>
                </h1>

                <div className="space-y-4 md:space-y-6">
                    <p className="text-lg md:text-2xl text-slate-700 leading-relaxed max-w-lg">
                        Safety, comfort, and easy access tailored to your home. We guarantee no hard sell tactics—just honest support.
                    </p>
                </div>

                <div className="flex flex-col gap-3 pt-2 w-full max-w-md">
                    <button className="h-14 md:h-16 px-6 md:px-10 bg-teal-700 hover:bg-teal-800 text-white text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition flex items-center justify-center gap-2 focus-ring w-full">
                        Request Free Brochure
                    </button>
                    <p className="text-center text-sm text-slate-600 font-medium mt-1">
                        No obligation • Takes 30 seconds
                    </p>
                    <button id="hero-quote-btn" className="h-14 md:h-16 px-6 md:px-10 bg-white border-2 border-slate-300 text-slate-800 text-lg md:text-xl font-bold rounded-xl hover:border-teal-700 hover:text-teal-800 transition focus-ring w-full mt-1">
                        Get Free Quote
                    </button>
                </div>

            </div>

            {/* Compact Trust Row - Removed as it's now in TrustStrip above */}

            {/* Visual - First on Mobile, Second on Desktop */}
            <div className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-md items-center justify-center text-slate-500 order-1 lg:order-2 border border-slate-100 flex">
                <Image
                    src="/images/HeroImage.png"
                    alt="Accessible Bathroom Layout"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* VAT Relief Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-auto bg-white/95 backdrop-blur-sm border border-teal-100 rounded-xl p-3 shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 z-10">
                    <div className="bg-teal-100 p-1.5 rounded-full shrink-0">
                        <CheckCircle2 size={20} className="text-teal-700" strokeWidth={3} />
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight">Eligible?</div>
                        <div className="text-slate-900 font-bold leading-none text-sm md:text-base">VAT Relief Available</div>
                    </div>
                </div>
            </div>
        </div>
    </section >
);

const CategoryChoice = () => (
    <section className="bg-white py-12 md:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-14">
                <h2 className="font-serif text-3xl md:text-5xl text-slate-900 mb-3 font-bold">
                    Find Your Perfect Bath
                </h2>
                <p className="text-lg md:text-xl text-slate-600">
                    Browse our most popular accessible bathing solutions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 auto-rows-fr">
                {[
                    { title: "Walk-in Baths", img: "/images/Walk-inBath.png", desc: "Full length comfort & low threshold", cta: "View Baths" },
                    { title: "Walk-in Showers", img: "/images/AccessibleShower.png", desc: "Level access, no stepping over", cta: "View Showers" },
                    { title: "Wet Rooms", img: "/images/StandardEasy-Access.png", desc: "Complete open-plan safety.", cta: "View Wet Rooms" },
                    { title: "Deep Soakers", img: "/images/DeepSoaker.png", desc: "Ideal for small spaces.", cta: "View Soakers" },
                ].map((cat, i) => (
                    <div key={i} className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-teal-500 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                        <div className="aspect-[4/3] relative bg-white shrink-0">
                            <Image
                                src={cat.img}
                                alt={cat.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col flex-1">
                            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3 leading-tight">{cat.title}</h3>
                            <p className="text-slate-600 mb-6 text-sm md:text-base flex-1">{cat.desc}</p>
                            <button className="w-full py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors mt-auto">
                                {cat.cta}
                            </button>
                        </div>
                        {/* Make whole card clickable */}
                        <a href="#" className="absolute inset-0 z-10" aria-label={`View ${cat.title}`}></a>
                    </div>
                ))}
            </div>

            {/* Help Me Choose - New Button */}
            <div className="mt-10 md:mt-14 flex justify-center">
                <button className="bg-slate-900 hover:bg-slate-800 text-white text-lg md:text-xl font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3 w-full md:w-auto justify-center">
                    <Sparkles className="text-teal-400" size={24} fill="currentColor" />
                    Help me choose in 30s
                </button>
            </div>
        </div>
    </section>
);

const TrustBar = () => (
    <section className="bg-teal-50 border-t border-b border-teal-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {[
                {
                    icon: ShieldCheck,
                    title: "No Hard Sell Guarantee",
                    desc: "Our advisors are not on commission. We give you the price and leave you to decide."
                },
                {
                    icon: CheckCircle2,
                    title: "VAT Relief Handled",
                    desc: "Most customers save 20% due to chronic conditions. We do all the paperwork for you."
                },
                {
                    icon: Wrench,
                    title: "Nationwide Installation",
                    desc: "Expert fitting teams across the UK. Installed in as little as 1 day."
                },
            ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                    <div className="bg-white p-4 rounded-full shadow-sm text-teal-700 ring-1 ring-slate-900/5 shrink-0">
                        <item.icon size={28} />
                    </div>
                    <div>
                        <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 leading-tight">{item.title}</h3>
                        <p className="text-slate-600 text-base leading-relaxed">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const ProductGrid = () => {
    // Simplified Pricing - no dynamic toggle
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-5xl md:text-6xl text-slate-900 mb-6 font-bold">
                        Find Your Perfect Bath
                    </h2>
                    <p className="text-2xl text-slate-600 max-w-3xl mx-auto">
                        Browse our most popular accessible bathing solutions.
                    </p>

                    {/* Global Pricing Note */}
                    <div className="mt-8 inline-flex items-center gap-2 bg-orange-50 text-orange-900 px-6 py-3 rounded-xl border border-orange-200">
                        <Info size={20} className="text-orange-700" />
                        <span className="font-medium text-lg">Prices shown exclude VAT. Most of our customers do not pay VAT.</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {PRODUCTS.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-[2rem] border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:border-teal-600 transition-all duration-300 flex flex-col"
                        >
                            {/* Image Area */}
                            <div className="h-72 bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-50 transition-colors relative">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-10 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-900 text-sm font-bold rounded-lg uppercase tracking-wider border border-teal-100">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="flex justify-between items-end mb-4 gap-4">
                                    <h3 className="font-serif text-3xl font-bold text-slate-900 leading-tight group-hover:text-teal-800 transition-colors">
                                        {product.title}
                                    </h3>
                                    <div className="text-right shrink-0">
                                        <span className="block text-sm text-slate-500 font-bold uppercase tracking-wide mb-1">From</span>
                                        <span className="block text-3xl font-bold text-slate-900">
                                            {formatPrice(product.priceExVat)}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-slate-700 mb-8 text-xl leading-relaxed">
                                    {product.description}
                                </p>

                                <ul className="space-y-3 mb-10 flex-1">
                                    {product.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700 text-lg">
                                            <CheckCircle2 size={22} className="text-teal-600 shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full py-5 rounded-xl bg-slate-900 text-white text-xl font-bold hover:bg-teal-700 transition-colors shadow-md focus-ring">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HandingSelector = () => {
    return (
        <section className="py-12 bg-cream-50 scroll-mt-24" id="handing-guide">
            <div className="max-w-md mx-auto px-3">
                <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">

                    {/* Badge */}
                    <div className="inline-block bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded mb-6 uppercase tracking-wider">
                        Avoid Mistakes
                    </div>

                    <h2 className="font-serif text-4xl md:text-5xl mb-6 font-bold leading-tight">
                        Left Hand? <br /> Right Hand?
                    </h2>

                    <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                        Ordering the wrong orientation is the #1 mistake. Don't worry about technical terms-our free survey checks your plumbing.
                    </p>

                    <button className="w-full bg-white text-slate-900 text-lg font-bold py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-lg active:scale-95 transform duration-200 mb-10">
                        Check My Bathroom Layout
                    </button>

                    {/* Visual Placeholder */}
                    <div className="bg-slate-800/50 rounded-2xl aspect-[4/3] w-full flex items-center justify-center border border-slate-700/50 p-6">
                        <div className="text-slate-500 text-sm font-medium flex flex-col items-center gap-2">
                            <div className="w-16 h-16 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">?</span>
                            </div>
                            L-Shape vs R-Shape Diagram
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-slate-900 text-slate-300 py-12 md:py-20 pb-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-lg">
            <div className="space-y-6">
                <h4 className="text-white font-serif text-2xl font-bold tracking-tight">Odyssey Baths</h4>
                <div className="flex gap-4">
                    <MapPin className="shrink-0 mt-1 text-teal-400" />
                    <p className="text-slate-300">
                        123 Accessibility Lane,<br />
                        Bath City, BA1 1AA
                    </p>
                </div>
                <div className="flex gap-4">
                    <Phone className="shrink-0 mt-1 text-teal-400" />
                    <div>
                        <p className="font-bold text-white text-xl">0800 123 4567</p>
                        <p className="text-sm text-slate-400 mt-1">Mon-Fri 9am - 5pm</p>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="text-white font-bold text-xl mb-6">Our Products</h4>
                <ul className="space-y-4">
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Walk-in Baths</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Walk-in Showers</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Wet Rooms</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold text-xl mb-6">Customer Care</h4>
                <ul className="space-y-4">
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">About Our Family</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Read Reviews</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Contact Us</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold text-xl mb-6">Legal</h4>
                <ul className="space-y-4">
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-teal-400 transition underline decoration-transparent hover:decoration-teal-400">Returns Policy</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Odyssey Baths Ltd. Registered in UK.
        </div>
    </footer>
);

// --- Main Page Component ---

export default function DesignV2() {
    return (
        <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
            <Header />
            <TrustTicker />
            <TrustStrip />
            <Hero />
            <CategoryChoice />
            <TrustBar />
            {/* ProductGrid Removed in favor of CategoryChoice for Variant A */}
            <HandingSelector />

            {/* Ethical Promise Block - New Design */}
            <section className="bg-white py-16 border-y-4 border-teal-700/10">
                <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">

                    {/* Avatar Badge */}
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-lg ring-4 ring-slate-50">
                        <span className="text-white font-bold text-lg tracking-wide">Paul</span>
                    </div>

                    <h2 className="font-serif text-2xl md:text-4xl text-slate-900 font-bold mb-2">
                        "Respect, Not Targets"
                    </h2>

                    <blockquote className="text-xl md:text-2xl text-slate-600 italic leading-relaxed mb-10 max-w-2xl">
                        "At Odyssey, we believe choosing a bath is a decision for your future independence. We are strictly against aggressive sales calls."
                    </blockquote>

                    <cite className="not-italic text-sm font-bold text-slate-900 uppercase tracking-[0.2em] block ml-auto mr-4">
                        — Paul, Founder
                    </cite>
                </div>
            </section>

            <Footer />

            {/* Sticky Mobile CTA Bar - Scroll Triggered */}
            <StickyBottomBar />
        </main>
    );
}

const StickyBottomBar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroBtn = document.getElementById("hero-quote-btn");
            if (heroBtn) {
                const rect = heroBtn.getBoundingClientRect();
                // Visible when button is scrolled UP out of view (rect.bottom < 0)
                setIsVisible(rect.bottom < 0);
            } else {
                // Fallback if ID not found
                setIsVisible(window.scrollY > 500);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-1 right-1 bg-[#FAFAF9]/90 backdrop-blur-xl border border-slate-200/60 shadow-2xl rounded-2xl md:hidden z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-[150%]"
                }`}
        >
            <div className="px-4 py-3 flex gap-4 items-center">
                <a href="tel:08001234567" className="flex-1 h-14 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-2 text-lg active:scale-95 transition-transform">
                    <Phone size={20} className="text-teal-700" />
                    <span className="whitespace-nowrap">Call Now</span>
                </a>
                <button className="flex-1 h-14 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-lg shadow-teal-700/20 flex items-center justify-center text-lg active:scale-95 transition-transform">
                    <span className="whitespace-nowrap">Get Free Quote</span>
                </button>
            </div>
        </div>
    );
};

