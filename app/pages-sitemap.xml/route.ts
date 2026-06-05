import { absoluteUrl, sitemapUrlEntry, staticPages, urlSet, xmlResponse } from "@/lib/seo";

export function GET() {
  const now = new Date();
  const entries = staticPages.map((page) =>
    sitemapUrlEntry({
      url: absoluteUrl(page.path),
      lastModified: now,
      priority: page.priority,
    }),
  );

  return xmlResponse(urlSet(entries));
}
