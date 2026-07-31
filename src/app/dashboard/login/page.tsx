"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthSplitLayout from "@/components/AuthSplitLayout";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/customer/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  }

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-flacron-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FE4705]/30 focus:border-[#FE4705] transition-colors";

  return (
    <AuthSplitLayout>
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#FE4705]">Welcome back</p>
      <h2 className="mb-8 text-2xl font-black text-flacron-navy" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
        Sign in to your dashboard
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass + " pr-10"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !password || !email}
          className="ripple-btn flex w-full items-center justify-center gap-2 rounded-xl bg-[#FE4705] py-3.5 text-sm font-semibold text-white hover:bg-[#D83C04] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_4px_20px_rgba(254, 71, 5,0.25)]"
        >
          {loading ? "Signing in…" : "Sign In"}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>

        <p className="text-center text-xs text-slate-400">
          Don&apos;t have login details? Request access via{" "}
          <Link href="/ai-engine/api-access" className="font-semibold text-[#FE4705] hover:underline">API Access</Link>{" "}
          or{" "}
          <Link href="/custom-order" className="font-semibold text-[#FE4705] hover:underline">Custom Order</Link>.
        </p>
        <p className="mt-3 text-center text-xs text-slate-400">
          Looking for API Engine?{" "}
          <Link href="/ai-engine/login" className="font-semibold text-[#FE4705] hover:underline">Sign in with your API key</Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
}
