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
  },
];
