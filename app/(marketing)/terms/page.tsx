import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}.`,
  alternates: { canonical: "/terms" },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl md:text-3xl text-hickory mt-12 mb-4">
      {children}
    </h2>
  );
}

export default function TermsPage() {
  return (
    <section className="bg-parchment text-hickory pt-32 pb-24 md:pt-40 md:pb-32 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] text-balance">
          Terms of Service
        </h1>

        <div className="mt-10 text-base md:text-lg text-hickory/85 leading-relaxed">
          <p>
            Welcome to Chef Dee&apos;s Big Bold BBQ (&ldquo;Company,&rdquo;
            &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing
            or using our website located at bigboldbbq.com, requesting services, or
            booking catering with us, you agree to the following Terms of Service.
            Please read these terms carefully.
          </p>

          <H2>Acceptance of Terms</H2>
          <p>
            By using our website or services, you agree to be bound by these Terms
            of Service and our Privacy Policy. If you do not agree with these terms,
            please do not use our website or services.
          </p>

          <H2>Services Provided</H2>
          <p>
            Chef Dee&apos;s Big Bold BBQ provides catering services including, but
            not limited to:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>BBQ catering</li>
            <li>Corporate catering</li>
            <li>Wedding catering</li>
            <li>Private event catering</li>
            <li>Drop-off catering</li>
            <li>Buffet-style catering</li>
            <li>On-site cooking experiences</li>
          </ul>
          <p className="mt-4">All services are subject to availability and approval.</p>

          <H2>Quotes and Pricing</H2>
          <p>
            All pricing provided through phone calls, website inquiries, emails, or
            written quotes is subject to change until confirmed in writing. Pricing
            may vary based on guest count, menu selection, service type, event
            location, staffing requirements, and rental or setup needs. Quotes are
            valid only for the time period specified in the proposal.
          </p>

          <H2>Deposits and Payment Terms</H2>
          <p>
            To secure an event date, a non-refundable deposit equal to 50% of the
            total invoice amount may be required. The remaining balance is generally
            due no later than 24 hours before the scheduled event unless otherwise
            agreed upon in writing. Failure to submit payment by the required
            deadline may result in cancellation of services. Accepted payment
            methods may include credit/debit cards, electronic payments, and
            cashier-approved methods.
          </p>

          <H2>Cancellations and Refunds</H2>
          <p>
            Deposits may be non-refundable due to scheduling commitments, food
            preparation, staffing, and inventory purchasing. Cancellation policies
            may vary depending on event size and timing. Refunds, if any, are issued
            at the sole discretion of Chef Dee&apos;s Big Bold BBQ. If unforeseen
            circumstances arise, we reserve the right to reschedule or cancel
            services when necessary.
          </p>

          <H2>Event Responsibilities</H2>
          <p>
            Clients are responsible for providing accurate event details including
            guest count, event location, venue access, setup timing, parking or
            venue restrictions, and special accommodations. Failure to provide
            accurate information may affect service quality or pricing.
          </p>

          <H2>Food Allergies and Dietary Restrictions</H2>
          <p>
            While we make reasonable efforts to accommodate dietary restrictions and
            food allergy requests, our kitchen and preparation environments may
            contain common allergens including dairy, eggs, wheat, soy, shellfish,
            peanuts, and tree nuts. We cannot guarantee that any item is completely
            allergen-free. Clients are responsible for informing guests of any
            allergy risks.
          </p>

          <H2>Service Limitations</H2>
          <p>
            Chef Dee&apos;s Big Bold BBQ reserves the right to refuse or terminate
            service for unsafe environments, illegal activities, harassment or
            abusive behavior, or situations that place staff or equipment at risk.
          </p>

          <H2>Website Use</H2>
          <p>You agree not to:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>Use the website for unlawful purposes</li>
            <li>Attempt unauthorized access to systems or data</li>
            <li>Copy, reproduce, or distribute website content without permission</li>
            <li>Interfere with website functionality or security</li>
          </ul>
          <p className="mt-4">
            All website content including logos, branding, text, images, and
            graphics remains the property of Chef Dee&apos;s Big Bold BBQ unless
            otherwise stated.
          </p>

          <H2>Intellectual Property</H2>
          <p>
            All trademarks, logos, branding, recipes, photographs, graphics, and
            written content displayed on this website are the intellectual property
            of Chef Dee&apos;s Big Bold BBQ and may not be copied or used without
            written permission.
          </p>

          <H2>Third-Party Services</H2>
          <p>
            Our website may contain links or integrations with third-party services
            including payment processors, social media platforms, analytics
            providers, and communication systems. We are not responsible for the
            content, security, or privacy practices of third-party providers.
          </p>

          <H2>Limitation of Liability</H2>
          <p>
            To the fullest extent permitted by law, Chef Dee&apos;s Big Bold BBQ
            shall not be liable for any indirect, incidental, consequential, or
            special damages arising from use of our website, catering services,
            delays or interruptions, or event-related issues beyond our control. Our
            maximum liability shall not exceed the total amount paid for services
            rendered.
          </p>

          <H2>Force Majeure</H2>
          <p>
            We shall not be held responsible for delays, cancellations, or failures
            caused by events beyond our reasonable control including severe weather,
            natural disasters, power outages, government restrictions, labor
            shortages, transportation disruptions, and emergencies.
          </p>

          <H2>Indemnification</H2>
          <p>
            You agree to indemnify and hold harmless Chef Dee&apos;s Big Bold BBQ,
            its owners, employees, contractors, and affiliates from claims, damages,
            liabilities, or expenses arising from your use of our services or
            violation of these Terms.
          </p>

          <H2>Governing Law</H2>
          <p>
            These Terms of Service shall be governed by and interpreted under the
            laws of the State of Nevada. Any disputes arising from these terms or our
            services shall be resolved in the appropriate courts located in Clark
            County, Nevada.
          </p>

          <H2>Changes to These Terms</H2>
          <p>
            We reserve the right to update or modify these Terms of Service at any
            time. Updated versions will be posted on this page with a revised
            effective date. Continued use of our services constitutes acceptance of
            any revised terms.
          </p>

          <H2>Contact Information</H2>
          <address className="mt-4 not-italic">
            {site.name}
            <br />
            Las Vegas, Nevada
            <br />
            Phone:{" "}
            <a href={site.phone.href} className="text-firebrick hover:underline">
              {site.phone.display}
            </a>
            <br />
            Email:{" "}
            <a href={`mailto:${site.email}`} className="text-firebrick hover:underline">
              {site.email}
            </a>
            <br />
            Website:{" "}
            <a href={site.url} className="text-firebrick hover:underline">
              bigboldbbq.com
            </a>
          </address>
        </div>
      </div>
    </section>
  );
}
