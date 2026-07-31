import { z } from "zod";

import { digitsOnly } from "@/lib/string";

/**
 * Client validation for the Enquiry Form.
 * Field set fixed by Document 06 §6 / 08 §4.18 — no extras.
 * Plain-language messages (Document 06 validation philosophy).
 */
export const enquiryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Please enter a shorter name."),
  mobileNumber: z
    .string()
    .trim()
    .min(1, "Please enter your mobile number.")
    .refine((value) => {
      const digits = digitsOnly(value);
      return digits.length >= 10 && digits.length <= 15;
    }, "Please enter a valid mobile number."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email address."),
  city: z
    .string()
    .trim()
    .min(1, "Please enter your city.")
    .max(100, "Please enter a shorter city name."),
  packageInterestedIn: z.string().min(1, "Please select a package."),
  numberOfTravellers: z.string().min(1, "Please select the number of travellers."),
  preferredTravelDate: z
    .string()
    .min(1, "Please choose a preferred travel date.")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Please choose a valid date."),
  message: z.string().trim().max(2000, "Please keep your message under 2000 characters."),
});

export type EnquiryFormSchema = z.infer<typeof enquiryFormSchema>;

/** Traveller count options for the Enquiry Form dropdown. */
export const travellerOptions = [
  { value: "1", label: "1 traveller" },
  { value: "2", label: "2 travellers" },
  { value: "3", label: "3 travellers" },
  { value: "4", label: "4 travellers" },
  { value: "5", label: "5 travellers" },
  { value: "6+", label: "6 or more travellers" },
] as const;
