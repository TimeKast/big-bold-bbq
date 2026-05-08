import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main
      id="main"
      className="bg-parchment text-hickory pt-32 pb-24 md:pt-40 md:pb-32 min-h-screen"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="text-firebrick hover:underline text-sm mb-6 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-8 tracking-[-0.02em]">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none text-hickory/85 leading-relaxed space-y-6">
          <p className="text-sm text-hickory/55">
            <strong>Last updated:</strong> {new Date().toISOString().split("T")[0]} ·{" "}
            <em>
              Placeholder draft. Final terms will be reviewed by a California-licensed
              attorney before launch.
            </em>
          </p>

          <h2 className="font-display text-2xl mt-10">Use of this site</h2>
          <p>
            By using this website, you agree to use it for lawful purposes only and
            not in any way that could damage, disable, or impair the site or its
            services.
          </p>

          <h2 className="font-display text-2xl mt-10">Quotes and bookings</h2>
          <p>
            Submitting a quote request through this site does not create a binding
            contract. A booking is confirmed only when {site.name} provides written
            confirmation and we receive a 50% deposit. Final balance is due 24
            hours before your event.
          </p>

          <h2 className="font-display text-2xl mt-10">Cancellations</h2>
          <p>
            Cancellation terms will be detailed in your individual quote and signed
            booking agreement. Generally, deposits are non-refundable; final
            balance is non-refundable within 7 days of the event.
          </p>

          <h2 className="font-display text-2xl mt-10">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {site.name} is not liable for
            any indirect, incidental, or consequential damages arising from use of
            this website or our catering services. Our total liability for any
            event is capped at the total amount paid for that event.
          </p>

          <h2 className="font-display text-2xl mt-10">Intellectual property</h2>
          <p>
            All content on this site — including copy, photography, video, logos,
            and design — is the property of {site.name} or its licensors and
            protected by copyright. You may not reproduce, distribute, or create
            derivative works without written permission.
          </p>

          <h2 className="font-display text-2xl mt-10">Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Nevada. Any
            disputes will be resolved in the state or federal courts located in
            Clark County, Nevada.
          </p>

          <h2 className="font-display text-2xl mt-10">Contact</h2>
          <p>
            Questions?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-firebrick hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
