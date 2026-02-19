"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users, User, Armchair, Bed,
  Accessibility, Box, ArrowRight,
  ArrowLeft, Phone, CheckCircle, HelpCircle,
  Star, X,
} from "lucide-react";

interface BathWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type StepId = "intro" | "step1" | "step2" | "step3";
type ResultId = "shower-baths" | "deep-soaker" | "walk-in" | "standard";

interface Option {
  id: string;
  label: string;
  subLabel: string;
  icon: React.ElementType;
  action: "result" | "next";
  resultId?: ResultId;
  nextStep?: StepId;
}

interface IntroStep {
  id: "intro";
  title: string;
  question: string;
  isStart: true;
  buttonText: string;
}

interface QuestionStep {
  id: StepId;
  progress: string;
  question: string;
  isStart?: false;
  options: Option[];
}

type Step = IntroStep | QuestionStep;

interface Result {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  imagePlaceholder: string;
}

const steps: Record<StepId, Step> = {
  intro: {
    id: "intro",
    title: "Find Your Perfect Bath",
    question: "Answer 3 simple questions and we'll match you with the right type of accessible bath for your home and lifestyle.",
    isStart: true,
    buttonText: "Start 30-Second Quiz",
  },
  step1: {
    id: "step1",
    progress: "Question 1 of 3",
    question: "How do you plan to use the bath?",
    options: [
      { id: "shower", label: "Full Shower + Bath", subLabel: "The whole family needs a proper standing shower too", icon: Users, action: "result", resultId: "shower-baths" },
      { id: "bath_only", label: "Safe Bathing Only", subLabel: "Seated or reclined — focus on comfort and a low door", icon: User, action: "next", nextStep: "step2" },
    ],
  },
  step2: {
    id: "step2",
    progress: "Question 2 of 3",
    question: "How is it most comfortable for you to bathe?",
    options: [
      { id: "seated", label: "Seated Upright", subLabel: "Easy to get in and out — suits smaller bathrooms", icon: Armchair, action: "result", resultId: "deep-soaker" },
      { id: "lying", label: "Lying Down / Reclined", subLabel: "I want to stretch out and fully relax", icon: Bed, action: "next", nextStep: "step3" },
    ],
  },
  step3: {
    id: "step3",
    progress: "Question 3 of 3",
    question: "What level of access do you need?",
    options: [
      { id: "standard", label: "Replace My Existing Bath", subLabel: "Standard size (150–170 cm) — no tiling or major works", icon: Box, action: "result", resultId: "standard" },
      { id: "wheelchair", label: "Maximum Safety & Access", subLabel: "Zero-threshold entry, reinforced frame or transfer from wheelchair", icon: Accessibility, action: "result", resultId: "walk-in" },
    ],
  },
};

const results: Record<ResultId, Result> = {
  "shower-baths": {
    title: "Walk-In Shower Baths",
    subtitle: "Level access, no stepping over",
    description: "The perfect 2-in-1 solution. Spacious showering area for the family with low-level entry for safety.",
    url: "/walk-in-shower-baths",
    imagePlaceholder: "Shower Bath Image",
  },
  "deep-soaker": {
    title: "Deep Soaker Baths",
    subtitle: "Ideal for small spaces",
    description: "Compact baths with a built-in seat. Allows for deep, relaxing immersion without the struggle of lying down.",
    url: "/deep-soaker-baths",
    imagePlaceholder: "Deep Soaker Image",
  },
  "walk-in": {
    title: "Walk-In Baths",
    subtitle: "Full length comfort & low threshold",
    description: "Classic full-length bathing with a watertight door. Easy entry without climbing over a high rim.",
    url: "/walk-in-baths",
    imagePlaceholder: "Walk-in Bath Image",
  },
  standard: {
    title: "Standard Size Baths",
    subtitle: "Accessible full-length bathing",
    description: "Fits into the space of your existing tub. Familiar comfort with the added safety of a door.",
    url: "/standard-size-baths",
    imagePlaceholder: "Standard Bath Image",
  },
};

const questionStepIds: StepId[] = ["step1", "step2", "step3"];

