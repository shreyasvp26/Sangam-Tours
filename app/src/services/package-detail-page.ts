import type { PackageDetail } from "@/api/resources";
import type { Destination } from "@/domain";
import { listingPages, type ListingCategoryKey } from "@/content/listings";
import { resolveWithFallback } from "@/lib/transforms";
import { getPublicCatalog } from "@/services/public-catalog";

export type PackageDetailPageData = PackageDetail & {
  destinations: Destination[];
  /** Resolved destination labels for Quick Facts. */
  destinationsCoveredLabel: string;
  listingKey: ListingCategoryKey;
  listingPath: string;
  listingTitle: string;
};

function resolveListing(
  categoryId: string,
  categorySlug: string,
): {
  key: ListingCategoryKey;
  path: string;
  title: string;
} {
  if (categoryId === listingPages.international.categoryId || categorySlug === "international") {
    return {
      key: "international",
      path: listingPages.international.path,
      title: listingPages.international.title,
    };
  }

  return {
    key: "domestic",
    path: listingPages.domestic.path,
    title: listingPages.domestic.title,
  };
}

function formatDestinationsCovered(covered: Array<string>, destinations: Destination[]): string {
  const byId = new Map(destinations.map((d) => [d.id, d.name]));
  return covered
    .map((item) => byId.get(item) ?? item)
    .filter(Boolean)
    .join(", ");
}

/**
 * Assemble Package Detail page data — Document 04 §5 / 09 Package retrieve.
 * Returns null when the slug is missing or not publicly visible.
 */
export async function getPackageDetailPageData(
  slug: string,
): Promise<PackageDetailPageData | null> {
  const catalog = getPublicCatalog();
  const detailResult = await catalog.packages.getBySlug(slug);

  if (!detailResult.ok) {
    return null;
  }

  const detail = detailResult.data;

  const [testimonialsResult, faqsResult, destinationsResult] = await Promise.all([
    catalog.testimonials.listPublished({}, { pageSize: 12 }),
    catalog.faqs.list(),
    catalog.destinations.list(),
  ]);

  const generalTestimonials = testimonialsResult.ok
    ? testimonialsResult.data.items.filter((item) => !item.packageId)
    : [];
  const generalFaqs = faqsResult.ok ? faqsResult.data.filter((item) => !item.packageId) : [];
  const destinations = destinationsResult.ok ? destinationsResult.data : [];

  const listing = resolveListing(detail.category.id, detail.category.slug);

  return {
    ...detail,
    relatedPackages: detail.relatedPackages.slice(0, 4),
    testimonials: resolveWithFallback(detail.testimonials, generalTestimonials).slice(0, 3),
    faqs: resolveWithFallback(detail.faqs, generalFaqs).slice(0, 5),
    destinations,
    destinationsCoveredLabel: formatDestinationsCovered(
      detail.package.destinationsCovered,
      destinations,
    ),
    listingKey: listing.key,
    listingPath: listing.path,
    listingTitle: listing.title,
  };
}
