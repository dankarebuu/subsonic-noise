# SPEC.md — SUBSONIC NOISE (Rehearsal & Analog Recording Studio)

## 1. Product Positioning & Technical Architecture

- **Target Concept**: 90s Grunge Rehearsal & 2-Inch Analog Recording Studio in Ballard, Seattle, WA.
- **Stack**: Vite, React 19, TypeScript (strict), Tailwind CSS v4 (`@tailwindcss/vite`), `lucide-react`, `clsx`, `tailwind-merge`.
- **Persistence Layer**: Pure client-side React state persisted to `localStorage` (`subsonic_demo_bookings_v1`) with 5 seeded realistic busy slots anchored dynamically to today and tomorrow, live next-open-slot calculation, and `.ics` calendar download.

## 2. Studio Facts (`src/data/studio.ts`)

- **Studio Name**: `SUBSONIC NOISE`
- **Address**: `1422 NW Leary Way, Unit B, Ballard, Seattle, WA 98107`
- **Phone**: `(206) 555-0148`
- **Email**: `tape@subsonicnoise.studio`
- **Instagram**: `@subsonicnoise.sea`
- **Hours**:
  - Tuesday – Friday: `12:00 PM – 11:00 PM`
  - Saturday – Sunday: `10:00 AM – 10:00 PM`
  - Monday: `Closed` (Equipment maintenance & tape calibration)
- **Load-In & Transit Cues**:
  - `Alley Roll-Up Door — Ground-level amp load-in (NW Leary)`
  - `RapidRide D Line — 15th Ave NW & Leary (2 min walk)`
  - `Route 40 — Ballard Ave & 17th (4 min walk)`

## 3. Rooms & Recording Catalog (`src/data/rooms.ts`)

- **Rehearsal (`rehearsal`)**:
  - `garage-a` — **Room A: The Basement** (`120 min`, `$55`, `Most Booked`)
  - `live-b` — **Room B: Concrete Live Room** (`180 min`, `$85`, `Full Backline`)
  - `late-lockout` — **Late-Night Garage Lockout** (`240 min`, `$110`, `After 7 PM`)
- **Recording (`recording`)**:
  - `tape-demo` — **4-Track Cassette Demo Cut** (`180 min`, `$160`, `Raw & Fast`)
  - `two-inch-session` — **Otari 2-Inch Analog Tracking** (`240 min`, `$290`, `24-Track Tape`)
  - `vocal-overdub` — **Vocal & Guitar Overdub Block** (`120 min`, `$125`, `Neve Preamp`)
- **Packages (`packages`)**:
  - `weekend-ep` — **Single-Day 2-Song EP Blitz** (`360 min`, `$420`, `Best Value`)
  - `live-video-cut` — **Live Room Session + Board Mix** (`180 min`, `$210`, `Zero Overdubs`)
  - `tour-warm-up` — **Pre-Tour 3-Hour Full Rig Check** (`180 min`, `$140`, `Tour Prep`)

### Gear Add-Ons (Multi-Select in Step 1)
1. `ampeg-8x10` — **Ampeg SVT Classic + 8x10 Fridge** (`+0 min`, `+$20`)
2. `ludwig-kit` — **1976 Ludwig Vistalite Breakables** (`+0 min`, `+$25`)
3. `reel-to-reel` — **2-Inch Tape Reel & Mixdown Bounce** (`+30 min`, `+$45`)
4. `board-mix` — **Rough Stereo Board Mix (WAV)** (`+15 min`, `+$15`)

## 4. Engineers (`src/data/engineers.ts`)

1. **Tessa Lind** (`tessa`) — *Chief Tape Engineer* (`12 yrs`, Tue–Sat `[2,3,4,5,6]`)
2. **Marcus Cole** (`marcus`) — *Live Room & Drum Tech* (`9 yrs`, Wed–Sun `[0,3,4,5,6]`)
3. **Devon Reyes** (`devon`) — *Mix & Overdub Specialist* (`7 yrs`, Tue–Sat `[2,3,4,5,6]`)

## 5. Booking Drawer & Demo Utility Bar

- **3-Step Drawer**:
  - Step 1: Room/Session + multi-select gear add-ons with live total price & duration.
  - Step 2: Engineer picker (`First Available` + 3 engineers respecting working days) + 7-day date strip (Mondays disabled) + booked-slot locking.
  - Step 3: Validated band/contact form -> perforated zine ticket (`SUB-XXXX`), `.ics` download, and `SMS Preview | Email Preview` toggle.
- **Demo Utility Bar**: Floating pill (`bottom-4 left-4` desktop, `bottom-20 left-4` mobile) with `Auto-Fill Test Session` (opens Step 3 pre-filled) and `Reset Demo` (restores default availability + updates Hero next-open-slot stamp).
