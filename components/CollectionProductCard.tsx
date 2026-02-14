"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface ProductProps {
    id: string;
    title: string;
    priceExVat: number;
    vatExempt: boolean;
    image: string;
    description?: string;
    features?: string[];
    dimensions: string;
    stepLevel?: string;
    system?: string;
    handing?: string;
}

export const CollectionProductCard = ({
    title,
    priceExVat,
    vatExempt,
    image,
    dimensions,
    stepLevel = "Low",
    system = "Standard",
    handing = "L or R"
}: ProductProps) => {

    // HTML Logic:
    // if exempt: price = base, text = VAT Relief Applied (Save X)
    // if std: price = base * 1.2, text = Standard Price (inc 20% VAT)

    const displayPrice = vatExempt ? priceExVat : Math.round(priceExVat * 1.2);
    const saving = Math.round((priceExVat * 1.2) - priceExVat);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <article className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden transition-all duration-300 flex flex-col relative hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] hover:border-[#cbd5e1] group">

            {/* .card-img-wrapper */}
            <div className="h-[220px] bg-[#f8fafc] flex items-center justify-center p-2.5 relative">
                <div className="relative w-full h-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
                {/* .real-photo-badge */}
                <span className="absolute bottom-2.5 right-2.5 bg-[rgba(0,0,0,0.6)] text-white px-2 py-1 text-[0.7rem] rounded">
                    Installed in Manchester
                </span>
            </div>

            {/* .card-body */}
            <div className="p-5 flex-grow flex flex-col">

                {/* .product-name */}
                <h3 className="text-[1.35rem] font-bold mb-3 text-[#0f172a] no-underline">
                    {title}
                </h3>

                {/* .key-specs */}
                <div className="flex justify-between bg-[#f8fafc] p-2.5 rounded-lg mb-4">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[0.7rem] text-[#94a3b8] uppercase tracking-wide">Size</span>
                        <span className="text-[0.9rem] font-semibold text-[#0f172a] mt-0.5">{dimensions}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[0.7rem] text-[#94a3b8] uppercase tracking-wide">Step</span>
                        <span className="text-[0.9rem] font-semibold text-[#0f172a] mt-0.5">{stepLevel}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[0.7rem] text-[#94a3b8] uppercase tracking-wide">Door</span>
                        <span className="text-[0.9rem] font-semibold text-[#0f172a] mt-0.5">{handing === "Left Hand" ? "L" : handing === "Right Hand" ? "R" : "L or R"}</span>
                    </div>
                </div>

                {/* .price-block - Dual Pricing */}
                <div className="mt-auto mb-4 min-h-[60px]">
                    <div className="flex flex-col items-start leading-none">
                        <div className="text-[1.6rem] font-bold text-[#0f172a]">
                            {vatExempt ? formatPrice(priceExVat) : formatPrice(Math.round(priceExVat * 1.2))}
                        </div>
                        <div className="text-[0.8rem] text-[#64748b] font-medium mt-1">
                            {vatExempt ? (
                                <span>{formatPrice(Math.round(priceExVat * 1.2))} inc. VAT</span>
                            ) : (
                                <span>{formatPrice(priceExVat)} ex. VAT</span>
                            )}
                        </div>
                    </div>

                    {vatExempt ? (
                        <div className="text-[0.85rem] font-semibold flex items-center gap-1 text-[#16a34a] mt-2">
                            <Check size={12} strokeWidth={3} /> Save {formatPrice(Math.round((priceExVat * 1.2) - priceExVat))} (VAT Relief)
                        </div>
                    ) : (
                        <div className="text-[0.85rem] font-semibold flex items-center gap-1 text-[#64748b] mt-2">
                            Standard Price
                        </div>
                    )}
                </div>

                {/* .card-actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="bg-[#117a7a] hover:bg-[#0d6161] text-white border-0 py-3.5 rounded-md font-semibold cursor-pointer text-center transition-colors">
                        View Details
                    </button>
                    <button className="bg-white hover:border-[#0f172a] text-[#0f172a] border-[2px] border-[#e2e8f0] py-3.5 rounded-md font-semibold cursor-pointer text-center transition-colors">
                        Brochure
                    </button>
                </div>

            </div>
        </article>
    );
};
