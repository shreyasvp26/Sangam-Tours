import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type SuccessMessageProps = ClassNameProps & {
  title: ReactNode;
  /** What happened and what happens next — Document 06 §8. */
  description?: ReactNode;
  children?: ReactNode;
};

/**
 * Success Message — Document 06 §8.
 * In-place confirmation; never a separate page navigation.
 */
export const SuccessMessage = forwardRef<HTMLDivElement, SuccessMessageProps>(
  function SuccessMessage({ title, description, children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "border-success/30 bg-section rounded-lg border px-6 py-8 text-center",
          className,
        )}
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <p className="text-h3 text-foreground font-medium">{title}</p>
        {description ? <p className="text-body text-copy mt-3">{description}</p> : null}
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    );
  },
);
