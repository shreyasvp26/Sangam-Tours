import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type PageProps = {
  children: ReactNode;
  className?: string;
  /** Accessible name for the primary content landmark when helpful */
  "aria-label"?: string;
};

/**
 * Primary page content landmark.
 * Header and Footer wrap around this in the root layout.
 */
export function Page({ children, className, "aria-label": ariaLabel }: PageProps) {
  return (
    <main id="main-content" aria-label={ariaLabel} className={cn("w-full flex-1", className)}>
      {children}
    </main>
  );
}
