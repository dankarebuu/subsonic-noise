import { ENGINEERS, FIRST_AVAILABLE_ID, getEngineerById } from "../data/engineers";
import { getAddonById, getRoomById } from "../data/rooms";
import { getDemoSession } from "../lib/session";
import { supabase } from "../lib/supabase";
import {
  addDays,
  formatCurrency,
  formatDateISO,
  formatTime12h,
  getRelativeDayLabel,
  parseDateISO,
} from "../lib/utils";
import type {
  AvailableSlot,
  BookingRecord,
  CreateBookingInput,
  Engineer,
  UpcomingDay,
} from "../types/booking";

export const STORAGE_KEY = "subsonic_demo_bookings_v1";

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

interface SupabaseBookingRow {
  id: string;
  demo_slug: string;
  session_id: string;
  service_name: string;
  provider_or_track: string;
  booking_date: string;
  booking_time: string;
  duration_mins: number;
  price_label: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  status: string;
  is_seed: boolean;
  created_at: string;
}

function buildHourlySlots(startHour: number, endHour: number): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour += 1) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
  }
  return slots;
}

const WEEKDAY_SLOTS = buildHourlySlots(12, 21); // 12:00 PM – 9:00 PM start
const WEEKEND_SLOTS = buildHourlySlots(10, 20); // 10:00 AM – 8:00 PM start

export function getStudioSlotsForDate(dateStr: string): string[] {
  const day = parseDateISO(dateStr).getDay();
  if (day === 1) return [];
  if (day === 0 || day === 6) return WEEKEND_SLOTS;
  return WEEKDAY_SLOTS;
}

export function isEngineerWorkingOnDate(engineer: Engineer, dateStr: string): boolean {
  const day = parseDateISO(dateStr).getDay();
  return engineer.workingDays.includes(day);
}

function findNextOpenDate(startDate: Date): Date {
  let cursor = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  for (let i = 0; i < 7; i += 1) {
    if (cursor.getDay() !== 1) return cursor;
    cursor = addDays(cursor, 1);
  }
  return cursor;
}

export function createSeedBookings(now: Date = new Date()): BookingRecord[] {
  const firstOpenDay = findNextOpenDate(now);
  const secondOpenDay = findNextOpenDate(addDays(firstOpenDay, 1));

  const dayOneStr = formatDateISO(firstOpenDay);
  const dayTwoStr = formatDateISO(secondOpenDay);

  const dayOneEngineers = ENGINEERS.filter((e) => isEngineerWorkingOnDate(e, dayOneStr));
  const dayTwoEngineers = ENGINEERS.filter((e) => isEngineerWorkingOnDate(e, dayTwoStr));

  const pickEngineer = (pool: Engineer[], index: number): Engineer =>
    pool[index % pool.length] ?? ENGINEERS[0];

  const seedTemplates = [
    {
      id: "seed-sub-1",
      ref: "SUB-9104",
      date: dayOneStr,
      time: "14:00",
      engineer: pickEngineer(dayOneEngineers, 0),
      roomId: "garage-a",
      bandName: "Fuzz Harbor",
    },
    {
      id: "seed-sub-2",
      ref: "SUB-9112",
      date: dayOneStr,
      time: "18:00",
      engineer: pickEngineer(dayOneEngineers, 1),
      roomId: "live-b",
      bandName: "Rainier Static",
    },
    {
      id: "seed-sub-3",
      ref: "SUB-9119",
      date: dayOneStr,
      time: "20:00",
      engineer: pickEngineer(dayOneEngineers, 2),
      roomId: "tape-demo",
      bandName: "Cold Bleach",
    },
    {
      id: "seed-sub-4",
      ref: "SUB-9127",
      date: dayTwoStr,
      time: "13:00",
      engineer: pickEngineer(dayTwoEngineers, 0),
      roomId: "two-inch-session",
      bandName: "Ballard Wires",
    },
    {
      id: "seed-sub-5",
      ref: "SUB-9133",
      date: dayTwoStr,
      time: "17:00",
      engineer: pickEngineer(dayTwoEngineers, 1),
      roomId: "late-lockout",
      bandName: "Velvet Crackle",
    },
  ];

  const createdAt = now.toISOString();

  return seedTemplates.map((seed) => {
    const room = getRoomById(seed.roomId);
    return {
      id: seed.id,
      referenceCode: seed.ref,
      demo_slug: "subsonic",
      roomId: room?.id ?? "garage-a",
      roomName: room?.name ?? "Room A: The Basement",
      addonIds: [],
      addonNames: [],
      engineerId: seed.engineer.id,
      engineerName: seed.engineer.name,
      bookingDate: seed.date,
      bookingTime: seed.time,
      durationMins: room?.durationMins ?? 120,
      totalPrice: room?.price ?? 55,
      bandName: seed.bandName,
      contactPhone: "(206) 555-0100",
      contactEmail: "band@subsonicnoise.studio",
      isSeed: true,
      createdAt,
    };
  });
}

