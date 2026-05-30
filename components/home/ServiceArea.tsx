import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MapPin } from "lucide-react";
import { site } from "@/lib/site";

const steps = [
  { n: "01", title: "Call or request a quote", body: "Tell us your event basics. We respond same-day." },
  { n: "02", title: "We customize your menu", body: "Built around guest count, preferences, and service style." },
  { n: "03", title: "Confirm your date", body: "Secure with a 50% deposit. Final balance due 24 hrs before your event." },
  { n: "04", title: "You enjoy unforgettable BBQ", body: "Smoke. Deliver. Satisfaction." },
] as const;

export function ServiceArea() {
  return (
    <section
      id="service-area"
      aria-labelledby="area-title"
      className="bg-parchment text-hickory py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-2">
          {/* Service area */}
          <div>
            <Reveal>
              <SectionHeading>
                Serving Las Vegas
                <br />
                and surrounding areas.
              </SectionHeading>
            </Reveal>

            <Reveal delay={120}>
              {/* Live Google map of the Las Vegas valley service area */}
              <figure className="mt-8">
                <div className="relative aspect-[4/3] rounded-xl border border-hickory/15 overflow-hidden shadow-sm">
                  <iframe
                    title="Map of the Las Vegas valley — Big Bold BBQ catering service area covering Las Vegas, North Las Vegas, Summerlin, Henderson, and Boulder City."
                    src="https://www.google.com/maps?q=Las+Vegas,+Nevada&z=10&output=embed"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <figcaption className="mt-3 flex items-center gap-2 text-xs text-hickory/60 font-medium uppercase tracking-wider">
                  <MapPin className="size-3.5 text-firebrick flex-shrink-0" aria-hidden />
                  We travel roughly 50 miles from the Las Vegas Strip
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={220}>
              <ul className="mt-8 grid grid-cols-2 gap-3">
                {site.cities.map((city) => (
                  <li
                    key={city}
                    className="flex items-center gap-2 text-hickory/85"
                  >
                    <MapPin className="size-4 text-firebrick flex-shrink-0" aria-hidden />
                    <span>{city}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* How it works */}
          <div>
            <Reveal>
              <SectionHeading>
                Simple. Fast.
                <br />
                Stress-free catering.
              </SectionHeading>
            </Reveal>

            <ol className="mt-8 flex flex-col">
              {steps.map((s, idx) => (
                <Reveal key={s.n} delay={idx * 100}>
                  <li
                    className={`flex gap-6 py-6 ${idx < steps.length - 1 ? "border-b border-hickory/15" : ""}`}
                  >
                    <span className="font-display text-4xl text-warmgold flex-shrink-0 leading-none">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-hickory mb-1">
                        {s.title}
                      </h3>
                      <p className="text-hickory/75 text-base leading-relaxed">
                        {s.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
