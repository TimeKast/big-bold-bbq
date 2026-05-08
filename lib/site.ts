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
  tagline: "Big flavor. Real smoke. Done right.",
  description:
    "Award-winning Southern BBQ catering in Las Vegas with a Creole and Cajun kick. Authentic, soulful catering for corporate events, weddings, and private parties.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bigboldbbq.com",
  locale: "en-US",

  // TBD — real phone number from client (PENDING.md P0 #1)
  phone: {
    display: "(702) 555-0100",
    e164: "+17025550100",
    href: "tel:+17025550100",
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

  // Google Business Profile rating — TBD (PENDING.md P1 #8). Hidden until real numbers exist.
  googleReviews: {
    show: false,
    rating: 0,
    count: 0,
    url: "",
  },

  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ],
} as const;

export type Site = typeof site;
