import type { Media } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";
import { site } from "@/lib/site";

export const staticPages = [
  { path: "", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/menu", priority: "0.9" },
  { path: "/pricing", priority: "0.8" },
  { path: "/contact", priority: "0.8" },
  { path: "/blog", priority: "0.9" },
  { path: "/privacy-policy", priority: "0.3" },
  { path: "/terms-of-service", priority: "0.3" },
] as const;

export function absoluteUrl(path = "") {
  if (path === "") {
    return `${site.url}/`;
  }

  return `${site.url}${path}`;
}

export function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

export function sitemapUrlEntry({
  url,
  lastModified,
  priority,
}: {
  url: string;
  lastModified?: string | Date | null;
  priority?: string;
}) {
  const lastmod = lastModified ? `<lastmod>${escapeXml(new Date(lastModified).toISOString())}</lastmod>` : "";
  const priorityTag = priority ? `<priority>${priority}</priority>` : "";

  return `<url><loc>${escapeXml(url)}</loc>${lastmod}${priorityTag}</url>`;
}

export function urlSet(entries: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;
}

export async function getPublishedBlogSitemapEntries() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "blog-posts",
    depth: 0,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    sort: "-publishedAt",
  });

  return result.docs.map((post) =>
    sitemapUrlEntry({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt ?? post.publishedAt,
    }),
  );
}

function mediaUrl(media: Media) {
  const url = media.url;

  if (!url) {
    return null;
  }

  return url.startsWith("http") ? url : `${site.url}${url}`;
}

export async function getImageSitemapEntries() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "media",
    depth: 0,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    sort: "-updatedAt",
  });

  return result.docs
    .map((media) => {
      const url = mediaUrl(media as Media);

      if (!url) {
        return null;
      }

      return `<url><loc>${escapeXml(site.url)}</loc><image:image><image:loc>${escapeXml(url)}</image:loc>${media.alt ? `<image:title>${escapeXml(media.alt)}</image:title>` : ""}${media.caption ? `<image:caption>${escapeXml(media.caption)}</image:caption>` : ""}</image:image></url>`;
    })
    .filter((entry): entry is string => Boolean(entry));
}
