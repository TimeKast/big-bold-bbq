import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MapPin } from "lucide-react";
import { site } from "@/lib/site";

const steps = [
  { n: "01", title: "Call or request a quote", body: "Tell us your event basics. We respond same-day." },
  { n: "02", title: "We customize your menu", body: "Built around guest count, preferences, and service style." },
  { n: "03", title: "Confirm your date", body: "Secure with a 50% deposit. Final balance due 24h before." },
  { n: "04", title: "You enjoy unforgettable BBQ", body: "We handle the rest. Smoke. Serve. Clean up. Done right." },
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
              <SectionHeading eyebrow="Service Area">
                Serving Las Vegas
                <br />
                and surrounding areas.
              </SectionHeading>
            </Reveal>

            <Reveal delay={120}>
              {/* SVG illustrated map placeholder — Mapbox swap in M3 */}
              <div className="mt-8 relative aspect-[4/3] rounded-xl bg-hickory/5 border border-hickory/15 overflow-hidden">
                <svg
                  viewBox="0 0 400 300"
                  className="absolute inset-0 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  {/* Grid bg */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgba(58,42,30,0.08)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="400" height="300" fill="url(#grid)" />

                  {/* Service radius circle */}
                  <circle
                    cx="200"
                    cy="150"
                    r="120"
                    fill="rgba(158,47,35,0.12)"
                    stroke="rgba(158,47,35,0.5)"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />

                  {/* Center pin (Las Vegas) */}
                  <circle cx="200" cy="150" r="10" fill="#9E2F23" />
                  <circle cx="200" cy="150" r="5" fill="#F4E6CF" />

                  {/* Surrounding city pins */}
                  {[
                    { x: 235, y: 175, label: "Henderson" },
                    { x: 165, y: 130, label: "Summerlin" },
                    { x: 220, y: 110, label: "North LV" },
                    { x: 280, y: 200, label: "Boulder City" },
                  ].map((c) => (
                    <g key={c.label}>
                      <circle cx={c.x} cy={c.y} r="6" fill="#D6A25A" />
                      <circle cx={c.x} cy={c.y} r="2.5" fill="#3A2A1E" />
                    </g>
                  ))}

                  {/* Labels */}
                  <text
                    x="200"
                    y="138"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="#3A2A1E"
                    fontFamily="serif"
                  >
                    LAS VEGAS
                  </text>
                </svg>

                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-parchment/95 border border-hickory/15 text-xs text-hickory/65 font-medium uppercase tracking-wider">
                  50-mile radius
                </div>
              </div>
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
              <SectionHeading eyebrow="How It Works">
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
