/**
 * Legal page framing — Document 03 §3.3 / §9, Document 04 §11, Document 08 §4.16.
 * Titles are fixed structural labels. Body content is never invented here —
 * it comes only from Legal Document records (or EmptyState when unpublished).
 */

import type { LegalDocumentType } from "@/domain";

export const legalDocumentMeta: Record<
  LegalDocumentType,
  { title: string; path: string; description: string }
> = {
  "terms-and-conditions": {
    title: "Terms & Conditions",
    path: "/terms-and-conditions",
    description: "Terms & Conditions for travelling with Sangam Tours.",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    path: "/privacy-policy",
    description: "How Sangam Tours handles personal information from enquiries and bookings.",
  },
  "cancellation-and-refund-policy": {
    title: "Cancellation & Refund Policy",
    path: "/cancellation-and-refund-policy",
    description: "Cancellation and refund terms for Sangam Tours packages.",
  },
};

export const legalPageCopy = {
  lastUpdatedPrefix: "Last updated:",
  emptyTitle: "This policy will show here",
  emptyDescription:
    "Published policy text appears on this page once it is supplied. Use Contact or WhatsApp from the site header if you need clarification before then.",
} as const;
