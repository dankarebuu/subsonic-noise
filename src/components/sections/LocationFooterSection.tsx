import { Clock, Mail, MapPin, Phone, Truck } from "lucide-react";
import { STUDIO_INFO, SUMMARY_HOURS_ROWS, TRANSIT_CUES } from "../../data/studio";
import { Button, Container, SectionHeader } from "../ui";

interface LocationFooterSectionProps {
  onOpenBooking: () => void;
}

export function LocationFooterSection({
  onOpenBooking,
}: LocationFooterSectionProps) {
  return (
    <footer id="location" className="scroll-mt-24 pt-14 sm:pt-20 pb-28 md:pb-14">
      <Container>
        <SectionHeader
          indexTag="SECTION 05 // LOAD-IN & HOURS"
          title="FIND THE ALLEY DOOR"
          subtitle="Ballard industrial corridor, two blocks north of the Ship Canal. Ground-level roll-up load-in—zero stairs."
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 cols — address, hours, transit */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-paper-light border-2 border-ink p-6 zine-offset-ink space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-red shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono text-xs font-bold uppercase text-concrete">
                    STUDIO ADDRESS
                  </div>
                  <div className="font-mono text-base font-bold text-ink mt-0.5">
                    {STUDIO_INFO.streetLine}
                  </div>
                  <div className="font-mono text-sm text-ink/80">
                    {STUDIO_INFO.cityLine}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-dashed border-ink/35">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-muted-red shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[11px] font-bold uppercase text-concrete">
                      DESK LINE
                    </div>
                    <a
                      href="tel:+12065550148"
                      className="font-mono text-sm font-bold text-ink zine-squiggle tabular-nums"
                    >
                      {STUDIO_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-muted-red shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[11px] font-bold uppercase text-concrete">
                      TAPE BOOKING
                    </div>
                    <a
                      href={`mailto:${STUDIO_INFO.email}`}
                      className="font-mono text-sm font-bold text-ink zine-squiggle break-all"
                    >
                      {STUDIO_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-dashed border-ink/35">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-ink mb-3">
                  <Clock className="h-4 w-4 text-muted-red" />
                  <span>OPERATING HOURS</span>
                </div>
                <div className="space-y-1.5 font-mono text-xs sm:text-sm tabular-nums">
                  {SUMMARY_HOURS_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="text-concrete">{row.label}</span>
                      <span
                        className={
                          row.isClosed
                            ? "font-bold text-muted-red"
                            : "font-bold text-ink"
                        }
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 font-mono text-[11px] text-concrete">
                  {STUDIO_INFO.closedNote}
                </p>
              </div>
            </div>

            <div className="bg-paper-light border-2 border-ink p-5 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-ink">
                <Truck className="h-4 w-4 text-muted-red" />
                <span>LOAD-IN &amp; TRANSIT</span>
              </div>
              <div className="space-y-2">
                {TRANSIT_CUES.map((cue) => (
                  <div
                    key={cue.line}
                    className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-dashed border-ink/25 last:border-b-0 last:pb-0 font-mono text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="bg-ink text-dirty-yellow px-2 py-0.5 text-[10px] font-bold uppercase">
                        {cue.line}
                      </span>
                      <span className="text-ink font-bold">{cue.detail}</span>
                    </div>
                    <span className="text-concrete tabular-nums">
                      {cue.walkTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 cols — stylized zine map card */}
          <div className="lg:col-span-5 bg-ink text-paper-light border-2 border-ink p-6 zine-offset-red space-y-5">
            <div className="flex items-center justify-between border-b border-dashed border-paper-light/30 pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-dirty-yellow">
                SECTOR // BALLARD, WA
              </span>
              <span className="font-mono text-[11px] text-paper-light/70 tabular-nums">
                47.665° N · 122.375° W
              </span>
            </div>

            {/* Minimal xeroxed street grid SVG */}
            <div className="border-2 border-paper-light/30 bg-paper/10 p-4">
              <svg
                viewBox="0 0 360 210"
                className="w-full h-auto"
                role="img"
                aria-label="Map diagram showing SUBSONIC NOISE on NW Leary Way near 15th Ave NW in Ballard"
              >
                <line
                  x1="20"
                  y1="55"
                  x2="340"
                  y2="95"
                  stroke="#E9E1D4"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <line
                  x1="20"
                  y1="145"
                  x2="340"
                  y2="165"
                  stroke="#7A7A7A"
                  strokeWidth="2"
                />
                <line
                  x1="125"
                  y1="15"
                  x2="115"
                  y2="195"
                  stroke="#E9E1D4"
                  strokeWidth="3"
                />
                <line
                  x1="255"
                  y1="15"
                  x2="245"
                  y2="195"
                  stroke="#7A7A7A"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                <text
                  x="130"
                  y="32"
                  fill="#B5A642"
                  fontFamily="Courier New, monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  15TH AVE NW
                </text>
                <text
                  x="195"
                  y="70"
                  fill="#E9E1D4"
                  fontFamily="Courier New, monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  NW LEARY WAY
                </text>
                <text
                  x="30"
                  y="138"
                  fill="#A8A49A"
                  fontFamily="Courier New, monospace"
                  fontSize="10"
                >
                  BALLARD AVE NW
                </text>

                <rect
                  x="155"
                  y="88"
                  width="24"
                  height="24"
                  fill="#8C2727"
                  stroke="#E9E1D4"
                  strokeWidth="2"
                />
                <text
                  x="188"
                  y="104"
                  fill="#B5A642"
                  fontFamily="Courier New, monospace"
                  fontSize="12"
                  fontWeight="bold"
                >
                  SUBSONIC NOISE (UNIT B)
                </text>
              </svg>
            </div>

            <p className="font-mono text-xs text-paper-light/80 leading-relaxed">
              Pull into the rear alley off NW Leary Way behind the brick warehouse.
              Text the desk number on arrival and the roll-up door goes up.
            </p>

            <Button variant="secondary" fullWidth onClick={onOpenBooking}>
              RESERVE A ROOM OR TAPE BLOCK →
            </Button>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t-2 border-dashed border-ink/45 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-concrete">
          <span>
            © {new Date().getFullYear()} {STUDIO_INFO.name} · {STUDIO_INFO.instagram}
          </span>
          <span>BALLARD REHEARSAL &amp; 2-INCH ANALOG TRACKING</span>
        </div>
      </Container>
    </footer>
  );
}
