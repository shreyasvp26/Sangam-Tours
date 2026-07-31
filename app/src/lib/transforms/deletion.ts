/**
 * Safe-deletion / reference guards — Document 08 §8.
 * Pure checks; persistence adapters enforce the outcome.
 */

export type ReferenceBlocker = {
  relationship: string;
  count: number;
};

export function canHardDeletePackage(input: {
  enquiryCount: number;
  referencingTestimonialCount: number;
  referencingFaqCount: number;
}): { allowed: true } | { allowed: false; blockers: ReferenceBlocker[] } {
  const blockers: ReferenceBlocker[] = [];

  if (input.enquiryCount > 0) {
    blockers.push({ relationship: "Enquiry", count: input.enquiryCount });
  }
  if (input.referencingTestimonialCount > 0) {
    blockers.push({
      relationship: "Testimonial",
      count: input.referencingTestimonialCount,
    });
  }
  if (input.referencingFaqCount > 0) {
    blockers.push({ relationship: "FAQ", count: input.referencingFaqCount });
  }

  return blockers.length === 0 ? { allowed: true } : { allowed: false, blockers };
}

export function canHardDeleteCategory(packageCount: number): {
  allowed: boolean;
  blockers?: ReferenceBlocker[];
} {
  if (packageCount > 0) {
    return {
      allowed: false,
      blockers: [{ relationship: "Package", count: packageCount }],
    };
  }
  return { allowed: true };
}

export function canHardDeleteDestination(input: {
  packageCount: number;
  galleryItemCount: number;
}): { allowed: true } | { allowed: false; blockers: ReferenceBlocker[] } {
  const blockers: ReferenceBlocker[] = [];
  if (input.packageCount > 0) {
    blockers.push({ relationship: "Package", count: input.packageCount });
  }
  if (input.galleryItemCount > 0) {
    blockers.push({ relationship: "Gallery Item", count: input.galleryItemCount });
  }
  return blockers.length === 0 ? { allowed: true } : { allowed: false, blockers };
}
