import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getBreadcrumbs } from "@/lib/breadcrumbs";
import { blogPostingJsonLd } from "@/lib/schema";
import { SITE_DOMAIN } from "@/lib/site";
import {
  getAllBlogSlugs,
  getPostByLegacyId,
  getPostByPreviousSlug,
  getPostBySlug,
  getRelatedPosts,
  getSiteSettings,
} from "@/sanity/lib/queries";
import { buildTocFromPortableText } from "@/sanity/lib/types";

import { BlogArticleContent } from "./BlogArticleContent";

type Props = { params: Promise<{ slug: string }> };

async function resolveLegacySlugFromParam(value: string): Promise<string | null> {
  const legacyId = Number(value);
  if (!Number.isInteger(legacyId) || legacyId <= 0) return null;

  const match = await getPostByLegacyId(legacyId);
  return match?.slug ?? null;
}

async function resolvePostForMetadata(slug: string) {
  if (/^\d+$/.test(slug)) {
    const mappedSlug = await resolveLegacySlugFromParam(slug);
    if (mappedSlug) {
      const mappedPost = await getPostBySlug(mappedSlug);
      if (mappedPost) return mappedPost;
    }
  }

  const current = await getPostBySlug(slug);
  if (current) return current;

  const moved = await getPostByPreviousSlug(slug);
  if (moved) {
    return getPostBySlug(moved.slug);
  }

  return null;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([resolvePostForMetadata(slug), getSiteSettings()]);

  if (!post) {
    return { robots: { index: false, follow: false } };
  }

  const canonical = `${SITE_DOMAIN}/blog/${post.slug}`;
  const title = post.seo?.title ?? `${post.title} | Odyssey Baths`;
  const description = post.seo?.description ?? post.excerpt ?? settings?.defaultSeoDescription;
  const image = post.seo?.ogImageUrl ?? (post.coverImage.url || settings?.defaultOgImageUrl);

  return {
    title,
    description,
    alternates: { canonical },
    robots: post.seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      images: image ? [{ url: image, alt: post.coverImage.alt }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;

  if (/^\d+$/.test(slug)) {
    const mappedSlug = await resolveLegacySlugFromParam(slug);
    if (mappedSlug) {
      permanentRedirect(`/blog/${mappedSlug}`);
    }
  }

  const movedPost = await getPostByPreviousSlug(slug);
  if (movedPost && movedPost.slug !== slug) {
    permanentRedirect(`/blog/${movedPost.slug}`);
  }

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [relatedPosts, settings] = await Promise.all([
    getRelatedPosts({
      categoryId: post.categoryId,
      tags: post.tags,
      excludeId: post.id,
    }),
    getSiteSettings(),
  ]);

  const canonical = `${SITE_DOMAIN}/blog/${post.slug}`;
  const tableOfContents = post.tableOfContents ?? buildTocFromPortableText(post.body);

  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostingJsonLd(
              {
                title: post.title,
                excerpt: post.excerpt,
                publishedAt: post.publishedAt,
                coverImage: post.coverImage.url ? [post.coverImage.url] : undefined,
              },
              canonical,
            ),
          ),
        }}
      />
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs(`/blog/${post.slug}`, { productTitle: post.title })} />
      </div>
      <BlogArticleContent
        post={{ ...post, tableOfContents }}
        relatedPosts={relatedPosts}
        cta={settings?.blogCtaBlock}
      />
      <Footer />
    </main>
  );
}
