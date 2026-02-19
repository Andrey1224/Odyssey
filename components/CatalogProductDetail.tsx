"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftRight,
  Check,
  DoorOpen,
  Droplets,
  Dumbbell,
  Flag,
  Leaf,
  Lightbulb,
  Lock,
  Shield,
  ShowerHead,
  Sparkles,
  Star,
  Thermometer,
  Waves,
  Wrench,
  Zap,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TrustBar } from "@/components/TrustBar";
import type { CatalogBaseModel, CatalogProductVariant, PackageFeatureMatrix } from "@/data/catalogTypes";
import { getBreadcrumbs } from "@/lib/breadcrumbs";
import { formatGBP, getSiblings, priceIncVat } from "@/lib/catalog";

const HIGHLIGHTS_ICONS = [DoorOpen, Dumbbell, Droplets, Wrench];

const HIGHLIGHTS_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  waves: Waves,
  zap: Zap,
  showerHead: ShowerHead,
  door: DoorOpen,
  door_wide: DoorOpen,
  threshold: DoorOpen,
  weight: Dumbbell,
  drain: Droplets,
  maintenance: Wrench,
  thermometer: Thermometer,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  leaf: Leaf,
  arrowLeftRight: ArrowLeftRight,
  doorOpen: DoorOpen,
};

const SPEC_LABELS: Record<string, string> = {
  lengthMm: "Length (mm)",
  widthMm: "Width (mm)",
  heightMm: "Height (mm)",
  doorOpeningMm: "Door Opening (mm)",
  internalSeatWidthMm: "Internal Seat Width (mm)",
  maxUserWeightKg: "Max User Weight",
  maxUserWeightLabel: "Max User Weight",
  shellMaterial: "Shell Material",
  frameMaterial: "Frame Material",
  stepHeightMm: "Step Height (mm)",
  waterDepthMm: "Water Depth (mm)",
  volumeL: "Volume (L)",
};

function formatSpecValue(key: string, value: unknown): string {
  if (key === "maxUserWeightKg" && typeof value === "number") {
    const stone = Math.round(value / 6.35029);
    return `${stone} stone (${value} kg)`;
  }
  return String(value);
}

function handingLabel(h: string): string {
  if (h === "L") return "<- Left Hand";
  if (h === "R") return "-> Right Hand";
  return "In-Swing";
}

function hasMatrix(baseModel: CatalogBaseModel | undefined): boolean {
  if (!baseModel?.packageFeatureMatrix) return false;
  const rows = baseModel.packageFeatureMatrix.rows;
  return Array.isArray(rows) && rows.length > 0;
}

function matrixValue(matrix: PackageFeatureMatrix, packageLevel: string, rowIndex: number): boolean {
  const raw = matrix[packageLevel];
  if (!Array.isArray(raw)) return false;
  return Boolean(raw[rowIndex]);
}

type CatalogProductDetailProps = {
  product: CatalogProductVariant;
  products: CatalogProductVariant[];
  baseModels: CatalogBaseModel[];
  categoryHref: string;
};

