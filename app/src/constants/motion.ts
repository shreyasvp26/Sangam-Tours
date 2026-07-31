/**
 * Motion timing for JS consumers (e.g. future Framer Motion).
 * Values match Phase 3.1 approved tokens / Document 05 §10 + 07 §6.
 * Prefer CSS tokens in styles; use these only when JS needs numeric durations.
 */
export const MOTION = {
  durationMs: {
    fast: 150,
    base: 250,
    slow: 400,
  },
  /** cubic-bezier(0.22, 1, 0.36, 1) */
  ease: [0.22, 1, 0.36, 1] as const,
} as const;
