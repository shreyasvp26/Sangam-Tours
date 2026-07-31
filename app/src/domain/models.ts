import type {
  AddressStatus,
  ContentStatus,
  DepartureStatus,
  EnquiryStatus,
  FaqCategory,
  HeroOwnerKind,
  HomepageSectionType,
  IndexingFlag,
  LegalDocumentType,
  MediaType,
  NavPlacement,
  SeoOwnerKind,
} from "@/domain/enums";
import type {
  CategoryId,
  CompanyId,
  ContactOfficeId,
  DepartureId,
  DestinationId,
  EnquiryId,
  FaqId,
  FooterSectionId,
  GalleryItemId,
  HeroBannerId,
  HomepageSectionId,
  LegalDocumentId,
  NavigationItemId,
  PackageId,
  SeoMetadataId,
  SocialLinkId,
  TestimonialId,
  TourManagerId,
} from "@/domain/refs";

/** Managed media file reference — not embedded binary (Document 08 §7 / §4.5). */
export type MediaFileRef = {
  /** Storage-agnostic locator (URL, path, or CMS asset id). */
  uri: string;
  /** Optional MIME hint. */
  mimeType?: string;
};

// ——— 4.1 Category ———

export type Category = {
  id: CategoryId;
  name: string;
  slug: string;
  description?: string;
};

// ——— 4.3 Destination ———

export type Destination = {
  id: DestinationId;
  name: string;
  slug?: string;
};

// ——— 4.5 Gallery Item ———

export type GalleryItem = {
  id: GalleryItemId;
  mediaType: MediaType;
  mediaFile: MediaFileRef;
  /** Poster/thumbnail for video items. */
  posterFile?: MediaFileRef;
  altText: string;
  caption?: string;
  packageId?: PackageId;
  destinationId?: DestinationId;
  featured?: boolean;
  displayOrder?: number;
  status: ContentStatus;
};

// ——— 4.4 Departure ———

export type Departure = {
  id: DepartureId;
  packageId: PackageId;
  startDate: string; // ISO date YYYY-MM-DD
  endDate: string;
  /**
   * Admin may set Closed; Upcoming/Completed are typically derived at read time
   * (Document 09 §2.12 / §8 rule 17).
   */
  status: DepartureStatus;
};

// ——— 4.2 Package ———

export type PackageQuickFacts = {
  duration: string;
  groupType: string;
  departureCity: string;
};

export type ItineraryDay = {
  dayNumber: number;
  title: string;
  description: string;
};

/**
 * Package entity — Document 08 §4.2.
 * Relationships stored as ids; resolved at the service/API boundary.
 */
export type TourPackage = {
  id: PackageId;
  name: string;
  slug: string;
  categoryId: CategoryId;
  destinationSummary: string;
  /** Destination ids and/or plain-text tags (Document 08 §4.2). */
  destinationsCovered: Array<DestinationId | string>;
  priceAmount: number;
  priceCurrency: "INR";
  priceQualifiers?: string;
  quickFacts: PackageQuickFacts;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  includedList: string[];
  excludedList: string[];
  galleryItemIds: GalleryItemId[];
  testimonialIds: TestimonialId[];
  faqIds: FaqId[];
  departureIds: DepartureId[];
  /** Empty → derive Related Packages by shared Category (Document 08 §5). */
  relatedPackageIds: PackageId[];
  heroMediaId: GalleryItemId;
  seoMetadataId: SeoMetadataId;
  status: ContentStatus;
  /** True once slug has been published — then immutable (Document 08 §2.5). */
  slugLocked: boolean;
};

/** Listing / card projection — not a separate stored entity. */
export type PackageSummary = {
  id: PackageId;
  name: string;
  slug: string;
  categoryId: CategoryId;
  duration: string;
  priceAmount: number;
  priceCurrency: "INR";
  priceQualifiers?: string;
  nextDepartureDate?: string;
  heroMedia: Pick<GalleryItem, "id" | "mediaFile" | "altText" | "mediaType">;
  tag?: string;
};

// ——— 4.6 Testimonial ———

