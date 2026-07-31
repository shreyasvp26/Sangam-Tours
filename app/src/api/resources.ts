import type { ApiResult } from "@/api/result";
import type { Paginated, PaginationInput } from "@/api/pagination";
import type {
  Category,
  CategoryId,
  CompanyInformation,
  ContactOffice,
  Departure,
  Destination,
  DestinationId,
  Enquiry,
  EnquiryId,
  EnquiryStatus,
  Faq,
  FaqCategory,
  GalleryItem,
  GalleryItemId,
  HomepageSection,
  HeroBanner,
  LegalDocument,
  NavigationItem,
  PackageId,
  PackageSummary,
  SocialLink,
  Testimonial,
  TourManager,
  TourPackage,
} from "@/domain";
import type { EnquirySubmitPayload, EnquirySubmitReceipt } from "@/types/enquiry";

/** Filters mirror Document 08 fields only (Document 09 §4). */
export type PackageListFilters = {
  categoryId?: CategoryId;
  destinationId?: DestinationId;
  /** Sort: most-recent-first default; nearest departure optional (09 §4). */
  sort?: "recent" | "nearest-departure" | "price-asc" | "price-desc";
};

export type GalleryListFilters = {
  destinationId?: DestinationId;
  packageId?: PackageId;
  featured?: boolean;
};

export type TestimonialListFilters = {
  packageId?: PackageId;
  featured?: boolean;
};

export type FaqListFilters = {
  faqCategory?: FaqCategory;
  packageId?: PackageId;
};

export type EnquiryListFilters = {
  status?: EnquiryStatus;
  packageId?: PackageId;
};

/**
 * Public package detail DTO — entity + resolved related refs (minimal nesting).
 * Full nested CMS graphs are not returned (Document 09 §2.9).
 */
export type PackageDetail = {
  package: TourPackage;
  category: Category;
  departures: Departure[];
  heroMedia: GalleryItem;
  galleryItems: GalleryItem[];
  /** Package-specific; empty means apply general fallback in the UI layer. */
  testimonials: Testimonial[];
  faqs: Faq[];
  relatedPackages: PackageSummary[];
};

export type HomepagePayload = {
  hero: HeroBanner | null;
  heroMedia: GalleryItem | null;
  sections: HomepageSection[];
};

/**
 * Resource ports — Document 09 §3.
 * Implementations live in the service layer; no transport assumed.
 */
export type PackagePublicApi = {
  listPublished(
    filters?: PackageListFilters,
    pagination?: PaginationInput,
  ): Promise<ApiResult<Paginated<PackageSummary>>>;
  getBySlug(slug: string): Promise<ApiResult<PackageDetail>>;
};

export type CategoryPublicApi = {
  list(): Promise<ApiResult<Category[]>>;
  getBySlug(slug: string): Promise<ApiResult<Category>>;
};

export type DestinationPublicApi = {
  list(): Promise<ApiResult<Destination[]>>;
};

export type DeparturePublicApi = {
  listForPackage(packageId: PackageId): Promise<ApiResult<Departure[]>>;
};

export type GalleryPublicApi = {
  list(
    filters?: GalleryListFilters,
    pagination?: PaginationInput,
  ): Promise<ApiResult<Paginated<GalleryItem>>>;
  getById(id: GalleryItemId): Promise<ApiResult<GalleryItem>>;
};

export type TestimonialPublicApi = {
  listPublished(
    filters?: TestimonialListFilters,
    pagination?: PaginationInput,
  ): Promise<ApiResult<Paginated<Testimonial>>>;
};

export type FaqPublicApi = {
  list(filters?: FaqListFilters): Promise<ApiResult<Faq[]>>;
};

export type TourManagerPublicApi = {
  listActive(): Promise<ApiResult<TourManager[]>>;
};

export type CompanyPublicApi = {
  get(): Promise<ApiResult<CompanyInformation>>;
};

export type ContactPublicApi = {
  listOffices(): Promise<ApiResult<ContactOffice[]>>;
};

export type HomepagePublicApi = {
  get(): Promise<ApiResult<HomepagePayload>>;
};

export type NavigationPublicApi = {
  listActive(): Promise<ApiResult<NavigationItem[]>>;
};

export type LegalPublicApi = {
  list(): Promise<ApiResult<LegalDocument[]>>;
  getByType(documentType: LegalDocument["documentType"]): Promise<ApiResult<LegalDocument>>;
};

export type SocialLinksPublicApi = {
  listActive(): Promise<ApiResult<SocialLink[]>>;
};

/** Public write: submit only (Document 09 §3 Enquiries). */
export type EnquiryPublicApi = {
  submit(payload: EnquirySubmitPayload): Promise<ApiResult<EnquirySubmitReceipt>>;
};

/** Admin-facing enquiry reads/status updates — never public. */
export type EnquiryAdminApi = {
  list(
    filters?: EnquiryListFilters,
    pagination?: PaginationInput,
  ): Promise<ApiResult<Paginated<Enquiry>>>;
  getById(id: EnquiryId): Promise<ApiResult<Enquiry>>;
  updateStatus(id: EnquiryId, status: EnquiryStatus): Promise<ApiResult<Enquiry>>;
};

export type PublicCatalogApi = {
  packages: PackagePublicApi;
  categories: CategoryPublicApi;
  destinations: DestinationPublicApi;
  departures: DeparturePublicApi;
  gallery: GalleryPublicApi;
  testimonials: TestimonialPublicApi;
  faqs: FaqPublicApi;
  tourManagers: TourManagerPublicApi;
  company: CompanyPublicApi;
  contact: ContactPublicApi;
  homepage: HomepagePublicApi;
  navigation: NavigationPublicApi;
  legal: LegalPublicApi;
  socialLinks: SocialLinksPublicApi;
  enquiries: EnquiryPublicApi;
};
