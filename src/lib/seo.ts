import type { Metadata } from "next";
import type { AppDefinition } from "@/data/apps";
import { absoluteUrl, OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

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

const MAX_TITLE_LENGTH = 60;

/** Meta description for an app page: seo.description, else tagline, else the sitewide default. */
export function getAppDescription(app: AppDefinition): string {
  return app.seo?.description?.trim() || app.tagline?.trim() || SITE_DESCRIPTION;
}

export function generateAppMetadata(app: AppDefinition): Metadata {
  const customTitle = app.seo?.title ? normalizeTitle(app.seo.title) : "";
  let pageTitle: string;
  let socialTitle: string;
  let title: Metadata["title"];
  if (customTitle) {
    // Explicit SEO title is used verbatim: no brand suffix from the root template.
    pageTitle = customTitle;
    socialTitle = customTitle;
    title = { absolute: customTitle };
  } else {
    const full = normalizeTitle(`${app.name} — ${app.tagline}`);
    pageTitle = `${full} | ${SITE_NAME}`.length <= MAX_TITLE_LENGTH ? full : normalizeTitle(app.name);
    socialTitle = `${pageTitle} | ${SITE_NAME}`; // og/twitter titles bypass the root title.template
    title = pageTitle;
  }
  const description = getAppDescription(app);
  const canonicalPath = `/apps/${app.slug}`;
  return {
    title,
    description,
    keywords: app.seo?.keywords,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: socialTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: absoluteUrl(canonicalPath),
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
