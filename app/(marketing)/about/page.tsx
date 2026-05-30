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
    "Meet Chef Dee. Five generations of the McCullough family's Southern, Creole, and Cajun cooking — by way of the Mississippi. Award-winning BBQ catering in Las Vegas.",
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
      <section className="relative bg-charcoal text-parchment pt-44 pb-24 md:pt-52 md:pb-32 overflow-hidden">
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
                "linear-gradient(180deg, rgba(43,30,22,0.45) 0%, rgba(43,30,22,0.68) 50%, rgba(43,30,22,0.88) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.42) 100%)",
            }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal>
            <h1
              className="font-display font-black leading-[1.02] tracking-[-0.025em] text-balance"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.25rem)" }}
            >
              A century of tradition, culture,
              <br />
              family, and <span className="text-firebrick">love on a plate.</span>
            </h1>
            <p className="mt-8 text-xl sm:text-2xl text-parchment/85 max-w-3xl text-pretty leading-relaxed">
              At Chef Dee&apos;s Big Bold BBQ, food is more than a meal. It is
              heritage, storytelling, family, and tradition carried forward through
              generations.
            </p>
          </Reveal>
        </div>
      </section>

      {/* A Legacy Passed Down Through Generations + portrait */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid gap-14 lg:grid-cols-[400px_1fr] lg:gap-20 items-start">
            <Reveal>
              <figure className="w-full lg:sticky lg:top-28">
                <Image
                  src="/photos/chef-dee.jpg"
                  alt="Chef Dee in her Big Bold BBQ kitchen, beside fresh-smoked brisket and ribs"
                  width={403}
                  height={504}
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="w-full h-auto rounded-xl shadow-lg shadow-hickory/15"
                />
                <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-hickory/55 font-semibold">
                  Chef Dee · Pitmaster
                </figcaption>
              </figure>
            </Reveal>

            <div>
              <Reveal>
                <SectionHeading>
                  A legacy passed down
                  <br />
                  through generations.
                </SectionHeading>
              </Reveal>
              <Reveal delay={100}>
                <div className="mt-8 space-y-5 text-base md:text-lg text-hickory/85 leading-relaxed max-w-2xl">
                  <p>
                    Our roots run deep across the Mississippi Delta, Louisiana
                    Bayous, and Texas plains, where Southern cooking, Creole flavor,
                    and Cajun soul became part of our family legacy more than 100
                    years ago. What began in the kitchen of Chef Dee&apos;s
                    great-great-grandmother, <strong>Cora Riley McCullough</strong>,
                    has grown into a premier Southern BBQ and catering experience
                    proudly serving Las Vegas and surrounding communities.
                  </p>
                  <p>
                    Every recipe we serve carries the love, culture, and flavor
                    passed down through five generations of the McCullough family.
                    Chef Dee grew up surrounded by the sounds, aromas, and traditions
                    of authentic Southern cooking.
                  </p>
                  <p>
                    The women in her family taught her that food was never simply
                    about eating. Food was how family gathered. How stories were
                    shared. How love was expressed. From her late grandmother{" "}
                    <strong>Robbie Jean</strong> to her great aunt{" "}
                    <strong>Mamie Faydean</strong>, each generation poured wisdom,
                    care, and flavor into the heirloom recipes that continue to
                    define Chef Dee&apos;s Big Bold BBQ today.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <blockquote className="mt-12 border-l-4 border-warmgold pl-6 sm:pl-8">
                  <p className="font-display text-3xl sm:text-4xl text-hickory text-balance leading-tight">
                    &ldquo;By way of the Mississippi.&rdquo;
                  </p>
                  <p className="mt-4 text-base md:text-lg text-hickory/75 max-w-xl leading-relaxed">
                    As her grandmother and great aunt would always say. That phrase
                    represents the journey of their family&apos;s culture and
                    cuisine — from the Mississippi Delta through Louisiana and the
                    great Texas plains to the West Coast, the McCullough family
                    continues to honor and serve the recipes that shaped generations.
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Southern BBQ with a Creole and Cajun Soul */}
      <section className="bg-parchment-grain text-hickory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading>
              Authentic Southern BBQ with
              <br />
              a Creole and Cajun soul.
            </SectionHeading>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 space-y-5 text-base md:text-lg text-hickory/85 leading-relaxed">
              <p>
                Chef Dee&apos;s Big Bold BBQ specializes in authentic Southern BBQ
                catering in Las Vegas with bold Creole and Cajun influence. Every
                dish is crafted using traditional techniques, rich seasoning, slow
                smoking, and recipes refined through generations of family tradition.
              </p>
              <p>
                From oak-smoked brisket and tender baby back ribs to award-winning
                gumbo and classic Southern sides, every plate is designed to deliver
                unforgettable flavor and authentic Southern hospitality. Throughout
                Las Vegas, Henderson, Summerlin, North Las Vegas, Boulder City, and
                surrounding areas, we proudly serve:
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-3 text-hickory/90">
                  <span className="text-firebrick font-display flex-shrink-0">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* More Than a Chef. A Purpose-Driven Pitmaster. */}
      <section className="bg-parchment text-hickory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <SectionHeading>
              More than a chef.
              <br />
              A purpose-driven pitmaster.
            </SectionHeading>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 space-y-6 text-lg sm:text-xl text-hickory/85 leading-relaxed">
              <p>
                Before becoming a full-time chef and pitmaster, Chef Dee dedicated
                her life to helping others as a registered nurse. Her purpose has
                always remained the same: <strong>to care for people.</strong> Today,
                she continues that mission through food.
              </p>
              <p>
                Every event is approached with the same level of heart, service, and
                dedication that has guided her throughout her life.
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

      {/* Award-Winning Southern Flavor */}
      <section className="bg-charcoal text-parchment py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <Award className="size-14 text-warmgold mx-auto mb-8" strokeWidth={1.5} aria-hidden />
          </Reveal>
          <Reveal delay={80}>
            <SectionHeading tone="light" align="center">
              Award-winning Southern flavor.
            </SectionHeading>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-8 space-y-6 text-lg sm:text-xl text-parchment/85 leading-relaxed max-w-3xl mx-auto">
              <p>
                Chef Dee&apos;s passion and authenticity have earned national
                recognition. During Super Bowl weekend in Las Vegas, she won the
                Souper Bowl of Cooking, an NFL charitable culinary competition
                featuring athletes, musicians, culinary professionals, and celebrity
                guests.
              </p>
              <p className="font-display text-2xl sm:text-3xl text-warmgold">
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
            <SectionHeading>Real BBQ. No shortcuts.</SectionHeading>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 text-base md:text-lg text-hickory/85 leading-relaxed">
              At Chef Dee&apos;s Big Bold BBQ, we believe authentic Southern cuisine
              should be done the right way.
            </p>
            <ul className="mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 text-base sm:text-lg">
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
            <p className="mt-8 text-base md:text-lg text-hickory/80 max-w-2xl leading-relaxed">
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
            <SectionHeading tone="light" align="center">
              Let&apos;s bring Southern tradition
              <br />
              to your event.
            </SectionHeading>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-lg sm:text-xl text-parchment/85 max-w-2xl mx-auto text-pretty">
              Whether you are planning a wedding, corporate event, private party, or
              community celebration, we&apos;re ready to bring authentic Southern,
              Creole, and Cajun flavor to your table.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CtaButton href="/request-a-quote" variant="warmgold" size="lg">
                Request a Quote
              </CtaButton>
              <PhoneLink source="cta-band" variant="ghost" />
            </div>
            <p className="mt-6 text-sm text-parchment/60">
              Prefer to talk it through?{" "}
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
