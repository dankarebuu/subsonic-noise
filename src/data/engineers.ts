import type { Engineer } from "../types/booking";

export const FIRST_AVAILABLE_ID = "first-available";

export const ENGINEERS: Engineer[] = [
  {
    id: "tessa",
    name: "Tessa Lind",
    firstName: "Tessa",
    role: "Chief Tape Engineer",
    experienceYears: 12,
    specialties: ["2-Inch Analog", "Big Muff Guitars", "Tape Mixdowns"],
    workingDays: [2, 3, 4, 5, 6],
    scheduleLabel: "Tue – Sat",
    bio: "Cut her teeth running live sound at Ballard VFW shows and calibrating Otari machines. Known for thick drum rooms and zero-bullshit mixes.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "marcus",
    name: "Marcus Cole",
    firstName: "Marcus",
    role: "Live Room & Drum Tech",
    experienceYears: 9,
    specialties: ["Drum Tuning", "Room B Backline", "Tour Pre-Prod"],
    workingDays: [0, 3, 4, 5, 6],
    scheduleLabel: "Wed – Sun",
    bio: "Turns ringing snare drums into cannon shots in ten minutes flat. Keeps every tube head biased and every wedge feedback-free.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "devon",
    name: "Devon Reyes",
    firstName: "Devon",
    role: "Mix & Overdub Specialist",
    experienceYears: 7,
    specialties: ["4-Track Cassette", "Vocal Grit", "Bass Fuzz"],
    workingDays: [2, 3, 4, 5, 6],
    scheduleLabel: "Tue – Sat",
    bio: "Obsessed with Tascam Portastudios, ribbon mics on guitar cabs, and getting raw vocal takes in three passes before overthinking sets in.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
];

export function getEngineerById(id: string): Engineer | undefined {
  return ENGINEERS.find((e) => e.id === id);
}
