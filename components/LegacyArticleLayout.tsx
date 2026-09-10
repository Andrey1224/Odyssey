import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";

interface LegacyArticleLayoutProps {
  title: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  children: ReactNode;
  date?: string;
}

export function LegacyArticleLayout({
  title,
  breadcrumbs,
  children,
  date,
}: LegacyArticleLayoutProps) {
  return (
    <main className="min-h-screen bg-cream-50 font-sans selection:bg-teal-200">
      <Header />
      <article className="mx-auto max-w-3xl px-6 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} />
        
        <header className="my-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          {date && (
            <p className="mt-4 text-slate-500 font-medium">
              Published on {new Date(date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </header>

        <div className="text-slate-700 leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>img]:rounded-xl [&>img]:shadow-md [&>img]:my-8 [&>a]:text-teal-700 [&>a]:underline hover:[&>a]:text-teal-900">
          {children}
        </div>
      </article>
      <Footer />
    </main>
  );
}
