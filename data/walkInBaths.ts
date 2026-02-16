export type LengthBucket = 'compact' | 'standard' | 'large';

export type Product = {
  id: string;
  title: string;
  priceExVat: number;
  image: string;
  description?: string;
  features?: string[];
  dimensions: string;
  capacity?: string;
  category?: string;
  handing: string;
  size?: string;
  lengthBucket: LengthBucket;
  keyFeatures: string[];
  stepLevel?: string;
  system?: string;
  installedIn?: string;
  // PDP fields
  tagline?: string;
  badge?: string;
  regularPrice?: number;
  techSpecs?: { label: string; value: string }[];
  reviews?: { author: string; text: string }[];
  whyChoose?: { title: string; description: string }[];
};

export const PRODUCTS: Product[] = [
    {
        id: "1",
        title: "Serenity 66 Classic",
        priceExVat: 2708,
        image: "/images/Walk-inBath.png",
        description: "Our core model offering essential safety and comfort with a low-step entry.",
        features: ["Low-level entry", "Slip-resistant seat", "Leak-free door"],
        dimensions: "1675mm",
        capacity: "Low",
        category: "walk-in",
        handing: "Left Hand",
        size: "66\" (Standard)",
        lengthBucket: "standard",
        keyFeatures: [],
        stepLevel: "Low",
        system: "Classic",
        installedIn: "Manchester",
        tagline: "The UK's most robust walk-in bath. Built like a tank, designed for comfort.",
        badge: "BEST SELLER",
        regularPrice: 3195,
        techSpecs: [
            { label: "Length", value: "1675mm (66 inches)" },
            { label: "Width", value: "750mm (29.5 inches)" },
            { label: "Internal Seat Width", value: "550mm" },
            { label: "Max User Weight", value: "35 Stone (222kg)" },
            { label: "Shell Material", value: "Marine-grade acrylic + 4 layers fiberglass" },
            { label: "Frame Material", value: "Stainless Steel Box Section" },
        ],
        reviews: [
            { author: "Adam Simmonds", text: "After retiring I decided to splash out on the Serenity. The quality is perfect, and it was worth every penny. Installation was flawless." },
            { author: "Grace Ellison", text: "My husband and I are very impressed. We have a small bathroom and didn't think we had room, but this fit perfectly." },
            { author: "Mike Edwards", text: "Really great service. I chewed their ears off for hours asking questions, and they were very patient. No hard sell." },
        ],
        whyChoose: [
            { title: "Zero Height Threshold", description: "Eliminates the risk of trips. Simply sit on the seat and slide your legs in. No high steps to navigate." },
            { title: "Supports 35 Stone (222kg)", description: "Built on a stainless steel box frame. Known as \"The Tank\" for its incredible strength and stability." },
            { title: "Quick Drain Technology", description: "Includes dual wastes to drain water up to 2x faster than standard baths, reducing waiting time." },
            { title: "Easy Maintenance", description: "One-piece acrylic shell means no seams for mould to grow. The door can be removed in 5 mins for access." },
        ],
    },
    {
        id: "2",
        title: "Serenity 66 Plus",
        priceExVat: 3208,
        image: "/images/DeepSoaker.png",
        description: "Enhanced comfort featuring our signature Air Spa system for gentle relaxation.",
        features: ["Air Spa System", "Digital controls", "Rapid fill technology"],
        dimensions: "1675mm",
        capacity: "Air Spa",
        category: "walk-in",
        handing: "Right Hand",
        size: "66\" (Standard)",
        lengthBucket: "standard",
        keyFeatures: ["Air Spa Jets"],
        stepLevel: "Low",
        system: "Air Spa",
        installedIn: "Leeds",
        tagline: "All the Classic's safety, elevated with a soothing Air Spa system.",
        techSpecs: [
            { label: "Length", value: "1675mm (66 inches)" },
            { label: "Width", value: "750mm (29.5 inches)" },
            { label: "Internal Seat Width", value: "550mm" },
            { label: "Max User Weight", value: "35 Stone (222kg)" },
            { label: "Air Jets", value: "12 body jets + 2 foot jets" },
            { label: "Shell Material", value: "Marine-grade acrylic + 4 layers fiberglass" },
        ],
        reviews: [
            { author: "Patricia Holt", text: "The air jets are so gentle and relaxing. Makes bath time something I look forward to every day." },
            { author: "Derek Shaw", text: "Excellent quality. The digital controls are easy to use and the installation team were professional." },
        ],
        whyChoose: [
            { title: "Therapeutic Air Spa", description: "14 air jets provide a gentle, enveloping massage to ease aching joints and muscles." },
            { title: "Digital Controls", description: "Simple large-button controls designed for easy use, even with reduced dexterity." },
            { title: "Rapid Fill Technology", description: "Fills up to 40% faster than a standard bath so you spend less time waiting in the cold." },
            { title: "Quiet Operation", description: "Whisper-quiet pump ensures a peaceful, relaxing experience without disturbance." },
        ],
    },
    {
        id: "3",
        title: "Serenity 66 Special",
        priceExVat: 3908,
        image: "/images/StandardEasy-Access.png",
        description: "The ultimate luxury experience with heated seating and chromotherapy.",
        features: ["Heated Seat & Back", "Chromotherapy", "Luxury Headrest"],
        dimensions: "1675mm",
        capacity: "Heated",
        category: "walk-in",
        handing: "Left Hand",
        size: "66\" (Standard)",
        lengthBucket: "standard",
        keyFeatures: ["Heated Seat", "Chromotherapy"],
        stepLevel: "Low",
        system: "Luxury",
        installedIn: "Birmingham",
        tagline: "The pinnacle of walk-in bathing — heated seating, colour therapy, and pure indulgence.",
        badge: "LUXURY",
        techSpecs: [
            { label: "Length", value: "1675mm (66 inches)" },
            { label: "Width", value: "750mm (29.5 inches)" },
            { label: "Internal Seat Width", value: "550mm" },
            { label: "Max User Weight", value: "35 Stone (222kg)" },
            { label: "Air Jets", value: "14 body jets + 4 foot jets" },
            { label: "Heated Seat", value: "Yes — thermostatically controlled" },
            { label: "Chromotherapy", value: "7 colour LED system" },
        ],
        reviews: [
            { author: "Margaret Collins", text: "I was sceptical about the heated seat but it's genuinely wonderful. The chromotherapy lighting is very relaxing." },
            { author: "Robert Andrews", text: "Absolutely worth every penny. The installation was clean and tidy, and the team explained everything clearly." },
        ],
        whyChoose: [
            { title: "Heated Seat & Back Panel", description: "Thermostatically controlled warmth keeps you comfortable from the moment you sit down." },
            { title: "Chromotherapy Lighting", description: "7 colour LED system creates a calming spa atmosphere to reduce stress and improve wellbeing." },
            { title: "Luxury Padded Headrest", description: "Ergonomically shaped headrest supports your neck so you can fully relax and unwind." },
            { title: "Premium Air & Water Spa", description: "Combined air and water jet system provides the deepest therapeutic massage in the range." },
        ],
    },
    {
        id: "4",
        title: "Serenity 75 Grand",
        priceExVat: 4100,
        image: "/images/Walk-inBath.png",
        description: "Extended length for taller bathers, offering extra legroom and comfort.",
        features: ["Extended legroom", "Reinforced frame", "High-flow waste"],
        dimensions: "1900mm",
        capacity: "260L",
        category: "lay-down",
        handing: "Right Hand",
        size: "75\" (Extended)",
        lengthBucket: "large",
        keyFeatures: ["Heated Seat"],
        stepLevel: "Low",
        system: "Grand",
        installedIn: "Edinburgh",
        tagline: "Designed for those who need a little more room — without compromising on safety.",
        techSpecs: [
            { label: "Length", value: "1900mm (75 inches)" },
            { label: "Width", value: "790mm (31 inches)" },
            { label: "Internal Seat Width", value: "580mm" },
            { label: "Max User Weight", value: "35 Stone (222kg)" },
            { label: "Shell Material", value: "Marine-grade acrylic + 4 layers fiberglass" },
            { label: "Frame Material", value: "Stainless Steel Box Section" },
        ],
        reviews: [
            { author: "James Thornton", text: "At 6'3\" I could never fit comfortably in a standard bath. The Grand is a revelation — finally enough room to relax properly." },
            { author: "Susan Clarke", text: "Bought this for my father who is tall. He absolutely loves it. The quality is superb." },
        ],
        whyChoose: [
            { title: "Extra Legroom", description: "225mm longer than our standard model, providing genuine comfort for taller bathers up to 6'4\"." },
            { title: "Reinforced Frame", description: "Additional cross-bracing in the stainless steel frame for extra rigidity in the larger format." },
            { title: "High-Flow Waste System", description: "Oversized waste fitting drains the greater water volume quickly so you're never left waiting." },
            { title: "Full Safety Feature Set", description: "All the safety features of the Classic — low threshold, anti-slip seat, and secure door seal." },
        ],
    },
];