export function BathWizardModal({ isOpen, onClose }: BathWizardModalProps) {
  const router = useRouter();
  const [currentStepId, setCurrentStepId] = useState<StepId>("intro");
  const [history, setHistory] = useState<StepId[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [finalResult, setFinalResult] = useState<Result | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStart = () => setCurrentStepId("step1");

  const handleOptionSelect = (option: Option) => setSelectedOption(option);

  const handleNext = () => {
    if (!selectedOption) return;
    if (selectedOption.action === "result" && selectedOption.resultId) {
      setFinalResult(results[selectedOption.resultId]);
    } else if (selectedOption.action === "next" && selectedOption.nextStep) {
      setHistory([...history, currentStepId]);
      setCurrentStepId(selectedOption.nextStep);
    }
    setSelectedOption(null);
  };

  const handleBack = () => {
    if (finalResult) {
      setFinalResult(null);
    } else if (history.length > 0) {
      const prevStep = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentStepId(prevStep);
      setSelectedOption(null);
    } else {
      setCurrentStepId("intro");
    }
  };

  const handleViewModels = () => {
    if (!finalResult) return;
    router.push(finalResult.url);
    onClose();
  };

  const currentStep = steps[currentStepId];

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
          {finalResult ? (
            <div key="result" className="p-8 md:p-12 text-center animate-slide-up">
              <div className="bg-slate-100 h-48 md:h-64 w-full rounded-xl flex items-center justify-center relative mb-8 overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-slate-600 font-bold text-2xl group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-cream-50/95 px-3 py-1 rounded-full shadow-sm flex items-center gap-1 animate-zoom-in">
                  <Star size={14} className="text-green-500" fill="currentColor" />
                  <span className="text-xs font-bold text-slate-800">Best Match</span>
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{finalResult.title}</h2>
              <p className="text-teal-800 font-medium text-lg mb-4">{finalResult.subtitle}</p>
              <p className="text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto">{finalResult.description}</p>
              <div className="space-y-4">
                <button
                  onClick={handleViewModels}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xl font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  View These Models
                </button>
                <button
                  onClick={handleBack}
                  className="text-slate-600 font-medium hover:text-teal-800 text-sm transition-colors duration-200"
                >
                  Start Over
                </button>
              </div>
            </div>
          ) : currentStep.isStart ? (
            <div key="intro" className="p-12 md:p-16 text-center animate-slide-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-6 text-teal-800 animate-zoom-in">
                <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">{currentStep.title}</h2>
              <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto">{currentStep.question}</p>
              <button
                onClick={handleStart}
                className="bg-teal-800 hover:bg-teal-900 text-white text-2xl font-bold py-4 px-12 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {currentStep.buttonText}
              </button>
              <div className="mt-6 text-slate-600 text-sm flex justify-center gap-2">
                <Phone size={14} /> Need help? Call 0800 123 4567
              </div>
            </div>
          ) : (
            <div key={currentStepId} className="flex flex-col min-h-[500px] animate-slide-right">
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-cream-50 sticky top-0 z-10">
                <span className="text-teal-800 font-bold text-sm uppercase tracking-widest">
                  {"progress" in currentStep ? currentStep.progress : ""}
                </span>
                <div className="flex gap-2">
                  {questionStepIds.map((step, idx) => (
                    <div
                      key={step}
                      className={`h-2 rounded-full transition-all duration-500 ease-out ${
                        currentStepId === step || idx < questionStepIds.indexOf(currentStepId)
                          ? "w-8 bg-teal-600"
                          : "w-2 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-12 flex-grow bg-slate-50/50">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center leading-tight">
                  {"question" in currentStep ? currentStep.question : ""}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {"options" in currentStep &&
                    currentStep.options.map((option) => {
                      const Icon = option.icon;
                      const isSelected = selectedOption?.id === option.id;
                      return (
                        <div
                          key={option.id}
                          onClick={() => handleOptionSelect(option)}
                          className={`cursor-pointer p-8 rounded-xl border-2 transition-all duration-200 text-left bg-cream-50 group ${
                            isSelected
                              ? "border-teal-600 shadow-xl ring-1 ring-teal-600 transform scale-[1.02]"
                              : "border-transparent shadow-md hover:border-teal-200 hover:shadow-lg hover:scale-[1.01]"
                          }`}
                        >
                          <div className="flex justify-between mb-4">
                            <div
                              className={`p-3 rounded-lg transition-colors duration-300 ${
                                isSelected
                                  ? "bg-teal-100 text-teal-800"
                                  : "bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-800"
                              }`}
                            >
                              <Icon size={32} />
                            </div>
                            <div className={`transition-all duration-300 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                              <CheckCircle className="text-teal-800" size={24} fill="currentColor" color="white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{option.label}</h3>
                          <p className="text-base text-slate-600">{option.subLabel}</p>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="p-8 border-t border-slate-100 flex justify-between bg-cream-50 sticky bottom-0">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft size={20} /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className={`flex items-center gap-2 text-lg font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 ${
                    selectedOption
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
