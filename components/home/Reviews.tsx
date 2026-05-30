import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";
import { Star } from "lucide-react";
import { site } from "@/lib/site";
import { reviews, reviewStats } from "@/lib/content/reviews";

/**
 * Acto 7 — Reviews. Real, hand-curated 5-star Google reviews from
 * lib/content/reviews.ts. While that file is empty, an honest "gathering
 * reviews" state shows instead — no invented quotes.
 */

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 text-warmgold" fill="currentColor" />
      ))}
    </div>
  );
}

export function Reviews() {
  const hasReviews = reviews.length > 0;
  const googleUrl = site.googleReviews.url;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-parchment text-hickory py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            lead={
              hasReviews
                ? "Real words from real events across the Las Vegas valley."
                : "Every plate earns its reputation. Verified five-star reviews land here as we collect them."
            }
          >
            {hasReviews ? "Trusted across Las Vegas." : "Reviews, the honest way."}
          </SectionHeading>
        </Reveal>

        {hasReviews ? (
          <>
            <Reveal>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <Stars />
                <span className="font-display text-2xl text-hickory leading-none">
                  {reviewStats.average.toFixed(1)}
                </span>
                <span className="text-hickory/65 text-sm">
                  from {reviewStats.count} Google review
                  {reviewStats.count === 1 ? "" : "s"}
                </span>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, idx) => (
                <Reveal key={`${r.author}-${idx}`} delay={idx * 60}>
                  <figure className="h-full flex flex-col rounded-2xl bg-parchment-grain border border-hickory/12 p-7 shadow-sm">
                    <Stars />
                    <blockquote className="mt-4 flex-1 text-hickory/85 text-lg leading-relaxed text-pretty">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 pt-5 border-t border-hickory/12">
                      <p className="font-display text-lg text-hickory">{r.author}</p>
                      {r.eventType ? (
                        <p className="text-hickory/60 text-sm mt-0.5">{r.eventType}</p>
                      ) : null}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            {googleUrl ? (
              <Reveal>
                <div className="mt-12 flex justify-center">
                  <CtaButton href={googleUrl} variant="secondary" external>
                    Read all reviews on Google
                  </CtaButton>
                </div>
              </Reveal>
            ) : null}
          </>
        ) : (
          <Reveal>
            <div className="mt-12 max-w-2xl mx-auto text-center rounded-2xl border border-hickory/12 bg-parchment-grain px-8 py-14">
              <Stars className="justify-center" />
              <p className="mt-5 font-display text-2xl md:text-3xl text-hickory text-balance">
                We let the food — and our guests — do the talking.
              </p>
              <p className="mt-4 text-hickory/70 text-base leading-relaxed text-pretty">
                We&apos;re gathering verified five-star reviews from recent events and
                will feature them right here. Tasted the smoke lately? We&apos;d be
                honored by your honest word.
              </p>
              {googleUrl ? (
                <div className="mt-8 flex justify-center">
                  <CtaButton href={googleUrl} variant="secondary" external>
                    Review us on Google
                  </CtaButton>
                </div>
              ) : null}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
