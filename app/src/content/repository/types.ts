/**
 * Typed content repository — Document 08 shapes.
 * Adapters read from this; page services never import the repository directly.
 */

import type {
  Category,
  CompanyInformation,
  ContactOffice,
  Departure,
  Destination,
  Faq,
  GalleryItem,
  HeroBanner,
  HomepageSection,
  LegalDocument,
  NavigationItem,
  SocialLink,
  Testimonial,
  TourManager,
  TourPackage,
} from "@/domain";

export type ContentRepository = {
  categories: Category[];
  destinations: Destination[];
  packages: TourPackage[];
  departures: Departure[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  faqs: Faq[];
  tourManagers: TourManager[];
  company: CompanyInformation | null;
  offices: ContactOffice[];
  heroBanners: HeroBanner[];
  homepageSections: HomepageSection[];
  navigationItems: NavigationItem[];
  legalDocuments: LegalDocument[];
  socialLinks: SocialLink[];
};
