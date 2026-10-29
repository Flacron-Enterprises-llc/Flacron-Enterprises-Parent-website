import type { Metadata } from "next";
import type { AppDefinition } from "@/data/apps";
import { absoluteUrl, OG_IMAGE, SITE_NAME } from "@/lib/site";

/**
 * Remote (Flacron Central) text can already carry the brand suffix and/or a trailing period. Strip both so the
 * root layout's title.template can add the brand exactly once.
 */
export function normalizeTitle(raw: string): string {
  const brandSuffix = /\s*[|\-–—]\s*Flacron Enterprises\.?\s*$/i;
  let t = raw.trim();
  for (let prev = ""; prev !== t; ) {
    prev = t;
    t = t.replace(brandSuffix, "").replace(/[.\s]+$/, "");
  }
  return t;
}

export function generateAppMetadata(app: AppDefinition): Metadata {
  // Root layout's title.template appends the brand to `title`; og/twitter titles bypass it, so add it there.
  const pageTitle = normalizeTitle(`${app.name} — ${app.tagline}`);
  const title = `${pageTitle} | ${SITE_NAME}`;
  const canonicalPath = `/apps/${app.slug}`;
  return {
    title: pageTitle,
    description: app.seo.description,
    keywords: app.seo.keywords,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description: app.seo.description,
      siteName: SITE_NAME,
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
