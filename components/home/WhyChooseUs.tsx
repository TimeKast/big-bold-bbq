import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

/**
 * Acto 6 — Why Choose Us.
 * Pillars distilled from PDF "What Makes Different" + brand differentiators.
 */
const pillars = [
  {
    n: "01",
    title: "Smoked low and slow.",
    body: "16-18 hour briskets. No shortcuts. The smoke ring is real.",
  },
  {
    n: "02",
    title: "Recipes from three states.",
    body: "Texas. Louisiana. Mississippi Delta. Passed down for over 100 years.",
  },
  {
    n: "03",
    title: "Award-winning pitmaster.",
    body: "First place at the Souper Bowl of Cooking — Super Bowl weekend.",
  },
  {
    n: "04",
    title: "You eat what we'd serve our family.",
    body: "Same plates. Same care. Same pride. Every event.",
  },
] as const;

export function WhyChooseUs() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="bg-charcoal text-parchment py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            tone="light"
            lead="Authentic Creole and Cajun influence rarely found in Las Vegas. Custom menus, fast response, real BBQ — backyard to ballroom."
          >
            What Makes Chef Dee&apos;s
            <br />
            Big Bold BBQ Different.
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, idx) => (
            <Reveal key={p.n} delay={idx * 100}>
              <div className="relative pl-6 border-l-2 border-warmgold pt-2">
                <span className="block font-display text-warmgold text-5xl sm:text-6xl mb-4">
                  {p.n}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-parchment mb-3 text-balance">
                  {p.title}
                </h3>
                <p className="text-parchment/75 text-base leading-relaxed">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
