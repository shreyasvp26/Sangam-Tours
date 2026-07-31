import type { Faq, GalleryItem, PackageSummary, Testimonial } from "@/domain";
import { getPublicCatalog } from "@/services/public-catalog";
import {
  homeFinalCta,
  homeHero,
  homeSectionCopy,
  homeTrustStrip,
  homeValues,
} from "@/content/home";
import { listingPages } from "@/content/listings";

export type HomeHeroMedia = {
  src: string;
  alt: string;
};

export type HomeSplitPanel = {
  href: string;
  label: string;
  ctaLabel: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type HomePageData = {
  hero: typeof homeHero;
  heroMedia: HomeHeroMedia | null;
  trust: typeof homeTrustStrip;
  values: typeof homeValues;
  sectionCopy: typeof homeSectionCopy;
  finalCta: typeof homeFinalCta;
  featuredPackages: PackageSummary[];
  splitPanels: HomeSplitPanel[];
  testimonials: Testimonial[];
  galleryItems: GalleryItem[];
  faqs: Faq[];
};

function packageHeroImage(
  pkg: PackageSummary | undefined,
): Pick<HomeSplitPanel, "imageSrc" | "imageAlt"> {
  if (!pkg?.heroMedia?.mediaFile?.uri) {
    return {};
  }
  return {
    imageSrc: pkg.heroMedia.mediaFile.uri,
    imageAlt: pkg.heroMedia.altText || pkg.name,
  };
}

/**
 * Assemble Homepage data via the catalog ports (Document 09).
 * Editorial copy comes from `@/content/home`; catalogue slices from the public API.
 * Hero / split imagery only when supplied — never stock placeholders.
 */
export async function getHomePageData(): Promise<HomePageData> {
  const catalog = getPublicCatalog();

  const [homepageResult, packagesResult, testimonialsResult, galleryResult, faqsResult] =
    await Promise.all([
      catalog.homepage.get(),
      catalog.packages.listPublished({ sort: "nearest-departure" }, { pageSize: 8 }),
      catalog.testimonials.listPublished({ featured: true }, { pageSize: 4 }),
      catalog.gallery.list({ featured: true }, { pageSize: 6 }),
      catalog.faqs.list(),
    ]);

  const featuredPackages = packagesResult.ok ? packagesResult.data.items.slice(0, 4) : [];
  const allPackages = packagesResult.ok ? packagesResult.data.items : [];

  const domesticPkg = allPackages.find(
    (pkg) => pkg.categoryId === listingPages.domestic.categoryId,
  );
  const internationalPkg = allPackages.find(
    (pkg) => pkg.categoryId === listingPages.international.categoryId,
  );

  const heroMediaItem =
    homepageResult.ok && homepageResult.data.heroMedia ? homepageResult.data.heroMedia : null;

  const heroMedia: HomeHeroMedia | null = heroMediaItem
    ? {
        src:
          heroMediaItem.mediaType === "video" && heroMediaItem.posterFile?.uri
            ? heroMediaItem.posterFile.uri
            : heroMediaItem.mediaFile.uri,
        alt: heroMediaItem.altText,
      }
    : null;

  return {
    hero: homeHero,
    heroMedia,
    trust: homeTrustStrip,
    values: homeValues,
    sectionCopy: homeSectionCopy,
    finalCta: homeFinalCta,
    featuredPackages,
    splitPanels: [
      {
        href: "/domestic",
        label: "Domestic Tours",
        ctaLabel: "View Domestic Tours",
        ...packageHeroImage(domesticPkg ?? featuredPackages[0]),
      },
      {
        href: "/international",
        label: "International Tours",
        ctaLabel: "View International Tours",
        ...packageHeroImage(internationalPkg ?? featuredPackages[1] ?? featuredPackages[0]),
      },
    ],
    testimonials: testimonialsResult.ok ? testimonialsResult.data.items : [],
    galleryItems: galleryResult.ok ? galleryResult.data.items : [],
    faqs: faqsResult.ok ? faqsResult.data.slice(0, 4) : [],
  };
}
