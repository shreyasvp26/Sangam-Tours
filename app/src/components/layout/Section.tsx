import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { TravelStickerField } from "@/components/media/TravelStickerField";
import { cn } from "@/lib/cn";

type SectionTone = "default" | "muted" | "tint" | "navy" | "royal";
type SectionSpacing = "default" | "compact" | "none";

type SectionOwnProps = {
  tone?: SectionTone;
  spacing?: SectionSpacing;
  /**
   * Travel sticker backdrop on light sections.
   * Defaults on for default/muted/tint; off for navy/royal.
   * Pass false to opt out (e.g. breadcrumbs, loading shells).
   */
  stickers?: boolean;
  className?: string;
  children: ReactNode;
};

type SectionProps<T extends ElementType> = SectionOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof SectionOwnProps | "as">;

const toneClass: Record<SectionTone, string> = {
  /** Primary page canvas — Document 05 §4.4 */
  default: "bg-background text-copy",
  /** Neutral 100 alternating sections */
  muted: "bg-section text-copy",
  /** Light Royal Blue tint alternating sections */
  tint: "bg-section-tint text-copy",
  /** Intentional dark band */
  navy: "bg-navy text-on-dark",
  royal: "bg-royal text-on-dark",
};

const spacingClass: Record<SectionSpacing, string> = {
  /** Major chapter spacing — Document 05 §6 */
  default: "py-section",
  compact: "py-8 md:py-10",
  none: "py-0",
};

const lightTones: ReadonlySet<SectionTone> = new Set(["default", "muted", "tint"]);

/**
 * Vertical page chapter with shared surface and spacing rhythm.
 * Layout primitive only — not Document 06 Section Heading.
 */
export function Section<T extends ElementType = "section">({
  as,
  tone = "default",
  spacing = "default",
  stickers,
  className,
  children,
  ...props
}: SectionProps<T>) {
  const Component = (as ?? "section") as ElementType;
  const showStickers = stickers ?? lightTones.has(tone);

  return (
    <Component
      className={cn(
        toneClass[tone],
        spacingClass[spacing],
        showStickers && "relative overflow-hidden",
        className,
      )}
      {...props}
    >
      {showStickers ? (
        <TravelStickerField density={spacing === "compact" || spacing === "none" ? "sparse" : "default"} />
      ) : null}
      {showStickers ? <div className="relative z-10">{children}</div> : children}
    </Component>
  );
}
