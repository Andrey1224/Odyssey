"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Phone,
    ShieldCheck,
    MapPin,
    CheckCircle2,
    ChevronRight,
    Menu
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

const Header = ({ isVatExempt, toggleVat }: { isVatExempt: boolean; toggleVat: () => void }) => (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 relative">
                    <Image src="/images/Logo.png" alt="Odyssey Baths" fill className="object-contain" />
                </div>
                <span className="font-serif text-2xl font-bold text-slate-900 hidden sm:block">
                    Odyssey Baths
                </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 items-center">
                <a href="#" className="text-lg font-medium text-slate-600 hover:text-teal-700 transition">Walk-in Baths</a>
                <a href="#" className="text-lg font-medium text-slate-600 hover:text-teal-700 transition">Showers</a>
                <a href="#" className="text-lg font-medium text-slate-600 hover:text-teal-700 transition">About Us</a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                {/* VAT Toggle */}
                <div className="hidden lg:flex items-center gap-3 bg-cream-50 px-3 py-1.5 rounded-full border border-slate-200">
                    <span className={`text-sm font-medium ${isVatExempt ? "text-orange-700 font-bold" : "text-slate-500"}`}>
                        VAT Exempt
                    </span>
                    <button
                        onClick={toggleVat}
                        className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${isVatExempt ? "bg-teal-700" : "bg-slate-300"
                            }`}
                        aria-label="Toggle VAT Relief prices"
                    >
                        <div
                            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isVatExempt ? "translate-x-5" : "translate-x-0"
                                }`}
                        />
                    </button>
                </div>

                {/* Phone CTA */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-700 hidden sm:flex">
                        <Phone size={20} />
                    </div>
                    <div className="flex flex-col items-end sm:items-start">
                        <span className="text-xl font-bold text-slate-900 leading-none">0800 123 4567</span>
                        <span className="text-xs text-slate-500 hidden sm:block">Mon-Fri • No Robots</span>
                    </div>
                </div>

                {/* Mobile Menu */}
                <button className="md:hidden p-2 text-slate-600">
                    <Menu size={28} />
                </button>
            </div>
        </div>
    </header>
);

