import { BAND_REVIEWS } from "../../data/reviews";
import { cn } from "../../lib/utils";
import { Container, SectionHeader } from "../ui";

export function ReviewsSection() {
  return (
    <section className="py-14 sm:py-20 border-b-2 border-dashed border-ink/50">
      <Container>
        <SectionHeader
          indexTag="SECTION 04 // WORD ON THE FLYERS"
          title="LOCAL BAND NOTES"
          subtitle="Zero fake five-star widgets. Just receipts from bands that tracked or rehearsed on NW Leary Way."
        />

        {/* Asymmetric offset zine clippings */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {BAND_REVIEWS.map((review, index) => (
            <blockquote
              key={review.id}
              className={cn(
                "relative bg-paper-light border-2 border-ink p-6 flex flex-col justify-between",
                index === 0
                  ? "lg:col-span-6 zine-offset-red -rotate-[0.6deg]"
                  : index === 1
                    ? "lg:col-span-6 zine-offset-ink rotate-[0.5deg]"
                    : "lg:col-span-12 zine-offset-yellow"
              )}
            >
              <span
                aria-hidden="true"
                className="zine-tape absolute -top-3 left-6 h-5 w-20 -rotate-3"
              />
              <p className="font-mono text-sm sm:text-base leading-relaxed text-ink">
                “{review.quote}”
              </p>

              <footer className="mt-5 pt-3 border-t-2 border-dashed border-ink/35 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-display text-base uppercase tracking-tight text-ink">
                    {review.bandName}
                  </div>
                  <div className="font-mono text-xs text-concrete">
                    {review.memberCredit} · {review.neighborhood}
                  </div>
                </div>
                <span className="bg-ink text-dirty-yellow px-2.5 py-1 font-mono text-[11px] font-bold uppercase">
                  {review.roomName}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
