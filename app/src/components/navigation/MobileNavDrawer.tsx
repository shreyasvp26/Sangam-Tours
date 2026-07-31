"use client";

import { useCallback, useId, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { Z_INDEX } from "@/constants";
import { mobileDrawerNav } from "@/config/navigation";
import { useFocusTrap, useScrollLock } from "@/hooks";
import { cn } from "@/lib/cn";
import { isActivePath } from "@/lib/navigation";

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Mobile navigation drawer — Document 06 Mobile Navigation Drawer.
 * Primary six items + Testimonials + FAQ. Single level only.
 */
export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const handleEscape = useCallback(() => onClose(), [onClose]);

  useScrollLock(open);
  useFocusTrap(open, rootRef, { initialFocusRef: closeRef, onEscape: handleEscape });

  return (
    <div
      ref={rootRef}
      className={cn(
        "fixed inset-0 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      style={{ zIndex: Z_INDEX.overlay }}
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        className={cn(
          "bg-navy/40 ease-standard absolute inset-0 transition-opacity duration-[var(--sangam-duration-base)]",
          open ? "opacity-100" : "opacity-0",
        )}
        aria-label="Close menu"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "bg-background shadow-card ease-standard absolute inset-y-0 right-0 flex w-full max-w-sm flex-col transition-transform duration-[var(--sangam-duration-base)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="px-container flex items-center justify-between border-b border-neutral-200 py-4">
          <p id={titleId} className="text-h4 text-foreground font-medium">
            Menu
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="size-touch text-foreground ease-standard inline-flex items-center justify-center rounded-sm transition-colors duration-[var(--sangam-duration-fast)] hover:bg-neutral-100 focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none"
            aria-label="Close menu"
          >
            <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-2">
          <ul>
            {mobileDrawerNav.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "min-h-touch text-body ease-standard flex items-center rounded-sm px-4 font-medium transition-colors duration-[var(--sangam-duration-fast)] focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none",
                      // Navy on light chip — Accent Green fails AA as body text on section (Doc 05 §11).
                      active ? "bg-section text-navy" : "text-foreground hover:bg-neutral-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
