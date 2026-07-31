/**
 * Fixed CTA copy — Document 06 §4 / §11 rule 10; Document 03 §10.
 * Never rename or rephrase these strings at call sites.
 */
export const CTA_LABELS = {
  bookNow: "Book Now",
  whatsappUs: "WhatsApp Us",
  callNow: "Call Now",
  viewPackage: "View Package",
  sendEnquiry: "Send Enquiry",
} as const;

export type CtaLabelKey = keyof typeof CTA_LABELS;
