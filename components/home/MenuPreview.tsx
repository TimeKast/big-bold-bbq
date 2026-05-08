import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";
import { VideoLoop } from "@/components/shared/VideoLoop";
import { ArrowRight } from "lucide-react";

/**
 * Acto 5 — Menu Preview. Items pulled directly from PDF.
 * V1: typographic editorial menu. Hover-play macros come in M3 with Seedance.
 */
const items = [
  {
    name: "Slow-Smoked Brisket",
    note: "16 to 18-hour cook over hickory. Pink smoke ring. Bark you can feel.",
  },
  {
    name: "Fall-Off-The-Bone Ribs",
    note: "Cherry-wood smoked. Glazed in our house mop sauce.",
  },
  {
    name: "Smoked Leg Quarters",
    note: "Brined overnight, smoked low until the skin sings.",
  },
  {
    name: "Dirty Rice",
    note: "Holy trinity. Andouille. Chicken livers. Real Cajun.",
  },
  {
    name: "Creamy Mac and Cheese",
    note: "Three cheeses, baked golden, finished under the salamander.",
  },
  {
    name: "50/51 Potato Salad",
    note: "Family recipe — half mayo, half mustard, all heart.",
  },
  {
    name: "Gala Apple Coleslaw",
    note: "Gala apples, fresh cabbage, a touch of honey vinegar.",
  },
] as const;

export function MenuPreview() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="bg-parchment-grain text-hickory py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="The Menu"
            lead="Pulled from a hundred years of family kitchens. Cooked the way it should be cooked."
          >
            Authentic Southern BBQ with
            <br />
            a Creole and Cajun soul.
          </SectionHeading>
        </Reveal>

        {/* V3 brisket feature tile */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[2fr_3fr] items-stretch max-w-5xl">
            <div className="aspect-square rounded-2xl overflow-hidden bg-charcoal relative shadow-2xl">
              <VideoLoop
                src="/video/v3-brisket.mp4"
                poster="/video/v3-brisket-poster.jpg"
                ariaLabel="Smoked brisket being sliced — pink smoke ring and juices"
                className="absolute inset-0"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(43,30,22,0.85) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 text-parchment">
                <p className="text-warmgold uppercase tracking-[0.2em] text-[10px] font-bold">
                  Signature
                </p>
                <p className="font-display text-2xl md:text-3xl mt-1">
                  Slow-Smoked Brisket
                </p>
                <p className="text-parchment/80 text-sm mt-1">
                  16–18 hours over hickory.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-display text-2xl md:text-3xl text-hickory text-balance">
                Bark you can feel.
                <br />
                Pink smoke ring you can see.
              </p>
              <p className="mt-4 text-base md:text-lg text-hickory/80 max-w-xl">
                Every brisket sits on the pit overnight. We trim by hand, season
                with our family rub, and let hickory do the work. By morning,
                it&apos;s tender enough to pull apart with a fork — but you&apos;ll want
                a knife so you can see the smoke ring.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px bg-hickory/15 max-w-4xl border border-hickory/15 rounded-lg overflow-hidden">
          {items.map((item, idx) => (
            <Reveal key={item.name} delay={idx * 50}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 bg-parchment p-6 sm:p-8 hover:bg-parchment-grain transition-colors group">
                <div className="flex-1">
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-hickory">
                    {item.name}
                  </h3>
                  <p className="text-hickory/70 text-sm sm:text-base mt-1 max-w-xl">
                    {item.note}
                  </p>
                </div>
                <span className="text-warmgold font-display text-sm sm:text-base whitespace-nowrap font-bold tracking-widest">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <CtaButton href="/contact" variant="primary" size="lg">
              Customize Your Menu
              <ArrowRight className="size-5" aria-hidden />
            </CtaButton>
            <p className="text-hickory/65 text-sm">
              Every menu is built around your guest count, preferences, and service style.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
