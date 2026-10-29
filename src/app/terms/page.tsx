import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { termsAndConditions } from "@/lib/legal/terms";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms governing your access to and use of Flacron Enterprises websites, applications, platforms, and AI-powered services.",
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Terms and Conditions | Flacron Enterprises",
    url: "/terms",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Terms and Conditions — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Terms and Conditions | Flacron Enterprises", images: [OG_IMAGE] },
};

export default function TermsPage() {
  return <LegalDocument data={termsAndConditions} />;
}
