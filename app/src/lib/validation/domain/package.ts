import { z } from "zod";

import {
  contentStatusSchema,
  entityIdSchema,
  isoDateSchema,
  nonEmptyString,
} from "@/lib/validation/domain/common";
import { departureStatusSchema } from "@/lib/validation/domain/common";

export const departureSchema = z
  .object({
    id: entityIdSchema,
    packageId: entityIdSchema,
    startDate: isoDateSchema,
    endDate: isoDateSchema,
    status: departureStatusSchema,
  })
  .superRefine((value, ctx) => {
    if (value.endDate <= value.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must fall after start date.",
        path: ["endDate"],
      });
    }
  });

export const packageQuickFactsSchema = z.object({
  duration: nonEmptyString("Duration is required."),
  groupType: nonEmptyString("Group type is required."),
  departureCity: nonEmptyString("Departure city is required."),
});

export const itineraryDaySchema = z.object({
  dayNumber: z.number().int().positive(),
  title: nonEmptyString("Itinerary day title is required."),
  description: nonEmptyString("Itinerary day description is required."),
});

/**
 * Package draft schema — relaxed (Document 08 §8 / 09 §8 rule 18).
 * Required shape fields may be empty strings while drafting.
 */
export const packageDraftSchema = z.object({
  id: entityIdSchema,
  name: z.string(),
  slug: z.string(),
  categoryId: z.string(),
  destinationSummary: z.string(),
  destinationsCovered: z.array(z.union([entityIdSchema, z.string()])),
  priceAmount: z.number().nonnegative(),
  priceCurrency: z.literal("INR"),
  priceQualifiers: z.string().optional(),
  quickFacts: packageQuickFactsSchema.partial().extend({
    duration: z.string().optional(),
    groupType: z.string().optional(),
    departureCity: z.string().optional(),
  }),
  overview: z.string(),
  highlights: z.array(z.string()),
  itinerary: z.array(itineraryDaySchema.partial()),
  includedList: z.array(z.string()),
  excludedList: z.array(z.string()),
  galleryItemIds: z.array(entityIdSchema),
  testimonialIds: z.array(entityIdSchema),
  faqIds: z.array(entityIdSchema),
  departureIds: z.array(entityIdSchema),
  relatedPackageIds: z.array(entityIdSchema),
  heroMediaId: z.string(),
  seoMetadataId: z.string(),
  status: contentStatusSchema,
  slugLocked: z.boolean(),
});

/**
 * Package publish schema — full gate (Document 08 §4.2 / §8).
 * Relationship existence (departures, hero media, SEO) is checked separately
 * by `assertPackagePublishable` with resolved related records.
 */
export const packagePublishSchema = z.object({
  id: entityIdSchema,
  name: nonEmptyString("Package name is required."),
  slug: nonEmptyString("Package slug is required.").regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase kebab-case.",
  ),
  categoryId: entityIdSchema,
  destinationSummary: nonEmptyString("Destination summary is required."),
  destinationsCovered: z
    .array(z.union([entityIdSchema, nonEmptyString("Destination is required.")]))
    .min(1, "At least one destination is required."),
  priceAmount: z.number().positive("Price must be greater than zero."),
  priceCurrency: z.literal("INR"),
  priceQualifiers: z.string().optional(),
  quickFacts: packageQuickFactsSchema,
  overview: nonEmptyString("Overview is required."),
  highlights: z
    .array(nonEmptyString("Highlight text is required."))
    .min(4, "Add at least four highlights.")
    .max(6, "Keep highlights to six or fewer."),
  itinerary: z.array(itineraryDaySchema).min(1, "At least one itinerary day is required."),
  includedList: z.array(nonEmptyString("Included item is required.")).min(1),
  excludedList: z.array(nonEmptyString("Excluded item is required.")).min(1),
  galleryItemIds: z.array(entityIdSchema),
  testimonialIds: z.array(entityIdSchema),
  faqIds: z.array(entityIdSchema),
  departureIds: z.array(entityIdSchema).min(1, "At least one departure is required."),
  relatedPackageIds: z.array(entityIdSchema),
  heroMediaId: entityIdSchema,
  seoMetadataId: entityIdSchema,
  status: contentStatusSchema,
  slugLocked: z.boolean(),
});

export type PackagePublishInput = z.infer<typeof packagePublishSchema>;
