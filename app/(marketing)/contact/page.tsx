import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { site } from "@/lib/site";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Big Bold BBQ — Las Vegas Catering",
  description:
    "Contact Big Bold BBQ for authentic Southern, Creole, and Cajun catering in Las Vegas. Call now or request a fast quote for your event.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal text-parchment pt-40 pb-20 md:pt-48">
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 70% 50%, rgba(214,162,90,0.15) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <p className="text-warmgold uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-6">
              Contact
            </p>
            <h1
              className="font-display font-black uppercase leading-[0.95] tracking-[-0.03em] text-balance max-w-4xl"
              style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}
            >
              Let&apos;s talk about
              <br />
              <span className="text-firebrick">your event.</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-parchment/85 max-w-2xl text-pretty">
              Whether you&apos;re planning a corporate event, wedding, or private
              party, we&apos;re here to help you create an unforgettable BBQ
              experience. The fastest way to get started is to call us directly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Direct contact */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid gap-12 md:gap-16 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <SectionHeading eyebrow="Direct Line" lead="A few minutes by phone usually beats a long form. We pick up.">
                Call us for a fast quote.
              </SectionHeading>

              <div className="mt-10 flex flex-col gap-4 max-w-md">
                <a
                  href={site.phone.href}
                  className="font-display text-4xl sm:text-5xl text-firebrick hover:text-warmgold transition-colors"
                  aria-label={`Call ${site.name} at ${site.phone.display}`}
                >
                  {site.phone.display}
                </a>
                <PhoneLink source="cta-band" variant="primary" />
              </div>

              <ul className="mt-12 flex flex-col gap-5 text-base text-hickory/85 max-w-md">
                <li className="flex items-start gap-3">
                  <Mail className="size-5 text-firebrick flex-shrink-0 mt-1" aria-hidden />
                  <a href={`mailto:${site.email}`} className="hover:text-firebrick break-all">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="size-5 text-firebrick flex-shrink-0 mt-1" aria-hidden />
                  <span>
                    Serving Las Vegas, Henderson, Summerlin, North Las Vegas, and
                    Boulder City.
                  </span>
                </li>
              </ul>
            </Reveal>

            {/* Quote redirect card */}
            <Reveal delay={120}>
              <div className="rounded-2xl bg-charcoal text-parchment p-8 sm:p-10 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-24 -right-24 size-72 rounded-full bg-firebrick/20 blur-3xl"
                />
                <div className="relative">
                  <p className="text-warmgold uppercase tracking-[0.2em] text-xs font-bold">
                    Prefer to write?
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl mt-3 text-balance">
                    Use the guided quote form.
                  </h2>
                  <p className="mt-4 text-parchment/85 text-base leading-relaxed">
                    A short, four-step form. About 90 seconds to complete. We come
                    back the same day with a custom menu and a clear quote.
                  </p>
                  <ul className="mt-6 flex flex-col gap-2 text-sm text-parchment/80">
                    <li>→ Event basics</li>
                    <li>→ Guest count and menu preferences</li>
                    <li>→ Location and service style</li>
                    <li>→ Contact details — and you&apos;re done</li>
                  </ul>
                  <div className="mt-8">
                    <CtaButton href="/request-a-quote" variant="warmgold" size="lg">
                      Start the Quote
                    </CtaButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Response */}
      <section className="bg-parchment-grain text-hickory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <SectionHeading eyebrow="What Happens Next" align="center">
              Fast, simple, and transparent.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <ol className="mt-12 grid gap-6 sm:grid-cols-3 text-left">
              {[
                ["01", "We review", "Your event details land in our inbox."],
                ["02", "We may ask", "Quick clarifying call or message if needed."],
                ["03", "You receive", "A customized quote within hours."],
              ].map(([n, t, b]) => (
                <li
                  key={n}
                  className="rounded-lg border border-hickory/15 bg-parchment p-6"
                >
                  <span className="font-display text-3xl text-warmgold leading-none">
                    {n}
                  </span>
                  <h3 className="font-display text-lg md:text-xl mt-3 text-hickory">
                    {t}
                  </h3>
                  <p className="text-sm text-hickory/75 mt-1">{b}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  );
}
