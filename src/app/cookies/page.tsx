import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { cookiesPolicy } from "@/lib/legal/cookies";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookies Policy — Flacron Enterprises",
  description: "How Flacron Enterprises uses cookies and similar tracking technologies across our websites, applications, and platforms.",
  alternates: { canonical: "/cookies" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/cookies",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Cookies Policy — Flacron Enterprises" }],
  },
};

export default function CookiesPage() {
  return <LegalDocument data={cookiesPolicy} />;
}
