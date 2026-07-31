import { LegalDocumentPage } from "@/app/_legal/LegalDocumentPage";
import { legalDocumentMeta } from "@/content/legal";
import { buildPageMetadata } from "@/lib/seo";

const meta = legalDocumentMeta["privacy-policy"];

export const metadata = buildPageMetadata({
  path: meta.path,
  title: meta.title,
  description: meta.description,
});

/** Privacy Policy — Document 03 §9 `/privacy-policy`, Document 04 §11. */
export default function PrivacyPolicyPage() {
  return <LegalDocumentPage documentType="privacy-policy" />;
}
