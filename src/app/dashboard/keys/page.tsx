"use client";

import { useEffect, useState } from "react";
import { KeyRound, Plus, Trash2, Copy, Check, ShieldCheck } from "lucide-react";

type ApiKey = {
  id: string;
  label: string;
  maskedKey: string;
  createdAt: number;
  revoked: boolean;
  lastUsedAt: number | null;
};

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function loadKeys() {
    const res = await fetch("/api/customer/keys");
    if (res.ok) {
      const data = await res.json();
      setKeys(data.keys);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadKeys();
  }, []);

  async function handleCreate() {
    setCreating(true);
    const res = await fetch("/api/customer/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: label || "Untitled key" }),
    });
    setCreating(false);
    if (res.ok) {
      const data = await res.json();
      setNewKey(data.key);
      setLabel("");
      loadKeys();
    }
  }

  async function handleRevoke(id: string) {
    if (!confirm("Revoke this API key? Any application using it will stop working immediately.")) return;
    await fetch(`/api/customer/keys/${id}`, { method: "DELETE" });
    loadKeys();
  }

  function handleCopy() {
    if (!newKey) return;
    navigator.clipboard.writeText(newKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const activeCount = keys.filter((k) => !k.revoked).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-flacron-navy mb-1">API Keys</h1>
          <p className="text-sm text-slate-500">Create and manage keys used to authenticate calls to the Flacron AI Engine API.</p>
        </div>
        {!loading && keys.length > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 shrink-0">
            <ShieldCheck size={13} /> {activeCount} active
          </span>
        )}
      </div>

      {newKey && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-bold text-emerald-800 mb-1">Copy your key now — it won&apos;t be shown again</p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 truncate rounded-lg bg-white border border-emerald-200 px-3 py-2 text-xs text-flacron-navy">{newKey}</code>
            <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <button onClick={() => setNewKey(null)} className="mt-3 text-xs font-medium text-emerald-700 hover:underline">
            I&apos;ve saved it — dismiss
          </button>
        </div>
      )}

      <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Key label (e.g. Production server)"
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE4705]/30 focus:border-[#FE4705]"
        />
        <button
          onClick={handleCreate}
          disabled={creating}
          className="ripple-btn flex items-center justify-center gap-2 rounded-xl bg-[#FE4705] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#D83C04] disabled:opacity-60 transition-colors shadow-[0_4px_16px_rgba(254, 71, 5,0.2)]"
        >
          <Plus size={16} />
          {creating ? "Creating…" : "New Key"}
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        {loading ? (
          <p className="p-5 text-sm text-slate-400">Loading…</p>
        ) : keys.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
              <KeyRound className="h-6 w-6 text-[#FE4705]" />
            </div>
            <p className="text-sm text-slate-400">No API keys yet. Create one to start calling the API.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {keys.map((k) => (
              <li key={k.id} className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${k.revoked ? "bg-slate-100" : "bg-orange-50"}`}>
                    <KeyRound size={15} className={k.revoked ? "text-slate-400" : "text-[#FE4705]"} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-flacron-navy truncate">{k.label}</p>
                      <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${k.revoked ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"}`}>
                        {k.revoked ? "Revoked" : "Active"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono truncate">{k.maskedKey}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Created {new Date(k.createdAt).toLocaleDateString()}
                      {k.lastUsedAt && ` · Last used ${new Date(k.lastUsedAt).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                {!k.revoked && (
                  <button onClick={() => handleRevoke(k.id)} className="shrink-0 p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
