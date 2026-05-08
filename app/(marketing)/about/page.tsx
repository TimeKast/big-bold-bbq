import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { VideoLoop } from "@/components/shared/VideoLoop";
import { Award } from "lucide-react";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Chef Dee — Award-Winning BBQ Pitmaster Las Vegas",
  description:
    "Meet Chef Dee, the award-winning pitmaster behind Big Bold BBQ. Discover her Southern roots, Creole and Cajun influence, and passion for authentic catering in Las Vegas.",
  alternates: { canonical: "/about" },
};

const generations = [
  { era: "Mississippi Delta · 1910s", who: "Great-grandmother", body: "Where the recipes started — slow stews, smoke fires, food as gathering." },
  { era: "East Texas · 1940s", who: "Grandmother", body: "Brisket, rubs, and the discipline of a long, slow cook." },
  { era: "Louisiana · 1970s", who: "Mother", body: "Gumbo, dirty rice, and a Creole pantry passed plate to plate." },
  { era: "Las Vegas · 2010s+", who: "Chef Dee", body: "Three states' traditions, one pit, every event." },
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "About", url: `${site.url}/about` },
        ])}
      />

      {/* Hero */}
      <section className="relative bg-charcoal text-parchment pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <VideoLoop
          src="/video/v8-hearth-desktop.mp4"
          srcMobile="/video/v8-hearth-mobile.mp4"
          poster="/video/v8-hearth-poster.jpg"
          ariaLabel="Wood-fired hearth at golden hour, embers and warm bokeh"
          className="absolute inset-0"
          loopFadeMs={650}
        />
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(43,30,22,0.4) 0%, rgba(43,30,22,0.65) 50%, rgba(43,30,22,0.85) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <p className="text-warmgold uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-6">
              Meet Chef Dee
            </p>
            <h1
              className="font-display font-black uppercase leading-[0.95] tracking-[-0.03em] text-balance max-w-5xl"
              style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
            >
              The heart behind
              <br />
              <span className="text-firebrick">the flavor.</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-parchment/85 max-w-2xl text-pretty">
              Chef Dee is not just a pitmaster. She is the story, the tradition, and
              the soul behind every dish served. Her journey is rooted in over 100
              years of family history.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Family timeline */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Her Story"
              lead="From a young age, Chef Dee was surrounded by the sounds, smells, and traditions of Southern cooking. These are not recipes pulled from books or trends. They are deeply personal — shaped by culture, family, and time."
            >
              A legacy passed down
              <br />
              through generations.
            </SectionHeading>
          </Reveal>

          <ol className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {generations.map((g, idx) => (
              <Reveal key={g.era} delay={idx * 100}>
                <li className="relative pl-6 border-l-2 border-warmgold pt-2">
                  <span className="block text-firebrick uppercase tracking-[0.18em] text-xs font-bold mb-2">
                    {g.era}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-hickory mb-2">
                    {g.who}
                  </h3>
                  <p className="text-hickory/75 text-base leading-relaxed">
                    {g.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* From healing to feeding */}
      <section className="bg-parchment-grain text-hickory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Purpose" align="center">
              From healing people
              <br />
              to feeding them.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 prose prose-lg max-w-none text-hickory/85 leading-relaxed">
              <p className="text-lg sm:text-xl">
                Before becoming a full-time chef, Chef Dee dedicated her life to
                helping others as a registered nurse. Her purpose has always been
                the same: <strong>to care for people.</strong>
              </p>
              <p className="text-lg sm:text-xl mt-6">
                Today she continues that mission through food — bringing people
                together, creating moments, delivering comfort, joy, and connection
                through every meal she serves.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Award */}
      <section className="bg-charcoal text-parchment py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <Award className="size-16 text-warmgold mx-auto mb-6" aria-hidden />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Award + Authority"
              tone="light"
              align="center"
            >
              Award-winning flavor
              <br />
              recognized on a national stage.
            </SectionHeading>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 prose prose-invert prose-lg max-w-none text-parchment/85 leading-relaxed text-left sm:text-center">
              <p className="text-lg sm:text-xl">
                During Super Bowl weekend in Las Vegas, Chef Dee competed in the
                Souper Bowl of Cooking — a charitable culinary event featuring top
                chefs, athletes, and industry experts.
              </p>
              <p className="text-2xl sm:text-3xl font-display text-warmgold mt-6">
                Her gumbo took first place.
              </p>
              <p className="text-lg sm:text-xl mt-6">
                Judges and attendees described it as one of the most authentic and
                flavorful dishes they had ever experienced. This is the level of
                quality and care she brings to every event.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What makes her different */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="A unique voice in BBQ">
              Tradition, authenticity,
              <br />
              and a perspective rarely heard.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 prose prose-lg max-w-none text-hickory/85 leading-relaxed">
              <p className="text-lg sm:text-xl">
                Chef Dee stands out in more ways than one. She brings a rare and
                powerful perspective to the world of BBQ — a space traditionally
                dominated by others. Her approach blends tradition with authenticity,
                honoring her roots while delivering bold, unforgettable flavor.
              </p>
              <p className="text-lg sm:text-xl mt-6">
                This is not just BBQ. This is culture, history, and identity brought
                to life through food.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Food philosophy */}
      <section className="bg-charcoal text-parchment py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="The Philosophy" tone="light">
              Real BBQ. No shortcuts.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 text-base sm:text-lg">
              {[
                "Slow-smoked meats — 16 to 18 hours",
                "Bold seasoning, made from scratch",
                "Authentic Southern, Creole, and Cajun influence",
                "Fresh, high-quality ingredients only",
                "Custom menus tailored to your event",
                "Same care for backyard or ballroom",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 p-4 rounded-md bg-hickory/30 border border-parchment/10"
                >
                  <span className="text-warmgold font-display flex-shrink-0">→</span>
                  <span className="text-parchment/90">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <SectionHeading eyebrow="Ready?" align="center">
              Let&apos;s bring this experience
              <br />
              to your event.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CtaButton href="/request-a-quote" variant="primary" size="lg">
                Request a Quote
              </CtaButton>
              <PhoneLink source="cta-band" variant="inline" />
            </div>
            <p className="mt-6 text-sm text-hickory/60">
              Want to talk through a unique vision?{" "}
              <Link href="/contact" className="underline hover:text-firebrick">
                Contact us directly
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
