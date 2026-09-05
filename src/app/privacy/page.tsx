import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { privacyPolicy } from "@/lib/legal/privacy";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Flacron Enterprises",
  description: "How Flacron Enterprises collects, uses, stores, discloses, and protects your information across our websites, applications, and AI-powered services.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/privacy",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Privacy Policy — Flacron Enterprises" }],
  },
};

export default function PrivacyPage() {
  return <LegalDocument data={privacyPolicy} />;
}
