import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { refundPolicy } from "@/lib/legal/refund";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy — Flacron Enterprises",
  description: "How cancellations, refunds, subscription changes, and billing adjustments are handled across Flacron Enterprises products and services.",
  alternates: { canonical: "/refund-policy" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/refund-policy",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Cancellation and Refund Policy — Flacron Enterprises" }],
  },
};

export default function RefundPolicyPage() {
  return <LegalDocument data={refundPolicy} />;
}
