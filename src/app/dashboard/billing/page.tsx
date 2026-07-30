"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, ExternalLink, Zap, Rocket, Building2 } from "lucide-react";
import { PLANS, type PlanId } from "@/lib/plans";

type Me = {
  plan: { id: PlanId; name: string; priceLabel: string };
  billingStatus: "pending" | "active";
  usage: { used: number; remaining: number; overQuota: boolean };
};

const planOrder: PlanId[] = ["starter", "growth", "enterprise"];
const planFeatures: Record<PlanId, string[]> = {
  starter: ["50,000 API calls/mo", "5 AI model endpoints", "Email support"],
  growth: ["250,000 API calls/mo", "All 12 AI model endpoints", "Priority inference", "Slack & email support"],
  enterprise: ["Unlimited calls", "Dedicated infrastructure", "Custom model training", "Dedicated account manager"],
};
const planIcons: Record<PlanId, typeof Zap> = { starter: Zap, growth: Rocket, enterprise: Building2 };

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-400">Loading…</div>}>
      <BillingContent />
    </Suspense>
  );
}

function BillingContent() {
  const searchParams = useSearchParams();
  const checkoutStatus = searchParams.get("checkout");
  const [me, setMe] = useState<Me | null>(null);
  const [busyPlan, setBusyPlan] = useState<PlanId | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/customer/me")
      .then((r) => (r.ok ? r.json() : null))
      .then(setMe)
      .catch(() => setMe(null));
  }, []);

  async function handleUpgrade(planId: PlanId) {
    if (planId === "enterprise") return;
    setError("");
    setBusyPlan(planId);
    const res = await fetch("/api/customer/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });
    const data = await res.json();
    setBusyPlan(null);
    if (res.ok && data.url) {
      // eslint-disable-next-line react-hooks/immutability -- external redirect (Stripe-hosted URL), router.push can't cross origins
      window.location.href = data.url;
    } else {
      setError(data.error || "Could not start checkout");
    }
  }

  async function handleManageBilling() {
    setError("");
    setPortalLoading(true);
    const res = await fetch("/api/customer/billing/portal", { method: "POST" });
    const data = await res.json();
    setPortalLoading(false);
    if (res.ok && data.url) {
      window.location.href = data.url;
    } else {
      setError(data.error || "Could not open billing portal");
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <h1 className="text-2xl font-black text-flacron-navy mb-1">Billing</h1>
      <p className="text-sm text-slate-500 mb-6">Manage your plan and payment details.</p>

      {me?.billingStatus === "pending" && (
        <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800">
          <strong>Payment required.</strong> Choose a plan below to activate your dashboard — you won&apos;t be able to access other pages until payment is complete.
        </div>
      )}
      {checkoutStatus === "cancelled" && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Checkout was cancelled — your plan hasn&apos;t changed.
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {me?.plan && (
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current plan</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${me.billingStatus === "active" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-[#FE4705]"}`}>
                {me.billingStatus === "active" ? "Active" : "Pending payment"}
              </span>
            </div>
            <p className="text-lg font-bold text-flacron-navy">{me.plan.name} <span className="text-sm font-medium text-slate-400">· {me.plan.priceLabel}</span></p>
          </div>
          <button
            onClick={handleManageBilling}
            disabled={portalLoading}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-[#FE4705] hover:text-[#FE4705] transition-colors disabled:opacity-60"
          >
            {portalLoading ? "Loading…" : "Manage Billing"} <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {planOrder.map((id) => {
          const plan = PLANS[id];
          const isCurrent = me?.plan?.id === id;
          const Icon = planIcons[id];
          return (
            <div
              key={id}
              className={`relative flex flex-col rounded-2xl border p-5 ${isCurrent ? "border-[#FE4705] shadow-[0_4px_20px_rgba(254, 71, 5,0.15)]" : "border-slate-200"} bg-white`}
            >
              {id === "growth" && !isCurrent && (
                <span className="absolute -top-2.5 right-5 rounded-full bg-flacron-navy px-2.5 py-0.5 text-[10px] font-bold text-white">Popular</span>
              )}
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50">
                <Icon size={16} className="text-[#FE4705]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#FE4705] mb-1">{plan.name}</p>
              <p className="text-2xl font-black text-flacron-navy mb-3">{plan.priceLabel}</p>
              <ul className="space-y-2 mb-5 flex-1">
                {planFeatures[id].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-[#FE4705]" /> {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <span className="rounded-xl bg-slate-100 py-2.5 text-center text-sm font-semibold text-slate-500">Current plan</span>
              ) : id === "enterprise" ? (
                <Link
                  href="/custom-order"
                  className="rounded-xl border-2 border-flacron-navy py-2.5 text-center text-sm font-semibold text-flacron-navy hover:bg-flacron-navy hover:text-white transition-colors"
                >
                  Request Custom Quote
                </Link>
              ) : (
                <button
                  onClick={() => handleUpgrade(id)}
                  disabled={busyPlan === id}
                  className="rounded-xl bg-[#FE4705] py-2.5 text-sm font-semibold text-white hover:bg-[#D83C04] disabled:opacity-60 transition-colors"
                >
                  {busyPlan === id ? "Redirecting…" : "Upgrade"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
