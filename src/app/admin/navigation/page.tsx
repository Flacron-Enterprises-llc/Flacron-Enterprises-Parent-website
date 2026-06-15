"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Loader2, GripVertical } from "lucide-react";

interface NavLink { label: string; href: string; }
interface NavConfig {
  navLinks: NavLink[];
  primaryCTA: NavLink;
  footerLinks: Record<string, NavLink[]>;
}

const DEFAULT_CONFIG: NavConfig = {
  navLinks: [],
  primaryCTA: { label: "Book a Demo", href: "/book-demo" },
  footerLinks: { Company: [], Explore: [], Legal: [] },
};

function LinkEditor({ links, onChange, placeholder = "e.g. /ecosystem" }: {
  links: NavLink[];
  onChange: (v: NavLink[]) => void;
  placeholder?: string;
}) {
  function add() { onChange([...links, { label: "", href: "" }]); }
  function remove(i: number) { onChange(links.filter((_, idx) => idx !== i)); }
  function update(i: number, field: keyof NavLink, value: string) {
    const next = [...links];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  }

  return (
    <div className="space-y-2">
      {links.map((link, i) => (
        <div key={i} className="flex items-center gap-2">
          <GripVertical size={14} className="text-slate-300 shrink-0" />
          <input
            value={link.label}
            onChange={(e) => update(i, "label", e.target.value)}
            placeholder="Label"
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
          />
          <input
            value={link.href}
            onChange={(e) => update(i, "href", e.target.value)}
            placeholder={placeholder}
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
          />
          <button onClick={() => remove(i)} className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 size={13} />
          </button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1.5 text-sm text-[#F97316] font-medium mt-1">
        <Plus size={13} /> Add link
      </button>
    </div>
  );
}

export default function NavigationPage() {
  const [config, setConfig] = useState<NavConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    fetch("/api/admin/navigation")
      .then((r) => r.json())
      .then((data) => { if (data) setConfig(data); })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setMsg("");
    setError("");
    const res = await fetch("/api/admin/navigation", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaving(false);
    if (res.ok) setMsg("Navigation saved successfully");
    else setError("Save failed");
  }

  function addFooterGroup() {
    if (!newGroupName.trim()) return;
    setConfig((prev) => ({
      ...prev,
      footerLinks: { ...prev.footerLinks, [newGroupName.trim()]: [] },
    }));
    setNewGroupName("");
  }

  function removeFooterGroup(group: string) {
    setConfig((prev) => {
      const next = { ...prev.footerLinks };
      delete next[group];
      return { ...prev, footerLinks: next };
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-64">
        <Loader2 size={24} className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Navigation & CTAs</h1>
          <p className="text-sm text-slate-500 mt-1">Manage navbar links, footer structure, and CTA buttons</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-[#F97316] hover:bg-[#ea6b0e] disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving…" : "Save All"}
        </button>
      </div>

      {msg && <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-600">{msg}</div>}
      {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}

      <div className="space-y-6">
        {/* Navbar links */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Navbar Links</h2>
          <LinkEditor
            links={config.navLinks || []}
            onChange={(v) => setConfig((prev) => ({ ...prev, navLinks: v }))}
          />
        </div>

        {/* Primary CTA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Primary CTA Button</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Button Label</label>
              <input
                value={config.primaryCTA?.label || ""}
                onChange={(e) => setConfig((prev) => ({ ...prev, primaryCTA: { ...prev.primaryCTA, label: e.target.value } }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                placeholder="Book a Demo"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">URL / Path</label>
              <input
                value={config.primaryCTA?.href || ""}
                onChange={(e) => setConfig((prev) => ({ ...prev, primaryCTA: { ...prev.primaryCTA, href: e.target.value } }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                placeholder="/book-demo"
              />
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-1">Footer Link Groups</h2>
          <p className="text-sm text-slate-400 mb-5">Products column is auto-generated from apps.</p>

          <div className="space-y-6">
            {Object.entries(config.footerLinks || {}).map(([group, links]) => (
              <div key={group}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-700">{group}</h3>
                  <button
                    onClick={() => removeFooterGroup(group)}
                    className="text-xs text-red-400 hover:text-red-600 font-medium"
                  >
                    Remove group
                  </button>
                </div>
                <LinkEditor
                  links={links}
                  onChange={(v) => setConfig((prev) => ({
                    ...prev,
                    footerLinks: { ...prev.footerLinks, [group]: v },
                  }))}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-slate-100 flex gap-3">
            <input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addFooterGroup()}
              placeholder="New group name (e.g. Resources)"
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
            />
            <button
              onClick={addFooterGroup}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
            >
              <Plus size={13} /> Add Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
