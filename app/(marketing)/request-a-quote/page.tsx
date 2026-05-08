import type { Metadata } from "next";
import { QuoteFunnelStub } from "@/components/funnel/QuoteFunnelStub";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Request a BBQ Catering Quote — Las Vegas",
  description:
    "Tell us about your event in 90 seconds and we'll come back the same day with a custom Big Bold BBQ catering menu and quote.",
  alternates: { canonical: "/request-a-quote" },
};

export default function RequestQuotePage() {
  return (
    <section className="bg-parchment text-hickory pt-32 pb-24 md:pt-40 md:pb-32 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="text-firebrick uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-4">
            Request a Quote
          </p>
          <h1
            className="font-display font-black uppercase leading-[0.95] tracking-[-0.03em] text-balance"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
          >
            Let&apos;s build
            <br />
            <span className="text-firebrick">your event.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-hickory/85 max-w-2xl text-pretty">
            Tell us about your event in about 90 seconds. We come back the same day
            with a custom menu and a clear quote.
          </p>
        </Reveal>

        <div className="mt-16">
          <QuoteFunnelStub />
        </div>
      </div>
    </section>
  );
}
