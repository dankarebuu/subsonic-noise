import { ENGINEERS } from "../../data/engineers";
import { cn } from "../../lib/utils";
import { Badge, Button, Container, SectionHeader, ZineImage } from "../ui";

interface EngineersSectionProps {
  onBookWithEngineer: (engineerId: string) => void;
}

export function EngineersSection({ onBookWithEngineer }: EngineersSectionProps) {
  return (
    <section
      id="engineers"
      className="scroll-mt-24 py-14 sm:py-20 border-b-2 border-dashed border-ink/50"
    >
      <Container>
        <SectionHeader
          indexTag="SECTION 02 // CONTROL ROOM"
          title="HOUSE ENGINEERS"
          subtitle="Real people who know how to mic a blazing 4x12 cab without blowing out the ribbon mics. Book a specific engineer or grab the earliest open slot."
        />

        <div className="mt-10 space-y-8">
          {ENGINEERS.map((engineer, index) => {
            const flip = index % 2 === 1;
            return (
              <article
                key={engineer.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center bg-paper-light border-2 border-ink p-5 sm:p-7 zine-offset-ink"
              >
                <div
                  className={cn(
                    "md:col-span-5",
                    flip && "md:order-2"
                  )}
                >
                  <ZineImage
                    src={engineer.imageUrl}
                    alt={`${engineer.name} — ${engineer.role}`}
                    aspectClass="aspect-[4/3]"
                    tapePosition={flip ? "top-left" : "top-right"}
                    frameClassName={flip ? "rotate-[1deg]" : "-rotate-[1deg]"}
                  />
                </div>

                <div
                  className={cn(
                    "md:col-span-7 space-y-4",
                    flip && "md:order-1"
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant="red">{engineer.role}</Badge>
                    <Badge variant="yellow" className="tabular-nums">
                      {engineer.experienceYears} YRS EXP
                    </Badge>
                    <span className="font-mono text-xs font-bold uppercase text-concrete tabular-nums">
                      ON DECK: {engineer.scheduleLabel}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-ink">
                    {engineer.name}
                  </h3>

                  <p className="font-mono text-xs sm:text-sm leading-relaxed text-ink/85 max-w-xl">
                    {engineer.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {engineer.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 bg-paper border border-ink font-mono text-[11px] font-bold uppercase text-ink"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => onBookWithEngineer(engineer.id)}
                    >
                      BOOK WITH {engineer.firstName.toUpperCase()} →
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
