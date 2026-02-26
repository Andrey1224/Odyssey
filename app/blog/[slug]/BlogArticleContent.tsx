"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Clock,
  Tag,
  ChevronRight,
  ShieldCheck,
  Printer,
  Share2,
  Mail,
  CheckCircle,
  FileText,
  BookOpen,
  Info,
} from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { PHONE, PHONE_TEL, SITE_DOMAIN } from "@/lib/site";
import {
  buildPortableHeadingId,
  type BlogCtaBlockDTO,
  type PostCardDTO,
  type PostPageDTO,
  formatPublishedDate,
} from "@/sanity/lib/types";

const CATEGORY_GRADIENT: Record<string, string> = {
  "VAT & Funding": "from-emerald-800 to-teal-900",
  "Buying Guides": "from-teal-800 to-slate-800",
  "Health & Mobility": "from-blue-800 to-slate-800",
  Installation: "from-slate-600 to-slate-900",
};

type Props = {
  post: PostPageDTO;
  relatedPosts: PostCardDTO[];
  cta?: BlogCtaBlockDTO;
};

function reactNodeToString(node: unknown): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);

  if (Array.isArray(node)) {
    return node.map((child) => reactNodeToString(child)).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    const withProps = node as { props?: { children?: unknown } };
    return reactNodeToString(withProps.props?.children);
  }

  return "";
}