export type Testimonial = {
  id: TestimonialId;
  travellerName: string;
  travellerCity: string;
  packageId?: PackageId;
  quoteText: string;
  photo?: MediaFileRef;
  video?: MediaFileRef;
  featured?: boolean;
  displayOrder?: number;
  status: ContentStatus;
};

// ——— 4.7 FAQ ———

export type Faq = {
  id: FaqId;
  question: string;
  answer: string;
  faqCategory: FaqCategory;
  packageId?: PackageId;
  displayOrder?: number;
  status: ContentStatus;
};

// ——— 4.8 Tour Manager ———

export type TourManager = {
  id: TourManagerId;
  name: string;
  photo?: MediaFileRef;
  shortBio?: string;
  displayOrder?: number;
  status: ContentStatus;
};

// ——— 4.9 Company Information ———

export type CoreValue = {
  name: string;
  explanation: string;
};

export type TimelineMilestone = {
  year: string;
  description: string;
};

export type AchievementStat = {
  value: string;
  label: string;
};

export type CompanyInformation = {
  id: CompanyId;
  registeredBusinessName: string;
  foundingYear: number;
  aboutUsText: string;
  missionStatement: string;
  visionStatement: string;
  coreValues: CoreValue[];
  timelineMilestones?: TimelineMilestone[];
  achievements?: AchievementStat[];
};

// ——— 4.10 Contact Information ———

export type ContactOffice = {
  id: ContactOfficeId;
  officeName: string;
  addressLines: string[];
  addressStatus: AddressStatus;
  phoneNumbers: string[];
  email: string;
  businessHours: {
    days: string;
    time: string;
  };
  googleMapsUrl?: string;
};

// ——— 4.11 Hero Banner ———

export type HeroBanner = {
  id: HeroBannerId;
  ownerKind: HeroOwnerKind;
  /** Page key (e.g. "home") or Package id. */
  ownerId: string;
  heading: string;
  subheading?: string;
  mediaId: GalleryItemId;
  active: boolean;
  displayOrder?: number;
  status: ContentStatus;
};

// ——— 4.12 Homepage Section ———

export type HomepageSection = {
  id: HomepageSectionId;
  sectionType: HomepageSectionType;
  contentRefs: Array<{ kind: "package" | "testimonial" | "faq"; id: string }>;
  displayOrder: number;
  active: boolean;
};

// ——— 4.13 Navigation Item ———

export type NavigationItem = {
  id: NavigationItemId;
  label: string;
  targetRoute: string;
  placement: NavPlacement;
  displayOrder: number;
  active: boolean;
};

// ——— 4.14 Footer Section ———

export type FooterColumnName = "explore" | "company" | "legal" | "reach-us";

export type FooterLinkRef =
  | { kind: "navigation"; id: NavigationItemId }
  | { kind: "legal"; id: LegalDocumentId }
  | { kind: "contact-field"; field: "phone" | "email" | "address" | "hours" };

export type FooterSection = {
  id: FooterSectionId;
  columnName: FooterColumnName;
  links: FooterLinkRef[];
};

// ——— 4.15 SEO Metadata ———

export type SeoMetadata = {
  id: SeoMetadataId;
  ownerKind: SeoOwnerKind;
  ownerId: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  socialShareImage?: MediaFileRef;
  indexing: IndexingFlag;
};

// ——— 4.16 Legal Document ———

export type LegalDocument = {
  id: LegalDocumentId;
  documentType: LegalDocumentType;
  title: string;
  bodyContent: string;
  lastUpdatedDate: string; // ISO date
};

// ——— 4.17 Social Link ———

export type SocialLink = {
  id: SocialLinkId;
  platformName: string;
  url: string;
  displayOrder?: number;
  active: boolean;
};

// ——— 4.18 Enquiry (persisted lead) ———

/**
 * Persisted Enquiry — Document 08 §4.18.
 * Distinct from UI form values in `@/types/enquiry`.
 * Timestamp and Status are system-assigned (Document 09 §8 rules 14).
 */
export type Enquiry = {
  id: EnquiryId;
  name: string;
  mobileNumber: string;
  email: string;
  city: string;
  packageId: PackageId;
  numberOfTravellers: string;
  preferredTravelDate: string;
  message?: string;
  submittedAt: string; // ISO datetime — immutable
  status: EnquiryStatus;
};
