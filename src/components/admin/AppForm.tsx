"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, ArrowLeft, Loader2 } from "lucide-react";
import type { AppDefinition, AppFeature, AppFAQ } from "@/data/apps";

const CATEGORIES = ["Construction", "Business", "Finance", "Growth", "Security", "Sports", "Insurance"] as const;
const STATUSES = [
  { value: "live", label: "Live", color: "text-emerald-600" },
  { value: "beta", label: "Beta", color: "text-blue-600" },
  { value: "coming-soon", label: "Coming Soon", color: "text-amber-600" },
  { value: "internal", label: "Internal", color: "text-slate-600" },
] as const;

const TABS = ["Basic", "Content", "Features", "Benefits & FAQs", "CTAs & URLs", "SEO"] as const;

function arrayField(items: string[], onChange: (v: string[]) => void, placeholder: string) {
  function add() { onChange([...items, ""]); }
  function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)); }
  function update(i: number, v: string) {
    const next = [...items];
    next[i] = v;
    onChange(next);
  }
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
            placeholder={placeholder}
          />
          <button type="button" onClick={() => remove(i)} className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-[#F97316] hover:text-[#ea6b0e] font-medium">
        <Plus size={14} /> Add item
      </button>
    </div>
  );
}

const EMPTY_APP: Partial<AppDefinition> = {
  id: "",
  slug: "",
  name: "",
  tagline: "",
  shortDescription: "",
  longDescription: "",
  category: "Business",
  status: "coming-soon",
  targetAudience: [],
  industries: [],
  features: [],
  benefits: [],
  useCases: [],
  problem: "",
  solution: "",
  techStack: [],
  faqs: [],
  primaryCTA: { label: "Learn More", href: "/contact" },
  seo: { title: "", description: "", keywords: [] },
};

interface Props {
  initial?: AppDefinition;
  isNew?: boolean;
}

