"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Eye,
  PauseCircle,
  RefreshCw,
  Activity,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Copy,
  Check,
} from "lucide-react";
import { getClients, pauseClient, reactivateClient, createClient } from "@/lib/api-engine/endpoints";
import type { Client } from "@/lib/api-engine/endpoints";
import StatusBadge from "../_components/StatusBadge";
import UsageBar from "../_components/UsageBar";
import ConfirmModal from "../_components/ConfirmModal";

interface Toast {
  id: number;
  type: "success" | "error";
  message: string;
}

const PAGE_SIZE = 10;

export default function ClientsListPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmAction, setConfirmAction] = useState<{ client: Client; action: "pause" | "reactivate" } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newClientResult, setNewClientResult] = useState<{ company_name: string; api_key: string } | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [planName, setPlanName] = useState("starter");
  const [monthlyLimit, setMonthlyLimit] = useState("500");
  const [rateLimit, setRateLimit] = useState("30");
  const [overageEnabled, setOverageEnabled] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const handlePlanChange = (plan: string) => {
    setPlanName(plan);
    if (plan === "starter") {
      setMonthlyLimit("500");
      setRateLimit("30");
    } else if (plan === "professional") {
      setMonthlyLimit("5000");
      setRateLimit("100");
    } else {
      setMonthlyLimit("50000");
      setRateLimit("500");
    }
  };

  const addToast = (type: "success" | "error", message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      const res = await createClient({
        company_name: companyName,
        contact_email: contactEmail,
        plan_name: planName,
        monthly_api_limit: parseInt(monthlyLimit, 10),
        rate_limit_per_minute: parseInt(rateLimit, 10),
        overage_enabled: overageEnabled,
      });

      addToast("success", `Client "${companyName}" registered! Email notification dispatched.`);
      setNewClientResult({ company_name: res.data.company_name, api_key: res.data.api_key });

      setCompanyName("");
      setContactEmail("");
      setPlanName("starter");
      setMonthlyLimit("500");
      setRateLimit("30");
      setOverageEnabled(false);

      setShowCreateModal(false);
      fetchClients();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      addToast("error", axiosErr?.response?.data?.message ?? "Failed to register client.");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleCopyKey = () => {
    if (!newClientResult) return;
    navigator.clipboard.writeText(newClientResult.api_key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const fetchClients = async () => {
    try {
      const res = await getClients();
      setClients(res.data);
    } catch {
      addToast("error", "Failed to load clients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return c.company_name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleAction = async () => {
    if (!confirmAction) return;
    setActionLoading(true);
    try {
      if (confirmAction.action === "pause") {
        await pauseClient(confirmAction.client.id);
        addToast("success", `${confirmAction.client.company_name} paused.`);
      } else {
        await reactivateClient(confirmAction.client.id);
        addToast("success", `${confirmAction.client.company_name} reactivated.`);
      }
      setConfirmAction(null);
      fetchClients();
    } catch {
      addToast("error", "Action failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Clients</h1>
          <p className="page-subtitle">
            {clients.length} total clients · {clients.filter((c) => c.billing_status === "active").length} active
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div className="search-wrap">
            <Search />
            <input className="search-input" placeholder="Search by company or email…" value={search} onChange={(e) => handleSearch(e.target.value)} />
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)}>
            <Plus size={14} />
            Add Client
          </button>
          <button className="btn btn-secondary btn-sm" onClick={fetchClients}>
            <RefreshCw size={14} />
            Refresh
          </button>
          <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--fae-text-muted)" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading-center">
            <div className="loading-spinner" />
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Usage</th>
                    <th>Features</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "48px 16px", color: "var(--fae-text-muted)" }}>
                        No clients found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((c) => (
                      <tr key={c.id} onClick={() => router.push(`/admin/api-engine/clients/${c.id}`)}>
                        <td>
                          <div className="td-company">{c.company_name}</div>
                          <div className="td-email">{c.email}</div>
                        </td>
                        <td>
                          <span className="badge badge-plan">{c.plan_name}</span>
                        </td>
                        <td>
                          <StatusBadge status={c.billing_status} />
                        </td>
                        <td>
                          <UsageBar value={c.current_usage ?? 0} max={c.monthly_api_limit ?? 1} />
                        </td>
                        <td>
                          <span style={{ fontSize: 12, color: "var(--fae-text-muted)" }}>{(c.enabled_features ?? []).length} / 8</span>
                        </td>
                        <td>
                          <div className="gap-10" style={{ gap: 6 }} onClick={(e) => e.stopPropagation()}>
                            <button className="btn btn-secondary btn-sm" onClick={() => router.push(`/admin/api-engine/clients/${c.id}`)}>
                              <Eye size={12} />
                              View
                            </button>
                            {c.billing_status === "paused" ? (
                              <button className="btn btn-success btn-sm" onClick={() => setConfirmAction({ client: c, action: "reactivate" })}>
                                <RefreshCw size={12} />
                                Reactivate
                              </button>
                            ) : (
                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() => setConfirmAction({ client: c, action: "pause" })}
                                disabled={c.billing_status === "cancelled"}
                              >
                                <PauseCircle size={12} />
                                Pause
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <span className="pagination-info">
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </span>
              <div className="pagination-controls">
                <button className="page-btn" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const pg = i + 1;
                  return (
                    <button key={pg} className={`page-btn ${pg === page ? "active" : ""}`} onClick={() => setPage(pg)}>
                      {pg}
                    </button>
                  );
                })}
                <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {confirmAction && (
        <ConfirmModal
          title={confirmAction.action === "pause" ? "Pause Client?" : "Reactivate Client?"}
          message={
            confirmAction.action === "pause"
              ? `This will suspend API access for ${confirmAction.client.company_name}.`
              : `This will restore API access for ${confirmAction.client.company_name}.`
          }
          confirmLabel={confirmAction.action === "pause" ? "Yes, Pause" : "Yes, Reactivate"}
          danger={confirmAction.action === "pause"}
          loading={actionLoading}
          onConfirm={handleAction}
          onCancel={() => setConfirmAction(null)}
        />
      )}

      {showCreateModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 16,
          }}
        >
          <div className="card" style={{ width: "100%", maxWidth: 500, padding: 24, position: "relative" }}>
            <button
              onClick={() => setShowCreateModal(false)}
              style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", color: "var(--fae-text-muted)", cursor: "pointer" }}
            >
              <X size={18} />
            </button>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--fae-text-primary)", marginBottom: 20 }}>Register New Client</h2>

            <form onSubmit={handleCreateClient}>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. dev@acme.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Plan Tier</label>
                <select className="form-select" value={planName} onChange={(e) => handlePlanChange(e.target.value)}>
                  <option value="starter">Starter</option>
                  <option value="professional">Professional</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="white_label">White-Label</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Monthly Call Limit</label>
                  <input type="number" className="form-input" value={monthlyLimit} onChange={(e) => setMonthlyLimit(e.target.value)} min="0" required />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Rate Limit (RPM)</label>
                  <input type="number" className="form-input" value={rateLimit} onChange={(e) => setRateLimit(e.target.value)} min="1" required />
                </div>
              </div>

              <div className="form-group" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="checkbox"
                  id="overage-check"
                  checked={overageEnabled}
                  onChange={(e) => setOverageEnabled(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "var(--fae-accent-primary)" }}
                />
                <label htmlFor="overage-check" className="form-label" style={{ marginBottom: 0, cursor: "pointer" }}>
                  Enable Plan Overage (Charged per call)
                </label>
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24 }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowCreateModal(false)} disabled={createLoading}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={createLoading}>
                  {createLoading ? "Registering..." : "Register Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {newClientResult && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 16,
          }}
        >
          <div className="card" style={{ width: "100%", maxWidth: 500, padding: 24, position: "relative" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--fae-text-primary)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <Check size={20} style={{ color: "var(--fae-status-active)" }} />
              Client Registered Successfully!
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--fae-text-secondary)", marginBottom: 20 }}>
              An email notification has been dispatched to <strong>{contactEmail}</strong> with login links and plan instructions.
            </p>

            <div style={{ background: "var(--fae-bg-secondary)", border: "1px solid var(--fae-border)", borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--fae-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                Plaintext API Key (Shown Once)
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    flex: 1,
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    color: "var(--fae-accent-primary)",
                    background: "rgba(0,0,0,0.03)",
                    border: "1px solid var(--fae-border)",
                    borderRadius: 6,
                    padding: "10px 12px",
                    wordBreak: "break-all",
                  }}
                >
                  {newClientResult.api_key}
                </div>
                <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0, padding: 10 }} onClick={handleCopyKey} title="Copy Key">
                  {copiedKey ? <Check size={16} style={{ color: "var(--fae-status-active)" }} /> : <Copy size={16} />}
                </button>
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--fae-status-cancelled)", marginTop: 8, fontWeight: 600 }}>
                Please relay this key to the client immediately. For security, it will not be displayed again.
              </div>
            </div>

            <button className="btn btn-primary btn-full" onClick={() => setNewClientResult(null)}>
              Done & Close
            </button>
          </div>
        </div>
      )}

      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.type === "success" ? <Activity size={16} /> : <AlertTriangle size={16} />}
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
