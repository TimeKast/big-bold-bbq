import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";

export const metadata: Metadata = {
  title: "BBQ Catering Tips & Stories — Big Bold BBQ Blog",
  description:
    "BBQ catering tips, event planning advice, and Southern, Creole, and Cajun food insights from Big Bold BBQ in Las Vegas.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <section className="bg-parchment text-hickory pt-40 pb-24 md:pt-48 md:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="The Blog"
            lead="Real BBQ knowledge from a real pitmaster. Catering tips, Southern cooking traditions, event planning, and the bold flavors that make every event unforgettable."
          >
            BBQ catering tips,
            <br />
            ideas, and Southern flavor insights.
          </SectionHeading>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16 max-w-2xl rounded-2xl border border-hickory/15 bg-parchment-grain p-8 sm:p-12 text-center">
            <p className="font-display text-2xl md:text-3xl text-hickory mb-3">
              Posts coming soon.
            </p>
            <p className="text-hickory/75 text-base mb-6">
              We&apos;re prepping our first round of stories — recipes, behind-the-pit
              looks, and event planning tips from real Vegas catering jobs. Want to
              hear when they&apos;re published?
            </p>
            <CtaButton href="/contact" variant="primary" size="md">
              Get on the list
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
