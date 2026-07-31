import type { Faq, FaqCategory } from "@/domain";
import { faqCategoryLabels, faqCategoryOrder, faqPageCopy } from "@/content/faq";
import { getPublicCatalog } from "@/services/public-catalog";

export type FaqPageCategoryOption = {
  id: FaqCategory;
  label: string;
};

export type FaqPageData = {
  copy: typeof faqPageCopy;
  items: Faq[];
  categories: FaqPageCategoryOption[];
};

/**
 * Assemble FAQ page data — Document 04 §9 / 08 §4.7 / 09 FAQs.
 * General FAQs only (no package association); never fabricates Q&A content.
 */
export async function getFaqPageData(): Promise<FaqPageData> {
  const catalog = getPublicCatalog();
  const result = await catalog.faqs.list();

  const items = (result.ok ? result.data : [])
    .filter((item) => !item.packageId)
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const present = new Set(items.map((item) => item.faqCategory));
  const categories = faqCategoryOrder
    .filter((id) => present.has(id))
    .map((id) => ({ id, label: faqCategoryLabels[id] }));

  return {
    copy: faqPageCopy,
    items,
    categories,
  };
}
