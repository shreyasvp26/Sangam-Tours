import type { ReactNode } from "react";

import { cardPaddingClass, cardSurfaceClass } from "@/components/cards/card-shared";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type ValueCardProps = ClassNameProps & {
  /** Icon node (e.g. Lucide). Decorative; labelled by the card title. */
  icon: ReactNode;
  label: string;
  explanation: string;
};

/**
 * Value Card — Document 06 §5.
 * Minimal brand-differentiator tile for Homepage and About Values.
 * Content must map to Document 01 §5 core values — never invent new ones at the call site.
 */
export function ValueCard({ icon, label, explanation, className }: ValueCardProps) {
  return (
    <article className={cn("flex flex-col gap-3", cardSurfaceClass, cardPaddingClass, className)}>
      <div
        className="bg-section-tint text-navy inline-flex size-11 items-center justify-center rounded-sm"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="text-h4 text-foreground font-semibold">{label}</h3>
      <p className="text-body text-copy">{explanation}</p>
    </article>
  );
}
