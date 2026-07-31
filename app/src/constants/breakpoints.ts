/**
 * Layout breakpoints in pixels.
 * Aligned with Document 04 §12 grid behaviour and Tailwind defaults
 * used by layout Grid (md = tablet 2-col, lg = desktop 3-col).
 */
export const BREAKPOINTS = {
  md: 768,
  lg: 1024,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export const MEDIA_QUERIES = {
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
} as const;
