import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { MeetChefDee } from "@/components/home/MeetChefDee";
import { Services } from "@/components/home/Services";
import { Experience } from "@/components/home/Experience";
import { MenuPreview } from "@/components/home/MenuPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Reviews } from "@/components/home/Reviews";
import { ServiceArea } from "@/components/home/ServiceArea";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "BBQ Catering Las Vegas — Southern, Creole & Cajun",
  description:
    "Award-winning Southern, Creole, and Cajun BBQ catering in Las Vegas. Call now for a fast quote on your event.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <MeetChefDee />
      <Services />
      <Experience />
      <MenuPreview />
      <WhyChooseUs />
      <Reviews />
      <ServiceArea />
      <FinalCTA />
    </>
  );
}
