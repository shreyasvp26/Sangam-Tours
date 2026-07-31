import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type LogoVariant = "full" | "icon";

type LogoProps = ClassNameProps & {
  variant?: LogoVariant;
  /** When set, wraps the mark in a link (typically home). */
  href?: string;
  /** Compress mark size (e.g. scrolled header / footer bar). */
  compact?: boolean;
  priority?: boolean;
  /** Use on-dark mark + wordmark treatment (header/footer navy). */
  onDark?: boolean;
};

/**
 * Logo — Document 06 §9 Media.
 * Official mark + Bebas wordmark + Since 1979 (Document 01 / 05).
 * Soft plate behind the mark on dark chrome for clear brand presence.
 */
export function Logo({
  variant = "full",
  href,
  compact = false,
  priority = false,
  onDark = false,
  className,
}: LogoProps) {
  const markSrc = onDark ? "/brand/logo-mark-on-dark.png" : "/brand/logo-mark.png";
  const markSize = compact ? "size-10 md:size-11" : "size-12 md:size-[3.25rem]";
  const plateSize = compact ? "size-11 md:size-12" : "size-[3.25rem] md:size-14";

  const mark = (
    <span className={cn("inline-flex items-center gap-3 md:gap-3.5", className)}>
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center",
          onDark
            ? cn("rounded-full bg-white/[0.08] ring-1 ring-white/15", plateSize)
            : plateSize,
        )}
      >
        <Image
          src={markSrc}
          alt={variant === "icon" ? siteConfig.name : ""}
          width={56}
          height={56}
          priority={priority}
          className={cn("object-contain", markSize)}
        />
      </span>

      {variant === "full" ? (
        <span className="flex min-w-0 flex-col justify-center">
          <span
            className={cn(
              "font-logo leading-[0.9] tracking-[0.05em] uppercase",
              compact ? "text-[1.5rem] md:text-[1.75rem]" : "text-[1.75rem] md:text-[2.125rem]",
              onDark ? "text-on-dark" : "text-foreground",
            )}
          >
            {siteConfig.name}
          </span>
          <span
            className={cn(
              "mt-1.5 text-[0.6875rem] leading-none font-medium tracking-[0.16em] uppercase md:text-[0.75rem]",
              onDark ? "text-on-dark/65" : "text-muted",
            )}
          >
            {siteConfig.sinceLabel}
          </span>
        </span>
      ) : null}
    </span>
  );

  if (!href) {
    return mark;
  }

  return (
    <Link
      href={href}
      className={cn(
        "min-h-touch inline-flex shrink-0 rounded-sm",
        onDark && "focus-visible:shadow-[var(--sangam-focus-ring-on-dark)]",
      )}
      aria-label={`${siteConfig.name} home`}
    >
      {mark}
    </Link>
  );
}
