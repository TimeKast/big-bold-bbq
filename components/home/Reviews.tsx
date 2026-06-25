import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";
import { ExternalLink, Star } from "lucide-react";
import { site } from "@/lib/site";
import type { GoogleReviewDisplay, GoogleReviewsData } from "@/lib/reviews";

/**
 * Acto 7 - Reviews. Real Google reviews are curated in Payload. The aggregate
 * rating/count comes from Google Places when configured, with a truthful manual
 * fallback while credentials are pending.
 */

function Stars({ className = "", rating = 5 }: { className?: string; rating?: number }) {
  const filledStars = Math.round(Math.min(5, Math.max(1, rating)));

  return (
    <div className={`flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4 text-warmgold"
          fill={i < filledStars ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  linkEnabled = true,
}: {
  review: GoogleReviewDisplay;
  linkEnabled?: boolean;
}) {
  const card = (
    <figure className="h-[22rem] w-[min(84vw,24rem)] shrink-0 flex flex-col rounded-2xl bg-parchment-grain border border-hickory/12 p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <Stars rating={review.rating} />
        {review.googleUrl && linkEnabled ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-firebrick">
            Read
            <ExternalLink className="size-3" aria-hidden />
          </span>
        ) : null}
      </div>
      <blockquote className="mt-4 flex-1 overflow-hidden text-hickory/85 text-lg leading-relaxed text-pretty line-clamp-7">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 pt-5 border-t border-hickory/12">
        <p className="font-display text-lg text-hickory">{review.author}</p>
        {review.eventType ? (
          <p className="text-hickory/60 text-sm mt-0.5">{review.eventType}</p>
        ) : null}
      </figcaption>
    </figure>
  );

  if (!review.googleUrl || !linkEnabled) {
    return card;
  }

  return (
    <a
      href={review.googleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl focus-visible:outline-firebrick"
      aria-label={`Read ${review.author}'s Google review`}
    >
      {card}
    </a>
  );
}

export function Reviews({ data }: { data: GoogleReviewsData }) {
  const { reviews, reviewStats } = data;
  const hasReviews = reviews.length > 0;
  const googleUrl = site.googleReviews.url;
  const carouselReviews = reviews.length > 1 ? [...reviews, ...reviews] : reviews;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-parchment text-hickory pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden"
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

            <Reveal>
              <div className="relative mt-12 -mx-4 sm:-mx-6 lg:mx-0">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-parchment to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-parchment to-transparent" />
                <div className="overflow-hidden py-2" aria-label="Featured Google reviews carousel">
                  <div className="marquee flex w-max gap-6 px-4 sm:px-6 lg:px-0">
                    {carouselReviews.map((review, idx) => {
                      const isDuplicate = idx >= reviews.length;

                      return (
                        <div key={`${review.id}-${idx}`} aria-hidden={isDuplicate || undefined}>
                          <ReviewCard review={review} linkEnabled={!isDuplicate} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>

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
