import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { disclaimerPolicy } from "@/lib/legal/disclaimer";

export const metadata: Metadata = {
  title: "Disclaimer — Flacron Enterprises",
  description: "Important disclaimers regarding Flacron Enterprises websites, applications, AI-generated outputs, and professional responsibility.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return <LegalDocument data={disclaimerPolicy} />;
}