function writeBookingsToStorage(bookings: BookingRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // Ignore storage quota or privacy-mode errors cleanly
  }
}

export function getBookings(now: Date = new Date()): BookingRecord[] {
  if (typeof window === "undefined") {
    return createSeedBookings(now);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = createSeedBookings(now);
      writeBookingsToStorage(seeded);
      return seeded;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seeded = createSeedBookings(now);
      writeBookingsToStorage(seeded);
      return seeded;
    }

    const records = parsed as BookingRecord[];
    const todayStr = formatDateISO(now);
    const hasCurrentOrFutureRecord = records.some((item) => item.bookingDate >= todayStr);

    if (!hasCurrentOrFutureRecord) {
      const seeded = createSeedBookings(now);
      writeBookingsToStorage(seeded);
      return seeded;
    }

    return records;
  } catch {
    const seeded = createSeedBookings(now);
    writeBookingsToStorage(seeded);
    return seeded;
  }
}

function mapSupabaseRowToBooking(row: SupabaseBookingRow): BookingRecord {
  const meta = row.metadata ?? {};
  const matchedEngineer = ENGINEERS.find(
    (e) => e.id === meta.engineer_id || e.name === row.provider_or_track
  );
  const priceNumber =
    typeof meta.total_price === "number"
      ? meta.total_price
      : Number(row.price_label.replace(/[^0-9.]/g, "")) || 0;

  return {
    id: row.id,
    referenceCode:
      typeof meta.reference_code === "string"
        ? meta.reference_code
        : `SUB-${row.id.slice(0, 4).toUpperCase()}`,
    demo_slug: "subsonic",
    roomId: typeof meta.room_id === "string" ? meta.room_id : "garage-a",
    roomName: row.service_name,
    addonIds: Array.isArray(meta.addon_ids)
      ? meta.addon_ids.filter((id): id is string => typeof id === "string")
      : [],
    addonNames: Array.isArray(meta.addon_names)
      ? meta.addon_names.filter((name): name is string => typeof name === "string")
      : [],
    engineerId: matchedEngineer?.id ?? ENGINEERS[0].id,
    engineerName: row.provider_or_track,
    bookingDate: row.booking_date,
    bookingTime: row.booking_time,
    durationMins: row.duration_mins,
    totalPrice: priceNumber,
    bandName: row.client_name,
    contactPhone: row.client_phone ?? "",
    contactEmail: row.client_email,
    notes: row.notes ?? undefined,
    isSeed: row.is_seed,
    createdAt: row.created_at,
  };
}

export async function fetchBookings(now: Date = new Date()): Promise<BookingRecord[]> {
  if (!supabase) {
    return getBookings(now);
  }

  try {
    const { sessionId } = getDemoSession();
    const { data, error } = await supabase
      .from("demo_bookings")
      .select("*")
      .eq("demo_slug", "subsonic")
      .in("session_id", ["seed", sessionId])
      .in("status", ["pending", "confirmed"])
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true });

    if (error || !data) {
      return getBookings(now);
    }

    const mapped = (data as SupabaseBookingRow[]).map(mapSupabaseRowToBooking);
    if (mapped.length === 0) {
      return getBookings(now);
    }

    writeBookingsToStorage(mapped);
    return mapped;
  } catch {
    return getBookings(now);
  }
}

