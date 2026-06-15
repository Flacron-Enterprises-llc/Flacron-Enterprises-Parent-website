import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-server";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import type { AppDefinition } from "@/data/apps";

async function guardAuth(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token || !(await verifyToken(token))) return false;
  return true;
}

export async function GET(request: NextRequest) {
  if (!(await guardAuth(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const snapshot = await db.collection("apps").orderBy("name").get();
  const apps = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return NextResponse.json(apps);
}

export async function POST(request: NextRequest) {
  if (!(await guardAuth(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const app: AppDefinition = await request.json();
  if (!app.slug) return NextResponse.json({ error: "slug is required" }, { status: 400 });

  const db = getDb();
  await db.collection("apps").doc(app.slug).set({ ...app, updatedAt: new Date().toISOString() });
  return NextResponse.json({ ok: true, slug: app.slug }, { status: 201 });
}
