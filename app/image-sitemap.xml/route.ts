import { getImageSitemapEntries, xmlResponse } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await getImageSitemapEntries();
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries.join("")}</urlset>`;

  return xmlResponse(xml);
}
