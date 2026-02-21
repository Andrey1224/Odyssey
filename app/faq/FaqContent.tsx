"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Cog,
  CheckCircle2,
  Droplets,
  Mail,
  Phone,
  PoundSterling,
  ShieldCheck,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

type FAQGroup = {
  title: string;
  icon: LucideIcon;
  items: FAQItem[];
};

const FAQ_GROUPS: FAQGroup[] = [
  {
    title: "Purchasing & Installation",
    icon: PoundSterling,
    items: [
      {
        question: "Do I need to pay VAT on my purchase?",
        answer: (
          <>
            <p>
              In most cases, Odyssey Baths customers are{" "}
              <strong>exempt from paying VAT</strong>. You qualify for 0% VAT if
              the bath is purchased for someone with a chronic illness or
              mobility restriction (e.g., arthritis, heart condition).
            </p>
            <p className="mt-3">
              You <strong>do not</strong> need to be registered disabled or
              provide a doctor&apos;s letter. You simply sign a self-declaration
              form at checkout.{" "}
              <a
                href="/contact"
                className="font-semibold text-teal-800 underline decoration-dashed underline-offset-4 hover:decoration-solid"
              >
                Contact us
              </a>{" "}
              if you are unsure about your eligibility.
            </p>
          </>
        ),
      },
      {
        question: "Can this replace my old standard bath?",
        answer: (
          <>
            <p>
              Yes, our models are specifically designed to replace standard UK
              bathtubs.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                We offer standard lengths of <strong>1500mm</strong> and{" "}
                <strong>1700mm</strong>.
              </li>
              <li>
                The <strong>Carnelian</strong> model is 1675mm, making it
                perfect for replacing a 1700mm bath without needing to re-tile
                the walls.
              </li>
              <li>
                For smaller spaces, we have compact deep soakers ranging from
                900mm to 1045mm.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    title: "Safety & Maintenance",
    icon: ShieldCheck,
    items: [
      {
        question: "How safe are your walk-in baths?",
        answer: (
          <>
            <p>Safety is our number one priority. All Odyssey models feature:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Low Threshold Entry:</strong> Minimizing the risk of
                tripping.
              </li>
              <li>
                <strong>Anti-slip Surface:</strong> Integrated into the floor
                of the bath.
              </li>
              <li>
                <strong>Built-in Seating:</strong> Ergonomic seats and grab
                rails for maximum stability and support.
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "Is it difficult to clean and maintain?",
        answer: (
          <>
            <p>
              Our baths are designed for easy maintenance. They are crafted
              from high-quality <strong>gel coat</strong>, a non-porous material
              that is resistant to stains, mold, and mildew.
            </p>
            <p className="mt-3">
              On specific sit-in models like the <em>Affinity</em> or{" "}
              <em>Maestro</em>, the door can be removed in seconds, allowing for
              effortless cleaning of the entire tub.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "Performance & Warranty",
    icon: Cog,
    items: [
      {
        question: "How long does the water take to drain?",
        answer: (
          <>
            <p>
              We use technology to ensure the fastest possible exit. Most of
              our models feature{" "}
              <strong className="text-teal-800">
                <Droplets className="-mt-1 mr-1 inline-block h-4 w-4" />
                Twin Waste Technology
              </strong>{" "}
              (two waste outlets), which allows water to drain significantly
              faster than a standard bath.
            </p>
            <p className="mt-3">
              This minimizes the waiting time so you don&apos;t get cold while the
              bath empties.
            </p>
          </>
        ),
      },
      {
        question: "What warranty do you provide?",
        answer: (
          <>
            <p>We are confident in our quality and offer comprehensive support:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li className="text-[1.05rem]">
                <span className="font-bold text-teal-800">
                  <CheckCircle2 className="-mt-1 mr-1 inline-block h-4 w-4" />
                  Lifetime Warranty
                </span>{" "}
                on the watertight Door Seal.
              </li>
              <li>
                <strong>5-6 Years Warranty</strong> on the bath shell
                (depending on model).
              </li>
              <li>
                <strong>1 Year Warranty</strong> on electronics, spa systems,
                and lighting.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
];

export function FaqContent() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs("/faq")} />
      </div>

      <section className="bg-cream-50 py-14 md:py-16">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-12 text-center md:mb-14">
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.08em] text-teal-800">
              Common Questions
            </span>
            <h1 className="font-serif text-4xl font-bold text-slate-900 md:text-5xl">
              Everything You Need to Know
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Buying a walk-in bath is a big decision. Here are honest answers
              to the common technical and financial questions we receive.
            </p>
          </div>

          <div className="space-y-10">
            {FAQ_GROUPS.map((group) => (
              <section key={group.title}>
                <h2 className="mb-5 flex items-center gap-3 border-b-2 border-teal-50 pb-3 text-2xl font-bold text-slate-900">
                  <group.icon className="h-6 w-6 text-teal-800" />
                  {group.title}
                </h2>

                <div className="space-y-4">
                  {group.items.map((item, itemIndex) => {
                    const itemKey = `${group.title}-${itemIndex}`;
                    const isOpen = !!openItems[itemKey];

                    return (
                      <div
                        key={item.question}
                        className={`rounded-xl border bg-slate-50 transition hover:border-slate-300 hover:shadow-[0_4px_10px_rgba(0,0,0,0.03)] ${isOpen
                          ? "border-teal-700 bg-cream-50 shadow-[0_4px_15px_rgba(17,122,122,0.08)]"
                          : "border-slate-200"
                          }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(itemKey)}
                          className="flex w-full items-center justify-between px-5 py-5 text-left text-lg font-semibold text-slate-900 md:px-6"
                          aria-expanded={isOpen}
                        >
                          <span>{item.question}</span>
                          <span className="ml-4 shrink-0 text-2xl leading-none text-teal-800">
                            {isOpen ? "-" : "+"}
                          </span>
                        </button>

                        <div
                          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                          <div
                            className={`px-5 text-base leading-relaxed text-slate-600 transition-[padding,border-color] duration-300 ease-in-out md:px-6 ${isOpen
                              ? "border-t border-teal-50 pb-6 pt-5"
                              : "border-t border-transparent pb-0 pt-0"
                              }`}
                          >
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-14 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-center text-white md:px-8 md:py-12">
            <h2 className="text-3xl font-bold">Still have specific questions?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-300">
              Our technical team is happy to help with measurements and layout
              advice.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:08001234567"
                className="inline-flex items-center gap-2 rounded-full bg-teal-800 px-7 py-3 text-lg font-semibold text-white transition hover:bg-teal-900"
              >
                <Phone className="h-5 w-5" />
                Call Free 0800 123 4567
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-7 py-3 text-lg font-semibold text-white transition hover:bg-cream-50 hover:text-slate-900"
              >
                <Mail className="h-5 w-5" />
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
