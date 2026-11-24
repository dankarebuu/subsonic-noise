import { FIRST_AVAILABLE_ID, getEngineerById } from "../../../data/engineers";
import {
  formatCurrency,
  formatDuration,
  formatTime12h,
  getRelativeDayLabel,
} from "../../../lib/utils";
import type { StudioRoom } from "../../../types/booking";
import { Button, Input } from "../../ui";
import type { GuestFormErrors } from "./useBookingFlow";

interface StepBandFormProps {
  selectedRoom: StudioRoom;
  selectedEngineerId: string;
  selectedDate: string;
  selectedTime: string;
  totalPrice: number;
  totalDurationMins: number;
  bandName: string;
  onBandNameChange: (val: string) => void;
  contactPhone: string;
  onContactPhoneChange: (val: string) => void;
  contactEmail: string;
  onContactEmailChange: (val: string) => void;
  notes: string;
  onNotesChange: (val: string) => void;
  errors: GuestFormErrors;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export function StepBandForm({
  selectedRoom,
  selectedEngineerId,
  selectedDate,
  selectedTime,
  totalPrice,
  totalDurationMins,
  bandName,
  onBandNameChange,
  contactPhone,
  onContactPhoneChange,
  contactEmail,
  onContactEmailChange,
  notes,
  onNotesChange,
  errors,
  isSubmitting,
  onBack,
  onSubmit,
}: StepBandFormProps) {
  const engineerLabel =
    selectedEngineerId === FIRST_AVAILABLE_ID
      ? "First Available Engineer"
      : (getEngineerById(selectedEngineerId)?.name ?? "Studio Engineer");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-5"
      noValidate
    >
      <div className="bg-paper-light border-2 border-ink p-4 shadow-[4px_4px_0_#2E2E2E]">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted-red mb-1">
          SESSION SUMMARY
        </div>
        <div className="font-mono text-sm font-bold text-ink">
          {selectedRoom.name}
        </div>
        <div className="mt-1 font-mono text-xs text-ink/80 tabular-nums">
          {getRelativeDayLabel(selectedDate)} · {formatTime12h(selectedTime)} ·{" "}
          {engineerLabel}
        </div>
        <div className="mt-2 pt-2 border-t border-dashed border-ink/40 flex items-center justify-between font-mono text-xs font-bold tabular-nums">
          <span>{formatDuration(totalDurationMins)}</span>
          <span className="text-muted-red text-sm">
            {formatCurrency(totalPrice)} DUE AT CHECK-IN
          </span>
        </div>
      </div>

      <Input
        label="Band or Artist Name"
        placeholder="e.g. Mudflat Radio"
        value={bandName}
        onChange={(e) => onBandNameChange(e.target.value)}
        error={errors.bandName}
        required
      />

      <Input
        label="Cell Phone (For Alley Load-In Code)"
        type="tel"
        placeholder="(206) 555-0192"
        value={contactPhone}
        onChange={(e) => onContactPhoneChange(e.target.value)}
        error={errors.contactPhone}
        required
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="band@example.com"
        value={contactEmail}
        onChange={(e) => onContactEmailChange(e.target.value)}
        error={errors.contactEmail}
        required
      />

      <div className="space-y-1.5">
        <label
          htmlFor="session-notes"
          className="block font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink"
        >
          Gear / Amp Notes (Optional)
        </label>
        <textarea
          id="session-notes"
          rows={3}
          placeholder="Lefty drum setup, extra vocal mic, or 2-inch tape reel request..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="w-full bg-paper-light px-3.5 py-2.5 font-mono text-sm text-ink border-2 border-ink focus:border-muted-red placeholder:text-concrete"
        />
      </div>

      {errors.submit && (
        <div
          role="alert"
          className="p-3 bg-muted-red text-paper-light font-mono text-xs font-bold border-2 border-ink"
        >
          {errors.submit}
        </div>
      )}

      <div className="sticky bottom-0 bg-paper pt-4 pb-1 border-t-2 border-ink flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack} disabled={isSubmitting}>
          ← BACK
        </Button>
        <Button type="submit" variant="secondary" disabled={isSubmitting}>
          {isSubmitting ? "LOCKING SLOT..." : "LOCK SESSION SLOT"}
        </Button>
      </div>
    </form>
  );
}
