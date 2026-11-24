import { ENGINEERS, FIRST_AVAILABLE_ID } from "../../../data/engineers";
import { cn, formatTime12h } from "../../../lib/utils";
import type { UpcomingDay } from "../../../types/booking";
import { Button } from "../../ui";

interface TimeSlotItem {
  time24: string;
  disabled: boolean;
  reason: string;
}

interface StepEngineerDateTimeProps {
  selectedEngineerId: string;
  onSelectEngineer: (id: string) => void;
  upcomingDays: UpcomingDay[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  timeSlots: TimeSlotItem[];
  selectedTime: string;
  onSelectTime: (time24: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepEngineerDateTime({
  selectedEngineerId,
  onSelectEngineer,
  upcomingDays,
  selectedDate,
  onSelectDate,
  timeSlots,
  selectedTime,
  onSelectTime,
  onBack,
  onNext,
}: StepEngineerDateTimeProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted-red mb-3">
          02 // PICK SOUND ENGINEER
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onSelectEngineer(FIRST_AVAILABLE_ID)}
            className={cn(
              "p-3 border-2 text-left transition-all cursor-pointer min-h-[44px]",
              selectedEngineerId === FIRST_AVAILABLE_ID
                ? "bg-ink text-dirty-yellow border-ink shadow-[3px_3px_0_#8C2727]"
                : "bg-paper-light text-ink border-ink hover:bg-paper"
            )}
          >
            <div className="font-mono text-xs font-bold uppercase">
              First Available
            </div>
            <div
              className={cn(
                "font-mono text-[11px] mt-0.5",
                selectedEngineerId === FIRST_AVAILABLE_ID
                  ? "text-paper-light/80"
                  : "text-concrete"
              )}
            >
              Earliest open console &amp; room
            </div>
          </button>

          {ENGINEERS.map((eng) => {
            const active = selectedEngineerId === eng.id;
            return (
              <button
                key={eng.id}
                type="button"
                onClick={() => onSelectEngineer(eng.id)}
                className={cn(
                  "p-3 border-2 text-left transition-all cursor-pointer min-h-[44px]",
                  active
                    ? "bg-ink text-dirty-yellow border-ink shadow-[3px_3px_0_#8C2727]"
                    : "bg-paper-light text-ink border-ink hover:bg-paper"
                )}
              >
                <div className="font-mono text-xs font-bold uppercase">
                  {eng.name}
                </div>
                <div
                  className={cn(
                    "font-mono text-[11px] mt-0.5",
                    active ? "text-paper-light/80" : "text-concrete"
                  )}
                >
                  {eng.role} · {eng.scheduleLabel}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t-2 border-dashed border-ink/40">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted-red mb-3">
          LOAD-IN DATE (MONDAYS CLOSED)
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {upcomingDays.map((day) => {
            const active = selectedDate === day.date;
            return (
              <button
                key={day.date}
                type="button"
                disabled={day.isStudioClosed}
                onClick={() => onSelectDate(day.date)}
                className={cn(
                  "flex flex-col items-center justify-center py-2.5 px-1 border-2 font-mono transition-all min-h-[60px] tabular-nums",
                  day.isStudioClosed
                    ? "bg-paper border-ink/25 text-concrete/60 line-through cursor-not-allowed"
                    : active
                      ? "bg-muted-red text-paper-light border-ink shadow-[3px_3px_0_#2E2E2E] cursor-pointer"
                      : "bg-paper-light text-ink border-ink hover:bg-dirty-yellow/35 cursor-pointer"
                )}
              >
                <span className="text-[10px] font-bold uppercase">
                  {day.weekdayShort}
                </span>
                <span className="text-base font-bold leading-tight">
                  {day.dayNumber}
                </span>
                <span className="text-[10px] uppercase">{day.monthShort}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t-2 border-dashed border-ink/40">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted-red mb-3">
          SESSION START TIME
        </p>
        {timeSlots.length === 0 ? (
          <div className="p-4 border-2 border-dashed border-ink bg-paper-light font-mono text-xs text-ink">
            Selected engineer is off or studio is closed on this day. Pick another date or choose First Available.
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot) => {
              const active = selectedTime === slot.time24;
              return (
                <button
                  key={slot.time24}
                  type="button"
                  disabled={slot.disabled}
                  onClick={() => onSelectTime(slot.time24)}
                  className={cn(
                    "min-h-[44px] px-2 py-2 border-2 font-mono text-xs font-bold tabular-nums transition-all",
                    slot.disabled
                      ? "bg-paper border-ink/25 text-concrete line-through cursor-not-allowed"
                      : active
                        ? "bg-ink text-dirty-yellow border-ink shadow-[3px_3px_0_#8C2727] cursor-pointer"
                        : "bg-paper-light text-ink border-ink hover:bg-dirty-yellow/40 cursor-pointer"
                  )}
                >
                  {formatTime12h(slot.time24)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-paper pt-4 pb-1 border-t-2 border-ink flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={onBack}>
          ← BACK
        </Button>
        <Button
          variant="secondary"
          disabled={!selectedDate || !selectedTime}
          onClick={onNext}
        >
          BAND DETAILS →
        </Button>
      </div>
    </div>
  );
}
