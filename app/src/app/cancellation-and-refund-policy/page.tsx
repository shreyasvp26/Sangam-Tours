import { LegalDocumentPage } from "@/app/_legal/LegalDocumentPage";
import { legalDocumentMeta } from "@/content/legal";
import { buildPageMetadata } from "@/lib/seo";

const meta = legalDocumentMeta["cancellation-and-refund-policy"];

export const metadata = buildPageMetadata({
  path: meta.path,
  title: meta.title,
  description: meta.description,
});

/**
 * Cancellation & Refund Policy — Document 03 §9 `/cancellation-and-refund-policy`,
 * Document 04 §11.
 */
export default function CancellationAndRefundPolicyPage() {
  return <LegalDocumentPage documentType="cancellation-and-refund-policy" />;
}
