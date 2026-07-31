/**
 * Page SEO metadata builders — Document 08 §4.15 / Document 10 §5.
 * Titles and descriptions stay human-first; never keyword-stuffed.
 */

import type { Metadata } from "next";

import { getSiteBaseUrl, siteConfig } from "@/config/site";

export type PageSeoInput = {
  /** Path starting with `/` (Document 03 §9). */
  path: string;
  title: string;
  description: string;
  /** Absolute or site-relative image URI for Open Graph / social share. */
  imageUrl?: string;
  imageAlt?: string;
  /** Document 08 indexing flag — default index. */
  indexing?: "index" | "no-index";
  /** When true, use title as absolute (home). */
  absoluteTitle?: boolean;
};

export function absoluteUrl(path: string): string {
  const base = getSiteBaseUrl();
  const normalised = path.startsWith("/") ? path : `/${path}`;
  if (normalised === "/") {
    return base;
  }
  return `${base}${normalised}`;
}

function resolveImageUrl(imageUrl?: string): string | undefined {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  return absoluteUrl(imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`);
}

/**
 * Build Next.js Metadata for a public page (Document 08 §4.15 fields).
 * Social share image maps to Open Graph; Twitter card mirrors the same fields.
 */
export function buildPageMetadata({
  path,
  title,
  description,
  imageUrl,
  imageAlt,
  indexing = "index",
  absoluteTitle = false,
}: PageSeoInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = resolveImageUrl(imageUrl);
  const robots =
    indexing === "no-index" ? { index: false, follow: false } : { index: true, follow: true };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    robots,
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: imageAlt ?? title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
