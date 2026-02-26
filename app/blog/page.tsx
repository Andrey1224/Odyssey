import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getBreadcrumbs } from "@/lib/breadcrumbs";
import { SITE_DOMAIN } from "@/lib/site";
import { getCategories, getPosts, getSiteSettings } from "@/sanity/lib/queries";

import { BlogContent } from "./BlogContent";

const PAGE_SIZE = 6;

type BlogSearchParams = {
  category?: string;
  q?: string;
  page?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = settings?.defaultSeoTitle ?? "Advice & Guides | Odyssey Baths";
  const description =
    settings?.defaultSeoDescription ??
    "Helpful articles on safe bathing, VAT relief, and bathroom adaptations. Written by our UK experts to help you make the right choice.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_DOMAIN}/blog`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_DOMAIN}/blog`,
      images: settings?.defaultOgImageUrl ? [{ url: settings.defaultOgImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      images: settings?.defaultOgImageUrl ? [settings.defaultOgImageUrl] : undefined,
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>;
}) {
  const params = await searchParams;

  const selectedCategorySlug = params.category?.trim() || undefined;
  const searchQuery = params.q?.trim() || undefined;
  const pageRaw = Number(params.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;

  const [categories, postResult] = await Promise.all([
    getCategories(),
    getPosts({
      page,
      pageSize: PAGE_SIZE,
      categorySlug: selectedCategorySlug,
      q: searchQuery,
    }),
  ]);

  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs("/blog")} />
      </div>
      <BlogContent
        categories={categories}
        posts={postResult.items}
        total={postResult.total}
        selectedCategorySlug={selectedCategorySlug}
        searchQuery={searchQuery}
        page={page}
      />
      <Footer />
    </main>
  );
}
