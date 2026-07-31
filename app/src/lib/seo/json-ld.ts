/**
 * JSON-LD helpers — structured data supporting Document 10 §5 (local SEO,
 * breadcrumbs on Package Detail per Document 03 §4.7).
 */

import { getSiteBaseUrl, siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/metadata";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: getSiteBaseUrl(),
    email: siteConfig.email,
    telephone: siteConfig.primaryPhone.label,
    foundingDate: String(siteConfig.foundingYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.offices.nagpur.addressLines.slice(0, 3).join(", "),
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      postalCode: "440012",
      addressCountry: "IN",
    },
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteBaseUrl(),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

/** LocalBusiness for confirmed Nagpur office only (Document 10 §5.9 / 01 rule 12). */
export function localBusinessJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: absoluteUrl("/contact"),
    email: siteConfig.email,
    telephone: siteConfig.primaryPhone.label,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.offices.nagpur.addressLines.slice(0, 3).join(", "),
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      postalCode: "440012",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  };
}

export type BreadcrumbJsonLdItem = {
  name: string;
  path: string;
};

/** BreadcrumbList — Package Detail only (Document 03 §4.7 / §13 rule 11). */
export function breadcrumbJsonLd(items: BreadcrumbJsonLdItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type FaqJsonLdItem = {
  question: string;
  answer: string;
};

export function faqPageJsonLd(faqs: FaqJsonLdItem[]): JsonLd | null {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function tourPackageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  imageUrl?: string;
  priceAmount?: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    ...(input.imageUrl ? { image: input.imageUrl } : {}),
    provider: {
      "@type": "TravelAgency",
      name: siteConfig.name,
      url: getSiteBaseUrl(),
    },
    ...(typeof input.priceAmount === "number"
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: input.priceAmount,
            url: absoluteUrl(input.path),
          },
        }
      : {}),
  };
}
