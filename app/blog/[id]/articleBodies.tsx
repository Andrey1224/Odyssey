import React from "react";
import { Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/lib/site";

// Shared inline CTA block used across articles
function InlineCta({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="border-l-4 border-teal-700 bg-cream-50 p-6 rounded-r-2xl my-10">
      <h4 className="text-[22px] font-bold text-slate-900 mb-2">{heading}</h4>
      <p className="text-[20px] text-slate-700 mb-4">{body}</p>
      <a
        href={`tel:+${PHONE_TEL}`}
        className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-[18px] px-6 py-3 min-h-[48px] rounded-lg transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50"
      >
        <Phone size={20} /> {PHONE}
      </a>
    </div>
  );
}

export const ARTICLE_BODIES: Record<number, React.ReactNode> = {
  1: (
    <>
      <h2 id="what-is-vat-relief" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        What is VAT Relief?
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        VAT relief is a government scheme designed to reduce the financial burden on individuals who require
        specialised equipment due to a disability or chronic medical condition. In the context of mobility
        bathing, this means you may not have to pay the standard 20% VAT on your new walk-in bath or its
        installation.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        This is not a complex rebate system where you claim money back later. If you qualify, the VAT is
        simply removed from your total bill upfront. We handle all the paperwork, making the process
        completely hassle-free for you.
      </p>

      <h2 id="who-qualifies" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Who qualifies for 0% VAT?
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        According to HM Revenue &amp; Customs (HMRC), to qualify for zero-rated VAT on adapted products,
        you must meet these main criteria:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li className="text-[20px] text-slate-800">
          You have a physical or mental impairment which has a long-term and substantial adverse effect upon
          your ability to carry out everyday activities.
        </li>
        <li className="text-[20px] text-slate-800">
          Or you have a condition that the medical profession treats as a chronic sickness — such as
          Diabetes or Arthritis.
        </li>
        <li className="text-[20px] text-slate-800">
          The product being purchased must be specifically designed or adapted to assist with that
          disability. All our walk-in baths qualify.
        </li>
      </ul>

      <InlineCta
        heading="Unsure if you qualify?"
        body="Our team deals with VAT relief forms every day. Call us for a quick, confidential chat, and we'll tell you immediately if you are eligible to save 20%."
      />

      <h2 id="eligible-conditions" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Examples of eligible conditions
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Many people don&apos;t realise they qualify. Age alone does not qualify you for VAT relief, but
        many age-related conditions do. Common eligible conditions include:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li className="text-[20px] text-slate-800">Arthritis (Osteoarthritis and Rheumatoid)</li>
        <li className="text-[20px] text-slate-800">Heart conditions and Angina</li>
        <li className="text-[20px] text-slate-800">Multiple Sclerosis (MS)</li>
        <li className="text-[20px] text-slate-800">Parkinson&apos;s Disease</li>
        <li className="text-[20px] text-slate-800">COPD and severe Asthma</li>
        <li className="text-[20px] text-slate-800">Anyone registered as terminally ill</li>
      </ul>

      <h2 id="how-to-claim" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        How to claim your exemption
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        We have made claiming VAT relief incredibly simple. You do not need to involve your doctor or send
        us medical records.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        During your free home survey or over the phone, our representative will provide you with a simple
        &ldquo;Eligibility Declaration&rdquo; form. You simply sign this form stating your condition. We
        then deduct the 20% VAT from your final quote immediately. We keep the form on file for our records
        with HMRC.
      </p>
    </>
  ),

  2: (
    <>
      <h2 id="key-differences" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Key differences explained
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Walk-in baths and walk-in shower baths look similar from the outside but are designed with
        different priorities. A dedicated walk-in bath focuses on a deep, therapeutic soak with a watertight
        door. A shower bath combines a bath with a built-in shower screen, giving you both options in one unit.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Understanding the differences will help you choose the right product for your bathroom size, mobility
        needs, and daily routine.
      </p>

      <h2 id="walk-in-bath-benefits" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Benefits of a walk-in bath
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Walk-in baths are ideal if you enjoy a long, relaxing soak and have limited mobility. The low-threshold
        door means you step over just a few inches — far safer than climbing over a traditional bath side.
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li className="text-[20px] text-slate-800">Low-threshold door for easy, safe entry and exit</li>
        <li className="text-[20px] text-slate-800">Optional hydrotherapy jets for arthritis and joint pain</li>
        <li className="text-[20px] text-slate-800">Built-in seat at bath height — no need to lower yourself to the floor</li>
        <li className="text-[20px] text-slate-800">Deeper soaking experience than most standard baths</li>
      </ul>

      <InlineCta
        heading="Not sure which bath suits your bathroom?"
        body="Our advisors can arrange a free home visit to measure your space and recommend the best option for your needs and budget."
      />

      <h2 id="shower-bath-benefits" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Benefits of a shower bath
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Walk-in shower baths are perfect for households where one person needs a bath while another prefers
        a quick shower. They save space compared to having separate fixtures, and the overhead shower means
        you never need to wait to fill a full bath.
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li className="text-[20px] text-slate-800">Two-in-one: bath and overhead shower in a single unit</li>
        <li className="text-[20px] text-slate-800">Suitable for households with mixed mobility needs</li>
        <li className="text-[20px] text-slate-800">Quick shower option for days when a full soak isn&apos;t needed</li>
        <li className="text-[20px] text-slate-800">Often more space-efficient than a separate walk-in bath</li>
      </ul>

      <h2 id="which-is-right" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Which is right for your situation?
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        If you live alone and primarily want a therapeutic, relaxing soak with maximum safety, a dedicated
        walk-in bath is the better choice. If you share a bathroom with someone who prefers showers, or you
        want flexibility in your daily routine, a walk-in shower bath gives you the best of both worlds.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Either way, 0% VAT may apply if you have a qualifying condition — which could save you hundreds of
        pounds on your purchase.
      </p>
    </>
  ),

  3: (
    <>
      <h2 id="science-of-hydrotherapy" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        The science of hydrotherapy
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Hydrotherapy — using warm water to relieve pain and promote healing — has been used for centuries,
        and modern research continues to support its benefits. For people with arthritis, the combination of
        warm water, buoyancy, and gentle jet pressure can make a significant difference to daily comfort.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Warm water causes blood vessels to dilate, improving circulation to inflamed joints. Buoyancy reduces
        the effective weight on joints by up to 90%, allowing movement that might otherwise be painful.
      </p>

      <h2 id="pain-relief-benefits" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Pain relief &amp; circulation benefits
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Regular warm baths have been shown to reduce the stiffness and aching associated with osteoarthritis
        and rheumatoid arthritis. Many of our customers report that a 20-minute soak in the morning makes
        the rest of their day significantly more comfortable.
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li className="text-[20px] text-slate-800">Reduces joint swelling and morning stiffness</li>
        <li className="text-[20px] text-slate-800">Improves circulation to extremities (hands, feet, knees)</li>
        <li className="text-[20px] text-slate-800">Relaxes muscle tension around painful joints</li>
        <li className="text-[20px] text-slate-800">Promotes better sleep through muscle relaxation before bed</li>
      </ul>

      <InlineCta
        heading="Interested in hydrotherapy options?"
        body="Several of our walk-in baths include optional microbubble and whirlpool jets. Call us to find out which model suits your specific condition."
      />

      <h2 id="key-features" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Key features to look for
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Not all walk-in baths offer hydrotherapy features. When choosing, look for these specific options
        that maximise therapeutic benefit:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li className="text-[20px] text-slate-800">Microbubble system — millions of tiny bubbles for deep tissue stimulation</li>
        <li className="text-[20px] text-slate-800">Whirlpool jets — adjustable water jets targeting back, legs, and feet</li>
        <li className="text-[20px] text-slate-800">Heated seat — maintains warmth while you wait for the bath to fill</li>
        <li className="text-[20px] text-slate-800">Thermostatic control — locks water at a safe temperature</li>
      </ul>

      <h2 id="getting-started" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Getting started safely
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        If you have a cardiovascular condition or are on blood-thinning medication, speak to your GP before
        starting a regular hydrotherapy routine. Generally, warm (not hot) water at around 37–39°C is
        recommended, with sessions of 15–20 minutes.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Our thermostatic taps make it simple to set and maintain a safe temperature every time, removing any
        guesswork from the equation.
      </p>
    </>
  ),

  4: (
    <>
      <h2 id="before-installation" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Before the day of installation
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        A week before your installation, our team will confirm your appointment and provide a checklist.
        You&apos;ll be asked to clear the bathroom of personal items and ensure there is clear access from
        your front door to the bathroom. That&apos;s all we need from you.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Our fitters will arrive with all the tools, fixtures, and materials needed. You won&apos;t need to
        source anything yourself.
      </p>

      <h2 id="on-the-day" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        What happens on the day
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Our fully qualified fitters typically arrive between 8am and 9am. The old bath is carefully removed
        and disposed of (we take it away — no skips needed). The new walk-in bath is then fitted, plumbed,
        and tested.
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li className="text-[20px] text-slate-800">Old bath removed and taken away by our team</li>
        <li className="text-[20px] text-slate-800">New bath positioned and secured to floor and walls</li>
        <li className="text-[20px] text-slate-800">Plumbing connected and tested for leaks</li>
        <li className="text-[20px] text-slate-800">Tiling, panels, and sealant finished to a clean standard</li>
      </ul>

      <InlineCta
        heading="Questions before your installation?"
        body="Our installation team is happy to answer any questions ahead of your appointment. Give us a call and we'll put your mind at ease."
      />

      <h2 id="after-installation" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        After the installation is complete
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Before our fitters leave, they will walk you through how to operate every feature of your new bath —
        the door seal, any jets, the thermostatic tap, and the drainage. You&apos;ll have a full working
        demonstration, not just a leaflet.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Most installations are complete by mid-afternoon, leaving the bathroom clean and fully operational
        by the end of the working day.
      </p>

      <h2 id="aftercare" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Ongoing aftercare &amp; warranty
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        All our walk-in baths come with a comprehensive warranty on both the product and the installation
        workmanship. If anything needs attention, a single call to our aftercare team is all it takes — we
        will arrange a visit at your convenience.
      </p>
    </>
  ),

  5: (
    <>
      <h2 id="low-threshold-doors" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Low-threshold inward-opening doors
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        The most dangerous moment in any bathing routine is stepping in and out of the bath. Traditional baths
        require you to lift your leg over a 50cm side — a significant fall risk for anyone with reduced
        balance or hip mobility. A walk-in bath&apos;s inward-opening door reduces this threshold to as
        little as 15cm.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Look for a door with a wide, comfortable handle positioned at standing height, so you never need to
        reach awkwardly to open or close it.
      </p>

      <h2 id="anti-slip-surfaces" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Anti-slip surfaces &amp; grab rails
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        The bath floor should feature a textured, anti-slip surface that provides grip even when wet and
        soapy. This is not the same as a standard bath mat — it is moulded into the acrylic itself, so it
        cannot be dislodged or bunched up.
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li className="text-[20px] text-slate-800">Anti-slip base moulded into the bath floor (not a separate mat)</li>
        <li className="text-[20px] text-slate-800">Integrated grab rail positioned where your hand naturally reaches</li>
        <li className="text-[20px] text-slate-800">Comfortable moulded seat at the correct height to lower yourself safely</li>
        <li className="text-[20px] text-slate-800">Non-slip step at the door threshold for extra confidence</li>
      </ul>

      <InlineCta
        heading="Want to see these safety features in person?"
        body="Request a free brochure or call us to book a no-obligation home visit. We'll show you every safety feature in detail."
      />

      <h2 id="thermostatic-controls" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Thermostatic &amp; fast-fill taps
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Because the door must be sealed before you fill the bath, you need to trust the water temperature.
        Thermostatic taps lock to a pre-set temperature, preventing scalding even if the hot water supply
        fluctuates. This is especially important for anyone with reduced skin sensation.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Fast-fill taps reduce the time you spend sitting in the bath waiting for it to fill — important for
        keeping you warm and comfortable, especially in winter.
      </p>

      <h2 id="additional-safety" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Additional safety considerations
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Beyond the bath itself, consider the wider bathroom environment. A non-slip bathroom mat outside
        the bath, a heated towel rail within easy reach, and good overhead lighting all contribute to a
        safer routine. Our team can advise on complementary adaptations during your free home survey.
      </p>
    </>
  ),

  6: (
    <>
      <h2 id="bathroom-adaptations" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Essential bathroom adaptations
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        The bathroom is statistically the most dangerous room in the house for people over 65. But with
        a few key adaptations, it can become one of the safest and most enjoyable spaces in your home.
        Small changes deliver big improvements in daily confidence and safety.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Replacing a standard bath with a walk-in bath is the single most impactful change you can make.
        Beyond that, consider the additions below.
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li className="text-[20px] text-slate-800">Walk-in bath to eliminate the climb-over hazard</li>
        <li className="text-[20px] text-slate-800">Grab rails beside the toilet and in the shower area</li>
        <li className="text-[20px] text-slate-800">Non-slip flooring throughout the bathroom</li>
        <li className="text-[20px] text-slate-800">Raised toilet seat to reduce strain when sitting and standing</li>
      </ul>

      <h2 id="daily-routines" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Safe daily routines &amp; habits
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Adaptations to the physical environment are only part of the picture. Building safe habits into your
        daily routine is equally important. Bathing at the same time each day, telling someone when you are
        in the bath, and keeping a phone or personal alarm within reach all add extra layers of security.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Avoid bathing immediately after a large meal or when you are very tired, as both can affect
        circulation and balance.
      </p>

      <InlineCta
        heading="Ready to make your bathroom safer?"
        body="Our team can arrange a free, no-obligation home visit to assess your bathroom and recommend the right adaptations for your situation."
      />

      <h2 id="assistive-technology" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        Assistive technology &amp; aids
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Modern assistive technology extends well beyond bathroom adaptations. Personal alarm pendants,
        smart doorbells, and voice-activated devices can all help you maintain independence while giving
        family members peace of mind. Many of these are available through NHS Continuing Healthcare or
        local authority grants.
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li className="text-[20px] text-slate-800">Personal alarm pendants (waterproof models work in the bath)</li>
        <li className="text-[20px] text-slate-800">Motion-sensing night lights for safe nocturnal trips to the bathroom</li>
        <li className="text-[20px] text-slate-800">Lever-style door handles throughout the home (easier than round knobs)</li>
        <li className="text-[20px] text-slate-800">Stair lift assessment if stairs are a concern</li>
      </ul>

      <h2 id="when-to-plan" className="font-serif text-3xl text-slate-900 mt-12 mb-6">
        When to start planning ahead
      </h2>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        The best time to adapt your bathroom is before a fall or injury forces the issue. Planning ahead
        while you are still mobile means you can take your time, compare options, and spread the cost —
        rather than making rushed decisions after an incident.
      </p>
      <p className="text-[20px] leading-relaxed text-slate-800 mb-6">
        Many customers tell us they wish they had made the change sooner. A walk-in bath not only improves
        safety but also restores the simple pleasure of a proper bath — something many people had given up
        on entirely.
      </p>
    </>
  ),
};
