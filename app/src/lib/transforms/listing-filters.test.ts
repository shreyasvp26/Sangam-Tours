import { describe, expect, it } from "vitest";

import {
  applyListingFilters,
  collectDepartureMonths,
  createDefaultListingFilters,
  formatDepartureMonthLabel,
  listingFiltersActive,
} from "@/lib/transforms/listing-filters";
import { formatInrAmount, formatPriceDisplay } from "@/lib/transforms/price";
import type { PackageSummary } from "@/domain";

function summary(
  partial: Partial<PackageSummary> & Pick<PackageSummary, "id" | "name">,
): PackageSummary {
  return {
    id: partial.id,
    name: partial.name,
    slug: partial.slug ?? partial.id,
    categoryId: partial.categoryId ?? "cat-domestic",
    duration: partial.duration ?? "5D/4N",
    priceAmount: partial.priceAmount ?? 25000,
    priceCurrency: "INR",
    priceQualifiers: partial.priceQualifiers,
    nextDepartureDate: partial.nextDepartureDate,
    heroMedia: partial.heroMedia ?? {
      id: `media-${partial.id}`,
      mediaType: "image",
      mediaFile: { uri: "/brand/logo.png", mimeType: "image/png" },
      altText: "Placeholder",
    },
    tag: partial.tag,
  };
}

describe("price formatting", () => {
  it("formats INR without inventing decimals", () => {
    expect(formatInrAmount(24999)).toMatch(/₹/);
    expect(formatInrAmount(24999)).toContain("24,999");
  });

  it("appends qualifiers when present", () => {
    expect(formatPriceDisplay(19999, "per person")).toContain("per person");
    expect(formatPriceDisplay(19999)).not.toContain("per person");
  });
});

describe("listing filters", () => {
  const packages = [
    summary({
      id: "p1",
      name: "Hills",
      tag: "Hill Station",
      priceAmount: 30000,
      nextDepartureDate: "2026-09-15",
    }),
    summary({
      id: "p2",
      name: "Beach",
      tag: "Coast",
      priceAmount: 20000,
      nextDepartureDate: "2026-08-01",
    }),
    summary({
      id: "p3",
      name: "Temple",
      tag: "Pilgrimage",
      priceAmount: 15000,
      nextDepartureDate: "2026-09-01",
    }),
  ];

  it("defaults are inactive", () => {
    expect(listingFiltersActive(createDefaultListingFilters())).toBe(false);
  });

  it("filters by destination type aliases", () => {
    const filtered = applyListingFilters(packages, {
      ...createDefaultListingFilters(),
      destinationType: "hills",
    });
    expect(filtered.map((p) => p.id)).toEqual(["p1"]);
  });

  it("filters by departure month and sorts by price", () => {
    const filtered = applyListingFilters(packages, {
      destinationType: null,
      departureMonth: "2026-09",
      sort: "price-asc",
    });
    expect(filtered.map((p) => p.id)).toEqual(["p3", "p1"]);
  });

  it("collects unique departure months", () => {
    expect(collectDepartureMonths(packages)).toEqual(["2026-08", "2026-09"]);
    expect(formatDepartureMonthLabel("2026-08")).toMatch(/August/);
  });
});
