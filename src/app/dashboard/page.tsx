import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Zap, Gauge, KeyRound, Rocket, TrendingUp } from "lucide-react";
import { getSessionCustomerId } from "@/lib/customer-auth";
import { getCustomerById, getQuotaStatus, listApiKeys, getRecentUsage } from "@/lib/customers-data";
import { isWatsonxConfigured } from "@/lib/watsonx";
import CopyableCode from "@/components/CopyableCode";

export default async function DashboardOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const customerId = await getSessionCustomerId();
  if (!customerId) redirect("/dashboard/login");

  const customer = await getCustomerById(customerId);
  if (!customer) redirect("/dashboard/login");

  const { checkout } = await searchParams;

  const [quota, keys, recentUsage] = await Promise.all([
    getQuotaStatus(customer.id, customer.plan),
    listApiKeys(customer.id),
    getRecentUsage(customer.id, 5),
  ]);

  const activeKeys = keys.filter((k) => !k.revoked).length;
  const usedPct = quota.plan.monthlyQuota === -1 ? 0 : Math.min(100, Math.round((quota.used / quota.plan.monthlyQuota) * 100));

  const curlSnippet = `curl -X POST https://flacronenterprises.com/api/v1/estimate \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"projectDescription": "Replace a 20x30ft asphalt shingle roof"}'`;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Hero banner */}
      <div className="relative mb-6 overflow-hidden rounded-2xl bg-flacron-navy px-5 py-6 sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute inset-0 particle-grid opacity-10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(254, 71, 5,0.18)_0%,transparent_60%)]" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold text-[#FE4705]">
              <Rocket className="h-3 w-3" /> {quota.plan.name} Plan
            </span>
            <h1 className="mt-3 text-2xl font-black text-white sm:text-3xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
              Welcome back, {customer.orgName}
            </h1>
            <p className="mt-1 text-sm text-slate-400">Here&apos;s what&apos;s happening with your AI Engine account.</p>
          </div>
          <Link
            href="/dashboard/keys"
            className="ripple-btn inline-flex items-center justify-center gap-2 rounded-xl bg-[#FE4705] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#D83C04] transition-colors shadow-[0_4px_20px_rgba(254, 71, 5,0.3)] shrink-0"
          >
            Manage API Keys <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {checkout === "success" && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Payment successful — you&apos;re now on the <strong>{quota.plan.name}</strong> plan.
        </div>
      )}

      {!isWatsonxConfigured() && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          watsonx is running in <strong>mock mode</strong> — API calls return placeholder responses until IBM credentials are configured server-side.
        </div>
      )}

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#FE4705]/30 transition-all">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
            <Gauge size={16} className="text-[#FE4705]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Current Plan</p>
          <p className="text-xl font-black text-flacron-navy">{quota.plan.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">{quota.plan.priceLabel}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#FE4705]/30 transition-all">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
            <Zap size={16} className="text-[#FE4705]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Usage This Period</p>
          <p className="text-xl font-black text-flacron-navy">
            {quota.used.toLocaleString()}{" "}
            <span className="text-sm font-medium text-slate-400">
              / {quota.plan.monthlyQuota === -1 ? "∞" : quota.plan.monthlyQuota.toLocaleString()}
            </span>
          </p>
          {quota.plan.monthlyQuota !== -1 && (
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${usedPct >= 90 ? "bg-red-500" : "bg-gradient-to-r from-[#FE4705] to-[#D83C04]"}`}
                style={{ width: `${usedPct}%` }}
              />
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#FE4705]/30 transition-all">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
            <KeyRound size={16} className="text-[#FE4705]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Active API Keys</p>
          <p className="text-xl font-black text-flacron-navy">{activeKeys}</p>
          <Link href="/dashboard/keys" className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#FE4705] hover:text-[#D83C04]">
            Manage keys <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Quick start + Recent activity */}
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="text-sm font-bold text-flacron-navy mb-3">Quick start</h2>
          <p className="text-sm text-slate-500 mb-4">Call the estimate endpoint from your own code:</p>
          <CopyableCode code={curlSnippet} />
          <Link href="/dashboard/keys" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FE4705] hover:text-[#D83C04]">
            Create an API key <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp size={15} className="text-[#FE4705]" />
            <h2 className="text-sm font-bold text-flacron-navy">Recent Activity</h2>
          </div>
          {recentUsage.length === 0 ? (
            <p className="text-sm text-slate-400">No API calls yet — create a key and make your first request.</p>
          ) : (
            <ul className="space-y-3">
              {recentUsage.map((log) => (
                <li key={log.id} className="flex items-start gap-2.5">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${log.mocked ? "bg-amber-400" : "bg-emerald-500"}`}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-flacron-navy">/{log.endpoint}</p>
                    <p className="text-[11px] text-slate-400">{new Date(log.createdAt).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
