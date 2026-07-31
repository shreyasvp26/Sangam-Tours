import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

import { Tag } from "@/components/content";
import { cardInteractiveClass, cardSurfaceClass } from "@/components/cards/card-shared";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type GalleryCardVariant = "image" | "video";

export type GalleryCardProps = ClassNameProps & {
  imageSrc: string;
  imageAlt: string;
  /** image | video — video shows a play affordance (Document 06 §5). */
  variant?: GalleryCardVariant;
  /** Destination or package tag; may link to Package Detail when `tagHref` is set. */
  tag?: string;
  tagHref?: string;
  /**
   * Opens Image Lightbox at this item's position — parent owns lightbox (Document 06 §8).
   * Required for interaction; no-op when omitted only for non-interactive previews.
   */
  onOpen?: () => void;
};

/**
 * Gallery Card — Document 06 §5.
 * Single grid cell; lightbox ownership stays with the parent Gallery Grid.
 */
export function GalleryCard({
  imageSrc,
  imageAlt,
  variant = "image",
  tag,
  tagHref,
  onOpen,
  className,
}: GalleryCardProps) {
  const isVideo = variant === "video";

  return (
    <figure
      className={cn(
        "relative overflow-hidden",
        cardSurfaceClass,
        onOpen && cardInteractiveClass,
        className,
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        disabled={!onOpen}
        className={cn(
          "bg-section relative aspect-[4/3] w-full overflow-hidden",
          onOpen
            ? "cursor-pointer focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none"
            : "cursor-default",
        )}
        aria-label={isVideo ? `Play video: ${imageAlt}` : `View image: ${imageAlt}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
          className="object-cover"
        />
        {isVideo ? (
          <span
            className="bg-navy/55 text-on-dark absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="bg-accent text-navy inline-flex size-12 items-center justify-center rounded-full">
              <Play className="size-5 translate-x-0.5" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        ) : null}
      </button>

      {tag ? (
        <figcaption className="absolute bottom-3 left-3">
          {tagHref ? (
            <Link
              href={tagHref}
              className="relative z-10 inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              <Tag asLabel className="bg-surface/95 min-h-0 py-1">
                {tag}
              </Tag>
            </Link>
          ) : (
            <Tag asLabel className="bg-surface/95 min-h-0 py-1">
              {tag}
            </Tag>
          )}
        </figcaption>
      ) : null}
    </figure>
  );
}
