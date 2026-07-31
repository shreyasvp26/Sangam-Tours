/**
 * Stable identifiers and relationship references — Document 08 §2 principles 4–6.
 */

/** Opaque stable identifier. Never derived from name or slug. */
export type EntityId = string;

export type CategoryId = EntityId;
export type PackageId = EntityId;
export type DestinationId = EntityId;
export type DepartureId = EntityId;
export type GalleryItemId = EntityId;
export type TestimonialId = EntityId;
export type FaqId = EntityId;
export type TourManagerId = EntityId;
export type CompanyId = EntityId;
export type ContactOfficeId = EntityId;
export type HeroBannerId = EntityId;
export type HomepageSectionId = EntityId;
export type NavigationItemId = EntityId;
export type FooterSectionId = EntityId;
export type SeoMetadataId = EntityId;
export type LegalDocumentId = EntityId;
export type SocialLinkId = EntityId;
export type EnquiryId = EntityId;

/** Minimal related-resource pointer (Document 09 §2.9 / §5). */
export type EntityRef<TId extends EntityId = EntityId> = {
  id: TId;
};

/** Related resource with minimal display fields for list payloads. */
export type NamedRef<TId extends EntityId = EntityId> = EntityRef<TId> & {
  name: string;
  slug?: string;
};
