"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import TrackedLink from "@/components/TrackedLink";
import { track } from "@/lib/analytics";

const HOURLY_COST = 45;
const AUTOMATION_RATE = 0.4;

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [touched, setTouched] = useState(false);

  const { hoursSavedPerWeek, monthlySavings, hoursSavedPerYear } = useMemo(() => {
    const weeklyManualHours = teamSize * hoursPerWeek;
    const saved = weeklyManualHours * AUTOMATION_RATE;
    return {
      hoursSavedPerWeek: Math.round(saved),
      monthlySavings: Math.round(saved * 4.33 * HOURLY_COST),
      hoursSavedPerYear: Math.round(saved * 52),
    };
  }, [teamSize, hoursPerWeek]);

  function handleSlide() {
    if (!touched) {
      setTouched(true);
      track("roi_calculator_used");
    }
  }

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="mb-6 flex items-center gap-3 sm:mb-8">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FE4705]/10">
          <Calculator className="h-5 w-5 text-[#FE4705]" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#FE4705]">Estimate Your ROI</p>
          <h3 className="text-lg font-bold text-flacron-navy sm:text-xl">See what AI could save your team.</h3>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-flacron-navy">Team size</label>
              <span className="text-sm font-bold text-[#FE4705]">{teamSize} people</span>
            </div>
            <input
              type="range"
              min={1}
              max={200}
              value={teamSize}
              onChange={(e) => { setTeamSize(Number(e.target.value)); handleSlide(); }}
              className="w-full accent-[#FE4705]"
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-flacron-navy">Hours/week on manual work (per person)</label>
              <span className="text-sm font-bold text-[#FE4705]">{hoursPerWeek}h</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={hoursPerWeek}
              onChange={(e) => { setHoursPerWeek(Number(e.target.value)); handleSlide(); }}
              className="w-full accent-[#FE4705]"
            />
          </div>
        </div>

        {/* Output */}
        <div className="rounded-2xl bg-black p-6 text-center sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Estimated monthly savings</p>
          <p className="mt-2 text-4xl font-black text-[#FE4705] sm:text-5xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
            ${monthlySavings.toLocaleString()}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
            <div>
              <p className="text-lg font-bold text-white">{hoursSavedPerWeek}h</p>
              <p className="text-xs text-slate-400">saved / week</p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{hoursSavedPerYear.toLocaleString()}h</p>
              <p className="text-xs text-slate-400">saved / year</p>
            </div>
          </div>
        </div>
      </div>

      <TrackedLink
        href="/book-demo"
        event="cta_roi_calculator"
        eventData={{ teamSize, hoursPerWeek, monthlySavings }}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FE4705] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#D83C04] transition-colors sm:w-auto sm:mx-auto"
      >
        Get My Personalized Plan <ArrowRight className="h-4 w-4" />
      </TrackedLink>
      <p className="mt-3 text-center text-xs text-slate-400">Estimate only — based on average automation impact across Flacron customers.</p>
    </div>
  );
}
