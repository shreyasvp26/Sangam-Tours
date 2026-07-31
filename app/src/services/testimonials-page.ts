import type { PackageSummary, Testimonial } from "@/domain";
import { testimonialsPageCopy } from "@/content/testimonials";
import { getPublicCatalog } from "@/services/public-catalog";

export type TestimonialsPageItem = Testimonial & {
  packageLabel?: string;
};

export type TestimonialsPageData = {
  copy: typeof testimonialsPageCopy;
  featured: TestimonialsPageItem[];
  rest: TestimonialsPageItem[];
  withVideo: TestimonialsPageItem[];
};

function withPackageLabel(
  item: Testimonial,
  packagesById: Map<string, PackageSummary>,
): TestimonialsPageItem {
  const pkg = item.packageId ? packagesById.get(item.packageId) : undefined;
  return {
    ...item,
    packageLabel: pkg?.name,
  };
}

/**
 * Assemble Testimonials page data — Document 04 §8 / 09 Testimonials list.
 * Never fabricates quotes (Document 08 §11 rule 10 / 06 §5).
 */
export async function getTestimonialsPageData(): Promise<TestimonialsPageData> {
  const catalog = getPublicCatalog();

  const [testimonialsResult, packagesResult] = await Promise.all([
    catalog.testimonials.listPublished({}, { pageSize: 50 }),
    catalog.packages.listPublished({}, { pageSize: 50 }),
  ]);

  const packages = packagesResult.ok ? packagesResult.data.items : [];
  const packagesById = new Map(packages.map((p) => [p.id, p]));

  const all = (testimonialsResult.ok ? testimonialsResult.data.items : [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((item) => withPackageLabel(item, packagesById));

  const featured = all.filter((item) => item.featured).slice(0, 3);
  const featuredIds = new Set(featured.map((item) => item.id));
  const rest = all.filter((item) => !featuredIds.has(item.id));
  const withVideo = all.filter((item) => Boolean(item.video?.uri));

  return {
    copy: testimonialsPageCopy,
    featured,
    rest,
    withVideo,
  };
}
