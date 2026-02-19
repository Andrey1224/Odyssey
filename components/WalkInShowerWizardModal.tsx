"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Armchair, User, Circle, Square,
  ArrowRight, ArrowLeft, HelpCircle,
  CheckCircle, Phone, Star, X,
} from "lucide-react";

export interface WalkInShowerWizardModalProps {
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
  olivia: {
    title: "Olivia",
    subtitle: "Walk-in shower bath · Fold-down seat",
    description: "Full-width fold-down seat with a steel safety frame — ideal if you need support while showering. Generous shower zone with anti-slip floor.",
    url: "/walk-in-shower-baths/olivia",
  },
  carnelian: {
    title: "Carnelian",
    subtitle: "P-shape · Curved toughened glass",
    description: "Smooth curved lines and a wide showering area. The P-shape maximises space and gives a contemporary feel without compromising on safety.",
    url: "/walk-in-shower-baths/carnelian",
  },
  highgrove: {
    title: "Highgrove",
    subtitle: "L-shape · Outward-opening door",
    description: "Bold geometric layout with a wide, open showering zone. The outward-opening door gives you the most room inside the bath.",
    url: "/walk-in-shower-baths/highgrove",
  },
  larimar: {
    title: "Larimar",
    subtitle: "L-shape · 10mm inward-opening glass door",
    description: "All the space of an L-shape with an inward-opening door for tight bathrooms. 10mm toughened glass for extra rigidity and a premium look.",
    url: "/walk-in-shower-baths/larimar",
  },
};

const progressDots: StepId[] = ["step1", "step2", "step3"];
const stepLabel: Partial<Record<StepId, string>> = {
  step1: "Question 1 of 3",
  step2: "Question 2 of 3",
  step3: "Question 3 of 3",
};

export function WalkInShowerWizardModal({ isOpen, onClose }: WalkInShowerWizardModalProps) {
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
      if (selected === "seat") {
        showResult("olivia");
      } else {
        goTo("step2");
      }
    } else if (stepId === "step2") {
      if (selected === "pshape") {
        showResult("carnelian");
      } else {
        goTo("step3");
      }
    } else if (stepId === "step3") {
      showResult(selected === "outward" ? "highgrove" : "larimar");
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
        className={`cursor-pointer p-8 rounded-xl border-2 transition-all duration-200 text-left bg-cream-50 group ${
          isSelected
            ? "border-teal-600 shadow-xl ring-1 ring-teal-600 transform scale-[1.02]"
            : "border-transparent shadow-md hover:border-teal-200 hover:shadow-lg hover:scale-[1.01]"
        }`}
      >
        <div className="flex justify-between mb-4">
          <div className={`p-3 rounded-lg transition-colors duration-300 ${isSelected ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-800"}`}>
            <Icon size={32} />
          </div>
          <div className={`transition-all duration-300 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
            <CheckCircle className="text-teal-800" size={24} fill="currentColor" color="white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{label}</h3>
        <p className="text-base text-slate-600">{subLabel}</p>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-cream-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in"
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
            <div className="p-8 md:p-12 text-center animate-slide-up">
              <div className="bg-slate-100 h-48 md:h-64 w-full rounded-xl flex items-center justify-center relative mb-8 overflow-hidden">
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
            <div className="p-12 md:p-16 text-center animate-slide-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-6 text-teal-800 animate-zoom-in">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                Find Your Perfect Walk-In Shower Bath
              </h2>
              <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto">
                Answer 3 quick questions and we&apos;ll match you with the right model for your bathroom.
              </p>
              <button
                onClick={() => goTo("step1")}
                className="bg-teal-800 hover:bg-teal-900 text-white text-2xl font-bold py-4 px-12 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Start 30-Second Quiz
              </button>
              <div className="mt-6 text-slate-600 text-sm flex justify-center gap-2">
                <Phone size={14} /> Need help? Call 0800 123 4567
              </div>
            </div>

          ) : (

            /* ── Questions ── */
            <div className="flex flex-col min-h-[500px] animate-slide-right">

              {/* Progress bar */}
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-cream-50 sticky top-0 z-10">
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

              {/* Step 1 — seat */}
              {stepId === "step1" && (
                <div className="p-6 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center leading-tight">
                    Do you need a seat for showering?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {renderCard("seat", Armchair, "Yes — I need a fold-down seat", "Support while showering, steel safety frame")}
                    {renderCard("standing", User, "No — I shower standing comfortably", "Wide anti-slip shower zone")}
                  </div>
                </div>
              )}

              {/* Step 2 — shape */}
              {stepId === "step2" && (
                <div className="p-6 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center leading-tight">
                    Which bath shape suits your bathroom?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {renderCard("pshape", Circle, "P-Shape — rounded curves", "Smooth contemporary lines, maximises shower space")}
                    {renderCard("lshape", Square, "L-Shape — clean geometry", "Bold modern look, large flat showering platform")}
                  </div>
                </div>
              )}

              {/* Step 3 — door direction */}
              {stepId === "step3" && (
                <div className="p-6 md:p-12 flex-grow bg-slate-50/50">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center leading-tight">
                    Is there space in front of the bath for the door to open outward?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {renderCard("outward", ArrowRight, "Yes — door opens outward", "I have clearance space in front")}
                    {renderCard("inward", ArrowLeft, "No — tight space", "Door must open inward (10mm glass)")}
                  </div>
                </div>
              )}

              {/* Navigation footer */}
              <div className="p-8 border-t border-slate-100 flex justify-between bg-cream-50 sticky bottom-0">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft size={20} /> Back
                </button>
                <button
                  onClick={handleContinue}
                  disabled={!selected}
                  className={`flex items-center gap-2 text-lg font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 ${
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
