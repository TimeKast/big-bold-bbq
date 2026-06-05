import { getPublishedBlogSitemapEntries, urlSet, xmlResponse } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await getPublishedBlogSitemapEntries();
  return xmlResponse(urlSet(entries));
}
