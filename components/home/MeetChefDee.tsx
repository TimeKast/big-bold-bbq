import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Award } from "lucide-react";

/**
 * Acto 2 — Meet Chef Dee.
 * V1: simplified side-by-side (no GSAP pinning yet — that's M3).
 * Three "stops" of copy on the right, portrait placeholder on the left.
 * Real portrait blocked on PENDING.md P0 #4.
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
          <SectionHeading eyebrow="Meet Chef Dee" lead="A rare kind of pitmaster.">
            The story behind every plate.
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16 items-start">
          {/* Portrait placeholder — TBD real photo, see PENDING.md P0 #4 */}
          <Reveal>
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-charcoal relative">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(214,162,90,0.25) 0%, transparent 60%), linear-gradient(180deg, rgba(43,30,22,0.95) 0%, rgba(58,42,30,0.95) 100%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-warmgold/85 text-sm uppercase tracking-[0.2em] font-semibold">
                    Portrait of Chef Dee
                  </p>
                  <p className="text-parchment/55 text-xs mt-2 max-w-xs">
                    Real photo coming once shoot is scheduled. (See PENDING.md)
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Copy stops */}
          <div className="flex flex-col gap-12">
            <Reveal delay={120}>
              <div>
                <p className="text-firebrick uppercase tracking-[0.18em] text-xs font-bold mb-3">
                  Stop 01 · Roots
                </p>
                <h3 className="font-display text-2xl md:text-3xl mb-4 text-balance">
                  Texas-born. Louisiana-raised. Las Vegas hearth.
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-hickory/90">
                  Chef Dee&apos;s family roots stretch across Texas, Louisiana, and the
                  Mississippi Delta. Her recipes carry over 100 years of Southern,
                  Creole, and Cajun tradition — flavors that are not recreated. They
                  are inherited.
                </p>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div>
                <p className="text-firebrick uppercase tracking-[0.18em] text-xs font-bold mb-3">
                  Stop 02 · Purpose
                </p>
                <h3 className="font-display text-2xl md:text-3xl mb-4 text-balance">
                  From healing people to feeding them.
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-hickory/90">
                  Before becoming a full-time chef, Chef Dee served as a registered
                  nurse, dedicating her life to caring for others. Today she
                  continues that mission through food — bringing people together
                  with bold, authentic flavor.
                </p>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="border-l-4 border-warmgold pl-6 py-2 relative">
                <p className="text-firebrick uppercase tracking-[0.18em] text-xs font-bold mb-3">
                  Stop 03 · Authority
                </p>
                <h3 className="font-display text-2xl md:text-3xl mb-4 text-balance flex items-start gap-3">
                  <Award className="size-7 text-warmgold flex-shrink-0 mt-1" aria-hidden />
                  <span>Souper Bowl of Cooking — First Place.</span>
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-hickory/90">
                  Her award-winning gumbo took first place at the Souper Bowl of
                  Cooking during Super Bowl weekend in Las Vegas. Athletes,
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
