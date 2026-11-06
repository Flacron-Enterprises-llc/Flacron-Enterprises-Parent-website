import type { AppDefinition } from "@/data/apps";
import { getAppDescription } from "@/lib/seo";
import { SITE_URL, absoluteUrl } from "@/lib/site";

/** JSON.stringify that is safe inside a <script> tag ("<" would otherwise allow "</script>" breakouts). */
function serialize(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\u003c");
}

export default function AppSchema({ app }: { app: AppDefinition }) {
  const url = absoluteUrl(`/apps/${app.slug}`);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Apps", item: absoluteUrl("/ecosystem") },
      { "@type": "ListItem", position: 3, name: app.name, item: url },
    ],
  };

  const software =
    app.status === "live" || app.status === "beta"
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: app.name,
          description: getAppDescription(app),
          url,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          publisher: { "@id": `${SITE_URL}/#organization` },
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(breadcrumb) }} />
      {software && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(software) }} />}
    </>
  );
}
