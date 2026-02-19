"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Accessibility, Armchair, Star,
  ArrowRight, ArrowLeft, HelpCircle,
  CheckCircle, Phone, X,
} from "lucide-react";

export interface WalkInBathsWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type StepId = "intro" | "step1" | "step2" | "step3";
type SizeChoice = "66" | "75";
type TierChoice = "classic" | "plus" | "special";
type DoorChoice = "outward" | "inward";

interface Product {
  title: string;
  subtitle: string;
  description: string;
  url: string;
}

const products: Record<string, Product> = {
  "serenity-66-classic": {
    title: "Serenity 66 Classic",
    subtitle: "Standard width · Essential comfort",
    description: "A no-fuss walk-in bath that fits most standard bathrooms. Low-threshold door, easy fill, and a built-in seat for safe bathing.",
    url: "/walk-in-baths/serenity-66-classic",
  },
  "serenity-66-plus": {
    title: "Serenity 66 Plus",
    subtitle: "Standard width · Hydrotherapy",
    description: "All the safety of the Classic with the added benefit of soothing hydrotherapy jets — perfect for easing joint pain and aching muscles.",
    url: "/walk-in-baths/serenity-66-plus",
  },
  "serenity-66-special": {
    title: "Serenity 66 Special",
    subtitle: "Standard width · Full spa",
    description: "The complete luxury package: whirlpool jets, heated backrest, chromotherapy lighting, and fast-fill technology — in a standard-width bath.",
    url: "/walk-in-baths/serenity-66-special",
  },
  "serenity-75-plus": {
    title: "Serenity 75 Plus",
    subtitle: "Wide width · Hydrotherapy",
    description: "Extra-wide comfort combined with powerful hydrotherapy jets. Ideal if you want room to move and therapeutic benefits.",
    url: "/walk-in-baths/serenity-75-plus",
  },
  "serenity-75-special": {
    title: "Serenity 75 Special",
    subtitle: "Wide width · Full spa",
    description: "Maximum space, maximum indulgence. The 75 Special delivers the full spa experience in a generous wide-body bath.",
    url: "/walk-in-baths/serenity-75-special",
  },
  "serenity-75-classic": {
    title: "Serenity 75 Classic",
    subtitle: "Wide width · Outward door",
    description: "The widest walk-in Classic with an outward-opening door — ideal when you have clearance space in front of the bath.",
    url: "/walk-in-baths/serenity-75-classic",
  },
  "stamford-75-classic": {
    title: "Stamford 75 Classic",
    subtitle: "Wide width · Inward door",
    description: "Wide-body comfort with an inward-opening door for tight bathroom layouts. No clearance space needed in front of the bath.",
    url: "/walk-in-baths/stamford-75-classic",
  },
};

const progressDots: StepId[] = ["step1", "step2", "step3"];
const stepLabel: Partial<Record<StepId, string>> = {
  step1: "Question 1 of 3",
  step2: "Question 2 of 3",
  step3: "Question 3 of 3",
};