export function isSlotInPast(
  dateStr: string,
  time24: string,
  now: Date = new Date()
): boolean {
  const todayStr = formatDateISO(now);
  if (dateStr < todayStr) return true;
  if (dateStr > todayStr) return false;

  const [hoursStr, minsStr] = time24.split(":");
  const slotDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    Number(hoursStr),
    Number(minsStr),
    0,
    0
  );

  return slotDate.getTime() - now.getTime() < 15 * 60_000;
}

export function isSlotBooked(
  dateStr: string,
  time24: string,
  engineerId: string,
  bookings: BookingRecord[] = getBookings()
): boolean {
  if (engineerId === FIRST_AVAILABLE_ID) {
    const workingEngineers = ENGINEERS.filter((e) =>
      isEngineerWorkingOnDate(e, dateStr)
    );
    if (workingEngineers.length === 0) return true;

    return workingEngineers.every((engineer) =>
      bookings.some(
        (b) =>
          b.bookingDate === dateStr &&
          b.bookingTime === time24 &&
          b.engineerId === engineer.id
      )
    );
  }

  return bookings.some(
    (b) =>
      b.bookingDate === dateStr &&
      b.bookingTime === time24 &&
      b.engineerId === engineerId
  );
}

export function resolveEngineerForSlot(
  dateStr: string,
  time24: string,
  preferredEngineerId: string,
  bookings: BookingRecord[] = getBookings()
): Engineer | null {
  if (preferredEngineerId !== FIRST_AVAILABLE_ID) {
    const engineer = getEngineerById(preferredEngineerId);
    if (!engineer || !isEngineerWorkingOnDate(engineer, dateStr)) return null;
    if (isSlotBooked(dateStr, time24, engineer.id, bookings)) return null;
    return engineer;
  }

  const workingEngineers = ENGINEERS.filter((e) =>
    isEngineerWorkingOnDate(e, dateStr)
  );
  for (const engineer of workingEngineers) {
    if (!isSlotBooked(dateStr, time24, engineer.id, bookings)) {
      return engineer;
    }
  }
  return null;
}

export function getUpcomingDays(
  count: number = 7,
  now: Date = new Date()
): UpcomingDay[] {
  const days: UpcomingDay[] = [];
  for (let i = 0; i < count; i += 1) {
    const dateObj = addDays(now, i);
    const dayOfWeek = dateObj.getDay();
    days.push({
      date: formatDateISO(dateObj),
      weekdayShort: WEEKDAY_SHORT[dayOfWeek],
      dayNumber: String(dateObj.getDate()),
      monthShort: MONTH_SHORT[dateObj.getMonth()],
      dayOfWeek,
      isToday: i === 0,
      isTomorrow: i === 1,
      isStudioClosed: dayOfWeek === 1,
    });
  }
  return days;
}

export function getNextAvailableSlot(
  engineerId: string = FIRST_AVAILABLE_ID,
  bookings: BookingRecord[] = getBookings(),
  now: Date = new Date()
): AvailableSlot | null {
  const upcomingDays = getUpcomingDays(10, now);

  for (const day of upcomingDays) {
    if (day.isStudioClosed) continue;

    if (engineerId !== FIRST_AVAILABLE_ID) {
      const engineer = getEngineerById(engineerId);
      if (!engineer || !isEngineerWorkingOnDate(engineer, day.date)) continue;
    }

    const slots = getStudioSlotsForDate(day.date);
    for (const time24 of slots) {
      if (isSlotInPast(day.date, time24, now)) continue;
      const assignedEngineer = resolveEngineerForSlot(
        day.date,
        time24,
        engineerId,
        bookings
      );
      if (!assignedEngineer) continue;

      const dayLabel = getRelativeDayLabel(day.date, now);
      return {
        date: day.date,
        time: time24,
        label: `${dayLabel}, ${formatTime12h(time24)}`,
        engineerId: assignedEngineer.id,
        engineerName: assignedEngineer.name,
      };
    }
  }

  return null;
}

function generateReferenceCode(existingBookings: BookingRecord[]): string {
  const existingCodes = new Set(existingBookings.map((b) => b.referenceCode));
  for (let attempt = 0; attempt < 25; attempt += 1) {
    const num = Math.floor(1000 + Math.random() * 9000);
    const code = `SUB-${num}`;
    if (!existingCodes.has(code)) return code;
  }
  return `SUB-${String(Date.now()).slice(-4)}`;
}

