import { NextRequest, NextResponse } from "next/server";
import { CUSTOMER_COOKIE, verifySessionToken } from "@/lib/customer-auth";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days, matches createSessionToken

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const session = await verifySessionToken(token ?? undefined);

  if (!session) {
    return NextResponse.redirect(new URL("/dashboard/login?error=invalid_link", request.url));
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set(CUSTOMER_COOKIE, token as string, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return response;
}
