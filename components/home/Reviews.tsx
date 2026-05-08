import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Star } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Acto 7 — Reviews.
 * V1: placeholder reviews until real testimonials come in (PENDING.md P2 #11).
 * Marquee + 3-card grid. Google rating hidden until GBP is verified.
 */
const placeholderQuotes = [
  "Best brisket of my life — and I'm from Texas.",
  "The gumbo alone was worth booking the catering.",
  "Hands down the most authentic Southern cooking in Vegas.",
  "Our wedding guests are still talking about the ribs.",
  "Chef Dee runs a tight kitchen and a warm one.",
  "We've booked her three times. We'll book her again.",
  "It tastes like Sunday at my grandmother's table.",
  "Show stopper. Period.",
] as const;

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-parchment text-hickory py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            align="center"
            lead="What clients are saying. Real words, real plates, real events."
          >
            Trusted across Las Vegas.
          </SectionHeading>
        </Reveal>
      </div>

      {/* Marquee — overflow visible beyond container */}
      <div className="mt-16 overflow-hidden">
        <div className="marquee flex gap-6 whitespace-nowrap">
          {[...placeholderQuotes, ...placeholderQuotes].map((q, idx) => (
            <span
              key={`${q}-${idx}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-hickory/8 border border-hickory/15 text-hickory/85"
            >
              <Star
                className="size-4 text-warmgold flex-shrink-0"
                aria-hidden
                fill="currentColor"
              />
              <span>&ldquo;{q}&rdquo;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Note about real reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-hickory/65 text-sm">
              Verified testimonials coming as we collect permissions from past
              event hosts. {site.googleReviews.show ? `Currently rated ${site.googleReviews.rating}★ across ${site.googleReviews.count} Google reviews.` : ""}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
