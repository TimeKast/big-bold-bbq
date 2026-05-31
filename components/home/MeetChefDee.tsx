import Image from "next/image";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Award } from "lucide-react";

/**
 * Acto 2 — Meet Chef Dee.
 * Real portrait (hi-res 1122×1402 master from the client deck). Fills the
 * left grid column so it reads at parity with the story stops beside it.
 */
export function MeetChefDee() {
  return (
    <section
      id="meet-chef-dee"
      aria-labelledby="meet-title"
      className="bg-parchment text-hickory py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading lead="A rare kind of pitmaster.">
            The story behind every plate.
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16 items-start">
          {/* Real Chef Dee portrait — fills the column to align with the stops */}
          <Reveal>
            <figure className="w-full md:sticky md:top-28">
              <Image
                src="/photos/chef-dee.jpg"
                alt="Chef Dee in her Big Bold BBQ kitchen, beside fresh-smoked brisket and ribs"
                width={1122}
                height={1402}
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full h-auto rounded-xl shadow-lg shadow-hickory/15"
                priority={false}
              />
              <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-hickory/55 font-semibold">
                Chef Dee · Pitmaster
              </figcaption>
            </figure>
          </Reveal>

          {/* Copy stops */}
          <div className="flex flex-col gap-12">
            <Reveal delay={120}>
              <div>
                <h3 className="font-display text-2xl md:text-3xl mb-4 text-balance">
                  Arizona born. Southern soul. Las Vegas heart.
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-hickory/90">
                  Born and raised in Arizona, Chef Dee comes from a family rooted in
                  Texas and Louisiana — by way of the Mississippi. Her recipes carry
                  over 100 years of Southern, Creole, and Cajun tradition — flavors
                  that are not recreated. They are inherited.
                </p>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div>
                <h3 className="font-display text-2xl md:text-3xl mb-4 text-balance">
                  From healing people to feeding them.
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-hickory/90">
                  Before becoming a full-time chef, Chef Dee served as a licensed
                  nurse, dedicating her life to caring for others. Today she
                  continues that mission through food — bringing people together
                  with bold, authentic flavor.
                </p>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="border-l-4 border-warmgold pl-6 py-2 relative">
                <h3 className="font-display text-2xl md:text-3xl mb-4 text-balance flex items-start gap-3">
                  <Award className="size-7 text-warmgold flex-shrink-0 mt-1" aria-hidden />
                  <span>Souper Bowl of Caring — First Place.</span>
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-hickory/90">
                  Her award-winning gumbo took first place at the Souper Bowl of
                  Caring during Super Bowl weekend in Las Vegas. Athletes,
                  musicians, and culinary experts all agreed: this is the real thing.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
