import type { ReactNode } from "react";

import { errorClass, hintClass, labelClass } from "@/components/forms/field-styles";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type FieldShellProps = ClassNameProps & {
  id: string;
  label: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
};

/**
 * Accessible field chrome: label, control slot, hint, and plain-language error.
 * Errors use colour and text (Document 05 §11 / Document 06 §6).
 */
export function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: FieldShellProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? (
          <span className="text-error" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={hintId} className={hintClass}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={errorClass} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(hintId?: string, errorId?: string) {
  return [errorId, hintId].filter(Boolean).join(" ") || undefined;
}
