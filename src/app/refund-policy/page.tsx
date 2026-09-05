import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { refundPolicy } from "@/lib/legal/refund";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy — Flacron Enterprises",
  description: "How cancellations, refunds, subscription changes, and billing adjustments are handled across Flacron Enterprises products and services.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return <LegalDocument data={refundPolicy} />;
}
