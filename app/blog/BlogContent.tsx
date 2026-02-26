import Image from "next/image";
import Link from "next/link";
import { Phone, Clock, Tag, ArrowRight, Info, ChevronDown, BookOpen } from "lucide-react";

import { PHONE, PHONE_TEL } from "@/lib/site";
import type { CategoryDTO, PostCardDTO } from "@/sanity/lib/types";
import { formatPublishedDate } from "@/sanity/lib/types";

const CATEGORY_GRADIENT: Record<string, string> = {
  "VAT & Funding": "from-emerald-800 to-teal-900",
  "Buying Guides": "from-teal-800 to-slate-800",
  "Health & Mobility": "from-blue-800 to-slate-800",
  Installation: "from-slate-600 to-slate-900",
};

type BlogContentProps = {
  categories: CategoryDTO[];
  posts: PostCardDTO[];
  total: number;
  selectedCategorySlug?: string;
  searchQuery?: string;
  page: number;
};

type QueryArgs = {
  category?: string;
  q?: string;
  page?: number;
};

function blogHref({ category, q, page }: QueryArgs): string {
  const params = new URLSearchParams();

  if (category) params.set("category", category);
  if (q) params.set("q", q);
  if (page && page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

function PostCard({ post }: { post: PostCardDTO }) {
  const gradient = CATEGORY_GRADIENT[post.categoryTitle] ?? "from-teal-800 to-slate-800";

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md border-2 border-slate-200 hover:border-teal-700 transition-all duration-200 flex flex-col overflow-hidden group focus-within:ring-4 focus-within:ring-teal-700/50 relative">
      <div className="h-56 relative overflow-hidden shrink-0">
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <BookOpen size={96} className="text-white" />
            </div>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-slate-800 text-[14px] font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm border border-slate-200">
          <Tag size={14} className="text-teal-700" /> {post.categoryTitle}
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-slate-500 text-[15px] font-medium mb-4">
          <span className="flex items-center gap-1.5">
            <Clock size={16} /> {post.readTime ?? "5 min read"}
          </span>
          <span aria-hidden="true">&bull;</span>
          <span>{formatPublishedDate(post.publishedAt)}</span>
        </div>

        <h2 className="font-serif text-[22px] md:text-[24px] font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-800 transition-colors">
          {post.title}
        </h2>

        <p className="text-[14px] font-medium text-slate-500 mb-4">By Odyssey UK Team</p>

        <p className="text-[18px] text-slate-600 leading-relaxed mb-8 flex-grow">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="relative z-10 inline-flex items-center justify-between w-full bg-cream-50 border border-slate-200 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-800 text-slate-800 text-[18px] font-bold min-h-[56px] px-6 rounded-xl transition-colors focus:outline-none focus-visible:outline-none after:absolute after:inset-0 after:-z-10"
          aria-label={`Read article: ${post.title}`}
        >
          Read article <ArrowRight size={20} strokeWidth={2.5} className="text-teal-700" />
        </Link>
      </div>
    </article>
  );
}

export function BlogContent({
  categories,
  posts,
  total,
  selectedCategorySlug,
  searchQuery,
  page,
}: BlogContentProps) {
  const categoryItems = [
    {
      title: "All Articles",
      slug: "",
      postCount: categories.reduce((sum, category) => sum + category.postCount, 0),
    },
    ...categories,
  ];

  const hasMore = posts.length < total;
  const currentPage = page > 0 ? page : 1;
  const activeSlug = selectedCategorySlug ?? "";
  const hasActiveFilters = Boolean(activeSlug || searchQuery);
  const selectedCategory = categoryItems.find((category) => category.slug === activeSlug);
  const headingSuffix = selectedCategory?.title && selectedCategory.slug ? selectedCategory.title : undefined;

  return (
    <div className="font-sans text-slate-900 pb-24">
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
          {searchQuery && (
            <p className="mt-6 text-[16px] text-slate-500 font-medium">
              Search results for <span className="text-slate-900">&ldquo;{searchQuery}&rdquo;</span>
              {headingSuffix ? ` in ${headingSuffix}` : ""}
            </p>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          {categoryItems.map((category) => {
            const isActive = activeSlug === category.slug;
            return (
              <Link
                key={category.slug || "all"}
                href={blogHref({ category: category.slug || undefined, q: searchQuery, page: 1 })}
                className={`
                  text-[16px] md:text-[18px] font-bold py-3 px-6 rounded-full transition-colors min-h-[48px] border-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50
                  ${isActive
                    ? "bg-teal-800 text-white border-teal-800 shadow-md hover:bg-teal-900 hover:border-teal-900"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }
                `}
              >
                {category.title}
                <span
                  className={`ml-2 text-[13px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {category.postCount}
                </span>
              </Link>
            );
          })}
        </div>

        {posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <div className="text-center mt-16">
            {hasMore ? (
              <Link
                href={blogHref({
                  category: selectedCategorySlug,
                  q: searchQuery,
                  page: currentPage + 1,
                })}
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-[18px] min-h-[56px] px-10 rounded-xl transition-colors shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/50"
              >
                Load more articles
                <ChevronDown size={20} strokeWidth={2.5} />
              </Link>
            ) : (
              <p className="text-[16px] text-slate-400 font-medium">
                ✓ All {total} article{total !== 1 ? "s" : ""} displayed
              </p>
            )}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[20px] text-slate-600 mb-2">
              {hasActiveFilters ? "No matching articles." : "No articles yet."}
            </p>
            <p className="text-[16px] text-slate-500 mb-6">
              {hasActiveFilters
                ? "Try a different category or search term."
                : "New guides will appear here once they are published."}
            </p>
            {hasActiveFilters && (
              <Link
                href={blogHref({ category: undefined, q: undefined, page: 1 })}
                className="text-teal-700 font-bold text-[18px] hover:underline underline-offset-4 focus:outline-none rounded"
              >
                Clear filters
              </Link>
            )}
          </div>
        )}
      </section>

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
              href={`tel:+${PHONE_TEL}`}
              className="flex items-center justify-center gap-3 bg-white text-slate-900 text-[20px] font-extrabold min-h-[64px] px-8 rounded-xl hover:bg-slate-100 transition-colors w-full sm:w-auto focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              <Phone size={24} className="text-teal-700" />
              {PHONE}
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center bg-teal-800 hover:bg-teal-900 text-white text-[20px] font-bold min-h-[64px] px-8 rounded-xl transition-colors border border-teal-700 w-full sm:w-auto focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50"
            >
              Send a message
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
