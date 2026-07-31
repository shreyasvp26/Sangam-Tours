import type { Destination, GalleryItem, PackageSummary } from "@/domain";
import { GALLERY_FILTER_MIN_ITEMS, galleryPageCopy } from "@/content/gallery";
import { getPublicCatalog } from "@/services/public-catalog";

export type GalleryPageItem = {
  id: string;
  mediaType: GalleryItem["mediaType"];
  /** Image URL or video poster. */
  src: string;
  videoSrc?: string;
  alt: string;
  caption?: string;
  destinationId?: string;
  destinationName?: string;
  packageId?: string;
  packageName?: string;
  packageSlug?: string;
};

export type GalleryFilterOption = {
  id: string;
  label: string;
};

export type GalleryPageData = {
  copy: typeof galleryPageCopy;
  items: GalleryPageItem[];
  destinations: GalleryFilterOption[];
  packages: GalleryFilterOption[];
  /** Document 04 §7 — filters only when the library warrants them. */
  showFilters: boolean;
};

function mapGalleryItem(
  item: GalleryItem,
  destinationsById: Map<string, Destination>,
  packagesById: Map<string, PackageSummary>,
): GalleryPageItem {
  const destination = item.destinationId ? destinationsById.get(item.destinationId) : undefined;
  const pkg = item.packageId ? packagesById.get(item.packageId) : undefined;
  const isVideo = item.mediaType === "video";

  return {
    id: item.id,
    mediaType: item.mediaType,
    src: isVideo ? (item.posterFile?.uri ?? item.mediaFile.uri) : item.mediaFile.uri,
    videoSrc: isVideo ? item.mediaFile.uri : undefined,
    alt: item.altText,
    caption: item.caption,
    destinationId: item.destinationId,
    destinationName: destination?.name,
    packageId: item.packageId,
    packageName: pkg?.name,
    packageSlug: pkg?.slug,
  };
}

/**
 * Assemble Gallery page data — Document 04 §7 / 09 Gallery list.
 */
export async function getGalleryPageData(): Promise<GalleryPageData> {
  const catalog = getPublicCatalog();

  const [galleryResult, destinationsResult, packagesResult] = await Promise.all([
    catalog.gallery.list({}, { pageSize: 50 }),
    catalog.destinations.list(),
    catalog.packages.listPublished({}, { pageSize: 50 }),
  ]);

  const destinations = destinationsResult.ok ? destinationsResult.data : [];
  const packages = packagesResult.ok ? packagesResult.data.items : [];
  const rawItems = galleryResult.ok ? galleryResult.data.items : [];

  const destinationsById = new Map(destinations.map((d) => [d.id, d]));
  const packagesById = new Map(packages.map((p) => [p.id, p]));

  const items = [...rawItems]
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((item) => mapGalleryItem(item, destinationsById, packagesById));

  const usedDestinationIds = new Set(items.map((i) => i.destinationId).filter(Boolean) as string[]);
  const usedPackageIds = new Set(items.map((i) => i.packageId).filter(Boolean) as string[]);

  const destinationOptions: GalleryFilterOption[] = destinations
    .filter((d) => usedDestinationIds.has(d.id))
    .map((d) => ({ id: d.id, label: d.name }));

  const packageOptions: GalleryFilterOption[] = packages
    .filter((p) => usedPackageIds.has(p.id))
    .map((p) => ({ id: p.id, label: p.name }));

  const showFilters =
    items.length >= GALLERY_FILTER_MIN_ITEMS &&
    (destinationOptions.length > 1 || packageOptions.length > 1);

  return {
    copy: galleryPageCopy,
    items,
    destinations: destinationOptions,
    packages: packageOptions,
    showFilters,
  };
}
