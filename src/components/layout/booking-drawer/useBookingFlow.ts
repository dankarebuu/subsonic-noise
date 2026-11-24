import { useCallback, useEffect, useMemo, useState } from "react";
import { FIRST_AVAILABLE_ID, getEngineerById } from "../../../data/engineers";
import { GEAR_ADDONS, getRoomById, STUDIO_ROOMS } from "../../../data/rooms";
import {
  createBookingAsync,
  fetchBookings,
  getBookings,
  getNextAvailableSlot,
  getStudioSlotsForDate,
  getUpcomingDays,
  isEngineerWorkingOnDate,
  isSlotBooked,
  isSlotInPast,
} from "../../../services/bookings";
import type { BookingRecord, StudioRoom } from "../../../types/booking";

export type DrawerStep = 1 | 2 | 3 | "confirmed";

export interface BookingPreload {
  roomId?: string;
  engineerId?: string;
  date?: string;
  time?: string;
  step?: DrawerStep;
  autoFillGuest?: boolean;
}

export interface GuestFormErrors {
  bandName?: string;
  contactPhone?: string;
  contactEmail?: string;
  submit?: string;
}

export function useBookingFlow(
  isOpen: boolean,
  preload: BookingPreload | null,
  onBookingCreated: () => void
) {
  const [step, setStep] = useState<DrawerStep>(1);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(STUDIO_ROOMS[0].id);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [selectedEngineerId, setSelectedEngineerId] = useState<string>(FIRST_AVAILABLE_ID);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [bandName, setBandName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [errors, setErrors] = useState<GuestFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [bookingsSnapshot, setBookingsSnapshot] = useState<BookingRecord[]>(() =>
    getBookings()
  );

  const upcomingDays = useMemo(() => getUpcomingDays(7), []);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setConfirmedBooking(null);
    setErrors({});
    setIsSubmitting(false);

    const nextRoomId =
      preload?.roomId && getRoomById(preload.roomId)
        ? preload.roomId
        : STUDIO_ROOMS[0].id;
    const nextEngineerId = preload?.engineerId ?? FIRST_AVAILABLE_ID;

    setSelectedRoomId(nextRoomId);
    setSelectedEngineerId(nextEngineerId);
    setSelectedAddonIds(
      preload?.autoFillGuest ? ["ampeg-8x10", "board-mix"] : []
    );

    const localBookings = getBookings();
    setBookingsSnapshot(localBookings);

    const earliestLocal = getNextAvailableSlot(nextEngineerId, localBookings);
    setSelectedDate(
      preload?.date ??
        earliestLocal?.date ??
        upcomingDays.find((d) => !d.isStudioClosed)?.date ??
        ""
    );
    setSelectedTime(preload?.time ?? earliestLocal?.time ?? "");

    if (preload?.autoFillGuest) {
      setBandName("The Static Fenders");
      setContactPhone("(206) 555-0192");
      setContactEmail("booking@staticfenders.band");
      setNotes("Bringing 2 guitar cabs + need 4 vocal mics in PA.");
    } else {
      setBandName("");
      setContactPhone("");
      setContactEmail("");
      setNotes("");
    }

    setStep(preload?.step ?? 1);

    void fetchBookings().then((remoteBookings) => {
      if (cancelled) return;
      setBookingsSnapshot(remoteBookings);
      if (!preload?.date && !preload?.time) {
        const earliestRemote = getNextAvailableSlot(nextEngineerId, remoteBookings);
        if (earliestRemote) {
          setSelectedDate(earliestRemote.date);
          setSelectedTime(earliestRemote.time);
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isOpen, preload, upcomingDays]);

  const selectedRoom: StudioRoom = useMemo(
    () => getRoomById(selectedRoomId) ?? STUDIO_ROOMS[0],
    [selectedRoomId]
  );

  const selectedAddons = useMemo(
    () => GEAR_ADDONS.filter((a) => selectedAddonIds.includes(a.id)),
    [selectedAddonIds]
  );

  const totalPrice = useMemo(
    () =>
      selectedRoom.price +
      selectedAddons.reduce((sum, addon) => sum + addon.price, 0),
    [selectedRoom, selectedAddons]
  );

  const totalDurationMins = useMemo(
    () =>
      selectedRoom.durationMins +
      selectedAddons.reduce((sum, addon) => sum + addon.durationMins, 0),
    [selectedRoom, selectedAddons]
  );

  const toggleAddon = useCallback((addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  }, []);

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const baseSlots = getStudioSlotsForDate(selectedDate);
    const engineer =
      selectedEngineerId === FIRST_AVAILABLE_ID
        ? null
        : getEngineerById(selectedEngineerId);

    if (engineer && !isEngineerWorkingOnDate(engineer, selectedDate)) {
      return [];
    }

    return baseSlots.map((time24) => {
      const past = isSlotInPast(selectedDate, time24);
      const booked = isSlotBooked(
        selectedDate,
        time24,
        selectedEngineerId,
        bookingsSnapshot
      );
      return {
        time24,
        disabled: past || booked,
        reason: past ? "past" : booked ? "booked" : "open",
      };
    });
  }, [selectedDate, selectedEngineerId, bookingsSnapshot]);

  const handleSelectEngineer = useCallback(
    (engineerId: string) => {
      setSelectedEngineerId(engineerId);
      const earliest = getNextAvailableSlot(engineerId, bookingsSnapshot);
      if (earliest) {
        setSelectedDate(earliest.date);
        setSelectedTime(earliest.time);
      } else {
        setSelectedTime("");
      }
    },
    [bookingsSnapshot]
  );

  const handleSelectDate = useCallback(
    (dateStr: string) => {
      setSelectedDate(dateStr);
      const slots = getStudioSlotsForDate(dateStr);
      const firstOpen = slots.find(
        (t) =>
          !isSlotInPast(dateStr, t) &&
          !isSlotBooked(dateStr, t, selectedEngineerId, bookingsSnapshot)
      );
      setSelectedTime(firstOpen ?? "");
    },
    [selectedEngineerId, bookingsSnapshot]
  );

  const validateAndSubmit = useCallback(async () => {
    if (isSubmitting) return;

    const nextErrors: GuestFormErrors = {};
    if (bandName.trim().length < 2) {
      nextErrors.bandName = "Enter your band or artist name.";
    }
    if (contactPhone.replace(/\D/g, "").length < 7) {
      nextErrors.contactPhone = "Enter a valid phone number for load-in updates.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      nextErrors.contactEmail = "Enter a valid email address for your session stub.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const record = await createBookingAsync({
        roomId: selectedRoom.id,
        addonIds: selectedAddonIds,
        engineerId: selectedEngineerId,
        bookingDate: selectedDate,
        bookingTime: selectedTime,
        bandName,
        contactPhone,
        contactEmail,
        notes,
      });

      const updatedBookings = await fetchBookings();
      setBookingsSnapshot(updatedBookings);
      onBookingCreated();
      setConfirmedBooking(record);
      setStep("confirmed");
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : "Could not lock that slot. Pick another time.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    bandName,
    contactPhone,
    contactEmail,
    notes,
    selectedRoom.id,
    selectedAddonIds,
    selectedEngineerId,
    selectedDate,
    selectedTime,
    onBookingCreated,
  ]);

  return {
    step,
    setStep,
    selectedRoom,
    selectedRoomId,
    setSelectedRoomId,
    selectedAddonIds,
    toggleAddon,
    selectedEngineerId,
    handleSelectEngineer,
    selectedDate,
    handleSelectDate,
    selectedTime,
    setSelectedTime,
    upcomingDays,
    availableTimeSlots,
    totalPrice,
    totalDurationMins,
    bandName,
    setBandName,
    contactPhone,
    setContactPhone,
    contactEmail,
    setContactEmail,
    notes,
    setNotes,
    errors,
    isSubmitting,
    confirmedBooking,
    validateAndSubmit,
  };
}
