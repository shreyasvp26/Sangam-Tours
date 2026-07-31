import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type ErrorMessageProps = ClassNameProps & {
  title?: ReactNode;
  /** Calm explanation — Document 06 §8. */
  children: ReactNode;
  /** Clear next step (retry, WhatsApp Us fallback). */
  action?: ReactNode;
};

/**
 * Error Message — Document 06 §8.
 * Reassuring tone; never alarming or manipulative.
 */
export function ErrorMessage({ title, children, action, className }: ErrorMessageProps) {
  return (
    <div
      className={cn("border-error/40 bg-surface rounded-sm border px-4 py-3", className)}
      role="alert"
    >
      {title ? <p className="text-body text-foreground mb-1 font-medium">{title}</p> : null}
      <div className="text-body text-error">{children}</div>
      {action ? <div className="mt-3 flex flex-wrap items-center gap-3">{action}</div> : null}
    </div>
  );
}
