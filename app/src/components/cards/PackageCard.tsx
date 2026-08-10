import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/content";
import { CTA_LABELS } from "@/components/cta/labels";
import { cardInteractiveClass } from "@/components/cards/card-shared";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type PackageCardProps = ClassNameProps & {
  /** Package Detail URL — Document 03 §9 `/packages/{slug}`. */
  href: string;
  name: string;
  duration: string;
  /** Starting price as already-formatted display text (e.g. "₹24,999"). */
  startingPrice: string;
  /** Next departure as already-formatted display text. */
  nextDeparture: string;
  imageSrc: string;
  imageAlt: string;
  /** Optional destination-type tag when filtering is active (Document 06 §5). */
  tag?: string;
};

/**
 * Package Card — Document 06 §5.
 * Hero-style full-bleed photo with navy scrim; one layout for Homepage,
 * listings, and Related Packages. Whole card navigates; sole CTA is View Package.
 */
export function PackageCard({
  href,
  name,
  duration,
  startingPrice,
  nextDeparture,
  imageSrc,
  imageAlt,
  tag,
  className,
}: PackageCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex aspect-[3/4] flex-col overflow-hidden rounded-lg",
        "shadow-card focus-visible:outline-none",
        cardInteractiveClass,
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 40vw, 20rem"
        quality={75}
        className="ease-standard object-cover transition-transform duration-[var(--sangam-duration-slow)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      {/* Bottom-heavy navy scrim — same language as the homepage hero. */}
      <div
        className="from-navy/95 via-navy/55 absolute inset-0 bg-gradient-to-t to-transparent"
        aria-hidden="true"
      />

      <div className="relative mt-auto flex flex-col gap-3 p-5">
        {tag ? (
          <Tag asLabel className="bg-surface/95 text-foreground min-h-0 w-fit py-1">
            {tag}
          </Tag>
        ) : null}

        <h3 className="text-h4 text-on-dark font-semibold tracking-tight">{name}</h3>

        <dl className="text-body text-on-dark/85 flex flex-col gap-1">
          <div className="flex justify-between gap-3">
            <dt className="text-on-dark/65 text-caption">Duration</dt>
            <dd>{duration}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-on-dark/65 text-caption">Starting from</dt>
            <dd className="text-on-dark font-medium">{startingPrice}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-on-dark/65 text-caption">Next departure</dt>
            <dd>{nextDeparture}</dd>
          </div>
        </dl>

        {/* Visual View Package affordance inside the card link — avoids nested anchors. */}
        <span
          className={cn(
            "text-body text-on-dark min-h-touch border-on-dark/45 inline-flex w-full items-center justify-center rounded-sm border px-5 font-medium",
            "ease-standard transition-colors duration-[var(--sangam-duration-fast)]",
            "group-hover:border-accent group-hover:bg-accent/15",
          )}
          aria-hidden="true"
        >
          {CTA_LABELS.viewPackage}
        </span>
      </div>
    </Link>
  );
}
