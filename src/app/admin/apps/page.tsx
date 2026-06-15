"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ExternalLink, Search, Trash2, Pencil, Loader2 } from "lucide-react";
import type { AppDefinition } from "@/data/apps";

const STATUS_STYLES = {
  live: "bg-emerald-100 text-emerald-700",
  beta: "bg-blue-100 text-blue-700",
  "coming-soon": "bg-amber-100 text-amber-700",
  internal: "bg-slate-100 text-slate-700",
};

const STATUS_LABELS = { live: "Live", beta: "Beta", "coming-soon": "Coming Soon", internal: "Internal" };

export default function AdminAppsPage() {
  const [apps, setApps] = useState<AppDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  async function loadApps() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/apps");
      if (res.ok) setApps(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadApps(); }, []);

  async function handleDelete(slug: string, name: string) {
    if (!confirm(`Delete "${name}"? This is permanent.`)) return;
    setDeleting(slug);
    await fetch(`/api/admin/apps/${slug}`, { method: "DELETE" });
    setApps((prev) => prev.filter((a) => a.slug !== slug));
    setDeleting(null);
  }

  const filtered = apps.filter((a) => {
    const matchesSearch = filter === "" || a.name.toLowerCase().includes(filter.toLowerCase()) || a.category.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Apps</h1>
          <p className="text-sm text-slate-500 mt-1">{apps.length} apps total</p>
        </div>
        <Link
          href="/admin/apps/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#F97316] hover:bg-[#ea6b0e] text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <Plus size={14} /> New App
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search apps…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
        >
          <option value="all">All statuses</option>
          <option value="live">Live</option>
          <option value="beta">Beta</option>
          <option value="coming-soon">Coming Soon</option>
          <option value="internal">Internal</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-6 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">App</th>
              <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Category</th>
              <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3.5 font-semibold text-slate-500 text-xs uppercase tracking-wide">Primary CTA</th>
              <th className="px-4 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  <Loader2 size={20} className="animate-spin mx-auto mb-2" />
                  Loading apps…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No apps found</td>
              </tr>
            ) : (
              filtered.map((app) => (
                <tr key={app.slug} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{app.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">{app.tagline}</div>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{app.category}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[app.status as keyof typeof STATUS_STYLES] || "bg-slate-100 text-slate-600"}`}>
                      {STATUS_LABELS[app.status as keyof typeof STATUS_LABELS] || app.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-500 text-xs font-mono">{app.primaryCTA?.href}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/apps/${app.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
                        title="View live"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <Link
                        href={`/admin/apps/${app.slug}`}
                        className="p-1.5 text-slate-400 hover:text-[#F97316] rounded-md hover:bg-orange-50 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(app.slug, app.name)}
                        disabled={deleting === app.slug}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === app.slug ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
