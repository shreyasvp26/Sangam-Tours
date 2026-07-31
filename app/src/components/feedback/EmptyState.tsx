import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type EmptyStateProps = ClassNameProps & {
  title: ReactNode;
  description?: ReactNode;
  /** One clear resolving action (e.g. Clear Filters) — Document 06 §8. */
  action?: ReactNode;
};

/**
 * Empty State — Document 06 §8.
 * Explains a genuinely empty result; never a blank unexplained area.
 */
export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-section-tint flex flex-col items-center gap-4 rounded-lg px-6 py-12 text-center",
        className,
      )}
      role="status"
    >
      <h2 className="text-h3 text-foreground font-semibold">{title}</h2>
      {description ? <p className="text-body text-copy max-w-prose">{description}</p> : null}
      {action ? (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">{action}</div>
      ) : null}
    </div>
  );
}
