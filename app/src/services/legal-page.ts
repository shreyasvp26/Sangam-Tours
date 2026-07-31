import type { LegalDocument, LegalDocumentType } from "@/domain";
import { legalDocumentMeta, legalPageCopy } from "@/content/legal";
import { getPublicCatalog } from "@/services/public-catalog";

export type LegalPageData = {
  copy: typeof legalPageCopy;
  documentType: LegalDocumentType;
  /** Fixed IA title — used for H1 even when body is unpublished. */
  title: string;
  document: LegalDocument | null;
};

/**
 * Assemble a legal page — Document 04 §11 / 08 §4.16 / 09 Legal.
 * Never fabricates policy body text.
 */
export async function getLegalPageData(documentType: LegalDocumentType): Promise<LegalPageData> {
  const catalog = getPublicCatalog();
  const result = await catalog.legal.getByType(documentType);
  const meta = legalDocumentMeta[documentType];

  return {
    copy: legalPageCopy,
    documentType,
    title: result.ok ? result.data.title : meta.title,
    document: result.ok ? result.data : null,
  };
}