export function createBooking(
  input: CreateBookingInput,
  now: Date = new Date(),
  snapshotOverride?: BookingRecord[]
): BookingRecord {
  const room = getRoomById(input.roomId);
  if (!room) {
    throw new Error("Selected studio room or session was not found.");
  }

  if (isSlotInPast(input.bookingDate, input.bookingTime, now)) {
    throw new Error("Selected time slot is no longer available.");
  }

  const currentBookings = snapshotOverride ?? getBookings(now);
  const assignedEngineer = resolveEngineerForSlot(
    input.bookingDate,
    input.bookingTime,
    input.engineerId,
    currentBookings
  );

  if (!assignedEngineer) {
    throw new Error("That session slot was just claimed. Pick another time.");
  }

  const resolvedAddons = input.addonIds
    .map((id) => getAddonById(id))
    .filter((addon): addon is NonNullable<typeof addon> => Boolean(addon));

  const addonDuration = resolvedAddons.reduce((sum, a) => sum + a.durationMins, 0);
  const addonPrice = resolvedAddons.reduce((sum, a) => sum + a.price, 0);

  const record: BookingRecord = {
    id:
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    referenceCode: generateReferenceCode(currentBookings),
    demo_slug: "subsonic",
    roomId: room.id,
    roomName: room.name,
    addonIds: resolvedAddons.map((a) => a.id),
    addonNames: resolvedAddons.map((a) => a.name),
    engineerId: assignedEngineer.id,
    engineerName: assignedEngineer.name,
    bookingDate: input.bookingDate,
    bookingTime: input.bookingTime,
    durationMins: room.durationMins + addonDuration,
    totalPrice: room.price + addonPrice,
    bandName: input.bandName.trim(),
    contactPhone: input.contactPhone.trim(),
    contactEmail: input.contactEmail.trim(),
    notes: input.notes?.trim() ? input.notes.trim() : undefined,
    isSeed: false,
    createdAt: now.toISOString(),
  };

  writeBookingsToStorage([...currentBookings, record]);
  return record;
}

export async function createBookingAsync(
  input: CreateBookingInput,
  now: Date = new Date()
): Promise<BookingRecord> {
  const currentBookings = await fetchBookings(now);
  const localRecord = createBooking(input, now, currentBookings);

  if (!supabase) {
    return localRecord;
  }

  const { sessionId } = getDemoSession();
  const { data, error } = await supabase
    .from("demo_bookings")
    .insert({
      demo_slug: "subsonic",
      session_id: sessionId,
      service_name: localRecord.roomName,
      provider_or_track: localRecord.engineerName,
      booking_date: localRecord.bookingDate,
      booking_time: localRecord.bookingTime,
      duration_mins: localRecord.durationMins,
      price_label: formatCurrency(localRecord.totalPrice),
      client_name: localRecord.bandName,
      client_email: localRecord.contactEmail,
      client_phone: localRecord.contactPhone,
      notes: localRecord.notes ?? null,
      metadata: {
        room_id: localRecord.roomId,
        engineer_id: localRecord.engineerId,
        addon_ids: localRecord.addonIds,
        addon_names: localRecord.addonNames,
        reference_code: localRecord.referenceCode,
        total_price: localRecord.totalPrice,
      },
      status: "confirmed",
      is_seed: false,
    })
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("That session slot was just claimed. Pick another time.");
    }
    return localRecord;
  }

  const saved = mapSupabaseRowToBooking(data as SupabaseBookingRow);
  writeBookingsToStorage([...currentBookings, saved]);
  return saved;
}

export function resetDemoBookings(now: Date = new Date()): BookingRecord[] {
  const seeded = createSeedBookings(now);
  writeBookingsToStorage(seeded);
  return seeded;
}

export async function resetDemoBookingsAsync(
  now: Date = new Date()
): Promise<BookingRecord[]> {
  const seeded = resetDemoBookings(now);
  if (!supabase) {
    return seeded;
  }

  try {
    const { sessionId } = getDemoSession();
    await supabase.rpc("reset_demo_session", {
      p_demo_slug: "subsonic",
      p_session_id: sessionId,
    });
    return await fetchBookings(now);
  } catch {
    return seeded;
  }
}
