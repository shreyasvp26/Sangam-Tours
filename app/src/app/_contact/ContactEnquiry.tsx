"use client";

import dynamic from "next/dynamic";

import { LoadingSkeleton } from "@/components/feedback";
import type { DropdownOption } from "@/components/forms/Dropdown";
import { submitPackageEnquiry } from "@/services/enquiry-submit";

const EnquiryForm = dynamic(
  () => import("@/components/forms/EnquiryForm").then((mod) => mod.EnquiryForm),
  {
    loading: () => (
      <LoadingSkeleton variant="block" label="Loading enquiry form" className="min-h-64" />
    ),
  },
);

type ContactEnquiryProps = {
  packageOptions: readonly DropdownOption[];
};

/**
 * Client island for Contact EnquiryForm submit wiring
 * (same pattern as Package Detail — Document 06 §6).
 * Form chunk is deferred until this island hydrates (Document 12 §3.5).
 */
export function ContactEnquiry({ packageOptions }: ContactEnquiryProps) {
  return <EnquiryForm packageOptions={packageOptions} onSubmit={submitPackageEnquiry} />;
}
