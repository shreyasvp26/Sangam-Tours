"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type HeroSlideshowItem = {
  src: string;
  alt: string;
};

export type HeroSlideshowProps = ClassNameProps & {
  items: readonly HeroSlideshowItem[];
  /** Time each photo stays fully visible, in ms. */
  intervalMs?: number;
};

const FADE_MS = 1200;
const ZOOM_MS = 9000;

/**
 * Hero Slideshow — background photography for the Homepage hero.
 * Crossfades between real departure photos with a slow drift; falls back to a
 * single still image when the visitor prefers reduced motion (Document 07 §6).
 */
export function HeroSlideshow({ items, intervalMs = 6000, className }: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  /** Only mount the current photo plus the next one so we don't fetch the whole set upfront. */
  const [mounted, setMounted] = useState<readonly number[]>([0, 1]);
  const reducedMotion = usePrefersReducedMotion();

  const slides = reducedMotion ? items.slice(0, 1) : items;
  const count = slides.length;

  useEffect(() => {
    if (reducedMotion || count < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % count;
        setMounted((previous) =>
          previous.includes(next) ? previous : [...previous, next, (next + 1) % count],
        );
        return next;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [count, intervalMs, reducedMotion]);

  if (count === 0) return null;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        if (!mounted.includes(index) && !isActive) return null;

        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={!isActive}
            fill
            priority={index === 0}
            quality={80}
            sizes="100vw"
            className={cn(
              "ease-standard object-cover",
              isActive ? "scale-105 opacity-100" : "scale-100 opacity-0",
            )}
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: `${FADE_MS}ms, ${ZOOM_MS}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
