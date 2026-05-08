import { CtaButton } from "@/components/shared/CtaButton";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { VideoLoop } from "@/components/shared/VideoLoop";
import { site } from "@/lib/site";

/**
 * Acto 9 — Final CTA. Full-bleed, charcoal, big phone, big quote button.
 * V7 video: oak fire in a steel firepit, embers, smoke (Seedance 2.0, 5s 1080p).
 */
export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative bg-charcoal text-parchment py-28 md:py-40 overflow-hidden"
    >
      {/* V7 ambient fire backdrop */}
      <VideoLoop
        src="/video/v7-fire-desktop.mp4"
        srcMobile="/video/v7-fire-mobile.mp4"
        poster="/video/v7-fire-poster.jpg"
        ariaLabel="Oak fire and embers in a steel firepit"
        className="absolute inset-0"
      />

      {/* Firebrick multiply overlay + vignette */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(158,47,35,0.45) 0%, rgba(43,30,22,0.65) 70%, rgba(43,30,22,0.9) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-warmgold uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-6">
          Ready When You Are
        </p>
        <h2
          id="final-cta-title"
          className="font-display font-black uppercase leading-[0.95] tracking-[-0.03em] text-balance"
          style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
        >
          Book the smoke.
        </h2>
        <p className="mt-8 text-lg sm:text-xl md:text-2xl text-parchment/85 max-w-2xl mx-auto text-pretty">
          Tell us about your event. We&apos;ll come back the same day with a
          custom menu and a clear quote.
        </p>

        <div className="mt-12 flex flex-col items-center gap-6">
          <a
            href={site.phone.href}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-firebrick hover:text-warmgold transition-colors duration-300 inline-block"
            aria-label={`Call ${site.name} at ${site.phone.display}`}
          >
            {site.phone.display}
          </a>
          <p className="text-parchment/55 text-sm uppercase tracking-[0.2em]">
            Or
          </p>
          <CtaButton href="/request-a-quote" variant="warmgold" size="xl">
            Request a Quote →
          </CtaButton>
          <PhoneLink source="cta-band" variant="ghost" />
        </div>
      </div>
    </section>
  );
}
