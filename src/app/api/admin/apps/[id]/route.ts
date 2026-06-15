import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-server";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import type { AppDefinition } from "@/data/apps";

async function guardAuth(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token || !(await verifyToken(token))) return false;
  return true;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await guardAuth(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const db = getDb();
  const doc = await db.collection("apps").doc(id).get();
  if (!doc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ...doc.data(), id: doc.id });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await guardAuth(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const updates: Partial<AppDefinition> = await request.json();
  const db = getDb();
  await db.collection("apps").doc(id).set({ ...updates, updatedAt: new Date().toISOString() }, { merge: true });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await guardAuth(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const db = getDb();
  await db.collection("apps").doc(id).delete();
  return NextResponse.json({ ok: true });
}
