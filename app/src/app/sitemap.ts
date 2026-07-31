import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/metadata";
import { getPublicCatalog } from "@/services/public-catalog";

const STATIC_PATHS = [
  "/",
  "/about",
  "/domestic",
  "/international",
  "/gallery",
  "/testimonials",
  "/faq",
  "/contact",
  "/terms-and-conditions",
  "/privacy-policy",
  "/cancellation-and-refund-policy",
] as const;

/**
 * sitemap.xml — public IA routes (Document 03 §9) + published packages.
 * Admin is excluded (noindex).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = getPublicCatalog();
  const packagesResult = await catalog.packages.listPublished({}, { pageSize: 50 });
  const packageEntries: MetadataRoute.Sitemap = packagesResult.ok
    ? packagesResult.data.items.map((pkg) => ({
        url: absoluteUrl(`/packages/${pkg.slug}`),
        changeFrequency: "weekly",
        priority: 0.9,
      }))
    : [];

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority:
      path === "/"
        ? 1
        : path.startsWith("/domestic") || path.startsWith("/international")
          ? 0.85
          : 0.7,
  }));

  return [...staticEntries, ...packageEntries];
}
