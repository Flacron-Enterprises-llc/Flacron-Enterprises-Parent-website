import type { Metadata } from "next";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Custom Quote",
  description: "Enterprise plans, white-label deployments, or a workflow that doesn't fit our standard tiers — tell us what you need and we'll put together a custom quote.",
  alternates: { canonical: "/custom-order" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Request a Custom Quote | Flacron Enterprises",
    url: "/custom-order",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Request a Custom Quote — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Request a Custom Quote | Flacron Enterprises", images: [OG_IMAGE] },
};

export default function CustomOrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
