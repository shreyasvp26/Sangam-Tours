import { PackageListingView } from "@/app/_listings/PackageListingView";
import { Page } from "@/components/layout";
import { listingPages } from "@/content/listings";
import { buildPageMetadata } from "@/lib/seo";
import { getListingPageData } from "@/services/listing-page";
import { siteConfig } from "@/config/site";

const content = listingPages.domestic;

export const metadata = buildPageMetadata({
  path: content.path,
  title: content.title,
  description: content.description,
});

/**
 * Domestic Tours listing — Document 03 §9 `/domestic`, Document 04 §4.
 */
export default async function DomesticListingPage() {
  const data = await getListingPageData("domestic");

  return (
    <Page aria-label={`${siteConfig.name} Domestic Tours`}>
      <PackageListingView content={data.content} packages={data.packages} />
    </Page>
  );
}
