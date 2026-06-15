import type { Metadata } from "next";
import { getApps } from "@/lib/apps-data";
import AppGrid from "@/components/AppGrid";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ecosystem — Flacron Enterprises",
  description: "Explore the full Flacron Enterprises ecosystem of AI-powered products. Filter by industry, category, and status.",
};

export default async function EcosystemPage() {
  const apps = await getApps();
  return (
    <div className="min-h-screen pt-6 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="mb-8 sm:mb-16 text-center">
          <SectionHeader
            eyebrow="Full Ecosystem"
            title="Every product. One mission."
            description="Browse the complete suite of Flacron Enterprises AI products. New solutions are added continuously — this is where you find them all."
            centered
          />
        </div>

        {/* Stats */}
        <div className="mb-6 sm:mb-12 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
          {[
            { value: `${apps.length}`, label: "Products" },
            { value: `${apps.filter(a => a.status === "live").length}`, label: "Live Now" },
            { value: `${apps.filter(a => a.status === "coming-soon" || a.status === "beta").length}`, label: "In Dev" },
            { value: "6+", label: "Industries" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-4 text-center">
              <p className="text-2xl font-black text-[#F97316] sm:text-3xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>{s.value}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        <AppGrid apps={apps} mode="full" />

        {/* More coming */}
        <div className="mt-10 sm:mt-20 rounded-2xl bg-orange-50 border border-orange-100 p-6 sm:p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F97316] mb-2">Growing Ecosystem</p>
          <h3 className="text-2xl font-black text-flacron-navy" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
            More solutions are on the way.
          </h3>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto text-sm">
            We are continuously building and launching new AI-powered products. Want to be first to know?
          </p>
          <a href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors">
            Stay in the Loop
          </a>
        </div>
      </div>
    </div>
  );
}
