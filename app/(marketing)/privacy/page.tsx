import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name} — how we collect, use, and protect your information.`,
  alternates: { canonical: "/privacy" },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl md:text-3xl text-hickory mt-12 mb-4">
      {children}
    </h2>
  );
}

export default function PrivacyPage() {
  return (
    <section className="bg-parchment text-hickory pt-32 pb-24 md:pt-40 md:pb-32 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] text-balance">
          Privacy Policy
        </h1>

        <div className="mt-10 text-base md:text-lg text-hickory/85 leading-relaxed">
          <p>
            Chef Dee&apos;s Big Bold BBQ (&ldquo;Company,&rdquo; &ldquo;we,&rdquo;
            &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is
            committed to protecting the personal information you share with us
            through our website, communications, and catering services. This
            Privacy Policy explains how we collect, use, disclose, and protect your
            information when you visit bigboldbbq.com or interact with our services.
          </p>

          <H2>Information We Collect</H2>
          <p>We may collect personal information you voluntarily provide to us when you:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>Request a catering quote</li>
            <li>Contact us by phone, email, or website form</li>
            <li>Subscribe to updates or marketing communications</li>
            <li>Submit inquiries regarding our services</li>
            <li>Engage with us through social media</li>
          </ul>
          <p className="mt-4">The information we may collect includes:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Event details</li>
            <li>Event location</li>
            <li>Guest count</li>
            <li>Any information you voluntarily provide in messages or forms</li>
          </ul>
          <p className="mt-4">
            We may also automatically collect certain website usage information
            including: IP address, browser type, device information, website
            activity and usage patterns, referral source, and cookies and analytics
            data.
          </p>

          <H2>How We Use Your Information</H2>
          <p>We use the information we collect to:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>Respond to quote requests and inquiries</li>
            <li>Provide catering services</li>
            <li>Communicate about bookings and events</li>
            <li>Improve our website and customer experience</li>
            <li>Send marketing or promotional communications</li>
            <li>Analyze website traffic and performance</li>
            <li>Protect against fraudulent or unauthorized activity</li>
          </ul>

          <H2>SMS and Phone Communications</H2>
          <p>
            If you provide your phone number, you consent to receiving
            communications related to your inquiry, quote, or event. These
            communications may include calls, text messages, appointment
            confirmations, and follow-up communications. Message and data rates may
            apply depending on your carrier. You may opt out of marketing-related
            communications at any time by replying STOP or contacting us directly.
          </p>

          <H2>Cookies and Tracking Technologies</H2>
          <p>
            Our website may use cookies, analytics tools, and similar technologies
            to improve website functionality and understand user behavior. These
            technologies may collect information about pages visited, time spent on
            the website, device and browser information, and interactions with
            content and forms. We may use services such as Google Analytics,
            Meta/Facebook Pixel, call tracking software, and CRM or marketing
            automation systems. You can adjust your browser settings to refuse
            cookies if desired.
          </p>

          <H2>Sharing of Information</H2>
          <p>
            We do not sell your personal information. We may share information with
            trusted third-party providers that help us operate our business,
            including website hosting providers, payment processors, CRM and email
            marketing platforms, analytics providers, and communication and
            scheduling services. These providers are only given access to
            information necessary to perform services on our behalf. We may also
            disclose information if required by law or to protect our rights and
            business operations.
          </p>

          <H2>Data Security</H2>
          <p>
            We implement reasonable security measures designed to protect your
            personal information from unauthorized access, misuse, or disclosure.
            However, no method of electronic transmission or storage is completely
            secure, and we cannot guarantee absolute security.
          </p>

          <H2>Third-Party Links</H2>
          <p>
            Our website may contain links to third-party websites or social media
            platforms. We are not responsible for the privacy practices or content
            of those third-party websites.
          </p>

          <H2>Your Rights and Choices</H2>
          <p>You may request to:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>Access the personal information we have about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
          </ul>
          <p className="mt-4">
            To make a request, please contact us using the information below.
          </p>

          <H2>Children&apos;s Privacy</H2>
          <p>
            Our services are not directed toward children under the age of 13, and
            we do not knowingly collect personal information from children.
          </p>

          <H2>Changes to This Privacy Policy</H2>
          <p>
            We may update this Privacy Policy from time to time. Any updates will be
            posted on this page with an updated effective date.
          </p>

          <H2>Contact Us</H2>
          <p>
            If you have any questions about this Privacy Policy or how your
            information is handled, please contact us:
          </p>
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
