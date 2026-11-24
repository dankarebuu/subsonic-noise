import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "../../lib/utils";
import { ConfirmationTicket } from "./booking-drawer/ConfirmationTicket";
import { StepBandForm } from "./booking-drawer/StepBandForm";
import { StepEngineerDateTime } from "./booking-drawer/StepEngineerDateTime";
import { StepRoomSelect } from "./booking-drawer/StepRoomSelect";
import { type BookingPreload, useBookingFlow } from "./booking-drawer/useBookingFlow";

interface BookingDrawerProps {
  isOpen: boolean;
  preload: BookingPreload | null;
  onClose: () => void;
  onBookingCreated: () => void;
}

export function BookingDrawer({
  isOpen,
  preload,
  onClose,
  onBookingCreated,
}: BookingDrawerProps) {
  const flow = useBookingFlow(isOpen, preload, onBookingCreated);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const stepNum =
    flow.step === 1 ? "01" : flow.step === 2 ? "02" : flow.step === 3 ? "03" : "OK";

  return (
    <div
      className="fixed inset-0 z-300 flex justify-end items-end md:items-stretch"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-drawer-title"
    >
      <div
        className="fixed inset-0 bg-ink/70 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative z-10 w-full md:max-w-xl bg-paper border-t-4 md:border-t-0 md:border-l-4 border-ink flex flex-col max-h-[92dvh] md:max-h-none md:h-full shadow-[-8px_0_0_#8C2727]"
        )}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 bg-ink text-paper-light border-b-2 border-dashed border-dirty-yellow/60 shrink-0">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-dirty-yellow">
              STEP {stepNum} // BALLARD BOOKING DESK
            </div>
            <h2
              id="booking-drawer-title"
              className="font-display text-xl uppercase tracking-tight text-paper-light"
            >
              {flow.step === "confirmed" ? "PASS ISSUED" : "LOCK A STUDIO SLOT"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking drawer"
            className="flex h-10 w-10 items-center justify-center border-2 border-paper-light text-paper-light hover:bg-muted-red hover:border-muted-red transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {flow.step === 1 && (
            <StepRoomSelect
              selectedRoomId={flow.selectedRoomId}
              onSelectRoom={flow.setSelectedRoomId}
              selectedAddonIds={flow.selectedAddonIds}
              onToggleAddon={flow.toggleAddon}
              totalPrice={flow.totalPrice}
              totalDurationMins={flow.totalDurationMins}
              onNext={() => flow.setStep(2)}
            />
          )}

          {flow.step === 2 && (
            <StepEngineerDateTime
              selectedEngineerId={flow.selectedEngineerId}
              onSelectEngineer={flow.handleSelectEngineer}
              upcomingDays={flow.upcomingDays}
              selectedDate={flow.selectedDate}
              onSelectDate={flow.handleSelectDate}
              timeSlots={flow.availableTimeSlots}
              selectedTime={flow.selectedTime}
              onSelectTime={flow.setSelectedTime}
              onBack={() => flow.setStep(1)}
              onNext={() => flow.setStep(3)}
            />
          )}

          {flow.step === 3 && (
            <StepBandForm
              selectedRoom={flow.selectedRoom}
              selectedEngineerId={flow.selectedEngineerId}
              selectedDate={flow.selectedDate}
              selectedTime={flow.selectedTime}
              totalPrice={flow.totalPrice}
              totalDurationMins={flow.totalDurationMins}
              bandName={flow.bandName}
              onBandNameChange={flow.setBandName}
              contactPhone={flow.contactPhone}
              onContactPhoneChange={flow.setContactPhone}
              contactEmail={flow.contactEmail}
              onContactEmailChange={flow.setContactEmail}
              notes={flow.notes}
              onNotesChange={flow.setNotes}
              errors={flow.errors}
              isSubmitting={flow.isSubmitting}
              onBack={() => flow.setStep(2)}
              onSubmit={() => {
                void flow.validateAndSubmit();
              }}
            />
          )}

          {flow.step === "confirmed" && flow.confirmedBooking && (
            <ConfirmationTicket
              booking={flow.confirmedBooking}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
