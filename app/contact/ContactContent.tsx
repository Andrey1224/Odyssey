"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Phone, MapPin, CheckCircle, ShieldCheck, Mail, Clock,
  Calculator, MessageSquare, ArrowRight, ChevronDown, ChevronUp,
  Bath, Home,
} from "lucide-react";

export type IntentId = "quote" | "survey" | "question" | "handing";

const intents = [
  { id: "quote" as IntentId, title: "Get a Free Quote", icon: Calculator, desc: "Find out exactly how much your ideal bath will cost." },
  { id: "survey" as IntentId, title: "Book a Home Survey", icon: Home, desc: "We measure your bathroom to ensure a perfect fit." },
  { id: "question" as IntentId, title: "Ask a Question", icon: MessageSquare, desc: "Need advice? Our UK experts are here to help." },
  { id: "handing" as IntentId, title: "Check Bathroom Layout", icon: Bath, desc: "Not sure if you need a Left or Right-hand door?" },
];

const faqs = [
  {
    q: "Do I qualify for VAT relief?",
    a: "If you have a long-term illness or disability (like Arthritis, heart conditions, or mobility issues), you likely qualify for 0% VAT. We handle all the paperwork for you.",
  },
  {
    q: "How long does installation take?",
    a: "In most cases, we remove your old bath and install the new walk-in model in just one day, with zero mess left behind.",
  },
  {
    q: "Is a home survey required?",
    a: "It's highly recommended but completely free and carries no obligation. It ensures we recommend a bath that perfectly fits your existing plumbing and space.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden mb-4 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50"
      >
        <span className="text-[20px] font-bold text-slate-900 pr-4">{question}</span>
        {isOpen
          ? <ChevronUp size={28} className="text-teal-700 flex-shrink-0" />
          : <ChevronDown size={28} className="text-teal-700 flex-shrink-0" />
        }
      </button>
      {isOpen && (
        <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50">
          <p className="text-[18px] text-slate-700 leading-relaxed mt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function ContactContent({ defaultIntent }: { defaultIntent: IntentId }) {
  const [activeIntent, setActiveIntent] = useState<IntentId>(defaultIntent);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    postcode: "",
    email: "",
    message: "",
    handing: "",
  });
  const formSectionRef = useRef<HTMLElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intent: activeIntent,
        name: formData.fullName,
        phone: formData.phone,
        postcode: formData.postcode,
        email: formData.email || undefined,
        message: formData.message || undefined,
        website: honeypotRef.current?.value ?? "",
      }),
    });
    const data = await res.json().catch(() => ({ ok: false, error: "Network error." }));
    if (data.ok) {
      setStatus("success");
      formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setError(data.error ?? "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="pb-24">

      {/* Hero */}
      <section className="pt-12 pb-16 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 items-center">

          {/* Text — goes below on mobile */}
          <div className="md:col-span-7 order-2 md:order-1">
            <span className="text-teal-700 font-bold tracking-widest uppercase text-sm mb-4 block">
              We are here to help
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Contact Odyssey Baths
            </h1>
            <p className="text-[22px] text-slate-600 mb-8 leading-relaxed font-medium">
              Friendly advice. No hard sell. Speak to our UK team to find the perfect safe bathing solution for your home.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" size={24} />
                <span className="text-[20px] text-slate-800">Request a free brochure by post</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" size={24} />
                <span className="text-[20px] text-slate-800">Get a free quote &amp; guidance on VAT relief</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" size={24} />
                <span className="text-[20px] text-slate-800">Book a free, no-obligation home survey</span>
              </li>
            </ul>
          </div>

          {/* Phone card — goes first on mobile */}
          <div className="md:col-span-5 order-1 md:order-2">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 text-center">
              <h2 className="text-[20px] font-bold text-slate-500 uppercase tracking-wide mb-6">
                Speak to a specialist now
              </h2>
              <a
                href="tel:08001234567"
                className="inline-flex items-center justify-center gap-3 text-4xl md:text-5xl font-black text-teal-800 hover:text-teal-600 transition-colors mb-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50 rounded-xl p-2"
              >
                <Phone size={36} strokeWidth={2.5} />
                0800 123 4567
              </a>
              <p className="text-[18px] text-slate-600 font-medium flex items-center justify-center gap-2 mb-8">
                <Clock size={20} /> Mon-Fri: 9am - 5pm
              </p>
              <a
                href="tel:08001234567"
                className="flex items-center justify-center w-full bg-teal-800 hover:bg-teal-900 text-white text-[20px] font-bold min-h-[64px] rounded-xl shadow-md transition-colors mb-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50"
              >
                Call Now
              </a>
              <p className="text-[16px] text-slate-500">
                If you prefer, leave your details below and we&apos;ll call you back.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Intent selector + Form */}
      <section ref={formSectionRef} id="form-section" className="py-12 px-6 md:px-8 max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 text-center">
          How can we help you today?
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-12">
          {intents.map((intent) => {
            const Icon = intent.icon;
            const isActive = activeIntent === intent.id;
            return (
              <button
                key={intent.id}
                onClick={() => setActiveIntent(intent.id)}
                className={`
                  flex items-start gap-4 p-6 rounded-2xl text-left transition-all min-h-[100px]
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50 border-2
                  ${isActive
                    ? "bg-teal-50 border-teal-700 shadow-md ring-1 ring-teal-700"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
                  }
                `}
              >
                <div className={`p-3 rounded-full flex-shrink-0 ${isActive ? "bg-teal-800 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className={`text-[20px] font-bold mb-1 ${isActive ? "text-teal-900" : "text-slate-900"}`}>
                    {intent.title}
                  </h3>
                  <p className={`text-[16px] leading-snug ${isActive ? "text-teal-800" : "text-slate-600"}`}>
                    {intent.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 overflow-hidden">

          {status === "success" ? (
            <div className="p-10 md:p-16 text-center" aria-live="polite">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full text-emerald-600 mb-6">
                <CheckCircle size={48} strokeWidth={2.5} />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Thank You, {formData.fullName.split(" ")[0]}!
              </h3>
              <p className="text-[20px] text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                We have received your request. One of our friendly advisors will call you shortly to discuss your needs. There is absolutely no obligation.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 max-w-lg mx-auto mb-8">
                <p className="font-bold text-slate-900 text-[18px] mb-2">While you wait...</p>
                <p className="text-slate-600 mb-6">Why not view our latest product brochure online?</p>
                <Link
                  href="/free-brochure"
                  className="flex items-center justify-center bg-teal-800 hover:bg-teal-900 text-white text-[18px] font-bold py-4 px-8 rounded-xl shadow-md w-full transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50"
                >
                  View Digital Brochure
                </Link>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="text-teal-700 font-bold hover:underline underline-offset-4 text-[18px]"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2">

              {/* Left panel: Trust module */}
              <div className="bg-[#F3F6F6] p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-8">
                  What happens next?
                </h3>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-200 text-teal-800 flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                    <div>
                      <h4 className="text-[18px] font-bold text-slate-900 mb-1">We&apos;ll give you a call</h4>
                      <p className="text-[16px] text-slate-600 leading-relaxed">Usually within 24 business hours to understand your specific needs.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-200 text-teal-800 flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                    <div>
                      <h4 className="text-[18px] font-bold text-slate-900 mb-1">Answer your questions</h4>
                      <p className="text-[16px] text-slate-600 leading-relaxed">We&apos;ll confirm details like your bathroom layout and explain VAT relief options.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-200 text-teal-800 flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                    <div>
                      <h4 className="text-[18px] font-bold text-slate-900 mb-1">Provide a solution</h4>
                      <p className="text-[16px] text-slate-600 leading-relaxed">We&apos;ll give you a clear price or book a free home survey if measurements are needed.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 p-5 bg-white rounded-xl border border-slate-200 flex items-center gap-4">
                  <ShieldCheck size={32} className="text-emerald-600 flex-shrink-0" />
                  <p className="text-[16px] font-bold text-slate-700 leading-tight">
                    Absolutely no obligation and zero high-pressure sales tactics.
                  </p>
                </div>
              </div>

              {/* Right panel: Adaptive form */}
              <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Honeypot — hidden from real users */}
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="website"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="hidden"
                    autoComplete="off"
                  />

                  <div>
                    <label htmlFor="fullName" className="block text-[18px] font-bold text-slate-800 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" id="fullName" name="fullName" required
                      value={formData.fullName} onChange={handleInputChange}
                      placeholder="e.g. John Smith"
                      className="w-full h-14 px-4 rounded-xl border-2 border-slate-300 bg-cream-50 text-[18px] text-slate-900 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 outline-none transition-all"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-[18px] font-bold text-slate-800 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel" id="phone" name="phone" required
                        value={formData.phone} onChange={handleInputChange}
                        placeholder="07700 900000"
                        className="w-full h-14 px-4 rounded-xl border-2 border-slate-300 bg-cream-50 text-[18px] text-slate-900 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="postcode" className="block text-[18px] font-bold text-slate-800 mb-2">
                        Postcode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" id="postcode" name="postcode" required
                        value={formData.postcode} onChange={handleInputChange}
                        placeholder="e.g. IP33 1AA"
                        className="w-full h-14 px-4 rounded-xl border-2 border-slate-300 bg-cream-50 text-[18px] text-slate-900 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 outline-none transition-all uppercase"
                      />
                    </div>
                  </div>

                  {(activeIntent === "question" || activeIntent === "quote") && (
                    <div>
                      <label htmlFor="email" className="block text-[18px] font-bold text-slate-800 mb-2">
                        Email Address{" "}
                        <span className="text-slate-500 font-normal text-[16px]">(Optional)</span>
                      </label>
                      <input
                        type="email" id="email" name="email"
                        value={formData.email} onChange={handleInputChange}
                        className="w-full h-14 px-4 rounded-xl border-2 border-slate-300 bg-cream-50 text-[18px] text-slate-900 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 outline-none transition-all"
                      />
                    </div>
                  )}

                  {activeIntent === "handing" && (
                    <div>
                      <label className="block text-[18px] font-bold text-slate-800 mb-2">
                        Where do you want the door?
                      </label>
                      <p className="text-slate-500 text-[15px] mb-3">Imagine you are standing outside, looking at the bath.</p>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, handing: "left" })}
                          className={`h-14 rounded-xl border-2 font-bold text-[18px] transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50 ${
                            formData.handing === "left"
                              ? "bg-teal-800 text-white border-teal-800"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          Left Side
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, handing: "right" })}
                          className={`h-14 rounded-xl border-2 font-bold text-[18px] transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50 ${
                            formData.handing === "right"
                              ? "bg-teal-800 text-white border-teal-800"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          Right Side
                        </button>
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="message" className="block text-[18px] font-bold text-slate-800 mb-2">
                      {activeIntent === "question" ? (
                        <>Your Question <span className="text-red-500">*</span></>
                      ) : (
                        <>Any extra details? <span className="text-slate-500 font-normal text-[16px]">(Optional)</span></>
                      )}
                    </label>
                    <textarea
                      id="message" name="message" rows={3}
                      required={activeIntent === "question"}
                      value={formData.message} onChange={handleInputChange}
                      placeholder={activeIntent === "survey" ? "E.g. Is access difficult? Which floor is the bathroom on?" : "How can we help?"}
                      className="w-full p-4 rounded-xl border-2 border-slate-300 bg-cream-50 text-[18px] text-slate-900 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 outline-none transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      aria-live="polite"
                      className="text-red-600 font-semibold text-[16px] text-center"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-3 bg-teal-800 hover:bg-teal-900 text-white text-[22px] font-bold h-16 rounded-xl shadow-md transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50 disabled:bg-slate-400 mt-4"
                  >
                    {status === "submitting" ? "Sending..." : "Request Call Back"}
                    {status !== "submitting" && <ArrowRight size={24} strokeWidth={2.5} />}
                  </button>

                  <p className="text-center text-[14px] text-slate-500 mt-4">
                    Your data is safe. We never sell your details to third parties.
                  </p>

                </form>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* Contact detail cards */}
      <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} />
            </div>
            <h3 className="font-bold text-[20px] text-slate-900 mb-2">Call Us Free</h3>
            <p className="text-[18px] text-slate-600 mb-1">0800 123 4567</p>
            <p className="text-[16px] text-slate-500">Mon-Fri: 9am - 5pm</p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} />
            </div>
            <h3 className="font-bold text-[20px] text-slate-900 mb-2">Email Us</h3>
            <p className="text-[18px] text-slate-600 mb-1">info@odysseybaths.co.uk</p>
            <p className="text-[16px] text-slate-500">We reply within 24 hours</p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} />
            </div>
            <h3 className="font-bold text-[20px] text-slate-900 mb-2">Service Area</h3>
            <p className="text-[18px] text-slate-600 mb-1">Nationwide UK Coverage</p>
            <p className="text-[16px] text-slate-500">Free home surveys available</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6 md:px-8 max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="mb-8">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/faq"
            className="text-teal-700 font-bold text-[18px] hover:text-teal-900 transition-colors underline underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50 p-2 rounded"
          >
            View all frequently asked questions
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 mb-12 mt-12">
        <div className="bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Ready to feel safe <br className="hidden md:block" /> in your bathroom again?
            </h2>
            <p className="text-[20px] text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Call our friendly team today. We provide clear prices and honest advice, without the high-pressure sales pitch.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:08001234567"
                className="flex items-center justify-center gap-3 bg-white text-slate-900 text-[20px] font-extrabold min-h-[64px] px-8 rounded-xl hover:bg-slate-100 transition-colors w-full sm:w-auto focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50"
              >
                <Phone size={24} className="text-teal-700" />
                0800 123 4567
              </a>
              <Link
                href="/free-brochure"
                className="flex items-center justify-center bg-teal-800 hover:bg-teal-900 text-white text-[20px] font-bold min-h-[64px] px-8 rounded-xl transition-colors w-full sm:w-auto focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50"
              >
                Request Free Brochure
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
