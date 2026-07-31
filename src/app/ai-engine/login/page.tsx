"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import AuthSplitLayout from "@/components/AuthSplitLayout";

export default function AiEngineLoginPage() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = apiKey.trim();
    if (!trimmed) return;
    setSubmitting(true);
    window.location.href = `https://flacronapi.com/login?key=${encodeURIComponent(trimmed)}`;
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm font-mono text-flacron-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FE4705]/30 focus:border-[#FE4705] transition-colors";

  return (
    <AuthSplitLayout>
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#FE4705]">API Engine</p>
      <h2
        className="mb-8 text-2xl font-black text-flacron-navy"
        style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
      >
        Sign in with your API key
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-flacron-navy">API key</label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={inputClass}
              placeholder="flcr-••••••••••••••••••••••••••••••••"
              autoComplete="current-password"
              spellCheck={false}
              required
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showKey ? "Hide key" : "Show key"}
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || !apiKey.trim()}
          className="ripple-btn flex w-full items-center justify-center gap-2 rounded-xl bg-[#FE4705] py-3.5 text-sm font-semibold text-white hover:bg-[#D83C04] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Connecting…" : "Connect"}
          {!submitting && <ArrowRight className="h-4 w-4" />}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          Your key is verified directly by the API Engine gateway
        </p>

        <p className="text-center text-xs text-slate-400 pt-2 border-t border-slate-100">
          Don&apos;t have an API key yet?{" "}
          <Link href="/ai-engine/api-access" className="font-semibold text-[#FE4705] hover:underline">
            Request access
          </Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
}
