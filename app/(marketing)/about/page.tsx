import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { VideoLoop } from "@/components/shared/VideoLoop";
import { Award } from "lucide-react";
import { JsonLd, breadcrumbSchema, personSchema } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Chef Dee — Award-Winning BBQ Pitmaster Las Vegas",
  description:
    "Meet Chef Dee, the award-winning pitmaster behind Big Bold BBQ. Five generations of the McCullough family's Southern, Creole, and Cajun cooking — by way of the Mississippi.",
  alternates: { canonical: "/about" },
};

const services = [
  "Corporate catering",
  "Wedding catering",
  "Private events",
  "Community gatherings",
  "Live on-site BBQ experiences",
];

const philosophy = [
  "Slow-smoked meats",
  "Bold seasoning",
  "Traditional techniques",
  "Fresh ingredients",
  "Generational recipes",
  "No shortcuts",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "About", url: `${site.url}/about` },
          ]),
          personSchema(),
        ]}
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
              style={{ fontSize: "clamp(2.25rem, 7.5vw, 6rem)" }}
            >
              A century of tradition,
              <br />
              <span className="text-firebrick">family, and love on a plate.</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-parchment/85 max-w-3xl text-pretty">
              At Chef Dee&apos;s Big Bold BBQ, food is more than a meal. It is heritage,
              storytelling, family, and tradition carried forward through generations.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Roots + portrait */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid gap-12 md:gap-16 lg:grid-cols-[360px_1fr] items-start">
            <Reveal>
              <figure className="w-full lg:max-w-[360px] lg:mx-0">
                <Image
                  src="/photos/chef-dee.jpg"
                  alt="Chef Dee in her Big Bold BBQ kitchen, beside fresh-smoked brisket and ribs"
                  width={478}
                  height={540}
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="w-full h-auto rounded-xl shadow-lg shadow-hickory/15"
                />
                <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-hickory/55 font-semibold">
                  Chef Dee · Pitmaster
                </figcaption>
              </figure>
            </Reveal>

            <div>
              <Reveal>
                <SectionHeading eyebrow="Her Story">
                  A legacy passed down
                  <br />
                  through generations.
                </SectionHeading>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-8 space-y-5 text-base md:text-lg text-hickory/85 leading-relaxed max-w-2xl">
                  <p>
                    Our roots run deep across the Mississippi Delta, Louisiana
                    Bayous, and Texas plains, where Southern cooking, Creole flavor,
                    and Cajun soul became part of our family legacy more than 100
                    years ago. What began in the kitchen of Chef Dee&apos;s
                    great-great-grandmother, <strong>Cora Riley McCullough</strong>,
                    has grown into a premier Southern BBQ and catering experience
                    serving Las Vegas and surrounding communities.
                  </p>
                  <p>
                    The women in her family taught her that food was never simply
                    about eating. Food was how family gathered. How stories were
                    shared. How love was expressed. From her late grandmother{" "}
                    <strong>Robbie Jean</strong> to her great aunt{" "}
                    <strong>Mamie Faydean</strong>, each generation poured wisdom,
                    care, and flavor into the heirloom recipes that continue to define
                    Chef Dee&apos;s Big Bold BBQ today.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={220}>
                <blockquote className="mt-10 border-l-4 border-warmgold pl-6">
                  <p className="font-display text-2xl md:text-3xl text-hickory text-balance">
                    &ldquo;By way of the Mississippi.&rdquo;
                  </p>
                  <p className="mt-3 text-base text-hickory/75 max-w-xl">
                    That phrase represents the journey of their family&apos;s culture
                    and cuisine — from the Mississippi Delta through Louisiana and the
                    great Texas plains to the West Coast, the McCullough family
                    continues to honor and serve the recipes that shaped generations.
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Southern soul + services */}
      <section className="bg-parchment-grain text-hickory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              lead="Every dish is crafted using traditional techniques, rich seasoning, slow smoking, and recipes refined through generations of family tradition."
            >
              Authentic Southern BBQ with
              <br />
              a Creole and Cajun soul.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-base md:text-lg text-hickory/85 leading-relaxed">
              From oak-smoked brisket and tender baby back ribs to award-winning
              gumbo and classic Southern sides, every plate is designed to deliver
              unforgettable flavor and authentic Southern hospitality. Throughout Las
              Vegas, Henderson, Summerlin, North Las Vegas, Boulder City, and
              surrounding areas, we proudly serve:
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-3 text-hickory/85">
                  <span className="text-firebrick font-display flex-shrink-0">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Purpose */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Purpose">
              More than a chef.
              <br />
              A purpose-driven pitmaster.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 space-y-6 text-lg sm:text-xl text-hickory/85 leading-relaxed">
              <p>
                Before becoming a full-time chef and pitmaster, Chef Dee dedicated
                her life to helping others as a registered nurse. Her purpose has
                always remained the same: <strong>to care for people.</strong> Today,
                she continues that mission through food.
              </p>
              <p>
                As one of the few African American and Native American female
                pitmasters in the industry, Chef Dee brings a rare and authentic
                perspective to Southern BBQ while honoring the generations who came
                before her.
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
            <SectionHeading eyebrow="Award + Authority" tone="light" align="center">
              Award-winning Southern flavor.
            </SectionHeading>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 space-y-6 text-lg sm:text-xl text-parchment/85 leading-relaxed text-left sm:text-center max-w-3xl mx-auto">
              <p>
                During Super Bowl weekend in Las Vegas, Chef Dee won the Souper Bowl
                of Cooking, an NFL charitable culinary competition featuring athletes,
                musicians, culinary professionals, and celebrity guests.
              </p>
              <p className="text-2xl sm:text-3xl font-display text-warmgold">
                Her gumbo was recognized as one of the most authentic and flavorful
                dishes of the event.
              </p>
              <p>
                That same level of care, flavor, and authenticity is brought to every
                event we cater.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Real BBQ. No Shortcuts. */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="The Philosophy">
              Real BBQ. No shortcuts.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 text-base sm:text-lg">
              {philosophy.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 p-4 rounded-md bg-parchment-grain border border-hickory/15"
                >
                  <span className="text-firebrick font-display flex-shrink-0">→</span>
                  <span className="text-hickory/90">{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base md:text-lg text-hickory/80 max-w-2xl">
              From backyard gatherings to upscale events, our mission is simple: to
              serve bold, unforgettable Southern BBQ with authenticity, heart, and
              family tradition in every bite.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-parchment py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <SectionHeading eyebrow="Ready?" tone="light" align="center">
              Let&apos;s bring Southern tradition
              <br />
              to your event.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CtaButton href="/request-a-quote" variant="warmgold" size="lg">
                Request a Quote
              </CtaButton>
              <PhoneLink source="cta-band" variant="ghost" />
            </div>
            <p className="mt-6 text-sm text-parchment/60">
              Want to talk through a unique vision?{" "}
              <Link href="/contact" className="underline hover:text-warmgold">
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
