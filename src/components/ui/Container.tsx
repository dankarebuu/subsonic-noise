import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
}

export function Container({
  narrow = false,
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-5xl" : "max-w-7xl",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
