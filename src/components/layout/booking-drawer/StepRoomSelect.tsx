import { Check } from "lucide-react";
import { GEAR_ADDONS, STUDIO_ROOMS } from "../../../data/rooms";
import { cn, formatCurrency, formatDuration } from "../../../lib/utils";
import { Button } from "../../ui";

interface StepRoomSelectProps {
  selectedRoomId: string;
  onSelectRoom: (id: string) => void;
  selectedAddonIds: string[];
  onToggleAddon: (id: string) => void;
  totalPrice: number;
  totalDurationMins: number;
  onNext: () => void;
}

export function StepRoomSelect({
  selectedRoomId,
  onSelectRoom,
  selectedAddonIds,
  onToggleAddon,
  totalPrice,
  totalDurationMins,
  onNext,
}: StepRoomSelectProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted-red mb-3">
          01 // PICK ROOM OR TAPE BLOCK
        </p>
        <div className="space-y-2.5">
          {STUDIO_ROOMS.map((room) => {
            const active = room.id === selectedRoomId;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => onSelectRoom(room.id)}
                className={cn(
                  "w-full text-left p-3.5 border-2 transition-all cursor-pointer",
                  active
                    ? "bg-ink text-paper-light border-ink shadow-[4px_4px_0_#8C2727]"
                    : "bg-paper-light text-ink border-ink hover:bg-paper"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-bold uppercase">
                        {room.name}
                      </span>
                      <span
                        className={cn(
                          "px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase border",
                          active
                            ? "bg-dirty-yellow text-ink border-dirty-yellow"
                            : "bg-paper text-ink border-ink/50"
                        )}
                      >
                        {room.previewTag}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-1 font-mono text-xs leading-snug",
                        active ? "text-paper-light/80" : "text-ink/75"
                      )}
                    >
                      {room.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0 tabular-nums">
                    <div
                      className={cn(
                        "font-mono text-base font-bold",
                        active ? "text-dirty-yellow" : "text-muted-red"
                      )}
                    >
                      {formatCurrency(room.price)}
                    </div>
                    <div
                      className={cn(
                        "font-mono text-[11px]",
                        active ? "text-paper-light/70" : "text-concrete"
                      )}
                    >
                      {formatDuration(room.durationMins)}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t-2 border-dashed border-ink/40">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted-red mb-3">
          OPTIONAL BACKLINE &amp; TAPE EXTRAS
        </p>
        <div className="grid grid-cols-1 gap-2">
          {GEAR_ADDONS.map((addon) => {
            const checked = selectedAddonIds.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => onToggleAddon(addon.id)}
                className={cn(
                  "flex items-center justify-between gap-3 p-3 border-2 text-left transition-colors cursor-pointer min-h-[44px]",
                  checked
                    ? "bg-dirty-yellow/35 border-ink"
                    : "bg-paper-light border-ink/70 hover:border-ink"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center border-2 border-ink shrink-0",
                      checked ? "bg-ink text-dirty-yellow" : "bg-paper-light"
                    )}
                  >
                    {checked && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span className="font-mono text-xs font-bold text-ink">
                    {addon.name}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-muted-red tabular-nums shrink-0">
                  +{formatCurrency(addon.price)}
                  {addon.durationMins > 0 ? ` · +${addon.durationMins}m` : ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 bg-paper pt-4 pb-1 border-t-2 border-ink flex items-center justify-between gap-4">
        <div className="tabular-nums">
          <div className="font-mono text-[11px] uppercase text-concrete">
            SESSION ESTIMATE
          </div>
          <div className="font-mono text-lg font-bold text-ink">
            {formatCurrency(totalPrice)}{" "}
            <span className="text-xs font-normal text-ink/75">
              ({formatDuration(totalDurationMins)})
            </span>
          </div>
        </div>
        <Button variant="secondary" onClick={onNext}>
          PICK ENGINEER &amp; TIME →
        </Button>
      </div>
    </div>
  );
}
