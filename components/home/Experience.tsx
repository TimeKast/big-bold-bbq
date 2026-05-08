import { Reveal } from "@/components/shared/Reveal";
import { Play } from "lucide-react";

/**
 * Acto 4 — Experience video montage.
 * V1: video poster placeholder. Real Seedance loops integrated in M3.
 */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="bg-parchment text-hickory py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="text-firebrick uppercase tracking-[0.2em] text-sm font-bold mb-4">
            Experience the Flavor
          </p>
          <h2
            id="experience-title"
            className="font-display text-5xl sm:text-6xl md:text-7xl text-balance max-w-4xl"
          >
            What it feels like at a Chef Dee event.
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-hickory/85 max-w-2xl">
            Smoke rolling. Plates landing. Conversation quiet for one second. This
            is more than catering — it is fire, smoke, tradition, and flavor brought
            to life.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 relative rounded-2xl overflow-hidden bg-charcoal aspect-[16/9] shadow-2xl group">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(214,162,90,0.32) 0%, rgba(158,47,35,0.18) 30%, rgba(43,30,22,1) 70%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-25 mix-blend-screen"
              style={{
                background:
                  "radial-gradient(circle at 30% 70%, rgba(244,230,207,0.4) 0%, transparent 25%), radial-gradient(circle at 70% 30%, rgba(244,230,207,0.3) 0%, transparent 30%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                className="size-20 sm:size-24 rounded-full bg-firebrick text-parchment flex items-center justify-center hover:scale-105 transition-transform shadow-2xl group-hover:bg-warmgold group-hover:text-charcoal"
                aria-label="Play experience video — coming soon"
              >
                <Play className="size-8 sm:size-10 ml-1" aria-hidden fill="currentColor" />
              </button>
            </div>
            <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 text-parchment">
              <p className="font-display text-xl sm:text-2xl md:text-3xl text-balance">
                Watch the smoke roll. Hear the bark crack.
              </p>
              <p className="text-sm sm:text-base text-parchment/65 mt-2">
                Cinematic montage — coming soon.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
