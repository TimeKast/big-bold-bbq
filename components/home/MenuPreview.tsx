import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";
import { VideoLoop } from "@/components/shared/VideoLoop";
import type { MenuItemDisplay, MenuPreviewData } from "@/lib/menu";
import { ArrowRight } from "lucide-react";

/**
 * Acto 5 - Menu Preview. Names/descriptions come from Payload when CMS menu
 * items are featured, with the original static content as a production fallback.
 * Every tile + list row links to the full /menu page (client request 2026-05-30).
 */

const fallbackFeatureMedia = [
  {
    src: "/video/v3-brisket.mp4",
    poster: "/video/v3-brisket-poster.jpg",
    alt: "Smoked brisket resting in drifting smoke",
    fade: 0,
  },
  {
    src: "/video/v4-pulled-pork.mp4",
    poster: "/video/v4-pulled-pork-poster.jpg",
    alt: "Smoked pulled pork resting with steam rising",
    fade: 0,
  },
  {
    src: "/video/v5-ribs.mp4",
    poster: "/video/v5-ribs-poster.jpg",
    alt: "Glazed smoked ribs with backlit smoke drifting",
    fade: 0,
  },
  {
    src: "/video/v6-mac.mp4",
    poster: "/video/v6-mac-poster.jpg",
    alt: "Three-cheese mac and cheese bubbling in a cast-iron skillet",
    fade: 0,
  },
] as const;

type FeatureMedia = (typeof fallbackFeatureMedia)[number];

function FeatureBackdrop({
  item,
  media,
}: {
  item: MenuItemDisplay;
  media?: FeatureMedia;
}) {
  if (item.image) {
    return (
      <Image
        src={item.image.url}
        alt={item.image.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
    );
  }

  if (media) {
    return (
      <VideoLoop
        src={media.src}
        poster={media.poster}
        ariaLabel={media.alt}
        decorative
        playWhenVisible
        className="absolute inset-0"
        loopFadeMs={media.fade}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-hickory px-6 text-center font-display text-2xl text-parchment/60">
      Big Bold BBQ
    </div>
  );
}

export function MenuPreview({ data }: { data: MenuPreviewData }) {
  const [heroItem, ...tileItems] = data.featuredItems;
  const isFallback = data.source === "fallback";

  if (!heroItem) {
    return null;
  }

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

        {/* Feature tile links to /menu */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[2fr_3fr] items-stretch max-w-5xl">
            <Link
              href="/menu"
              aria-label={`${heroItem.name} - view the full menu`}
              className="group aspect-square rounded-2xl overflow-hidden bg-charcoal relative shadow-2xl focus-visible:outline-2 focus-visible:outline-warmgold focus-visible:outline-offset-2"
            >
              <FeatureBackdrop item={heroItem} media={isFallback ? fallbackFeatureMedia[0] : undefined} />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none transition-colors duration-300 group-hover:bg-firebrick/10"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(43,30,22,0.85) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 text-parchment">
                {heroItem.tag ? (
                  <p className="text-warmgold uppercase tracking-[0.2em] text-[10px] font-bold">
                    {heroItem.tag}
                  </p>
                ) : null}
                <p className="font-display text-2xl md:text-3xl mt-1">
                  {heroItem.name}
                </p>
                <p className="text-parchment/80 text-sm mt-1">
                  {heroItem.homeSummary || heroItem.description}
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

        {/* Featured tiles link to /menu */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {tileItems.slice(0, 3).map((item, idx) => (
            <Reveal key={item.id} delay={idx * 80}>
              <Link
                href="/menu"
                aria-label={`${item.name} - view the full menu`}
                className="group block aspect-square rounded-xl overflow-hidden bg-charcoal relative shadow-lg focus-visible:outline-2 focus-visible:outline-warmgold focus-visible:outline-offset-2"
              >
                <FeatureBackdrop
                  item={item}
                  media={isFallback ? fallbackFeatureMedia[idx + 1] : undefined}
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
                  {item.tag ? (
                    <p className="text-warmgold uppercase tracking-[0.2em] text-[10px] font-bold">
                      {item.tag}
                    </p>
                  ) : null}
                  <p className="font-display text-lg sm:text-xl mt-1 text-balance">
                    {item.name}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Text-list highlights → each row links to /menu */}
        <div className="mt-16 grid gap-px bg-hickory/15 max-w-4xl border border-hickory/15 rounded-lg overflow-hidden">
          {data.listItems.map((item, idx) => (
            <Reveal key={item.name} delay={idx * 50}>
              <Link
                href="/menu"
                className="block bg-parchment p-6 sm:p-8 hover:bg-parchment-grain transition-colors group focus-visible:outline-2 focus-visible:outline-warmgold focus-visible:-outline-offset-2"
              >
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-hickory group-hover:text-firebrick transition-colors">
                  {item.name}
                </h3>
                <p className="text-hickory/70 text-sm sm:text-base mt-1 max-w-xl">
                  {item.note}
                </p>
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
