"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Layers, Lightbulb, Building2, Handshake, Info, Mail, Bot } from "lucide-react";
import type { AppDefinition } from "@/data/apps";
import AppLogo from "./AppLogo";

const staticLinks = [
  { label: "Ecosystem", href: "/ecosystem", icon: Layers, desc: "Browse all products" },
  { label: "Solutions", href: "/solutions", icon: Lightbulb, desc: "Solutions by business need" },
  { label: "Industries", href: "/industries", icon: Building2, desc: "Industry-specific tools" },
  { label: "Partners", href: "/partners", icon: Handshake, desc: "Microsoft, IBM & certifications" },
  { label: "About", href: "/about", icon: Info, desc: "Our mission and values" },
  { label: "Contact", href: "/contact", icon: Mail, desc: "Talk to our team" },
  { label: "AI Engine", href: "/ai-engine", icon: Bot, desc: "The AI powering Flacron" },
];

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  apps: AppDefinition[];
}

export default function SearchModal({ open, onClose, apps }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Fresh query each time the modal opens (adjusted during render rather than in an effect).
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (open) setQuery("");
  }

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const q = query.toLowerCase().trim();

  const filteredApps = q
    ? apps.filter((a) => a.name.toLowerCase().includes(q) || a.tagline.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
    : apps.slice(0, 4);

  const filteredLinks = q
    ? staticLinks.filter((l) => l.label.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q))
    : staticLinks;

  function go(href: string) { router.push(href); onClose(); }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[70] bg-[#020817]/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="search-modal fixed inset-x-4 top-20 z-[71] mx-auto max-w-xl overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-lg"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 text-text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, pages, features…"
                aria-label="Search the site"
                className="flex-1 bg-transparent text-[15px] text-text placeholder:text-text-muted focus:outline-none"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="text-text-muted hover:text-text">
                  <X className="h-4 w-4" />
                </button>
              )}
              <kbd className="hidden rounded border border-border bg-surface-muted px-1.5 py-0.5 text-xs text-text-muted sm:block">ESC</kbd>
            </div>

            <div className="max-h-[420px] overflow-y-auto p-2">
              {/* Apps */}
              {filteredApps.length > 0 && (
                <div className="mb-2">
                  <p className="px-3 py-1.5 text-xs font-semibold text-text-muted">Products</p>
                  {filteredApps.map((app) => (
                    <button type="button" key={app.id} onClick={() => go(`/apps/${app.slug}`)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-surface-muted focus-visible:bg-surface-muted transition-colors">
                      <AppLogo name={app.name} logoUrl={app.logoUrl} size={32} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-text truncate">{app.name}</p>
                        <p className="text-xs text-text-muted truncate">{app.tagline}</p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-text-muted shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* Pages */}
              {filteredLinks.length > 0 && (
                <div>
                  <p className="px-3 py-1.5 text-xs font-semibold text-text-muted">Pages</p>
                  {filteredLinks.map(({ label, href, icon: Icon, desc }) => (
                    <button type="button" key={href} onClick={() => go(href)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-surface-muted focus-visible:bg-surface-muted transition-colors">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted">
                        <Icon className="h-4 w-4 text-text-secondary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-text">{label}</p>
                        <p className="text-xs text-text-muted">{desc}</p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-text-muted shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {q && filteredApps.length === 0 && filteredLinks.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-text-muted">No results for &ldquo;{query}&rdquo;</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
