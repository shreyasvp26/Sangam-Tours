"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Z_INDEX } from "@/constants/z-index";
import { useFocusTrap, useScrollLock } from "@/hooks";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type LightboxItem = {
  src: string;
  alt: string;
  /** When set, lightbox plays this video; `src` is the poster. */
  videoSrc?: string;
};

export type ImageLightboxProps = ClassNameProps & {
  items: LightboxItem[];
  /** Open item index; `null` when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Image Lightbox — Document 06 §9.
 * Full-screen image/video with adjacent navigation and a visible close control.
 * Does not alter underlying grid scroll position on close.
 */
export function ImageLightbox({
  items,
  index,
  onClose,
  onNavigate,
  className,
}: ImageLightboxProps) {
  const open = index !== null && items.length > 0;
  const activeIndex = open ? Math.min(Math.max(index, 0), items.length - 1) : 0;
  const item = open ? items[activeIndex] : undefined;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const handleEscape = useCallback(() => onClose(), [onClose]);

  useScrollLock(open);
  useFocusTrap(open, rootRef, { initialFocusRef: closeRef, onEscape: handleEscape });

  const goPrev = useCallback(() => {
    if (!open || items.length < 2) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [open, items.length, activeIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (!open || items.length < 2) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [open, items.length, activeIndex, onNavigate]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goPrev, goNext]);

  if (!open || !item) {
    return null;
  }

  const isVideo = Boolean(item.videoSrc);

  return (
    <div
      ref={rootRef}
      className={cn("fixed inset-0 flex flex-col bg-neutral-900/95", className)}
      style={{ zIndex: Z_INDEX.overlay }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p id={titleId} className="text-caption text-on-dark/80 truncate">
          {item.alt}
          {items.length > 1 ? (
            <span className="text-on-dark/60">
              {" "}
              · {activeIndex + 1} / {items.length}
            </span>
          ) : null}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="text-on-dark size-touch ease-standard inline-flex shrink-0 items-center justify-center rounded-sm transition-colors duration-[var(--sangam-duration-fast)] hover:bg-white/10 focus-visible:shadow-[var(--sangam-focus-ring-on-dark)] focus-visible:outline-none"
          aria-label="Close"
        >
          <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
        {items.length > 1 ? (
          <button
            type="button"
            onClick={goPrev}
            className="text-on-dark size-touch ease-standard absolute top-1/2 left-2 z-10 inline-flex -translate-y-1/2 items-center justify-center rounded-sm transition-colors duration-[var(--sangam-duration-fast)] hover:bg-white/10 focus-visible:shadow-[var(--sangam-focus-ring-on-dark)] focus-visible:outline-none md:left-4"
            aria-label="Previous"
          >
            <ChevronLeft aria-hidden="true" className="size-8" strokeWidth={1.5} />
          </button>
        ) : null}

        <div className="relative flex h-[min(70vh,100%)] w-full max-w-5xl items-center justify-center">
          {isVideo && item.videoSrc ? (
            <video
              key={item.videoSrc}
              className="max-h-full max-w-full object-contain"
              poster={item.src}
              controls
              playsInline
              preload="metadata"
              aria-label={item.alt}
            >
              <source src={item.videoSrc} />
            </video>
          ) : (
            <div className="relative size-full min-h-[50vh]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>

        {items.length > 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="text-on-dark size-touch ease-standard absolute top-1/2 right-2 z-10 inline-flex -translate-y-1/2 items-center justify-center rounded-sm transition-colors duration-[var(--sangam-duration-fast)] hover:bg-white/10 focus-visible:shadow-[var(--sangam-focus-ring-on-dark)] focus-visible:outline-none md:right-4"
            aria-label="Next"
          >
            <ChevronRight aria-hidden="true" className="size-8" strokeWidth={1.5} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
