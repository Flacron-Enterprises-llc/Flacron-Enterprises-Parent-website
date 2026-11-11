"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const labels: Record<string, string> = {
  ecosystem: "Ecosystem",
  solutions: "Solutions",
  industries: "Industries",
  partners: "Partners",
  about: "About",
  contact: "Contact",
  "book-demo": "Book a Demo",
  apps: "Apps",
  "ai-engine": "AI Engine",
  "custom-order": "Custom order",
  "refund-policy": "Cancellation & refunds",
  "api-access": "API access",
  "white-label": "White label",
};

const TOP_LEVEL_ROUTES = new Set([
  "about", "ai-engine", "apps", "book-demo", "contact", "cookies", "custom-order", "disclaimer", "ecosystem",
  "industries", "partners", "privacy", "refund-policy", "solutions", "terms", "verify",
]);

/**
 * `lastLabel` overrides the final crumb (app pages pass the app's real name). The layout instance skips /apps/*
 * so those pages render their own, with the name available server-side.
 */
export default function Breadcrumbs({ lastLabel }: { lastLabel?: string } = {}) {
  const pathname = usePathname();
  if (!lastLabel && pathname.startsWith("/apps/")) return null;
  if (pathname === "/" || pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) return null;

  const segments = pathname.split("/").filter(Boolean);
  // Only real top-level routes get a trail. On a 404 the server renders "/_not-found" while the browser shows the
  // requested URL; rendering nothing for unknown routes keeps server and client markup identical.
  if (!segments.length || !TOP_LEVEL_ROUTES.has(segments[0])) return null;
  const crumbs = segments.map((seg, i) => ({
    label: labels[seg] ?? seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: "/" + segments.slice(0, i + 1).join("/"),
  })).map((crumb) => (crumb.href === "/apps" ? { ...crumb, href: "/ecosystem" } : crumb));
  if (lastLabel && crumbs.length) crumbs[crumbs.length - 1].label = lastLabel;

  return (
    <nav aria-label="Breadcrumb" className="container-page pb-1 pt-20">
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-text-muted">
        <li>
          <Link href="/" className="flex items-center gap-1 rounded hover:text-accent-text transition-colors">
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1">
            <ChevronRight aria-hidden className="h-3.5 w-3.5 opacity-60" />
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="font-medium text-text-secondary">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="rounded hover:text-accent-text transition-colors">{crumb.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
