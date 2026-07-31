import { getPublicCatalog } from "@/services/public-catalog";
import { logger } from "@/lib/logger";
import type { EnquirySubmitPayload, EnquirySubmitResult } from "@/types/enquiry";

/** Bridge catalog enquiry port → EnquiryForm result shape. */
export async function submitPackageEnquiry(
  values: EnquirySubmitPayload,
): Promise<EnquirySubmitResult> {
  const catalog = getPublicCatalog();
  const result = await catalog.enquiries.submit(values);

  if (result.ok) {
    logger.info("enquiry.submit_ok", {
      hasPackage: Boolean(values.packageInterestedIn),
      travellers: values.numberOfTravellers,
    });
    return { ok: true, receipt: result.data };
  }

  // Log category + message only — never name, phone, email, or free-text message (Doc 09 §6).
  logger.error("enquiry.submit_failed", {
    category: result.error.category,
    message: result.error.message,
  });

  return {
    ok: false,
    message: result.error.message,
  };
}
