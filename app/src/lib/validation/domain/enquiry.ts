import { z } from "zod";

import {
  entityIdSchema,
  isoDateSchema,
  isoDateTimeSchema,
  nonEmptyString,
} from "@/lib/validation/domain/common";
import { enquiryFormSchema } from "@/lib/validation/enquiry";

/**
 * Public enquiry submit — same visitor fields as the form (Document 08 §4.18).
 * Timestamp/Status are never accepted from the client (Document 09 §8 rule 14).
 */
export const enquirySubmitSchema = enquiryFormSchema.transform((values) => ({
  name: values.name,
  mobileNumber: values.mobileNumber,
  email: values.email,
  city: values.city,
  packageId: values.packageInterestedIn,
  numberOfTravellers: values.numberOfTravellers,
  preferredTravelDate: values.preferredTravelDate,
  message: values.message.trim() ? values.message.trim() : undefined,
}));

export const enquiryStatusSchema = z.enum(["new", "contacted", "converted", "closed"]);

/** Persisted enquiry record shape (admin). */
export const enquiryRecordSchema = z.object({
  id: entityIdSchema,
  name: nonEmptyString("Name is required."),
  mobileNumber: nonEmptyString("Mobile number is required."),
  email: z.string().email(),
  city: nonEmptyString("City is required."),
  packageId: entityIdSchema,
  numberOfTravellers: nonEmptyString("Number of travellers is required."),
  preferredTravelDate: isoDateSchema,
  message: z.string().optional(),
  submittedAt: isoDateTimeSchema,
  status: enquiryStatusSchema,
});
