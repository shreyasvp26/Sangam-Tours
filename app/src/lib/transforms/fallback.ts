/**
 * Content fallbacks — Document 08 §5 / 04 package detail testimonials & FAQs.
 * Empty package-specific lists → use general content.
 */

export function resolveWithFallback<T>(packageSpecific: T[], general: T[]): T[] {
  return packageSpecific.length > 0 ? packageSpecific : general;
}
