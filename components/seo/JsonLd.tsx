import { site } from "@/lib/site";
import { menu } from "@/lib/content/menu";
import { reviews, reviewStats } from "@/lib/content/reviews";

type SchemaObject = Record<string, unknown>;

export function JsonLd({ schema }: { schema: SchemaObject | SchemaObject[] }) {
  // Escape `<` to `<` so a stray "<" in content can't break out of the
  // <script> tag (Next.js / OWASP JSON-in-HTML guidance).
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function localBusinessSchema(): SchemaObject {
  // Only emit ratings when we have real, curated reviews — never fabricate.
  const reviewFragment =
    reviews.length > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewStats.average,
            reviewCount: reviewStats.count,
            bestRating: 5,
            worstRating: 1,
          },
          review: reviews.map((r) => ({
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
            },
            author: { "@type": "Person", name: r.author },
            datePublished: r.date,
            reviewBody: r.text,
          })),
        }
      : {};

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    email: site.email,
    image: `${site.url}/og-default.jpg`,
    address: {
      "@type": "PostalAddress",
      ...site.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...site.geo,
    },
    areaServed: site.cities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    servesCuisine: ["Southern", "Creole", "Cajun", "BBQ"],
    priceRange: "$$$",
    hasMenu: { "@id": `${site.url}/menu#menu` },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
    ...reviewFragment,
  };
}

/** Person schema for Chef Dee — injected on /about. */
export function personSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/about#chef-dee`,
    name: "Chef Dee",
    jobTitle: "Pitmaster & Chef",
    image: `${site.url}/photos/chef-dee.jpg`,
    worksFor: { "@id": `${site.url}/#organization` },
    award: site.award.show ? site.award.name : undefined,
    knowsAbout: ["Southern BBQ", "Creole cuisine", "Cajun cuisine", "Smoked meats", "Gumbo"],
  };
}

/** Menu schema (no prices — catering is custom-quoted). Linked from LocalBusiness.hasMenu. */
export function menuSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${site.url}/menu#menu`,
    name: `${site.name} Catering Menu`,
    url: `${site.url}/menu`,
    hasMenuSection: menu.map((cat) => ({
      "@type": "MenuSection",
      name: cat.title,
      hasMenuItem: cat.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
      })),
    })),
  };
}

export function organizationSchema(): SchemaObject {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
