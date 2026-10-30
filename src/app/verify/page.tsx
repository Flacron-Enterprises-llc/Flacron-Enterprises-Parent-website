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
    <div className="min-h-screen px-4 pt-6 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl pt-4">
        {/* The code arrives as ?code=… from the link printed on every document. */}
        <Suspense fallback={null}>
          <VerifyDocument />
        </Suspense>
      </div>
    </div>
  );
}
