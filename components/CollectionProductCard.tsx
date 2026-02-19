"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Check, Star,
    Ruler, DoorOpen, Shield, Droplets,
    Wind, Zap, Droplet, Waves,
    Thermometer, Sparkles, Lightbulb, Leaf,
    ArrowLeftRight, Users, Layers,
    type LucideIcon,
} from "lucide-react";
import type { FeaturePill } from "@/data/walkInBaths";

const PILL_ICONS: Record<string, LucideIcon> = {
    ruler: Ruler,
    door: DoorOpen,
    shield: Shield,
    droplets: Droplets,
    wind: Wind,
    zap: Zap,
    showerHead: Droplet,
    waves: Waves,
    thermometer: Thermometer,
    sparkles: Sparkles,
    lightbulb: Lightbulb,
    leaf: Leaf,
    arrowLeftRight: ArrowLeftRight,
    doorOpen: DoorOpen,
    users: Users,
    layers: Layers,
};

interface ProductProps {
    id: string;
    title: string;
    subtitle?: string;
    badges?: string[];
    priceExVat: number;
    vatRate: number;
    wasPriceIncVat?: number;
    vatExempt: boolean;
    primaryImage: { src: string; alt: string };
    featurePills?: FeaturePill[];
    detailHrefBase: string;
    [key: string]: unknown;
}

export const CollectionProductCard = ({
    id,
    title,
    subtitle,
    badges = [],
    priceExVat,
    vatRate,
    wasPriceIncVat,
    vatExempt,
    primaryImage,
    featurePills = [],
    detailHrefBase,
}: ProductProps) => {

    const incVatPrice = Math.round(priceExVat * (1 + vatRate));

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price);

    const FALLBACK = "/images/Walk-inBath.png";
    const [imageSrc, setImageSrc] = useState(primaryImage.src || FALLBACK);

    React.useEffect(() => {
        setImageSrc(primaryImage.src || FALLBACK);
    }, [primaryImage.src]);

    const isBestSeller = badges.includes("Best Seller");
    const isPremium = badges.includes("Premium Spec");

    const displayPrice = vatExempt ? priceExVat : incVatPrice;
    const regularPrice = wasPriceIncVat ?? incVatPrice;

    return (
        <article className={`bg-cream-50 border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col relative hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 ${
            isBestSeller
                ? "border-teal-700 shadow-[0_4px_12px_rgba(17,122,122,0.15)]"
                : "border-slate-200 hover:border-slate-300"
        }`}>

            {/* Badges — absolute top-left */}
            <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1.5">
                {isBestSeller && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[0.7rem] font-bold uppercase leading-none tracking-wider text-amber-700">
                        <Star size={10} fill="currentColor" /> Best Seller
                    </span>
                )}
                {isPremium && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[0.7rem] font-bold uppercase leading-none tracking-wider text-white">
                        Premium Spec
                    </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-[0.7rem] font-bold uppercase leading-none tracking-wider text-teal-800">
                    VAT Relief Eligible
                </span>
            </div>

            {/* Image */}
            <div className="h-[240px] flex items-center justify-center bg-slate-100 p-4">
                <div className="relative w-full h-full">
                    <Image
                        src={imageSrc}
                        alt={primaryImage.alt || title}
                        fill
                        className="object-contain mix-blend-multiply"
                        onError={() => setImageSrc(FALLBACK)}
                    />
                </div>
            </div>

            {/* Body */}
            <div className="p-6 flex-grow flex flex-col">

                <h3 className="mb-1 text-[1.25rem] font-bold leading-tight text-slate-900">
                    {title}
                </h3>

                {subtitle && (
                    <p className="text-sm text-slate-600 mb-4 leading-snug min-h-[20px]">
                        {subtitle}
                    </p>
                )}

                {/* Feature Pills */}
                {featurePills.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-5">
                        {featurePills.map((pill) => {
                            const Icon = PILL_ICONS[pill.iconKey];
                            return (
                                <span
                                    key={pill.iconKey}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-[0.75rem] font-semibold leading-none text-slate-700"
                                >
                                    {Icon && <Icon size={14} strokeWidth={2.5} className="shrink-0 text-teal-800" />}
                                    <span className="truncate">{pill.label}</span>
                                </span>
                            );
                        })}
                    </div>
                )}

                {/* Price Area */}
                <div className="border-t border-slate-100 mt-auto pt-4 mb-4">
                    <div className="text-[1.6rem] font-bold leading-none text-slate-900">
                        {formatPrice(displayPrice)}
                    </div>

                    {vatExempt ? (
                        <div className="mt-1 flex items-center gap-1 text-[0.82rem] font-semibold text-teal-800">
                            <Check size={13} strokeWidth={3} /> Ex. VAT Price
                        </div>
                    ) : (
                        <div className="text-[0.82rem] font-medium text-slate-600 mt-1">
                            Standard Price
                        </div>
                    )}

                    <div className="text-sm text-slate-600 mt-0.5">
                        {vatExempt
                            ? `Regular Price: ${formatPrice(regularPrice)}`
                            : `${formatPrice(priceExVat)} ex. VAT`
                        }
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <Link
                        href={`${detailHrefBase}/${id}`}
                        className="rounded-lg border-0 bg-teal-800 py-3.5 text-center text-[0.9rem] font-bold text-white transition-colors hover:bg-teal-900"
                    >
                        View Details
                    </Link>
                    <Link
                        href={`/free-brochure?product=${id}`}
                        className="bg-cream-50 hover:border-slate-900 text-slate-900 border border-slate-200 py-3.5 rounded-lg font-bold text-center transition-colors text-[0.9rem]"
                    >
                        Brochure
                    </Link>
                </div>

            </div>
        </article>
    );
};
