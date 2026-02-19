"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Info, Sparkles, Phone } from "lucide-react";
import { useWizardStore } from "@/lib/wizardStore";

import HandingCard from "@/components/HandingCard";
import { Testimonials } from "@/components/Testimonials";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustStrip } from "@/components/TrustStrip";
import { TrustBar } from "@/components/TrustBar";

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
          <a href="/free-brochure" className="h-14 md:h-16 px-6 md:px-10 bg-teal-700 hover:bg-teal-800 text-white text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition flex items-center justify-center gap-2 focus-ring w-full">
            Request Free Brochure
          </a>
          <p className="text-center text-sm text-slate-600 font-medium mt-1">
            No obligation • Takes 30 seconds
          </p>
          <Link id="hero-quote-btn" href="/free-quote" className="h-14 md:h-16 px-6 md:px-10 bg-white border-2 border-slate-300 text-slate-800 text-lg md:text-xl font-bold rounded-xl hover:border-teal-700 hover:text-teal-800 transition focus-ring w-full mt-1 flex items-center justify-center">
            Get Free Quote
          </Link>
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
        {/* VAT Relief Badge Overlay */}
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-white/95 backdrop-blur-sm border border-teal-100 rounded-lg md:rounded-xl p-2 md:p-3 shadow-lg flex items-center gap-2 md:gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 z-10">
          <div className="bg-teal-100 p-1 md:p-1.5 rounded-full shrink-0">
            <CheckCircle2 className="text-teal-700 w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
          </div>
          <div>
            <div className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight">Eligible?</div>
            <div className="text-slate-900 font-bold leading-none text-xs md:text-sm">VAT Relief Available</div>
          </div>
        </div>
      </div>
    </div>
  </section >
);

const CategoryChoice = () => {
  const { openWizard } = useWizardStore();
  return (
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
          { title: "Walk-in Baths", img: "/images/Walk-inBath.png", desc: "Full length comfort & low threshold", cta: "View Baths", href: "/walk-in-baths" },
          { title: "Walk-in Showers", img: "/images/AccessibleShower.png", desc: "Level access, no stepping over", cta: "View Showers", href: "/walk-in-shower-baths" },
          { title: "Standard Size Baths", img: "/images/StandardEasy-Access.png", desc: "Accessible full-length bathing", cta: "View Standard", href: "/standard-size-baths" },
          { title: "Deep Soakers", img: "/images/DeepSoaker.png", desc: "Ideal for small spaces.", cta: "View Soakers", href: "/deep-soaker-baths" },
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
            <a href={cat.href} className="absolute inset-0 z-10" aria-label={`View ${cat.title}`}></a>
          </div>
        ))}
      </div>

      {/* Help Me Choose - New Button */}
      <div className="mt-10 md:mt-14 flex justify-center">
        <button
          onClick={() => openWizard("global")}
          className="bg-slate-900 hover:bg-slate-800 text-white text-lg md:text-xl font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3 w-full md:w-auto justify-center"
        >
          <Sparkles className="text-teal-400" size={24} fill="currentColor" />
          Help me choose in 30s
        </button>
      </div>
    </div>
  </section>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
      <Header />
      <TrustTicker />
      <TrustStrip />
      <Hero />
      <Testimonials />
      <CategoryChoice />
      <TrustBar />
      {/* ProductGrid Removed in favor of CategoryChoice for Variant A */}
      <HandingCard />

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
        <Link href="/free-quote" className="flex-1 h-14 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-lg shadow-teal-700/20 flex items-center justify-center text-lg active:scale-95 transition-transform">
          <span className="whitespace-nowrap">Get Free Quote</span>
        </Link>
      </div>
    </div>
  );
};
