import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type BreadcrumbItem = {
  label: string;
  /** Omit href on the current (last) segment. */
  href?: string;
};

export type BreadcrumbProps = ClassNameProps & {
  /**
   * Ordered trail. Package Detail pattern (Document 06 §3 / 03 §4.7):
   * Home → Domestic|International Tours → Package Name (current).
   */
  items: BreadcrumbItem[];
};

/**
 * Breadcrumb — Document 06 §3.
 * Package Detail only; never on one-level-deep pages.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("text-caption text-copy", className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1 || !item.href;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className="text-muted size-3.5 shrink-0"
                  strokeWidth={1.75}
                />
              ) : null}
              {isCurrent || !item.href ? (
                <span aria-current="page" className="text-foreground font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-royal ease-standard hover:text-navy rounded-sm underline-offset-2 transition-colors duration-[var(--sangam-duration-fast)] hover:underline focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
