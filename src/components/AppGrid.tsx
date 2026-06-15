"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { AppDefinition } from "@/data/apps";
import GlassCard from "./GlassCard";
import AppLogo from "./AppLogo";
import StatusBadge from "./StatusBadge";
import { cn } from "@/lib/utils";

type Category = AppDefinition["category"];
type Status = AppDefinition["status"];

const ALL_CATEGORIES: Category[] = ["Construction", "Business", "Finance", "Growth", "Security", "Sports", "Insurance"];
const ALL_STATUSES: Status[] = ["live", "beta", "coming-soon"];
const statusLabel: Record<Status, string> = {
  live: "Live",
  beta: "Beta",
  "coming-soon": "Coming Soon",
  internal: "Internal",
};

const INITIAL_COUNT = 6;

interface AppGridProps {
  apps: AppDefinition[];
  mode?: "full" | "preview";
}

export default function AppGrid({ apps, mode = "full" }: AppGridProps) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);
  const [showAll, setShowAll] = useState(false);

  const filteredApps = useMemo(() => {
    if (mode === "preview") return apps.slice(0, 3);
    return apps.filter((app) => {
      const catOk = selectedCategories.length === 0 || selectedCategories.includes(app.category);
      const statusOk = selectedStatuses.length === 0 || selectedStatuses.includes(app.status);
      return catOk && statusOk;
    });
  }, [apps, mode, selectedCategories, selectedStatuses]);

  // Reset show-all when filters change
  const displayedApps = useMemo(() => {
    if (mode === "preview" || showAll) return filteredApps;
    return filteredApps.slice(0, INITIAL_COUNT);
  }, [filteredApps, mode, showAll]);

  const hasMore = mode === "full" && !showAll && filteredApps.length > INITIAL_COUNT;
  const hiddenCount = filteredApps.length - INITIAL_COUNT;

  const toggleCategory = (c: Category) => {
    setShowAll(false);
    setSelectedCategories((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);
  };
  const toggleStatus = (s: Status) => {
    setShowAll(false);
    setSelectedStatuses((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  };
  const hasFilters = selectedCategories.length > 0 || selectedStatuses.length > 0;

  return (
    <div>
      {mode === "full" && (
        <div className="mb-6 sm:mb-8">
          {/* Horizontally scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 scrollbar-none">
            {ALL_CATEGORIES.map((cat) => {
              const active = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors border whitespace-nowrap",
                    active
                      ? "bg-[#F97316] text-white border-[#F97316]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#F97316] hover:text-[#F97316]"
                  )}
                >
                  {cat}
                </button>
              );
            })}
            <span className="shrink-0 hidden sm:block h-4 w-px bg-slate-200 self-center" />
            {ALL_STATUSES.map((s) => {
              const active = selectedStatuses.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleStatus(s)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors border whitespace-nowrap",
                    active
                      ? "bg-[#F97316] text-white border-[#F97316]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#F97316] hover:text-[#F97316]"
                  )}
                >
                  {statusLabel[s]}
                </button>
              );
            })}
            {hasFilters && (
              <button
                onClick={() => { setSelectedCategories([]); setSelectedStatuses([]); setShowAll(false); }}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors border border-transparent hover:border-slate-200 whitespace-nowrap"
              >
                Clear ×
              </button>
            )}
          </div>
        </div>
      )}

      <div className={cn(
        "grid gap-4 sm:gap-5",
        mode === "preview"
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}>
        <AnimatePresence mode="popLayout">
          {displayedApps.map((app) => (
            <motion.div
              key={app.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <GlassCard className="h-full flex flex-col p-5 sm:p-6">
                <div className="mb-3 sm:mb-4 flex items-start justify-between">
                  <AppLogo name={app.name} size={40} />
                  <StatusBadge status={app.status} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-flacron-navy sm:text-base">{app.name}</h3>
                  <p className="mt-0.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wide sm:text-[11px]">{app.category}</p>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-3 sm:mt-3 sm:text-sm">{app.shortDescription}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
                  {app.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500 sm:text-xs">{tech}</span>
                  ))}
                  {app.techStack.length > 3 && (
                    <span className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-400 sm:text-xs">+{app.techStack.length - 3}</span>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 sm:mt-4 sm:pt-4">
                  <Link
                    href={`/apps/${app.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors sm:text-sm"
                  >
                    Learn More <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredApps.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-16 text-center text-slate-400 text-sm">
            No apps match the selected filters.
          </motion.div>
        )}
      </div>

      {/* Show More button */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
          >
            Show {hiddenCount} more {hiddenCount === 1 ? "app" : "apps"}
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
