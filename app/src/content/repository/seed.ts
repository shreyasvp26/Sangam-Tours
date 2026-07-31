/**
 * Confirmed structural seeds only — Document 08 / siteConfig / About brand content.
 * No packages, testimonials, gallery, FAQs, legal bodies, or tour managers.
 */

import { aboutCompanyRecord } from "@/content/about";
import { listingPages } from "@/content/listings";
import type { ContentRepository } from "@/content/repository/types";
import { drawerOnlyNav, primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { Category, ContactOffice, NavigationItem } from "@/domain";

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
    },
    {
      id: "office-akola",
      officeName: siteConfig.offices.akola.name,
      addressLines: [...siteConfig.offices.akola.addressLines],
      addressStatus: siteConfig.offices.akola.status,
      phoneNumbers: siteConfig.phones.map((phone) => phone.label),
      email: siteConfig.email,
      businessHours: { ...siteConfig.businessHours },
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

/** Build the local repository from confirmed structural sources only. */
export function buildSeedRepository(): ContentRepository {
  return {
    categories: seedCategories(),
    destinations: [],
    packages: [],
    departures: [],
    galleryItems: [],
    testimonials: [],
    faqs: [],
    tourManagers: [],
    company: aboutCompanyRecord,
    offices: seedOffices(),
    heroBanners: [],
    homepageSections: [],
    navigationItems: seedNavigation(),
    legalDocuments: [],
    socialLinks: [],
  };
}
