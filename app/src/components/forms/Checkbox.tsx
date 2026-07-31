import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

import { errorClass, hintClass } from "@/components/forms/field-styles";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type CheckboxProps = ClassNameProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className" | "type"> & {
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    id?: string;
  };

/**
 * Checkbox — Document 06 §6.
 * Reserved for future consent/acknowledgment; not part of the eight-field Enquiry Form.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hint, error, id: idProp, className, required, disabled, ...props },
  ref,
) {
  const reactId = useId();
  const id = idProp ?? reactId;
  const hintId = hint && !error ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className={cn(
          "min-h-touch flex cursor-pointer items-start gap-3 rounded-sm",
          "focus-within:shadow-[var(--sangam-focus-ring)]",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "accent-accent mt-2 size-5 shrink-0 rounded-sm border border-neutral-200",
            "focus-visible:outline-none",
            "disabled:cursor-not-allowed",
            "aria-[invalid=true]:border-error",
          )}
          {...props}
        />
        <span className="text-body text-copy py-2.5">
          {label}
          {required ? (
            <>
              <span className="text-error" aria-hidden="true">
                {" "}
                *
              </span>
              <span className="sr-only"> (required)</span>
            </>
          ) : null}
        </span>
      </label>
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
});
