import { site } from "@/lib/site";

type SchemaObject = Record<string, unknown>;

export function JsonLd({ schema }: { schema: SchemaObject | SchemaObject[] }) {
  return (
    <script
      type="application/ld+json"
      // Safe: schema is built server-side from typed data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function localBusinessSchema(): SchemaObject {
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
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
