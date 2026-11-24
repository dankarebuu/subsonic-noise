import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "yellow" | "red" | "ink" | "paper" | "live";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const BADGE_CLASSES: Record<BadgeVariant, string> = {
  yellow: "bg-dirty-yellow text-ink border border-ink",
  red: "bg-muted-red text-paper-light border border-ink",
  ink: "bg-ink text-dirty-yellow border border-ink",
  paper: "bg-paper-light text-ink border border-ink",
  live: "bg-paper-light text-ink border-2 border-ink shadow-[3px_3px_0_#2E2E2E]",
};

export function Badge({
  variant = "paper",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em]",
        BADGE_CLASSES[variant],
        className
      )}
      {...rest}
    >
      {variant === "live" && (
        <span
          className="h-2 w-2 rounded-full bg-olive animate-pulse shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
