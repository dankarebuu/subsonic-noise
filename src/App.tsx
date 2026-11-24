import { useCallback, useEffect, useMemo, useState } from "react";
import { BookingDrawer } from "./components/layout/BookingDrawer";
import type { BookingPreload } from "./components/layout/booking-drawer/useBookingFlow";
import { DemoUtilityBar } from "./components/layout/DemoUtilityBar";
import { MobileStickyBar } from "./components/layout/MobileStickyBar";
import { Navbar } from "./components/layout/Navbar";
import { EngineersSection } from "./components/sections/EngineersSection";
import { GearAtmosphereSection } from "./components/sections/GearAtmosphereSection";
import { HeroSection } from "./components/sections/HeroSection";
import { LocationFooterSection } from "./components/sections/LocationFooterSection";
import { ReviewsSection } from "./components/sections/ReviewsSection";
import { RoomsMenuSection } from "./components/sections/RoomsMenuSection";
import { FIRST_AVAILABLE_ID } from "./data/engineers";
import { STUDIO_ROOMS } from "./data/rooms";
import {
  fetchBookings,
  getBookings,
  getNextAvailableSlot,
  resetDemoBookingsAsync,
} from "./services/bookings";
import type { AvailableSlot, BookingRecord } from "./types/booking";

export function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [preload, setPreload] = useState<BookingPreload | null>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>(() => getBookings());

  const refreshBookings = useCallback(() => {
    void fetchBookings().then(setBookings);
  }, []);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  const nextSlot = useMemo(
    () => getNextAvailableSlot(FIRST_AVAILABLE_ID, bookings),
    [bookings]
  );

  const openBooking = useCallback((nextPreload: BookingPreload | null = null) => {
    setPreload(nextPreload);
    setDrawerOpen(true);
  }, []);

  const handleBookSlot = useCallback(
    (slot: AvailableSlot) => {
      openBooking({
        roomId: STUDIO_ROOMS[0].id,
        engineerId: slot.engineerId,
        date: slot.date,
        time: slot.time,
        step: 1,
      });
    },
    [openBooking]
  );

  const handleSelectRoom = useCallback(
    (roomId: string) => {
      openBooking({
        roomId,
        step: 1,
      });
    },
    [openBooking]
  );

  const handleBookWithEngineer = useCallback(
    (engineerId: string) => {
      openBooking({
        engineerId,
        step: 2,
      });
    },
    [openBooking]
  );

  const handleAutoFillBooking = useCallback(() => {
    const earliest = getNextAvailableSlot(FIRST_AVAILABLE_ID, bookings);
    openBooking({
      roomId: "live-b",
      engineerId: earliest?.engineerId ?? FIRST_AVAILABLE_ID,
      date: earliest?.date,
      time: earliest?.time,
      step: 3,
      autoFillGuest: true,
    });
  }, [bookings, openBooking]);

  const handleResetDemo = useCallback(() => {
    setDrawerOpen(false);
    void resetDemoBookingsAsync().then(setBookings);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar onOpenBooking={() => openBooking(null)} />

      <main className="flex-1">
        <HeroSection
          nextSlot={nextSlot}
          onBookNow={() => openBooking(null)}
          onBookSlot={handleBookSlot}
        />

        <RoomsMenuSection onSelectRoom={handleSelectRoom} />

        <EngineersSection onBookWithEngineer={handleBookWithEngineer} />

        <GearAtmosphereSection />

        <ReviewsSection />
      </main>

      <LocationFooterSection onOpenBooking={() => openBooking(null)} />

      <MobileStickyBar
        nextSlot={nextSlot}
        onOpenBooking={() => openBooking(null)}
      />

      <DemoUtilityBar
        onAutoFillBooking={handleAutoFillBooking}
        onResetDemo={handleResetDemo}
      />

      <BookingDrawer
        isOpen={drawerOpen}
        preload={preload}
        onClose={() => setDrawerOpen(false)}
        onBookingCreated={refreshBookings}
      />
    </div>
  );
}

export default App;
