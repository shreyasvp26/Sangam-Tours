import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerWidth = "default" | "narrow" | "full";

type ContainerOwnProps = {
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
};

type ContainerProps<T extends ElementType> = ContainerOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof ContainerOwnProps | "as">;

const widthClass: Record<ContainerWidth, string> = {
  /** Constrained page content — Document 05 §6 */
  default: "mx-auto w-full max-w-container px-container",
  /** Body copy / legal reading width — Document 05 §5.7 */
  narrow: "mx-auto w-full max-w-prose px-container",
  /** Full-bleed wrappers that still honor edge padding when needed */
  full: "w-full px-container",
};

/**
 * Horizontal page constraint and edge padding.
 * Document 05 §6 — mobile full-bleed with padding; desktop centered max width.
 */
export function Container<T extends ElementType = "div">({
  as,
  width = "default",
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component className={cn(widthClass[width], className)} {...props}>
      {children}
    </Component>
  );
}
