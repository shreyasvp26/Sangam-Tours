/**
 * Generic string helpers — no domain or content rules.
 */

/** Collapse whitespace and trim. */
export function normalizeWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

/**
 * URL-safe slug from an arbitrary string.
 * Lowercase, hyphen-separated; strips non-alphanumeric characters.
 */
export function slugify(value: string): string {
  return normalizeWhitespace(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Keep digits only (e.g. preparing tel/wa.me targets without formatting). */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}
