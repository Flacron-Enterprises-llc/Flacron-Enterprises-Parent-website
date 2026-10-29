import type { Metadata } from "next";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "White-Label Deployment",
  description: "License the full Flacron AI stack — rebranded as your own, deployed on your infrastructure, and tailored to your industry and workflows.",
  alternates: { canonical: "/ai-engine/white-label" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "White-Label Deployment | Flacron Enterprises",
    url: "/ai-engine/white-label",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "White-Label Deployment — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "White-Label Deployment | Flacron Enterprises", images: [OG_IMAGE] },
};

export default function WhiteLabelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
