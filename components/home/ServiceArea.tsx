import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceAreaMap } from "@/components/home/ServiceAreaMap";

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
      className="bg-parchment text-hickory pt-8 pb-24 md:pt-12 md:pb-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Subgrid so both headings share a row and the map + steps start at the
            same Y on desktop, despite the headings wrapping to different heights. */}
        <div className="grid gap-x-12 md:gap-x-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-8">
          {/* Service area */}
          <div className="lg:row-span-2 lg:grid lg:grid-rows-subgrid">
            <Reveal>
              <SectionHeading>
                Serving Las Vegas
                <br />
                and surrounding areas.
              </SectionHeading>
            </Reveal>

            <div className="mt-8 lg:mt-0">
              <ServiceAreaMap />
            </div>
          </div>

          {/* How it works */}
          <div className="mt-16 lg:mt-0 lg:row-span-2 lg:grid lg:grid-rows-subgrid">
            <Reveal>
              <SectionHeading>
                Simple. Fast.
                <br />
                Stress-free catering.
              </SectionHeading>
            </Reveal>

            <ol className="mt-8 lg:mt-0 flex flex-col">
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
