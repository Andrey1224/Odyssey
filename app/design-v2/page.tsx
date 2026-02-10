"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Phone,
    ShieldCheck,
    MapPin,
    CheckCircle2,
    ChevronRight,
    Menu,
    Info
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

const Header = () => (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative rounded-xl overflow-hidden shadow-sm">
                    <Image src="/images/Logo.png" alt="Odyssey Baths" fill className="object-contain" />
                </div>
                <span className="font-serif text-3xl font-bold text-slate-900 hidden sm:block tracking-tight">
                    Odyssey Baths
                </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-10 items-center">
                <a href="#" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Walk-in Baths</a>
                <a href="#" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Showers</a>
                <a href="#" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Reviews</a>
                <a href="#" className="text-xl font-medium text-slate-700 hover:text-teal-800 transition">Contact</a>
            </nav>

            {/* Right Actions - Optimized for Seniors (Call focus) */}
            <div className="flex items-center gap-6">
                <button className="hidden xl:flex items-center gap-3 bg-teal-50 hover:bg-teal-100/80 px-5 py-3 rounded-full border border-teal-200/50 transition-all group">
                    <Phone className="text-teal-700 group-hover:scale-110 transition-transform" size={24} fill="currentColor" />
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-xs font-bold text-teal-800 uppercase tracking-widest">Call Free</span>
                        <span className="text-xl font-bold text-slate-900">0800 123 4567</span>
                    </div>
                </button>

                {/* Mobile Call Button */}
                <a href="tel:08001234567" className="xl:hidden w-12 h-12 bg-teal-700 text-white rounded-full flex items-center justify-center shadow-lg">
                    <Phone size={24} fill="currentColor" />
                </a>

                {/* Mobile Menu */}
                <button className="lg:hidden p-2 text-slate-700">
                    <Menu size={32} />
                </button>
            </div>
        </div>
    </header>
);

