import type { Metadata } from "next";
import { getApps } from "@/lib/apps-data";
import BookDemoForm from "./BookDemoForm";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Demo — Flacron Enterprises",
  description: "Book a personalised demo with the Flacron Enterprises team. See any of our AI-powered products in action, tailored to your use case.",
  alternates: { canonical: "/book-demo" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/book-demo",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Book a Demo — Flacron Enterprises" }],
  },
};

export default async function BookDemoPage() {
  const apps = await getApps();
  return <BookDemoForm apps={apps} />;
}
