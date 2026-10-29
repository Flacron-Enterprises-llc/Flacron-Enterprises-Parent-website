import type { Metadata } from "next";
import type { AppDefinition } from "@/data/apps";
import { absoluteUrl, OG_IMAGE, SITE_NAME } from "@/lib/site";

export function generateAppMetadata(app: AppDefinition): Metadata {
  // Root layout's title.template appends the brand to `title`; og/twitter titles bypass it, so add it there.
  const pageTitle = `${app.name} — ${app.tagline.replace(/\.+$/, "")}`;
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
