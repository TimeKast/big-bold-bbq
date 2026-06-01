import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { VideoLoop } from "@/components/shared/VideoLoop";
import { JsonLd, breadcrumbSchema, menuSchema } from "@/components/seo/JsonLd";
import { menuIntro, menuClosing } from "@/lib/content/menu";
import { getMenuPageData } from "@/lib/menu";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu — Southern, Creole & Cajun BBQ Catering Las Vegas",
  description:
    "Explore Chef Dee's Big Bold BBQ catering menu: oak-smoked brisket, 3-2-1 ribs, award-winning gumbo, jambalaya, Southern sides, and house desserts. Custom menus for every event.",
  alternates: { canonical: "/menu" },
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const menuData = await getMenuPageData();
  const menu = menuData.categories;

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Menu", url: `${site.url}/menu` },
          ]),
          menuSchema(menu),
        ]}
      />

      {/* Hero (charcoal — dark-top page) */}
      <section className="relative bg-charcoal text-parchment pt-40 pb-20 md:pt-48 overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 70% 30%, rgba(214,162,90,0.16) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 20% 80%, rgba(158,47,35,0.18) 0%, transparent 55%)",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <h1
              className="font-display font-black uppercase leading-[0.98] tracking-[-0.03em] text-balance max-w-5xl"
              style={{ fontSize: "clamp(2.25rem, 7vw, 5.5rem)" }}
            >
              Southern BBQ Catering with a
              <br />
              <span className="text-firebrick">Creole and Cajun Kick.</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-parchment/85 max-w-3xl text-pretty leading-relaxed">
              {menuIntro.body}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <CtaButton href="/request-a-quote" variant="primary" size="lg">
                Call Now for a Fast Quote
              </CtaButton>
              <PhoneLink source="cta-band" variant="ghost" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sticky category jump-nav */}
      <nav
        aria-label="Menu categories"
        className="sticky top-[60px] z-30 bg-parchment/95 backdrop-blur-md border-y border-hickory/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex gap-1 sm:gap-2 overflow-x-auto py-3 no-scrollbar">
            {menu.map((cat) => (
              <li key={cat.id} className="flex-shrink-0">
                <a
                  href={`#${cat.id}`}
                  className="inline-block px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-hickory/75 hover:text-parchment hover:bg-firebrick transition-colors whitespace-nowrap"
                >
                  {cat.title.replace("Beyond the Brisket", "").trim()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Category sections */}
      <div className="bg-parchment text-hickory">
        {menu.map((cat, catIdx) => (
          <section
            key={cat.id}
            id={cat.id}
            aria-labelledby={`${cat.id}-title`}
            className={`scroll-mt-32 py-16 md:py-24 ${catIdx % 2 === 1 ? "bg-parchment-grain" : ""}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <Reveal>
                <div className="flex items-end justify-between gap-4 border-b-2 border-warmgold/40 pb-4 mb-10">
                  <div>
                    <h2
                      id={`${cat.id}-title`}
                      className="font-display text-3xl sm:text-4xl md:text-5xl text-hickory text-balance"
                    >
                      {cat.title}
                    </h2>
                    {cat.blurb ? (
                      <p className="mt-3 max-w-2xl text-base text-hickory/70">
                        {cat.blurb}
                      </p>
                    ) : null}
                  </div>
                  <span className="font-display text-warmgold text-lg sm:text-2xl font-bold tabular-nums hidden sm:block">
                    {String(catIdx + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                {cat.items.map((item, idx) => (
                  <Reveal key={item.name} delay={idx * 40}>
                    <article
                      className={`grid gap-4 border-l-2 border-hickory/10 pl-5 transition-colors hover:border-firebrick ${
                        item.image ? "sm:grid-cols-[132px_1fr]" : ""
                      }`}
                    >
                      {item.image ? (
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-hickory/10 sm:mt-1">
                          <Image
                            src={item.image.url}
                            alt={item.image.alt}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 132px, 35vw"
                          />
                        </div>
                      ) : null}
                      <div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h3 className="font-display text-xl sm:text-2xl text-hickory">
                            {item.name}
                          </h3>
                          {item.tag && (
                            <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-firebrick bg-firebrick/10 px-2 py-0.5 rounded-full">
                              {item.tag}
                            </span>
                          )}
                          {item.note && (
                            <span className="text-xs italic text-hickory/55">{item.note}</span>
                          )}
                        </div>
                        <p className="mt-2 text-base text-hickory/80 leading-relaxed max-w-prose">
                          {item.description}
                        </p>
                        {item.variants.length > 0 && (
                          <ul className="mt-4 flex flex-col gap-3 pl-4 border-l border-warmgold/40">
                            {item.variants.map((v) => (
                              <li key={v.name}>
                                <p className="font-display text-base text-hickory">{v.name}</p>
                                <p className="text-sm text-hickory/70 leading-relaxed">
                                  {v.description}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* One cinematic break after the meats category */}
            {cat.id === "smoked-meats" && (
              <Reveal>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
                  <div className="relative rounded-2xl overflow-hidden bg-charcoal aspect-[21/9] shadow-2xl">
                    <VideoLoop
                      src="/video/v7-fire-desktop.mp4"
                      srcMobile="/video/v7-fire-mobile.mp4"
                      poster="/video/v7-fire-poster.jpg"
                      ariaLabel="Oak fire and embers in a steel firepit"
                      className="absolute inset-0"
                      playWhenVisible
                      loopFadeMs={0}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(43,30,22,0.2) 0%, rgba(43,30,22,0.75) 100%)",
                      }}
                    />
                    <div className="absolute bottom-6 left-6 right-6 sm:left-10 text-parchment">
                      <p className="font-display text-2xl sm:text-3xl md:text-4xl text-balance">
                        <span className="text-firebrick">Real smoke.</span> No shortcuts.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </section>
        ))}
      </div>

      {/* Closing CTA */}
      <section className="bg-charcoal text-parchment py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-balance">
              {menuClosing.title}
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-parchment/85 max-w-2xl mx-auto text-pretty">
              {menuClosing.body}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CtaButton href="/request-a-quote" variant="warmgold" size="lg">
                Request a Quote
              </CtaButton>
              <PhoneLink source="cta-band" variant="ghost" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
