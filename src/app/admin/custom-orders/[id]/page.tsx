"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import type { CustomOrder, CustomOrderStatus } from "@/lib/custom-orders";

const STATUS_OPTIONS: CustomOrderStatus[] = ["new", "reviewed", "quoted", "closed"];

export default function AdminCustomOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<CustomOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/custom-orders/${id}`)
      .then((r) => r.json())
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleStatusChange(status: CustomOrderStatus) {
    if (!order) return;
    setUpdating(true);
    await fetch(`/api/admin/custom-orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrder({ ...order, status });
    setUpdating(false);
  }

  if (loading) return <div className="p-8 text-sm text-slate-400">Loading…</div>;
  if (!order || "error" in order) return <div className="p-8 text-sm text-slate-400">Request not found.</div>;

  const invoiceHref = `/admin/invoices/new?name=${encodeURIComponent(order.name)}&email=${encodeURIComponent(order.email)}&company=${encodeURIComponent(order.company)}&customOrderId=${order.id}`;

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <Link href="/admin/custom-orders" className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
        <ArrowLeft size={14} /> Back to custom orders
      </Link>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{order.name}</h1>
          <p className="text-sm text-slate-500">{order.email}{order.company && ` · ${order.company}`}</p>
          <p className="text-xs text-slate-400 mt-0.5">Submitted {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <Link
          href={invoiceHref}
          className="flex items-center gap-2 px-4 py-2 bg-[#FE4705] hover:bg-[#ea6b0e] text-white text-sm font-semibold rounded-lg transition-colors shrink-0"
        >
          <FileText size={14} /> Generate Invoice
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 mb-6">
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Project Type</p>
            <p className="text-sm text-slate-800">{order.projectType || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Estimated Budget</p>
            <p className="text-sm text-slate-800">{order.budget || "—"}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Description</p>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{order.description}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Status</p>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              disabled={updating}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-60 ${
                order.status === s ? "bg-flacron-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
