import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Briefcase, Heart, Home, Flame } from "lucide-react";

/**
 * Acto 3 — Services (4 types). Vertical card stack, scroll-revealed.
 * V1: simple grid; M3 will swap to "card stack rise-in" with GSAP.
 */
const services = [
  {
    icon: Briefcase,
    title: "Corporate Catering",
    body: "Professional, reliable, and unforgettable food for company events and client experiences.",
  },
  {
    icon: Heart,
    title: "Wedding Catering",
    body: "A unique, soulful catering experience that brings bold Southern flavor to your special day.",
  },
  {
    icon: Home,
    title: "Private Parties",
    body: "From backyard gatherings to large celebrations, we bring the food that people remember.",
  },
  {
    icon: Flame,
    title: "Live On-Site BBQ",
    body: "A full pitmaster experience with fresh cooking at your event.",
  },
] as const;

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-charcoal text-parchment py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            tone="light"
            lead="Every event is different. Every menu is custom. Every plate carries the same heart."
          >
            BBQ Catering in Las Vegas
            <br />
            for Every Occasion.
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {services.map((s, idx) => (
            <Reveal key={s.title} delay={idx * 80}>
              <article className="group relative overflow-hidden rounded-lg border border-parchment/10 bg-hickory/40 backdrop-blur-sm p-8 hover:border-warmgold/50 transition-all duration-300 h-full">
                <div className="absolute -top-12 -right-12 size-48 rounded-full bg-firebrick/10 blur-2xl group-hover:bg-firebrick/20 transition-all duration-500" />

                <div className="relative">
                  <s.icon className="size-10 text-warmgold mb-6" aria-hidden />
                  <h3 className="font-display text-2xl md:text-3xl text-parchment mb-3">
                    {s.title}
                  </h3>
                  <p className="text-parchment/80 text-base leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
