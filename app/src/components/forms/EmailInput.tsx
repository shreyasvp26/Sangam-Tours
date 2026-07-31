import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

import { describedBy, FieldShell } from "@/components/forms/FieldShell";
import { controlClass } from "@/components/forms/field-styles";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type EmailInputProps = ClassNameProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className" | "type"> & {
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    id?: string;
  };

/**
 * Email Input — Document 06 §6.
 * Email capture. Format validation belongs to Phase 2.4 / form wiring.
 */
export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(function EmailInput(
  {
    label,
    hint,
    error,
    id: idProp,
    className,
    required,
    disabled,
    autoComplete = "email",
    ...props
  },
  ref,
) {
  const reactId = useId();
  const id = idProp ?? reactId;
  const hintId = hint && !error ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <input
        ref={ref}
        id={id}
        type="email"
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hintId, errorId)}
        className={cn(controlClass, className)}
        {...props}
      />
    </FieldShell>
  );
});
