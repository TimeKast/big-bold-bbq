import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none text-hickory/85 leading-relaxed space-y-6">
          <p className="text-sm text-hickory/55">
            <strong>Last updated:</strong> {new Date().toISOString().split("T")[0]} ·{" "}
            <em>
              This is a placeholder draft. Final policy will be reviewed by a
              California-licensed attorney before launch.
            </em>
          </p>

          <h2 className="font-display text-2xl mt-10">What we collect</h2>
          <p>
            When you fill out our quote form, contact form, or call us via a tracked
            number, we collect: your name, phone number, email address, event
            details (type, date, location, guest count, menu preferences), IP
            address, browser/device information, and pages visited on this site.
          </p>

          <h2 className="font-display text-2xl mt-10">How we use it</h2>
          <p>
            We use this information to respond to your event inquiry, send you a
            custom quote, follow up if needed, and improve our website. We never
            sell your personal information. We do not share it with third parties
            except service providers we use to operate the site (email delivery,
            analytics, spam protection, hosting), each bound by their own data
            processing terms.
          </p>

          <h2 className="font-display text-2xl mt-10">Your California rights (CCPA)</h2>
          <p>
            If you are a California resident, you have the right to know what
            personal information we have about you, request its deletion, and opt
            out of any sale or sharing of your personal information (we do not sell
            or share). To exercise these rights, email us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-firebrick hover:underline"
            >
              {site.email}
            </a>
            .
          </p>

          <h2 className="font-display text-2xl mt-10">Cookies and analytics</h2>
          <p>
            We use cookies and similar tracking technologies to understand how
            visitors interact with our site and to attribute leads. This may
            include Google Analytics 4, call-tracking software, and Cloudflare
            Turnstile (a privacy-friendly anti-bot tool). See Cloudflare&apos;s{" "}
            <a
              href="https://www.cloudflare.com/application-services/products/turnstile/"
              className="text-firebrick hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Turnstile Privacy Addendum
            </a>{" "}
            for details.
          </p>

          <h2 className="font-display text-2xl mt-10">SMS and TCPA</h2>
          <p>
            If you opt in to SMS updates (separate, non-pre-checked checkbox at
            time of inquiry), you consent to receive transactional messages about
            your event from us. Message and data rates may apply. Reply STOP to
            opt out, HELP for help.
          </p>

          <h2 className="font-display text-2xl mt-10">Retention</h2>
          <p>
            We retain lead inquiry records for up to 24 months for follow-up and
            recordkeeping. System logs are retained for up to 90 days.
          </p>

          <h2 className="font-display text-2xl mt-10">Contact</h2>
          <p>
            Questions about this policy?{" "}
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
