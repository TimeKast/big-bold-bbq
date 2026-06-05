import type { Metadata } from "next";
import { JsonLd, homepageSchema, localBusinessSchema } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { MeetChefDee } from "@/components/home/MeetChefDee";
import { Services } from "@/components/home/Services";
import { Experience } from "@/components/home/Experience";
import { MenuPreview } from "@/components/home/MenuPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Reviews } from "@/components/home/Reviews";
import { ServiceArea } from "@/components/home/ServiceArea";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getMenuPreviewData } from "@/lib/menu";
import { getGoogleReviewsData } from "@/lib/reviews";

export const metadata: Metadata = {
  title: { absolute: "Chef Dee's Big Bold BBQ | BBQ Catering Las Vegas" },
  description:
    "Award-winning BBQ catering in Las Vegas with authentic Southern BBQ, Creole cuisine, and Cajun favorites. Call Chef Dee's Big Bold BBQ for a fast quote.",
  alternates: { canonical: "https://bigboldbbq.com/" },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const [menuPreviewData, reviewsData] = await Promise.all([
    getMenuPreviewData(),
    getGoogleReviewsData(),
  ]);

  return (
    <>
      <JsonLd
        schema={[
          homepageSchema(),
          localBusinessSchema({
            reviewStats: reviewsData.reviewStats,
            reviews: reviewsData.reviews,
          }),
        ]}
      />
      <Hero />
      <MeetChefDee />
      <Services />
      <Experience />
      <MenuPreview data={menuPreviewData} />
      <WhyChooseUs />
      <Reviews data={reviewsData} />
      <ServiceArea />
      <FinalCTA />
    </>
  );
}
