/**
 * Domain enums — Document 08 §4 / §6.
 * Technology-agnostic; no UI or framework imports.
 */

/** Content lifecycle (Document 08 §6). Not every entity uses every state. */
export type ContentStatus = "draft" | "review" | "published" | "archived";

/** Departure lifecycle (Document 08 §4.4). Derived at read time where possible (09 §2.12). */
export type DepartureStatus = "upcoming" | "closed" | "completed";

/** Enquiry follow-up status (Document 08 §4.18). System-assigned on create as `new`. */
export type EnquiryStatus = "new" | "contacted" | "converted" | "closed";

export type MediaType = "image" | "video";

/** FAQ categories (Document 04 §9 / 08 §4.7). */
export type FaqCategory = "booking" | "pricing" | "travel" | "policies";

/** Exactly three legal document types (Document 08 §4.16). */
export type LegalDocumentType =
  "terms-and-conditions" | "privacy-policy" | "cancellation-and-refund-policy";

/** Fixed homepage section types (Document 04 §3 / 08 §4.12). */
export type HomepageSectionType =
  | "featured-packages"
  | "why-sangam-tours"
  | "testimonials-highlight"
  | "gallery-preview"
  | "faq-snippet"
  | "final-cta-band";

export type NavPlacement = "header" | "drawer-only";

export type IndexingFlag = "index" | "no-index";

/** Contact office address completeness (Document 08 §4.10). */
export type AddressStatus = "confirmed" | "pending";

export type HeroOwnerKind = "page" | "package";

export type SeoOwnerKind = "page" | "package";
