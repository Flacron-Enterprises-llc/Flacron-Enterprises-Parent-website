"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppWindow, Rocket, Clock, FlaskConical, Plus, RefreshCw, ExternalLink, Inbox } from "lucide-react";
import type { AppDefinition } from "@/data/apps";

const STATUS_CONFIG = {
  live: { label: "Live", color: "bg-emerald-100 text-emerald-700", icon: Rocket },
  beta: { label: "Beta", color: "bg-blue-100 text-blue-700", icon: FlaskConical },
  "coming-soon": { label: "Coming Soon", color: "bg-amber-100 text-amber-700", icon: Clock },
  internal: { label: "Internal", color: "bg-slate-100 text-slate-700", icon: AppWindow },
};

export default function AdminDashboard() {
  const [apps, setApps] = useState<AppDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");
  const [newLeads, setNewLeads] = useState<number | null>(null);

  async function loadApps() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/apps");
      if (res.ok) setApps(await res.json());
    } finally {
      setLoading(false);
    }
  }

  async function handleSeed() {
    setSeeding(true);
    setSeedMsg("");
    const res = await fetch("/api/admin/seed", { method: "POST" });
    const data = await res.json();
    setSeeding(false);
    if (res.ok) {
      setSeedMsg(`Seeded ${data.seeded} apps to Firebase`);
      loadApps();
    } else {
      setSeedMsg(data.error || "Seed failed");
    }
  }

  useEffect(() => {
    loadApps();
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNewLeads(data.filter((l: { status: string }) => l.status === "new").length);
        }
      })
      .catch(() => {});
  }, []);

  const counts = {
    live: apps.filter((a) => a.status === "live").length,
    beta: apps.filter((a) => a.status === "beta").length,
    "coming-soon": apps.filter((a) => a.status === "coming-soon").length,
    internal: apps.filter((a) => a.status === "internal").length,
  };

  const statCards = [
    { label: "Total Apps", value: apps.length, icon: AppWindow, color: "text-slate-700", bg: "bg-slate-50", href: "/admin/apps" },
    { label: "Live", value: counts.live, icon: Rocket, color: "text-emerald-700", bg: "bg-emerald-50", href: "/admin/apps" },
    { label: "Beta / Dev", value: counts.beta + counts["coming-soon"], icon: FlaskConical, color: "text-blue-700", bg: "bg-blue-50", href: "/admin/apps" },
    { label: "New Leads", value: newLeads ?? "—", icon: Inbox, color: "text-orange-600", bg: "bg-orange-50", href: "/admin/leads" },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your Flacron Enterprises platform</p>
        </div>
        <div className="flex gap-3">
          {apps.length === 0 && !loading && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
            >
              <RefreshCw size={14} className={seeding ? "animate-spin" : ""} />
              {seeding ? "Seeding…" : "Seed from static data"}
            </button>
          )}
          <Link
            href="/admin/apps/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#F97316] hover:bg-[#ea6b0e] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <Plus size={14} />
            New App
          </Link>
        </div>
      </div>

      {seedMsg && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-700">
          {seedMsg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-[#F97316]/40 hover:shadow-sm transition-all group">
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${bg} mb-3`}>
              <Icon size={16} className={color} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{loading && label !== "New Leads" ? "—" : value}</div>
            <div className="text-sm text-slate-500 mt-0.5 group-hover:text-[#F97316] transition-colors">{label}</div>
          </Link>
        ))}
      </div>

      {/* Apps list */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">All Apps</h2>
          <Link href="/admin/apps" className="text-sm text-[#F97316] hover:underline font-medium">
            Manage →
          </Link>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">Loading…</div>
        ) : apps.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-slate-500 text-sm mb-4">No apps in Firebase yet.</p>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-60"
            >
              <RefreshCw size={14} className={seeding ? "animate-spin" : ""} />
              {seeding ? "Seeding…" : "Import existing apps"}
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {apps.map((app) => {
              const cfg = STATUS_CONFIG[app.status as keyof typeof STATUS_CONFIG];
              return (
                <div key={app.slug} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900 text-sm">{app.name}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg?.color}`}>
                        {cfg?.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{app.tagline}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{app.category}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/apps/${app.slug}`}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
                    >
                      <ExternalLink size={14} />
                    </Link>
                    <Link
                      href={`/admin/apps/${app.slug}`}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
