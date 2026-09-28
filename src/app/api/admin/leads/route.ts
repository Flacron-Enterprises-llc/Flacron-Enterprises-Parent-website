import { NextRequest, NextResponse } from "next/server";
import { getDb, isFirebaseConfigured } from "@/lib/firebase-server";
import { FieldValue } from "firebase-admin/firestore";
import { isCentralConfigured, submitToCentral, type CentralFormType } from "@/lib/central";

const CENTRAL_FORM_TYPES: CentralFormType[] = ["contact", "book-demo", "api-access", "white-label", "custom-order"];

export async function GET() {
  if (!isFirebaseConfigured()) {
    return NextResponse.json([]);
  }
  try {
    const db = getDb();
    const snap = await db.collection("leads").orderBy("createdAt", "desc").get();
    const leads = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json(leads);
  } catch {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, subject, message, phone, product, teamSize, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Flacron Central (the CRM) is now the one place leads land — every submission becomes a Contact + Lead
    // there automatically. Firebase is only a safety net for when Central can't be reached, and for leads from
    // before this was connected.
    const formType = CENTRAL_FORM_TYPES.includes(source) ? (source as CentralFormType) : "contact";
    const central = isCentralConfigured()
      ? await submitToCentral(formType, { name, email, company, subject, message, phone, product, team_size: teamSize, page: req.headers.get("referer") ?? undefined })
      : false;
    if (central) return NextResponse.json({ ok: true, central: true }, { status: 201 });

    const lead = {
      name,
      email,
      company: company || "",
      subject: subject || "",
      message: message || "",
      phone: phone || "",
      product: product || "",
      teamSize: teamSize || "",
      source: source || "contact",
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
    };

    if (!isFirebaseConfigured()) {
      return NextResponse.json({ id: "demo-" + Date.now(), ...lead }, { status: 201 });
    }

    // Central didn't take it (not configured, or briefly unreachable) — keep it here rather than lose it.
    const db = getDb();
    const ref = await db.collection("leads").add(lead);
    return NextResponse.json({ id: ref.id, ...lead }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: "id and status required" }, { status: 400 });

    if (!isFirebaseConfigured()) return NextResponse.json({ ok: true });

    const db = getDb();
    await db.collection("leads").doc(id).update({ status });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    if (!isFirebaseConfigured()) return NextResponse.json({ ok: true });

    const db = getDb();
    await db.collection("leads").doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
