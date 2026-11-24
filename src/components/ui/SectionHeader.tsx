import { cn } from "../../lib/utils";

export interface SectionHeaderProps {
  indexTag: string;
  title: string;
  subtitle?: string;
  align?: "left" | "right";
  className?: string;
}

export function SectionHeader({
  indexTag,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "relative pb-6 border-b-2 border-dashed border-ink/45",
        align === "right" && "md:text-right",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 mb-3 bg-ink text-dirty-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.16em] -rotate-1",
          align === "right" && "md:ml-auto"
        )}
      >
        <span>{indexTag}</span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-ink leading-[0.95]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 max-w-2xl font-mono text-sm sm:text-base text-ink/80 leading-relaxed",
            align === "right" && "md:ml-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
