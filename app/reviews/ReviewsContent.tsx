"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star, CheckCircle, Phone,
  ChevronDown, ChevronUp, MapPin,
  ShieldCheck, ExternalLink, Info, Quote,
} from "lucide-react";
import { PHONE, PHONE_TEL } from "@/lib/site";

// ==========================================
// 1. DATA (Mock Data)
// ==========================================

const reviewTags = ["All", "Safety", "Easy Access", "Installation", "Aftercare", "Pain Relief"];

const odysseyStories = [
  {
    id: 1,
    name: "Margaret T.",
    location: "Yorkshire",
    date: "15 March 2026",
    product: "Serenity 66 Plus",
    productHref: "/walk-in-baths",
    tags: ["Safety", "Pain Relief"],
    title: "I have my independence back",
    text: "Before getting my new walk-in bath, I was terrified of slipping. I hadn't had a proper soak in over two years, relying only on strip washes. The team at Odyssey were incredibly patient, didn't push me into buying, and the installation took exactly one day with zero mess. The heated seat and low threshold have completely changed my life. I can finally bathe with dignity and without fear.",
    hasImage: true,
  },
  {
    id: 2,
    name: "David & Susan H.",
    location: "Surrey",
    date: "28 February 2026",
    product: "Walk-In Shower Bath",
    productHref: "/walk-in-shower-baths",
    tags: ["Easy Access", "Installation"],
    title: "Perfect for both of us",
    text: "Susan needs the easy access door, while I just prefer a normal shower. This bath gave us the best of both worlds without having to rip out our entire bathroom. The fitters arrived on Tuesday morning and by Wednesday lunchtime we were fully up and running. Very professional service from start to finish.",
    hasImage: false,
  },
  {
    id: 3,
    name: "John W.",
    location: "Devon",
    date: "10 January 2026",
    product: "Deep Soaker Bath",
    productHref: "/deep-soaker-baths",
    tags: ["Aftercare"],
    title: "Brilliant customer service",
    text: "The bath is excellent and the upright seat means I can get out easily even with my bad knees. But what really stood out was the aftercare. I couldn't figure out how the microbubble jets worked a week after installation, called the office, and they spent 20 minutes patiently walking me through it on the phone.",
    hasImage: false,
  },
];

const trustpilotReviews = [
  {
    id: 1,
    name: "A. Wilkinson",
    date: "9 February 2026",
    title: "Pleased with the bath and support",
    text: "Pleased with the bath and support, thanks for the helpful advice.",
    verified: true,
  },
  {
    id: 2,
    name: "Nicole Ohnstad",
    date: "9 February 2026",
    title: "I sent them a photo of my bathroom",
    text: "I sent them a photo of my bathroom so they could see how the usable space was situated, Odyssey suggested which baths would be most suitable and the correct handings, recommend getting in touch and talking through your build.",
    verified: true,
  },
  {
    id: 3,
    name: "Jacob Stewart",
    date: "10 April 2025",
    title: "Excellent — Thank you very much",
    text: "Provided helpful advice via email when requested. Delivered promptly. Excellent product.",
    verified: true,
  },
  {
    id: 4,
    name: "Courtney Stokes",
    date: "28 February 2025",
    title: "Great communications and fast delivery",
    text: "Superb choice of products at a competitive price. So helpful about updating our order as we worked out exactly what we needed. Great communications and product delivered as fast as possible. Thanks to all at Odyssey — you were wonderful to deal with.",
    verified: true,
  },
  {
    id: 5,
    name: "Roger Coleman",
    date: "19 February 2025",
    title: "Professional and reliable",
    text: "Professional and reliable. Would use again. Thanks.",
    verified: true,
  },
  {
    id: 6,
    name: "Lorraine Clarke",
    date: "28 February 2025",
    title: "Walk In bath problem",
    text: "Excellent service from this company. Paul was very helpful and went over and above to help me sort out a bath problem I had. He answered emails quickly too and he also rang me back when he missed my call. Great service thank you.",
    verified: true,
  },
  {
    id: 7,
    name: "OldChina Hand",
    date: "12 April 2023",
    title: "Needed to upgrade a relative's home",
    text: "Needed to upgrade a relative's home so looked for a Bath supplier. Odyssey were very easy to use, the team were very knowledgeable and helpful and their speed of delivery was a big factor in deciding to use them.",
    verified: true,
  },
];

