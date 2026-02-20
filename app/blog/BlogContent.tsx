"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Clock, Tag, ChevronDown, ArrowRight, Info } from "lucide-react";

import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blogPosts";

export function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All Articles");

  const filteredPosts =
    activeCategory === "All Articles"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <div className="font-sans text-slate-900 pb-24">

      {/* --- 1. HERO --- */}
      <section className="bg-white pt-16 pb-20 px-6 md:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-teal-700 font-bold tracking-widest uppercase text-sm mb-4 block">
            Knowledge Base
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Expert Advice &amp; Guides
          </h1>
          <p className="text-[20px] md:text-[22px] text-slate-600 leading-relaxed font-medium">
            Helpful articles on safe bathing, VAT relief, and bathroom adaptations. Written by our UK experts to help you make the right choice.
          </p>
        </div>
      </section>

      {/* --- 2. CATEGORY FILTERS + ARTICLE GRID --- */}
      <section className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto">

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          {BLOG_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                text-[16px] md:text-[18px] font-bold py-3 px-6 rounded-full transition-colors min-h-[48px] border-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50
                ${activeCategory === category
                  ? "bg-teal-800 text-white border-teal-800 shadow-md hover:bg-teal-900 hover:border-teal-900"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Article grid */}
        {filteredPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md border-2 border-slate-200 hover:border-teal-700 transition-colors flex flex-col overflow-hidden group focus-within:ring-4 focus-within:ring-teal-700/50"
              >
                {/* Image placeholder area */}
                <Link
                  href={`/blog/${post.id}`}
                  className="block h-56 bg-slate-100 relative overflow-hidden focus:outline-none"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold text-xl border-b border-slate-200">
                    [Image: {post.imagePlaceholder}]
                  </div>
                  {/* Category badge over image */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-slate-800 text-[14px] font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm border border-slate-200">
                    <Tag size={14} className="text-teal-700" /> {post.category}
                  </div>
                </Link>

                {/* Text content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-slate-500 text-[15px] font-medium mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock size={16} /> {post.readTime}
                    </span>
                    <span aria-hidden="true">&bull;</span>
                    <span>{post.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-[22px] md:text-[24px] font-bold text-slate-900 mb-4 leading-snug group-hover:text-teal-800 transition-colors">
                    <Link href={`/blog/${post.id}`} className="focus:outline-none focus-visible:outline-none">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[18px] text-slate-600 leading-relaxed mb-8 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Read article link */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center justify-between w-full bg-cream-50 border border-slate-200 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-800 text-slate-800 text-[18px] font-bold min-h-[56px] px-6 rounded-xl transition-colors focus:outline-none focus-visible:outline-none"
                    aria-label={`Read article: ${post.title}`}
                  >
                    Read article <ArrowRight size={20} strokeWidth={2.5} className="text-teal-700" />
                  </Link>

                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load more (static — no real pagination) */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-16">
            <button className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-[18px] min-h-[56px] px-10 rounded-xl transition-colors shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/50">
              Load more articles
              <ChevronDown size={20} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[20px] text-slate-600">No articles found in this category.</p>
            <button
              onClick={() => setActiveCategory("All Articles")}
              className="mt-4 text-teal-700 font-bold text-[18px] hover:underline underline-offset-4 focus:outline-none rounded"
            >
              View all articles
            </button>
          </div>
        )}

      </section>

      {/* --- 3. FINAL CTA --- */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center text-white shadow-xl">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Didn&apos;t find what you were looking for?
          </h2>
          <p className="text-[20px] text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our UK-based specialists are ready to answer any questions you have about our baths, VAT relief, or installation process.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:08001234567"
              className="flex items-center justify-center gap-3 bg-white text-slate-900 text-[20px] font-extrabold min-h-[64px] px-8 rounded-xl hover:bg-slate-100 transition-colors w-full sm:w-auto focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              <Phone size={24} className="text-teal-700" />
              0800 123 4567
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center bg-teal-800 hover:bg-teal-900 text-white text-[20px] font-bold min-h-[64px] px-8 rounded-xl transition-colors border border-teal-700 w-full sm:w-auto focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50"
            >
              Contact Us Online
            </Link>
          </div>
          <p className="text-[16px] text-slate-400 mt-6 flex items-center justify-center gap-2 font-medium">
            <Info size={18} /> Friendly advice. No pressure, ever.
          </p>
        </div>
      </section>

    </div>
  );
}
