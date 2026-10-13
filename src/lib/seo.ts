import type { Metadata } from "next";
import type { AppDefinition } from "@/data/apps";
import { absoluteUrl, OG_IMAGE } from "@/lib/site";

export function generateAppMetadata(app: AppDefinition): Metadata {
  const title = `${app.name} — ${app.tagline} | Flacron Enterprises`;
  const canonicalPath = `/apps/${app.slug}`;
  return {
    title,
    description: app.seo.description,
    keywords: app.seo.keywords,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description: app.seo.description,
      siteName: "Flacron Enterprises",
      type: "website",
      url: absoluteUrl(canonicalPath),
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: app.seo.description,
      images: [OG_IMAGE],
    },
  };
}
