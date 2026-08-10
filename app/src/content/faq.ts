/**
 * FAQ page framing — Document 04 §9 / 03 §9 `/faq` / 10 §4.1.
 * Question and answer text always comes from published FAQ records (Document 08 §4.7).
 */

import type { FaqCategory } from "@/domain";

export const faqPageCopy = {
  title: "Frequently Asked Questions",
  categoriesLabel: "Category",
  emptyTitle: "Questions will show here",
  emptyDescription:
    "Published answers will appear here as soon as they are available. WhatsApp us if you need help before then.",
  filterEmptyTitle: "No questions in this category",
  filterEmptyDescription: "Try another category, or WhatsApp us with your question.",
  clearFilterLabel: "Show all questions",
  ctaHeading: "Still have a question?",
  ctaDescription: "We’re happy to help — message us on WhatsApp or visit Contact.",
  contactLabel: "Contact",
} as const;

/** Fixed FAQ category labels — Document 04 §9 / 08 §4.7. */
export const faqCategoryLabels: Record<FaqCategory, string> = {
  booking: "Booking",
  pricing: "Pricing",
  travel: "Travel",
  policies: "Policies",
};

export const faqCategoryOrder: FaqCategory[] = ["booking", "pricing", "travel", "policies"];
