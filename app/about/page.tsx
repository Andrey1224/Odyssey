import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock3,
  Heart,
  MapPinned,
  Percent,
  Shield,
  ShieldCheck,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const trustBullets = [
  { icon: Award, label: "10+ Years Experience" },
  { icon: MapPinned, label: "Nationwide Installation" },
  { icon: ShieldCheck, label: "No Hard Sell Guarantee" },
];

const trustCards = [
  {
    icon: Shield,
    iconBg: "bg-slate-900",
    title: 'Built Like "The Tank"',
    text: "Our baths feature reinforced steel frames and strengthened acrylic shells. They don't flex, creak or weaken over time.",
    kicker: "Strength you can rely on.",
  },
  {
    icon: Percent,
    iconBg: "bg-teal-700",
    title: "VAT Relief Handled",
    text: "Many customers are eligible for 0% VAT. We guide you through the process and handle the paperwork clearly and simply.",
    kicker: "No hidden charges.",
  },
  {
    icon: Clock3,
    iconBg: "bg-slate-900",
    title: "1-2 Day Installation",
    text: "Most installations are completed within one to two days. We remove your existing bath, install, and tidy up.",
    kicker: "Minimal disruption.",
  },
  {
    icon: Heart,
    iconBg: "bg-teal-700",
    title: "No Sales Pressure",
    text: "We provide fixed, transparent quotations - not vague estimates. No aggressive follow-up calls.",
    kicker: "Decide at your own pace.",
  },
];

const steps = [
  {
    title: "Free Home Visit",
    text: "We assess your bathroom layout and plumbing. No obligation.",
  },
  {
    title: "Bespoke Design",
    text: "We recommend a solution tailored to your mobility needs and available space.",
  },
  {
    title: "Expert Installation",
    text: "Professional fitting - usually completed within one day. Old bath removed and disposed of.",
  },
  {
    title: "Aftercare & Warranty",
    text: "Full demonstration and comprehensive warranty for long-term peace of mind.",
  },
];

