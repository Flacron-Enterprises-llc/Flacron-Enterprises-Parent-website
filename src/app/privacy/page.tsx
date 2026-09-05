import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { privacyPolicy } from "@/lib/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy — Flacron Enterprises",
  description: "How Flacron Enterprises collects, uses, stores, discloses, and protects your information across our websites, applications, and AI-powered services.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalDocument data={privacyPolicy} />;
}
