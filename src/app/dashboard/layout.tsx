"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, KeyRound, BarChart3, Settings, LogOut, Menu, X, CreditCard, ChevronRight, Sparkles } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "API Keys", href: "/dashboard/keys", icon: KeyRound },
  { label: "Usage", href: "/dashboard/usage", icon: BarChart3 },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

type MiniMe = { orgName: string; plan: { name: string } };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [me, setMe] = useState<MiniMe | null>(null);

  useEffect(() => {
    if (pathname === "/dashboard/login") return;
    fetch("/api/customer/me")
      .then((r) => (r.ok ? r.json() : null))
      .then(setMe)
      .catch(() => {});
  }, [pathname]);

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/customer/auth/login", { method: "DELETE" });
    router.push("/dashboard/login");
  }

  const SidebarContent = () => (
    <>
      <div className="relative px-5 py-4 border-b border-white/5 flex items-center justify-between overflow-hidden">
        <div className="pointer-events-none absolute inset-0 particle-grid opacity-10" />
        <Link href="/" className="relative z-10">
          <span className="text-xl font-black tracking-wider text-[#FE4705]">FLACRON</span>
          <span className="ml-2 text-xs font-medium text-slate-500">AI Engine</span>
        </Link>
        <button className="relative z-10 lg:hidden p-1 text-slate-500 hover:text-white" onClick={() => setSidebarOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                active ? "bg-[#FE4705]/15 text-[#FE4705]" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} className={active ? "text-[#FE4705]" : "text-slate-500 group-hover:text-slate-300"} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto text-[#FE4705]/60" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-3">
        <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FE4705]/15 text-[10px] font-black text-[#FE4705]">
              {(me?.orgName || "?").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">{me?.orgName || "Loading…"}</p>
              <p className="flex items-center gap-1 text-[10px] text-slate-400">
                <Sparkles size={9} className="text-[#FE4705]" />
                {me?.plan?.name || "—"} plan
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pb-4 border-t border-white/5 pt-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="app-shell" style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", background: "#f8fafc", overflow: "hidden" }}>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`
          app-sidebar fixed lg:relative inset-y-0 left-0 z-50 w-64 shrink-0 bg-[#00285C] flex flex-col h-full
          transform transition-transform duration-200 ease-in-out lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="app-mobile-topbar lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors">
            <Menu size={18} />
          </button>
          <span className="text-sm font-bold text-[#FE4705] tracking-wider">FLACRON AI Engine</span>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(254, 71, 5,0.06)_0%,transparent_60%)]" />

        <main className="app-main flex-1 overflow-y-auto relative">{children}</main>
      </div>
    </div>
  );
}
