import { absoluteUrl, xmlResponse } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function GET() {
  const sitemaps = [
    "/pages-sitemap.xml",
    "/blog-sitemap.xml",
    "/image-sitemap.xml",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps
    .map((path) => `<sitemap><loc>${absoluteUrl(path)}</loc></sitemap>`)
    .join("")}</sitemapindex>`;

  return xmlResponse(xml);
}
