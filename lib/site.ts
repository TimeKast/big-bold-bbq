/**
 * Single source of truth for site-wide config.
 * Update once here; consumed by metadata, JSON-LD, footer, header, etc.
 *
 * Items marked TBD are tracked in /PENDING.md and need real values from client
 * before production launch.
 */

export const site = {
  name: "Chef Dee's Big Bold BBQ",
  shortName: "Big Bold BBQ",
  tagline: "Big flavor. Real smoke.",
  description:
    "Award-winning Southern BBQ catering in Las Vegas with a Creole and Cajun kick. Authentic, soulful catering for corporate events, weddings, and private parties.",
  // TEMPORARY: bigboldbbq.com is still parked at the registrar (DNS not pointed
  // to Vercel — see PENDING.md), so the canonical/OG base uses the live Vercel
  // URL meanwhile, otherwise share previews reference a dead domain. Revert this
  // to "https://bigboldbbq.com" the moment DNS is connected.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://big-bold-bbq.vercel.app",
  locale: "en-US",

  // Real phone (client-confirmed 2026-05-30)
  phone: {
    display: "(702) 879-4977",
    e164: "+17028794977",
    href: "tel:+17028794977",
  },

  // TBD — real lead notification email
  email: "chef@bigboldbbq.com",

  // Service area cities
  cities: [
    "Las Vegas",
    "Henderson",
    "Summerlin",
    "North Las Vegas",
    "Boulder City",
  ],

  // Address (TBD — real address from client)
  address: {
    streetAddress: "Las Vegas, NV",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89101",
    addressCountry: "US",
  },

  // Geo (approximate Las Vegas Strip — replace with real)
  geo: {
    latitude: 36.1147,
    longitude: -115.1728,
  },

  // Social — TBD (PENDING.md P1 #9). Empty arrays render no links.
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
  },

  // Award — TBD verification (PENDING.md P1 #7). Toggle showAward to false until confirmed.
  award: {
    show: true,
    name: "Souper Bowl of Cooking",
    placement: "First Place",
    description: "Award-winning gumbo, recognized at the Souper Bowl of Cooking during Super Bowl weekend in Las Vegas.",
  },

  // Google Business Profile. `url` powers the "Review us on Google" CTA and
  // the "Read all reviews" link — paste the GBP share link when available
  // (PENDING.md P1 #8). Real reviews themselves live in lib/content/reviews.ts;
  // the rating/count below are derived from that file, not hardcoded.
  googleReviews: {
    url: "",
  },

  // Order per client (2026-05-30): Home > About > Menu > Pricing > Contact > Blog
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/menu", label: "Menu" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ],
} as const;

export type Site = typeof site;
