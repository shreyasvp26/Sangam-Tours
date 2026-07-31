import Image from "next/image";
import type { ReactNode } from "react";

import { cardPaddingClass, cardSurfaceClass } from "@/components/cards/card-shared";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type FeatureCardVariant = "statistic" | "profile";

type FeatureCardBase = ClassNameProps & {
  /** Primary figure (statistic) or heading (profile name). */
  heading: string;
  /** Supporting line — label for a statistic, or short bio for a profile. */
  support: string;
};

export type FeatureCardStatisticProps = FeatureCardBase & {
  variant?: "statistic";
  icon?: ReactNode;
  imageSrc?: never;
  imageAlt?: never;
};

export type FeatureCardProfileProps = FeatureCardBase & {
  variant: "profile";
  imageSrc?: string;
  imageAlt?: string;
  icon?: ReactNode;
};

export type FeatureCardProps = FeatureCardStatisticProps | FeatureCardProfileProps;

/**
 * Feature Card — Document 06 §5.
 * Statistic (Achievements) or Profile (Tour Managers) on About.
 * Static, informational only.
 */
export function FeatureCard(props: FeatureCardProps) {
  const { heading, support, className, icon } = props;
  const variant = props.variant ?? "statistic";
  const isProfile = variant === "profile";
  const imageSrc = isProfile ? props.imageSrc : undefined;
  const imageAlt = isProfile ? props.imageAlt : undefined;

  return (
    <article
      className={cn(
        "flex flex-col gap-3",
        cardSurfaceClass,
        cardPaddingClass,
        isProfile && "sm:flex-row sm:items-start sm:gap-5",
        className,
      )}
    >
      {imageSrc ? (
        <div className="bg-section relative size-20 shrink-0 overflow-hidden rounded-lg sm:size-24">
          <Image
            src={imageSrc}
            alt={imageAlt?.trim() ? imageAlt : heading}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
      ) : icon ? (
        <div
          className="bg-section-tint text-navy inline-flex size-11 shrink-0 items-center justify-center rounded-sm"
          aria-hidden="true"
        >
          {icon}
        </div>
      ) : null}

      <div className="flex min-w-0 flex-col gap-2">
        <p
          className={cn(
            "text-foreground font-bold",
            isProfile ? "text-h4" : "text-h2 tracking-tight",
          )}
        >
          {heading}
        </p>
        <p className="text-body text-copy">{support}</p>
      </div>
    </article>
  );
}
