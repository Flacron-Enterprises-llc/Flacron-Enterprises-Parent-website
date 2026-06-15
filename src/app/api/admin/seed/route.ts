import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-server";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { apps } from "@/data/apps";

const DEFAULT_NAV = {
  navLinks: [
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "AI Engine", href: "/ai-engine" },
    { label: "About", href: "/about" },
    { label: "Partners", href: "/partners" },
  ],
  primaryCTA: { label: "Book a Demo", href: "/book-demo" },
  footerLinks: {
    Company: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Demo", href: "/book-demo" },
    ],
    Explore: [
      { label: "Ecosystem", href: "/ecosystem" },
      { label: "Solutions", href: "/solutions" },
      { label: "Industries", href: "/industries" },
      { label: "AI Engine", href: "/ai-engine" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const batch = db.batch();

  for (const app of apps) {
    const ref = db.collection("apps").doc(app.slug);
    batch.set(ref, { ...app, seededAt: new Date().toISOString() });
  }

  const navRef = db.collection("site_config").doc("navigation");
  batch.set(navRef, { ...DEFAULT_NAV, seededAt: new Date().toISOString() }, { merge: true });

  await batch.commit();
  return NextResponse.json({ ok: true, seeded: apps.length });
}
