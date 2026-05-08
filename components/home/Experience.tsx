import { Reveal } from "@/components/shared/Reveal";
import { VideoLoop } from "@/components/shared/VideoLoop";

/**
 * Acto 4 — Experience video montage.
 * V2 video: silhouettes + ribs in foreground at evening BBQ event (Seedance 2.0, 8s 1080p).
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
          <div className="mt-12 relative rounded-2xl overflow-hidden bg-charcoal aspect-[16/9] shadow-2xl">
            <VideoLoop
              src="/video/v2-experience-desktop.mp4"
              srcMobile="/video/v2-experience-mobile.mp4"
              poster="/video/v2-experience-poster.jpg"
              ariaLabel="Outdoor evening BBQ event — silhouettes around a table, smoked ribs in foreground"
              className="absolute inset-0"
              loopFadeMs={650}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, rgba(43,30,22,0.35) 75%, rgba(43,30,22,0.85) 100%)",
              }}
            />
            <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 text-parchment">
              <p className="font-display text-xl sm:text-2xl md:text-3xl text-balance">
                Watch the smoke roll. Hear the bark crack.
              </p>
              <p className="text-sm sm:text-base text-parchment/65 mt-2">
                A real evening, real plates, real people.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
