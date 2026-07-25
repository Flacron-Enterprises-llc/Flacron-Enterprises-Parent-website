import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { CUSTOMER_COOKIE, verifySessionToken } from "@/lib/customer-auth";
import { getCustomerById } from "@/lib/customers-data";

// Node runtime (not Edge) so this can read Firestore to enforce the payment gate.
export const runtime = "nodejs";

const BILLING_PATH = "/dashboard/billing";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(CUSTOMER_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  // Payment gate — no active billing status means no access beyond the billing page itself.
  if (pathname !== BILLING_PATH) {
    const customer = await getCustomerById(session.customerId);
    if (!customer || customer.billingStatus !== "active") {
      return NextResponse.redirect(new URL(BILLING_PATH, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/((?!login$).*)",
    "/dashboard",
    "/dashboard/((?!login$).*)",
  ],
};
