import { z } from "zod";

import type { TourPackage, Departure, GalleryItem, SeoMetadata } from "@/domain";
import { packagePublishSchema } from "@/lib/validation/domain/package";
import { galleryItemSchema } from "@/lib/validation/domain/gallery-item";
import { entityIdSchema, nonEmptyString } from "@/lib/validation/domain/common";

export type FieldErrors = Record<string, string>;

export type PublishValidationResult = { ok: true } | { ok: false; fields: FieldErrors };

function zodToFields(error: z.ZodError): FieldErrors {
  const fields: FieldErrors = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".") || "_form";
    if (!fields[path]) {
      fields[path] = issue.message;
    }
  }
  return fields;
}

const seoPublishSchema = z.object({
  id: entityIdSchema,
  ownerKind: z.enum(["page", "package"]),
  ownerId: nonEmptyString("SEO owner is required."),
  metaTitle: nonEmptyString("Meta title is required."),
  metaDescription: nonEmptyString("Meta description is required."),
  canonicalUrl: nonEmptyString("Canonical URL is required."),
  indexing: z.enum(["index", "no-index"]),
});

/**
 * Holistic publish gate for a Package — Document 08 §8.
 * Validates fields plus required relationships (departures, hero alt text, SEO).
 */
export function assertPackagePublishable(input: {
  package: TourPackage;
  departures: Departure[];
  heroMedia: GalleryItem | null;
  seo: SeoMetadata | null;
}): PublishValidationResult {
  const parsed = packagePublishSchema.safeParse(input.package);
  const fields: FieldErrors = parsed.success ? {} : zodToFields(parsed.error);

  if (input.departures.length === 0) {
    fields.departures = "At least one departure is required to publish.";
  }

  if (!input.heroMedia) {
    fields.heroMediaId = "Hero media is required to publish.";
  } else {
    const hero = galleryItemSchema.safeParse(input.heroMedia);
    if (!hero.success) {
      Object.assign(
        fields,
        Object.fromEntries(
          Object.entries(zodToFields(hero.error)).map(([key, message]) => [
            `heroMedia.${key}`,
            message,
          ]),
        ),
      );
    }
  }

  if (!input.seo) {
    fields.seoMetadataId = "SEO metadata is required to publish.";
  } else {
    const seo = seoPublishSchema.safeParse(input.seo);
    if (!seo.success) {
      Object.assign(
        fields,
        Object.fromEntries(
          Object.entries(zodToFields(seo.error)).map(([key, message]) => [`seo.${key}`, message]),
        ),
      );
    }
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, fields };
  }

  return { ok: true };
}
