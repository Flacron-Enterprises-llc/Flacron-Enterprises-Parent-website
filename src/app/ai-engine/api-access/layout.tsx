import type { Metadata } from "next";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "API Platform Access",
  description: "Call our AI endpoints directly from your codebase. Industry-trained models for language, vision, prediction, and scoring — all via a simple REST API.",
  alternates: { canonical: "/ai-engine/api-access" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "API Platform Access | Flacron Enterprises",
    url: "/ai-engine/api-access",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "API Platform Access — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "API Platform Access | Flacron Enterprises", images: [OG_IMAGE] },
};

export default function ApiAccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
