"use client";

import { useEffect, useState } from "react";

/**
 * True when `window.scrollY` exceeds `threshold`.
 * SSR-safe: stays false on the first client render (matches server), then updates after mount.
 * Scroll handler is rAF-throttled for mid-range mobile (Document 12 §3.5).
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [threshold]);

  return scrolled;
}
