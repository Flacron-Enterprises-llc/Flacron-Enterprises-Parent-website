import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-server";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

async function guardAuth(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token || !(await verifyToken(token))) return false;
  return true;
}

export async function GET(request: NextRequest) {
  if (!(await guardAuth(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const doc = await db.collection("site_config").doc("navigation").get();
  if (!doc.exists) return NextResponse.json(null);
  return NextResponse.json(doc.data());
}

export async function PUT(request: NextRequest) {
  if (!(await guardAuth(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  const db = getDb();
  await db.collection("site_config").doc("navigation").set({ ...data, updatedAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
