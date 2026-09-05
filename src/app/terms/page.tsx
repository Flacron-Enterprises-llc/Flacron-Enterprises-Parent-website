import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { termsAndConditions } from "@/lib/legal/terms";

export const metadata: Metadata = {
  title: "Terms and Conditions — Flacron Enterprises",
  description: "The terms governing your access to and use of Flacron Enterprises websites, applications, platforms, and AI-powered services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalDocument data={termsAndConditions} />;
}
