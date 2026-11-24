-- Run this in the Supabase SQL Editor to add 'subsonic' to the shared demo_bookings table.

ALTER TABLE public.demo_bookings
  DROP CONSTRAINT IF EXISTS demo_bookings_demo_slug_check;

ALTER TABLE public.demo_bookings
  ADD CONSTRAINT demo_bookings_demo_slug_check
  CHECK (demo_slug IN ('kobo', 'sora-dental', 'meridian', 'subsonic'));

DELETE FROM public.demo_bookings
WHERE demo_slug = 'subsonic' AND is_seed = true;

INSERT INTO public.demo_bookings (
  demo_slug, session_id, service_name, provider_or_track,
  booking_date, booking_time, duration_mins, price_label,
  client_name, client_email, client_phone, notes, metadata, status, is_seed
) VALUES
(
  'subsonic', 'seed', 'Room A: The Basement', 'Tessa Lind',
  CURRENT_DATE, '14:00', 120, '$55',
  'Fuzz Harbor', 'fuzzharbor@example.com', '(206) 555-0114',
  'Bringing two 4x12 guitar cabs; need house Ampeg.',
  '{"room_id":"garage-a","engineer_id":"tessa","reference_code":"SUB-9104","total_price":55,"default_status":"confirmed"}'::jsonb,
  'confirmed', true
),
(
  'subsonic', 'seed', 'Room B: Concrete Live Room', 'Marcus Cole',
  CURRENT_DATE, '18:00', 180, '$85',
  'Rainier Static', 'rainier@example.com', '(206) 555-0167',
  'Full 4-piece rehearsal with house Ludwig kit.',
  '{"room_id":"live-b","engineer_id":"marcus","reference_code":"SUB-9112","total_price":85,"default_status":"confirmed"}'::jsonb,
  'confirmed', true
),
(
  'subsonic', 'seed', 'Otari 2-Inch Analog Tracking', 'Tessa Lind',
  CURRENT_DATE + 1, '13:00', 240, '$290',
  'Ballard Wires', 'wires@example.com', '(206) 555-0183',
  'Live rhythm tracking to 2-inch SM911 tape.',
  '{"room_id":"two-inch-session","engineer_id":"tessa","reference_code":"SUB-9127","total_price":290,"default_status":"confirmed"}'::jsonb,
  'confirmed', true
);
