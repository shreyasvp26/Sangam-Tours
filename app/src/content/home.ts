import { siteConfig } from "@/config/site";

/**
 * Homepage editorial facts sourced from Documents 01 / 03 / 04 / siteConfig.
 * No invented prices, testimonials, FAQs, or destination photography.
 */

export function yearsInOperation(now = new Date()): number {
  return Math.max(0, now.getFullYear() - siteConfig.foundingYear);
}

export const homeHero = {
  badge: siteConfig.sinceLabel,
  heading: "Well-planned group travel for Maharashtra’s families",
  subheading:
    "A dedicated Tour Manager on every trip, transparent pricing, and nearly five decades of on-ground care — since 1979.",
} as const;

export const homeTrustStrip = {
  /** Factual / brand-documented signals only (Document 08 §11 rule 10). */
  items: [
    {
      value: `${yearsInOperation()}+`,
      label: "Years in operation",
    },
    {
      value: "Every trip",
      label: "Dedicated Tour Manager",
    },
    {
      value: "Clear lists",
      label: "Included & not included",
    },
  ],
} as const;

/**
 * Why Sangam Tours tiles — Document 01 §5 core values, wireframe §3.6 set.
 * Icons chosen at composition time (Lucide); labels/explanations stay here.
 */
export const homeValues = [
  {
    id: "on-ground-care",
    label: "Tour Manager on every trip",
    explanation:
      "A dedicated Tour Manager travels with your group, handling coordination so you don’t have to.",
  },
  {
    id: "transparent-pricing",
    label: "Transparent pricing",
    explanation:
      "Every package clearly separates what is included and what is not — no buried fine print.",
  },
  {
    id: "comfort-details",
    label: "Home-style meals",
    explanation:
      "Comfort is planned in — home-style meals on domestic tours and the small details that matter on the road.",
  },
  {
    id: "reliability",
    label: siteConfig.sinceLabel,
    explanation: "Reliability is a track record, not a slogan — continuous operation since 1979.",
  },
  {
    id: "direct-access",
    label: "Call, WhatsApp, or enquire",
    explanation: "Reach us directly — no accounts, no complicated funnels, just a fast way to ask.",
  },
] as const;

export const homeFinalCta = {
  heading: "Ready to plan your next trip?",
  description:
    "Tell us where you’d like to go — we’ll help you choose dates, clarify inclusions, and answer questions.",
} as const;

export const homeSectionCopy = {
  featured: {
    title: "Featured packages",
    description: "Upcoming departures worth a closer look.",
  },
  split: {
    title: "Where would you like to go?",
    description: "Browse domestic or international group tours.",
  },
  why: {
    title: "Why Sangam Tours",
    description: "What we stand for on every departure.",
  },
  testimonials: {
    title: "Travellers’ words",
    description: "Real reviews from people who travelled with us.",
  },
  gallery: {
    title: "From the road",
    description: "Moments from real Sangam Tours departures.",
  },
  faq: {
    title: "Quick answers",
    description: "Common questions before you enquire.",
  },
} as const;
