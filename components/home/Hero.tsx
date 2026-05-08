import { CtaButton } from "@/components/shared/CtaButton";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { VideoLoop } from "@/components/shared/VideoLoop";
import { Flame } from "lucide-react";

/**
 * Acto 1 — Hero (0-8% scroll). Full-bleed.
 * V1 video: brisket + smoke + ember firebox dolly-in (Seedance 2.0, 6s 720p).
 * Plan §2 narrative architecture acto 1.
 */
export function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-charcoal text-parchment"
      aria-labelledby="hero-title"
    >
      {/* Background — Seedance V1 hero clip */}
      <VideoLoop
        src="/video/v1-hero-desktop.mp4"
        srcMobile="/video/v1-hero-mobile.mp4"
        poster="/video/v1-hero-poster.jpg"
        ariaLabel="Smoked brisket resting on a hickory pit, smoke drifting in the firebox glow"
        className="absolute inset-0"
      />

      {/* Tinted vignette for legibility of headline */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(43,30,22,0.25) 0%, rgba(43,30,22,0.55) 65%, rgba(43,30,22,0.85) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 pt-32 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-parchment/10 backdrop-blur-sm border border-parchment/20 text-xs sm:text-sm text-parchment/85 uppercase tracking-[0.2em] font-semibold">
            <Flame className="size-3.5 text-warmgold" aria-hidden />
            <span>Award-Winning · Las Vegas</span>
          </div>

          <h1
            id="hero-title"
            className="font-display font-black uppercase leading-[0.92] tracking-[-0.04em] text-balance"
            style={{
              fontSize: "clamp(2.75rem, 9vw, 7rem)",
            }}
          >
            <span className="block text-parchment">Big flavor.</span>
            <span className="block text-parchment">Real smoke.</span>
            <span className="block text-firebrick">Done right.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-parchment/85 max-w-2xl text-pretty leading-relaxed">
            Award-winning Southern BBQ catering in Las Vegas with a Creole and
            Cajun kick. Soulful catering for corporate events, weddings, and
            private parties.
          </p>

          <p className="mt-4 text-sm sm:text-base text-warmgold uppercase tracking-[0.18em] font-semibold">
            Rooted in 100+ years of Southern tradition. Crafted by a female pitmaster.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <CtaButton href="/request-a-quote" variant="primary" size="lg">
              Request a Quote
            </CtaButton>
            <PhoneLink source="hero" variant="ghost" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-parchment/50 text-xs uppercase tracking-[0.3em] hidden sm:block"
      >
        Scroll to taste
      </div>
    </section>
  );
}
