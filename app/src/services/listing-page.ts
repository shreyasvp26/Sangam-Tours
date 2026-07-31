import type { PackageSummary } from "@/domain";
import { listingPages, type ListingCategoryKey, type ListingPageContent } from "@/content/listings";
import { getPublicCatalog } from "@/services/public-catalog";

export type ListingPageData = {
  content: ListingPageContent;
  packages: PackageSummary[];
};

/**
 * Assemble Domestic / International listing data via catalog ports (Document 09).
 */
export async function getListingPageData(key: ListingCategoryKey): Promise<ListingPageData> {
  const content = listingPages[key];
  const catalog = getPublicCatalog();

  const result = await catalog.packages.listPublished(
    {
      categoryId: content.categoryId,
      sort: "nearest-departure",
    },
    { pageSize: 50 },
  );

  return {
    content,
    packages: result.ok ? result.data.items : [],
  };
}
