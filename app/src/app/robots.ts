import type { MetadataRoute } from "next";

import { getSiteBaseUrl } from "@/config/site";

/**
 * robots.txt — Document 03 §9 (Admin noindex) / Document 08 §4.15 indexing.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
