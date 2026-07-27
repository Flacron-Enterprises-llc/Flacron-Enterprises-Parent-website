"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Loader2, Trash2, Mail, Building2, Phone, MessageSquare, Tag, RefreshCw, Inbox, UserPlus, Copy, Check, Zap } from "lucide-react";

type LeadStatus = "new" | "contacted" | "qualified" | "closed";

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  product?: string;
  teamSize?: string;
  message?: string;
  source: "contact" | "book-demo";
  status: LeadStatus;
  createdAt?: { seconds: number };
  convertedCustomerId?: string;
  convertedApiEngineClientId?: string;
}

type ConversionResult = { dashboardLink: string };
type ApiEngineConversionResult = { clientId: string; apiKey: string; prefix: string; planName: string };

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  closed: "Closed",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-amber-100 text-amber-700 border-amber-200",
  qualified: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-slate-100 text-slate-500 border-slate-200",
};

const SOURCE_LABELS: Record<string, string> = {
  contact: "Contact Form",
  "book-demo": "Book Demo",
  "api-access": "API Access",
  "white-label": "White-Label",
};

function formatDate(ts?: { seconds: number }) {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "contact" | "book-demo" | "api-access" | "white-label">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [converting, setConverting] = useState<string | null>(null);
  const [conversionResults, setConversionResults] = useState<Record<string, ConversionResult>>({});
  const [conversionError, setConversionError] = useState<Record<string, string>>({});
  const [apiEngineConverting, setApiEngineConverting] = useState<string | null>(null);
  const [apiEngineResults, setApiEngineResults] = useState<Record<string, ApiEngineConversionResult>>({});
  const [apiEngineError, setApiEngineError] = useState<Record<string, string>>({});
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: string, status: LeadStatus) {
    setUpdating(id);
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    setUpdating(null);
  }

  async function makeCustomer(id: string) {
    setConverting(id);
    setConversionError((prev) => ({ ...prev, [id]: "" }));
    const res = await fetch(`/api/admin/leads/${id}/make-customer`, { method: "POST" });
    const data = await res.json();
    setConverting(null);
    if (res.ok) {
      setConversionResults((prev) => ({ ...prev, [id]: { dashboardLink: data.dashboardLink } }));
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, convertedCustomerId: data.customerId, status: "qualified" } : l));
    } else {
      setConversionError((prev) => ({ ...prev, [id]: data.error || "Could not create customer" }));
    }
  }

  async function makeApiEngineCustomer(id: string) {
    setApiEngineConverting(id);
    setApiEngineError((prev) => ({ ...prev, [id]: "" }));
    const res = await fetch(`/api/admin/leads/${id}/make-api-engine-customer`, { method: "POST" });
    const data = await res.json();
    setApiEngineConverting(null);
    if (res.ok) {
      setApiEngineResults((prev) => ({
        ...prev,
        [id]: { clientId: data.clientId, apiKey: data.apiKey, prefix: data.prefix, planName: data.planName },
      }));
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, convertedApiEngineClientId: data.clientId, status: "qualified" } : l)));
    } else {
      setApiEngineError((prev) => ({ ...prev, [id]: data.error || "Could not create API Engine client" }));
    }
  }

  function copyLink(link: string) {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead?")) return;
    await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (expanded === id) setExpanded(null);
  }

  const filtered = leads.filter((l) => {
    const statusOk = filter === "all" || l.status === filter;
    const sourceOk = sourceFilter === "all" || l.source === sourceFilter;
    return statusOk && sourceOk;
  });

  const counts: Record<string, number> = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-sm text-slate-500 mt-1">All contact form and demo request submissions</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 mb-6">
        {(["all", "new", "contacted", "qualified", "closed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-xl border px-3 py-3 text-center transition-colors ${
              filter === s
                ? "bg-[#F97316] border-[#F97316] text-white"
                : "bg-white border-slate-200 hover:border-[#F97316]/40 text-slate-700"
            }`}
          >
            <p className="text-xl font-black">{counts[s]}</p>
            <p className="text-xs font-medium capitalize mt-0.5 opacity-80">{s === "all" ? "Total" : STATUS_LABELS[s as LeadStatus]}</p>
          </button>
        ))}
      </div>

      {/* Source filter */}
      <div className="flex gap-2 mb-5">
        {(["all", "contact", "book-demo", "api-access", "white-label"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSourceFilter(s)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
              sourceFilter === s
                ? "bg-flacron-navy text-white border-flacron-navy"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            {s === "all" ? "All Sources" : (SOURCE_LABELS[s] ?? s)}
          </button>
        ))}
      </div>

      {/* Lead list */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-slate-300" size={32} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Inbox size={40} className="mb-3 opacity-40" />
          <p className="text-sm font-medium">No leads yet</p>
          <p className="text-xs mt-1">Submissions from the Contact and Book Demo forms will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((lead) => (
            <div key={lead.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-colors">
              {/* Row */}
              <div
                className="flex items-center gap-3 px-4 py-3.5 cursor-pointer"
                onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#F97316] text-sm font-black">
                  {lead.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-slate-900 truncate">{lead.name}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_COLORS[lead.status]}`}>
                      {STATUS_LABELS[lead.status]}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                      {SOURCE_LABELS[lead.source] || lead.source}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{lead.email}{lead.company ? ` · ${lead.company}` : ""}</p>
                </div>

                <div className="hidden sm:block text-xs text-slate-400 shrink-0">{formatDate(lead.createdAt)}</div>

                <div className="shrink-0 text-slate-300 text-xs">{expanded === lead.id ? "▲" : "▼"}</div>
              </div>

              {/* Expanded detail */}
              {expanded === lead.id && (
                <div className="border-t border-slate-100 px-4 pb-4 pt-3 bg-slate-50/50">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-4">
                    {lead.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={13} className="text-slate-400 shrink-0" />
                        <a href={`mailto:${lead.email}`} className="text-[#F97316] hover:underline truncate">{lead.email}</a>
                      </div>
                    )}
                    {lead.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={13} className="text-slate-400 shrink-0" />
                        <span className="text-slate-700">{lead.phone}</span>
                      </div>
                    )}
                    {lead.company && (
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 size={13} className="text-slate-400 shrink-0" />
                        <span className="text-slate-700">{lead.company}</span>
                      </div>
                    )}
                    {(lead.subject || lead.product) && (
                      <div className="flex items-center gap-2 text-sm">
                        <Tag size={13} className="text-slate-400 shrink-0" />
                        <span className="text-slate-700">{lead.subject || lead.product}</span>
                      </div>
                    )}
                    {lead.teamSize && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-400 text-xs shrink-0">Team:</span>
                        <span className="text-slate-700">{lead.teamSize}</span>
                      </div>
                    )}
                  </div>

                  {lead.message && (
                    <div className="mb-4 flex items-start gap-2">
                      <MessageSquare size={13} className="text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 leading-relaxed">{lead.message}</p>
                    </div>
                  )}

                  {/* Make Customer */}
                  <div className="mb-4">
                    {lead.convertedCustomerId ? (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                        <p className="text-xs font-semibold text-emerald-700 mb-1">✓ Customer account created</p>
                        {conversionResults[lead.id] ? (
                          <div className="space-y-1.5 mt-2">
                            <div className="flex items-center gap-2">
                              <span className="w-24 shrink-0 text-[11px] font-semibold text-emerald-700">Dashboard link</span>
                              <code className="flex-1 truncate rounded bg-white border border-emerald-200 px-2 py-1 text-[11px] text-slate-600">
                                {conversionResults[lead.id].dashboardLink}
                              </code>
                              <button
                                onClick={() => copyLink(conversionResults[lead.id].dashboardLink)}
                                className="flex items-center gap-1 rounded bg-emerald-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-emerald-700"
                              >
                                {copiedLink === conversionResults[lead.id].dashboardLink ? <Check size={11} /> : <Copy size={11} />}
                              </button>
                            </div>
                            <p className="text-[11px] text-emerald-700 mt-1">This link was also emailed to {lead.email}. It logs them in and takes them to checkout if payment is still pending.</p>
                          </div>
                        ) : (
                          <p className="text-xs text-emerald-600">A dashboard link was emailed to {lead.email}.</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => makeCustomer(lead.id)}
                          disabled={converting === lead.id}
                          className="flex items-center gap-2 rounded-lg bg-flacron-navy px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors disabled:opacity-60"
                        >
                          <UserPlus size={13} />
                          {converting === lead.id ? "Creating account…" : "Make Customer"}
                        </button>
                        <p className="mt-1.5 text-[11px] text-slate-400">
                          Creates a dashboard account with a generated password, and emails login + payment links to {lead.email}.
                        </p>
                        {conversionError[lead.id] && (
                          <p className="mt-1.5 text-[11px] text-red-500">{conversionError[lead.id]}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Add to API Engine */}
                  <div className="mb-4">
                    {lead.convertedApiEngineClientId ? (
                      <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3">
                        <p className="text-xs font-semibold text-indigo-700 mb-1">✓ API Engine client created</p>
                        {apiEngineResults[lead.id] ? (
                          <div className="space-y-1.5 mt-2">
                            <div className="flex items-center gap-2">
                              <span className="w-24 shrink-0 text-[11px] font-semibold text-indigo-700">API Key</span>
                              <code className="flex-1 truncate rounded bg-white border border-indigo-200 px-2 py-1 text-[11px] text-slate-600">
                                {apiEngineResults[lead.id].apiKey}
                              </code>
                              <button
                                onClick={() => copyLink(apiEngineResults[lead.id].apiKey)}
                                className="flex items-center gap-1 rounded bg-indigo-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-indigo-700"
                              >
                                {copiedLink === apiEngineResults[lead.id].apiKey ? <Check size={11} /> : <Copy size={11} />}
                              </button>
                            </div>
                            <p className="text-[11px] text-indigo-700 mt-1">
                              Plan: <strong className="capitalize">{apiEngineResults[lead.id].planName.replace("_", " ")}</strong> · Key shown once — relay it to {lead.email} now.
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-indigo-600">
                            Client already provisioned — view it in{" "}
                            <Link href={`/admin/api-engine/clients/${lead.convertedApiEngineClientId}`} className="underline">
                              API Engine → Clients
                            </Link>
                            .
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => makeApiEngineCustomer(lead.id)}
                          disabled={apiEngineConverting === lead.id}
                          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors disabled:opacity-60"
                        >
                          <Zap size={13} />
                          {apiEngineConverting === lead.id ? "Provisioning…" : "Add to API Engine"}
                        </button>
                        <p className="mt-1.5 text-[11px] text-slate-400">
                          Creates a client in the API Engine and generates an API key on the plan they asked about
                          {lead.subject || lead.product ? ` (${lead.subject || lead.product})` : ""}.
                        </p>
                        {apiEngineError[lead.id] && (
                          <p className="mt-1.5 text-[11px] text-red-500">{apiEngineError[lead.id]}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-400 mr-1">Update status:</span>
                    {(["new", "contacted", "qualified", "closed"] as LeadStatus[]).map((s) => (
                      <button
                        key={s}
                        disabled={lead.status === s || updating === lead.id}
                        onClick={() => updateStatus(lead.id, s)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors disabled:opacity-40 ${
                          lead.status === s
                            ? STATUS_COLORS[s]
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                        }`}
                      >
                        {updating === lead.id && lead.status !== s ? "…" : STATUS_LABELS[s]}
                      </button>
                    ))}
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-colors"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