export function BlogArticleContent({ post, relatedPosts, cta }: Props) {
  const [copied, setCopied] = useState(false);
  const HEADER_OFFSET_PX = 112;
  const articleUrl = `${SITE_DOMAIN}/blog/${post.slug}`;

  const emailHref = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(
    `I thought you might find this article useful: ${articleUrl}`,
  )}`;

  function handleCopyLink() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }

  function handlePrint() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  function scrollToSection(id: string) {
    if (typeof window === "undefined") return;
    const target = document.getElementById(id);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  }

  const gradient = CATEGORY_GRADIENT[post.categoryTitle] ?? "from-teal-800 to-slate-800";

  const finalCtaTitle = cta?.title?.trim() || "Ready to take the next step?";
  const finalCtaText =
    cta?.text?.trim() ||
    "If you found this guide helpful and want to discuss your specific needs, our team is here to help. No hard sell, just friendly advice.";
  const primaryLabel = cta?.primaryButtonLabel?.trim() || PHONE;
  const primaryHref = cta?.primaryButtonHref?.trim() || `tel:+${PHONE_TEL}`;
  const secondaryLabel = cta?.secondaryButtonLabel?.trim() || "Request Free Brochure";
  const secondaryHref = cta?.secondaryButtonHref?.trim() || "/free-brochure";

  const portableComponents = useMemo<PortableTextComponents>(() => {
    function headingIdFromBlock(children: unknown, key?: string, index?: number): string {
      const title = reactNodeToString(children).trim();
      return buildPortableHeadingId(title, key, index);
    }

    return {
      block: {
        normal: ({ children }) => (
          <p className="text-[20px] leading-relaxed text-slate-800 mb-6">{children}</p>
        ),
        h2: ({ children, value, index }) => (
          <h2
            id={headingIdFromBlock(
              children,
              typeof value?._key === "string" ? value._key : undefined,
              typeof index === "number" ? index : undefined,
            )}
            className="font-serif text-3xl text-slate-900 mt-12 mb-6 scroll-mt-28"
          >
            {children}
          </h2>
        ),
        h3: ({ children, value, index }) => (
          <h3
            id={headingIdFromBlock(
              children,
              typeof value?._key === "string" ? value._key : undefined,
              typeof index === "number" ? index : undefined,
            )}
            className="font-serif text-2xl text-slate-900 mt-10 mb-4 scroll-mt-28"
          >
            {children}
          </h3>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-teal-700 bg-cream-50 p-6 rounded-r-2xl my-10 text-[20px] text-slate-700 italic">
            {children}
          </blockquote>
        ),
      },
      list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-6">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-6">{children}</ol>,
      },
      listItem: {
        bullet: ({ children }) => <li className="text-[20px] text-slate-800">{children}</li>,
        number: ({ children }) => <li className="text-[20px] text-slate-800">{children}</li>,
      },
      marks: {
        strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        link: ({ children, value }) => {
          const href = typeof value?.href === "string" ? value.href : "#";
          return (
            <a
              href={href}
              className="text-teal-700 font-semibold underline underline-offset-4 hover:text-teal-800"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
            >
              {children}
            </a>
          );
        },
      },
      types: {
        image: ({ value }) => {
          const imageUrl = typeof value?.asset?.url === "string" ? value.asset.url : undefined;
          const alt = typeof value?.alt === "string" ? value.alt : "Article image";

          if (!imageUrl) return null;

          return (
            <figure className="my-10">
              <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden border border-slate-200">
                <Image src={imageUrl} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" />
              </div>
              {alt && <figcaption className="mt-3 text-sm text-slate-500">{alt}</figcaption>}
            </figure>
          );
        },
      },
    };
  }, []);

  return (
    <div className="font-sans text-slate-900 pb-24 min-h-screen bg-cream-50">
      <header className="bg-white pt-12 pb-16 px-6 md:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-teal-50 text-teal-800 border border-teal-200 text-[15px] font-bold px-4 py-1.5 rounded-md flex items-center gap-2">
              <Tag size={16} /> {post.categoryTitle}
            </span>
            <span className="text-slate-500 font-medium text-[16px] flex items-center gap-2">
              <Clock size={18} /> {post.readTime ?? "5 min read"}
            </span>
            <span className="text-slate-500 font-medium text-[16px] hidden sm:inline" aria-hidden="true">
              &bull;
            </span>
            <span className="text-slate-500 font-medium text-[16px]">{formatPublishedDate(post.publishedAt)}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-[22px] text-slate-600 leading-relaxed font-medium mb-10">{post.excerpt}</p>

          {post.coverImage.url ? (
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden relative print:hidden border border-slate-200">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          ) : (
            <div
              className={`w-full h-64 md:h-96 bg-gradient-to-br ${gradient} rounded-2xl overflow-hidden relative flex items-center justify-center print:hidden`}
              aria-hidden="true"
            >
              <BookOpen size={96} className="text-white opacity-10" />
            </div>
          )}
        </div>
      </header>

      <section className="py-12 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <aside className="lg:col-span-4 lg:sticky lg:top-24 print:hidden">
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6">
                <h2 className="font-bold text-slate-900 text-[18px] mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <FileText size={20} className="text-teal-700" /> In this guide
                </h2>
                <ul className="space-y-3">
                  {post.tableOfContents.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          scrollToSection(heading.id);
                        }}
                        className="text-[18px] text-slate-600 hover:text-teal-700 font-medium transition-colors inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded px-1 -ml-1"
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
              <h2 className="font-bold text-slate-900 text-[18px] mb-4">Save or Share</h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-[18px] font-bold min-h-[48px] px-4 rounded-xl transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/50"
                >
                  <Printer size={20} className="text-slate-500" /> Print this article
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-[18px] font-bold min-h-[48px] px-4 rounded-xl transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/50"
                >
                  {copied ? <CheckCircle size={20} className="text-emerald-600" /> : <Share2 size={20} className="text-slate-500" />}
                  {copied ? "Link Copied!" : "Share with family"}
                </button>

                <a
                  href={emailHref}
                  className="flex items-center gap-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-[18px] font-bold min-h-[48px] px-4 rounded-xl transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/50"
                >
                  <Mail size={20} className="text-slate-500" /> Email to a friend
                </a>
              </div>
            </div>
          </aside>

          <article className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200">
            {post.body.length > 0 ? (
              <PortableText value={post.body} components={portableComponents} />
            ) : (
              <p className="text-[20px] text-slate-600">Article content coming soon.</p>
            )}

            {post.faq && post.faq.length > 0 && (
              <section className="mt-16 pt-8 border-t border-slate-200">
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {post.faq.map((item, index) => (
                    <div key={`${item.q}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <h3 className="text-[20px] font-bold text-slate-900 mb-2">{item.q}</h3>
                      <p className="text-[18px] text-slate-700 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-16 pt-8 border-t border-slate-200 print:hidden">
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-cream-50 p-6 rounded-2xl border border-slate-100">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck size={32} className="text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold text-[20px] text-slate-900 mb-1">Written by Odyssey Experts</h3>
                  <p className="text-[16px] text-slate-600">
                    Our advice is based on years of experience helping UK families find safe bathing solutions. We ensure all our guides align with current UK regulations and industry best practices.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="py-16 bg-cream-50 border-t border-slate-200 print:hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 mb-10">Related Guides</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <article
                key={related.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden group focus-within:ring-4 focus-within:ring-teal-700/50 relative"
              >
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-slate-500 text-[14px] font-medium mb-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded font-semibold">{related.categoryTitle}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {related.readTime ?? "5 min read"}
                    </span>
                  </div>

                  <h3 className="font-serif text-[20px] font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-800 transition-colors">
                    {related.title}
                  </h3>

                  <p className="text-[18px] text-slate-600 leading-relaxed mb-6 flex-grow">{related.excerpt}</p>

                  <Link
                    href={`/blog/${related.slug}`}
                    className="inline-flex items-center gap-2 text-teal-700 font-bold text-[18px] focus:outline-none focus-visible:outline-none rounded after:absolute after:inset-0"
                    aria-label={`Read article: ${related.title}`}
                  >
                    Read article <ChevronRight size={20} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 print:hidden">
        <div className="bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center text-white shadow-xl">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">{finalCtaTitle}</h2>
          <p className="text-[20px] text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">{finalCtaText}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={primaryHref}
              className="flex items-center justify-center gap-3 bg-white text-slate-900 text-[20px] font-extrabold min-h-[64px] px-8 rounded-xl hover:bg-slate-100 transition-colors w-full sm:w-auto focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              <Phone size={24} className="text-teal-700" />
              {primaryLabel}
            </a>
            <a
              href={secondaryHref}
              className="flex items-center justify-center bg-teal-800 hover:bg-teal-900 text-white text-[20px] font-bold min-h-[64px] px-8 rounded-xl transition-colors border border-teal-700 w-full sm:w-auto focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/50"
            >
              {secondaryLabel}
            </a>
          </div>

          <p className="text-[16px] text-slate-400 mt-6 flex items-center justify-center gap-2 font-medium">
            <Info size={18} /> Call us Monday to Friday, 9am to 5pm
          </p>
        </div>
      </section>
    </div>
  );
}
