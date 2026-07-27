import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getDb } from "@/lib/firebase-server";
import {
  createCustomerWithCredentials,
  generateTemporaryPassword,
  getCustomerByEmail,
} from "@/lib/customers-data";
import { createSessionToken, hashPassword } from "@/lib/customer-auth";
import { getPlan, type PlanId } from "@/lib/plans";
import { sendEmail } from "@/lib/email";
import { dashboardLinkEmailHtml } from "@/lib/email-templates";

function guessPlan(text: string): PlanId {
  const lower = text.toLowerCase();
  if (lower.includes("enterprise")) return "enterprise";
  if (lower.includes("growth")) return "growth";
  return "starter";
}

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
  };

  if (!lead.email) return NextResponse.json({ error: "Lead has no email" }, { status: 400 });

  const existing = await getCustomerByEmail(lead.email);
  if (existing) {
    return NextResponse.json({ error: "A customer account already exists for this email" }, { status: 409 });
  }

  const orgName = lead.company || lead.name;
  const planId = guessPlan(`${lead.subject || ""} ${lead.product || ""}`);
  const plan = getPlan(planId);

  const temporaryPassword = generateTemporaryPassword();
  const passwordHash = await hashPassword(temporaryPassword);
  const customerId = await createCustomerWithCredentials(lead.email, orgName, planId, passwordHash);

  const origin = request.nextUrl.origin;
  const sessionToken = await createSessionToken(customerId);
  const dashboardLink = `${origin}/api/customer/magic-login?token=${encodeURIComponent(sessionToken)}`;

  try {
    await sendEmail({
      to: lead.email,
      toName: lead.name,
      subject: "Your Flacron AI Engine dashboard is ready",
      html: dashboardLinkEmailHtml({
        orgName,
        planName: plan.name,
        priceLabel: plan.priceLabel,
        dashboardLink,
      }),
    });
  } catch (err) {
    console.error("Failed to send provisioning email:", err);
  }

  await db.collection("leads").doc(id).update({
    convertedCustomerId: customerId,
    status: "qualified",
  });

  return NextResponse.json({ ok: true, customerId, dashboardLink });
}
