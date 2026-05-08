import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { CtaButton } from "@/components/shared/CtaButton";

export function Footer() {
  return (
    <footer className="bg-charcoal text-parchment pt-20 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-display text-3xl font-black uppercase tracking-tight inline-block"
            >
              <span className="text-firebrick">Big Bold</span> BBQ
            </Link>
            <p className="mt-4 text-parchment/75 text-base max-w-sm leading-relaxed">
              Award-winning Southern BBQ catering in Las Vegas with a Creole and
              Cajun kick. Authentic, soulful catering for events of every size.
            </p>
            <div className="mt-6 flex flex-col gap-3 max-w-xs">
              <PhoneLink source="footer" variant="primary" />
              <CtaButton href="/request-a-quote" variant="ghost">
                Request a Quote
              </CtaButton>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg uppercase tracking-wider text-warmgold mb-4">
              Explore
            </h3>
            <ul className="flex flex-col gap-3 text-parchment/85">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-warmgold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/request-a-quote"
                  className="hover:text-warmgold transition-colors"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg uppercase tracking-wider text-warmgold mb-4">
              Service Area
            </h3>
            <ul className="flex flex-col gap-3 text-parchment/85">
              {site.cities.map((city) => (
                <li key={city}>{city}, NV</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg uppercase tracking-wider text-warmgold mb-4">
              Legal
            </h3>
            <ul className="flex flex-col gap-3 text-parchment/85">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-warmgold transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-warmgold transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${site.email}`}
                  className="hover:text-warmgold transition-colors break-all"
                >
                  {site.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-parchment/15 mt-16 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm text-parchment/55">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-display tracking-wider uppercase text-xs">
            Big flavor. Real smoke. Done right.
          </p>
        </div>
      </div>
    </footer>
  );
}
