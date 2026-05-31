import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";
import { VideoLoop } from "@/components/shared/VideoLoop";
import { featuredMenu } from "@/lib/content/menu";
import { ArrowRight } from "lucide-react";

/**
 * Acto 5 — Menu Preview. Names/descriptions sourced from lib/content/menu.ts.
 * Every tile + list row links to the full /menu page (client request 2026-05-30).
 */

// Supporting text-list highlights — real menu names spanning categories.
const listItems = [
  { name: "Award-Winning Gumbo", note: "Collard green, seafood, or chicken & sausage. First place at the Souper Bowl of Caring." },
  { name: "Jambalaya", note: "Bold Creole rice with chicken, andouille, and the holy trinity. Shrimp or crawfish optional." },
  { name: "Faydean's Creole Dirty Rice", note: "Seasoned pork and chicken, Creole spice, deep Southern flavor." },
  { name: "Jean's Cajun Dirty Cabbage", note: "Cabbage and collards with smoked andouille and Cajun spice." },
  { name: "Big Mama's Smoked Baked Beans", note: "Andouille, smoked pork, Cajun-Creole spice, BBQ glaze." },
  { name: "Big Mama's Peach Cobbler", note: "Slow-baked spiced peaches under a caramelized lattice crust." },
  { name: "Chef Dee's Cheesecake Banana Pudding", note: "Banana cheesecake custard, vanilla wafers, caramel drizzle." },
] as const;

// Macro video tiles (V4/V5/V6) — real names from the menu content.
const macroTiles = [
  {
    src: "/video/v4-pulled-pork.mp4",
    poster: "/video/v4-pulled-pork-poster.jpg",
    alt: "Smoked pulled pork resting with steam rising",
    eyebrow: featuredMenu.pulledPork.tag,
    title: featuredMenu.pulledPork.name,
    short: featuredMenu.pulledPork.short,
    fade: 0, // seamless crossfade loop baked into the file — no JS fade
  },
  {
    src: "/video/v5-ribs.mp4",
    poster: "/video/v5-ribs-poster.jpg",
    alt: "Glazed smoked ribs with backlit smoke drifting",
    eyebrow: featuredMenu.ribs.tag,
    title: featuredMenu.ribs.name,
    short: featuredMenu.ribs.short,
    fade: 0, // seamless crossfade loop baked into the file — no JS fade
  },
  {
    src: "/video/v6-mac.mp4",
    poster: "/video/v6-mac-poster.jpg",
    alt: "Three-cheese mac and cheese bubbling in a cast-iron skillet",
    eyebrow: featuredMenu.mac.tag,
    title: featuredMenu.mac.name,
    short: featuredMenu.mac.short,
    fade: 0, // seamless crossfade loop baked into the file — no JS fade
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
            lead="Pulled from a hundred years of family kitchens. Cooked the way it should be cooked."
          >
            Authentic Southern BBQ with
            <br />
            a Creole and Cajun soul.
          </SectionHeading>
        </Reveal>

        {/* V3 brisket feature tile → links to /menu */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[2fr_3fr] items-stretch max-w-5xl">
            <Link
              href="/menu"
              aria-label={`${featuredMenu.brisket.name} — view the full menu`}
              className="group aspect-square rounded-2xl overflow-hidden bg-charcoal relative shadow-2xl focus-visible:outline-2 focus-visible:outline-warmgold focus-visible:outline-offset-2"
            >
              <VideoLoop
                src="/video/v3-brisket.mp4"
                poster="/video/v3-brisket-poster.jpg"
                ariaLabel="Smoked brisket resting in drifting smoke"
                decorative
                playWhenVisible
                className="absolute inset-0"
                loopFadeMs={0}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none transition-colors duration-300 group-hover:bg-firebrick/10"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(43,30,22,0.85) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 text-parchment">
                <p className="text-warmgold uppercase tracking-[0.2em] text-[10px] font-bold">
                  {featuredMenu.brisket.tag}
                </p>
                <p className="font-display text-2xl md:text-3xl mt-1">
                  {featuredMenu.brisket.name}
                </p>
                <p className="text-parchment/80 text-sm mt-1">
                  {featuredMenu.brisket.short}
                </p>
              </div>
            </Link>
            <div className="flex flex-col justify-center">
              <p className="font-display text-2xl md:text-3xl text-hickory text-balance">
                Bark you can feel.
                <br />
                Pink smoke ring you can see.
              </p>
              <p className="mt-4 text-base md:text-lg text-hickory/80 max-w-xl">
                Every brisket sits on the pit overnight. We trim by hand, season
                with our family rub, and let the smoke do the work. By morning,
                it&apos;s tender enough to pull apart with a fork — but you&apos;ll want
                a knife so you can see the smoke ring.
              </p>
              <Link
                href="/menu"
                className="mt-6 inline-flex items-center gap-2 text-firebrick font-semibold hover:text-warmgold transition-colors w-fit"
              >
                See the full menu
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* V4 / V5 / V6 macro tiles → each links to /menu */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {macroTiles.map((tile, idx) => (
            <Reveal key={tile.title} delay={idx * 80}>
              <Link
                href="/menu"
                aria-label={`${tile.title} — view the full menu`}
                className="group block aspect-square rounded-xl overflow-hidden bg-charcoal relative shadow-lg focus-visible:outline-2 focus-visible:outline-warmgold focus-visible:outline-offset-2"
              >
                <VideoLoop
                  src={tile.src}
                  poster={tile.poster}
                  ariaLabel={tile.alt}
                  decorative
                  playWhenVisible
                  className="absolute inset-0"
                  loopFadeMs={tile.fade}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none transition-colors duration-300 group-hover:bg-firebrick/10"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(43,30,22,0.8) 100%)",
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 text-parchment">
                  <p className="text-warmgold uppercase tracking-[0.2em] text-[10px] font-bold">
                    {tile.eyebrow}
                  </p>
                  <p className="font-display text-lg sm:text-xl mt-1 text-balance">
                    {tile.title}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Text-list highlights → each row links to /menu */}
        <div className="mt-16 grid gap-px bg-hickory/15 max-w-4xl border border-hickory/15 rounded-lg overflow-hidden">
          {listItems.map((item, idx) => (
            <Reveal key={item.name} delay={idx * 50}>
              <Link
                href="/menu"
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 bg-parchment p-6 sm:p-8 hover:bg-parchment-grain transition-colors group focus-visible:outline-2 focus-visible:outline-warmgold focus-visible:-outline-offset-2"
              >
                <div className="flex-1">
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-hickory group-hover:text-firebrick transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-hickory/70 text-sm sm:text-base mt-1 max-w-xl">
                    {item.note}
                  </p>
                </div>
                <span className="text-warmgold font-display text-sm sm:text-base whitespace-nowrap font-bold tracking-widest">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <CtaButton href="/menu" variant="primary" size="lg">
              View Full Menu
              <ArrowRight className="size-5" aria-hidden />
            </CtaButton>
            <CtaButton href="/request-a-quote" variant="secondary" size="lg">
              Customize Your Event
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
