import type { CompanyInformation, TourManager } from "@/domain";
import {
  aboutAchievements,
  aboutCompanyRecord,
  aboutCompanyStory,
  aboutCta,
  aboutHero,
  aboutMission,
  aboutTimeline,
  aboutTourManagerFallback,
  aboutValues,
  aboutVision,
  aboutWhyChooseUs,
} from "@/content/about";
import { getPublicCatalog } from "@/services/public-catalog";

export type AboutPageData = {
  hero: typeof aboutHero;
  /** Story as paragraphs for readable layout. */
  storyParagraphs: string[];
  mission: string;
  vision: string;
  values: CompanyInformation["coreValues"];
  whyChooseUs: typeof aboutWhyChooseUs;
  timeline: NonNullable<CompanyInformation["timelineMilestones"]>;
  achievements: NonNullable<CompanyInformation["achievements"]>;
  tourManagers: TourManager[];
  tourManagerFallback: string;
  cta: typeof aboutCta;
  company: CompanyInformation;
};

function storyToParagraphs(aboutUsText: string): string[] {
  return aboutUsText
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Assemble About page data — Document 04 §6 / 08 §4.8–§4.9.
 * Prefers CMS Company + Tour Managers when available; falls back to brand docs.
 */
export async function getAboutPageData(): Promise<AboutPageData> {
  const catalog = getPublicCatalog();

  const [companyResult, managersResult] = await Promise.all([
    catalog.company.get(),
    catalog.tourManagers.listActive(),
  ]);

  const company = companyResult.ok ? companyResult.data : aboutCompanyRecord;
  const tourManagers = managersResult.ok ? managersResult.data : [];

  const storyParagraphs = companyResult.ok
    ? storyToParagraphs(company.aboutUsText)
    : [...aboutCompanyStory];

  return {
    hero: aboutHero,
    storyParagraphs,
    mission: company.missionStatement || aboutMission,
    vision: company.visionStatement || aboutVision,
    values: company.coreValues.length > 0 ? company.coreValues : aboutValues,
    whyChooseUs: aboutWhyChooseUs,
    timeline:
      company.timelineMilestones && company.timelineMilestones.length > 0
        ? company.timelineMilestones
        : aboutTimeline,
    achievements:
      company.achievements && company.achievements.length > 0
        ? company.achievements
        : [...aboutAchievements],
    tourManagers,
    tourManagerFallback: aboutTourManagerFallback,
    cta: aboutCta,
    company,
  };
}
