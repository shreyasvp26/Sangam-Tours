import { X } from "lucide-react";
import { useId, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type ExcludedListProps = ClassNameProps & {
  items: ReactNode[];
  /**
   * Heading — Document 05 §12 / brand “Not Included”.
   * Component name remains Excluded List (Document 06 §7).
   */
  heading?: string;
};

/**
 * Excluded List — Document 06 §7.
 * Always pair adjacent to Included List. Icon + label required (Document 05 §12).
 */
export function ExcludedList({ items, heading = "Not Included", className }: ExcludedListProps) {
  const headingId = useId();

  return (
    <section className={cn("flex flex-col gap-3", className)} aria-labelledby={headingId}>
      <h3 id={headingId} className="text-h4 text-foreground flex items-center gap-2 font-semibold">
        <span
          className="bg-error/15 text-error inline-flex size-8 items-center justify-center rounded-sm"
          aria-hidden="true"
        >
          <X className="size-4" strokeWidth={2.25} />
        </span>
        {heading}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li key={index} className="text-body text-copy flex gap-3">
            <X aria-hidden="true" className="text-error mt-1 size-4 shrink-0" strokeWidth={2.25} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