export default function AppForm({ initial, isNew = false }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<typeof TABS[number]>("Basic");
  const [app, setApp] = useState<Partial<AppDefinition>>(initial ?? EMPTY_APP);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function set<K extends keyof AppDefinition>(key: K, value: AppDefinition[K]) {
    setApp((prev) => ({ ...prev, [key]: value }));
  }

  function setNested<K extends keyof AppDefinition>(key: K, subKey: string, value: unknown) {
    setApp((prev) => ({ ...prev, [key]: { ...(prev[key] as Record<string, unknown>), [subKey]: value } }));
  }

  async function handleSave() {
    if (!app.slug || !app.name) { setError("Name and slug are required"); return; }
    setSaving(true);
    setError("");
    setSuccess("");

    const url = isNew ? "/api/admin/apps" : `/api/admin/apps/${initial?.slug}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(app),
    });

    setSaving(false);

    if (res.ok) {
      setSuccess("Saved successfully");
      if (isNew) router.push(`/admin/apps/${app.slug}`);
    } else {
      const data = await res.json();
      setError(data.error || "Save failed");
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${app.name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/apps/${initial?.slug}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/apps");
    else setError("Delete failed");
  }

  const field = (label: string, key: keyof AppDefinition, type: "text" | "textarea" = "text", required = false) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          value={(app[key] as string) || ""}
          onChange={(e) => set(key, e.target.value as AppDefinition[typeof key])}
          rows={4}
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] resize-none"
        />
      ) : (
        <input
          type="text"
          value={(app[key] as string) || ""}
          onChange={(e) => set(key, e.target.value as AppDefinition[typeof key])}
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
        />
      )}
    </div>
  );

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{isNew ? "Add New App" : `Edit: ${initial?.name}`}</h1>
          {!isNew && <p className="text-sm text-slate-400 mt-0.5">slug: {initial?.slug}</p>}
        </div>
        <div className="flex gap-3">
          {!isNew && (
            <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200">
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-[#F97316] hover:bg-[#ea6b0e] disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}
      {success && <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-600">{success}</div>}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        {/* BASIC TAB */}
        {tab === "Basic" && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {field("App Name", "name", "text", true)}
              {field("Slug (URL key)", "slug", "text", true)}
            </div>
            {field("Tagline", "tagline")}
            {field("Short Description", "shortDescription", "textarea")}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                <select
                  value={app.category || "Business"}
                  onChange={(e) => set("category", e.target.value as AppDefinition["category"])}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <select
                  value={app.status || "coming-soon"}
                  onChange={(e) => set("status", e.target.value as AppDefinition["status"])}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                >
                  {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Metrics (optional)</label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={app.metrics?.label || ""}
                  onChange={(e) => setNested("metrics", "label", e.target.value)}
                  placeholder="Label (e.g. Active Projects)"
                  className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                />
                <input
                  type="text"
                  value={app.metrics?.value || ""}
                  onChange={(e) => setNested("metrics", "value", e.target.value)}
                  placeholder="Value (e.g. 2,400+)"
                  className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Audience</label>
              {arrayField(app.targetAudience || [], (v) => set("targetAudience", v), "e.g. General Contractors")}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Industries</label>
              {arrayField(app.industries || [], (v) => set("industries", v), "e.g. Construction")}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tech Stack</label>
              {arrayField(app.techStack || [], (v) => set("techStack", v), "e.g. Next.js")}
            </div>
          </>
        )}

        {/* CONTENT TAB */}
        {tab === "Content" && (
          <>
            {field("Long Description", "longDescription", "textarea")}
            {field("Problem Statement", "problem", "textarea")}
            {field("Solution Statement", "solution", "textarea")}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Use Cases</label>
              {arrayField(app.useCases || [], (v) => set("useCases", v), "e.g. Residential renovation cost estimation")}
            </div>
          </>
        )}

        {/* FEATURES TAB */}
        {tab === "Features" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-900">Features</h3>
              <button
                type="button"
                onClick={() => set("features", [...(app.features || []), { title: "", description: "", icon: "" }])}
                className="flex items-center gap-1.5 text-sm text-[#F97316] font-medium"
              >
                <Plus size={14} /> Add Feature
              </button>
            </div>
            {(app.features || []).map((f: AppFeature, i: number) => (
              <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Feature {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => set("features", (app.features || []).filter((_, idx) => idx !== i))}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={f.title}
                    onChange={(e) => {
                      const next = [...(app.features || [])];
                      next[i] = { ...next[i], title: e.target.value };
                      set("features", next);
                    }}
                    placeholder="Feature title"
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                  />
                  <input
                    value={f.icon}
                    onChange={(e) => {
                      const next = [...(app.features || [])];
                      next[i] = { ...next[i], icon: e.target.value };
                      set("features", next);
                    }}
                    placeholder="Lucide icon name (e.g. Calculator)"
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                  />
                </div>
                <textarea
                  value={f.description}
                  onChange={(e) => {
                    const next = [...(app.features || [])];
                    next[i] = { ...next[i], description: e.target.value };
                    set("features", next);
                  }}
                  placeholder="Feature description"
                  rows={2}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] resize-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* BENEFITS & FAQS TAB */}
        {tab === "Benefits & FAQs" && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-900">Benefits</h3>
                <button
                  type="button"
                  onClick={() => set("benefits", [...(app.benefits || []), { title: "", description: "" }])}
                  className="flex items-center gap-1.5 text-sm text-[#F97316] font-medium"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
              {(app.benefits || []).map((b, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Benefit {i + 1}</span>
                    <button type="button" onClick={() => set("benefits", (app.benefits || []).filter((_, idx) => idx !== i))} className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <input
                    value={b.title}
                    onChange={(e) => { const n = [...(app.benefits || [])]; n[i] = { ...n[i], title: e.target.value }; set("benefits", n); }}
                    placeholder="Benefit title"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                  />
                  <input
                    value={b.description}
                    onChange={(e) => { const n = [...(app.benefits || [])]; n[i] = { ...n[i], description: e.target.value }; set("benefits", n); }}
                    placeholder="Benefit description"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                  />
                </div>
              ))}
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-900">FAQs</h3>
                <button
                  type="button"
                  onClick={() => set("faqs", [...(app.faqs || []), { question: "", answer: "" }])}
                  className="flex items-center gap-1.5 text-sm text-[#F97316] font-medium"
                >
                  <Plus size={14} /> Add FAQ
                </button>
              </div>
              {(app.faqs || []).map((faq: AppFAQ, i: number) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">FAQ {i + 1}</span>
                    <button type="button" onClick={() => set("faqs", (app.faqs || []).filter((_, idx) => idx !== i))} className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <input
                    value={faq.question}
                    onChange={(e) => { const n = [...(app.faqs || [])]; n[i] = { ...n[i], question: e.target.value }; set("faqs", n); }}
                    placeholder="Question"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => { const n = [...(app.faqs || [])]; n[i] = { ...n[i], answer: e.target.value }; set("faqs", n); }}
                    placeholder="Answer"
                    rows={2}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] resize-none"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTAs TAB */}
        {tab === "CTAs & URLs" && (
          <>
            <div>
              <h3 className="font-medium text-slate-900 mb-4">Primary CTA <span className="text-red-400">*</span></h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Button Label</label>
                  <input
                    value={app.primaryCTA?.label || ""}
                    onChange={(e) => setNested("primaryCTA", "label", e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                    placeholder="e.g. Start Free Trial"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">URL / Path</label>
                  <input
                    value={app.primaryCTA?.href || ""}
                    onChange={(e) => setNested("primaryCTA", "href", e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                    placeholder="/book-demo"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-slate-900 mb-4">Secondary CTA (optional)</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Button Label</label>
                  <input
                    value={app.secondaryCTA?.label || ""}
                    onChange={(e) => setNested("secondaryCTA", "label", e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                    placeholder="e.g. Book a Demo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">URL / Path</label>
                  <input
                    value={app.secondaryCTA?.href || ""}
                    onChange={(e) => setNested("secondaryCTA", "href", e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                    placeholder="/book-demo"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Demo URL (optional)</label>
              <input
                value={app.demoURL || ""}
                onChange={(e) => set("demoURL", e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                placeholder="https://demo.yourapp.com or /book-demo"
              />
            </div>
          </>
        )}

        {/* SEO TAB */}
        {tab === "SEO" && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">SEO Title</label>
              <input
                value={app.seo?.title || ""}
                onChange={(e) => setNested("seo", "title", e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                placeholder="App Name — Tagline | Flacron Enterprises"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
              <textarea
                value={app.seo?.description || ""}
                onChange={(e) => setNested("seo", "description", e.target.value)}
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Keywords</label>
              {arrayField(app.seo?.keywords || [], (v) => setNested("seo", "keywords", v), "e.g. construction software")}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
