import { cn } from "@/lib/cn";

/** Shared control chrome — Document 05 radius-sm, neutral borders, error color + text nearby. */
export const controlClass = cn(
  "w-full min-h-touch rounded-sm border border-neutral-200 bg-surface px-4 text-body text-copy",
  "transition-colors duration-[var(--sangam-duration-fast)] ease-standard",
  "placeholder:text-muted",
  "hover:border-neutral-300",
  "focus-visible:border-royal focus-visible:outline-none focus-visible:shadow-[var(--sangam-focus-ring)]",
  "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
  "aria-[invalid=true]:border-error aria-[invalid=true]:focus-visible:shadow-[0_0_0_3px_rgb(211_47_47_/_0.35)]",
);

export const labelClass = "text-body font-medium text-foreground";

export const hintClass = "text-caption text-muted";

export const errorClass = "text-caption text-error";
