"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import type { Invoice, InvoiceStatus } from "@/lib/invoices";
import { invoiceTotal } from "@/lib/invoice-utils";

const STATUS_STYLES: Record<InvoiceStatus, string> = {
  unpaid: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-slate-100 text-slate-500",
};

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/invoices")
      .then((r) => r.json())
      .then((data) => setInvoices(data.invoices || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">Generate and track invoices for custom orders or one-off billing.</p>
        </div>
        <Link
          href="/admin/invoices/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#FE4705] hover:bg-[#ea6b0e] text-white text-sm font-semibold rounded-lg transition-colors shrink-0"
        >
          <Plus size={14} /> Generate Invoice
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        {loading ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">Loading…</div>
        ) : invoices.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <FileText className="mx-auto h-8 w-8 text-slate-300 mb-2" />
            <p className="text-slate-500 text-sm mb-4">No invoices generated yet.</p>
            <Link href="/admin/invoices/new" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors">
              <Plus size={14} /> Generate your first invoice
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {invoices.map((inv) => (
              <Link
                key={inv.id}
                href={`/admin/invoices/${inv.id}`}
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-[#FE4705]">{inv.invoiceNumber}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[inv.status]}`}>
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{inv.billToName}{inv.billToCompany && ` · ${inv.billToCompany}`}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-900">${invoiceTotal(inv.items).toFixed(2)}</p>
                  <p className="text-xs text-slate-400">{new Date(inv.createdAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
