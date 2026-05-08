import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd, localBusinessSchema, organizationSchema } from "@/components/seo/JsonLd";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <JsonLd schema={[localBusinessSchema(), organizationSchema()]} />
      <Header />
      <main id="main" className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <StickyCallBar />
    </>
  );
}
