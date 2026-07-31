import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

import { describedBy, FieldShell } from "@/components/forms/FieldShell";
import { controlClass } from "@/components/forms/field-styles";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type DropdownProps = ClassNameProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className"> & {
    label: ReactNode;
    options: readonly DropdownOption[];
    placeholder?: string;
    hint?: ReactNode;
    error?: ReactNode;
    id?: string;
  };

/**
 * Dropdown — Document 06 §6.
 * Fixed-option selection (Package Interested In, Number of Travellers).
 * Native select for accessible Open / Selected / Focus behaviour.
 */
export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(function Dropdown(
  {
    label,
    options,
    placeholder = "Select an option",
    hint,
    error,
    id: idProp,
    className,
    required,
    disabled,
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
      <div className="relative">
        <select
          ref={ref}
          id={id}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(hintId, errorId)}
          className={cn(controlClass, "appearance-none pr-11", className)}
          {...props}
        >
          <option value="" disabled={required}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-neutral-500"
          strokeWidth={1.75}
        />
      </div>
    </FieldShell>
  );
});
