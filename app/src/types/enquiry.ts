/**
 * Enquiry form values — Document 08 §4.18 visitor fields.
 * Message is optional (Document 06 §6; Document 08 field list).
 */
export type EnquiryFormValues = {
  name: string;
  mobileNumber: string;
  email: string;
  city: string;
  packageInterestedIn: string;
  numberOfTravellers: string;
  preferredTravelDate: string;
  /** Optional for visitors; empty string when unused. */
  message: string;
};

/** Payload passed to public enquiry submit (empty message omitted). */
export type EnquirySubmitPayload = Omit<EnquiryFormValues, "message"> & {
  message?: string;
};

/** Receipt returned to the UI after a successful public submit (Document 09 §5). */
export type EnquirySubmitReceipt = {
  received: true;
};

export type EnquirySubmitResult =
  { ok: true; receipt: EnquirySubmitReceipt } | { ok: false; message?: string };
