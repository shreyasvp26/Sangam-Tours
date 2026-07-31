/**
 * Repository validation at the content-infrastructure boundary (Document 08 / 12).
 * Invalid seed data fails loudly rather than corrupting public pages.
 */

import { z } from "zod";

import type { ContentRepository } from "@/content/repository/types";
import { entityIdSchema, nonEmptyString } from "@/lib/validation/domain/common";
import { galleryItemSchema } from "@/lib/validation/domain/gallery-item";
import { departureSchema, packageDraftSchema } from "@/lib/validation/domain/package";

const categorySchema = z.object({
  id: entityIdSchema,
  name: nonEmptyString("Category name is required."),
  slug: nonEmptyString("Category slug is required."),
  description: z.string().optional(),
});

const destinationSchema = z.object({
  id: entityIdSchema,
  name: nonEmptyString("Destination name is required."),
  slug: z.string().optional(),
});

const contactOfficeSchema = z.object({
  id: entityIdSchema,
  officeName: nonEmptyString("Office name is required."),
  addressLines: z.array(z.string()).min(1, "Address lines are required."),
  addressStatus: z.enum(["confirmed", "pending"]),
  phoneNumbers: z.array(z.string()).min(1, "At least one phone number is required."),
  email: z.string().email("A valid office email is required."),
  businessHours: z.object({
    days: nonEmptyString("Business days are required."),
    time: nonEmptyString("Business hours are required."),
  }),
  googleMapsUrl: z.string().url().optional(),
});

const companySchema = z.object({
  id: entityIdSchema,
  registeredBusinessName: nonEmptyString("Business name is required."),
  foundingYear: z.number().int().min(1900),
  aboutUsText: nonEmptyString("About text is required."),
  missionStatement: nonEmptyString("Mission is required."),
  visionStatement: nonEmptyString("Vision is required."),
  coreValues: z
    .array(
      z.object({
        name: nonEmptyString("Value name is required."),
        explanation: nonEmptyString("Value explanation is required."),
      }),
    )
    .min(1),
  timelineMilestones: z
    .array(
      z.object({
        year: nonEmptyString("Milestone year is required."),
        description: nonEmptyString("Milestone description is required."),
      }),
    )
    .optional(),
  achievements: z
    .array(
      z.object({
        value: nonEmptyString("Achievement value is required."),
        label: nonEmptyString("Achievement label is required."),
      }),
    )
    .optional(),
});

const navigationItemSchema = z.object({
  id: entityIdSchema,
  label: nonEmptyString("Navigation label is required."),
  targetRoute: nonEmptyString("Navigation route is required."),
  placement: z.enum(["header", "drawer-only"]),
  displayOrder: z.number().int(),
  active: z.boolean(),
});

const contentStatusBearing = z.object({
  status: z.enum(["draft", "review", "published", "archived"]),
});

const testimonialSeedSchema = z
  .object({
    id: entityIdSchema,
    travellerName: nonEmptyString("Traveller name is required."),
    travellerCity: nonEmptyString("Traveller city is required."),
    quoteText: nonEmptyString("Quote text is required."),
    packageId: z.string().optional(),
    featured: z.boolean().optional(),
    displayOrder: z.number().optional(),
  })
  .merge(contentStatusBearing);

const faqSeedSchema = z
  .object({
    id: entityIdSchema,
    question: nonEmptyString("Question is required."),
    answer: nonEmptyString("Answer is required."),
    faqCategory: z.enum(["booking", "pricing", "travel", "policies"]),
    packageId: z.string().optional(),
    displayOrder: z.number().optional(),
  })
  .merge(contentStatusBearing);

const tourManagerSeedSchema = z
  .object({
    id: entityIdSchema,
    name: nonEmptyString("Tour manager name is required."),
    shortBio: z.string().optional(),
    displayOrder: z.number().optional(),
  })
  .merge(contentStatusBearing);

const legalDocumentSchema = z.object({
  id: entityIdSchema,
  documentType: z.enum([
    "terms-and-conditions",
    "privacy-policy",
    "cancellation-and-refund-policy",
  ]),
  title: nonEmptyString("Legal title is required."),
  bodyContent: nonEmptyString("Legal body is required."),
  lastUpdatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const socialLinkSchema = z.object({
  id: entityIdSchema,
  platformName: nonEmptyString("Platform name is required."),
  url: z.string().url("Social URL must be valid."),
  displayOrder: z.number().optional(),
  active: z.boolean(),
});

const repositorySchema = z.object({
  categories: z.array(categorySchema),
  destinations: z.array(destinationSchema),
  packages: z.array(packageDraftSchema),
  departures: z.array(departureSchema),
  galleryItems: z.array(galleryItemSchema),
  testimonials: z.array(testimonialSeedSchema),
  faqs: z.array(faqSeedSchema),
  tourManagers: z.array(tourManagerSeedSchema),
  company: companySchema.nullable(),
  offices: z.array(contactOfficeSchema),
  heroBanners: z.array(z.object({ id: entityIdSchema }).passthrough()),
  homepageSections: z.array(z.object({ id: entityIdSchema }).passthrough()),
  navigationItems: z.array(navigationItemSchema),
  legalDocuments: z.array(legalDocumentSchema),
  socialLinks: z.array(socialLinkSchema),
});

/**
 * Validate repository records. Throws with a clear message when seed data is invalid.
 */
export function validateContentRepository(repository: ContentRepository): ContentRepository {
  const parsed = repositorySchema.safeParse(repository);
  if (!parsed.success) {
    const detail = parsed.error.issues
      .slice(0, 5)
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Content repository validation failed: ${detail}`);
  }

  const categories = parsed.data.categories;
  if (categories.length < 2) {
    throw new Error("Content repository must include Domestic and International categories.");
  }

  const offices = parsed.data.offices;
  if (offices.length < 2) {
    throw new Error("Content repository must include Nagpur and Akola office records.");
  }

  return parsed.data as ContentRepository;
}
