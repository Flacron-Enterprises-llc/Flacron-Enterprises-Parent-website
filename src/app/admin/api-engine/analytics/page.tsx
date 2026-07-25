"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { BarChart2, PieChart as PieIcon, DollarSign, RefreshCw, AlertTriangle, Activity } from "lucide-react";
import { getUsageStats, getProviderCosts } from "@/lib/api-engine/endpoints";
import type { UsageStats, ProviderCost } from "@/lib/api-engine/endpoints";

const COLORS = ["#FE4705", "#00285C", "#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#0d9488"];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#ffffff", border: "1px solid #e7e5e4", borderRadius: 12, padding: "10px 14px", fontSize: 13, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)" }}>
        <p style={{ color: "#57534e", fontWeight: 600, marginBottom: 4 }}>{label}</p>
        <p style={{ color: "#FE4705", fontWeight: 800 }}>{payload[0].value.toLocaleString()} requests</p>
      </div>
    );
  }
  return null;
}

function PieTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#ffffff", border: "1px solid #e7e5e4", borderRadius: 12, padding: "10px 14px", fontSize: 13, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)" }}>
        <p style={{ color: "#57534e", fontWeight: 600, marginBottom: 4 }}>{payload[0].name}</p>
        <p style={{ color: "#FE4705", fontWeight: 800 }}>{payload[0].value.toLocaleString()} req</p>
      </div>
    );
  }
  return null;
}

interface Toast {
  id: number;
  type: "success" | "error";
  message: string;
}

export default function AnalyticsPage() {
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [costs, setCosts] = useState<ProviderCost[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: "success" | "error", message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [u, c] = await Promise.all([getUsageStats(), getProviderCosts()]);
      setUsage(u.data);
      setCosts(Array.isArray(c.data) ? c.data : []);
    } catch {
      addToast("error", "Failed to load analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const barData = Object.entries(usage?.by_feature ?? {}).map(([name, value]) => ({ name, requests: value }));
  const pieData = Object.entries(usage?.by_status ?? {}).map(([name, value]) => ({ name, value }));

  const totalCost = costs.reduce((s, c) => s + (c.total_cost ?? 0), 0);
  const totalProviderRequests = costs.reduce((s, c) => s + (c.request_count ?? 0), 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">API usage metrics and provider cost breakdown</p>
        </div>
        <button className="btn btn-secondary" onClick={fetchData}>
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading-center">
          <div className="loading-spinner" />
        </div>
      ) : (
        <>
          <div className="stats-grid" style={{ marginBottom: 24 }}>
            <div className="stat-card">
              <div className="stat-card-icon purple">
                <Activity />
              </div>
              <div className="stat-card-label">Total Requests</div>
              <div className="stat-card-value">{(usage?.total_requests ?? 0).toLocaleString()}</div>
              <div className="stat-card-change">All time</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon orange">
                <DollarSign />
              </div>
              <div className="stat-card-label">Total Provider Cost</div>
              <div className="stat-card-value">${totalCost.toFixed(2)}</div>
              <div className="stat-card-change">This period</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon blue">
                <BarChart2 />
              </div>
              <div className="stat-card-label">Unique Features</div>
              <div className="stat-card-value">{barData.length}</div>
              <div className="stat-card-change">With usage</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon green">
                <DollarSign />
              </div>
              <div className="stat-card-label">Provider Requests</div>
              <div className="stat-card-value">{totalProviderRequests.toLocaleString()}</div>
              <div className="stat-card-change">From all providers</div>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-title">
                <BarChart2 />
                Requests by Feature
              </div>
              {barData.length === 0 ? (
                <div className="empty-state" style={{ padding: "40px 0" }}>
                  <BarChart2 size={40} />
                  <p>No feature usage data available.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={barData} margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" strokeOpacity={0.5} />
                    <XAxis dataKey="name" tick={{ fill: "#57534e", fontSize: 11, fontWeight: 500 }} axisLine={{ stroke: "#d6d3d1" }} tickLine={false} angle={-35} textAnchor="end" height={55} />
                    <YAxis tick={{ fill: "#57534e", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="requests" radius={[6, 6, 0, 0]}>
                      {barData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.9} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="chart-card">
              <div className="chart-title">
                <PieIcon />
                Requests by Status
              </div>
              {pieData.length === 0 ? (
                <div className="empty-state" style={{ padding: "40px 0" }}>
                  <PieIcon size={40} />
                  <p>No status breakdown data available.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="45%"
                      outerRadius={85}
                      innerRadius={55}
                      dataKey="value"
                      paddingAngle={4}
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend iconType="circle" formatter={(value) => <span style={{ color: "#57534e", fontSize: 12, fontWeight: 500 }}>{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <DollarSign />
                Provider Cost Breakdown
              </div>
              <span style={{ fontSize: 13, color: "var(--fae-text-muted)" }}>
                Total: <strong style={{ color: "var(--fae-text-primary)" }}>${totalCost.toFixed(4)}</strong>
              </span>
            </div>
            {costs.length === 0 ? (
              <div className="empty-state" style={{ padding: "40px 0" }}>
                <DollarSign size={40} />
                <p>No provider cost data available.</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Provider</th>
                      <th>Total Cost</th>
                      <th>Request Count</th>
                      <th>Avg Cost / Request</th>
                      <th>Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costs.map((c, i) => {
                      const share = totalCost > 0 ? ((c.total_cost / totalCost) * 100).toFixed(1) : "0.0";
                      const avg = c.request_count > 0 ? c.total_cost / c.request_count : 0;
                      return (
                        <tr key={i}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                              <span style={{ fontWeight: 600 }}>{c.provider}</span>
                            </div>
                          </td>
                          <td>
                            <span style={{ color: "var(--fae-status-past-due)", fontWeight: 700 }}>${c.total_cost.toFixed(4)}</span>
                          </td>
                          <td>{c.request_count.toLocaleString()}</td>
                          <td style={{ color: "var(--fae-text-muted)" }}>${avg.toFixed(6)}</td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ flex: 1, height: 4, background: "rgba(0,0,0,0.06)", borderRadius: 2, overflow: "hidden", maxWidth: 100 }}>
                                <div style={{ width: `${share}%`, height: "100%", background: COLORS[i % COLORS.length], borderRadius: 2 }} />
                              </div>
                              <span style={{ fontSize: 12, color: "var(--fae-text-secondary)", fontWeight: 600 }}>{share}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
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
