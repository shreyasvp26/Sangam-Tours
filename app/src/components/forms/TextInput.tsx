import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

import { describedBy, FieldShell } from "@/components/forms/FieldShell";
import { controlClass } from "@/components/forms/field-styles";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type TextInputProps = ClassNameProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className" | "type"> & {
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    id?: string;
  };

/**
 * Text Input — Document 06 §6.
 * Short free-text (Name, City). States via native focus/disabled + `error` prop.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, hint, error, id: idProp, className, required, disabled, ...props },
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
        type="text"
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
