import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";
import VerifyDocument from "./VerifyDocument";

export const metadata: Metadata = {
  title: "Verify a Document",
  description: "Check that an offer letter, employment letter or salary slip was issued by Flacron Enterprises LLC.",
  alternates: { canonical: "/verify" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Verify a Document | Flacron Enterprises",
    url: "/verify",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Verify a Document — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Verify a Document | Flacron Enterprises", images: [OG_IMAGE] },
};

export default function VerifyPage() {
  return (
    <div className="relative isolate">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]" />
      <div className="container-page max-w-2xl pb-24 pt-8 sm:pt-12">
        {/* The code arrives as ?code=… from the link printed on every document. */}
        <Suspense fallback={null}>
          <VerifyDocument />
        </Suspense>
      </div>
    </div>
  );
}
