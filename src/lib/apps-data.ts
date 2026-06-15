import { apps as staticApps, getAppBySlug as staticGetBySlug } from "@/data/apps";
import type { AppDefinition } from "@/data/apps";
import { isFirebaseConfigured } from "./firebase-server";

export async function getApps(): Promise<AppDefinition[]> {
  if (!isFirebaseConfigured()) return staticApps;

  try {
    const { getDb } = await import("./firebase-server");
    const db = getDb();
    const snapshot = await db.collection("apps").orderBy("name").get();
    if (snapshot.empty) return staticApps;
    return snapshot.docs.map((doc) => doc.data() as AppDefinition);
  } catch {
    return staticApps;
  }
}

export async function getAppBySlug(slug: string): Promise<AppDefinition | undefined> {
  if (!isFirebaseConfigured()) return staticGetBySlug(slug);

  try {
    const { getDb } = await import("./firebase-server");
    const db = getDb();
    const doc = await db.collection("apps").doc(slug).get();
    if (!doc.exists) return staticGetBySlug(slug);
    return doc.data() as AppDefinition;
  } catch {
    return staticGetBySlug(slug);
  }
}

export async function getAllSlugs(): Promise<string[]> {
  if (!isFirebaseConfigured()) return staticApps.map((a) => a.slug);

  try {
    const { getDb } = await import("./firebase-server");
    const db = getDb();
    const snapshot = await db.collection("apps").select("slug").get();
    if (snapshot.empty) return staticApps.map((a) => a.slug);
    return snapshot.docs.map((doc) => (doc.data().slug as string) || doc.id);
  } catch {
    return staticApps.map((a) => a.slug);
  }
}
