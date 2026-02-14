"use client";

import * as React from "react";

type Handing = "left" | "right";

type Props = {
    value: Handing;
    onChange: (v: Handing) => void;
    className?: string;
};

export function HandingTool({ value, onChange, className }: Props) {
    const copy =
        value === "left"
            ? {
                title: "Left-hand bath (Door on LEFT)",
                text: "Door opens to your LEFT when seated (facing the taps).",
            }
            : {
                title: "Right-hand bath (Door on RIGHT)",
                text: "Door opens to your RIGHT when seated (facing the taps).",
            };

    return (
        <section
            className={["w-full max-w-[520px] mx-auto", className].filter(Boolean).join(" ")}
            aria-label="Bath handing selector"
        >
            <div className="flex flex-col gap-3">
                {/* Toggle buttons */}
                <div className="flex gap-2" role="group" aria-label="Choose handing">
                    <button
                        type="button"
                        onClick={() => onChange("left")}
                        aria-pressed={value === "left"}
                        aria-controls="handing-description"
                        className={[
                            "flex-1 rounded-xl border px-4 py-3 text-base font-bold transition-all duration-200",
                            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50",
                            value === "left"
                                ? "bg-slate-900 text-white border-slate-900 shadow-md transform scale-[1.02]"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50",
                        ].join(" ")}
                    >
                        Left
                    </button>

                    <button
                        type="button"
                        onClick={() => onChange("right")}
                        aria-pressed={value === "right"}
                        aria-controls="handing-description"
                        className={[
                            "flex-1 rounded-xl border px-4 py-3 text-base font-bold transition-all duration-200",
                            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50",
                            value === "right"
                                ? "bg-slate-900 text-white border-slate-900 shadow-md transform scale-[1.02]"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50",
                        ].join(" ")}
                    >
                        Right
                    </button>
                </div>

                {/* Dynamic text */}
                <div id="handing-description" className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-center sm:text-left">
                    <div className="text-base font-bold text-slate-900">{copy.title}</div>
                    <p className="mt-1 text-sm text-slate-700 font-medium">{copy.text}</p>
                    <p className="mt-2 text-xs text-slate-500 font-medium">
                        * Final orientation confirmed during free home survey.
                    </p>
                </div>

                {/* Diagram (top-down) */}
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <TopDownDiagram handing={value} />
                    <div className="mt-3 text-center text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        View from above • You are seated facing the taps
                    </div>
                </div>
            </div>
        </section>
    );
}

function TopDownDiagram({ handing }: { handing: Handing }) {
    const isLeft = handing === "left";

    // Coordinates are simple & readable; adjust later if needed.
    // Tub body
    const tubX = 40;
    const tubY = 20;
    const tubW = 320;
    const tubH = 180;

    // Door marker
    const doorW = 14;
    const doorH = 50;
    const doorX = isLeft ? tubX - doorW / 2 : tubX + tubW - doorW / 2;
    const doorY = tubY + 65;

    // Arrow direction
    const arrowStartX = isLeft ? tubX + 80 : tubX + tubW - 80;
    const arrowEndX = isLeft ? tubX + 30 : tubX + tubW - 30;

    return (
        <svg
            viewBox="0 0 400 220"
            className="w-full h-auto select-none"
            role="img"
            aria-label={isLeft ? "Left-handed bath diagram" : "Right-handed bath diagram"}
        >
            {/* Background/Floor */}
            <rect x="0" y="0" width="400" height="220" rx="16" fill="white" />

            {/* Tub Body */}
            <rect
                x={tubX}
                y={tubY}
                width={tubW}
                height={tubH}
                rx="28"
                fill="#F1F5F9"
                stroke="#E2E8F0"
                strokeWidth="2"
            />

            {/* Inner Tub (Water area indication) */}
            <rect
                x={tubX + 10}
                y={tubY + 10}
                width={tubW - 20}
                height={tubH - 20}
                rx="20"
                fill="white"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeOpacity="0.5"
            />

            {/* Taps (top) */}
            <g opacity="0.8">
                <rect
                    x={tubX + tubW / 2 - 20}
                    y={tubY + 5}
                    width="40"
                    height="12"
                    rx="4"
                    fill="#94A3B8"
                />
                <circle cx={tubX + tubW / 2 - 12} cy={tubY + 11} r="3" fill="#64748B" />
                <circle cx={tubX + tubW / 2 + 12} cy={tubY + 11} r="3" fill="#64748B" />
                <text
                    x={tubX + tubW / 2}
                    y={tubY + 32}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#64748B"
                    className="uppercase tracking-wide"
                >
                    taps
                </text>
            </g>

            {/* Seated position (The User) */}
            <g opacity="0.6">
                <circle cx={tubX + tubW / 2} cy={tubY + tubH - 50} r="18" fill="#CBD5E1" />
                <ellipse cx={tubX + tubW / 2} cy={tubY + tubH - 50} rx="22" ry="12" fill="#E2E8F0" />
                <text
                    x={tubX + tubW / 2}
                    y={tubY + tubH - 15}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#64748B"
                    className="uppercase tracking-wide"
                >
                    you (seated)
                </text>
            </g>

            {/* Door - The Active Element */}
            <g className="transition-all duration-500 ease-in-out">
                <rect
                    x={doorX}
                    y={doorY}
                    width={doorW}
                    height={doorH}
                    rx="4"
                    fill="#0F766E"
                    className="drop-shadow-sm"
                />
                <text
                    x={isLeft ? doorX + 20 : doorX - 20}
                    y={doorY + 30}
                    textAnchor={isLeft ? "start" : "end"}
                    fontSize="12"
                    fontWeight="bold"
                    fill="#0F766E"
                >
                    DOOR
                </text>
            </g>

            {/* Direction Arrow */}
            <g opacity="0.8" className={isLeft ? "translate-x-0" : ""}>
                <path
                    d={`M ${arrowStartX} ${tubY + 100} Q ${arrowStartX} ${tubY + 100} ${arrowEndX} ${tubY + 100}`}
                    fill="none"
                    stroke="#0F766E"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                />
                <polygon
                    points={
                        isLeft
                            ? `${arrowEndX},${tubY + 100} ${arrowEndX + 8},${tubY + 96} ${arrowEndX + 8},${tubY + 104}`
                            : `${arrowEndX},${tubY + 100} ${arrowEndX - 8},${tubY + 96} ${arrowEndX - 8},${tubY + 104}`
                    }
                    fill="#0F766E"
                />
            </g>
        </svg>
    );
}
