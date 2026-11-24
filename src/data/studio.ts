import type { GearRigFrame, StudioHoursRow, TransitCue } from "../types/booking";

export const STUDIO_INFO = {
  name: "SUBSONIC NOISE",
  shortName: "SUBSONICNOISE",
  tagline: "Rehearsal Rooms & 2-Inch Analog Tracking",
  address: "1422 NW Leary Way, Unit B, Ballard, Seattle, WA 98107",
  streetLine: "1422 NW Leary Way, Unit B",
  cityLine: "Ballard, Seattle, WA 98107",
  phone: "(206) 555-0148",
  email: "tape@subsonicnoise.studio",
  instagram: "@subsonicnoise.sea",
  closedNote: "Mondays reserved for tape head alignment and amp tube maintenance.",
  heroImageUrl:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=85",
  heroImageAlt:
    "High-contrast black and white photograph of a guitarist performing live under stage lights",
} as const;

export const STUDIO_HOURS: StudioHoursRow[] = [
  {
    dayIndex: 2,
    dayName: "Tuesday",
    shortLabel: "Tue – Fri",
    hoursLabel: "12:00 PM – 11:00 PM",
    isClosed: false,
  },
  {
    dayIndex: 3,
    dayName: "Wednesday",
    shortLabel: "Tue – Fri",
    hoursLabel: "12:00 PM – 11:00 PM",
    isClosed: false,
  },
  {
    dayIndex: 4,
    dayName: "Thursday",
    shortLabel: "Tue – Fri",
    hoursLabel: "12:00 PM – 11:00 PM",
    isClosed: false,
  },
  {
    dayIndex: 5,
    dayName: "Friday",
    shortLabel: "Tue – Fri",
    hoursLabel: "12:00 PM – 11:00 PM",
    isClosed: false,
  },
  {
    dayIndex: 6,
    dayName: "Saturday",
    shortLabel: "Sat – Sun",
    hoursLabel: "10:00 AM – 10:00 PM",
    isClosed: false,
  },
  {
    dayIndex: 0,
    dayName: "Sunday",
    shortLabel: "Sat – Sun",
    hoursLabel: "10:00 AM – 10:00 PM",
    isClosed: false,
  },
  {
    dayIndex: 1,
    dayName: "Monday",
    shortLabel: "Monday",
    hoursLabel: "Closed (Tape Maintenance)",
    isClosed: true,
  },
];

export const SUMMARY_HOURS_ROWS = [
  { label: "Tue – Fri", value: "12:00 PM – 11:00 PM", isClosed: false },
  { label: "Sat – Sun", value: "10:00 AM – 10:00 PM", isClosed: false },
  { label: "Monday", value: "Closed", isClosed: true },
] as const;

export const TRANSIT_CUES: TransitCue[] = [
  {
    line: "LOAD-IN",
    detail: "Alley Roll-Up Door (Ground-Level)",
    walkTime: "NW Leary Alley",
  },
  {
    line: "D LINE",
    detail: "15th Ave NW & NW Leary Way",
    walkTime: "2 min walk",
  },
  {
    line: "RT 40",
    detail: "Ballard Ave NW & 17th Ave",
    walkTime: "4 min walk",
  },
];

export const GEAR_FRAMES: GearRigFrame[] = [
  {
    id: "otari-tape",
    indexLabel: "RIG 01 // TRACKING",
    title: "Otari MTR-90 II 2-Inch 24-Track",
    caption:
      "Calibrated weekly at +6dB on SM911 tape. Warm saturation without plugin emulation.",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85",
    alt: "Analog mixing console and tape recording desk in dimly lit studio",
    gridSpanClass: "md:col-span-7",
    aspectClass: "aspect-[16/10]",
    tiltClass: "-rotate-[0.8deg]",
  },
  {
    id: "marshall-wall",
    indexLabel: "RIG 02 // BACKLINE",
    title: "1983 Marshall JCM800 + 4x12 Cab",
    caption:
      "Included in Room B & Recording sessions. Shure SM57 + Sennheiser MD421 ready on stands.",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85",
    alt: "Amplifiers and live music stage rig in monochrome",
    gridSpanClass: "md:col-span-5",
    aspectClass: "aspect-[4/3]",
    tiltClass: "rotate-[1deg]",
  },
  {
    id: "drum-booth",
    indexLabel: "RIG 03 // LIVE ROOM",
    title: "Cinderblock Drum Trap & Overhead Ribbon Pair",
    caption:
      "High-ceiling concrete shell built for loud snare cracks and zero bleed between rooms.",
    imageUrl:
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1000&q=85",
    alt: "Acoustic drum kit mic'd up inside a rehearsal room",
    gridSpanClass: "md:col-span-5",
    aspectClass: "aspect-[4/3]",
    tiltClass: "-rotate-[1deg]",
  },
  {
    id: "cassette-wall",
    indexLabel: "RIG 04 // TAPE SHELF",
    title: "Tascam 424 Portastudio & Master Dubs",
    caption:
      "Walk out with raw stereo cassette dubs or 24-bit WAV roughs before the amps cool down.",
    imageUrl:
      "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?auto=format&fit=crop&w=1200&q=85",
    alt: "Vintage audio equipment and analog cassette gear",
    gridSpanClass: "md:col-span-7",
    aspectClass: "aspect-[16/10]",
    tiltClass: "rotate-[0.6deg]",
  },
];

export const BACKLINE_INVENTORY = [
  { category: "GUITAR AMPS", spec: "1983 Marshall JCM800 2203 · Fender Twin Reverb · Sunn Beta Lead" },
  { category: "BASS RIGS", spec: "Ampeg SVT-CL Head · 8x10 Refrigerator Cab · SansAmp BDDI" },
  { category: "CONSOLE & TAPE", spec: "Soundcraft Ghost 32-Ch · Otari MTR-90 2\" 24-Track · Neve 1073 Clones" },
  { category: "DRUMS & MICS", spec: "1976 Ludwig Vistalite Shell Pack · Coles 4038 Ribbons · RE20 · SM57" },
] as const;
