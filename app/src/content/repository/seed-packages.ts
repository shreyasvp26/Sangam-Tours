/**
 * Package catalogue seed — Website requirements.pdf §4 + IA §3.2.
 * Prices, dates, destinations, and inclusions come only from confirmed sources.
 * Itinerary days map 1:1 to listed destinations (no invented activities).
 */

import { listingPages } from "@/content/listings";
import type { Departure, Destination, GalleryItem, TourPackage } from "@/domain";

const DOMESTIC = listingPages.domestic.categoryId;
const INTERNATIONAL = listingPages.international.categoryId;

type SeedPackageDef = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  destinations: string[];
  priceAmount: number;
  priceQualifiers?: string;
  duration: string;
  overview: string;
  highlights: string[];
  includedList: string[];
  excludedList: string[];
  startDate: string;
  endDate: string;
  /** Honest alt for the actual photo file, not the package destination claim. */
  imageAlt: string;
};

const sharedDomesticIncluded = [
  "Accommodation",
  "Meals",
  "Transportation",
  "1L water bottle (daily)",
  "Tour Manager",
] as const;

const sharedDomesticExcluded = [
  "Sightseeing / entry tickets",
  "Flight tickets",
  "Personal expenses",
  "Travel insurance (if applicable)",
  "Any services not specifically mentioned under Included",
] as const;

const sharedInternationalExcluded = [
  "Personal expenses",
  "Travel insurance (if applicable)",
  "Any services not specifically mentioned under Included",
] as const;

