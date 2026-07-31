import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type BadgeProps = ClassNameProps & {
  children: ReactNode;
};

/**
 * Badge — Document 06 §7.
 * Factual status marker only (e.g. "Since 1979"). Never interactive; never scarcity/urgency.
 */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "bg-section-tint text-caption text-navy inline-flex items-center rounded-sm px-3 py-1 font-medium tracking-wide uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

type TagProps = ClassNameProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    children: ReactNode;
    selected?: boolean;
    /** Non-interactive category label (e.g. on a Package Card). */
    asLabel?: boolean;
  };

/**
 * Tag — Document 06 §7.
 * Categorisation / filter chip. Distinct from Badge (trust fact vs category).
 */
export function Tag({
  children,
  className,
  selected = false,
  asLabel = false,
  type = "button",
  ...props
}: TagProps) {
  const classes = cn(
    "inline-flex min-h-touch items-center rounded-sm border px-3 text-caption font-medium transition-colors duration-[var(--sangam-duration-fast)] ease-standard",
    selected ? "border-accent bg-accent/15 text-navy" : "border-neutral-200 bg-surface text-copy",
    !asLabel &&
      "hover:border-royal focus-visible:outline-none focus-visible:shadow-[var(--sangam-focus-ring)]",
    className,
  );

  if (asLabel) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button type={type} className={classes} aria-pressed={selected} {...props}>
      {children}
    </button>
  );
}

type DividerProps = ClassNameProps & {
  decorative?: boolean;
};

/**
 * Divider — Document 06 §7.
 * Thin break only where spacing alone is insufficient (Document 05 §9).
 */
export function Divider({ className, decorative = true }: DividerProps) {
  return (
    <hr
      className={cn("border-0 border-t border-neutral-200", className)}
      aria-hidden={decorative || undefined}
    />
  );
}

type SectionHeadingProps = ClassNameProps & {
  title: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "start" | "center";
};

/**
 * Section Heading — Document 06 §7.
 * Consistent section label; optional one-line supporting subheading.
 */
export function SectionHeading({
  title,
  description,
  as: HeadingTag = "h2",
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-prose flex-col gap-3",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <HeadingTag
        className={cn("text-foreground font-bold", HeadingTag === "h1" ? "text-h1" : "text-h2")}
      >
        {title}
      </HeadingTag>
      {description ? <p className="text-body-lg text-copy">{description}</p> : null}
    </div>
  );
}
