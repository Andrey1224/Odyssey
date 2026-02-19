import React from "react";
import Link from "next/link";

export const BrochureBridge = () => (
    <div className="mt-5 flex flex-col items-center justify-between gap-5 rounded-xl border-2 border-dashed border-teal-700 bg-cream-50 p-4 text-center md:flex-row md:p-[30px] md:text-left">

        <div className="max-w-[600px]">
            <h3 className="mb-2 font-serif text-[1.5rem] font-bold text-slate-900">
                Prefer a physical brochure?
            </h3>
            <p className="text-slate-600">
                We know sometimes it is easier to read things on paper. Request our full 2024 catalogue delivered to your door for free.
            </p>
        </div>

        <Link href="/free-brochure" className="whitespace-nowrap rounded-lg bg-slate-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-slate-800">
            Send Me a Brochure by Post
        </Link>
    </div>
);
