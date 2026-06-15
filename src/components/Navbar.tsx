"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Search, Bot } from "lucide-react";
import type { AppDefinition } from "@/data/apps";
import AppLogo from "./AppLogo";
import StatusBadge from "./StatusBadge";
import SearchModal from "./SearchModal";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "AI Engine", href: "/ai-engine" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
];

export default function Navbar({ apps }: { apps: AppDefinition[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 10); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    }
    if (megaOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [megaOpen]);

  const openSearch = useCallback(() => setSearchOpen(true), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); openSearch(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} apps={apps} />

      <header className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm scrolled-dark"
          : "bg-white"
      )}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Wordmark */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="text-xl font-black tracking-wider text-[#F97316]">FLACRON</span>
            <span className="hidden text-xs font-medium text-slate-400 sm:block">Enterprises</span>
          </Link>

          {/* Desktop nav — centre */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className={cn(
                  "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === href
                    ? "text-flacron-navy bg-slate-100"
                    : "text-slate-600 hover:text-flacron-navy hover:bg-slate-50"
                )}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side — apps dropdown + utilities + CTA */}
          <div className="hidden items-center gap-1.5 lg:flex" ref={megaRef}>

            {/* Apps mega menu trigger */}
            <button
              onClick={() => setMegaOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                megaOpen
                  ? "bg-slate-100 text-flacron-navy"
                  : "text-slate-600 hover:text-flacron-navy hover:bg-slate-50"
              )}
            >
              Apps
              <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            {/* Divider */}
            <span className="h-5 w-px bg-slate-200" />

            {/* Search — icon only with tooltip */}
            <button
              onClick={openSearch}
              title="Search (⌘K)"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Primary CTA */}
            <Link
              href="/book-demo"
              className="ripple-btn whitespace-nowrap rounded-lg bg-[#F97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors shadow-sm"
            >
              Book a Demo
            </Link>

            {/* Mega menu */}
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-x-0 top-16 border-b border-slate-200 bg-white shadow-xl"
                >
                  <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-4 gap-8">
                      {/* Products list */}
                      <div className="col-span-3">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Our Products</p>
                          <Link href="/ecosystem" className="flex items-center gap-1 text-xs font-medium text-[#F97316] hover:text-[#EA580C]" onClick={() => setMegaOpen(false)}>
                            View all <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-1 lg:grid-cols-3">
                          {apps.map((app) => (
                            <Link key={app.id} href={`/apps/${app.slug}`} onClick={() => setMegaOpen(false)}
                              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50">
                              <AppLogo name={app.name} size={36} />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-flacron-navy truncate">{app.name}</span>
                                  <StatusBadge status={app.status} />
                                </div>
                                <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{app.tagline}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Platform column */}
                      <div className="border-l border-slate-100 pl-8">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Platform</p>
                        <Link href="/ai-engine" onClick={() => setMegaOpen(false)}
                          className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 transition-colors">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F97316]/10">
                            <Bot className="h-4 w-4 text-[#F97316]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-flacron-navy">AI Engine</p>
                            <p className="mt-0.5 text-xs text-slate-500">The intelligence behind every Flacron product</p>
                          </div>
                        </Link>
                        <Link href="/contact" onClick={() => setMegaOpen(false)}
                          className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-flacron-navy transition-colors">
                          Contact Sales →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile right side */}
          <div className="flex items-center gap-1 lg:hidden">
            <button onClick={openSearch} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mobile-menu fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col overflow-y-auto bg-white border-t border-slate-100 lg:hidden"
            >
              <div className="px-4 py-6 space-y-1">
                {[{ label: "Home", href: "/" }, ...navLinks, { label: "Contact", href: "/contact" }].map(({ label, href }) => (
                  <Link key={label} href={href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      pathname === href
                        ? "bg-slate-100 text-flacron-navy"
                        : "text-slate-700 hover:bg-slate-50 hover:text-flacron-navy"
                    )}
                    onClick={() => setMobileOpen(false)}>
                    {label}
                  </Link>
                ))}

                <div className="pt-4 border-t border-slate-100">
                  <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Products</p>
                  {apps.map((app) => (
                    <Link key={app.id} href={`/apps/${app.slug}`}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-50"
                      onClick={() => setMobileOpen(false)}>
                      <AppLogo name={app.name} size={32} />
                      <div>
                        <p className="text-sm font-semibold text-flacron-navy">{app.name}</p>
                        <p className="text-xs text-slate-500">{app.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-4 pb-8">
                  <Link href="/book-demo"
                    className="block w-full rounded-xl bg-[#F97316] px-6 py-3.5 text-center font-semibold text-white hover:bg-[#EA580C] transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    Book a Demo
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
