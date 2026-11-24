import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  id,
  className,
  ...rest
}: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full min-h-[44px] bg-paper-light px-3.5 py-2.5 font-mono text-sm text-ink border-2 transition-colors placeholder:text-concrete",
          error
            ? "border-muted-red focus:border-muted-red"
            : "border-ink focus:border-muted-red",
          className
        )}
        {...rest}
      />
      {error && (
        <p className="font-mono text-xs font-bold text-muted-red" role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="font-mono text-[11px] text-concrete">{hint}</p>
      )}
    </div>
  );
}
