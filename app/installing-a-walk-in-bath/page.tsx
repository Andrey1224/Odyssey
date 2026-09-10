import type { Metadata } from "next";
import { LegacyArticleLayout } from "@/components/LegacyArticleLayout";
import { SITE_DOMAIN } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Installing a Walk In Bath",
  description: "The latest Spring 2023 guide for installing a walk in bath, it can be a rewarding task with the right tools and instructions.",
  alternates: { canonical: `${SITE_DOMAIN}/installing-a-walk-in-bath` },
};

export default function InstallingArticle() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Installing a Walk In Bath", href: "/installing-a-walk-in-bath" },
  ];

  return (
    <LegacyArticleLayout
      title="Installing a Walk In Bath"
      breadcrumbs={breadcrumbs}
      date="2023-03-02"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Installing a Walk In Bath",
            "description": "The latest Spring 2023 guide for installing a walk in bath, it can be a rewarding task with the right tools and instructions.",
            "url": `${SITE_DOMAIN}/installing-a-walk-in-bath`,
            "datePublished": "2023-03-02T17:50:46+00:00",
            "dateModified": "2024-01-30T06:00:42+00:00",
            "author": {
              "@type": "Person",
              "name": "Paul"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Odyssey Baths",
              "logo": {
                "@type": "ImageObject",
                "url": `${SITE_DOMAIN}/images/ODYSSEY_Transparent-File-2048x735.webp`
              }
            }
          }),
        }}
      />
      <p>The latest Spring 2023 guide for installing a walk in bath, it can be a rewarding task with the right tools and instructions. This guide will provide step-by-step instructions for easy access bath installation in your bathroom.</p>

      <h3>Step 1: Preparation</h3>
      <p>The first step in installing a walk-in tub is to prepare the area where the bath will be installed. Clear the area of any furniture, fixtures, or obstacles. Turn off the water supply to the bathroom and drain the existing bathtub. Check the floor for any signs of water damage or decay, and repair any damage before proceeding.</p>

      <h3>Step 2: Measure and Mark</h3>
      <p>Measure the dimensions of the walk-in bathtub and mark the location where it will be installed. Use a level to ensure that the area is level and plumb. Mark the location of the drain and the hot and cold water supply lines.</p>

      <h3>Step 3: Install the Drain and Water Supply Lines</h3>
      <p>Before installing the walk-in tub, you need to install the drain and water supply lines. This may require the services of a plumber if you are not familiar with plumbing work. Connect the drain to the existing plumbing and install the water supply lines. Test the connections to ensure there are no leaks.</p>

      <p><strong>Learn more about</strong> <Link href="/walk-in-baths">Serenity Range Self-Cleaning Walk-In Baths</Link>.</p>

      <h3>Step 4: Install the Drain Fitting and Overflow</h3>
      <p>Install the drain fitting and overflow in the designated location. Apply the plumber’s putty around the drain fitting to create a watertight seal. Tighten the drain fitting with a wrench.</p>

      <h3>Step 5: Install the Walk-In Bath</h3>
      <p>Carefully lower the walk-in bathtub into the designated location. Make sure that the bath is level and plumb. Secure the bath in place with screws and brackets.</p>

      <h3>Step 6: Connect the Water Supply Lines</h3>
      <p>Connect the hot and cold water supply lines to the designated locations on the walk-in bathtub. Test the connections to ensure there are no leaks.</p>

      <h3>Step 7: Install the Faucet and Showerhead</h3>
      <p>Install the faucet and showerhead in the designated locations on the walk-in bathtub. Follow the manufacturer’s instructions for installation.</p>

      <h3>Step 8: Install the Drain Cover</h3>
      <p>Install the drain cover and check for leaks. Tighten the drain cover with a wrench.</p>

      <h3>Step 9: Test the Walk-In Bath</h3>
      <p>Turn on the water supply and test the walk-in bathtub for any leaks or problems. Check the drainage and make sure the water flows smoothly.</p>

      <h3>Step 10: Seal the Edges</h3>
      <p>Seal the edges of the walk-in bathtub with silicone caulk. Allow the caulk to dry completely before using the bath.</p>

      <p>In conclusion, installing a walk-in bathtub or an accessible bath can be a complex process, but with the right tools and instructions, it can be done successfully. If you are not familiar with plumbing or construction work, it may be best to hire a professional to install the walk-in bath for you. <Link href="/contact">Contact Odyssey Baths</Link> for professional guidance.</p>

      <p>Remember to follow the manufacturer’s instructions carefully and test the bath for any leaks or problems before using it.</p>
    </LegacyArticleLayout>
  );
}
