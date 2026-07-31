"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Document 07 §6 — system-level reduced-motion preference.
 * CSS already minimizes transitions globally; this exposes the preference to JS.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
