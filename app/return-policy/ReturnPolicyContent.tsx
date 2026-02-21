"use client";

import React from "react";
import {
  Printer, FileSignature,
  Search, AlertCircle, Wrench, Info, Phone,
} from "lucide-react";
import Link from "next/link";
import { PHONE, PHONE_TEL } from "@/lib/site";

export function ReturnPolicyContent() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-cream-50 font-sans text-slate-900 pb-24">

      {/* 1. Hero */}
      <section className="bg-white pt-16 pb-20 px-6 md:px-8 border-b border-slate-200 print:border-none print:pt-8 print:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-teal-800 font-bold tracking-widest uppercase text-sm mb-4 block print:hidden">
                Customer Service
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Returns &amp; Refunds
              </h1>
              <p className="text-base text-slate-500 font-medium">
                Last updated: 21 February 2026
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-base font-bold min-h-[56px] px-6 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-slate-200 shadow-sm print:hidden self-start md:self-end"
            >
              <Printer size={20} strokeWidth={2.5} />
              Print this policy
            </button>
          </div>

          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-3xl">
            At Odyssey Baths, we want you to be completely satisfied with your purchase. However, due to the specialized nature of our products, specific conditions apply to returns and cancellations to ensure safety and quality standards.
          </p>
        </div>
      </section>

      {/* 2. Glance Cards */}
      <section className="py-16 px-6 md:px-8 max-w-6xl mx-auto print:hidden">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center md:text-left">Important rules at a glance:</h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center text-teal-700 mb-6">
              <FileSignature size={28} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Approval Required</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              No returns are accepted without prior confirmation. You must contact our team first.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 mb-6">
              <Search size={28} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Inspect Before Install</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Once a product has been installed, it is legally considered accepted by the customer.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-700 mb-6">
              <AlertCircle size={28} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Bespoke Orders</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Custom-made or adapted baths are generally non-returnable unless they are defective.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Legal Text */}
      <section className="px-6 md:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 md:p-14 border border-slate-200 shadow-sm">

          <h2 className="font-serif text-3xl font-bold mb-6 mt-0 text-slate-900">1. Authorization Requirement</h2>
          <p className="mb-8 text-lg leading-relaxed text-slate-600">
            No returns will be accepted without prior confirmation from our team. Before sending any item back, you must contact us to receive formal approval, return instructions, and the correct return address.
          </p>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">2. The &ldquo;Installation is Acceptance&rdquo; Rule</h2>
          <div className="bg-teal-50 border border-teal-100 p-6 md:p-8 rounded-2xl mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Wrench className="text-teal-700 shrink-0" size={28} />
              <p className="m-0 text-xl font-bold text-slate-900">Inspect before you install</p>
            </div>
            <p className="text-slate-700 m-0 text-base leading-relaxed">
              <strong>Crucial:</strong> Once a product has been installed, it is considered accepted by the customer. Returns for &ldquo;unwanted&rdquo; items are not possible after installation has commenced. Please inspect all goods thoroughly for any defects or damage <strong>before</strong> starting the installation process.
            </p>
          </div>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">3. Returns of Unwanted Goods</h2>
          <p className="mb-4 text-lg leading-relaxed text-slate-600">
            If you change your mind about a standard product, you may return it within 14 days of delivery. The following strict conditions apply:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-3 text-lg text-slate-600">
            <li><strong className="text-slate-800">Condition:</strong> Items must be in their original, uninstalled condition and in original packaging.</li>
            <li><strong className="text-slate-800">Shipping Costs:</strong> The cost of returning unwanted items is the responsibility of the buyer.</li>
            <li><strong className="text-slate-800">Advice on Shipping:</strong> We strongly recommend using a tracked and insured shipping service for returns, as the risk of damage during transit remains with the buyer until we receive the goods.</li>
            <li><strong className="text-slate-800">Partial Refunds:</strong> We reserve the right to issue partial refunds if the packaging is damaged or the item is returned not in its original state.</li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">4. Bespoke &amp; Custom Items</h2>
          <p className="mb-8 text-lg leading-relaxed text-slate-600">
            Items that are custom-made or &ldquo;bespoke&rdquo; to your specific requirements (such as specialized door handing, non-standard sizes, or custom therapeutic additions) are generally non-returnable unless they are found to be defective.
          </p>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">5. Defective or Damaged Goods</h2>
          <p className="mb-4 text-lg leading-relaxed text-slate-600">
            If you discover a defect or damage <strong>prior</strong> to installation:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-3 text-lg text-slate-600">
            <li>Contact us immediately to arrange a repair or replacement.</li>
            <li>Do <strong>not</strong> proceed with the installation of a damaged product.</li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">6. Refund Timeline &amp; VAT Relief</h2>
          <p className="mb-4 text-lg leading-relaxed text-slate-600">
            Once we receive and inspect your returned item, we will process your refund:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3 text-lg text-slate-600">
            <li>Refunds are typically processed within 30 days legally, although we aim to complete them much faster (often within 24 hours of receipt).</li>
          </ul>
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl mb-8 flex items-start gap-4">
            <Info className="text-slate-400 mt-1 shrink-0" size={24} />
            <p className="m-0 text-base text-slate-600 leading-relaxed">
              <strong className="text-slate-800">VAT Relief Note:</strong> If your purchase was processed with 0% VAT due to eligibility, your refund will reflect the exact ex-VAT amount you paid. You do not need to submit new VAT forms if we are replacing a defective bath.
            </p>
          </div>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">7. Warranty</h2>
          <p className="mb-8 text-lg leading-relaxed text-slate-600">
            All products come with a minimum 12-month manufacturer guarantee. Extended warranties (up to 5 years or more) may apply depending on the specific model and manufacturer.
          </p>

        </div>
      </section>

      {/* 4. CTA */}
      <section className="px-6 md:px-8 max-w-5xl mx-auto mt-14 mb-12 print:hidden">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl px-6 py-10 md:px-8 md:py-12 text-center text-white">
          <h3 className="font-serif text-3xl md:text-4xl font-extrabold mb-4">
            Need to return an item?
          </h3>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Remember, you must contact our UK-based team for authorisation before sending any item back. We are here to help make the process as smooth as possible.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-800 px-7 py-3 text-lg font-semibold text-white transition hover:bg-teal-900"
            >
              Contact Support
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-7 py-3 text-lg font-semibold text-white transition hover:bg-cream-50 hover:text-slate-900"
            >
              <Phone size={20} className="text-teal-400" />
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
