import { notFound } from "next/navigation";

import { PackageDetailView } from "@/app/_packages/PackageDetailView";
import { Page } from "@/components/layout";
import { JsonLdScript } from "@/components/seo";
import { siteConfig } from "@/config/site";
import { absoluteUrl, breadcrumbJsonLd, buildPageMetadata, tourPackageJsonLd } from "@/lib/seo";
import { getPackageDetailPageData } from "@/services/package-detail-page";
import { getPublicCatalog } from "@/services/public-catalog";

type PackageDetailPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Prebuild published package routes when the catalog has items (Document 12 §3.5).
 */
export async function generateStaticParams() {
  const catalog = getPublicCatalog();
  const result = await catalog.packages.listPublished({}, { pageSize: 50 });
  if (!result.ok) {
    return [];
  }
  return result.data.items.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: PackageDetailPageProps) {
  const { slug } = await params;
  const data = await getPackageDetailPageData(slug);

  if (!data) {
    return buildPageMetadata({
      path: `/packages/${slug}`,
      title: "Package not found",
      description: `That tour could not be found on ${siteConfig.name}.`,
      indexing: "no-index",
    });
  }

  const imageUrl = data.heroMedia.mediaFile.uri;
  const title = `${data.package.name} | ${data.listingTitle}`;

  return buildPageMetadata({
    path: `/packages/${data.package.slug}`,
    title,
    description: data.package.destinationSummary,
    imageUrl,
    imageAlt: data.heroMedia.altText,
  });
}

/**
 * Package Detail — Document 03 §9 `/packages/{slug}`, Document 04 §5.
 * One template for every package; section order is fixed.
 */
export default async function PackageDetailPage({ params }: PackageDetailPageProps) {
  const { slug } = await params;
  const data = await getPackageDetailPageData(slug);

  if (!data) {
    notFound();
  }

  const path = `/packages/${data.package.slug}`;
  const imageUrl = data.heroMedia.mediaFile.uri.startsWith("http")
    ? data.heroMedia.mediaFile.uri
    : absoluteUrl(data.heroMedia.mediaFile.uri);

  return (
    <Page aria-label={`${data.package.name} — ${siteConfig.name}`} className="pb-24 md:pb-0">
      <JsonLdScript
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: data.listingTitle, path: data.listingPath },
            { name: data.package.name, path },
          ]),
          tourPackageJsonLd({
            name: data.package.name,
            description: data.package.destinationSummary,
            path,
            imageUrl,
            priceAmount: data.package.priceAmount,
          }),
        ]}
      />
      <PackageDetailView data={data} />
    </Page>
  );
}