const safetyPoints = [
  {
    title: "Reinforced steel frame",
    text: "For long-term structural stability.",
  },
  {
    title: "Anti-slip base",
    text: "Built directly into the bath (not an aftermarket mat).",
  },
  {
    title: "Easy-close aluminium door",
    text: "With watertight seal and easy locking mechanism.",
  },
  {
    title: "Quick-drain system",
    text: "To reduce waiting time before you exit.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-teal-200">
      <Header />

      <section className="bg-cream-50 px-4 py-16 text-center md:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 font-serif text-4xl font-bold text-slate-900 md:text-5xl">About Odyssey Baths</h1>
          <h2 className="mb-6 font-serif text-xl font-bold text-teal-700 md:text-2xl">
            Helping Britain Bathe Safely, Independently and with Confidence
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Odyssey Baths is a UK specialist in safe, accessible bathing solutions for independent living.
            <br />
            <br />
            We believe that enjoying a warm, relaxing bath should never feel risky - no matter your age or mobility.
          </p>

          <div className="mb-10 flex flex-col justify-center gap-4 md:flex-row md:gap-8">
            {trustBullets.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm"
              >
                <Icon className="text-teal-700" size={20} />
                <span className="text-sm font-bold text-slate-900 md:text-base">{label}</span>
              </div>
            ))}
          </div>

          <div className="mb-4 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-xl bg-teal-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:bg-teal-800 active:scale-95"
            >
              Book Free Home Survey
            </Link>
            <Link
              href="/free-brochure"
              className="rounded-xl border-2 border-slate-900 bg-white px-8 py-4 text-lg font-bold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
            >
              Request Free Brochure
            </Link>
          </div>
          <p className="text-sm font-medium text-slate-500">No obligation. No pressure. Just friendly advice.</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div className="order-2 lg:order-1">
            <div className="mb-4 inline-block rounded bg-teal-700/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
              Our Mission
            </div>
            <h2 className="mb-6 font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Restoring dignity, one bath at a time.
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-slate-600">
              For many people, considering a walk-in bath begins with a worry - a slip, a near fall, or simply the
              difficulty of stepping over a high rim.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-slate-600">
              Our mission isn&apos;t just to install a bath. <strong className="text-slate-900">It&apos;s to restore confidence.</strong>{" "}
              We help transform a daily task into a safe, comfortable and reassuring routine - so you can relax without
              asking for help.
            </p>
            <p className="mb-8 text-lg font-medium text-slate-900">
              Many of our customers come to us after a fall - or just before one happens.
            </p>
            <div className="border-l-4 border-teal-700 bg-cream-50 py-2 pl-6">
              <p className="font-serif text-xl italic text-slate-900">
                &quot;Independence is not a luxury. It&apos;s a necessity we protect.&quot;
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/about/about-hero-placeholder.svg"
                alt="Happy couple in a safe bathroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-cream-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">Why UK Homeowners Trust Odyssey</h2>
            <p className="mt-3 text-lg text-slate-600">Honest pricing. Robust engineering. Respectful service.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustCards.map(({ icon: Icon, iconBg, title, text, kicker }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white ${iconBg}`}>
                  <Icon size={20} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
                <p className="mb-2 text-slate-600">{text}</p>
                <p className="text-sm font-bold text-teal-700">{kicker}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-2 text-center font-serif text-3xl font-bold text-slate-900 md:text-4xl">Our Simple 4-Step Process</h2>
          <p className="mb-12 text-center text-lg text-slate-600">Designed to make everything straightforward.</p>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="absolute left-0 top-8 -z-10 hidden h-1 w-full bg-slate-100 md:block" />
            {steps.map((step, index) => (
              <div key={step.title} className="bg-white text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-teal-700 bg-cream-50 text-2xl font-bold text-teal-700">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="px-2 text-sm text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 text-lg font-bold text-teal-700 hover:underline">
              Learn more about installation
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">
              Engineered for Safety.
              <br />
              Designed for Comfort.
            </h2>
            <p className="mb-6 text-lg text-slate-300">
              Every Odyssey bath is built with a zero-threshold philosophy - reducing strain and lowering the risk of
              falls.
            </p>
            <ul className="space-y-4">
              {safetyPoints.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 text-teal-400" size={18} />
                  <div>
                    <strong className="block text-white">{point.title}</strong>
                    <span className="text-sm text-slate-400">{point.text}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-serif text-xl italic text-teal-300">&quot;Because safety should feel effortless.&quot;</p>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <Image
                src="/images/about/about-process-placeholder.svg"
                alt="Technical diagram of bath structure"
                width={600}
                height={400}
                className="w-full rounded opacity-90"
              />
              <div className="mt-4 flex justify-between font-mono text-sm text-slate-400">
                <span>High-Grade Acrylic</span>
                <span>Steel Frame Chassis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-slate-900 md:text-4xl">
            Built for Long-Term Peace of Mind
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
            <div className="grid grid-cols-1 divide-y divide-slate-100 text-center md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="px-4 py-2">
                <div className="mb-2 text-4xl font-bold text-teal-700">∞</div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Lifetime Door Seal Warranty</h3>
                <p className="text-sm text-slate-500">Protection against leaks for lasting reassurance.</p>
              </div>

              <div className="px-4 py-2">
                <div className="mb-2 text-4xl font-bold text-teal-700">200kg</div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Heavy Duty Capacity</h3>
                <p className="text-sm text-slate-500">Engineered for strength and bariatric support.</p>
              </div>

              <div className="px-4 py-2">
                <div className="mb-2 text-4xl font-bold text-teal-700">6 Year</div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Shell & Frame Warranty</h3>
                <p className="text-sm text-slate-500">Reliable construction across the Serenity range.</p>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-8 text-center">
              <p className="mb-2 text-lg font-bold text-slate-900">Designed for everyday use, not occasional support.</p>
              <p className="font-medium italic text-slate-500">
                When you choose Odyssey, you&apos;re choosing durability - not short-term solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-serif text-3xl font-bold text-slate-900 md:text-4xl">Ready to Explore Your Options?</h2>
          <p className="mb-10 text-lg text-slate-600">
            Take the first step towards a safer, more comfortable bathroom today.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-xl bg-teal-700 px-10 py-4 text-xl font-bold text-white shadow-lg transition-transform hover:bg-teal-800 active:scale-95"
            >
              Book Free Survey
            </Link>
            <Link
              href="/free-brochure"
              className="rounded-xl border-2 border-slate-900 bg-cream-50 px-10 py-4 text-xl font-bold text-slate-900 transition-colors hover:bg-slate-100"
            >
              Request Free Brochure
            </Link>
          </div>

          <div className="mt-8">
            <p className="font-medium text-slate-500">Or speak to our friendly UK team:</p>
            <a href="tel:08001234567" className="text-2xl font-bold text-slate-900 transition-colors hover:text-teal-700">
              0800 123 4567
            </a>
            <p className="mt-2 text-sm text-slate-400">No pressure. Just helpful guidance.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
