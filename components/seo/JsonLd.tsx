import { site } from "@/lib/site";
import { menu } from "@/lib/content/menu";
import { reviews, reviewStats } from "@/lib/content/reviews";

type SchemaObject = Record<string, unknown>;
type SchemaReview = {
  author: string;
  date: string;
  rating: number;
  text: string;
};
type SchemaReviewStats = {
  average: number;
  count: number;
};
type SchemaMenuSection = {
  items: {
    description: string;
    name: string;
  }[];
  title: string;
};

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

export function localBusinessSchema(options?: {
  reviewStats?: SchemaReviewStats;
  reviews?: SchemaReview[];
}): SchemaObject {
  const schemaReviews = options?.reviews ?? reviews;
  const schemaReviewStats = options?.reviewStats ?? reviewStats;
  // Only emit ratings when we have real, curated reviews — never fabricate.
  const reviewFragment =
    schemaReviews.length > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: schemaReviewStats.average,
            reviewCount: schemaReviewStats.count,
            bestRating: 5,
            worstRating: 1,
          },
          review: schemaReviews.map((r) => ({
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

export function sitewideSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "FoodEstablishment"],
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon-512.png`,
        image: `${site.url}/og-default.jpg`,
        description:
          "Chef Dee's Big Bold BBQ provides award-winning BBQ catering in Las Vegas, specializing in authentic Southern BBQ, Creole cuisine, and Cajun favorites for corporate events, weddings, private parties, and live on-site BBQ experiences.",
        telephone: site.phone.e164,
        email: site.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.addressLocality,
          addressRegion: site.address.addressRegion,
          addressCountry: site.address.addressCountry,
        },
        areaServed: site.cities.map((city) => ({
          "@type": "City",
          name: city,
        })),
        servesCuisine: [
          "Southern BBQ",
          "Barbecue",
          "Creole",
          "Cajun",
          "Southern Cuisine",
        ],
        sameAs: [
          "https://www.facebook.com/BigBoldBBQ/",
          "https://www.instagram.com/BigBoldBBQ/",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone.e164,
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: {
          "@id": `${site.url}/#organization`,
        },
      },
    ],
  };
}

export function homepageSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}/#webpage`,
    url: `${site.url}/`,
    name: "Award-Winning BBQ Catering in Las Vegas",
    description:
      "Chef Dee's Big Bold BBQ offers award-winning Southern BBQ catering in Las Vegas with authentic Creole and Cajun flavor.",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${site.url}/photos/chef-dee.jpg`,
    },
    breadcrumb: breadcrumbSchema([{ name: "Home", url: `${site.url}/` }]),
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
export function menuSchema(menuSections: SchemaMenuSection[] = menu): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${site.url}/menu#menu`,
    name: `${site.name} Catering Menu`,
    url: `${site.url}/menu`,
    hasMenuSection: menuSections.map((cat) => ({
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
    logo: `${site.url}/icon-512.png`,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function pageSchema({
  type = "WebPage",
  path,
  name,
  description,
  breadcrumb,
  about,
}: {
  type?: "AboutPage" | "ContactPage" | "WebPage";
  path: string;
  name: string;
  description: string;
  breadcrumb: { name: string; url: string }[];
  about?: SchemaObject;
}): SchemaObject {
  const url = `${site.url}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${site.url}/#website` },
    about: about ?? { "@id": `${site.url}/#organization` },
    mainEntity: type === "ContactPage" ? { "@id": `${site.url}/#organization` } : undefined,
    breadcrumb: breadcrumbSchema(breadcrumb),
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
