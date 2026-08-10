"use client";

import { ChevronDown } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type AccordionItem = {
  id?: string;
  title: ReactNode;
  content: ReactNode;
  /** When true, item starts expanded. Default collapsed (Document 06 §7). */
  defaultOpen?: boolean;
};

export type AccordionProps = ClassNameProps & {
  items: AccordionItem[];
  /**
   * When true, only one item may be open at a time.
   * Default false — independent disclosures (FAQ / itinerary).
   */
  exclusive?: boolean;
};

/**
 * Accordion — Document 06 §7.
 * Single-level disclosure only; never nest Accordion inside Accordion.
 */
export function Accordion({ items, exclusive = false, className }: AccordionProps) {
  const baseId = useId();
  const headerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    items.forEach((item, index) => {
      if (item.defaultOpen) {
        initial.add(item.id ?? `${baseId}-${index}`);
      }
    });
    return initial;
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.has(id)) {
        const next = new Set(prev);
        next.delete(id);
        return next;
      }
      if (exclusive) {
        return new Set([id]);
      }
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const focusHeader = (index: number) => {
    const clamped = (index + items.length) % items.length;
    headerRefs.current[clamped]?.focus();
  };

  const onHeaderKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusHeader(index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusHeader(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusHeader(0);
        break;
      case "End":
        event.preventDefault();
        focusHeader(items.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={cn(
        "bg-surface shadow-card divide-neutral-200/80 flex flex-col divide-y overflow-hidden rounded-lg border border-neutral-200",
        className,
      )}
    >
      {items.map((item, index) => {
        const id = item.id ?? `${baseId}-${index}`;
        const panelId = `${id}-panel`;
        const headerId = `${id}-header`;
        const isOpen = openIds.has(id);

        return (
          <div key={id} className={cn(isOpen && "bg-section-tint/40")}>
            <h3 className="m-0">
              <button
                ref={(node) => {
                  headerRefs.current[index] = node;
                }}
                type="button"
                id={headerId}
                className={cn(
                  "text-body text-foreground ease-standard min-h-touch flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left font-medium md:px-5",
                  "transition-colors duration-[var(--sangam-duration-fast)]",
                  "hover:bg-section-tint/70",
                  "focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none",
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(id)}
                onKeyDown={(event) => onHeaderKeyDown(event, index)}
              >
                <span className="leading-snug">{item.title}</span>
                <span
                  className={cn(
                    "bg-section text-navy inline-flex size-8 shrink-0 items-center justify-center rounded-full",
                    "ease-standard transition-colors duration-[var(--sangam-duration-fast)]",
                    isOpen && "bg-navy text-on-dark",
                  )}
                  aria-hidden="true"
                >
                  <ChevronDown
                    className={cn(
                      "ease-standard size-4 transition-transform duration-[var(--sangam-duration-fast)]",
                      isOpen && "rotate-180",
                    )}
                    strokeWidth={2}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={cn("text-body text-copy px-4 pb-5 md:px-5", !isOpen && "hidden")}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
