import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "BBQ Catering Pricing — Custom Quotes Las Vegas",
  description:
    "Get custom BBQ catering pricing in Las Vegas. Big Bold BBQ offers Southern, Creole, and Cajun catering for events of all sizes. Call now for a fast quote.",
  alternates: { canonical: "/pricing" },
};

const factors = [
  "Number of guests",
  "Menu selection (meats, sides, specialty items)",
  "Service style (drop-off, buffet, or on-site cooking)",
  "Event size and setup needs",
] as const;

const value = [
  "Authentic Southern, Creole, and Cajun recipes — 100+ years",
  "Award-winning flavor recognized on a national stage",
  "An experienced female pitmaster leading every event",
  "Fresh, high-quality ingredients prepared the right way",
  "A personalized catering experience tailored to your event",
] as const;

const booking = [
  "Call or request a quote",
  "We discuss your event and customize your menu",
  "You receive a detailed quote within hours",
  "Secure your date with a 50% deposit",
  "Final balance is due 24 hours before your event",
] as const;

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal text-parchment pt-40 pb-20 md:pt-48">
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 80%, rgba(214,162,90,0.15) 0%, transparent 60%)",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <p className="text-warmgold uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-6">
              Pricing
            </p>
            <h1
              className="font-display font-black uppercase leading-[0.95] tracking-[-0.03em] text-balance max-w-5xl"
              style={{ fontSize: "clamp(2.5rem, 9vw, 6.5rem)" }}
            >
              BBQ catering pricing
              <br />
              <span className="text-firebrick">in Las Vegas.</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-parchment/85 max-w-2xl text-pretty">
              Every event is different. Your catering should be too. We build custom
              menus around your guest count, preferences, and service style — no
              rigid packages, no surprises.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <CtaButton href="/request-a-quote" variant="primary" size="lg">
                Request a Quote
              </CtaButton>
              <PhoneLink source="cta-band" variant="ghost" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What impacts pricing */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="What Impacts Pricing"
              lead="A few honest variables shape every quote."
            >
              What determines your
              <br />
              catering price.
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-4 max-w-3xl">
            {factors.map((f, idx) => (
              <Reveal key={f} delay={idx * 60}>
                <div className="flex items-start gap-4 p-5 rounded-md border border-hickory/15 bg-parchment-grain">
                  <Check className="size-5 text-firebrick flex-shrink-0 mt-1" aria-hidden />
                  <span className="text-base sm:text-lg">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <p className="mt-8 text-hickory/70 text-base max-w-2xl">
              Our goal is simple: clear, transparent pricing with no surprises.
              We focus on delivering high-quality food, generous portions, and an
              experience your guests will remember.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Value positioning */}
      <section className="bg-charcoal text-parchment py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="What You Get"
              tone="light"
              lead="When you choose Big Bold BBQ, you are not just paying for food. You are investing in:"
            >
              Real flavor. Real care.
              <br />
              Real value.
            </SectionHeading>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 max-w-5xl">
            {value.map((v, idx) => (
              <Reveal key={v} delay={idx * 80}>
                <li className="flex items-start gap-4 p-5 rounded-md bg-hickory/30 border border-parchment/10">
                  <span className="text-warmgold font-display text-2xl flex-shrink-0 leading-none mt-1">
                    →
                  </span>
                  <span className="text-base sm:text-lg text-parchment/90">{v}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Booking process */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Booking Process"
              lead="Five steps. No fluff. No delays."
            >
              Simple and transparent
              <br />
              from quote to pit.
            </SectionHeading>
          </Reveal>

          <ol className="mt-12 max-w-3xl">
            {booking.map((step, idx) => (
              <Reveal key={step} delay={idx * 80}>
                <li
                  className={`flex gap-6 py-6 ${idx < booking.length - 1 ? "border-b border-hickory/15" : ""}`}
                >
                  <span className="font-display text-3xl text-warmgold flex-shrink-0 leading-none w-12">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base sm:text-lg text-hickory/85">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-parchment py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Let's go"
              tone="light"
              align="center"
            >
              Let&apos;s get you a quote.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-lg sm:text-xl text-parchment/85 max-w-2xl mx-auto">
              The fastest way to get pricing is to call us directly. We respond
              quickly and make the process simple.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CtaButton href="/request-a-quote" variant="warmgold" size="lg">
                Get a Custom Quote
              </CtaButton>
              <PhoneLink source="cta-band" variant="ghost" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
