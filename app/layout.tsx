import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { SITE_DOMAIN, SITE_NAME } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DOMAIN),
  title: {
    default: "Odyssey Baths | Walk-In Baths & Accessible Bathing",
    template: "%s | Odyssey Baths",
  },
  description:
    "UK specialists in walk-in baths, shower baths, and accessible bathing solutions for seniors and those with limited mobility. VAT relief available.",
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/HeroImage.png",
        width: 1200,
        height: 630,
        alt: "Odyssey Baths — Safe & Accessible Bathing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/HeroImage.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-clip">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased overflow-x-clip`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
