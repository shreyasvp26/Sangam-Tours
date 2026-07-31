/**
 * Listing page editorial copy — Document 04 §4 / 03 §9.
 * Domestic and International share one template; only title/context differ.
 */

export type ListingCategoryKey = "domestic" | "international";

export type ListingPageContent = {
  key: ListingCategoryKey;
  /** URL segment — Document 03 §9. */
  path: `/${ListingCategoryKey}`;
  title: string;
  description: string;
  /**
   * Stable Category id for catalog filters (Document 08 §4.1).
   * Resolved by the CMS adapter when content is connected.
   */
  categoryId: string;
};

export const listingPages: Record<ListingCategoryKey, ListingPageContent> = {
  domestic: {
    key: "domestic",
    path: "/domestic",
    title: "Domestic Tours",
    description:
      "Fixed-departure group tours across India — clear inclusions, a Tour Manager on every trip, and dates you can plan around.",
    categoryId: "category-domestic",
  },
  international: {
    key: "international",
    path: "/international",
    title: "International Tours",
    description:
      "Passport-ready group departures with the same care at home — transparent pricing and on-ground support throughout.",
    categoryId: "category-international",
  },
};

/** Destination-type filter chips — Document 04 §4 / 03 §4.2. */
export const destinationTypeFilters = [
  { value: "hills", label: "Hills" },
  { value: "coast", label: "Coast" },
  { value: "pilgrimage", label: "Pilgrimage" },
] as const;

export type DestinationTypeFilter = (typeof destinationTypeFilters)[number]["value"];

export const listingSortOptions = [
  { value: "nearest-departure", label: "Soonest departure" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export type ListingSortValue = (typeof listingSortOptions)[number]["value"];
