import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type GridColumns = 1 | 2 | 3;
type GridGap = "default" | "tight" | "loose";

type GridOwnProps = {
  /**
   * Maximum columns at desktop.
   * Collapses per Document 04 §12: mobile 1 → tablet 2 → desktop 3 (when max allows).
   */
  columns?: GridColumns;
  gap?: GridGap;
  className?: string;
  children: ReactNode;
};

type GridProps<T extends ElementType> = GridOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof GridOwnProps | "as">;

const columnClass: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

const gapClass: Record<GridGap, string> = {
  default: "gap-grid",
  tight: "gap-4",
  loose: "gap-8",
};

/**
 * Shared responsive grid for Package, Gallery, and Testimonial layouts.
 * Document 05 §6 + Document 04 §12 — one underlying column logic.
 */
export function Grid<T extends ElementType = "div">({
  as,
  columns = 3,
  gap = "default",
  className,
  children,
  ...props
}: GridProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      className={cn("grid w-full", columnClass[columns], gapClass[gap], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
