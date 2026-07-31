"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { GalleryCard } from "@/components/cards/GalleryCard";
import { Grid } from "@/components/layout/Grid";
import type { LightboxItem } from "@/components/media/ImageLightbox";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

const ImageLightbox = dynamic(
  () => import("@/components/media/ImageLightbox").then((mod) => mod.ImageLightbox),
  { ssr: false },
);

export type GalleryGridItem = {
  id?: string;
  src: string;
  alt: string;
  variant?: "image" | "video";
  /** Video file URL when variant is video (lightbox playback). */
  videoSrc?: string;
  tag?: string;
  tagHref?: string;
};

export type GalleryGridProps = ClassNameProps & {
  items: GalleryGridItem[];
  columns?: 2 | 3;
  /** When false, cards are display-only (no lightbox). Default true. */
  enableLightbox?: boolean;
};

/**
 * Gallery Grid — Document 06 §9.
 * Uniform Gallery Card arrangement; owns Image Lightbox for the set.
 * Lightbox is code-split and mounted only when opened (Document 12 §3.5).
 */
export function GalleryGrid({
  items,
  columns = 3,
  enableLightbox = true,
  className,
}: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = items.map((item) => ({
    src: item.src,
    alt: item.alt,
    videoSrc: item.videoSrc,
  }));

  return (
    <div className={cn(className)}>
      <Grid columns={columns}>
        {items.map((item, index) => (
          <GalleryCard
            key={item.id ?? `${item.src}-${index}`}
            imageSrc={item.src}
            imageAlt={item.alt}
            variant={item.variant ?? (item.videoSrc ? "video" : "image")}
            tag={item.tag}
            tagHref={item.tagHref}
            onOpen={enableLightbox ? () => setOpenIndex(index) : undefined}
          />
        ))}
      </Grid>

      {enableLightbox && openIndex !== null ? (
        <ImageLightbox
          items={lightboxItems}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      ) : null}
    </div>
  );
}
