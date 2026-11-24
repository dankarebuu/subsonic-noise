import { BACKLINE_INVENTORY, GEAR_FRAMES } from "../../data/studio";
import { cn } from "../../lib/utils";
import { Container, SectionHeader, ZineImage } from "../ui";

export function GearAtmosphereSection() {
  return (
    <section
      id="gear"
      className="scroll-mt-24 py-14 sm:py-20 border-b-2 border-dashed border-ink/50"
    >
      <Container>
        <SectionHeader
          indexTag="SECTION 03 // TAPE & BACKLINE"
          title="THE BASEMENT RIG"
          subtitle="Concrete walls, calibrated analog tape, and tube amplifiers that have survived three Pacific Northwest tours."
        />

        {/* Asymmetric zine photo collage */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {GEAR_FRAMES.map((frame, index) => (
            <figure
              key={frame.id}
              className={cn(frame.gridSpanClass, "space-y-3")}
            >
              <ZineImage
                src={frame.imageUrl}
                alt={frame.alt}
                aspectClass={frame.aspectClass}
                tapePosition={index % 2 === 0 ? "top-left" : "top-right"}
                frameClassName={frame.tiltClass}
              />
              <figcaption className="bg-paper-light border-l-4 border-ink px-3.5 py-2.5">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted-red">
                  {frame.indexLabel}
                </div>
                <div className="font-mono text-sm font-bold text-ink mt-0.5">
                  {frame.title}
                </div>
                <p className="font-mono text-xs text-ink/80 mt-1 leading-relaxed">
                  {frame.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* House Gear Spec Sheet */}
        <div className="mt-12 bg-paper-light border-2 border-ink p-5 sm:p-7 zine-offset-yellow">
          <div className="flex items-center justify-between gap-4 pb-4 border-b-2 border-dashed border-ink/40">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-ink">
              HOUSE BACKLINE SHEET
            </h3>
            <span className="bg-ink text-dirty-yellow px-2.5 py-1 font-mono text-[11px] font-bold uppercase">
              MAINTAINED WEEKLY
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {BACKLINE_INVENTORY.map((row) => (
              <div
                key={row.category}
                className="p-3.5 bg-paper border border-ink/60"
              >
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted-red">
                  {row.category}
                </div>
                <div className="mt-1 font-mono text-xs sm:text-sm text-ink leading-relaxed">
                  {row.spec}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
