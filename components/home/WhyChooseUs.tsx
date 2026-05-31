import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Flame, Map, Award, Heart } from "lucide-react";

/**
 * Acto 6 — Why Choose Us.
 * Pillars distilled from PDF "What Makes Different" + brand differentiators.
 */
const pillars = [
  {
    icon: Flame,
    title: "Smoked low and slow.",
    body: "16-18 hour briskets. No shortcuts. The smoke ring is real.",
  },
  {
    icon: Map,
    title: "Recipes from three states.",
    body: "Texas. Louisiana. Mississippi Delta. Passed down for over 100 years.",
  },
  {
    icon: Award,
    title: "Award-winning pitmaster.",
    body: "First place at the Souper Bowl of Caring — Super Bowl weekend.",
  },
  {
    icon: Heart,
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
            <Reveal key={p.title} delay={idx * 100}>
              <div className="relative pl-6 border-l-2 border-warmgold pt-1">
                <p.icon
                  className="size-9 text-warmgold mb-5"
                  strokeWidth={1.5}
                  aria-hidden
                />
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
