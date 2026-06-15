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
  flacronbuild: "FlacronBuild",
  "flacronconnect-ai": "FlacronConnect AI",
  rapidclaimpro: "RapidClaimPro",
  "flacronsecure-ai": "FlacronSecure AI",
  flacronsport: "FlacronSport",
  beingtchitaka: "Tchitaka Growth",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: labels[seg] ?? seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href: "/" + segments.slice(0, i + 1).join("/"),
  }));

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-2">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-400">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-[#F97316] transition-colors">
            <Home className="h-3 w-3" />
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {i === crumbs.length - 1 ? (
              <span className="text-flacron-navy font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-[#F97316] transition-colors">{crumb.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
