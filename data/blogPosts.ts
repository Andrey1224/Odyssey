export const BLOG_CATEGORIES = [
  "All Articles",
  "Buying Guides",
  "Health & Mobility",
  "VAT & Funding",
  "Installation",
];

export type BlogPost = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  imagePlaceholder: string;
  tableOfContents: { id: string; title: string }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "VAT & Funding",
    title: "How to Claim 0% VAT on Your Walk-In Bath",
    excerpt:
      "Did you know that if you have a long-term illness or disability, you might be exempt from paying VAT? Learn how the process works and what conditions qualify.",
    readTime: "5 min read",
    date: "12 March 2026",
    imagePlaceholder: "VAT Relief Guide",
    tableOfContents: [
      { id: "what-is-vat-relief", title: "What is VAT Relief?" },
      { id: "who-qualifies", title: "Who qualifies for 0% VAT?" },
      { id: "eligible-conditions", title: "Examples of eligible conditions" },
      { id: "how-to-claim", title: "How to claim your exemption" },
    ],
  },
  {
    id: 2,
    category: "Buying Guides",
    title: "Walk-In Bath vs. Shower Bath: Which is Right for You?",
    excerpt:
      "Choosing between a deep soaker and a shower bath depends on your mobility, bathroom size, and family needs. We break down the pros and cons of each.",
    readTime: "8 min read",
    date: "05 March 2026",
    imagePlaceholder: "Bath vs Shower",
    tableOfContents: [
      { id: "key-differences", title: "Key differences explained" },
      { id: "walk-in-bath-benefits", title: "Benefits of a walk-in bath" },
      { id: "shower-bath-benefits", title: "Benefits of a shower bath" },
      { id: "which-is-right", title: "Which is right for your situation?" },
    ],
  },
  {
    id: 3,
    category: "Health & Mobility",
    title: "5 Ways Warm Water Therapy Helps Arthritis Pain",
    excerpt:
      "Discover the science behind hydrotherapy and how features like microbubbles and heated seats can provide natural, daily relief for aching joints.",
    readTime: "6 min read",
    date: "28 February 2026",
    imagePlaceholder: "Hydrotherapy",
    tableOfContents: [
      { id: "science-of-hydrotherapy", title: "The science of hydrotherapy" },
      { id: "pain-relief-benefits", title: "Pain relief & circulation benefits" },
      { id: "key-features", title: "Key features to look for" },
      { id: "getting-started", title: "Getting started safely" },
    ],
  },
  {
    id: 4,
    category: "Installation",
    title: "What to Expect During Your Bath Installation",
    excerpt:
      "Worried about mess and disruption? Read our step-by-step guide on how our expert fitters replace your old bath in just one day with zero hassle.",
    readTime: "4 min read",
    date: "15 February 2026",
    imagePlaceholder: "Installation Process",
    tableOfContents: [
      { id: "before-installation", title: "Before the day of installation" },
      { id: "on-the-day", title: "What happens on the day" },
      { id: "after-installation", title: "After the installation is complete" },
      { id: "aftercare", title: "Ongoing aftercare & warranty" },
    ],
  },
  {
    id: 5,
    category: "Buying Guides",
    title: "Top 3 Safety Features to Look For in a Mobility Bath",
    excerpt:
      "From low-threshold doors to anti-slip bases and thermostatic valves, ensure your new bath has these essential features to prevent slips and falls.",
    readTime: "7 min read",
    date: "02 February 2026",
    imagePlaceholder: "Safety Features",
    tableOfContents: [
      { id: "low-threshold-doors", title: "Low-threshold inward-opening doors" },
      { id: "anti-slip-surfaces", title: "Anti-slip surfaces & grab rails" },
      { id: "thermostatic-controls", title: "Thermostatic & fast-fill taps" },
      { id: "additional-safety", title: "Additional safety considerations" },
    ],
  },
  {
    id: 6,
    category: "Health & Mobility",
    title: "How to Maintain Independence at Home for Longer",
    excerpt:
      "Simple bathroom adaptations and lifestyle changes that can help you stay safe, confident, and independent in your own home as you age.",
    readTime: "6 min read",
    date: "20 January 2026",
    imagePlaceholder: "Home Independence",
    tableOfContents: [
      { id: "bathroom-adaptations", title: "Essential bathroom adaptations" },
      { id: "daily-routines", title: "Safe daily routines & habits" },
      { id: "assistive-technology", title: "Assistive technology & aids" },
      { id: "when-to-plan", title: "When to start planning ahead" },
    ],
  },
];
