import { TermsAndConditionsView } from "@/app/_legal/TermsAndConditionsView";
import { legalDocumentMeta } from "@/content/legal";
import { buildPageMetadata } from "@/lib/seo";

const meta = legalDocumentMeta["terms-and-conditions"];

export const metadata = buildPageMetadata({
  path: meta.path,
  title: meta.title,
  description: meta.description,
});

/** Terms & Conditions — Document 03 §9 `/terms-and-conditions`, Document 04 §11. */
export default function TermsAndConditionsPage() {
  return <TermsAndConditionsView />;
}
