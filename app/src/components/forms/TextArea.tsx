import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from "react";

import { describedBy, FieldShell } from "@/components/forms/FieldShell";
import { controlClass } from "@/components/forms/field-styles";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type TextAreaProps = ClassNameProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className"> & {
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    id?: string;
  };

/**
 * Text Area — Document 06 §6.
 * Longer free-text (Message). Optional on Enquiry Form.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, hint, error, id: idProp, className, required, disabled, rows = 4, ...props },
  ref,
) {
  const reactId = useId();
  const id = idProp ?? reactId;
  const hintId = hint && !error ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hintId, errorId)}
        className={cn(controlClass, "min-h-28 resize-y py-3", className)}
        {...props}
      />
    </FieldShell>
  );
});
