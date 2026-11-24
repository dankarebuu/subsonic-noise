import { CalendarPlus, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { STUDIO_INFO } from "../../../data/studio";
import { downloadBookingIcs } from "../../../lib/ics";
import {
  cn,
  formatCurrency,
  formatDuration,
  formatTime12h,
  getRelativeDayLabel,
} from "../../../lib/utils";
import type { BookingRecord } from "../../../types/booking";
import { Button } from "../../ui";

interface ConfirmationTicketProps {
  booking: BookingRecord;
  onClose: () => void;
}

export function ConfirmationTicket({ booking, onClose }: ConfirmationTicketProps) {
  const [previewTab, setPreviewTab] = useState<"sms" | "email">("sms");

  const dayLabel = getRelativeDayLabel(booking.bookingDate);
  const timeLabel = formatTime12h(booking.bookingTime);

  return (
    <div className="space-y-6">
      <div className="bg-paper-light border-2 border-ink p-5 shadow-[6px_6px_0_#2E2E2E] relative">
        <span
          aria-hidden="true"
          className="zine-tape absolute -top-3 right-6 h-5 w-20 rotate-[8deg]"
        />

        <div className="flex items-center justify-between gap-2 pb-4 border-b-2 border-dashed border-ink">
          <div className="flex items-center gap-2 text-olive">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink">
              SESSION LOCKED
            </span>
          </div>
          <span className="bg-dirty-yellow text-ink px-2.5 py-1 font-mono text-xs font-bold border border-ink tabular-nums">
            {booking.referenceCode}
          </span>
        </div>

        <div className="py-4 space-y-2.5 font-mono text-xs">
          <div>
            <span className="text-concrete uppercase block text-[10px]">
              BAND / ARTIST
            </span>
            <span className="text-sm font-bold text-ink">{booking.bandName}</span>
          </div>

          <div>
            <span className="text-concrete uppercase block text-[10px]">
              ROOM / SESSION
            </span>
            <span className="text-sm font-bold text-ink">{booking.roomName}</span>
          </div>

          {booking.addonNames.length > 0 && (
            <div>
              <span className="text-concrete uppercase block text-[10px]">
                BACKLINE &amp; TAPE EXTRAS
              </span>
              <span className="text-ink">{booking.addonNames.join(", ")}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-ink/35 tabular-nums">
            <div>
              <span className="text-concrete uppercase block text-[10px]">
                DATE &amp; TIME
              </span>
              <span className="font-bold text-ink">
                {dayLabel}, {timeLabel}
              </span>
            </div>
            <div>
              <span className="text-concrete uppercase block text-[10px]">
                ENGINEER
              </span>
              <span className="font-bold text-ink">{booking.engineerName}</span>
            </div>
            <div>
              <span className="text-concrete uppercase block text-[10px]">
                DURATION
              </span>
              <span className="font-bold text-ink">
                {formatDuration(booking.durationMins)}
              </span>
            </div>
            <div>
              <span className="text-concrete uppercase block text-[10px]">
                TOTAL DUE
              </span>
              <span className="font-bold text-muted-red">
                {formatCurrency(booking.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-dashed border-ink flex flex-col sm:flex-row gap-2.5">
          <Button
            variant="primary"
            fullWidth
            onClick={() => downloadBookingIcs(booking)}
          >
            <CalendarPlus className="h-4 w-4" />
            ADD TO CALENDAR (.ICS)
          </Button>
        </div>
      </div>

      <div className="border-2 border-ink bg-paper-light p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
            CONFIRMATION PREVIEW
          </span>
          <div className="inline-flex border-2 border-ink">
            <button
              type="button"
              onClick={() => setPreviewTab("sms")}
              className={cn(
                "px-2.5 py-1 font-mono text-[11px] font-bold uppercase flex items-center gap-1 cursor-pointer",
                previewTab === "sms"
                  ? "bg-ink text-dirty-yellow"
                  : "bg-paper text-ink"
              )}
            >
              <MessageSquare className="h-3 w-3" />
              SMS
            </button>
            <button
              type="button"
              onClick={() => setPreviewTab("email")}
              className={cn(
                "px-2.5 py-1 font-mono text-[11px] font-bold uppercase flex items-center gap-1 cursor-pointer border-l-2 border-ink",
                previewTab === "email"
                  ? "bg-ink text-dirty-yellow"
                  : "bg-paper text-ink"
              )}
            >
              <Mail className="h-3 w-3" />
              Email
            </button>
          </div>
        </div>

        {previewTab === "sms" ? (
          <div className="bg-paper p-3 border border-ink font-mono text-xs leading-relaxed text-ink">
            <strong>SUBSONIC NOISE:</strong> Locked {booking.referenceCode} for{" "}
            {booking.bandName} ({booking.roomName}) on {dayLabel} at {timeLabel} w/{" "}
            {booking.engineerName}. Alley roll-up door opens 15 min prior:{" "}
            {STUDIO_INFO.streetLine}.
          </div>
        ) : (
          <div className="bg-paper p-3 border border-ink font-mono text-xs leading-relaxed text-ink space-y-1">
            <div>
              <strong>To:</strong> {booking.contactEmail}
            </div>
            <div>
              <strong>Subject:</strong> [{booking.referenceCode}] Studio Lockout Confirmed —{" "}
              {dayLabel}, {timeLabel}
            </div>
            <p className="pt-1 text-ink/85">
              Your session at {STUDIO_INFO.name} ({STUDIO_INFO.address}) is on the board.
              Load-in via NW Leary alley. Questions? Call {STUDIO_INFO.phone}.
            </p>
          </div>
        )}
      </div>

      <Button variant="ghost" fullWidth onClick={onClose}>
        DONE — RETURN TO STUDIO
      </Button>
    </div>
  );
}
