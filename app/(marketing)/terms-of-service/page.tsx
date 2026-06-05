import type { Metadata } from "next";
import TermsPage from "../terms/page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}.`,
  alternates: { canonical: "/terms-of-service" },
};

export default TermsPage;
