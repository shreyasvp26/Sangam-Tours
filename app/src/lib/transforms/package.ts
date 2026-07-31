import type { PackageId, PackageSummary, TourPackage } from "@/domain";

/**
 * Related packages — curated list, or same-category fallback (Document 08 §5).
 * Excludes the source package. Caps length for Related Packages sections.
 */
export function resolveRelatedPackages(input: {
  sourcePackageId: PackageId;
  curatedIds: PackageId[];
  /** Already-filtered published summaries in the same category (or broader catalog). */
  candidates: PackageSummary[];
  limit?: number;
}): PackageSummary[] {
  const limit = input.limit ?? 4;
  const byId = new Map(input.candidates.map((item) => [item.id, item]));

  if (input.curatedIds.length > 0) {
    return input.curatedIds
      .map((id) => byId.get(id))
      .filter((item): item is PackageSummary => Boolean(item))
      .filter((item) => item.id !== input.sourcePackageId)
      .slice(0, limit);
  }

  return input.candidates.filter((item) => item.id !== input.sourcePackageId).slice(0, limit);
}

/** Map a TourPackage + display fields into a listing summary. */
export function toPackageSummary(
  pkg: TourPackage,
  extras: Pick<PackageSummary, "heroMedia" | "nextDepartureDate" | "tag">,
): PackageSummary {
  return {
    id: pkg.id,
    name: pkg.name,
    slug: pkg.slug,
    categoryId: pkg.categoryId,
    duration: pkg.quickFacts.duration,
    priceAmount: pkg.priceAmount,
    priceCurrency: pkg.priceCurrency,
    priceQualifiers: pkg.priceQualifiers,
    nextDepartureDate: extras.nextDepartureDate,
    heroMedia: extras.heroMedia,
    tag: extras.tag,
  };
}
