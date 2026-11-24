import type { GearAddon, RoomCategory, StudioRoom } from "../types/booking";

export const ROOM_CATEGORIES: Array<{
  id: RoomCategory;
  label: string;
  subtitle: string;
}> = [
  {
    id: "rehearsal",
    label: "Rehearsal",
    subtitle: "Sound-isolated Ballard rooms with PA & backline",
  },
  {
    id: "recording",
    label: "Recording",
    subtitle: "Cassette 4-track & Otari 2-inch analog tracking",
  },
  {
    id: "packages",
    label: "Packages",
    subtitle: "Full-band lockouts, live cuts & EP blitz blocks",
  },
];

export const STUDIO_ROOMS: StudioRoom[] = [
  {
    id: "garage-a",
    category: "rehearsal",
    name: "Room A: The Basement",
    durationMins: 120,
    price: 55,
    description:
      "280 sq ft cinderblock rehearsal room with Mackie PA, two vocal mics, Marshall 4x12 cab, and drum rug ready.",
    previewTag: "Most Booked",
    includes: ["2-hr lockout", "Mackie PA + 2 SM58s", "Marshall + Ampeg cabs"],
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "live-b",
    category: "rehearsal",
    name: "Room B: Concrete Live Room",
    durationMins: 180,
    price: 85,
    description:
      "450 sq ft high-ceiling room tuned for loud four-piece bands. Includes JCM800 half-stack, Twin Reverb, and Ludwig kit.",
    previewTag: "Full Backline",
    includes: ["3-hr lockout", "Full tube backline", "House Ludwig kit"],
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "late-lockout",
    category: "rehearsal",
    name: "Late-Night Garage Lockout",
    durationMins: 240,
    price: 110,
    description:
      "Four straight hours in Room B after sunset. Bring your own beer-free hydration, crank the amps, zero noise complaints.",
    previewTag: "4-Hour Block",
    includes: ["4-hr evening block", "Alley roll-up access", "Full house PA"],
    imageUrl:
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tape-demo",
    category: "recording",
    name: "4-Track Cassette Demo Cut",
    durationMins: 180,
    price: 160,
    description:
      "Track three songs live to a Tascam 424 Portastudio with an engineer running levels and bouncing raw Chrome cassette dubs.",
    previewTag: "Raw & Fast",
    includes: ["Engineer included", "Tascam 424 tracking", "3 Chrome cassette dubs"],
    imageUrl:
      "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "two-inch-session",
    category: "recording",
    name: "Otari 2-Inch Analog Tracking",
    durationMins: 240,
    price: 290,
    description:
      "24-track analog tape session through Soundcraft Ghost and Neve-style preamps. Ideal for full-band rhythm tracking.",
    previewTag: "24-Track Tape",
    includes: ["4-hr tracking block", "Otari MTR-90 2\"", "Rough mix WAVs"],
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "vocal-overdub",
    category: "recording",
    name: "Vocal & Guitar Overdub Block",
    durationMins: 120,
    price: 125,
    description:
      "Tight two-hour surgical block for doubling guitars, fuzz solos, or screaming vocal takes through an RE20 and 1176.",
    previewTag: "Neve Preamp",
    includes: ["2-hr control room", "RE20 + U87 access", "1176 hardware comp"],
    imageUrl:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "weekend-ep",
    category: "packages",
    name: "Single-Day 2-Song EP Blitz",
    durationMins: 360,
    price: 420,
    description:
      "Six-hour lockout combining live tracking in Room B, vocal overdubs, and tape mixdown so you leave with two finished masters.",
    previewTag: "Best Value",
    includes: ["6-hr full studio", "Engineer + backline", "2 mastered tracks"],
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "live-video-cut",
    category: "packages",
    name: "Live Room Session + Board Mix",
    durationMins: 180,
    price: 210,
    description:
      "Set up like a basement gig, mic everything cleanly, and walk out with a punchy stereo board mix ready for Bandcamp.",
    previewTag: "Zero Overdubs",
    includes: ["3-hr Room B", "16-ch live mics", "Stereo WAV stems"],
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tour-warm-up",
    category: "packages",
    name: "Pre-Tour 3-Hour Full Rig Check",
    durationMins: 180,
    price: 140,
    description:
      "Run your full Pacific Northwest tour set at stage volume with an engineer dialing wedges, vocal splits, and amp balance.",
    previewTag: "Tour Prep",
    includes: ["3-hr stage rig check", "Monitor wedge mix", "Spare tube check"],
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
  },
];

export const GEAR_ADDONS: GearAddon[] = [
  {
    id: "ampeg-8x10",
    name: "Ampeg SVT Classic + 8x10 Fridge",
    durationMins: 0,
    price: 20,
  },
  {
    id: "ludwig-kit",
    name: "1976 Ludwig Vistalite Breakables",
    durationMins: 0,
    price: 25,
  },
  {
    id: "reel-to-reel",
    name: "2-Inch Tape Reel & Mixdown Bounce",
    durationMins: 30,
    price: 45,
  },
  {
    id: "board-mix",
    name: "Rough Stereo Board Mix (WAV)",
    durationMins: 15,
    price: 15,
  },
];

export function getRoomById(id: string): StudioRoom | undefined {
  return STUDIO_ROOMS.find((r) => r.id === id);
}

export function getAddonById(id: string): GearAddon | undefined {
  return GEAR_ADDONS.find((a) => a.id === id);
}
