import { redirect } from "next/navigation";
import { Activity, Gauge, Layers } from "lucide-react";
import { getSessionCustomerId } from "@/lib/customer-auth";
import { getCustomerById, getQuotaStatus, getRecentUsage, getUsageBreakdown } from "@/lib/customers-data";

export default async function UsagePage() {
  const customerId = await getSessionCustomerId();
  if (!customerId) redirect("/dashboard/login");

  const customer = await getCustomerById(customerId);
  if (!customer) redirect("/dashboard/login");

  const [recent, breakdown, quota] = await Promise.all([
    getRecentUsage(customerId, 50),
    getUsageBreakdown(customerId),
    getQuotaStatus(customerId, customer.plan),
  ]);

  const maxBreakdown = Math.max(1, ...Object.values(breakdown));
  const recentTokens = recent.reduce((sum, log) => sum + log.inputTokens + log.outputTokens, 0);
  const usedPct = quota.plan.monthlyQuota === -1 ? 0 : Math.min(100, Math.round((quota.used / quota.plan.monthlyQuota) * 100));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <h1 className="text-2xl font-black text-flacron-navy mb-1">Usage</h1>
      <p className="text-sm text-slate-500 mb-6">
        {quota.used.toLocaleString()} calls this billing period
        {quota.plan.monthlyQuota !== -1 && ` of ${quota.plan.monthlyQuota.toLocaleString()} included`}.
      </p>

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
            <Gauge size={14} className="text-[#FE4705]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Quota Used</p>
          <p className="text-lg font-black text-flacron-navy">{usedPct}%</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className={`h-full rounded-full ${usedPct >= 90 ? "bg-red-500" : "bg-gradient-to-r from-[#FE4705] to-[#D83C04]"}`} style={{ width: `${usedPct}%` }} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
            <Activity size={14} className="text-[#FE4705]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Calls This Period</p>
          <p className="text-lg font-black text-flacron-navy">{quota.used.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
            <Layers size={14} className="text-[#FE4705]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Tokens (recent calls)</p>
          <p className="text-lg font-black text-flacron-navy">{recentTokens.toLocaleString()}</p>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <h2 className="text-sm font-bold text-flacron-navy mb-4">Calls by endpoint</h2>
        {Object.keys(breakdown).length === 0 ? (
          <p className="text-sm text-slate-400">No API calls recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(breakdown).map(([endpoint, count]) => (
              <div key={endpoint}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">/{endpoint}</span>
                  <span className="text-slate-400">{count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#FE4705] to-[#D83C04]" style={{ width: `${(count / maxBreakdown) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <h2 className="p-5 pb-0 text-sm font-bold text-flacron-navy">Recent calls</h2>
        {recent.length === 0 ? (
          <p className="p-5 text-sm text-slate-400">No calls yet.</p>
        ) : (
          <table className="w-full text-sm mt-3">
            <thead>
              <tr className="border-t border-slate-100 text-left text-xs text-slate-400">
                <th className="px-5 py-2 font-medium">Endpoint</th>
                <th className="px-5 py-2 font-medium">Tokens (in/out)</th>
                <th className="px-5 py-2 font-medium">Mode</th>
                <th className="px-5 py-2 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((log, i) => (
                <tr key={log.id} className={`border-t border-slate-100 ${i % 2 === 1 ? "bg-slate-50/50" : ""}`}>
                  <td className="px-5 py-2.5 font-medium text-flacron-navy">/{log.endpoint}</td>
                  <td className="px-5 py-2.5 text-slate-500">{log.inputTokens} / {log.outputTokens}</td>
                  <td className="px-5 py-2.5">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${log.mocked ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                      {log.mocked ? "Mock" : "Live"}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-slate-400">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
