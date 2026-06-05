import type { Metadata } from "next";
import PrivacyPage from "../privacy/page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name} — how we collect, use, and protect your information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default PrivacyPage;
