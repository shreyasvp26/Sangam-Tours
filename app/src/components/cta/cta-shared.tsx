import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type CTASharedProps = ClassNameProps & {
  children: ReactNode;
  href?: string;
  external?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

export type ButtonCTAProps = CTASharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "disabled">;

const baseClass =
  "inline-flex min-h-touch items-center justify-center gap-2 rounded-sm px-5 text-body font-medium transition-colors duration-[var(--sangam-duration-fast)] ease-standard focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

export const primaryCTAClass = cn(
  baseClass,
  "bg-accent text-navy hover:bg-accent/90 focus-visible:shadow-[var(--sangam-focus-ring)] active:bg-accent/80",
);

export const secondaryCTAClass = cn(
  baseClass,
  "border border-navy bg-transparent text-navy hover:bg-navy hover:text-on-dark focus-visible:shadow-[var(--sangam-focus-ring)] active:bg-navy/90 active:text-on-dark",
);

export const tertiaryCTAClass = cn(
  "inline-flex min-h-touch items-center justify-center gap-1 rounded-sm text-body font-medium text-royal underline-offset-4 transition-colors duration-[var(--sangam-duration-fast)] ease-standard hover:text-navy hover:underline focus-visible:outline-none focus-visible:shadow-[var(--sangam-focus-ring)] active:text-navy/80",
);

function CTAContent({ children, loading }: { children: ReactNode; loading?: boolean }) {
  return (
    <>
      {loading ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : null}
      <span>{children}</span>
    </>
  );
}

function renderCTA(
  {
    children,
    className,
    href,
    external,
    loading,
    disabled,
    type = "button",
    ...props
  }: ButtonCTAProps,
  variantClass: string,
) {
  const classes = cn(variantClass, className);
  const isDisabled = Boolean(disabled || loading);

  if (href && !isDisabled) {
    return (
      <Link
        href={href}
        className={classes}
        aria-busy={loading || undefined}
        {...(external
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : undefined)}
      >
        <CTAContent loading={loading}>{children}</CTAContent>
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      <CTAContent loading={loading}>{children}</CTAContent>
    </button>
  );
}

/**
 * Primary CTA — Document 06 §4.
 * Accent Green fill; reserved for Book Now and single primary actions.
 * Navy label on accent for contrast (Document 05 §11).
 */
export function PrimaryCTA(props: ButtonCTAProps) {
  return renderCTA(props, primaryCTAClass);
}

/**
 * Secondary CTA — Document 06 §4.
 * Navigational / second-tier actions — never Book Now / WhatsApp Us / Call Now in a cluster.
 */
export function SecondaryCTA(props: ButtonCTAProps) {
  return renderCTA(props, secondaryCTAClass);
}

/**
 * Tertiary CTA — Document 06 §4.
 * Lowest-emphasis actions (Clear Filters, Read More).
 */
export function TertiaryCTA(props: ButtonCTAProps) {
  return renderCTA(props, tertiaryCTAClass);
}
