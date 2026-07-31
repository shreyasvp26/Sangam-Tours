"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";

/**
 * Lock document body scroll while `locked` is true.
 * Restores the previous overflow value on cleanup.
 */
export function useScrollLock(locked: boolean) {
  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}
