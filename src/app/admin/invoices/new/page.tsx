"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { invoiceTotal } from "@/lib/invoice-utils";

type LineItem = { description: string; quantity: number; unitPrice: number };

export default function NewInvoicePage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-400">Loading…</div>}>
      <NewInvoiceForm />
    </Suspense>
  );
}

function NewInvoiceForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [billToName, setBillToName] = useState(searchParams.get("name") || "");
  const [billToEmail, setBillToEmail] = useState(searchParams.get("email") || "");
  const [billToCompany, setBillToCompany] = useState(searchParams.get("company") || "");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ description: "", quantity: 1, unitPrice: 0 }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const customOrderId = searchParams.get("customOrderId") || undefined;
  const customerId = searchParams.get("customerId") || undefined;

  function updateItem(i: number, patch: Partial<LineItem>) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  function addItem() {
    setItems((prev) => [...prev, { description: "", quantity: 1, unitPrice: 0 }]);
  }

  function removeItem(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const res = await fetch("/api/admin/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ billToName, billToEmail, billToCompany, notes, items, customOrderId, customerId }),
    });
    const data = await res.json();
    setSaving(false);

    if (res.ok) {
      router.push(`/admin/invoices/${data.id}`);
    } else {
      setError(data.error || "Could not generate invoice");
    }
  }

  const inputClass = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE4705]/30 focus:border-[#FE4705]";

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <Link href="/admin/invoices" className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
        <ArrowLeft size={14} /> Back to invoices
      </Link>

      <h1 className="text-2xl font-bold text-slate-900 mb-6">Generate Invoice</h1>

      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Bill to — Name *</label>
            <input required value={billToName} onChange={(e) => setBillToName(e.target.value)} className={inputClass} placeholder="Client name" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email *</label>
            <input required type="email" value={billToEmail} onChange={(e) => setBillToEmail(e.target.value)} className={inputClass} placeholder="client@company.com" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Company</label>
          <input value={billToCompany} onChange={(e) => setBillToCompany(e.target.value)} className={inputClass} placeholder="Client company (optional)" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-slate-700">Line items</label>
            <button type="button" onClick={addItem} className="flex items-center gap-1 text-xs font-semibold text-[#FE4705] hover:text-[#D83C04]">
              <Plus size={14} /> Add item
            </button>
          </div>
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg border border-slate-100 p-3 sm:flex-row sm:items-center">
                <input
                  value={item.description}
                  onChange={(e) => updateItem(i, { description: e.target.value })}
                  placeholder="Description"
                  className={inputClass + " sm:flex-1"}
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateItem(i, { quantity: Number(e.target.value) })}
                    className={inputClass + " w-20"}
                    placeholder="Qty"
                  />
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(i, { unitPrice: Number(e.target.value) })}
                    className={inputClass + " w-28"}
                    placeholder="Amount"
                  />
                  {items.length > 1 && (
                    <button type="button" onClick={() => removeItem(i)} className="p-2 text-slate-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Notes (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={inputClass + " resize-none"} placeholder="Payment terms, project reference, etc." />
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-xl font-black text-slate-900">${invoiceTotal(items).toFixed(2)}</p>
        </div>

        {error && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-[#FE4705] py-3 text-sm font-semibold text-white hover:bg-[#D83C04] disabled:opacity-60 transition-colors"
        >
          {saving ? "Generating…" : "Generate Invoice"}
        </button>
      </form>
    </div>
  );
}
