"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, KeyRound, FileText } from "lucide-react";

type Detail = {
  id: string;
  email: string;
  orgName: string;
  createdAt: number;
  profile: { region: string; units: string; currency: string; markupPercent: number; notes: string };
  quota: { plan: { name: string; monthlyQuota: number; priceLabel: string }; used: number; remaining: number; overQuota: boolean };
  keys: { id: string; label: string; maskedKey: string; createdAt: number; revoked: boolean; lastUsedAt: number | null }[];
  usage: { id: string; endpoint: string; inputTokens: number; outputTokens: number; mocked: boolean; createdAt: number }[];
};

export default function AdminCustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/customers/${id}`)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-sm text-slate-400">Loading…</div>;
  if (!data || "error" in data) return <div className="p-8 text-sm text-slate-400">Customer not found.</div>;

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      <Link href="/admin/customers" className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
        <ArrowLeft size={14} /> Back to customers
      </Link>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{data.orgName}</h1>
          <p className="text-sm text-slate-500">{data.email} · Joined {new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
        <Link
          href={`/admin/invoices/new?name=${encodeURIComponent(data.orgName)}&email=${encodeURIComponent(data.email)}&customerId=${data.id}`}
          className="flex items-center gap-2 px-4 py-2 bg-[#FE4705] hover:bg-[#ea6b0e] text-white text-sm font-semibold rounded-lg transition-colors shrink-0"
        >
          <FileText size={14} /> Generate Invoice
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Plan</p>
          <p className="text-lg font-bold text-slate-900">{data.quota.plan.name}</p>
          <p className="text-xs text-slate-400">{data.quota.plan.priceLabel}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Usage this period</p>
          <p className={`text-lg font-bold ${data.quota.overQuota ? "text-red-600" : "text-slate-900"}`}>
            {data.quota.used.toLocaleString()}{" "}
            <span className="text-sm font-medium text-slate-400">
              / {data.quota.plan.monthlyQuota === -1 ? "∞" : data.quota.plan.monthlyQuota.toLocaleString()}
            </span>
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Personalization</p>
          <p className="text-sm text-slate-700">{data.profile.region} · {data.profile.units} · {data.profile.currency}</p>
          <p className="text-xs text-slate-400">{data.profile.markupPercent}% markup</p>
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-slate-200 bg-white overflow-hidden">
        <h2 className="px-6 py-4 border-b border-slate-100 font-semibold text-slate-900">API Keys</h2>
        {data.keys.length === 0 ? (
          <p className="px-6 py-8 text-sm text-slate-400">No keys created yet.</p>
        ) : (
          <ul className="divide-y divide-slate-50">
            {data.keys.map((k) => (
              <li key={k.id} className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-2.5">
                  <KeyRound size={14} className="text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{k.label}</p>
                    <p className="text-xs text-slate-400 font-mono">{k.maskedKey}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium ${k.revoked ? "text-red-500" : "text-emerald-600"}`}>
                  {k.revoked ? "Revoked" : "Active"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <h2 className="px-6 py-4 border-b border-slate-100 font-semibold text-slate-900">Recent API Calls</h2>
        {data.usage.length === 0 ? (
          <p className="px-6 py-8 text-sm text-slate-400">No API calls recorded yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400">
                <th className="px-6 py-2 font-medium">Endpoint</th>
                <th className="px-6 py-2 font-medium">Tokens (in/out)</th>
                <th className="px-6 py-2 font-medium">Mode</th>
                <th className="px-6 py-2 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.usage.map((log) => (
                <tr key={log.id} className="border-t border-slate-50">
                  <td className="px-6 py-2.5 font-medium text-slate-800">/{log.endpoint}</td>
                  <td className="px-6 py-2.5 text-slate-500">{log.inputTokens} / {log.outputTokens}</td>
                  <td className="px-6 py-2.5">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${log.mocked ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                      {log.mocked ? "Mock" : "Live"}
                    </span>
                  </td>
                  <td className="px-6 py-2.5 text-slate-400">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
