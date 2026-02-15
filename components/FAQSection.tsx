"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItemProps = {
    question: string;
    answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-5 text-left focus:outline-none"
            >
                <span className="text-lg font-bold text-slate-800">{question}</span>
                {isOpen ? <ChevronUp className="text-teal-600" /> : <ChevronDown className="text-teal-600" />}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100 mb-5" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="text-slate-600 leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export const FAQSection = () => {
    const faqs = [
        {
            question: "Do I qualify for VAT Relief?",
            answer: "Most customers with a chronic condition (such as arthritis, diabetes, heart condition) are eligible for VAT relief on walk-in baths. This saves you 20% off the standard price. You do not need a doctor's letter; a simple self-declaration at checkout is sufficient."
        },
        {
            question: "How fast does the water drain?",
            answer: "Our baths feature dual waste technology, which drains up to 2x faster than a standard bath. While you do need to wait for the water to drain before opening the door, this typically takes only a few minutes."
        },
        {
            question: "What is the difference between Left and Right hand?",
            answer: "When you sit in the bath facing the taps, if the door is on your left, you need a Left Hand bath. If it's on your right, you need a Right Hand bath. Our team can confirm this during your free home survey."
        },
        {
            question: "Installation and Warranty",
            answer: "We offer a comprehensive 10-Year Warranty on the door seal and shell. Installation can typically be completed in just one day with minimal disruption to your home."
        }
    ];

    return (
        <section className="bg-white py-12 md:py-16 border-t border-slate-100">
            <div className="max-w-3xl mx-auto px-5">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-10 font-serif">
                    Buyer's Guide & FAQ
                </h2>
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};
