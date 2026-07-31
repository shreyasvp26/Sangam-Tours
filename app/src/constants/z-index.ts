/**
 * Stacking layers for shared chrome.
 * Keep numeric gaps small; raise only when a documented overlay requires it.
 */
export const Z_INDEX = {
  /** Sticky Mobile CTA Bar — Document 06 §3; below header/overlays. */
  stickyCta: 30,
  header: 40,
  overlay: 50,
  skipLink: 60,
} as const;
