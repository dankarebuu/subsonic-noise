import type { AvailableSlot } from "../../types/booking";
import { Button } from "../ui";

interface MobileStickyBarProps {
  nextSlot: AvailableSlot | null;
  onOpenBooking: () => void;
}

export function MobileStickyBar({ nextSlot, onOpenBooking }: MobileStickyBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-100 md:hidden bg-paper-light border-t-2 border-ink px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="min-w-0 tabular-nums">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted-red">
          NEXT OPEN SLOT
        </div>
        <div className="font-mono text-xs font-bold text-ink truncate">
          {nextSlot ? nextSlot.label : "Check Studio Schedule"}
        </div>
      </div>
      <Button variant="secondary" size="sm" onClick={onOpenBooking}>
        BOOK A ROOM
      </Button>
    </div>
  );
}
