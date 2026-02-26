"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, ArrowLeft, HelpCircle,
  CheckCircle, Phone, Star, X,
  DoorOpen, Minimize2, Sparkles, Armchair, Waves,
} from "lucide-react";

export interface DeepSoakerWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type StepId = "intro" | "step1" | "step2" | "step3";

interface Product {
  title: string;
  subtitle: string;
  description: string;
  url: string;
}

const products: Record<string, Product> = {
  ambiance: {
    title: "Ambiance",
    subtitle: "Front entry · Wide outward-opening door",
    description: "Front-entry deep soaker with a very wide door opening — easy to step in and out when you have plenty of space in front.",
    url: "/deep-soaker-baths/ambiance",
  },
  maestro: {
    title: "Maestro",
    subtitle: "Front entry · Bi-fold door · Shortest footprint",
    description: "The most compact deep soaker at just 900 mm. Bi-fold door folds flat so no clearance space is needed in front.",
    url: "/deep-soaker-baths/maestro",
  },
  affinity: {
    title: "Affinity",
    subtitle: "Side entry · Bi-fold door · Space-saving",
    description: "Ultra-compact bi-fold door sit-in bath. The door folds inward so it never swings into your bathroom — perfect for tighter layouts.",
    url: "/deep-soaker-baths/affinity",
  },
  priya: {
    title: "Priya",
    subtitle: "Side entry · Modern glass door",
    description: "Designer deep soaker with contemporary glass door styling. Clean lines and a premium look without compromising on safety.",
    url: "/deep-soaker-baths/priya",
  },
  athena: {
    title: "Athena / Athena Mini",
    subtitle: "Side entry · Wide low-entry door",
    description: "Specially shaped door for maximum knee comfort — no awkward twisting when stepping in. Available in standard and compact Mini formats.",
    url: "/deep-soaker-baths/athena",
  },
  caversham: {
    title: "Caversham",
    subtitle: "Side entry · Maximum immersion depth",
    description: "Premium deep soaker engineered for the deepest possible soak. External locking lever and generous water depth for total relaxation.",
    url: "/deep-soaker-baths/caversham",
  },
};

const stepLabel: Partial<Record<StepId, string>> = {
  step1: "Question 1 of 2",
  step2: "Question 2 of 2",
  step3: "Question 2 of 2",
};

