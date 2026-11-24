import { useState } from "react";
import { ROOM_CATEGORIES, STUDIO_ROOMS } from "../../data/rooms";
import { cn, formatCurrency, formatDuration } from "../../lib/utils";
import type { RoomCategory } from "../../types/booking";
import { Badge, Button, Container, SectionHeader } from "../ui";

interface RoomsMenuSectionProps {
  onSelectRoom: (roomId: string) => void;
}

export function RoomsMenuSection({ onSelectRoom }: RoomsMenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<RoomCategory>("rehearsal");

  const filteredRooms = STUDIO_ROOMS.filter(
    (room) => room.category === activeCategory
  );

  return (
    <section
      id="rooms"
      className="scroll-mt-24 py-14 sm:py-20 border-b-2 border-dashed border-ink/50"
    >
      <Container>
        <SectionHeader
          indexTag="SECTION 01 // RATE SHEET"
          title="ROOMS & TAPE BLOCKS"
          subtitle="Flat-rate lockouts and analog sessions. Pick a room, add vintage backline if needed, and lock your time straight onto the studio board."
        />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {ROOM_CATEGORIES.map((cat) => {
            const active = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "min-h-[44px] px-4 py-2 border-2 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-all cursor-pointer",
                  active
                    ? "bg-ink text-dirty-yellow border-ink shadow-[4px_4px_0_#8C2727]"
                    : "bg-paper-light text-ink border-ink hover:bg-dirty-yellow/35"
                )}
              >
                {cat.label}
              </button>
            );
          })}
          <span className="font-mono text-xs text-concrete ml-auto hidden sm:inline">
            {ROOM_CATEGORIES.find((c) => c.id === activeCategory)?.subtitle}
          </span>
        </div>

        {/* Asymmetric 2-column zine layout (no 3-equal-columns) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {filteredRooms.map((room, idx) => {
            const isFeatured = idx === 0;
            return (
              <article
                key={room.id}
                className={cn(
                  "bg-paper-light border-2 border-ink p-5 sm:p-6 flex flex-col justify-between transition-transform",
                  isFeatured
                    ? "lg:col-span-7 zine-offset-red"
                    : "lg:col-span-5 zine-offset-ink"
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 pb-3 border-b-2 border-dashed border-ink/35">
                    <div>
                      <Badge variant={isFeatured ? "yellow" : "paper"}>
                        {room.previewTag}
                      </Badge>
                      <h3 className="mt-2.5 font-display text-xl sm:text-2xl uppercase tracking-tight text-ink">
                        {room.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0 tabular-nums">
                      <div className="font-display text-2xl sm:text-3xl text-muted-red">
                        {formatCurrency(room.price)}
                      </div>
                      <div className="font-mono text-xs font-bold text-concrete uppercase">
                        {formatDuration(room.durationMins)}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 font-mono text-xs sm:text-sm leading-relaxed text-ink/85">
                    {room.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {room.includes.map((item) => (
                      <li
                        key={item}
                        className="bg-paper border border-ink px-2.5 py-1 font-mono text-[11px] font-bold text-ink"
                      >
                        + {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-ink/35 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase text-concrete">
                    NO DEPOSIT REQUIRED
                  </span>
                  <Button
                    variant={isFeatured ? "secondary" : "primary"}
                    size="sm"
                    onClick={() => onSelectRoom(room.id)}
                  >
                    RESERVE THIS SLOT →
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