export function WalkInBathsWizardModal({ isOpen, onClose }: WalkInBathsWizardModalProps) {
  const router = useRouter();
  const [stepId, setStepId] = useState<StepId>("intro");
  const [size, setSize] = useState<SizeChoice | null>(null);
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
      setSize(selected as SizeChoice);
      goTo("step2");
    } else if (stepId === "step2") {
      const tier = selected as TierChoice;
      if (size === "75" && tier === "classic") {
        goTo("step3");
      } else {
        showResult(`serenity-${size}-${tier}`);
      }
    } else if (stepId === "step3") {
      const door = selected as DoorChoice;
      showResult(door === "outward" ? "serenity-75-classic" : "stamford-75-classic");
    }
  };

  const handleViewProduct = () => {
    if (!finalProduct) return;
    router.push(finalProduct.url);
    onClose();
  };

  // Reusable card renderer
  const renderCard = (id: string, Icon: React.ElementType, label: string, subLabel: string) => {
    const isSelected = selected === id;
    return (
      <div
        key={id}
        onClick={() => setSelected(id)}
        className={`cursor-pointer p-8 rounded-xl border-2 transition-all duration-200 text-left bg-white group ${
          isSelected
            ? "border-teal-600 shadow-xl ring-1 ring-teal-600 transform scale-[1.02]"
            : "border-transparent shadow-md hover:border-teal-200 hover:shadow-lg hover:scale-[1.01]"
        }`}
      >
        <div className="flex justify-between mb-4">
          <div className={`p-3 rounded-lg transition-colors duration-300 ${isSelected ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600"}`}>
            <Icon size={32} />
          </div>
          <div className={`transition-all duration-300 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
            <CheckCircle className="text-teal-600" size={24} fill="currentColor" color="white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{label}</h3>
        <p className="text-base text-slate-500">{subLabel}</p>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-900 transition-colors duration-200"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto custom-scrollbar">

          {/* ── Result ── */}
          {finalProduct ? (
            <div className="p-8 md:p-12 text-center animate-slide-up">
              <div className="bg-slate-100 h-48 md:h-64 w-full rounded-xl flex items-center justify-center relative mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-slate-200" />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-sm flex items-center gap-1 animate-zoom-in">
                  <Star size={14} className="text-green-500" fill="currentColor" />
                  <span className="text-xs font-bold text-slate-800">Best Match</span>
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{finalProduct.title}</h2>
              <p className="text-teal-700 font-medium text-lg mb-4">{finalProduct.subtitle}</p>
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
                  className="text-slate-400 font-medium hover:text-teal-700 text-sm transition-colors duration-200"
                >
                  Start Over
                </button>
              </div>
            </div>

          ) : stepId === "intro" ? (

            /* ── Intro ── */
            <div className="p-12 md:p-16 text-center animate-slide-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-6 text-teal-700 animate-zoom-in">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                Find Your Perfect Walk-In Bath
              </h2>
              <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto">
                Answer 3 quick questions and we&apos;ll match you with the right model for your bathroom and lifestyle.
              </p>
              <button
                onClick={() => goTo("step1")}
                className="bg-teal-700 hover:bg-teal-800 text-white text-2xl font-bold py-4 px-12 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Start 30-Second Quiz
              </button>
              <div className="mt-6 text-slate-400 text-sm flex justify-center gap-2">
                <Phone size={14} /> Need help? Call 0800 123 4567
              </div>
            </div>

          ) : (

            /* ── Questions ── */
            <div className="flex flex-col min-h-[500px] animate-slide-right">

              {/* Progress bar */}
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <span className="text-teal-700 font-bold text-sm uppercase tracking-widest">
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

              {/* Step 1 — seat width */}
              {stepId === "step1" && (
                <div className="p-6 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center leading-tight">
                    What seat width suits you?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {renderCard("66", Box, "Standard Width", "66 cm — fits most bathrooms")}
                    {renderCard("75", Accessibility, "Wide Comfort", "75 cm — extra room and ease")}
                  </div>
                </div>
              )}

              {/* Step 2 — features */}
              {stepId === "step2" && (
                <div className="p-6 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center leading-tight">
                    Do you want massage or heating features?
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {renderCard("classic", Box, "Classic", "Essential walk-in bath — no extras")}
                    {renderCard("plus", Armchair, "Plus", "Hydrotherapy jets for aching joints")}
                    {renderCard("special", Star, "Special", "Full spa — jets, heated backrest, chromotherapy")}
                  </div>
                </div>
              )}

              {/* Step 3 — door direction (only for 75cm Classic) */}
              {stepId === "step3" && (
                <div className="p-6 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center leading-tight">
                    Is there space in front of the bath for the door to open outward?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {renderCard("outward", ArrowRight, "Yes — door opens outward", "I have clearance space in front")}
                    {renderCard("inward", ArrowLeft, "No — tight space", "Door must open inward")}
                  </div>
                </div>
              )}

              {/* Navigation footer */}
              <div className="p-8 border-t border-slate-100 flex justify-between bg-white sticky bottom-0">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft size={20} /> Back
                </button>
                <button
                  onClick={handleContinue}
                  disabled={!selected}
                  className={`flex items-center gap-2 text-lg font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 ${
                    selected
                      ? "bg-teal-700 hover:bg-teal-800 text-white transform hover:-translate-y-1"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
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
