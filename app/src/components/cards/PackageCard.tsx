import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/content";
import { CTA_LABELS } from "@/components/cta/labels";
import { secondaryCTAClass } from "@/components/cta/cta-shared";
import {
  cardInteractiveClass,
  cardPaddingClass,
  cardSurfaceClass,
} from "@/components/cards/card-shared";
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
 * One layout for Homepage, listings, and Related Packages.
 * Whole card navigates; sole CTA is View Package (no Book/WhatsApp/Call).
 */
export function PackageCard({
  href,
  name,
  duration,
  startingPrice,
  nextDeparture,
  imageSrc,
  tag,
  className,
}: PackageCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden",
        cardSurfaceClass,
        cardInteractiveClass,
        className,
      )}
    >
      <div className="bg-section relative aspect-[4/3] w-full overflow-hidden" aria-hidden="true">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
          className="object-cover"
        />
        {tag ? (
          <div className="absolute top-3 left-3">
            <Tag asLabel className="bg-surface/95 min-h-0 py-1">
              {tag}
            </Tag>
          </div>
        ) : null}
      </div>

      <div className={cn(cardPaddingClass, "flex flex-1 flex-col gap-3")}>
        <h3 className="text-h4 text-foreground font-semibold">{name}</h3>
        <dl className="text-body text-copy flex flex-col gap-1">
          <div className="flex justify-between gap-3">
            <dt className="text-muted text-caption">Duration</dt>
            <dd>{duration}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted text-caption">Starting from</dt>
            <dd className="text-foreground font-medium">{startingPrice}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted text-caption">Next departure</dt>
            <dd>{nextDeparture}</dd>
          </div>
        </dl>
        {/* Visual View Package affordance inside the card link — avoids nested anchors. */}
        <span
          className={cn(secondaryCTAClass, "pointer-events-none mt-auto w-full")}
          aria-hidden="true"
        >
          {CTA_LABELS.viewPackage}
        </span>
      </div>
    </Link>
  );
}
