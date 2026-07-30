"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import type { Invoice, InvoiceStatus } from "@/lib/invoices";
import { invoiceTotal } from "@/lib/invoice-utils";

const STATUS_OPTIONS: InvoiceStatus[] = ["unpaid", "paid", "cancelled"];
const STATUS_BADGE: Record<InvoiceStatus, string> = {
  unpaid: "#FE4705",
  paid: "#22c55e",
  cancelled: "#94a3b8",
};

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/invoices/${id}`)
      .then((r) => r.json())
      .then(setInvoice)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleStatusChange(status: InvoiceStatus) {
    if (!invoice) return;
    setUpdating(true);
    await fetch(`/api/admin/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setInvoice({ ...invoice, status });
    setUpdating(false);
  }

  if (loading) return <div className="p-8 text-sm text-slate-400">Loading…</div>;
  if (!invoice || "error" in invoice) return <div className="p-8 text-sm text-slate-400">Invoice not found.</div>;

  const total = invoiceTotal(invoice.items);
  const issueDate = new Date(invoice.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      {/* Screen-only controls */}
      <div className="print-hidden mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/admin/invoices" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
          <ArrowLeft size={14} /> Back to invoices
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              disabled={updating}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors disabled:opacity-60 ${
                invoice.status === s ? "bg-flacron-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg bg-[#FE4705] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#D83C04] transition-colors"
          >
            <Printer size={14} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Invoice document */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm print:border-0 print:shadow-none print:rounded-none">
        {/* Header */}
        <div className="flex items-start justify-between bg-flacron-navy px-8 py-8 sm:px-12">
          <div>
            <p className="text-2xl font-black tracking-wider text-[#FE4705]">FLACRON</p>
            <p className="mt-0.5 text-xs tracking-widest text-slate-400">ENTERPRISES LLC</p>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
              410 E 95th St, Brooklyn, NY 11212<br />
              929-444-1275<br />
              Contact@flacronenterprises.com
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-widest text-slate-500">Invoice</p>
            <p className="my-1 text-xl font-extrabold text-[#FE4705]">#{invoice.invoiceNumber}</p>
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: STATUS_BADGE[invoice.status] }}
            >
              {invoice.status}
            </span>
          </div>
        </div>

        {/* Dates bar */}
        <div className="flex bg-[#0A3D75]">
          <div className="flex-1 px-8 py-3.5 sm:px-12">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">Issue Date</p>
            <p className="mt-0.5 text-sm font-semibold text-slate-100">{issueDate}</p>
          </div>
          <div className="flex-1 border-l border-slate-700 px-8 py-3.5 sm:px-12">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">Amount Due</p>
            <p className="mt-0.5 text-sm font-semibold text-[#FE4705]">${total.toFixed(2)} USD</p>
          </div>
        </div>

        {/* Bill to / From */}
        <div className="flex items-start justify-between px-8 pt-9 sm:px-12">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-widest text-slate-400">Bill To</p>
            <p className="text-lg font-extrabold text-flacron-navy">{invoice.billToName}</p>
            {invoice.billToCompany && <p className="mt-1 text-sm text-slate-500">{invoice.billToCompany}</p>}
            <p className="mt-1 text-sm text-slate-500">{invoice.billToEmail}</p>
          </div>
          <div className="text-right">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-slate-400">From</p>
            <p className="text-sm font-bold text-flacron-navy">Flacron Enterprises</p>
            <p className="mt-0.5 text-xs text-slate-500">Contact@flacronenterprises.com</p>
          </div>
        </div>

        {/* Line items */}
        <div className="px-8 pt-8 sm:px-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-b-2 border-slate-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500">Description</th>
                <th className="border-b-2 border-slate-200 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wide text-slate-500">Qty</th>
                <th className="border-b-2 border-slate-200 px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wide text-slate-500">Unit Price</th>
                <th className="border-b-2 border-slate-200 px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wide text-slate-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i}>
                  <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-700">{item.description}</td>
                  <td className="border-b border-slate-100 px-4 py-4 text-center text-sm text-slate-700">{item.quantity}</td>
                  <td className="border-b border-slate-100 px-4 py-4 text-right text-sm text-slate-700">${item.unitPrice.toFixed(2)}</td>
                  <td className="border-b border-slate-100 px-4 py-4 text-right text-sm font-semibold text-flacron-navy">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end px-8 py-6 sm:px-12">
          <div className="w-64">
            <div className="flex justify-between border-b border-slate-100 py-2 text-sm text-slate-500">
              <span>Subtotal</span><span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-1.5 flex justify-between border-t-2 border-flacron-navy pt-3.5 text-lg font-extrabold text-flacron-navy">
              <span>Total Due</span><span className="text-[#FE4705]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="mx-8 mb-8 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4 sm:mx-12">
            <p className="text-xs leading-relaxed text-orange-800 whitespace-pre-wrap">{invoice.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between bg-flacron-navy px-8 py-5 sm:px-12">
          <span />
          <p className="text-right text-[11px] text-slate-500">
            Invoice #{invoice.invoiceNumber}<br />flacronenterprises.com
          </p>
        </div>
      </div>
    </div>
  );
}
