"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, KeyRound } from "lucide-react";
import type { Plan } from "@/lib/plans";

type CustomerRow = {
  id: string;
  email: string;
  orgName: string;
  plan: Plan;
  createdAt: number;
  usage: { used: number; remaining: number; overQuota: boolean };
  activeKeys: number;
  totalKeys: number;
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((r) => r.json())
      .then((data) => setCustomers(data.customers || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">AI Engine Customers</h1>
        <p className="text-sm text-slate-500 mt-1">
          Accounts provisioned via &ldquo;Make Customer&rdquo; on the Leads page, with plan, usage, and API key status.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">All Customers</h2>
          <span className="text-sm text-slate-400">{loading ? "—" : customers.length} total</span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">Loading…</div>
        ) : customers.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Building2 className="mx-auto h-8 w-8 text-slate-300 mb-2" />
            <p className="text-slate-500 text-sm">No AI Engine customers have signed up yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs text-slate-400">
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Plan</th>
                  <th className="px-6 py-3 font-medium">Usage this period</th>
                  <th className="px-6 py-3 font-medium">API Keys</th>
                  <th className="px-6 py-3 font-medium">Joined</th>
                  <th className="px-6 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{c.orgName}</p>
                      <p className="text-xs text-slate-400">{c.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-[#FE4705]">
                        {c.plan.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={c.usage.overQuota ? "text-red-600 font-semibold" : "text-slate-700"}>
                        {c.usage.used.toLocaleString()}
                      </span>
                      <span className="text-slate-400"> / {c.plan.monthlyQuota === -1 ? "∞" : c.plan.monthlyQuota.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <KeyRound size={12} className="text-slate-400" />
                        {c.activeKeys} active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/customers/${c.id}`} className="text-xs font-medium text-[#FE4705] hover:underline">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
