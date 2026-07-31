import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

import { describedBy, FieldShell } from "@/components/forms/FieldShell";
import { controlClass } from "@/components/forms/field-styles";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type DatePickerProps = ClassNameProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className" | "type"> & {
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    id?: string;
    /** Optional allowed departure dates (YYYY-MM-DD) for constraint-aware pickers. */
    allowedDates?: readonly string[];
  };

/**
 * Date Picker — Document 06 §6.
 * Preferred travel date. Native date input; callers may pass min/max/allowedDates.
 * Custom calendar UI is deferred — native control covers required states accessibly.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  { label, hint, error, id: idProp, className, required, disabled, allowedDates, list, ...props },
  ref,
) {
  const reactId = useId();
  const id = idProp ?? reactId;
  const listId = allowedDates?.length ? `${id}-dates` : list;
  const hintId = hint && !error ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <input
        ref={ref}
        id={id}
        type="date"
        list={listId}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hintId, errorId)}
        className={cn(controlClass, className)}
        {...props}
      />
      {allowedDates?.length ? (
        <datalist id={`${id}-dates`}>
          {allowedDates.map((date) => (
            <option key={date} value={date} />
          ))}
        </datalist>
      ) : null}
    </FieldShell>
  );
});
