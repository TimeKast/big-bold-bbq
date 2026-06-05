import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const canonicalHost = "bigboldbbq.com";
const legacyRoutes: Record<string, string> = {
  "/privacy": "/privacy-policy",
  "/terms": "/terms-of-service",
};

function shouldUseHttps(request: NextRequest) {
  const proto = request.headers.get("x-forwarded-proto");
  const hostname = request.nextUrl.hostname.toLowerCase();

  return hostname === canonicalHost && proto === "http";
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const original = url.toString();
  const hostname = url.hostname.toLowerCase();
  const requestHost = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? hostname;
  if (requestHost === `www.${canonicalHost}`) {
    url.hostname = canonicalHost;
  }

  if (shouldUseHttps(request)) {
    url.protocol = "https:";
  }

  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }

  const lowerPath = url.pathname.toLowerCase();
  if (url.pathname !== lowerPath) {
    url.pathname = lowerPath;
  }

  const legacyTarget = legacyRoutes[url.pathname];
  if (legacyTarget) {
    url.pathname = legacyTarget;
  }

  if (url.toString() !== original) {
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon-.*\\.png|apple-icon.*\\.png|manifest.webmanifest|robots.txt|sitemap.xml|pages-sitemap.xml|blog-sitemap.xml|image-sitemap.xml|.*\\..*).*)",
  ],
};
