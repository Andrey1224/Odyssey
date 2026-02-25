import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BLOG_POSTS } from "@/data/blogPosts";
import { getBreadcrumbs } from "@/lib/breadcrumbs";
import { SITE_DOMAIN } from "@/lib/site";
import { blogPostingJsonLd } from "@/lib/schema";

import { BlogArticleContent } from "./BlogArticleContent";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ id: p.id.toString() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === Number(id));
  if (!post) return { robots: { index: false } };

  const canonical = `${SITE_DOMAIN}/blog/${post.id}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: `${post.title} | Odyssey Baths`,
      description: post.excerpt,
      url: canonical,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === Number(id));
  if (!post) notFound();

  const canonical = `${SITE_DOMAIN}/blog/${post.id}`;

  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd(post, canonical)) }}
      />
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs
          items={getBreadcrumbs(`/blog/${post.id}`, { productTitle: post.title })}
        />
      </div>
      <BlogArticleContent post={post} allPosts={BLOG_POSTS} />
      <Footer />
    </main>
  );
}
