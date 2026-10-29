import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { privacyPolicy } from "@/lib/legal/privacy";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Flacron Enterprises collects, uses, stores, discloses, and protects your information across our websites, applications, and AI-powered services.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Privacy Policy | Flacron Enterprises",
    url: "/privacy",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Privacy Policy — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Privacy Policy | Flacron Enterprises", images: [OG_IMAGE] },
};

export default function PrivacyPage() {
  return <LegalDocument data={privacyPolicy} />;
}
