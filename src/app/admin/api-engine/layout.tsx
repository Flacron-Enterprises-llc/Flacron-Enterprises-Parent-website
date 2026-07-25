"use client";

import { useEffect, useState } from "react";
import { Mail, Lock, AlertCircle, ArrowRight, LogOut, Zap } from "lucide-react";
import { login, getMe } from "@/lib/api-engine/endpoints";
import type { AdminUser } from "@/lib/api-engine/endpoints";
import { apiEngineTokenKey } from "@/lib/api-engine/client";
import "./styles.css";

function LoginForm({ onLogin }: { onLogin: (admin: AdminUser) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await login(email, password);
      localStorage.setItem(apiEngineTokenKey, res.data.token);
      onLogin(res.data.admin);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message ?? "Invalid credentials, or the API Engine backend is unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fae-login-wrap">
      <div className="fae-login-card">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, var(--fae-accent-primary), var(--fae-accent-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <Zap size={24} color="#fff" />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--fae-text-primary)" }}>API Engine Admin</h2>
          <p style={{ fontSize: 13, color: "var(--fae-text-muted)" }}>Sign in with your API Engine admin account</p>
        </div>

        {error && (
          <div className="login-error">
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="fae-login-email">
              Email Address
            </label>
            <div className="login-input-wrap">
              <Mail />
              <input
                id="fae-login-email"
                type="email"
                className="form-input"
                placeholder="admin@flacron.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="fae-login-password">
              Password
            </label>
            <div className="login-input-wrap">
              <Lock />
              <input
                id="fae-login-password"
                type="password"
                className="form-input"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? "Authenticating…" : (
              <>
                Sign In
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ApiEngineLayout({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  const checkSession = async () => {
    const token = localStorage.getItem(apiEngineTokenKey);
    if (!token) {
      setChecking(false);
      return;
    }
    try {
      const res = await getMe();
      setAdmin(res.data);
    } catch {
      localStorage.removeItem(apiEngineTokenKey);
      setAdmin(null);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(apiEngineTokenKey);
    setAdmin(null);
  };

  return (
    <div className="fae-root">
      {checking ? (
        <div className="loading-center">
          <div className="loading-spinner" />
        </div>
      ) : !admin ? (
        <LoginForm onLogin={setAdmin} />
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 32px 0" }}>
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              <LogOut size={12} />
              Sign out of API Engine ({admin.email})
            </button>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
