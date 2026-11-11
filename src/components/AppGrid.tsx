"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import type { AppDefinition } from "@/data/apps";
import ProductCard from "./ProductCard";
import { categoriesIn, STATUS_LABELS } from "@/lib/app-display";
import { cn } from "@/lib/utils";

type Status = AppDefinition["status"];

const STATUS_ORDER: Status[] = ["live", "beta", "coming-soon"];
const INITIAL_COUNT = 9;

interface AppGridProps {
  apps: AppDefinition[];
  mode?: "full" | "preview";
}

function FilterChip({ active, onClick, children, count }: { active: boolean; onClick: () => void; children: React.ReactNode; count?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
        active
          ? "border-transparent bg-text text-bg"
          : "border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text"
      )}
    >
      {children}
      {typeof count === "number" && <span className={cn("tabular-nums text-xs", active ? "opacity-70" : "text-text-muted")}>{count}</span>}
    </button>
  );
}

/** Filterable product grid. Categories and statuses come from the data itself — nothing is hardcoded. */
export default function AppGrid({ apps, mode = "full" }: AppGridProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const reduce = useReducedMotion();

  const categories = useMemo(() => categoriesIn(apps), [apps]);
  const statuses = useMemo(() => STATUS_ORDER.filter((s) => apps.some((a) => a.status === s)), [apps]);

  const filteredApps = useMemo(() => {
    if (mode === "preview") return apps.slice(0, 3);
    const q = query.trim().toLowerCase();
    return apps.filter((app) => {
      const catOk = selectedCategories.length === 0 || selectedCategories.includes(app.category);
      const statusOk = selectedStatuses.length === 0 || selectedStatuses.includes(app.status);
      const qOk =
        !q ||
        [app.name, app.tagline, app.category, app.shortDescription, ...(app.industries ?? [])]
          .filter(Boolean)
          .some((t) => t.toLowerCase().includes(q));
      return catOk && statusOk && qOk;
    });
  }, [apps, mode, selectedCategories, selectedStatuses, query]);

  const displayedApps = mode === "preview" || showAll ? filteredApps : filteredApps.slice(0, INITIAL_COUNT);
  const hasMore = mode === "full" && !showAll && filteredApps.length > INITIAL_COUNT;
  const hiddenCount = filteredApps.length - INITIAL_COUNT;

  const toggleCategory = (c: string) => {
    setShowAll(false);
    setSelectedCategories((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  };
  const toggleStatus = (s: Status) => {
    setShowAll(false);
    setSelectedStatuses((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  };
  const hasFilters = selectedCategories.length > 0 || selectedStatuses.length > 0 || query.trim() !== "";
  const clear = () => { setSelectedCategories([]); setSelectedStatuses([]); setQuery(""); setShowAll(false); };

  return (
    <div>
      {mode === "full" && (
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <label htmlFor="ecosystem-search" className="sr-only">Search products</label>
            <input
              id="ecosystem-search"
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowAll(false); }}
              placeholder="Search by name, industry or problem"
              className="field pl-10"
            />
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filter products">
            <FilterChip active={!hasFilters} onClick={clear} count={apps.length}>All</FilterChip>
            {categories.map((cat) => (
              <FilterChip key={cat} active={selectedCategories.includes(cat)} onClick={() => toggleCategory(cat)} count={apps.filter((a) => a.category === cat).length}>
                {cat}
              </FilterChip>
            ))}
            {statuses.length > 1 && <span aria-hidden className="mx-1 hidden h-5 w-px self-center bg-border sm:block" />}
            {statuses.length > 1 && statuses.map((s) => (
              <FilterChip key={s} active={selectedStatuses.includes(s)} onClick={() => toggleStatus(s)}>
                {STATUS_LABELS[s]}
              </FilterChip>
            ))}
            {hasFilters && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-text-secondary hover:text-text"
              >
                <X aria-hidden className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>
          <p className="text-sm text-text-muted" aria-live="polite">
            Showing {displayedApps.length} of {filteredApps.length} {filteredApps.length === 1 ? "product" : "products"}
          </p>
        </div>
      )}

      <div className={cn("grid gap-5", mode === "preview" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
        <AnimatePresence mode="popLayout" initial={false}>
          {displayedApps.map((app) => (
            <motion.div
              key={app.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <ProductCard app={app} showStack />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredApps.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold text-text">No products match these filters.</p>
            <p className="mt-1 text-sm text-text-secondary">Try another category, or clear the filters to see everything.</p>
            <button type="button" onClick={clear} className="btn btn-secondary btn-sm mt-5">Clear filters</button>
          </div>
        )}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <button type="button" onClick={() => setShowAll(true)} className="btn btn-secondary">
            Show {hiddenCount} more {hiddenCount === 1 ? "product" : "products"}
            <ChevronDown aria-hidden className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
