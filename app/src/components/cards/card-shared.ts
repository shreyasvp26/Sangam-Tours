import { cn } from "@/lib/cn";

/**
 * Shared card surface — Document 05 §4.4 / §9.
 * White surface, large radius, subtle elevation; identical across card types.
 */
export const cardSurfaceClass = cn("bg-surface shadow-card rounded-lg border border-neutral-200");

/** Light invite-to-explore motion — Document 07 § Cards. */
export const cardInteractiveClass = cn(
  "ease-standard transition-[box-shadow,transform] duration-[var(--sangam-duration-fast)]",
  "hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgb(9_35_92_/_0.1)]",
  "focus-visible:outline-none focus-visible:shadow-[var(--sangam-focus-ring)]",
  "motion-reduce:transform-none motion-reduce:transition-none",
);

export const cardPaddingClass = "p-5";
