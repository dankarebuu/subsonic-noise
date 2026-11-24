import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-dirty-yellow border-2 border-ink shadow-[4px_4px_0_#8C2727] hover:bg-ink/90 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  secondary:
    "bg-muted-red text-paper-light border-2 border-ink shadow-[4px_4px_0_#2E2E2E] hover:bg-muted-red/90 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  ghost:
    "bg-paper-light text-ink border-2 border-ink hover:bg-ink hover:text-paper-light active:translate-y-px",
  danger:
    "bg-burnt-orange text-paper-light border-2 border-ink hover:bg-burnt-orange/90",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-[38px] px-3.5 py-1.5 text-xs tracking-wider",
  md: "min-h-[44px] px-5 py-2.5 text-xs tracking-[0.12em]",
  lg: "min-h-[48px] px-6 py-3 text-sm tracking-[0.12em]",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  type = "button",
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-mono font-bold uppercase transition-all duration-150 cursor-pointer disabled:opacity-45 disabled:pointer-events-none",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && "w-full",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
