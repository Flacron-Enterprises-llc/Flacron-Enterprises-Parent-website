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

  return (
    <AuthSplitLayout>
      <p className="mb-2 text-sm font-semibold text-accent-text">API Engine</p>
      <h2 className="mb-8 font-display text-2xl font-semibold tracking-[-0.02em] text-text sm:text-3xl">
        Sign in with your API key
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="api-key" className="field-label">API key</label>
          <div className="relative">
            <input
              id="api-key"
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="field pr-11 font-mono text-sm"
              placeholder="flcr-••••••••••••••••••••••••••••••••"
              autoComplete="current-password"
              spellCheck={false}
              required
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-text-muted hover:text-text"
              aria-label={showKey ? "Hide key" : "Show key"}
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={submitting || !apiKey.trim()} className="btn btn-primary btn-lg w-full">
          {submitting ? "Connecting…" : "Connect"}
          {!submitting && <ArrowRight aria-hidden className="h-4 w-4" />}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-text-muted">
          <ShieldCheck aria-hidden className="h-3.5 w-3.5 text-success" />
          Your key is verified directly by the API Engine gateway
        </p>

        <p className="border-t border-border pt-4 text-center text-sm text-text-muted">
          Don&apos;t have an API key yet?{" "}
          <Link href="/ai-engine/api-access" className="link-accent">
            Request access
          </Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
}