export function CatalogProductDetail({
  product,
  products,
  baseModels,
  categoryHref,
}: CatalogProductDetailProps) {
  const fallback = "/images/Walk-inBath.png";
  const [vatExempt, setVatExempt] = useState(true);
  const [selectedHanding, setSelectedHanding] = useState(product.defaultDoorHanding);
  const [activeThumb, setActiveThumb] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const resolveImgSrc = (src: string, idx: number) => (imgErrors[idx] ? fallback : src || fallback);

  const displayPrice = vatExempt ? product.priceExVat : priceIncVat(product);

  const siblings = getSiblings(products, product.baseModelId);
  const baseModel = baseModels.find((b) => b.id === product.baseModelId);

  const techSpecRows = product.techSpecs
    ? Object.entries(product.techSpecs)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => ({ label: SPEC_LABELS[k] ?? k, value: formatSpecValue(k, v) }))
    : [];

  const galleryImages =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.primaryImage, product.primaryImage, product.primaryImage];

  const currentImage = galleryImages[activeThumb] ?? product.primaryImage;
  const mainImageSrc = resolveImgSrc(currentImage.src, activeThumb);
  const showComparison = hasMatrix(baseModel);

  return (
    <main className="min-h-screen bg-cream-50 pb-28 selection:bg-teal-200 lg:pb-0">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs
          items={getBreadcrumbs(`${categoryHref}/${product.slug}`, {
            productTitle: product.title,
          })}
        />
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-12 md:pb-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="lg:sticky lg:top-24">
            <div className="relative mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              {product.badges?.[0] && (
                <span className="absolute left-4 top-4 z-10 rounded bg-slate-900 px-2.5 py-1 text-sm font-bold tracking-wider text-white">
                  {product.badges[0]}
                </span>
              )}
              <div className="relative aspect-[4/3]">
                <Image
                  src={mainImageSrc}
                  alt={currentImage.alt || product.title}
                  fill
                  className="object-cover mix-blend-multiply"
                  onError={() => setImgErrors((prev) => ({ ...prev, [activeThumb]: true }))}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 bg-slate-100 p-1 transition-colors ${
                    activeThumb === i ? "border-teal-700" : "border-transparent hover:border-slate-300"
                  }`}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={resolveImgSrc(img.src, i)}
                      alt=""
                      fill
                      className="object-contain"
                      onError={() => setImgErrors((prev) => ({ ...prev, [i]: true }))}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="mb-2 font-serif text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              {product.title}
            </h1>
            {product.heroTagline && (
              <p className="mb-5 text-lg leading-relaxed text-slate-600 md:text-xl">{product.heroTagline}</p>
            )}

            <div className="mb-6 flex flex-wrap gap-3">
              {[
                { Icon: Star, label: "4.9/5 Trustpilot" },
                { Icon: Shield, label: "10 Year Warranty" },
                { Icon: Flag, label: "Made in UK" },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 rounded-md bg-slate-100 px-3 py-1.5 text-base font-semibold text-slate-700"
                >
                  <Icon size={16} className="shrink-0 text-teal-800" />
                  {label}
                </span>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-cream-50 p-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-semibold text-slate-700">Pricing Mode:</span>
                <div className="flex rounded-full bg-slate-200 p-1">
                  <button
                    onClick={() => setVatExempt(true)}
                    className={`rounded-full px-3 py-1 text-sm font-semibold transition-all ${
                      vatExempt ? "bg-cream-50 text-teal-800 shadow-sm" : "text-slate-600"
                    }`}
                  >
                    Ex. VAT
                  </button>
                  <button
                    onClick={() => setVatExempt(false)}
                    className={`rounded-full px-3 py-1 text-sm font-semibold transition-all ${
                      !vatExempt ? "bg-cream-50 text-teal-800 shadow-sm" : "text-slate-600"
                    }`}
                  >
                    Inc. VAT
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-4xl font-bold leading-none text-slate-900">{formatGBP(displayPrice)}</div>
                {vatExempt ? (
                  <div className="mt-2 flex items-center gap-1 text-base font-semibold text-teal-800">
                    <Check size={16} strokeWidth={3} />
                    VAT Relief Applied - Save {formatGBP(priceIncVat(product) - product.priceExVat)}
                  </div>
                ) : (
                  <div className="mt-2 text-base text-slate-600">Includes 20% VAT</div>
                )}
                {product.wasPriceIncVat && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-base text-slate-600 line-through">
                      {formatGBP(product.wasPriceIncVat)}
                    </span>
                    {(() => {
                      const save = vatExempt
                        ? product.wasPriceIncVat - product.priceExVat
                        : product.wasPriceIncVat - priceIncVat(product);
                      return save > 0 ? (
                        <span className="rounded bg-teal-50 px-2 py-0.5 text-sm font-semibold text-teal-800">
                          Save {formatGBP(save)}
                        </span>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              <div className="mb-5 flex items-center gap-2 text-base text-slate-600">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-teal-800" />
                {product.stockNote ?? "In Stock - Ready for Installation"}
              </div>

              <div className="mb-5 border-t border-slate-200 pt-5">
                {product.doorStyleLabel && (
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-base font-semibold text-slate-700">Door Style:</span>
                    <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                      {product.doorStyleLabel}
                    </span>
                  </div>
                )}
                <span className="mb-3 block text-base font-semibold text-slate-700">
                  Door Position (Handing):
                </span>
                <div className="flex gap-3">
                  {product.doorHandingAvailable.map((h) => (
                    <button
                      key={h}
                      onClick={() => setSelectedHanding(h)}
                      className={`min-h-[48px] flex-1 rounded-lg border-2 py-3 text-base font-semibold transition-all ${
                        selectedHanding === h
                          ? "border-teal-700 bg-teal-50 text-teal-800"
                          : "border-slate-200 bg-cream-50 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {handingLabel(h)}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Not sure? We verify this during your free home survey.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={`/free-brochure?product=${product.slug}`}
                  className="min-h-[48px] w-full rounded-xl bg-teal-800 py-4 text-center text-lg font-bold text-white shadow-sm transition-colors hover:bg-teal-900"
                >
                  Request Free Brochure
                </Link>
                <button className="min-h-[48px] w-full rounded-xl border-2 border-slate-900 bg-cream-50 py-3.5 text-lg font-bold text-slate-900 transition-colors hover:bg-slate-50">
                  Book Free Survey
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1 text-center text-sm text-slate-600">
                <Lock size={14} />
                No Hard Sell Guarantee. Just honest advice.
              </div>
            </div>
          </div>
        </div>
      </section>

      {product.highlights && product.highlights.length > 0 && (
        <section className="border-t border-slate-200 bg-cream-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-10 text-center font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Why the {product.title} is the Best Choice
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {product.highlights.map((item, i) => {
                const Icon = HIGHLIGHTS_ICON_MAP[item.iconKey] ?? HIGHLIGHTS_ICONS[i % HIGHLIGHTS_ICONS.length];
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-800">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-serif text-xl font-bold leading-tight text-slate-900">{item.title}</h3>
                      <p className="leading-relaxed text-slate-600">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {showComparison && baseModel?.packageFeatureMatrix && (
        <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-10 text-center font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Choose Your Specification
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-[560px] w-full border-collapse">
                <thead>
                  <tr>
                    <th className="sticky left-0 border-b border-r border-slate-200 bg-slate-100 p-4 text-left font-bold text-slate-900">
                      Feature
                    </th>
                    {siblings.map((p) => (
                      <th
                        key={p.id}
                        className={`border-b border-slate-200 p-4 text-center font-bold text-slate-900 ${
                          p.id === product.id ? "border-t-4 border-t-teal-700 bg-teal-50" : "bg-slate-100"
                        }`}
                      >
                        {p.id === product.id
                          ? `${p.packageLevel.charAt(0).toUpperCase() + p.packageLevel.slice(1)} (This Model)`
                          : p.packageLevel.charAt(0).toUpperCase() + p.packageLevel.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {baseModel.packageFeatureMatrix.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-slate-100">
                      <td className="sticky left-0 border-r border-slate-100 bg-cream-50 p-4 text-left font-medium text-slate-700">
                        {row}
                      </td>
                      {siblings.map((p) => (
                        <td
                          key={p.id}
                          className={`p-4 text-center ${p.id === product.id ? "bg-teal-50" : "bg-cream-50"}`}
                        >
                          {matrixValue(baseModel.packageFeatureMatrix!, p.packageLevel, ri) ? (
                            <Check size={18} className="mx-auto text-teal-800" strokeWidth={3} />
                          ) : (
                            <span className="text-lg text-slate-300">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="sticky left-0 border-r border-slate-100 bg-cream-50 p-4 text-left font-semibold text-slate-700">
                      Price (Ex VAT)
                    </td>
                    {siblings.map((p) => (
                      <td
                        key={p.id}
                        className={`p-4 text-center font-bold ${
                          p.id === product.id ? "bg-teal-50 text-teal-800" : "bg-cream-50 text-slate-900"
                        }`}
                      >
                        {formatGBP(p.priceExVat)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {techSpecRows.length > 0 && (
        <section className="border-t border-slate-200 bg-cream-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-10 text-center font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Technical Specifications
            </h2>
            <div className="mx-auto max-w-2xl">
              {techSpecRows.map((spec, i) => (
                <div key={i} className="flex justify-between border-b border-slate-200 py-4">
                  <span className="font-semibold text-slate-900">{spec.label}</span>
                  <span className="text-slate-600">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.testimonials && product.testimonials.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-10 text-center font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.testimonials.map((review, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-cream-50 p-6">
                  <div className="mb-3 text-xl text-amber-400">★★★★★</div>
                  <p className="mb-4 italic leading-relaxed text-slate-600">&ldquo;{review.quote}&rdquo;</p>
                  <span className="text-base font-semibold text-slate-900">- {review.authorName}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <TrustBar />
      <FAQSection />
      <Footer />

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-4 border-t-2 border-teal-700 bg-cream-50 px-4 py-3 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] lg:hidden">
        <div className="shrink-0 text-2xl font-bold text-slate-900">{formatGBP(displayPrice)}</div>
        <Link
          href={`/free-brochure?product=${product.slug}`}
          className="min-h-[48px] flex-1 rounded-xl bg-teal-800 py-3 text-center text-lg font-bold text-white transition-colors hover:bg-teal-900"
        >
          Request Free Brochure
        </Link>
      </div>
    </main>
  );
}
