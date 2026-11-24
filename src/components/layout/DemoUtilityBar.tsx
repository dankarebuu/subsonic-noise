import { ChevronDown, ChevronUp, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { isSupabaseConfigured } from "../../lib/supabase";
import { cn } from "../../lib/utils";

interface DemoUtilityBarProps {
  onAutoFillBooking: () => void;
  onResetDemo: () => void;
}

export function DemoUtilityBar({
  onAutoFillBooking,
  onResetDemo,
}: DemoUtilityBarProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-20 left-4 md:bottom-4 md:left-4 z-200 max-w-[calc(100vw-2rem)]">
      <div className="bg-ink text-paper-light border-2 border-ink shadow-[4px_4px_0_#B5A642]">
        <div className="flex items-center justify-between gap-3 px-3 py-2">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-dirty-yellow cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full bg-olive" aria-hidden="true" />
            <span>{isSupabaseConfigured ? "SUPABASE LIVE" : "LOCAL DEMO"}</span>
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronUp className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        <div
          className={cn(
            "px-3 pb-3 pt-2 border-t border-dashed border-paper-light/25 flex flex-wrap items-center gap-2",
            !expanded && "hidden"
          )}
        >
          <button
            type="button"
            onClick={onAutoFillBooking}
            className="inline-flex items-center gap-1.5 bg-dirty-yellow text-ink px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase border border-ink hover:bg-dirty-yellow/90 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Auto-Fill Test Session
          </button>
          <button
            type="button"
            onClick={onResetDemo}
            className="inline-flex items-center gap-1.5 bg-paper-light text-ink px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase border border-ink hover:bg-paper cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Demo
          </button>
        </div>
      </div>
    </div>
  );
}
