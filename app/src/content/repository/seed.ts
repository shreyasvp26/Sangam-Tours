/**
 * Confirmed structural seeds + package catalogue from Website requirements.pdf.
 * FAQs are seeded from requirements, Terms §11, and documented customer concerns.
 * Testimonials and tour managers remain empty until supplied.
 * Terms & Conditions are seeded from Website requirements.pdf §11.
 */

import { aboutCompanyRecord } from "@/content/about";
import { listingPages } from "@/content/listings";
import { seedFaqs } from "@/content/repository/seed-faqs";
import {
  seedPackageDepartures,
  seedPackageDestinations,
  seedPackageGalleryItems,
  seedTourPackages,
} from "@/content/repository/seed-packages";
import type { ContentRepository } from "@/content/repository/types";
import { termsAndConditionsMeta } from "@/content/terms-and-conditions";
import { drawerOnlyNav, primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { Category, ContactOffice, LegalDocument, NavigationItem } from "@/domain";

function seedCategories(): Category[] {
  return [
    {
      id: listingPages.domestic.categoryId,
      name: "Domestic Tours",
      slug: "domestic",
      description: listingPages.domestic.description,
    },
    {
      id: listingPages.international.categoryId,
      name: "International Tours",
      slug: "international",
      description: listingPages.international.description,
    },
  ];
}

function seedOffices(): ContactOffice[] {
  return [
    {
      id: "office-nagpur",
      officeName: siteConfig.offices.nagpur.name,
      addressLines: [...siteConfig.offices.nagpur.addressLines],
      addressStatus: siteConfig.offices.nagpur.status,
      phoneNumbers: siteConfig.phones.map((phone) => phone.label),
      email: siteConfig.email,
      businessHours: { ...siteConfig.businessHours },
      googleMapsUrl: siteConfig.offices.nagpur.googleMapsEmbedUrl,
    },
    {
      id: "office-akola",
      officeName: siteConfig.offices.akola.name,
      addressLines: [...siteConfig.offices.akola.addressLines],
      addressStatus: siteConfig.offices.akola.status,
      phoneNumbers: siteConfig.phones.map((phone) => phone.label),
      email: siteConfig.email,
      businessHours: { ...siteConfig.businessHours },
      googleMapsUrl: siteConfig.offices.akola.googleMapsEmbedUrl,
    },
  ];
}

function seedNavigation(): NavigationItem[] {
  const primary: NavigationItem[] = primaryNav.map((item, index) => ({
    id: `nav-primary-${index + 1}`,
    label: item.label,
    targetRoute: item.href,
    placement: "header",
    displayOrder: index + 1,
    active: true,
  }));

  const drawer: NavigationItem[] = drawerOnlyNav.map((item, index) => ({
    id: `nav-drawer-${index + 1}`,
    label: item.label,
    targetRoute: item.href,
    placement: "drawer-only",
    displayOrder: primaryNav.length + index + 1,
    active: true,
  }));

  return [...primary, ...drawer];
}

function seedLegalDocuments(): LegalDocument[] {
  return [
    {
      id: "legal-terms-and-conditions",
      documentType: "terms-and-conditions",
      title: termsAndConditionsMeta.title,
      bodyContent: termsAndConditionsMeta.intro,
      lastUpdatedDate: termsAndConditionsMeta.lastUpdatedDate,
    },
  ];
}

/** Build the local repository from confirmed structural sources + package catalogue. */
export function buildSeedRepository(): ContentRepository {
  return {
    categories: seedCategories(),
    destinations: seedPackageDestinations(),
    packages: seedTourPackages(),
    departures: seedPackageDepartures(),
    galleryItems: seedPackageGalleryItems(),
    testimonials: [],
    faqs: seedFaqs(),
    tourManagers: [],
    company: aboutCompanyRecord,
    offices: seedOffices(),
    heroBanners: [],
    homepageSections: [],
    navigationItems: seedNavigation(),
    legalDocuments: seedLegalDocuments(),
    socialLinks: [],
  };
}
