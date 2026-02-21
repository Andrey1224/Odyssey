"use client";

import React from "react";
import {
  ArrowLeft, Printer, ShieldCheck,
  Lock, EyeOff, Phone, Mail,
  UserCheck, HeartPulse,
} from "lucide-react";
import { PHONE, PHONE_TEL, EMAIL } from "@/lib/site";

export function PrivacyPolicyContent() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-cream-50 font-sans text-slate-900 pb-24">

      {/* Go Back button row */}
      <div className="bg-white border-b border-slate-200 print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-end">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-teal-700 font-bold text-[16px] px-4 py-2 min-h-[48px] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <ArrowLeft size={20} strokeWidth={2.5} /> Go Back
          </button>
        </div>
      </div>

      {/* 1. Hero */}
      <section className="bg-white pt-16 pb-20 px-6 md:px-8 border-b border-slate-200 print:border-none print:pt-8 print:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-teal-700 font-bold tracking-widest uppercase text-sm mb-4 block print:hidden">
                Legal &amp; Compliance
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-[18px] text-slate-500 font-medium">
                Last updated: 21 February 2026
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-[18px] font-bold min-h-[56px] px-6 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-slate-200 shadow-sm print:hidden"
            >
              <Printer size={20} strokeWidth={2.5} />
              Print this policy
            </button>
          </div>

          <p className="text-[20px] md:text-[22px] text-slate-600 leading-relaxed font-medium max-w-3xl">
            Welcome to Odyssey Baths. We are committed to protecting your personal data and your privacy. This policy explains how we handle your information when you visit our website and request our services.
          </p>
        </div>
      </section>

      {/* 2. Glance Cards */}
      <section className="py-16 px-6 md:px-8 max-w-6xl mx-auto print:hidden">
        <h2 className="text-[24px] font-bold text-slate-900 mb-8 text-center md:text-left">Privacy at a glance:</h2>
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center text-teal-700 mb-6">
              <EyeOff size={28} strokeWidth={2} />
            </div>
            <h3 className="text-[20px] font-bold text-slate-900 mb-3">We never sell data</h3>
            <p className="text-[16px] text-slate-600 leading-relaxed">
              Your personal details are used strictly to provide you with quotes, brochures, and services. We never sell your information to third parties.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 mb-6">
              <Lock size={28} strokeWidth={2} />
            </div>
            <h3 className="text-[20px] font-bold text-slate-900 mb-3">Highly Secure</h3>
            <p className="text-[16px] text-slate-600 leading-relaxed">
              We use modern, enterprise-grade technology to ensure your data is processed and stored with the highest security standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-6">
              <UserCheck size={28} strokeWidth={2} />
            </div>
            <h3 className="text-[20px] font-bold text-slate-900 mb-3">You are in control</h3>
            <p className="text-[16px] text-slate-600 leading-relaxed">
              Under UK law, you have the right to access, correct, or request the deletion of your personal data at any time.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Full Policy Text */}
      <section className="px-6 md:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] p-8 md:p-14 border border-slate-200 shadow-sm">

          <h2 className="font-serif text-3xl font-bold mb-6 mt-0 text-slate-900">1. Introduction</h2>
          <p className="mb-8 text-[18px] md:text-[20px] leading-relaxed text-slate-600">
            Welcome to Odyssey Baths. We are committed to protecting your personal data and your privacy. This policy explains how we handle your information when you visit our website (odysseybaths.co.uk) and request our services.
          </p>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">2. What Data We Collect</h2>
          <p className="mb-4 text-[18px] md:text-[20px] leading-relaxed text-slate-600">
            As this is a lead generation site, we only collect information that you voluntarily provide via our inquiry forms, brochure requests, and survey bookings:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-3 text-[18px] md:text-[20px] text-slate-600">
            <li><strong className="text-slate-800">Identity Data:</strong> Name and title.</li>
            <li><strong className="text-slate-800">Contact Data:</strong> Email address, telephone number, and postal address (specifically for brochure delivery and home surveys).</li>
          </ul>

          <div className="bg-teal-50 border border-teal-100 p-6 md:p-8 rounded-2xl mb-8">
            <div className="flex items-center gap-3 mb-3">
              <HeartPulse className="text-teal-700" size={28} />
              <p className="m-0 text-[22px] font-bold text-slate-900">Health Data &amp; VAT Relief</p>
            </div>
            <p className="text-slate-700 m-0 text-[18px] leading-relaxed">
              If you apply for <strong>0% VAT relief</strong>, you may voluntarily provide information regarding mobility or health conditions (self-declaration). We treat this sensitive information with the utmost care and strictly use it only to legally verify your eligibility for tax exemption under HMRC guidelines.
            </p>
          </div>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">3. How We Use Your Data</h2>
          <p className="mb-4 text-[18px] md:text-[20px] leading-relaxed text-slate-600">
            We use your data strictly to fulfill your direct requests. We do not use your information for automated decision-making. Your data allows us to:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-3 text-[18px] md:text-[20px] text-slate-600">
            <li>Send you a physical or digital product brochure.</li>
            <li>Contact you regarding a customized quote or to book a free home survey.</li>
            <li>Verify your eligibility for VAT relief securely.</li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">4. Data Storage and Security</h2>
          <p className="mb-8 text-[18px] md:text-[20px] leading-relaxed text-slate-600">
            Your data is processed and stored securely. We use modern technical stacks to ensure performance and stability. <strong>Please note:</strong> We do not store any financial or credit card information on this website during Phase 1 of our deployment. All data is protected against unauthorized access, loss, or alteration.
          </p>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">5. Third-Party Services</h2>
          <p className="mb-4 text-[18px] md:text-[20px] leading-relaxed text-slate-600">
            We do not sell your data. We may share your data with trusted partners <strong>only</strong> to provide our services to you:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-3 text-[18px] md:text-[20px] text-slate-600">
            <li><strong className="text-slate-800">Hosting &amp; Infrastructure:</strong> Vercel (for secure website deployment).</li>
            <li><strong className="text-slate-800">Content Management:</strong> Sanity.io (for secure data management).</li>
            <li><strong className="text-slate-800">Delivery:</strong> Trusted UK postal and courier services (strictly for sending brochures or documents to your address).</li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mb-6 mt-12 text-slate-900">6. Your Rights (GDPR)</h2>
          <p className="mb-4 text-[18px] md:text-[20px] leading-relaxed text-slate-600">
            Under UK law and the General Data Protection Regulation (GDPR), you have significant rights regarding your personal data. You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-3 text-[18px] md:text-[20px] text-slate-600">
            <li><strong>Request access</strong> to the personal data we hold about you.</li>
            <li><strong>Request correction</strong> of any incomplete or inaccurate data.</li>
            <li><strong>Request deletion</strong> of your personal data when there is no good reason for us continuing to process it.</li>
            <li><strong>Withdraw consent</strong> for any marketing communications at any time.</li>
          </ul>

        </div>
      </section>

      {/* 4. Privacy Contact CTA */}
      <section className="px-6 md:px-8 max-w-4xl mx-auto mt-12 mb-12 print:hidden">
        <div className="bg-slate-900 rounded-[2rem] p-10 md:p-14 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h3 className="font-serif text-3xl font-bold mb-3 flex items-center justify-center sm:justify-start gap-3">
              <ShieldCheck className="text-teal-400" size={32} />
              Privacy Questions?
            </h3>
            <p className="text-[18px] text-slate-300">
              If you have any questions regarding your data or wish to exercise your GDPR rights, please contact our Data Protection team.
            </p>
          </div>
          <div className="flex flex-col w-full sm:w-auto gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center justify-center gap-3 bg-white text-slate-900 text-[18px] font-bold min-h-[56px] px-8 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-slate-400 whitespace-nowrap"
            >
              <Mail size={20} />
              {EMAIL}
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center justify-center gap-3 bg-transparent border-2 border-white/30 hover:bg-white/10 text-white text-[20px] font-extrabold min-h-[56px] px-8 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-white/50 whitespace-nowrap"
            >
              <Phone size={20} className="text-teal-400" />
              {PHONE}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
