import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getDb } from "@/lib/firebase-server";
import { createApiEngineClient, guessApiEnginePlan, ApiEngineError } from "@/lib/api-engine-admin";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const db = getDb();
  const leadDoc = await db.collection("leads").doc(id).get();
  if (!leadDoc.exists) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  const lead = leadDoc.data() as {
    name: string;
    email: string;
    company?: string;
    subject?: string;
    product?: string;
    teamSize?: string;
    source?: string;
  };

  if (!lead.email) return NextResponse.json({ error: "Lead has no email" }, { status: 400 });

  const planName = guessApiEnginePlan(lead);
  const companyName = lead.company || lead.name;

  try {
    const result = await createApiEngineClient({
      company_name: companyName,
      contact_email: lead.email,
      plan_name: planName,
    });

    await db.collection("leads").doc(id).update({
      convertedApiEngineClientId: result.client_id,
      status: "qualified",
    });

    return NextResponse.json({
      ok: true,
      clientId: result.client_id,
      apiKey: result.api_key,
      prefix: result.prefix,
      planName,
    });
  } catch (err) {
    const message = err instanceof ApiEngineError ? err.message : "Failed to create API Engine client.";
    const status = err instanceof ApiEngineError && err.status === 400 ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
