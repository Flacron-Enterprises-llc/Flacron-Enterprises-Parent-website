"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Activity, DollarSign, TrendingUp, AlertTriangle, Eye, PauseCircle, RefreshCw } from "lucide-react";
import { getClients, getUsageStats, getProviderCosts, pauseClient, reactivateClient } from "@/lib/api-engine/endpoints";
import type { Client, UsageStats, ProviderCost } from "@/lib/api-engine/endpoints";
import StatusBadge from "./_components/StatusBadge";
import UsageBar from "./_components/UsageBar";
import ConfirmModal from "./_components/ConfirmModal";

interface Toast {
  id: number;
  type: "success" | "error";
  message: string;
}

export default function ApiEngineOverview() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [costs, setCosts] = useState<ProviderCost[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmAction, setConfirmAction] = useState<{ client: Client; action: "pause" | "reactivate" } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const addToast = (type: "success" | "error", message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  const fetchAll = async () => {
    try {
      const [c, u, p] = await Promise.all([getClients(), getUsageStats(), getProviderCosts()]);
      setClients(c.data);
      setUsage(u.data);
      setCosts(Array.isArray(p.data) ? p.data : []);
    } catch {
      addToast("error", "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.billing_status === "active").length;
  const totalRequests = usage?.total_requests ?? 0;
  const totalCost = costs.reduce((s, c) => s + (c.total_cost ?? 0), 0);
  const alertClients = clients.filter((c) => c.billing_status === "past_due" || c.billing_status === "cancelled");
  const topClients = [...clients].sort((a, b) => (b.current_usage ?? 0) - (a.current_usage ?? 0)).slice(0, 8);

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
      fetchAll();
    } catch {
      addToast("error", "Action failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
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

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">API Engine — Overview</h1>
          <p className="page-subtitle">Real-time metrics and client health monitoring</p>
        </div>
        <button className="btn btn-secondary" onClick={fetchAll}>
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon purple">
            <Users />
          </div>
          <div className="stat-card-label">Total Clients</div>
          <div className="stat-card-value">{totalClients}</div>
          <div className="stat-card-change">All registered clients</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon green">
            <Activity />
          </div>
          <div className="stat-card-label">Active Clients</div>
          <div className="stat-card-value">{activeClients}</div>
          <div className="stat-card-change">
            {totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0}% of total
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon blue">
            <TrendingUp />
          </div>
          <div className="stat-card-label">Total Requests</div>
          <div className="stat-card-value">{totalRequests.toLocaleString()}</div>
          <div className="stat-card-change">Across all clients</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon orange">
            <DollarSign />
          </div>
          <div className="stat-card-label">Total Provider Cost</div>
          <div className="stat-card-value">${totalCost.toFixed(2)}</div>
          <div className="stat-card-change">This period</div>
        </div>
      </div>

      {alertClients.length > 0 && (
        <div className="card mb-6">
          <div className="card-header">
            <div className="card-title">
              <AlertTriangle size={16} style={{ color: "#f59e0b" }} />
              Client Alerts
              <span
                style={{
                  background: "rgba(245,158,11,0.15)",
                  color: "#f59e0b",
                  border: "1px solid rgba(245,158,11,0.3)",
                  borderRadius: 100,
                  padding: "1px 8px",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {alertClients.length}
              </span>
            </div>
          </div>
          <div className="alerts-grid">
            {alertClients.map((c) => (
              <div
                key={c.id}
                className={`alert-card ${c.billing_status === "cancelled" ? "danger" : ""}`}
                onClick={() => router.push(`/admin/api-engine/clients/${c.id}`)}
              >
                <div className="alert-icon">
                  <AlertTriangle />
                </div>
                <div className="alert-body">
                  <div className="alert-company">{c.company_name}</div>
                  <div className="alert-detail">
                    {c.email} · <StatusBadge status={c.billing_status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Users />
            Top Clients by Usage
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => router.push("/admin/api-engine/clients")}>
            View All
          </button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Usage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {topClients.map((c) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {confirmAction && (
        <ConfirmModal
          title={confirmAction.action === "pause" ? "Pause Client?" : "Reactivate Client?"}
          message={
            confirmAction.action === "pause"
              ? `This will suspend API access for ${confirmAction.client.company_name}. They will not be able to make requests until reactivated.`
              : `This will restore API access for ${confirmAction.client.company_name}.`
          }
          confirmLabel={confirmAction.action === "pause" ? "Yes, Pause" : "Yes, Reactivate"}
          danger={confirmAction.action === "pause"}
          loading={actionLoading}
          onConfirm={handleAction}
          onCancel={() => setConfirmAction(null)}
        />
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
