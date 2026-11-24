import { ArrowUpRight, Disc3, Volume2 } from "lucide-react";
import { STUDIO_INFO } from "../../data/studio";
import type { AvailableSlot } from "../../types/booking";
import { Badge, Button, Container, ZineImage } from "../ui";

interface HeroSectionProps {
  nextSlot: AvailableSlot | null;
  onBookNow: () => void;
  onBookSlot: (slot: AvailableSlot) => void;
}

export function HeroSection({
  nextSlot,
  onBookNow,
  onBookSlot,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden py-10 sm:py-14 lg:py-20 border-b-2 border-dashed border-ink/50"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column — stacked zine headline & manifesto */}
          <div className="lg:col-span-6 space-y-6">
            {nextSlot && (
              <button
                type="button"
                onClick={() => onBookSlot(nextSlot)}
                className="inline-flex items-center cursor-pointer group"
              >
                <Badge
                  variant="live"
                  className="group-hover:bg-dirty-yellow/35 transition-colors tabular-nums"
                >
                  <span>NEXT OPEN SLOT: {nextSlot.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-red" />
                </Badge>
              </button>
            )}

            <div className="relative pt-2">
              <span
                aria-hidden="true"
                className="zine-tape absolute -top-1 left-24 sm:left-36 h-6 w-24 -rotate-3 z-10"
              />
              <h1 className="font-display text-5xl sm:text-6xl xl:text-[4.35rem] uppercase tracking-tight leading-[0.94] text-ink">
                <span className="block">GARAGE</span>
                <span className="block mt-2 sm:mt-3">REVIVAL</span>
              </h1>
            </div>

            <div className="bg-paper-light border-l-4 border-muted-red border-y border-r border-ink/30 p-4 sm:p-5 max-w-xl shadow-[3px_3px_0_rgba(46,46,46,0.12)]">
              <p className="font-mono text-sm sm:text-base leading-relaxed text-ink">
                Raw amps. 2-inch analog tape. Zero sterile studio vibes. Ballard
                rehearsal rooms and tracking sessions built to feel in your ribs
                and ears—reserved online in under 30 seconds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button variant="primary" size="lg" onClick={onBookNow}>
                <Volume2 className="h-4 w-4" />
                BOOK A SESSION
              </Button>
              <a
                href="#rooms"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-paper-light text-ink border-2 border-ink font-mono text-sm font-bold uppercase tracking-[0.12em] hover:bg-ink hover:text-paper-light transition-colors"
              >
                <Disc3 className="h-4 w-4" />
                RATES &amp; ROOMS
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-concrete tabular-nums">
              <span>BALLARD, SEATTLE</span>
              <span>//</span>
              <span>TUE–SUN · 12PM–11PM</span>
              <span>//</span>
              <span>ALLEY LOAD-IN</span>
            </div>
          </div>

          {/* Right column — tilted monochrome live photo with red offset frame & yellow marker stamp */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none rotate-[1.4deg]">
              <ZineImage
                src={STUDIO_INFO.heroImageUrl}
                alt={STUDIO_INFO.heroImageAlt}
                aspectClass="aspect-[4/3]"
                tapePosition="top-right"
                priority
              />

              <div className="absolute -bottom-4 -right-2 sm:-right-4 z-20 -rotate-3 bg-dirty-yellow border-2 border-ink px-4 py-2 shadow-[4px_4px_0_#2E2E2E]">
                <span className="font-marker text-base sm:text-lg tracking-wide text-ink uppercase">
                  LIVE TODAY!
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
