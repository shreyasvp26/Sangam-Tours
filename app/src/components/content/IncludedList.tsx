import { Check } from "lucide-react";
import { useId, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type IncludedListProps = ClassNameProps & {
  items: ReactNode[];
  /** Heading — Document 05 §12 uses “Included”. */
  heading?: string;
};

/**
 * Included List — Document 06 §7.
 * Always pair adjacent to Excluded List (desktop beside / mobile above).
 * Icon + label — never colour alone (Document 05 §12).
 */
export function IncludedList({ items, heading = "Included", className }: IncludedListProps) {
  const headingId = useId();

  return (
    <section className={cn("flex flex-col gap-3", className)} aria-labelledby={headingId}>
      <h3 id={headingId} className="text-h4 text-foreground flex items-center gap-2 font-semibold">
        <span
          className="bg-success/15 text-success inline-flex size-8 items-center justify-center rounded-sm"
          aria-hidden="true"
        >
          <Check className="size-4" strokeWidth={2.25} />
        </span>
        {heading}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li key={index} className="text-body text-copy flex gap-3">
            <Check
              aria-hidden="true"
              className="text-success mt-1 size-4 shrink-0"
              strokeWidth={2.25}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