const PACKAGE_DEFS: SeedPackageDef[] = [
  {
    id: "pkg-leh-ladakh",
    name: "Leh Ladakh",
    slug: "leh-ladakh",
    categoryId: DOMESTIC,
    destinations: ["Srinagar", "Kargil", "Leh", "Nubra Valley", "Pangong Lake"],
    priceAmount: 42000,
    priceQualifiers: "+ Airfare",
    duration: "10 days",
    overview:
      "A fixed-departure high-altitude circuit covering Srinagar, Kargil, Leh, Nubra Valley, and Pangong Lake — with permits, oxygen support where applicable, and a Tour Manager on the trip.",
    highlights: [
      "Srinagar to Pangong Lake circuit",
      "All required permits included",
      "Oxygen cylinder where applicable",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [
      ...sharedDomesticIncluded,
      "All required permits & oxygen cylinder (where applicable)",
      "Sightseeing charges",
    ],
    excludedList: [
      "Flight tickets",
      "Personal expenses",
      "Travel insurance (if applicable)",
      "Any services not specifically mentioned under Included",
    ],
    startDate: "2026-07-15",
    endDate: "2026-07-24",
    imageAlt: "Sangam Tours group at a high-altitude mountain tunnel entrance",
  },
  {
    id: "pkg-konkan-monsoon",
    name: "Konkan Monsoon",
    slug: "konkan-monsoon",
    categoryId: DOMESTIC,
    destinations: [
      "Kolhapur",
      "Tarkarli",
      "Pawas",
      "Ratnagiri",
      "Ganpatipule",
      "Guhagar",
      "Harihareshwar",
      "Diveagar",
    ],
    priceAmount: 26000,
    priceQualifiers: "+ GST",
    duration: "8 days",
    overview:
      "A coastal Maharashtra monsoon circuit from Kolhapur through Tarkarli, Ratnagiri, Ganpatipule, and Diveagar — with home-style meals, 3AC train, and a Tour Manager on every day of the trip.",
    highlights: [
      "Konkan coast stops including Tarkarli and Ganpatipule",
      "3AC train ticket included",
      "Home-style meals on the road",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [...sharedDomesticIncluded, "3AC train ticket"],
    excludedList: [...sharedDomesticExcluded],
    startDate: "2026-08-08",
    endDate: "2026-08-15",
    imageAlt: "Sangam Tours group standing in the shallow sea at a beach",
  },
  {
    id: "pkg-goa-special",
    name: "Goa Special",
    slug: "goa-special",
    categoryId: DOMESTIC,
    destinations: ["North Goa", "South Goa", "Mandovi River Cruise"],
    priceAmount: 20000,
    priceQualifiers: "+ GST",
    duration: "6 days",
    overview:
      "A compact Goa group departure covering North and South Goa with a Mandovi River Cruise — accommodation, meals, 3AC train, and a Tour Manager included.",
    highlights: [
      "North Goa and South Goa coverage",
      "Mandovi River Cruise included",
      "3AC train ticket included",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [...sharedDomesticIncluded, "3AC train ticket", "Mandovi River Cruise"],
    excludedList: [...sharedDomesticExcluded],
    startDate: "2026-08-19",
    endDate: "2026-08-24",
    imageAlt: "Sangam Tours group standing in the shallow sea at a beach",
  },
  {
    id: "pkg-south-india",
    name: "South India",
    slug: "south-india",
    categoryId: DOMESTIC,
    destinations: ["Ooty", "Mysore", "Kodaikanal", "Coorg"],
    priceAmount: 40000,
    priceQualifiers: "+ GST",
    duration: "10 days",
    overview:
      "A hill-station circuit through Ooty, Mysore, Kodaikanal, and Coorg — paced for families, with 3AC train, meals, and a Tour Manager on the trip.",
    highlights: [
      "Ooty, Mysore, Kodaikanal, and Coorg",
      "3AC train ticket included",
      "Family-paced hill itinerary",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [...sharedDomesticIncluded, "3AC train ticket"],
    excludedList: [...sharedDomesticExcluded],
    startDate: "2026-09-01",
    endDate: "2026-09-10",
    imageAlt: "Sangam Tours group in a temple courtyard",
  },
  {
    id: "pkg-ayodhya-yatra",
    name: "Ayodhya Yatra",
    slug: "ayodhya-yatra",
    categoryId: DOMESTIC,
    destinations: ["Chitrakoot", "Prayagraj", "Varanasi", "Ayodhya"],
    priceAmount: 25000,
    priceQualifiers: "+ GST",
    duration: "7 days",
    overview:
      "A pilgrimage circuit covering Chitrakoot, Prayagraj, Varanasi, and Ayodhya — comfortable pacing, 3AC train, meals, and a Tour Manager throughout.",
    highlights: [
      "Chitrakoot, Prayagraj, Varanasi, and Ayodhya",
      "3AC train ticket included",
      "Comfortable pilgrimage pacing",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [...sharedDomesticIncluded, "3AC train ticket"],
    excludedList: [...sharedDomesticExcluded],
    startDate: "2026-09-27",
    endDate: "2026-10-03",
    imageAlt: "Sangam Tours group posing outside a temple complex",
  },
  {
    id: "pkg-andaman",
    name: "Andaman",
    slug: "andaman",
    categoryId: DOMESTIC,
    destinations: [
      "Cellular Jail",
      "Corbyn's Cove Beach",
      "Havelock Island",
      "Neil Island",
      "North Bay Island",
      "Ross Island",
      "Baratang",
    ],
    priceAmount: 35000,
    priceQualifiers: "+ GST",
    duration: "6 days",
    overview:
      "An Andaman Islands group departure covering Cellular Jail, Corbyn's Cove, Havelock, Neil, North Bay, Ross Island, and Baratang — with meals, transport, and a Tour Manager.",
    highlights: [
      "Havelock and Neil Island stops",
      "Cellular Jail and Ross Island",
      "Island circuit with Tour Manager",
      "Meals and transport included",
    ],
    includedList: [...sharedDomesticIncluded],
    excludedList: [...sharedDomesticExcluded],
    startDate: "2026-10-02",
    endDate: "2026-10-07",
    imageAlt: "Sangam Tours group standing in the shallow sea at a beach",
  },
  {
    id: "pkg-kerala-kanyakumari-rameshwaram",
    name: "Kerala • Kanyakumari • Rameshwaram",
    slug: "kerala-kanyakumari-rameshwaram",
    categoryId: DOMESTIC,
    destinations: [
      "Ernakulam",
      "Munnar",
      "Thekkady",
      "Madurai",
      "Kanyakumari",
      "Rameshwaram",
      "Alleppey",
      "Trivandrum",
    ],
    priceAmount: 41000,
    priceQualifiers: "+ GST",
    duration: "12 days",
    overview:
      "A South India circuit from Ernakulam through Munnar, Thekkady, Madurai, Kanyakumari, Rameshwaram, Alleppey, and Trivandrum — with 3AC train, meals, and a Tour Manager.",
    highlights: [
      "Munnar, Thekkady, and Alleppey",
      "Kanyakumari and Rameshwaram",
      "3AC train ticket included",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [...sharedDomesticIncluded, "3AC train ticket"],
    excludedList: [...sharedDomesticExcluded],
    startDate: "2026-10-22",
    endDate: "2026-11-02",
    imageAlt: "Sangam Tours group in front of a temple with traditional architecture",
  },
  {
    id: "pkg-rajasthan",
    name: "Rajasthan",
    slug: "rajasthan",
    categoryId: DOMESTIC,
    destinations: [
      "Jaipur",
      "Pushkar",
      "Chittorgarh",
      "Udaipur",
      "Jodhpur",
      "Bikaner",
      "Jaisalmer",
      "Sam Sand Dunes",
      "Mount Abu",
    ],
    priceAmount: 43000,
    priceQualifiers: "+ GST",
    duration: "12 days",
    overview:
      "A Rajasthan circuit covering Jaipur, Pushkar, Chittorgarh, Udaipur, Jodhpur, Bikaner, Jaisalmer, Sam Sand Dunes, and Mount Abu — with 3AC train, meals, and a Tour Manager.",
    highlights: [
      "Jaipur, Udaipur, Jodhpur, and Jaisalmer",
      "Sam Sand Dunes stop",
      "3AC train ticket included",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [...sharedDomesticIncluded, "3AC train ticket"],
    excludedList: [...sharedDomesticExcluded],
    startDate: "2026-10-22",
    endDate: "2026-11-02",
    imageAlt: "Sangam Tours group on sand dunes during a desert safari",
  },
  {
    id: "pkg-vietnam-bali",
    name: "Vietnam & Bali",
    slug: "vietnam-bali",
    categoryId: INTERNATIONAL,
    destinations: ["Hanoi", "Halong Bay", "Da Nang", "Ho Chi Minh City", "Bali"],
    priceAmount: 199999,
    priceQualifiers: "+ GST",
    duration: "11 days",
    overview:
      "An international group departure through Hanoi, Halong Bay, Da Nang, Ho Chi Minh City, and Bali — air tickets and entry tickets included, with a Tour Manager throughout.",
    highlights: [
      "Vietnam cities plus Halong Bay",
      "Bali included in the same departure",
      "Air tickets and entry tickets included",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [...sharedDomesticIncluded, "Air tickets", "Entry tickets"],
    excludedList: [...sharedInternationalExcluded],
    startDate: "2026-09-27",
    endDate: "2026-10-07",
    imageAlt: "Sangam Tours group standing in the shallow sea at a beach",
  },
  {
    id: "pkg-singapore-thailand-malaysia",
    name: "Singapore • Thailand • Malaysia",
    slug: "singapore-thailand-malaysia",
    categoryId: INTERNATIONAL,
    destinations: ["Pattaya", "Bangkok", "Kuala Lumpur", "Singapore"],
    priceAmount: 185000,
    priceQualifiers: "+ GST",
    duration: "12 days",
    overview:
      "A Southeast Asia circuit covering Pattaya, Bangkok, Kuala Lumpur, and Singapore — air ticket and entry tickets included, with a Tour Manager on the trip.",
    highlights: [
      "Pattaya and Bangkok",
      "Kuala Lumpur and Singapore",
      "Air ticket and entry tickets included",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [...sharedDomesticIncluded, "Air ticket", "Entry ticket"],
    excludedList: [...sharedInternationalExcluded],
    startDate: "2026-09-27",
    endDate: "2026-10-08",
    imageAlt: "Sangam Tours group in front of a temple in Bangkok",
  },
  {
    id: "pkg-bhutan",
    name: "Bhutan",
    slug: "bhutan",
    categoryId: INTERNATIONAL,
    destinations: ["Phuentsholing", "Paro", "Thimphu", "Punakha"],
    priceAmount: 40500,
    priceQualifiers: "+ GST",
    duration: "10 days",
    overview:
      "A Bhutan group departure covering Phuentsholing, Paro, Thimphu, and Punakha — accommodation, meals, transport, and a Tour Manager included.",
    highlights: [
      "Paro, Thimphu, and Punakha",
      "Phuentsholing entry corridor",
      "Meals and transport included",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [...sharedDomesticIncluded],
    excludedList: [
      "Sightseeing / entry tickets",
      "Flight tickets",
      "Personal expenses",
      "Travel insurance (if applicable)",
      "Any services not specifically mentioned under Included",
    ],
    startDate: "2026-10-26",
    endDate: "2026-11-04",
    imageAlt: "Sangam Tours group outside a monastery in the hills of Bhutan",
  },
  {
    id: "pkg-nepal",
    name: "Nepal",
    slug: "nepal",
    categoryId: INTERNATIONAL,
    destinations: ["Lumbini", "Pokhara", "Kathmandu", "Chitwan", "Janakpur"],
    priceAmount: 38000,
    priceQualifiers: "+ GST",
    duration: "11 days",
    overview:
      "A Nepal circuit covering Lumbini, Pokhara, Kathmandu, Chitwan, and Janakpur — with 3AC train, meals, transport, and a Tour Manager.",
    highlights: [
      "Kathmandu, Pokhara, and Lumbini",
      "Chitwan and Janakpur stops",
      "3AC train ticket included",
      "Dedicated Tour Manager throughout",
    ],
    includedList: [...sharedDomesticIncluded, "3AC train ticket"],
    excludedList: [
      "Sightseeing / entry tickets",
      "Flight tickets",
      "Personal expenses",
      "Travel insurance (if applicable)",
      "Any services not specifically mentioned under Included",
    ],
    startDate: "2026-11-27",
    endDate: "2026-12-07",
    imageAlt: "Sangam Tours group in front of a hillside monastery",
  },
];

function slugifyDestination(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function departureStatusFor(endDate: string, today = "2026-08-10"): "upcoming" | "completed" {
  return endDate < today ? "completed" : "upcoming";
}

/** Destinations referenced by the seeded packages. */
export function seedPackageDestinations(): Destination[] {
  const seen = new Map<string, Destination>();
  for (const pkg of PACKAGE_DEFS) {
    for (const name of pkg.destinations) {
      const id = `dest-${slugifyDestination(name)}`;
      if (!seen.has(id)) {
        seen.set(id, { id, name, slug: slugifyDestination(name) });
      }
    }
  }
  return [...seen.values()];
}

/** One published hero gallery item per package. */
export function seedPackageGalleryItems(): GalleryItem[] {
  return PACKAGE_DEFS.map((pkg, index) => ({
    id: `gallery-hero-${pkg.slug}`,
    mediaType: "image" as const,
    mediaFile: { uri: `/packages/${pkg.slug}.jpg`, mimeType: "image/jpeg" },
    altText: pkg.imageAlt,
    caption: pkg.name,
    packageId: pkg.id,
    featured: index < 6,
    displayOrder: index + 1,
    status: "published" as const,
  }));
}

/** One departure window per package from the requirements PDF (year 2026). */
export function seedPackageDepartures(): Departure[] {
  return PACKAGE_DEFS.map((pkg) => ({
    id: `dep-${pkg.slug}-2026`,
    packageId: pkg.id,
    startDate: pkg.startDate,
    endDate: pkg.endDate,
    status: departureStatusFor(pkg.endDate),
  }));
}

/** All twelve published tour packages. */
export function seedTourPackages(): TourPackage[] {
  return PACKAGE_DEFS.map((pkg) => ({
    id: pkg.id,
    name: pkg.name,
    slug: pkg.slug,
    categoryId: pkg.categoryId,
    destinationSummary: pkg.destinations.join(", "),
    destinationsCovered: pkg.destinations,
    priceAmount: pkg.priceAmount,
    priceCurrency: "INR" as const,
    priceQualifiers: pkg.priceQualifiers,
    quickFacts: {
      duration: pkg.duration,
      groupType: "Families & mixed groups",
      departureCity: "Nagpur",
    },
    overview: pkg.overview,
    highlights: pkg.highlights,
    itinerary: pkg.destinations.map((place, index) => ({
      dayNumber: index + 1,
      title: place,
      description: `Stop in ${place} as part of this ${pkg.name} circuit.`,
    })),
    includedList: pkg.includedList,
    excludedList: pkg.excludedList,
    galleryItemIds: [`gallery-hero-${pkg.slug}`],
    testimonialIds: [],
    faqIds: [],
    departureIds: [`dep-${pkg.slug}-2026`],
    relatedPackageIds: [],
    heroMediaId: `gallery-hero-${pkg.slug}`,
    seoMetadataId: `seo-${pkg.slug}`,
    status: "published" as const,
    slugLocked: true,
  }));
}
