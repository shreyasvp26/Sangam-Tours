"use client";

import { useCallback, useState } from "react";

import { CallButton } from "@/components/cta/CallButton";
import { PrimaryCTA } from "@/components/cta/cta-shared";
import { CTA_LABELS } from "@/components/cta/labels";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { Z_INDEX } from "@/constants/z-index";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type StickyMobileCTABarProps = ClassNameProps & {
  /** Book Now target — typically in-page Enquiry section hash or path. */
  bookHref: string;
  callHref?: string;
  whatsappHref?: string;
  whatsappMessage?: string;
  /**
   * Controlled visibility. When set, observer props are ignored.
   * Hidden above Hero; Visible after scrolling past Hero (Document 06 §3).
   */
  visible?: boolean;
  /**
   * Show the bar once this element scrolls out of the top of the viewport (Hero).
   * Used when `visible` is uncontrolled.
   */
  showAfterElementId?: string;
  /**
   * Hide while this element intersects the viewport (Enquiry/CTA section),
   * so the bar never obstructs it (Document 06 §3).
   */
  hideWhenElementVisibleId?: string;
};

function useStickyBarVisibility(
  controlled: boolean | undefined,
  showAfterElementId?: string,
  hideWhenElementVisibleId?: string,
) {
  const [pastHero, setPastHero] = useState(() => controlled === undefined && !showAfterElementId);
  const [enquiryVisible, setEnquiryVisible] = useState(false);

  const observe = useCallback(() => {
    if (controlled !== undefined) {
      return;
    }

    const observers: IntersectionObserver[] = [];

    if (showAfterElementId) {
      const hero = document.getElementById(showAfterElementId);
      if (hero) {
        const heroObserver = new IntersectionObserver(
          ([entry]) => {
            // Visible when hero is no longer intersecting the top band.
            setPastHero(!entry?.isIntersecting);
          },
          { root: null, threshold: 0, rootMargin: "0px 0px 0px 0px" },
        );
        heroObserver.observe(hero);
        observers.push(heroObserver);
      }
    } else {
      setPastHero(true);
    }

    if (hideWhenElementVisibleId) {
      const enquiry = document.getElementById(hideWhenElementVisibleId);
      if (enquiry) {
        const enquiryObserver = new IntersectionObserver(
          ([entry]) => {
            setEnquiryVisible(Boolean(entry?.isIntersecting));
          },
          { root: null, threshold: 0.15 },
        );
        enquiryObserver.observe(enquiry);
        observers.push(enquiryObserver);
      }
    }

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [controlled, showAfterElementId, hideWhenElementVisibleId]);

  useIsomorphicLayoutEffect(() => {
    return observe();
  }, [observe]);

  if (controlled !== undefined) {
    return controlled;
  }

  return pastHero && !enquiryVisible;
}

/**
 * Sticky Mobile CTA Bar — Document 06 §3.
 * Mobile only; equal-weight Book Now / WhatsApp Us / Call Now.
 */
export function StickyMobileCTABar({
  bookHref,
  callHref,
  whatsappHref,
  whatsappMessage,
  visible: visibleProp,
  showAfterElementId,
  hideWhenElementVisibleId,
  className,
}: StickyMobileCTABarProps) {
  const visible = useStickyBarVisibility(visibleProp, showAfterElementId, hideWhenElementVisibleId);

  const compactClass = "min-h-touch flex-1 px-2 text-caption sm:px-3 sm:text-body";

  return (
    <div
      className={cn(
        "bg-surface/95 ease-standard fixed inset-x-0 bottom-0 border-t border-neutral-200 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgb(9_35_92_/_0.08)] backdrop-blur-md transition-transform duration-[var(--sangam-duration-base)] md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
        className,
      )}
      style={{ zIndex: Z_INDEX.stickyCta }}
      aria-hidden={!visible}
      inert={!visible ? true : undefined}
    >
      <div className="max-w-container mx-auto flex gap-2" role="group" aria-label="Quick actions">
        <PrimaryCTA href={bookHref} className={compactClass}>
          {CTA_LABELS.bookNow}
        </PrimaryCTA>
        <WhatsAppButton href={whatsappHref} message={whatsappMessage} className={compactClass} />
        <CallButton href={callHref} className={compactClass} />
      </div>
    </div>
  );
}
