import type { PackageSummary } from "@/domain";
import type { DestinationTypeFilter, ListingSortValue } from "@/content/listings";

export type ListingFilterState = {
  destinationType: DestinationTypeFilter | null;
  /** `YYYY-MM` or null for all months. */
  departureMonth: string | null;
  sort: ListingSortValue;
};

export function createDefaultListingFilters(): ListingFilterState {
  return {
    destinationType: null,
    departureMonth: null,
    sort: "nearest-departure",
  };
}

export function listingFiltersActive(filters: ListingFilterState): boolean {
  return filters.destinationType !== null || filters.departureMonth !== null;
}

/** Unique departure months (YYYY-MM) from package next dates, ascending. */
export function collectDepartureMonths(packages: PackageSummary[]): string[] {
  const months = new Set<string>();
  for (const pkg of packages) {
    if (!pkg.nextDepartureDate) continue;
    const month = pkg.nextDepartureDate.slice(0, 7);
    if (/^\d{4}-\d{2}$/.test(month)) {
      months.add(month);
    }
  }
  return [...months].sort();
}

export function formatDepartureMonthLabel(ym: string): string {
  const [year, month] = ym.split("-").map(Number);
  if (!year || !month) return ym;
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function tagMatchesType(tag: string | undefined, type: DestinationTypeFilter): boolean {
  if (!tag) return false;
  const normalized = tag.trim().toLowerCase();
  const aliases: Record<DestinationTypeFilter, string[]> = {
    hills: ["hills", "hill", "hill station", "mountain", "mountains"],
    coast: ["coast", "coastal", "beach", "beaches", "konkan"],
    pilgrimage: ["pilgrimage", "pilgrim", "temple", "spiritual"],
  };
  return aliases[type].some((alias) => normalized === alias || normalized.includes(alias));
}

export function applyListingFilters(
  packages: PackageSummary[],
  filters: ListingFilterState,
): PackageSummary[] {
  let next = [...packages];

  if (filters.destinationType) {
    next = next.filter((pkg) => tagMatchesType(pkg.tag, filters.destinationType!));
  }

  if (filters.departureMonth) {
    next = next.filter((pkg) => pkg.nextDepartureDate?.slice(0, 7) === filters.departureMonth);
  }

  next.sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.priceAmount - b.priceAmount;
      case "price-desc":
        return b.priceAmount - a.priceAmount;
      case "nearest-departure":
      default: {
        const aDate = a.nextDepartureDate ?? "9999-12-31";
        const bDate = b.nextDepartureDate ?? "9999-12-31";
        return aDate.localeCompare(bDate);
      }
    }
  });

  return next;
}