const Hero = () => (
    <section className="w-full bg-cream-50 py-16 lg:py-24 text-balance">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-10">
                <span className="inline-block px-4 py-2 bg-teal-100 text-teal-900 font-bold tracking-widest text-sm uppercase rounded-full">
                    UK's Ethical Bathing Experts
                </span>
                <h1 className="font-serif text-5xl md:text-7xl text-slate-900 leading-[1.1] font-bold">
                    Rediscover Your <br />
                    Independence.
                </h1>

                <div className="space-y-6">
                    <p className="text-2xl text-slate-700 leading-relaxed max-w-lg">
                        Safe, easy-access baths tailored to your home.
                        <strong className="text-slate-900 font-bold"> No hard sell</strong>, just expert advice.
                    </p>

                    {/* Trust Bullets */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {["Free Home Survey", "Installed in 7 Days", "Full Warranty"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-lg text-slate-800 font-medium">
                                <CheckCircle2 className="text-teal-700 shrink-0" size={24} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                    <button className="h-16 px-10 bg-teal-700 hover:bg-teal-800 text-white text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition flex items-center justify-center gap-3 focus-ring w-full sm:w-auto">
                        Get Free Quote
                        <ChevronRight size={24} />
                    </button>
                    <button className="h-16 px-10 bg-white border-2 border-slate-300 text-slate-800 text-xl font-bold rounded-2xl hover:border-teal-700 hover:text-teal-800 transition focus-ring w-full sm:w-auto">
                        Request Brochure
                    </button>
                </div>
            </div>

            {/* Visual */}
            <div className="relative w-full aspect-[4/3] lg:aspect-square bg-slate-200 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center text-slate-500 border-4 border-white">
                <Image
                    src="/images/HeroImage.png"
                    alt="Happy senior couple in bathroom"
                    fill
                    className="object-cover"
                    priority
                />

                {/* VAT Badge - Fixed, not floating/moving */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-6 border-t border-slate-200 z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 shrink-0">
                            <Info size={28} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-xl">VAT Relief Available</p>
                            <p className="text-slate-600 text-lg">Save 20% if you have a chronic condition.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const TrustBar = () => (
    <section className="bg-teal-50 border-t border-b border-teal-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                {
                    icon: ShieldCheck,
                    title: "No Hard Sell Guarantee",
                    desc: "We advise, we don't push. No pressure."
                },
                {
                    icon: MapPin,
                    title: "Nationwide Installation",
                    desc: "Local experts in your area."
                },
                {
                    icon: CheckCircle2,
                    title: "VAT Relief Handled",
                    desc: "We handle all the paperwork for you."
                },
            ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-5 p-4 bg-white/50 rounded-2xl border border-teal-100">
                    <div className="bg-white p-4 rounded-xl shadow-sm text-teal-700 ring-1 ring-slate-900/5">
                        <item.icon size={36} />
                    </div>
                    <div>
                        <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-slate-700 text-lg leading-snug">{item.desc}</p>
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
                            <div className="p-10 flex-1 flex flex-col">
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
    const [selected, setSelected] = useState<"left" | "right" | null>(null);

    return (
        <section className="py-24 bg-cream-50 scroll-mt-24" id="handing-guide">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-6 font-bold">
                    Which Way's Your Corner?
                </h2>
                <p className="text-2xl text-slate-700 mb-12 max-w-2xl mx-auto">
                    Stand in front of where your bath will go. Is the corner on your left or right side?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                    {/* Left Option */}
                    <button
                        onClick={() => setSelected("left")}
                        className={`relative p-10 rounded-[2rem] bg-white border-4 transition-all duration-300 text-left hover:shadow-xl focus-ring ${selected === "left"
                                ? "border-teal-600 shadow-xl ring-4 ring-teal-100"
                                : "border-slate-200 shadow-sm"
                            }`}
                    >
                        <div className="aspect-square bg-slate-50 rounded-2xl mb-8 flex items-center justify-center border-2 border-slate-200 relative overflow-hidden">
                            <Image src="/images/LeftHandCorner.png" alt="Left Hand Corner Diagram" fill className="object-contain p-6" />
                        </div>
                        <h3 className="font-serif text-3xl font-bold text-slate-900 mb-3">Left Hand</h3>
                        <p className="text-slate-600 text-lg">Corner is on the left.</p>
                        {selected === "left" && (
                            <div className="absolute top-6 right-6 text-white bg-teal-600 rounded-full p-2 shadow-sm z-10">
                                <CheckCircle2 size={32} />
                            </div>
                        )}
                    </button>

                    {/* Right Option */}
                    <button
                        onClick={() => setSelected("right")}
                        className={`relative p-10 rounded-[2rem] bg-white border-4 transition-all duration-300 text-left hover:shadow-xl focus-ring ${selected === "right"
                                ? "border-teal-600 shadow-xl ring-4 ring-teal-100"
                                : "border-slate-200 shadow-sm"
                            }`}
                    >
                        <div className="aspect-square bg-slate-50 rounded-2xl mb-8 flex items-center justify-center border-2 border-slate-200 relative overflow-hidden">
                            <Image src="/images/RightHandCorner.png" alt="Right Hand Corner Diagram" fill className="object-contain p-6" />
                        </div>
                        <h3 className="font-serif text-3xl font-bold text-slate-900 mb-3">Right Hand</h3>
                        <p className="text-slate-600 text-lg">Corner is on the right.</p>
                        {selected === "right" && (
                            <div className="absolute top-6 right-6 text-white bg-teal-600 rounded-full p-2 shadow-sm z-10">
                                <CheckCircle2 size={32} />
                            </div>
                        )}
                    </button>
                </div>

                {/* Not Sure Alternative */}
                <div className="inline-flex flex-col items-center">
                    <p className="text-slate-600 font-medium mb-3">Not sure? We can check for you.</p>
                    <button className="bg-white border-2 border-slate-300 hover:border-slate-800 text-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition shadow-sm focus-ring">
                        Call 0800 123 4567 for help
                    </button>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-slate-900 text-slate-300 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-lg">
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
            <Hero />
            <TrustBar />
            <ProductGrid />
            <HandingSelector />

            {/* Ethical Promise Block - Optimized Typography */}
            <section className="bg-white py-24 border-y-4 border-teal-700/10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <blockquote className="font-serif text-4xl md:text-5xl text-slate-900 leading-normal mb-10 font-medium">
                        "We are against hard sell tactics. We treat you with respect, taking the time to understand your needs without the pressure."
                    </blockquote>
                    <cite className="not-italic text-xl font-bold text-teal-800 uppercase tracking-wider block">
                        — Paul Tierney, Founder
                    </cite>
                </div>
            </section>

            <Footer />
        </main>
    );
}
