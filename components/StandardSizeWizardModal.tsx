"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles, Shield, Box, Layers,
  ArrowRight, ArrowLeft, HelpCircle,
  CheckCircle, Phone, Star, X,
} from "lucide-react";

export interface StandardSizeWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type StepId = "intro" | "step1" | "step2" | "step3";
type Material = "glass" | "plastic";

interface Product {
  title: string;
  subtitle: string;
  description: string;
  url: string;
}

const products: Record<string, Product> = {
  "abalone-1500-1700-glass": {
    title: "Abalone",
    subtitle: "Glass door · Door near taps",
    description: "Modern full-size bath with an elegant toughened glass door. Classic single-end layout — drain and taps at the same end, door within easy reach.",
    url: "/standard-size-baths/abalone-1500-1700-glass",
  },
  "abalone-rv-1500-1700-glass": {
    title: "Abalone RV",
    subtitle: "Glass door · Door opposite taps",
    description: "The same premium glass-door Abalone but with the door on the opposite end — ideal when taps are blocked by a toilet or basin.",
    url: "/standard-size-baths/abalone-rv-1500-1700-glass",
  },
  "avrail-1500-1700-plastic": {
    title: "Avrail",
    subtitle: "Plastic door · Door near taps",
    description: "Super-durable plastic door that requires minimal maintenance. Standard single-end layout — straightforward drop-in replacement for your existing bath.",
    url: "/standard-size-baths/avrail-1500-1700-plastic",
  },
  "avrail-rv-1500-1700-plastic": {
    title: "Avrail RV",
    subtitle: "Plastic door · Door opposite taps",
    description: "Reverse-door Avrail for constrained layouts. Tough plastic door on the opposite end — perfect when the tap side is blocked.",
    url: "/standard-size-baths/avrail-rv-1500-1700-plastic",
  },
  "cortega-1700-glass": {
    title: "Cortega",
    subtitle: "Glass door · Double-ended (centre drain)",
    description: "Premium double-ended design — recline from either end. Toughened glass door and a symmetrical shape that suits any bathroom layout.",
    url: "/standard-size-baths/cortega-1700-glass",
  },
};

export function StandardSizeWizardModal({ isOpen, onClose }: StandardSizeWizardModalProps) {
  const router = useRouter();
  const [stepId, setStepId] = useState<StepId>("intro");
  const [material, setMaterial] = useState<Material | null>(null);
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
      const mat = selected as Material;
      setMaterial(mat);
      // Plastic skips the shape step — goes straight to door position
      goTo(mat === "glass" ? "step2" : "step3");

    } else if (stepId === "step2") {
      // Glass only: choose shape
      if (selected === "double-ended") {
        showResult("cortega-1700-glass");
      } else {
        goTo("step3");
      }

    } else if (stepId === "step3") {
      // Door position — result depends on material
      const key =
        material === "glass"
          ? selected === "taps" ? "abalone-1500-1700-glass" : "abalone-rv-1500-1700-glass"
          : selected === "taps" ? "avrail-1500-1700-plastic" : "avrail-rv-1500-1700-plastic";
      showResult(key);
    }
  };

  const handleViewProduct = () => {
    if (!finalProduct) return;
    router.push(finalProduct.url);
    onClose();
  };

  // Progress dots: 3 for glass path, 2 for plastic path
  const isPlasticPath = material === "plastic";
  const progressDots: StepId[] = isPlasticPath ? ["step1", "step3"] : ["step1", "step2", "step3"];

  const getStepLabel = () => {
    if (stepId === "step1") return isPlasticPath ? "Question 1 of 2" : "Question 1 of 3";
    if (stepId === "step2") return "Question 2 of 3";
    if (stepId === "step3") return isPlasticPath ? "Question 2 of 2" : "Question 3 of 3";
    return "";
  };

  const renderCard = (id: string, Icon: React.ElementType, label: string, subLabel: string) => {
    const isSelected = selected === id;
    return (
      <div
        key={id}
        onClick={() => setSelected(id)}
        className={`cursor-pointer p-4 md:p-8 rounded-xl border-2 transition-all duration-200 text-left bg-cream-50 group ${
          isSelected
            ? "border-teal-600 shadow-xl ring-1 ring-teal-600 transform scale-[1.02]"
            : "border-transparent shadow-md hover:border-teal-200 hover:shadow-lg hover:scale-[1.01]"
        }`}
      >
        <div className="flex justify-between mb-4">
          <div className={`p-2 md:p-3 rounded-lg transition-colors duration-300 ${isSelected ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-800"}`}>
            <Icon size={32} />
          </div>
          <div className={`transition-all duration-300 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
            <CheckCircle className="text-teal-800" size={24} fill="currentColor" color="white" />
          </div>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{label}</h3>
        <p className="text-sm md:text-base text-slate-600">{subLabel}</p>
      </div>
    );
  };

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
                Find Your Perfect Standard Size Bath
              </h2>
              <p className="text-base md:text-xl text-slate-600 mb-6 md:mb-10 max-w-xl mx-auto">
                Answer 2–3 quick questions and we&apos;ll match you with the right model for your bathroom.
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
                  {getStepLabel()}
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

              {/* Step 1 — door material */}
              {stepId === "step1" && (
                <div className="p-4 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-10 text-center leading-tight">
                    Which door material suits you?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {renderCard("glass", Sparkles, "Glass Door", "Stylish modern look — toughened safety glass (Abalone / Cortega)")}
                    {renderCard("plastic", Shield, "Plastic Door", "Ultra-durable, low-maintenance — ideal for heavy daily use (Avrail)")}
                  </div>
                </div>
              )}

              {/* Step 2 — shape (glass only) */}
              {stepId === "step2" && (
                <div className="p-4 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-10 text-center leading-tight">
                    Which bath shape do you prefer?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {renderCard("standard", Box, "Classic (single-end drain)", "Drain and taps at one end — the familiar everyday layout")}
                    {renderCard("double-ended", Layers, "Symmetric (centre drain)", "Recline from either end — taps in the middle")}
                  </div>
                </div>
              )}

              {/* Step 3 — door position */}
              {stepId === "step3" && (
                <div className="p-4 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-10 text-center leading-tight">
                    Where should the bath door be positioned?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {renderCard("taps", ArrowRight, "Near the taps", "Standard position — door on the same end as taps")}
                    {renderCard("opposite", ArrowLeft, "Opposite the taps", "Useful if a toilet or basin blocks the tap end (RV models)")}
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
