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
              {/* Stylized illustrated map of the Las Vegas valley */}
              <div className="mt-8 relative aspect-[4/3] rounded-xl bg-parchment-grain border border-hickory/15 overflow-hidden">
                <svg
                  viewBox="0 0 400 320"
                  className="absolute inset-0 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Map of the Las Vegas valley showing our service area across Las Vegas, North Las Vegas, Summerlin, Henderson, and Boulder City."
                >
                  <defs>
                    <radialGradient id="valley" cx="48%" cy="48%" r="62%">
                      <stop offset="0%" stopColor="#F7ECD8" />
                      <stop offset="100%" stopColor="#EDDFC4" />
                    </radialGradient>
                  </defs>

                  {/* Valley floor */}
                  <rect width="400" height="320" fill="url(#valley)" />

                  {/* Mountain ridges around the valley (the bowl) */}
                  <g fill="none" stroke="rgba(58,42,30,0.22)" strokeWidth="1.4" strokeLinejoin="round">
                    <path d="M0,54 L36,40 L70,53 L104,38 L150,52 L196,36 L240,50 L286,35 L330,51 L368,39 L400,53" />
                    <path d="M0,70 L34,58 L66,69 L100,55" opacity="0.6" />
                    <path d="M24,64 L40,104 L26,146 L46,192 L30,238 L44,286" />
                    <path d="M378,58 L362,108 L380,150 L360,202 L376,250" />
                    <path d="M150,300 L196,288 L242,300 L290,286 L330,300" opacity="0.5" />
                  </g>

                  {/* Lake Mead (southeast) */}
                  <path
                    d="M350,238 q22,-6 30,10 q8,18 -10,30 q-20,12 -34,2 q-12,-10 -2,-26 q6,-12 16,-16 z"
                    fill="rgba(96,128,150,0.32)"
                    stroke="rgba(96,128,150,0.5)"
                    strokeWidth="1"
                  />
                  <text x="364" y="284" textAnchor="middle" fontSize="7.5" fill="rgba(58,42,30,0.5)" fontStyle="italic">Lake Mead</text>

                  {/* Highways */}
                  <g fill="none" stroke="rgba(214,162,90,0.7)" strokeWidth="2.2" strokeLinecap="round">
                    {/* I-15 (NE to SW through the Strip) */}
                    <path d="M372,28 Q260,118 196,156 Q120,200 30,300" />
                    {/* US-95 (NW to SE) */}
                    <path d="M22,72 Q130,132 196,156 Q268,182 348,250" strokeWidth="1.8" stroke="rgba(214,162,90,0.5)" />
                    {/* I-215 beltway (south loop) */}
                    <path d="M96,180 Q120,258 200,272 Q288,266 308,206" strokeWidth="1.8" stroke="rgba(214,162,90,0.5)" />
                  </g>
                  {/* Highway shields */}
                  <g fontSize="7" fontWeight="700" fill="#9E2F23" textAnchor="middle">
                    <text x="300" y="78">15</text>
                    <text x="120" y="250">215</text>
                    <text x="64" y="104">95</text>
                  </g>

                  {/* Service radius */}
                  <circle cx="196" cy="156" r="118" fill="rgba(158,47,35,0.07)" stroke="rgba(158,47,35,0.45)" strokeWidth="1.5" strokeDasharray="5 5" />

                  {/* Secondary cities */}
                  {([
                    { x: 214, y: 78, label: "North Las Vegas", anchor: "middle", dx: 0, dy: -8 },
                    { x: 102, y: 132, label: "Summerlin", anchor: "end", dx: -8, dy: 4 },
                    { x: 268, y: 214, label: "Henderson", anchor: "start", dx: 9, dy: 4 },
                    { x: 322, y: 248, label: "Boulder City", anchor: "start", dx: 9, dy: 4 },
                  ] as const).map((c) => (
                    <g key={c.label}>
                      <circle cx={c.x} cy={c.y} r="4.5" fill="#D6A25A" stroke="#3A2A1E" strokeWidth="1" />
                      <text
                        x={c.x + c.dx}
                        y={c.y + c.dy}
                        textAnchor={c.anchor}
                        fontSize="9"
                        fill="#3A2A1E"
                        fontFamily="Georgia, serif"
                        fontWeight="600"
                      >
                        {c.label}
                      </text>
                    </g>
                  ))}

                  {/* Las Vegas (center) */}
                  <circle cx="196" cy="156" r="8.5" fill="#9E2F23" />
                  <circle cx="196" cy="156" r="3.5" fill="#F4E6CF" />
                  <text x="196" y="142" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3A2A1E" fontFamily="Georgia, serif">
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
