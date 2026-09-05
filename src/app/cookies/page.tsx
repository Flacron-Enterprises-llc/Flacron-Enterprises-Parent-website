import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { cookiesPolicy } from "@/lib/legal/cookies";

export const metadata: Metadata = {
  title: "Cookies Policy — Flacron Enterprises",
  description: "How Flacron Enterprises uses cookies and similar tracking technologies across our websites, applications, and platforms.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return <LegalDocument data={cookiesPolicy} />;
}