// ==========================================
// 2. HELPER COMPONENTS
// ==========================================

const TrustpilotStars = () => (
  <div className="flex gap-1" style={{ color: "#00B67A" }}>
    <Star size={24} fill="currentColor" />
    <Star size={24} fill="currentColor" />
    <Star size={24} fill="currentColor" />
    <Star size={24} fill="currentColor" />
    <Star size={24} fill="currentColor" />
  </div>
);

const ExpandableReview = ({ text, maxLength = 130 }: { text: string; maxLength?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text.length > maxLength;

  if (!isLong) {
    return <p className="text-[20px] text-slate-700 leading-relaxed mb-3">{text}</p>;
  }

  const displayText = isExpanded ? text : `${text.substring(0, maxLength)}...`;

  return (
    <div>
      <p className="text-[20px] text-slate-700 leading-relaxed mb-3">{displayText}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-teal-700 font-bold text-[20px] hover:text-teal-800 hover:bg-teal-50 px-3 py-2 -ml-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
          <>Show less <ChevronUp size={20} strokeWidth={2.5} /></>
        ) : (
          <>Read full story <ChevronDown size={20} strokeWidth={2.5} /></>
        )}
      </button>
    </div>
  );
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================

export default function ReviewsContent() {
  const [activeTag, setActiveTag] = useState("All");

  const filteredStories =
    activeTag === "All"
      ? odysseyStories
      : odysseyStories.filter((story) => story.tags.includes(activeTag));

  return (
    <div className="font-sans text-slate-900 pb-24">

      {/* --- 1. HERO --- */}
      <section className="bg-white pt-16 pb-20 px-6 md:px-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Don&apos;t just take our word for it.
          </h1>
          <p className="text-[20px] md:text-[22px] text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            See why hundreds of families across the UK trust Odyssey to bring safety, comfort, and independence back into their bathrooms.
          </p>

          {/* Trust badge */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:px-8 shadow-sm">
            <TrustpilotStars />
            <div className="h-10 w-px bg-slate-300 hidden sm:block" />
            <div className="text-[20px] md:text-[22px] text-slate-700 text-left">
              <span className="font-bold text-slate-900">4.9/5</span> rating on Trustpilot{" "}
              <span className="font-medium text-slate-500">(1,284 reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. ODYSSEY STORIES --- */}
      <section className="py-16 md:py-24 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Customer Stories
          </h2>
          <p className="text-[18px] md:text-[20px] text-slate-600 max-w-2xl mx-auto">
            Discover how a new walk-in bath has helped people just like you bathe safely again.
          </p>
        </div>

        {/* Tag filter bar */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          <span className="text-[20px] text-slate-500 font-medium mr-2 hidden lg:block">Filter by topic:</span>
          {reviewTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`
                text-[18px] md:text-[20px] font-bold py-3 px-6 rounded-full transition-colors min-h-[48px] border focus:outline-none focus:ring-2 focus:ring-teal-500
                ${activeTag === tag
                  ? "bg-teal-800 text-white border-teal-800 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }
              `}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stories grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md border border-slate-200 flex flex-col transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 text-slate-50" size={80} />

              <div className="relative z-10 mb-6">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 leading-tight">
                  &ldquo;{story.title}&rdquo;
                </h3>
              </div>

              <div className="flex-grow relative z-10 mb-6">
                <ExpandableReview text={story.text} maxLength={140} />
              </div>

              {/* Card footer */}
              <div className="mt-auto pt-6 border-t border-slate-100 relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-xl">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[18px] font-bold text-slate-900 leading-none">{story.name}</p>
                      <span className="flex items-center gap-1 text-[14px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle size={14} /> Verified
                      </span>
                    </div>
                    <p className="text-[16px] text-slate-500 flex items-center gap-1 font-medium">
                      <MapPin size={16} /> {story.location}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 text-[16px] text-slate-600 flex justify-between items-center border border-slate-100">
                  <span className="font-medium text-slate-500 text-[15px]">Product mentioned:</span>
                  <Link href={story.productHref} className="font-bold text-teal-700 hover:text-teal-800 transition-colors">
                    {story.product}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. TRUSTPILOT INDEPENDENT REVIEWS --- */}
      <section className="bg-white border-y border-slate-200 py-16 md:py-24 px-6 md:px-8 mt-4">
        <div className="max-w-7xl mx-auto">

          {/* Transparency bridge */}
          <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200">
            <p className="text-[20px] text-slate-700 leading-relaxed max-w-3xl">
              <strong className="text-slate-900 font-bold">Transparency matters.</strong> While we carefully select the detailed stories above to highlight specific features, below you can read every single review exactly as published on Trustpilot.
            </p>
            <ShieldCheck size={48} className="text-slate-300 hidden md:block flex-shrink-0" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                Independent Reviews
              </h2>
            </div>
            <a
              href="https://www.trustpilot.com/review/odysseybaths.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-[20px] font-bold min-h-[56px] px-8 rounded-xl transition-colors w-full md:w-auto shadow-sm"
            >
              View all on Trustpilot <ExternalLink size={20} strokeWidth={2.5} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trustpilotReviews.map((review) => (
              <div key={review.id} className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-300 shadow-sm flex flex-col h-full">
                <div className="flex flex-col gap-3 mb-5">
                  <TrustpilotStars />
                  <span className="text-slate-500 text-[16px] font-medium">{review.date}</span>
                </div>
                <h4 className="text-[20px] font-bold text-slate-900 mb-3">{review.title}</h4>
                <div className="mb-6 flex-grow">
                  <ExpandableReview text={review.text} maxLength={100} />
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-slate-200 mt-auto">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 font-bold border border-slate-200 shadow-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-slate-900 leading-none mb-1">{review.name}</p>
                    {review.verified && (
                      <p className="text-[15px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle size={16} style={{ color: "#00B67A" }} strokeWidth={2.5} /> Verified
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 4. TRANSPARENCY BLOCK --- */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm">
          <div className="flex-shrink-0 bg-teal-50 p-5 rounded-2xl">
            <ShieldCheck size={64} className="text-teal-700" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 text-center md:text-left">
              Our Commitment to Honesty
            </h3>
            <ul className="text-[20px] text-slate-700 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-teal-600 mt-1 flex-shrink-0" size={24} />
                <span className="leading-relaxed">
                  <strong className="text-slate-900">No Editing:</strong> We never alter reviews or hide negative feedback. Every single voice matters.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-teal-600 mt-1 flex-shrink-0" size={24} />
                <span className="leading-relaxed">
                  <strong className="text-slate-900">Verified Buyers:</strong> Invitations to leave a review are sent automatically only after your bath is fully installed.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-teal-600 mt-1 flex-shrink-0" size={24} />
                <span className="leading-relaxed">
                  <strong className="text-slate-900">We Listen:</strong> If there&apos;s an issue, our UK team uses these reviews to reach out and fix it immediately.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- 5. FINAL CTA --- */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Star size={200} fill="currentColor" />
          </div>

          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
              Ready to feel safe <br className="hidden md:block" /> in your bathroom again?
            </h2>
            <p className="text-[20px] text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Call our friendly team today. We provide clear prices and honest advice, without the high-pressure sales pitch.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:+${PHONE_TEL}`}
                className="flex items-center justify-center gap-3 bg-white text-slate-900 text-[20px] font-extrabold min-h-[60px] px-8 rounded-xl hover:bg-slate-100 transition-colors w-full sm:w-auto"
              >
                <Phone size={24} className="text-teal-700" strokeWidth={2.5} />
                {PHONE}
              </a>
              <Link
                href="/free-quote"
                className="bg-teal-800 hover:bg-teal-700 text-white text-[20px] font-bold min-h-[60px] px-8 rounded-xl transition-colors border border-teal-700 w-full sm:w-auto flex items-center justify-center"
              >
                Get a Free Quote
              </Link>
            </div>
            <p className="text-[16px] text-slate-400 mt-6 flex items-center justify-center gap-2 font-medium">
              <Info size={18} /> Mon-Fri 9am to 5pm
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
