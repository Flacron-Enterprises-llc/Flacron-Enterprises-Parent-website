import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { disclaimerPolicy } from "@/lib/legal/disclaimer";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer — Flacron Enterprises",
  description: "Important disclaimers regarding Flacron Enterprises websites, applications, AI-generated outputs, and professional responsibility.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/disclaimer",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Disclaimer — Flacron Enterprises" }],
  },
};

export default function DisclaimerPage() {
  return <LegalDocument data={disclaimerPolicy} />;
}
