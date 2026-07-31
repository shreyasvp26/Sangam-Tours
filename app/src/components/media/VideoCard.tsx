"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

import { cardInteractiveClass, cardSurfaceClass } from "@/components/cards/card-shared";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type VideoCardProps = ClassNameProps & {
  thumbnailSrc: string;
  thumbnailAlt: string;
  /** Media URL — playback starts only after explicit tap (Document 06 §9). */
  videoSrc: string;
  title?: string;
};

/**
 * Video Card — Document 06 §9.
 * Thumbnail with play affordance; never autoplays.
 */
export function VideoCard({
  thumbnailSrc,
  thumbnailAlt,
  videoSrc,
  title,
  className,
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure
      className={cn(
        "overflow-hidden",
        cardSurfaceClass,
        !playing && cardInteractiveClass,
        className,
      )}
    >
      <div className="bg-section relative aspect-[16/9] w-full overflow-hidden">
        {playing ? (
          <video
            className="size-full object-cover"
            src={videoSrc}
            poster={thumbnailSrc}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={thumbnailAlt}
          />
        ) : (
          <button
            type="button"
            className="relative size-full cursor-pointer focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none"
            onClick={() => setPlaying(true)}
            aria-label={title ? `Play video: ${title}` : `Play video: ${thumbnailAlt}`}
          >
            <Image
              src={thumbnailSrc}
              alt={thumbnailAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <span
              className="bg-navy/55 text-on-dark absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="bg-accent text-navy inline-flex size-14 items-center justify-center rounded-full">
                <Play className="size-6 translate-x-0.5" fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          </button>
        )}
      </div>
      {title ? (
        <figcaption className="text-body text-foreground p-4 font-medium">{title}</figcaption>
      ) : null}
    </figure>
  );
}
