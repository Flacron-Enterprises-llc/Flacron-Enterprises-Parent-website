"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Search, Bot } from "lucide-react";
import type { AppDefinition } from "@/data/apps";
import AppLogo from "./AppLogo";
import StatusBadge from "./StatusBadge";
import SearchModal from "./SearchModal";
import TrackedLink from "./TrackedLink";
import ThemeToggle from "./ThemeToggle";
import BrandLogo from "./BrandLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "AI Engine", href: "/ai-engine" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({ apps }: { apps: AppDefinition[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const megaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setMegaOpen(false);
  }

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setMegaOpen(false); setMobileOpen(false); }
    }
    if (megaOpen || mobileOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [megaOpen, mobileOpen]);

  const openSearch = useCallback(() => setSearchOpen(true), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

  const fade = reduceMotion ? { duration: 0 } : { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[80] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-text focus:shadow-md"
      >
        Skip to content
      </a>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} apps={apps} />

      <header
        // Always a solid bar (like Flacron Intel): it sits over navy bands as well as page backgrounds.
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-border bg-surface/[0.97] backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300",
          (scrolled || megaOpen) && "shadow-sm"
        )}
      >
        <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-4">
          <BrandLogo />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map(({ label, href }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active ? "text-text" : "text-text-secondary hover:bg-surface-muted hover:text-text"
                    )}
                  >
                    {label}
                    {active && <span aria-hidden className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-accent" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-1 xl:flex" ref={megaRef}>
            <button
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              aria-controls="products-menu"
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                megaOpen ? "bg-surface-muted text-text" : "text-text-secondary hover:bg-surface-muted hover:text-text"
              )}
            >
              Products
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", megaOpen && "rotate-180")} />
            </button>

            <span aria-hidden className="mx-1 h-5 w-px bg-border" />

            <button
              type="button"
              onClick={openSearch}
              title="Search (Ctrl K)"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-muted hover:text-text"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <ThemeToggle />

            <Link
              href="/dashboard/login"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-text"
            >
              Sign in
            </Link>

            <TrackedLink href="/book-demo" event="cta_book_demo_nav" className="btn btn-primary btn-sm ml-1">
              Book a demo
            </TrackedLink>

            {/* Products mega menu */}
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  id="products-menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={fade}
                  className="absolute inset-x-0 top-16 border-b border-border bg-surface-raised shadow-lg"
                >
                  <div className="container-page grid grid-cols-4 gap-8 py-7">
                    <div className="col-span-3">
                      <div className="mb-3 flex items-center justify-between px-3">
                        <p className="text-sm font-semibold text-text">Products</p>
                        <Link href="/ecosystem" className="link-accent inline-flex items-center gap-1 text-sm" onClick={() => setMegaOpen(false)}>
                          View the ecosystem <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {apps.map((app) => (
                          <Link key={app.id} href={`/apps/${app.slug}`} onClick={() => setMegaOpen(false)}
                            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-muted">
                            <AppLogo name={app.name} logoUrl={app.logoUrl} size={38} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="truncate text-sm font-semibold text-text group-hover:text-accent-text">{app.name}</span>
                                {app.status !== "live" && <StatusBadge status={app.status} compact />}
                              </div>
                              <p className="mt-0.5 line-clamp-1 text-[13px] text-text-muted">{app.tagline}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="border-l border-border pl-8">
                      <p className="mb-3 px-3 text-sm font-semibold text-text">Platform</p>
                      <Link href="/ai-engine" onClick={() => setMegaOpen(false)}
                        className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-muted">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft">
                          <Bot className="h-4 w-4 text-accent-text" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-text">AI Engine</span>
                          <span className="mt-0.5 block text-[13px] text-text-muted">The intelligence behind every Flacron product</span>
                        </span>
                      </Link>
                      <Link href="/custom-order" onClick={() => setMegaOpen(false)}
                        className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-text">
                        Order a custom build
                      </Link>
                      <Link href="/contact" onClick={() => setMegaOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-text">
                        Contact sales
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 xl:hidden">
            <button type="button" onClick={openSearch} className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-muted hover:text-text" aria-label="Search">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <ThemeToggle className="h-10 w-10" />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-text hover:bg-surface-muted"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — outside <header> so the header's backdrop-filter doesn't trap this fixed element */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={fade}
            className="fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col overflow-y-auto border-t border-border bg-bg xl:hidden"
          >
            <div className="container-page space-y-1 py-5">
              {[{ label: "Home", href: "/" }, ...navLinks].map(({ label, href }) => {
                const active = href === "/" ? pathname === "/" : isActive(pathname, href);
                return (
                  <Link key={href} href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      active ? "bg-surface-muted text-text" : "text-text-secondary hover:bg-surface-muted hover:text-text"
                    )}
                    onClick={() => setMobileOpen(false)}>
                    {label}
                    {active && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </Link>
                );
              })}

              <div className="mt-3 border-t border-border pt-4">
                <p className="px-4 pb-2 text-sm font-semibold text-text">Products</p>
                <div className="grid gap-1 sm:grid-cols-2">
                  {apps.map((app) => (
                    <Link key={app.id} href={`/apps/${app.slug}`}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-surface-muted"
                      onClick={() => setMobileOpen(false)}>
                      <AppLogo name={app.name} logoUrl={app.logoUrl} size={34} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-text">{app.name}</span>
                        <span className="block text-xs text-text-muted">{app.category}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border px-1 pt-4">
                <span className="px-3 text-sm text-text-secondary">Appearance</span>
                <ThemeToggle withLabel />
              </div>

              <div className="space-y-3 pb-10 pt-4">
                <Link href="/book-demo" className="btn btn-primary btn-lg w-full" onClick={() => setMobileOpen(false)}>
                  Book a demo
                </Link>
                <Link href="/dashboard/login" className="btn btn-secondary btn-lg w-full" onClick={() => setMobileOpen(false)}>
                  Sign in to dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
