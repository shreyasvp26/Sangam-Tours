import { describe, expect, it } from "vitest";

import { absoluteUrl, buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqPageJsonLd, organizationJsonLd } from "@/lib/seo/json-ld";

describe("SEO metadata builders", () => {
  it("builds absolute canonical URLs", () => {
    expect(absoluteUrl("/")).toMatch(/^https?:\/\//);
    expect(absoluteUrl("/about")).toMatch(/\/about$/);
  });

  it("includes title, description, canonical, and robots", () => {
    const meta = buildPageMetadata({
      path: "/contact",
      title: "Contact",
      description: "Reach Sangam Tours in Nagpur.",
    });
    expect(meta.title).toBe("Contact");
    expect(meta.description).toContain("Nagpur");
    expect(meta.alternates?.canonical).toMatch(/\/contact$/);
    expect(meta.robots).toEqual({ index: true, follow: true });
    expect(meta.openGraph?.url).toMatch(/\/contact$/);
  });

  it("supports noindex for missing packages", () => {
    const meta = buildPageMetadata({
      path: "/packages/missing",
      title: "Package not found",
      description: "Not found",
      indexing: "no-index",
    });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });
});

describe("JSON-LD builders", () => {
  it("emits TravelAgency organization data", () => {
    const org = organizationJsonLd();
    expect(org["@type"]).toBe("TravelAgency");
    expect(org.name).toBe("Sangam Tours");
  });

  it("returns null FAQ schema when empty (no fabricated Q&A)", () => {
    expect(faqPageJsonLd([])).toBeNull();
  });

  it("builds BreadcrumbList for package detail", () => {
    const crumbs = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Domestic Tours", path: "/domestic" },
      { name: "Leh", path: "/packages/leh" },
    ]);
    expect(crumbs["@type"]).toBe("BreadcrumbList");
    expect(Array.isArray(crumbs.itemListElement)).toBe(true);
    expect((crumbs.itemListElement as unknown[]).length).toBe(3);
  });
});
