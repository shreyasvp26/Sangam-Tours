import type { PackageSummary } from "@/domain";
import type { ListingSortValue } from "@/content/listings";

export type ListingFilterState = {
  /** `YYYY-MM` or null for all months. */
  departureMonth: string | null;
  sort: ListingSortValue;
};

export function createDefaultListingFilters(): ListingFilterState {
  return {
    departureMonth: null,
    sort: "price-asc",
  };
}

export function listingFiltersActive(filters: ListingFilterState): boolean {
  return filters.departureMonth !== null;
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

/** Format an ISO date (YYYY-MM-DD) for package cards — e.g. "19 Aug 2026". */
export function formatNextDepartureLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function applyListingFilters(
  packages: PackageSummary[],
  filters: ListingFilterState,
): PackageSummary[] {
  let next = [...packages];

  if (filters.departureMonth) {
    next = next.filter((pkg) => pkg.nextDepartureDate?.slice(0, 7) === filters.departureMonth);
  }

  next.sort((a, b) => {
    switch (filters.sort) {
      case "price-desc":
        return b.priceAmount - a.priceAmount;
      case "price-asc":
      default:
        return a.priceAmount - b.priceAmount;
    }
  });

  return next;
}
