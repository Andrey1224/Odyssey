"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone, Calendar, ShieldCheck,
  CheckCircle, ArrowRight, Download, Clock, MapPin
} from "lucide-react";

interface FormData {
  fullName: string;
  phone: string;
  postcode: string;
  email: string;
  callTime: string;
  message: string;
}

const FreeQuoteForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    postcode: "",
    email: "",
    callTime: "Anytime",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      console.log("Lead Captured:", formData);
    }, 1500);
  };

  // --- SUCCESS STATE ---
  if (status === "success") {
    return (
      <div className="bg-cream-50 py-16 px-4 min-h-[600px] flex items-center justify-center">
        <div className="max-w-2xl w-full bg-cream-50 rounded-2xl shadow-xl p-8 md:p-12 text-center border-t-8 border-teal-800">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-100 rounded-full text-teal-800 mb-6">
            <CheckCircle size={48} />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Thank You, {formData.fullName.split(" ")[0]}!
          </h2>

          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Your request has been received. One of our friendly experts will call you shortly (usually within 24 hours) to discuss your needs.
          </p>

          <div className="bg-cream-50 rounded-xl p-6 mb-8 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">While you wait...</h3>
            <p className="text-slate-600 mb-4">Why not view our latest brochure online?</p>
            <Link
              href="/free-brochure"
              className="inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-900 text-white text-lg font-bold py-3 px-8 rounded-lg shadow-md transition-all transform hover:-translate-y-1"
            >
              <Download size={20} />
              Download Digital Brochure
            </Link>
          </div>

          <Link
            href="/"
            className="text-slate-600 hover:text-teal-800 font-semibold underline underline-offset-4"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    );
  }

  // --- MAIN FORM ---
  return (
    <section className="bg-cream-50 py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Get Your Free Quote
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            No obligation. No hard sell. Just a friendly chat to confirm your bathroom layout and recommend the safest model for your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* LEFT COLUMN: TRUST & PROCESS */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">

            {/* What Happens Next */}
            <div className="bg-cream-50 rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">What happens next?</h3>
              <div className="space-y-6">

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-800 font-bold text-xl">1</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">We&apos;ll give you a call</h4>
                    <p className="text-slate-600">Usually within 24 hours. Just a quick, friendly chat to understand what you need.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-800 font-bold text-xl">2</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Check compatibility</h4>
                    <p className="text-slate-600">We&apos;ll ask a few simple questions about your bathroom size and hot water system.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-800 font-bold text-xl">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Free Quote / Survey</h4>
                    <p className="text-slate-600">We&apos;ll give you a fixed price or book a free home survey if measurements are needed.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Phone CTA */}
            <div className="bg-teal-900 rounded-2xl p-6 md:p-8 text-center text-white shadow-lg">
              <p className="text-teal-200 font-bold uppercase tracking-wider text-xs md:text-sm mb-2">Prefer to speak to a human?</p>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Call our UK team directly</h3>
              <a href="tel:08001234567" className="inline-flex items-center justify-center gap-2 md:gap-3 text-2xl md:text-3xl font-black text-white transition-colors break-keep whitespace-nowrap">
                <Phone className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
                0800 123 4567
              </a>
              <p className="mt-4 text-xs md:text-sm text-teal-300 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" /> Mon-Fri: 9am - 5pm
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: FORM */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-cream-50 rounded-2xl shadow-xl border-t-4 border-t-teal-700 p-6 md:p-10">

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-lg font-bold text-slate-700 mb-2">
                    Full Name <span className="text-red-800">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="e.g. John Smith"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 bg-cream-50 text-xl text-slate-900 placeholder:text-slate-600 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 transition-all outline-none"
                  />
                </div>

                {/* Phone & Postcode grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-lg font-bold text-slate-700 mb-2">
                      Phone Number <span className="text-red-800">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="07700 900000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 bg-cream-50 text-xl text-slate-900 placeholder:text-slate-600 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="postcode" className="block text-lg font-bold text-slate-700 mb-2">
                      Postcode <span className="text-red-800">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                      <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        required
                        placeholder="e.g. IP33 1AA"
                        value={formData.postcode}
                        onChange={handleChange}
                        className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-cream-50 text-xl text-slate-900 placeholder:text-slate-600 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 transition-all outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Email (optional) */}
                <div>
                  <label htmlFor="email" className="block text-lg font-bold text-slate-700 mb-2">
                    Email Address <span className="text-slate-600 font-normal text-sm">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 bg-cream-50 text-xl text-slate-900 placeholder:text-slate-600 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 transition-all outline-none"
                  />
                </div>

                {/* Best time to call */}
                <div>
                  <label htmlFor="callTime" className="block text-lg font-bold text-slate-700 mb-2">
                    Best time to call?
                  </label>
                  <div className="relative">
                    <select
                      id="callTime"
                      name="callTime"
                      value={formData.callTime}
                      onChange={handleChange}
                      className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 bg-cream-50 text-xl text-slate-900 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option value="Anytime">Anytime (9am - 5pm)</option>
                      <option value="Morning">Morning (9am - 12pm)</option>
                      <option value="Afternoon">Afternoon (12pm - 5pm)</option>
                    </select>
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={24} />
                  </div>
                </div>

                {/* Message (optional) */}
                <div>
                  <label htmlFor="message" className="block text-lg font-bold text-slate-700 mb-2">
                    How can we help? <span className="text-slate-600 font-normal text-sm">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-cream-50 text-lg text-slate-900 placeholder:text-slate-600 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/20 transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`w-full flex items-center justify-center gap-3 text-2xl font-bold py-5 rounded-xl shadow-lg transition-all ${
                    status === "submitting"
                      ? "bg-slate-300 cursor-wait text-slate-600"
                      : "bg-teal-800 hover:bg-teal-900 text-white transform hover:-translate-y-1"
                  }`}
                >
                  {status === "submitting" ? "Sending..." : "Get Free Quote"}
                  {status !== "submitting" && <ArrowRight strokeWidth={3} />}
                </button>

                {/* Privacy note */}
                <div className="flex items-start gap-3 mt-4 p-4 bg-cream-50 rounded-lg border border-slate-100">
                  <ShieldCheck className="text-teal-800 flex-shrink-0" size={20} />
                  <p className="text-sm text-slate-600 leading-snug">
                    <strong>Your privacy is safe.</strong> We never share your details with third parties. This is purely for an initial consultation with no obligation to buy.
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FreeQuoteForm;
