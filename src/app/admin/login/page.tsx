"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-3xl font-black tracking-wider text-[#F97316]">FLACRON</span>
          <p className="mt-1 text-slate-400 text-sm font-medium">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1e293b] rounded-2xl p-8 shadow-2xl border border-white/5">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center">
              <Lock size={20} className="text-[#F97316]" />
            </div>
          </div>

          <h1 className="text-white text-xl font-bold text-center mb-6">Sign in to Admin</h1>

          <label className="block mb-1.5 text-sm font-medium text-slate-400">Password</label>
          <div className="relative mb-4">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0f172a] text-white border border-white/10 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] placeholder:text-slate-600"
              placeholder="Enter admin password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#F97316] hover:bg-[#ea6b0e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 text-sm transition-colors"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
