import { z } from "zod";

import {
  contentStatusSchema,
  entityIdSchema,
  mediaFileRefSchema,
  mediaTypeSchema,
  nonEmptyString,
} from "@/lib/validation/domain/common";

/** Gallery Item — Document 08 §4.5. Alt text mandatory. */
export const galleryItemSchema = z.object({
  id: entityIdSchema,
  mediaType: mediaTypeSchema,
  mediaFile: mediaFileRefSchema,
  posterFile: mediaFileRefSchema.optional(),
  altText: nonEmptyString("Alt text is required for every media item."),
  caption: z.string().optional(),
  packageId: entityIdSchema.optional(),
  destinationId: entityIdSchema.optional(),
  featured: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
  status: contentStatusSchema,
});

export type GalleryItemInput = z.infer<typeof galleryItemSchema>;
