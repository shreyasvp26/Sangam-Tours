export type { AsChildProps, ChildrenProps, ClassNameProps } from "./props";
export type {
  EnquiryFormValues,
  EnquirySubmitPayload,
  EnquirySubmitReceipt,
  EnquirySubmitResult,
} from "./enquiry";

/** Re-export domain models for convenience — prefer `@/domain` in new code. */
export type {
  Category,
  Departure,
  Destination,
  Enquiry,
  Faq,
  GalleryItem,
  PackageSummary,
  Testimonial,
  TourPackage,
} from "@/domain";
