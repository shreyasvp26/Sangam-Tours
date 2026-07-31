import { z } from "zod";

import type { ContentStatus, DepartureStatus, MediaType } from "@/domain/enums";

export const entityIdSchema = z.string().min(1, "Identifier is required.");

export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use a valid date (YYYY-MM-DD).");

export const isoDateTimeSchema = z.string().min(1, "Timestamp is required.");

export const mediaFileRefSchema = z.object({
  uri: z.string().min(1, "Media file is required."),
  mimeType: z.string().optional(),
});

export const contentStatusSchema = z.enum([
  "draft",
  "review",
  "published",
  "archived",
]) satisfies z.ZodType<ContentStatus>;

export const departureStatusSchema = z.enum([
  "upcoming",
  "closed",
  "completed",
]) satisfies z.ZodType<DepartureStatus>;

export const mediaTypeSchema = z.enum(["image", "video"]) satisfies z.ZodType<MediaType>;

export const nonEmptyString = (message: string) => z.string().trim().min(1, message);