const Hero = ({ isVatExempt }: { isVatExempt: boolean }) => (
    <section className="w-full bg-cream-50 py-12 md:py-20 text-balance">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
                <span className="text-teal-800 font-bold tracking-widest text-sm uppercase">
                    UK's Ethical Bathing Experts
                </span>
                <h1 className="font-serif text-4xl md:text-6xl text-slate-900 leading-tight">
                    Rediscover Your <br />
                    Independence.
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                    Safe, easy-access baths tailored to your home.
                    <strong className="text-slate-900"> No hard sell</strong>, just expert advice from a family-run business.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="h-14 px-8 bg-teal-700 hover:bg-teal-800 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 focus-ring">
                        Get Free Quote
                        <ChevronRight size={20} />
                    </button>
                    <button className="h-14 px-8 bg-white border-2 border-slate-200 text-slate-700 text-lg font-medium rounded-xl hover:border-teal-700 hover:text-teal-700 transition focus-ring">
                        View Brochure
                    </button>
                </div>
            </div>

            {/* Visual */}
            <div className="relative w-full aspect-[4/3] lg:aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center text-slate-400">
                <Image
                    src="/images/HeroImage.png"
                    alt="Elderly person relaxing in walk-in bath"
                    fill
                    className="object-cover"
                    priority
                />

                {/* VAT Badge */}
                {isVatExempt && (
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border-l-4 border-orange-700 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-700 z-10">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="text-orange-700 shrink-0 mt-0.5" size={24} />
                            <div>
                                <p className="font-bold text-slate-900 text-lg">VAT Exempt Available</p>
                                <p className="text-sm text-slate-600">Save 20% if you have a chronic condition.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </section>
);

const TrustBar = () => (
    <section className="bg-teal-50 border-t border-b border-teal-100/50 py-10">
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
                <div key={idx} className="flex items-start gap-4 p-2">
                    <div className="bg-white p-3 rounded-xl shadow-sm text-teal-700">
                        <item.icon size={32} />
                    </div>
                    <div>
                        <h3 className="font-serif text-xl font-bold text-slate-900">{item.title}</h3>
                        <p className="text-slate-600 mt-1">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const ProductGrid = ({ isVatExempt }: { isVatExempt: boolean }) => {
    const formatPrice = (price: number) => {
        const finalPrice = isVatExempt ? price : price * 1.2;
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            maximumFractionDigits: 0
        }).format(finalPrice);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-6">
                        Find Your Perfect Bath
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Explore our range of accessible bathing solutions designed for safety, comfort, and style.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PRODUCTS.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-teal-500/50 transition-all duration-300 flex flex-col"
                        >
                            {/* Image Area */}
                            <div className="h-64 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-50 transition-colors relative">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="inline-block px-3 py-1 bg-teal-50 text-teal-800 text-sm font-bold rounded-lg uppercase tracking-wider">
                                        {product.category}
                                    </span>
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold text-slate-900">
                                            {formatPrice(product.priceExVat)}
                                        </span>
                                        {isVatExempt && (
                                            <span className="text-xs text-orange-700 font-bold block">
                                                Ex. VAT (Save 20%)
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-slate-600 mb-6 text-lg">
                                    {product.description}
                                </p>

                                <ul className="space-y-2 mb-8 flex-1">
                                    {product.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-2 text-slate-600">
                                            <CheckCircle2 size={18} className="text-teal-600" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-teal-700 hover:text-white hover:border-teal-700 transition focus-ring">
                                    View Range
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
        <section className="py-20 bg-cream-50">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">
                    Which Way's Your Corner?
                </h2>
                <p className="text-xl text-slate-600 mb-12">
                    To ensure the bath fits, look at the corner where your bath will go.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Left Option */}
                    <button
                        onClick={() => setSelected("left")}
                        className={`relative p-8 rounded-3xl bg-white border-4 transition-all duration-300 text-left hover:shadow-xl focus-ring ${selected === "left"
                                ? "border-teal-500 shadow-xl ring-4 ring-teal-100"
                                : "border-transparent shadow-sm"
                            }`}
                    >
                        <div className="aspect-square bg-slate-100 rounded-2xl mb-6 relative overflow-hidden border-2 border-slate-200">
                            <Image src="/images/LeftHandCorner.png" alt="Left Hand Corner" fill className="object-contain p-4" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Left Hand Corner</h3>
                        <p className="text-slate-600">The corner is on your left.</p>
                        {selected === "left" && (
                            <div className="absolute top-4 right-4 text-teal-600 bg-teal-50 rounded-full p-1 z-10">
                                <CheckCircle2 size={32} fill="currentColor" className="text-teal-50" />
                            </div>
                        )}
                    </button>

                    {/* Right Option */}
                    <button
                        onClick={() => setSelected("right")}
                        className={`relative p-8 rounded-3xl bg-white border-4 transition-all duration-300 text-left hover:shadow-xl focus-ring ${selected === "right"
                                ? "border-teal-500 shadow-xl ring-4 ring-teal-100"
                                : "border-transparent shadow-sm"
                            }`}
                    >
                        <div className="aspect-square bg-slate-100 rounded-2xl mb-6 relative overflow-hidden border-2 border-slate-200">
                            <Image src="/images/RightHandCorner.png" alt="Right Hand Corner" fill className="object-contain p-4" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Right Hand Corner</h3>
                        <p className="text-slate-600">The corner is on your right.</p>
                        {selected === "right" && (
                            <div className="absolute top-4 right-4 text-teal-600 bg-teal-50 rounded-full p-1 z-10">
                                <CheckCircle2 size={32} fill="currentColor" className="text-teal-50" />
                            </div>
                        )}
                    </button>
                </div>

                {selected && (
                    <p className="mt-8 text-xl font-medium text-teal-800 animate-in fade-in slide-in-from-top-2">
                        You need a <span className="font-bold underline">{selected === 'left' ? "Left" : "Right"} Hand Bath</span>.
                    </p>
                )}
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-lg">
            <div className="space-y-4">
                <h4 className="text-white font-serif text-xl font-bold">Odyssey Baths</h4>
                <div className="flex gap-3">
                    <MapPin className="shrink-0 mt-1" />
                    <p>
                        123 Accessibility Lane,<br />
                        Bath City, BA1 1AA
                    </p>
                </div>
                <div className="flex gap-3">
                    <Phone className="shrink-0 mt-1" />
                    <p className="font-bold text-white">0800 123 4567</p>
                </div>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Products</h4>
                <ul className="space-y-3">
                    <li><a href="#" className="hover:text-white transition">Walk-in Baths</a></li>
                    <li><a href="#" className="hover:text-white transition">Showers</a></li>
                    <li><a href="#" className="hover:text-white transition">Accessories</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Company</h4>
                <ul className="space-y-3">
                    <li><a href="#" className="hover:text-white transition">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition">Reviews</a></li>
                    <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Legal</h4>
                <ul className="space-y-3">
                    <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white transition">Returns Policy</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Odyssey Baths Ltd. Registered in UK.
        </div>
    </footer>
);

// --- Main Page Component ---

export default function Home() {
    const [isVatExempt, setIsVatExempt] = useState(true);

    const toggleVat = () => setIsVatExempt((prev) => !prev);

    return (
        <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
            <Header isVatExempt={isVatExempt} toggleVat={toggleVat} />
            <Hero isVatExempt={isVatExempt} />
            <TrustBar />
            <ProductGrid isVatExempt={isVatExempt} />
            <HandingSelector />

            {/* Ethical Promise Block */}
            <section className="bg-white py-24 border-y-4 border-teal-700/10">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <blockquote className="font-serif text-3xl md:text-4xl italic text-slate-800 leading-relaxed mb-8">
                        "We are against hard sell tactics. We treat you with respect, taking the time to understand your needs without the pressure."
                    </blockquote>
                    <cite className="not-italic text-lg font-bold text-teal-700">
                        — Paul Tierney, Founder
                    </cite>
                </div>
            </section>

            <Footer />
        </main>
    );
}
