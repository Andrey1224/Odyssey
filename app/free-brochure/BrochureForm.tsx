"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Check, Shield, Lock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBreadcrumbs } from "@/lib/breadcrumbs";
import { submitBrochureLead } from "./actions";

type FormState = {
  success: boolean;
  firstName?: string;
  errors?: Record<string, string>;
};

const initialState: FormState = { success: false };

function SuccessState({ firstName }: { firstName: string }) {
  return (
    <div className="text-center py-10 px-4">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-teal-800">
        <Check size={40} strokeWidth={3} />
      </div>
      <h2 className="font-serif text-3xl font-bold text-slate-900 mb-3">
        Request Received!
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        Thank you, {firstName}. Your brochure is being prepared and will be
        posted today.
      </p>
      <div className="text-left bg-slate-50 rounded-xl p-6 mb-8">
        <h4 className="font-bold text-slate-900 mb-3">What happens next?</h4>
        <ol className="space-y-2 text-slate-600">
          <li>1. You will receive a confirmation email shortly.</li>
          <li>2. Your brochure should arrive within 2–3 working days.</li>
          <li>3. One of our experts may call to verify your address.</li>
        </ol>
      </div>
      <Link
        href="/walk-in-baths"
        className="inline-block bg-teal-800 hover:bg-teal-900 text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors min-h-[48px]"
      >
        Back to Walk-in Baths
      </Link>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-red-800 text-base font-medium">{message}</p>;
}

function inputClass(hasError?: boolean) {
  return [
    "w-full text-lg px-4 py-3.5 border-2 rounded-xl text-slate-900 bg-cream-50 transition-colors",
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50 focus:border-teal-700",
    hasError ? "border-red-700 bg-red-50" : "border-slate-300",
  ].join(" ");
}

export function BrochureForm({
  productSlug,
}: {
  productSlug?: string;
}) {
  const [state, formAction, isPending] = useActionState(
    submitBrochureLead,
    initialState
  );

  const productName = productSlug
    ? productSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : undefined;

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={getBreadcrumbs("/free-brochure")} className="py-5" />

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          {/* Left: Value Prop */}
          <div className="pt-2">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Get your Free Brochure
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Receive our full 2026 catalogue by post. Browse our range of safe
              bathing solutions from the comfort of your armchair.
            </p>

            {/* Brochure mockup */}
            <div className="bg-slate-100 rounded-2xl p-6 text-center mb-8 border border-slate-200">
              <div className="h-48 bg-slate-200 rounded-xl flex items-center justify-center mb-3">
                <span className="text-slate-600 font-semibold text-lg">
                  Odyssey 2026 Catalogue
                </span>
              </div>
              <p className="text-slate-600 text-base">
                52 pages of models, prices, and installation examples.
              </p>
            </div>

            {/* Value list */}
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">
              Your brochure includes:
            </h3>
            <ul className="space-y-3 mb-8">
              {[
                "Full pricing and VAT relief guide",
                "Detailed dimensions for every model",
                'Real customer "Before & After" photos',
                "Installation process explained step by step",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg text-slate-900">
                  <Check
                    size={22}
                    className="text-teal-800 shrink-0 mt-0.5"
                    strokeWidth={3}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Mini trust */}
            <div className="flex flex-wrap gap-5 border-t border-slate-200 pt-5 text-base text-slate-600">
              {[
                { Icon: Shield, label: "No Hard Sell" },
                { Icon: Lock, label: "Data Privacy Guaranteed" },
                { Icon: Check, label: "10-Year Warranty" },
              ].map(({ Icon, label }) => (
                <span key={label} className="flex items-center gap-2">
                  <Icon size={16} className="text-teal-800 shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Form card */}
          <div className="bg-cream-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
            {state.success && state.firstName ? (
              <SuccessState firstName={state.firstName} />
            ) : (
              <>
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <h2 className="font-serif text-2xl font-bold text-slate-900 mb-1">
                    Send me a brochure
                  </h2>
                  <p className="text-slate-600 text-base">
                    Fill in your details below. No obligation.
                  </p>
                  {productName && (
                    <span className="inline-block mt-3 bg-teal-50 text-teal-800 text-sm font-semibold px-3 py-1.5 rounded-lg border border-teal-200">
                      Including details for: {productName}
                    </span>
                  )}
                </div>

                <form action={formAction} noValidate>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="_hp"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  {/* Product slug */}
                  <input
                    type="hidden"
                    name="productSlug"
                    value={productSlug ?? ""}
                  />

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block font-semibold text-slate-900 mb-2 text-base"
                      >
                        First Name <span className="text-red-800">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="e.g. John"
                        autoComplete="given-name"
                        className={inputClass(!!state.errors?.firstName)}
                      />
                      <FieldError message={state.errors?.firstName} />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block font-semibold text-slate-900 mb-2 text-base"
                      >
                        Last Name <span className="text-red-800">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="e.g. Smith"
                        autoComplete="family-name"
                        className={inputClass(!!state.errors?.lastName)}
                      />
                      <FieldError message={state.errors?.lastName} />
                    </div>
                  </div>

                  {/* Postcode */}
                  <div className="mb-5">
                    <label
                      htmlFor="postcode"
                      className="block font-semibold text-slate-900 mb-2 text-base"
                    >
                      Postcode <span className="text-red-800">*</span>
                    </label>
                    <input
                      id="postcode"
                      name="postcode"
                      type="text"
                      placeholder="e.g. SW1A 1AA"
                      autoComplete="postal-code"
                      className={
                        inputClass(!!state.errors?.postcode) +
                        " max-w-[200px] uppercase"
                      }
                    />
                    <FieldError message={state.errors?.postcode} />
                  </div>

                  {/* Address 1 */}
                  <div className="mb-5">
                    <label
                      htmlFor="address1"
                      className="block font-semibold text-slate-900 mb-2 text-base"
                    >
                      Address Line 1 <span className="text-red-800">*</span>
                    </label>
                    <input
                      id="address1"
                      name="address1"
                      type="text"
                      placeholder="House number and street name"
                      autoComplete="address-line1"
                      className={inputClass(!!state.errors?.address1)}
                    />
                    <FieldError message={state.errors?.address1} />
                  </div>

                  {/* Address 2 */}
                  <div className="mb-5">
                    <label
                      htmlFor="address2"
                      className="block font-semibold text-slate-900 mb-2 text-base"
                    >
                      Address Line 2{" "}
                      <span className="text-slate-600 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      id="address2"
                      name="address2"
                      type="text"
                      autoComplete="address-line2"
                      className={inputClass(false)}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="block font-semibold text-slate-900 mb-2 text-base"
                    >
                      Email Address <span className="text-red-800">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      className={inputClass(!!state.errors?.email)}
                    />
                    <FieldError message={state.errors?.email} />
                  </div>

                  {/* Phone */}
                  <div className="mb-5">
                    <label
                      htmlFor="phone"
                      className="block font-semibold text-slate-900 mb-2 text-base"
                    >
                      Telephone <span className="text-red-800">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="07700 900000"
                      autoComplete="tel"
                      className={inputClass(!!state.errors?.phone)}
                    />
                    <p className="mt-1.5 text-slate-600 text-sm">
                      We only call to confirm address details.
                    </p>
                    <FieldError message={state.errors?.phone} />
                  </div>

                  {/* Best time to call */}
                  <div className="mb-6 bg-slate-50 p-4 rounded-xl">
                    <label
                      htmlFor="bestTimeToCall"
                      className="block font-semibold text-slate-900 mb-2 text-base"
                    >
                      Best time to call{" "}
                      <span className="text-slate-600 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <select
                      id="bestTimeToCall"
                      name="bestTimeToCall"
                      className="w-full text-lg px-4 py-3.5 border-2 border-slate-300 rounded-xl text-slate-900 bg-cream-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50 focus:border-teal-700 transition-colors"
                    >
                      <option value="">Anytime</option>
                      <option value="morning">Morning (9am – 12pm)</option>
                      <option value="afternoon">Afternoon (12pm – 5pm)</option>
                      <option value="evening">Evening (5pm – 7pm)</option>
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-teal-800 hover:bg-teal-900 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold text-xl py-4 rounded-xl transition-colors min-h-[56px] flex items-center justify-center gap-3"
                  >
                    {isPending ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending Request…
                      </>
                    ) : (
                      "Get Free Brochure"
                    )}
                  </button>

                  <p className="text-center text-sm text-slate-600 mt-4 flex items-center justify-center gap-1.5">
                    <Lock size={13} />
                    Your data is safe. We never share with 3rd parties.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
