"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Building2,
  Calendar,
  Shield,
  Settings,
  PauseCircle,
  RefreshCw,
  Save,
  Activity,
  AlertTriangle,
  Clock,
  User,
  RotateCcw,
} from "lucide-react";
import { getClient, updateFeatures, updatePlan, updateLimits, pauseClient, reactivateClient, rotateKey } from "@/lib/api-engine/endpoints";
import type { Client } from "@/lib/api-engine/endpoints";
import StatusBadge from "../../_components/StatusBadge";
import UsageBar from "../../_components/UsageBar";
import FeatureEditor from "../../_components/FeatureEditor";
import ConfirmModal from "../../_components/ConfirmModal";
import KeyRevealModal from "../../_components/KeyRevealModal";

interface Toast {
  id: number;
  type: "success" | "error";
  message: string;
}

const PLANS = ["free", "starter", "pro", "enterprise"];

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmModal, setConfirmModal] = useState<null | { title: string; message: string; confirmLabel: string; danger: boolean; onConfirm: () => Promise<void> }>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  const [planName, setPlanName] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [rateLimitMin, setRateLimitMin] = useState("");
  const [overageEnabled, setOverageEnabled] = useState(false);
  const [planSaving, setPlanSaving] = useState(false);

  const addToast = (type: "success" | "error", message: string) => {
    const tid = Date.now();
    setToasts((t) => [...t, { id: tid, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== tid)), 3500);
  };

  const fetchClient = async () => {
    try {
      const res = await getClient(id);
      setClient(res.data);
      setPlanName(res.data.plan_name ?? "");
      setMonthlyLimit(String(res.data.monthly_api_limit ?? ""));
      setRateLimitMin(String(res.data.rate_limit_per_minute ?? ""));
      setOverageEnabled(res.data.overage_enabled ?? false);
    } catch {
      addToast("error", "Failed to load client details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSaveFeatures = async (features: string[]) => {
    await updateFeatures(id, features);
    addToast("success", "Features updated successfully.");
    fetchClient();
  };

  const handleSavePlan = async () => {
    setPlanSaving(true);
    try {
      await updatePlan(id, { plan_name: planName });
      await updateLimits(id, {
        monthly_api_limit: Number(monthlyLimit) || undefined,
        rate_limit_per_minute: Number(rateLimitMin) || undefined,
        overage_enabled: overageEnabled,
      });
      addToast("success", "Plan & limits updated successfully.");
      fetchClient();
    } catch {
      addToast("error", "Failed to update plan.");
    } finally {
      setPlanSaving(false);
    }
  };

  const runConfirm = async (fn: () => Promise<void>) => {
    setConfirmLoading(true);
    try {
      await fn();
    } catch {
      addToast("error", "Action failed. Please try again.");
    } finally {
      setConfirmLoading(false);
      setConfirmModal(null);
    }
  };

  const openPause = () => {
    setConfirmModal({
      title: "Pause Client?",
      message: `This will suspend API access for ${client?.company_name}. They will be unable to make requests until reactivated.`,
      confirmLabel: "Yes, Pause",
      danger: true,
      onConfirm: async () => {
        await pauseClient(id);
        addToast("success", "Client paused.");
        fetchClient();
      },
    });
  };

  const openReactivate = () => {
    setConfirmModal({
      title: "Reactivate Client?",
      message: `This will restore API access for ${client?.company_name}.`,
      confirmLabel: "Reactivate",
      danger: false,
      onConfirm: async () => {
        await reactivateClient(id);
        addToast("success", "Client reactivated.");
        fetchClient();
      },
    });
  };

  const openRotateKey = () => {
    setConfirmModal({
      title: "Rotate API Key?",
      message: `This will invalidate the current API key for ${client?.company_name}. The new key will be shown once.`,
      confirmLabel: "Rotate Key",
      danger: true,
      onConfirm: async () => {
        const res = await rotateKey(id);
        setRevealedKey(res.data.api_key);
        fetchClient();
      },
    });
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-center">
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <AlertTriangle size={48} />
          <p>Client not found.</p>
          <button className="btn btn-secondary" onClick={() => router.push("/admin/api-engine/clients")} style={{ marginTop: 16 }}>
            Back to Clients
          </button>
        </div>
      </div>
    );
  }

  const usagePct = client.monthly_api_limit > 0 ? Math.round(((client.current_usage ?? 0) / client.monthly_api_limit) * 100) : 0;

  return (
    <div className="page-container">
      <div className="breadcrumb" style={{ marginBottom: 4 }}>
        <Link href="/admin/api-engine/clients">Clients</Link>
        <ChevronRight />
        <span style={{ color: "var(--fae-text-primary)" }}>{client.company_name}</span>
      </div>

      <div className="page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <h1 className="page-title" style={{ marginBottom: 0 }}>
              {client.company_name}
            </h1>
            <StatusBadge status={client.billing_status} />
            <span className="badge badge-plan">{client.plan_name}</span>
          </div>
          <p className="page-subtitle">{client.email}</p>
        </div>
        <button className="btn btn-secondary" onClick={fetchClient}>
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <div className="card-title">
            <Building2 />
            Client Information
          </div>
        </div>
        <div className="detail-grid">
          <div className="detail-field">
            <div className="detail-label">Company Name</div>
            <div className="detail-value">{client.company_name}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Email</div>
            <div className="detail-value">{client.email}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Plan</div>
            <div className="detail-value">
              <span className="badge badge-plan">{client.plan_name}</span>
            </div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Billing Status</div>
            <div className="detail-value">
              <StatusBadge status={client.billing_status} />
            </div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Created</div>
            <div className="detail-value" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={14} style={{ color: "var(--fae-text-muted)" }} />
              {client.created_at ? new Date(client.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}
            </div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Client ID</div>
            <div className="detail-value" style={{ fontFamily: "monospace", fontSize: 13 }}>
              {client.id}
            </div>
          </div>
        </div>

        <div className="divider" />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span className="detail-label">API Usage This Month</span>
              <span style={{ fontSize: 13, color: "var(--fae-text-secondary)", fontWeight: 600 }}>
                {(client.current_usage ?? 0).toLocaleString()} / {client.monthly_api_limit.toLocaleString()} requests
              </span>
            </div>
            <UsageBar value={client.current_usage ?? 0} max={client.monthly_api_limit} showLabel={false} />
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 100,
              background: usagePct > 85 ? "rgba(239,68,68,0.12)" : usagePct > 60 ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)",
              color: usagePct > 85 ? "#ef4444" : usagePct > 60 ? "#f59e0b" : "#10b981",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {usagePct}%
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <div className="card-title">
            <Shield />
            Feature Access Control
          </div>
        </div>
        <FeatureEditor enabled={client.enabled_features ?? []} onSave={handleSaveFeatures} />
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <div className="card-title">
            <Settings />
            Plan & Rate Limits
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 16 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Plan</label>
            <select className="form-select" value={planName} onChange={(e) => setPlanName(e.target.value)}>
              {PLANS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Monthly API Limit</label>
            <input className="form-input" type="number" value={monthlyLimit} onChange={(e) => setMonthlyLimit(e.target.value)} placeholder="e.g. 100000" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Rate Limit / Min</label>
            <input className="form-input" type="number" value={rateLimitMin} onChange={(e) => setRateLimitMin(e.target.value)} placeholder="e.g. 60" />
          </div>
        </div>
        <label className="feature-checkbox" style={{ marginBottom: 16, width: "fit-content" }}>
          <input type="checkbox" checked={overageEnabled} onChange={(e) => setOverageEnabled(e.target.checked)} />
          <span>Allow overage (usage beyond monthly limit)</span>
        </label>
        <div>
          <button className="btn btn-primary" onClick={handleSavePlan} disabled={planSaving}>
            <Save size={14} />
            {planSaving ? "Saving…" : "Save Plan & Limits"}
          </button>
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <div className="card-title">
            <Shield />
            Client Actions
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {client.billing_status === "paused" ? (
            <button className="btn btn-success" onClick={openReactivate}>
              <RefreshCw size={14} />
              Reactivate Client
            </button>
          ) : (
            <button className="btn btn-warning" onClick={openPause} disabled={client.billing_status === "cancelled"}>
              <PauseCircle size={14} />
              Pause Client
            </button>
          )}
          <button className="btn btn-danger" onClick={openRotateKey}>
            <RotateCcw size={14} />
            Rotate API Key
          </button>
        </div>
        <p style={{ fontSize: 12, color: "var(--fae-text-muted)", marginTop: 12 }}>
          Pausing a client suspends all API access. Rotating a key immediately invalidates the old key.
        </p>
      </div>

      {client.audit_logs && client.audit_logs.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Clock />
              Audit Log
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Admin</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {client.audit_logs.map((log) => (
                  <tr key={log.id} className="audit-row">
                    <td>
                      <span style={{ fontFamily: "monospace", fontSize: 13, color: "var(--fae-accent-primary)" }}>{log.action}</span>
                    </td>
                    <td>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <User size={13} style={{ color: "var(--fae-text-muted)" }} />
                        {log.admin_id}
                      </span>
                    </td>
                    <td style={{ color: "var(--fae-text-muted)", fontSize: 13 }}>{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {confirmModal && (
        <ConfirmModal
          title={confirmModal.title}
          message={confirmModal.message}
          confirmLabel={confirmModal.confirmLabel}
          danger={confirmModal.danger}
          loading={confirmLoading}
          onConfirm={() => runConfirm(confirmModal.onConfirm)}
          onCancel={() => setConfirmModal(null)}
        />
      )}

      {revealedKey && <KeyRevealModal apiKey={revealedKey} onClose={() => setRevealedKey(null)} />}

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
