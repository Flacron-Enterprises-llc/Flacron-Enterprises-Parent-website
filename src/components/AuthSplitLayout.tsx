import Link from "next/link";
import { Check } from "lucide-react";

const highlights = [
  "Industry-tuned AI models for construction, insurance, and sales",
  "Sub-200ms inference with usage-based or flat-rate plans",
  "Personalized outputs — your region, units, currency, and markup",
  "SOC 2-ready infrastructure with zero data retention",
];

export default function AuthSplitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Left — branding panel */}
      <div className="relative hidden overflow-hidden bg-flacron-navy lg:flex lg:flex-col lg:justify-between p-10 xl:p-14">
        <div className="pointer-events-none absolute inset-0 particle-grid opacity-10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_100%,rgba(254, 71, 5,0.15)_0%,transparent_70%)]" />

        <div className="relative z-10">
          <Link href="/">
            <span className="text-2xl font-black tracking-wider text-[#FE4705]">FLACRON</span>
            <span className="ml-2 text-sm font-medium text-slate-400">AI Engine</span>
          </Link>
        </div>

        <div className="relative z-10">
          <h1
            className="text-3xl font-black leading-tight text-white xl:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
          >
            The intelligence<br /><span className="text-[#FE4705]">behind everything.</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm text-slate-400 leading-relaxed">
            One dashboard to manage your API keys, usage, and personalization across the entire Flacron AI ecosystem.
          </p>
          <ul className="mt-6 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-slate-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FE4705]" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-slate-500">© 2026 Flacron Enterprises. All rights reserved.</p>
      </div>

      {/* Right — form panel */}
      <div className="flex min-h-screen flex-col justify-center bg-white px-4 py-12 sm:px-6 lg:px-12 xl:px-20">
        <div className="mx-auto w-full max-w-sm lg:hidden mb-8 text-center">
          <span className="text-2xl font-black tracking-wider text-flacron-navy">FLACRON</span>
          <span className="ml-2 text-sm font-medium text-slate-400">AI Engine</span>
        </div>
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
