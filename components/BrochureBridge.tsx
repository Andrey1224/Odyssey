import React from "react";
import Link from "next/link";

export const BrochureBridge = () => (
    <div className="bg-white border-2 border-dashed border-[#117a7a] rounded-xl p-4 md:p-[30px] flex flex-col md:flex-row items-center justify-between mt-5 gap-5 text-center md:text-left">

        <div className="max-w-[600px]">
            <h3 className="text-[1.5rem] mb-2 text-[#0f172a] font-bold font-serif">
                Prefer a physical brochure?
            </h3>
            <p className="text-[#475569]">
                We know sometimes it is easier to read things on paper. Request our full 2024 catalogue delivered to your door for free.
            </p>
        </div>

        <Link href="/free-brochure" className="bg-[#0f172a] text-white px-8 py-4 rounded-lg font-semibold whitespace-nowrap hover:bg-[#1e293b] transition-colors">
            Send Me a Brochure by Post
        </Link>
    </div>
);
