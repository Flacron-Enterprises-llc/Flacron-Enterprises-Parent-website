"use client";

import { useEffect, useState } from "react";
import { Check, Sparkles, Eye } from "lucide-react";

type Profile = {
  region: string;
  units: "imperial" | "metric";
  currency: string;
  markupPercent: number;
  notes: string;
};

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/customer/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setProfile(data?.profile ?? null));
  }, []);

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/customer/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  if (!profile) return <div className="p-6 text-sm text-slate-400">Loading…</div>;

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE4705]/30 focus:border-[#FE4705]";

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
          <Sparkles size={18} className="text-[#FE4705]" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-flacron-navy">Personalization</h1>
          <p className="text-sm text-slate-500">
            This context is automatically injected into every AI request so outputs reflect your business.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4 h-fit">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Region</label>
              <input
                value={profile.region}
                onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                className={inputClass}
                placeholder="e.g. Northeast US"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Currency</label>
              <input
                value={profile.currency}
                onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                className={inputClass}
                placeholder="USD"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Units</label>
              <select
                value={profile.units}
                onChange={(e) => setProfile({ ...profile, units: e.target.value as "imperial" | "metric" })}
                className={inputClass}
              >
                <option value="imperial">Imperial (ft, sq ft)</option>
                <option value="metric">Metric (m, sq m)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Default markup (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={profile.markupPercent}
                onChange={(e) => setProfile({ ...profile, markupPercent: Number(e.target.value) })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Business notes</label>
            <textarea
              value={profile.notes}
              onChange={(e) => setProfile({ ...profile, notes: e.target.value })}
              rows={4}
              placeholder="Preferred suppliers, typical project types, anything the AI should know about how you work…"
              className={inputClass + " resize-none"}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="ripple-btn flex items-center gap-2 rounded-xl bg-[#FE4705] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#D83C04] disabled:opacity-60 transition-colors shadow-[0_4px_16px_rgba(254, 71, 5,0.2)]"
          >
            {saved ? <Check size={16} /> : null}
            {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
          </button>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm h-fit">
          <div className="mb-3 flex items-center gap-2">
            <Eye size={15} className="text-[#FE4705]" />
            <h2 className="text-sm font-bold text-flacron-navy">Live preview</h2>
          </div>
          <p className="mb-3 text-xs text-slate-400">This is the context injected before every AI request:</p>
          <div className="rounded-xl bg-flacron-navy text-slate-300 text-[11px] leading-relaxed p-4 space-y-1">
            <p>Region: <span className="text-white">{profile.region || "—"}</span></p>
            <p>Units: <span className="text-white">{profile.units === "imperial" ? "imperial (ft, sq ft)" : "metric (m, sq m)"}</span></p>
            <p>Currency: <span className="text-white">{profile.currency || "—"}</span></p>
            <p>Markup: <span className="text-[#FE4705] font-semibold">{profile.markupPercent}%</span></p>
            {profile.notes && <p className="pt-1 text-slate-400 italic">&ldquo;{profile.notes}&rdquo;</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
