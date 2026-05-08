import { CtaButton } from "@/components/shared/CtaButton";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { site } from "@/lib/site";

/**
 * Acto 9 — Final CTA. Full-bleed, charcoal, big phone, big quote button.
 */
export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative bg-charcoal text-parchment py-28 md:py-40 overflow-hidden"
    >
      {/* Atmospheric backdrop — V1 placeholder, real ambient video M3 */}
      <div aria-hidden className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(158,47,35,0.4) 0%, transparent 60%), radial-gradient(ellipse 90% 70% at 50% 100%, rgba(214,162,90,0.25) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)",
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
