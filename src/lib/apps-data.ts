import { apps as staticApps, getAppBySlug as staticGetBySlug } from "@/data/apps";
import type { AppDefinition } from "@/data/apps";
import { isFirebaseConfigured } from "./firebase-server";
import { getCentralCatalog, getCentralCatalogItem } from "./central";

/**
 * Where the app grid and app pages get their content, in order: Flacron Central's product registry (the CRM —
 * add a product there, write its page under Products → Product pages, publish it, and it shows up here within
 * a minute); then this site's own Firebase CMS, for anything not yet managed in Central; then the static
 * fallback list, so the site is never blank even with both unreachable.
 */
async function getFirebaseApps(): Promise<AppDefinition[] | null> {
  if (!isFirebaseConfigured()) return null;
  try {
    const { getDb } = await import("./firebase-server");
    const db = getDb();
    const snapshot = await db.collection("apps").orderBy("name").get();
    if (snapshot.empty) return null;
    return snapshot.docs.map((doc) => doc.data() as AppDefinition);
  } catch {
    return null;
  }
}

export async function getApps(): Promise<AppDefinition[]> {
  const central = await getCentralCatalog<AppDefinition>();
  if (central) return central;
  return (await getFirebaseApps()) ?? staticApps;
}

export async function getAppBySlug(slug: string): Promise<AppDefinition | undefined> {
  const central = await getCentralCatalogItem<AppDefinition>(slug);
  if (central) return central;
  const firebase = await getFirebaseApps();
  if (firebase) return firebase.find((a) => a.slug === slug) ?? staticGetBySlug(slug);
  return staticGetBySlug(slug);
}

export async function getAllSlugs(): Promise<string[]> {
  const central = await getCentralCatalog<AppDefinition>();
  if (central) return central.map((a) => a.slug);
  const firebase = await getFirebaseApps();
  if (firebase) return firebase.map((a) => a.slug);
  return staticApps.map((a) => a.slug);
}
