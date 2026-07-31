import { PackageListingView } from "@/app/_listings/PackageListingView";
import { Page } from "@/components/layout";
import { listingPages } from "@/content/listings";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { getListingPageData } from "@/services/listing-page";

const content = listingPages.international;

export const metadata = buildPageMetadata({
  path: content.path,
  title: content.title,
  description: content.description,
});

/**
 * International Tours listing — Document 03 §9 `/international`, Document 04 §4.
 */
export default async function InternationalListingPage() {
  const data = await getListingPageData("international");

  return (
    <Page aria-label={`${siteConfig.name} International Tours`}>
      <PackageListingView content={data.content} packages={data.packages} />
    </Page>
  );
}
