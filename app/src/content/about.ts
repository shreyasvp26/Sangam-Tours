import { siteConfig } from "@/config/site";
import { yearsInOperation } from "@/content/home";
import type { CompanyInformation, CoreValue, TimelineMilestone } from "@/domain";

/**
 * About page company facts — Document 01 §§2–5 / Document 08 §4.9.
 * Used when CMS Company Information is not yet connected.
 * No invented traveller counts or unverified milestones.
 */

export const aboutHero = {
  badge: siteConfig.sinceLabel,
  /** One-line mission for hero credibility (Document 04 §6 Hero). */
  missionLine:
    "Professionally planned, personally cared for, completely hassle-free group travel — since 1979.",
} as const;

/** Company Story paragraphs — Document 01 §2. */
export const aboutCompanyStory = [
  "Sangam Tours started in Nagpur in 1979, when organised group travel in Maharashtra was still a new idea. Nearly five decades later, the business still runs on the same premise it opened with: a traveller shouldn’t have to manage the logistics of their own holiday.",
  "Over that time, Sangam Tours has run group departures across some of India’s more demanding routes — the high passes of Leh-Ladakh, the monsoon coast of Konkan, the desert circuits of Rajasthan — as well as international tours through Southeast Asia, Bhutan, and Nepal. Each of these carries its own operational load: permits, altitude, seasonal weather, multi-state transport. Sangam Tours absorbs that load internally so the traveller doesn’t have to think about it.",
  "Three things have stayed constant since 1979: a Tour Manager present on every departure, home-style meals on domestic tours, and a clear breakdown of what’s included and excluded in every package — something the company did before it became a standard industry expectation.",
  "It’s a Nagpur-based, family-run operator that has kept the same travellers coming back across two generations, and is now reaching a new generation through Instagram and Facebook.",
] as const;

/** Document 01 §3. */
export const aboutVision =
  "To be the group travel operator Maharashtra’s families default to and pass down — trusted enough that people book without comparison-shopping, because the track record already did that work.";

/**
 * Mission — Document 01 §4 condensed for a scannable About Mission block.
 * Full operational bullets remain in brand docs; page shows the standing promise.
 */
export const aboutMission =
  "Sangam Tours designs fixed-departure group tours that remove friction from travel planning — transparent all-inclusive pricing, a trained Tour Manager on every departure, home-style care on domestic itineraries, and a booking path via call, WhatsApp, or form that stays fast and direct.";

/** Document 01 §5 — four to six tiles on About (Document 04 §6). */
export const aboutValues: CoreValue[] = [
  {
    name: "Reliability Over Time",
    explanation:
      "Sangam Tours has operated continuously since 1979. Reliability is a track record, not a claim.",
  },
  {
    name: "Transparent Pricing",
    explanation:
      "Every package clearly separates what is included and excluded — no hidden costs at the point of booking.",
  },
  {
    name: "On-Ground Care",
    explanation:
      "A dedicated Tour Manager travels with every group, handling coordination so travellers don’t have to.",
  },
  {
    name: "Comfort in the Details",
    explanation:
      "Home-style meals on domestic tours and the small comforts that matter — planned in, not improvised.",
  },
  {
    name: "Inclusive Group Travel",
    explanation:
      "Packages for families, seniors, couples, friends, corporate groups, and solo travellers alike.",
  },
  {
    name: "Rooted, Not Corporate",
    explanation:
      "A Nagpur-based, community-known business — warm and personal, never a faceless aggregator.",
  },
];

/** Why Choose Us — intentionally aligned with homepage differentiators (Document 04 §6). */
export const aboutWhyChooseUs = [
  {
    id: "tour-manager",
    label: "Tour Manager on every trip",
    explanation: "A dedicated Tour Manager travels with your group from start to finish.",
  },
  {
    id: "pricing",
    label: "Transparent pricing",
    explanation: "Clear Included and Not Included lists on every package.",
  },
  {
    id: "since",
    label: siteConfig.sinceLabel,
    explanation: "Nearly five decades of continuous operation from Nagpur.",
  },
] as const;

/**
 * Timeline — founding is documented; present day closes the arc.
 * No invented intermediate milestone years (Document 08 §11 rule 10).
 */
export const aboutTimeline: TimelineMilestone[] = [
  {
    year: String(siteConfig.foundingYear),
    description:
      "Sangam Tours founded in Nagpur, beginning organised group travel for Maharashtra’s families.",
  },
  {
    year: "Today",
    description: `${yearsInOperation()}+ years on — still family-run, still Tour Manager–led, still clear about what’s included.`,
  },
];

/** Achievements — factual/derived only; never invent traveller or destination totals. */
export const aboutAchievements = [
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
] as const;

export const aboutTourManagerFallback =
  "Every Sangam Tours departure includes a dedicated, trained Tour Manager — on the ground with your group to handle coordination, logistics, and the unexpected, so you can focus on the journey.";

export const aboutCta = {
  heading: "Travel with a team that has been doing this since 1979",
  description:
    "Browse upcoming tours, or reach us directly — we’re happy to help you choose the right departure.",
} as const;

/** Static Company Information record shaped for the data layer. */
export const aboutCompanyRecord: CompanyInformation = {
  id: "company-sangam-tours",
  registeredBusinessName: siteConfig.name,
  foundingYear: siteConfig.foundingYear,
  aboutUsText: aboutCompanyStory.join("\n\n"),
  missionStatement: aboutMission,
  visionStatement: aboutVision,
  coreValues: aboutValues,
  timelineMilestones: aboutTimeline,
  achievements: [...aboutAchievements],
};
