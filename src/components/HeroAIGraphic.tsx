"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Search, TrendingUp, Users, Zap } from "lucide-react";

const barSets = [
  [38, 62, 45, 80, 58, 92, 70],
  [55, 40, 72, 60, 88, 50, 65],
  [30, 70, 50, 66, 45, 95, 58],
];

const activityPool = [
  { label: "New lead qualified", meta: "Coverline Insurance", color: "#22C55E" },
  { label: "Model retrained", meta: "FraudGuard AI · just now", color: "#FE4705" },
  { label: "Report generated", meta: "Q3 Ops Summary", color: "#3B82F6" },
  { label: "Anomaly flagged", meta: "TrustLayer Inc", color: "#EF4444" },
  { label: "Deal closed", meta: "Apex Fieldworks · $12.4K", color: "#22C55E" },
  { label: "Sync completed", meta: "CRM · BuildRight Ltd", color: "#3B82F6" },
];

const insights = [
  { text: "Churn risk down", value: "18%", color: "text-green-600" },
  { text: "Response time improved", value: "32%", color: "text-green-600" },
  { text: "Leads this hour", value: "+24", color: "text-[#FE4705]" },
];

const stats = [
  { label: "Revenue", values: ["$482K", "$486K", "$491K"] },
  { label: "Leads", values: ["1,204", "1,211", "1,219"] },
  { label: "Uptime", values: ["99.9%", "99.9%", "99.9%"] },
];

export default function HeroAIGraphic() {
  const feedUid = useRef(0);
  const withId = (a: (typeof activityPool)[number]) => ({ ...a, id: ++feedUid.current });

  const [barIdx, setBarIdx] = useState(0);
  const [activeIcon, setActiveIcon] = useState(1);
  const [feed, setFeed] = useState(() => activityPool.slice(0, 3).map(withId));
  const [insightIdx, setInsightIdx] = useState(0);
  const [statIdx, setStatIdx] = useState(0);

  useEffect(() => {
    const barTimer = setInterval(() => setBarIdx((i) => (i + 1) % barSets.length), 2200);
    const iconTimer = setInterval(() => setActiveIcon((i) => (i + 1) % 4), 1800);
    const feedTimer = setInterval(() => {
      setFeed((prev) => {
        const next = withId(activityPool[Math.floor(Math.random() * activityPool.length)]);
        return [next, ...prev.slice(0, 2)];
      });
    }, 2600);
    const insightTimer = setInterval(() => setInsightIdx((i) => (i + 1) % insights.length), 3400);
    const statTimer = setInterval(() => setStatIdx((i) => (i + 1) % stats[0].values.length), 3000);
    return () => {
      clearInterval(barTimer);
      clearInterval(iconTimer);
      clearInterval(feedTimer);
      clearInterval(insightTimer);
      clearInterval(statTimer);
    };
  }, []);

  const insight = insights[insightIdx];

  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* Glow blobs */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -right-6 h-56 w-56 rounded-full bg-[#FE4705]/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-black/10 blur-3xl"
      />

      {/* Browser / app window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-20px_rgba(0, 40, 92,0.35)]"
      >
        {/* Title bar */}
        <div className="relative flex items-center gap-2 overflow-hidden border-b border-slate-100 bg-slate-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-[10px] text-slate-400 border border-slate-200">
            app.flacron.com/dashboard
          </div>
          {/* Scanning sweep */}
          <motion.div
            animate={{ x: ["-20%", "120%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-16 flex-col items-center gap-4 border-r border-slate-100 bg-slate-50/60 py-4 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-xs font-black text-[#FE4705]">F</div>
            {[Search, TrendingUp, Users, Bell].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: i === activeIcon ? "rgba(254, 71, 5,0.15)" : "rgba(0,0,0,0)",
                  color: i === activeIcon ? "#FE4705" : "#94A3B8",
                }}
                transition={{ duration: 0.4 }}
                className="flex h-8 w-8 items-center justify-center rounded-lg"
              >
                <Icon className="h-4 w-4" />
              </motion.div>
            ))}
          </div>

          {/* Main panel */}
          <div className="flex-1 p-4 sm:p-5">
            {/* Header row */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-flacron-navy">Operations Overview</p>
                <p className="text-[11px] text-slate-400">Live · updated just now</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Online
              </span>
            </div>

            {/* Stat cards */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              {stats.map((s) => (
                <div key={s.label} className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
                  <p className="text-[10px] text-slate-400">{s.label}</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={s.values[statIdx]}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className="text-sm font-black text-flacron-navy"
                    >
                      {s.values[statIdx]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="mb-4 flex h-24 items-end gap-1.5 rounded-xl border border-slate-100 bg-slate-50/40 p-3">
              {barSets[barIdx].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.05, ease: "easeInOut" }}
                  className={`flex-1 rounded-t-sm ${i === 5 ? "bg-[#FE4705]" : "bg-slate-200"}`}
                />
              ))}
            </div>

            {/* Activity feed */}
            <div className="space-y-2 overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                {feed.map((a) => (
                  <motion.div
                    key={a.id}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2.5 overflow-hidden rounded-lg border border-slate-100 px-2.5 py-2"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: a.color }} />
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-flacron-navy">{a.label}</p>
                      <p className="truncate text-[10px] text-slate-400">{a.meta}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating AI insight card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.4 },
          scale: { duration: 0.6, delay: 1.4 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
        }}
        className="absolute -bottom-6 -left-6 hidden w-44 rounded-xl border border-slate-200 bg-white p-3 shadow-xl sm:block"
      >
        <div className="mb-1.5 flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-[#FE4705]" />
          <span className="text-[10px] font-bold text-flacron-navy">AI Insight</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={insight.text}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] leading-snug text-slate-500"
          >
            {insight.text} <span className={`font-semibold ${insight.color}`}>{insight.value}</span>
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
