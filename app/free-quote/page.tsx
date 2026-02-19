import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FreeQuoteForm from "./FreeQuoteForm";

export const metadata = { title: "Get a Free Quote | Odyssey Baths" };

export default function FreeQuotePage() {
  return (
    <>
      <Header />
      <FreeQuoteForm />
      <Footer />
    </>
  );
}