export function DeepSoakerWizardModal({ isOpen, onClose }: DeepSoakerWizardModalProps) {
  const router = useRouter();
  const [stepId, setStepId] = useState<StepId>("intro");
  const [selected, setSelected] = useState<string | null>(null);
  const [finalProduct, setFinalProduct] = useState<Product | null>(null);
  const [history, setHistory] = useState<StepId[]>([]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const goTo = (next: StepId) => {
    setHistory((h) => [...h, stepId]);
    setStepId(next);
    setSelected(null);
  };

  const handleBack = () => {
    if (finalProduct) { setFinalProduct(null); return; }
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setStepId(prev);
      setSelected(null);
    } else {
      setStepId("intro");
    }
  };

  const showResult = (key: string) => {
    setFinalProduct(products[key]);
    setSelected(null);
  };

  const handleContinue = () => {
    if (!selected) return;
    if (stepId === "step1") {
      goTo(selected === "front" ? "step2" : "step3");
    } else if (stepId === "step2") {
      showResult(selected === "space" ? "ambiance" : "maestro");
    } else if (stepId === "step3") {
      showResult(selected);
    }
  };

  const handleViewProduct = () => {
    if (!finalProduct) return;
    router.push(finalProduct.url);
    onClose();
  };

  const renderCard = (id: string, Icon: React.ElementType, label: string, subLabel: string) => {
    const isSelected = selected === id;
    return (
      <div
        key={id}
        onClick={() => setSelected(id)}
        className={`cursor-pointer p-4 md:p-6 rounded-xl border-2 transition-all duration-200 text-left bg-cream-50 group ${
          isSelected
            ? "border-teal-600 shadow-xl ring-1 ring-teal-600 transform scale-[1.02]"
            : "border-transparent shadow-md hover:border-teal-200 hover:shadow-lg hover:scale-[1.01]"
        }`}
      >
        <div className="flex justify-between mb-4">
          <div className={`p-2 md:p-3 rounded-lg transition-colors duration-300 ${isSelected ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-800"}`}>
            <Icon size={28} />
          </div>
          <div className={`transition-all duration-300 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
            <CheckCircle className="text-teal-800" size={22} fill="currentColor" color="white" />
          </div>
        </div>
        <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">{label}</h3>
        <p className="text-xs md:text-sm text-slate-600">{subLabel}</p>
      </div>
    );
  };

  // Progress dots adapt to path length (always 2 questions)
  const progressDots = ["step1", stepId === "step2" || history.includes("step2") ? "step2" : "step3"];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-cream-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94dvh] md:max-h-[90vh] animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-cream-50/80 hover:bg-slate-100 rounded-full text-slate-600 hover:text-slate-900 transition-colors duration-200"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto custom-scrollbar">

          {/* ── Result ── */}
          {finalProduct ? (
            <div className="p-5 md:p-12 text-center animate-slide-up">
              <div className="bg-slate-100 h-36 md:h-64 w-full rounded-xl flex items-center justify-center relative mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-slate-200" />
                <div className="absolute top-4 right-4 bg-cream-50/95 px-3 py-1 rounded-full shadow-sm flex items-center gap-1 animate-zoom-in">
                  <Star size={14} className="text-green-500" fill="currentColor" />
                  <span className="text-xs font-bold text-slate-800">Best Match</span>
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{finalProduct.title}</h2>
              <p className="text-teal-800 font-medium text-lg mb-4">{finalProduct.subtitle}</p>
              <p className="text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto">{finalProduct.description}</p>
              <div className="space-y-4">
                <button
                  onClick={handleViewProduct}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xl font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  View This Model
                </button>
                <button
                  onClick={handleBack}
                  className="text-slate-600 font-medium hover:text-teal-800 text-sm transition-colors duration-200"
                >
                  Start Over
                </button>
              </div>
            </div>

          ) : stepId === "intro" ? (

            /* ── Intro ── */
            <div className="p-6 md:p-16 text-center animate-slide-up">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-teal-50 rounded-full mb-4 md:mb-6 text-teal-800 animate-zoom-in">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-2xl md:text-5xl font-extrabold text-slate-900 mb-6">
                Find Your Perfect Deep Soaker Bath
              </h2>
              <p className="text-base md:text-xl text-slate-600 mb-6 md:mb-10 max-w-xl mx-auto">
                Answer 2 quick questions and we&apos;ll match you with the right sit-in bath for your bathroom.
              </p>
              <button
                onClick={() => goTo("step1")}
                className="bg-teal-800 hover:bg-teal-900 text-white text-lg md:text-2xl font-bold py-3 md:py-4 px-6 md:px-12 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Start 30-Second Quiz
              </button>
              <div className="mt-6 text-slate-600 text-sm flex justify-center gap-2">
                <Phone size={14} /> Need help? Call 0800 123 4567
              </div>
            </div>

          ) : (

            /* ── Questions ── */
            <div className="flex flex-col min-h-[420px] md:min-h-[500px] animate-slide-right">

              {/* Progress bar */}
              <div className="px-5 py-4 md:px-8 md:py-6 border-b border-slate-100 flex justify-between items-center bg-cream-50 sticky top-0 z-10">
                <span className="text-teal-800 font-bold text-sm uppercase tracking-widest">
                  {stepLabel[stepId]}
                </span>
                <div className="flex gap-2">
                  {progressDots.map((s, idx) => (
                    <div
                      key={s}
                      className={`h-2 rounded-full transition-all duration-500 ease-out ${
                        stepId === s || idx < progressDots.indexOf(stepId)
                          ? "w-8 bg-teal-600"
                          : "w-2 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1 — entry position */}
              {stepId === "step1" && (
                <div className="p-4 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-10 text-center leading-tight">
                    How is your bath positioned and where will the door be?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {renderCard("front", DoorOpen, "Entry from the narrow end", "Bath sits in an alcove — door faces you head-on")}
                    {renderCard("side", ArrowRight, "Entry from the long side", "Bath runs along the wall — standard side-entry position")}
                  </div>
                </div>
              )}

              {/* Step 2 — front entry: door clearance */}
              {stepId === "step2" && (
                <div className="p-4 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-10 text-center leading-tight">
                    Is there space in front for the door to open outward?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {renderCard("space", DoorOpen, "Yes — plenty of clearance", "Wide outward-opening door for easy access")}
                    {renderCard("tight", Minimize2, "No — very tight space", "Bi-fold door folds flat (900 mm footprint)")}
                  </div>
                </div>
              )}

              {/* Step 3 — side entry: priority feature (2×2 grid) */}
              {stepId === "step3" && (
                <div className="p-4 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-10 text-center leading-tight">
                    What matters most to you?
                  </h2>
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {renderCard("affinity", Minimize2, "Space-saving door", "Bi-fold door — no swing clearance needed")}
                    {renderCard("priya", Sparkles, "Modern glass look", "Contemporary toughened glass door")}
                    {renderCard("athena", Armchair, "Knee comfort", "Specially shaped door — no awkward twisting")}
                    {renderCard("caversham", Waves, "Maximum soak depth", "Deepest immersion with external locking lever")}
                  </div>
                </div>
              )}

              {/* Navigation footer */}
              <div className="p-4 md:p-8 border-t border-slate-100 flex justify-between bg-cream-50 sticky bottom-0">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-sm md:text-base px-3 md:px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft size={20} /> Back
                </button>
                <button
                  onClick={handleContinue}
                  disabled={!selected}
                  className={`flex items-center gap-2 text-base md:text-lg font-bold py-2.5 md:py-3 px-5 md:px-8 rounded-lg shadow-md transition-all duration-300 ${
                    selected
                      ? "bg-teal-800 hover:bg-teal-900 text-white transform hover:-translate-y-1"
                      : "bg-slate-200 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  Continue <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
