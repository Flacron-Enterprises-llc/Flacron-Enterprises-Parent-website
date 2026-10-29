import { MetadataRoute } from "next";
import { getApps } from "@/lib/apps-data";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/ecosystem`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/solutions`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/partners`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/book-demo`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ai-engine`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/refund-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/cookies`, changeFrequency: "yearly", priority: 0.3 },
  ];

  let appRoutes: MetadataRoute.Sitemap = [];
  try {
    const apps = await getApps();
    appRoutes = apps.map((app) => ({
      url: `${BASE}/apps/${app.slug}`,
     
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.error("sitemap: failed to load apps, falling back to static routes", error);
  }

  return [...staticRoutes, ...appRoutes];
}
