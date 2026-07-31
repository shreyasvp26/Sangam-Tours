import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/content";
import { cardPaddingClass, cardSurfaceClass } from "@/components/cards/card-shared";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type TestimonialCardVariant = "compact" | "featured";

export type TestimonialCardProps = ClassNameProps & {
  reviewerName: string;
  city: string;
  quote: string;
  /** Package or destination travelled (Document 06 §5 optional). */
  packageLabel?: string;
  /** Persona indicator — family, senior, solo, couple (Document 06 §5). */
  persona?: string;
  photoSrc?: string;
  photoAlt?: string;
  /**
   * compact — Homepage / Package Detail.
   * featured — larger format on the Testimonials page.
   */
  variant?: TestimonialCardVariant;
  /** Optional link to a full review on the Testimonials page. */
  href?: string;
};

/**
 * Testimonial Card — Document 06 §5.
 * Static social proof; never fabricated content at the call site.
 */
export function TestimonialCard({
  reviewerName,
  city,
  quote,
  packageLabel,
  persona,
  photoSrc,
  photoAlt,
  variant = "compact",
  href,
  className,
}: TestimonialCardProps) {
  const isFeatured = variant === "featured";

  const body = (
    <>
      {photoSrc ? (
        <div
          className={cn(
            "bg-section relative shrink-0 overflow-hidden rounded-full",
            isFeatured ? "size-16" : "size-12",
          )}
        >
          <Image
            src={photoSrc}
            alt={photoAlt?.trim() ? photoAlt : `Photo of ${reviewerName}`}
            fill
            sizes={isFeatured ? "64px" : "48px"}
            className="object-cover"
          />
        </div>
      ) : null}

      <blockquote
        className={cn(
          "text-copy",
          isFeatured ? "text-body-lg" : "text-body",
          "before:content-['“'] after:content-['”']",
        )}
      >
        {quote}
      </blockquote>

      <footer className="mt-auto flex flex-col gap-2">
        <cite className="text-foreground not-italic">
          <span className="font-semibold">{reviewerName}</span>
          <span className="text-muted"> · {city}</span>
        </cite>
        {(packageLabel || persona) && (
          <div className="flex flex-wrap gap-2">
            {packageLabel ? (
              <Tag asLabel className="min-h-0 py-1">
                {packageLabel}
              </Tag>
            ) : null}
            {persona ? (
              <Tag asLabel className="min-h-0 py-1">
                {persona}
              </Tag>
            ) : null}
          </div>
        )}
      </footer>
    </>
  );

  const classes = cn(
    "flex flex-col gap-4",
    cardSurfaceClass,
    cardPaddingClass,
    isFeatured && "gap-5 md:p-8",
    href &&
      "ease-standard focus-visible:shadow-[var(--sangam-focus-ring)] transition-shadow duration-[var(--sangam-duration-fast)] hover:shadow-[0_4px_16px_rgb(9_35_92_/_0.1)] focus-visible:outline-none",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }

  return <article className={classes}>{body}</article>;
}
