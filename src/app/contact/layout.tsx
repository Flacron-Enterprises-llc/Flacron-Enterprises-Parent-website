import type { Metadata } from "next";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Flacron Enterprises team with a question, to book a demo, or to start a project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Contact | Flacron Enterprises",
    url: "/contact",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Contact — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Contact | Flacron Enterprises", images: [OG_IMAGE] },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
