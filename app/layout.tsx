import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const slab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — BBQ Catering Las Vegas | Southern, Creole & Cajun`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "BBQ catering Las Vegas",
    "Southern catering Las Vegas",
    "Creole catering Las Vegas",
    "Cajun BBQ Las Vegas",
    "wedding catering Las Vegas",
    "corporate event catering",
    "pitmaster Las Vegas",
    "Chef Dee BBQ",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: site.name,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#9e2f23",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${slab.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-parchment text-hickory">
        {children}
      </body>
    </html>
  );
}
