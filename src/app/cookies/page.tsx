import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { cookiesPolicy } from "@/lib/legal/cookies";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "How Flacron Enterprises uses cookies and similar tracking technologies across our websites, applications, and platforms.",
  alternates: { canonical: "/cookies" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Cookies Policy | Flacron Enterprises",
    url: "/cookies",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Cookies Policy — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Cookies Policy | Flacron Enterprises", images: [OG_IMAGE] },
};

export default function CookiesPage() {
  return <LegalDocument data={cookiesPolicy} />;
}
