import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBreadcrumbs } from "@/lib/breadcrumbs";
import FreeQuoteForm from "./FreeQuoteForm";

export const metadata = { title: "Get a Free Quote | Odyssey Baths" };

export default function FreeQuotePage() {
  return (
    <main className="min-h-screen bg-cream-50">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <Breadcrumbs items={getBreadcrumbs("/free-quote")} />
      </div>
      <FreeQuoteForm />
      <Footer />
    </main>
  );
}
