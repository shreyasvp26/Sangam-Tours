import { Phone } from "lucide-react";

import { PrimaryCTA, type ButtonCTAProps } from "@/components/cta/cta-shared";
import { CTA_LABELS } from "@/components/cta/labels";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type CallButtonProps = ClassNameProps &
  Omit<ButtonCTAProps, "children" | "href" | "external"> & {
    /** Override dial target; defaults to canonical primary phone. */
    href?: string;
    /**
     * labelled — text CTA for clusters/cards (Document 06 §4).
     * icon — compact header/utility control (same component, icon form).
     */
    appearance?: "labelled" | "icon";
    onDark?: boolean;
  };

/**
 * Call Button — Document 06 §4.
 * Label fixed as "Call Now". Equal visual weight with Book Now / WhatsApp Us in clusters.
 */
export function CallButton({
  href = siteConfig.primaryPhone.telHref,
  appearance = "labelled",
  onDark = false,
  className,
  ...props
}: CallButtonProps) {
  if (appearance === "icon") {
    return (
      <a
        href={href}
        aria-label={CTA_LABELS.callNow}
        className={cn(
          "size-touch ease-standard inline-flex items-center justify-center rounded-sm transition-colors duration-[var(--sangam-duration-fast)]",
          onDark
            ? "text-on-dark hover:bg-white/10 focus-visible:shadow-[var(--sangam-focus-ring-on-dark)]"
            : "text-navy hover:bg-neutral-100 focus-visible:shadow-[var(--sangam-focus-ring)]",
          className,
        )}
      >
        <Phone aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </a>
    );
  }

  return (
    <PrimaryCTA href={href} className={className} {...props}>
      {CTA_LABELS.callNow}
    </PrimaryCTA>
  );
}
