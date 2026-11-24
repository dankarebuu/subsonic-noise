export type RoomCategory = "rehearsal" | "recording" | "packages";

export interface StudioRoom {
  id: string;
  category: RoomCategory;
  name: string;
  durationMins: number;
  price: number;
  description: string;
  previewTag: string;
  includes: string[];
  imageUrl: string;
}

export interface GearAddon {
  id: string;
  name: string;
  durationMins: number;
  price: number;
}

export interface Engineer {
  id: string;
  name: string;
  firstName: string;
  role: string;
  experienceYears: number;
  specialties: string[];
  workingDays: number[]; // 0 = Sun, 1 = Mon ... 6 = Sat
  scheduleLabel: string;
  bio: string;
  imageUrl: string;
}

export interface BookingRecord {
  id: string;
  referenceCode: string;
  demo_slug: "subsonic";
  roomId: string;
  roomName: string;
  addonIds: string[];
  addonNames: string[];
  engineerId: string;
  engineerName: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:mm
  durationMins: number;
  totalPrice: number;
  bandName: string;
  contactPhone: string;
  contactEmail: string;
  notes?: string;
  isSeed?: boolean;
  createdAt: string;
}

export interface BandReview {
  id: string;
  quote: string;
  bandName: string;
  memberCredit: string;
  neighborhood: string;
  roomName: string;
}

export interface StudioHoursRow {
  dayIndex: number;
  dayName: string;
  shortLabel: string;
  hoursLabel: string;
  isClosed: boolean;
}

export interface TransitCue {
  line: string;
  detail: string;
  walkTime: string;
}

export interface GearRigFrame {
  id: string;
  indexLabel: string;
  title: string;
  caption: string;
  imageUrl: string;
  alt: string;
  gridSpanClass: string;
  aspectClass: string;
  tiltClass: string;
}

export interface AvailableSlot {
  date: string;
  time: string;
  label: string;
  engineerId: string;
  engineerName: string;
}

export interface UpcomingDay {
  date: string;
  weekdayShort: string;
  dayNumber: string;
  monthShort: string;
  dayOfWeek: number;
  isToday: boolean;
  isTomorrow: boolean;
  isStudioClosed: boolean;
}

export interface CreateBookingInput {
  roomId: string;
  addonIds: string[];
  engineerId: string;
  bookingDate: string;
  bookingTime: string;
  bandName: string;
  contactPhone: string;
  contactEmail: string;
  notes?: string;
}
