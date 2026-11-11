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
    <div className="card overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Inputs */}
        <div className="p-6 sm:p-10">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft">
              <Calculator aria-hidden className="h-5 w-5 text-accent-text" />
            </span>
            <div>
              <p className="text-sm font-semibold text-accent-text">Estimate your ROI</p>
              <h3 className="font-display text-lg font-semibold text-text sm:text-xl">See what AI could save your team.</h3>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <label htmlFor="roi-team" className="text-sm font-medium text-text">Team size</label>
                <output htmlFor="roi-team" className="font-display text-base font-semibold tabular-nums text-text">{teamSize} people</output>
              </div>
              <input
                id="roi-team"
                type="range"
                min={1}
                max={200}
                value={teamSize}
                onChange={(e) => { setTeamSize(Number(e.target.value)); handleSlide(); }}
                className="w-full cursor-pointer accent-[var(--cta)]"
              />
            </div>
            <div>
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <label htmlFor="roi-hours" className="text-sm font-medium text-text">Hours/week on manual work (per person)</label>
                <output htmlFor="roi-hours" className="font-display text-base font-semibold tabular-nums text-text">{hoursPerWeek}h</output>
              </div>
              <input
                id="roi-hours"
                type="range"
                min={1}
                max={30}
                value={hoursPerWeek}
                onChange={(e) => { setHoursPerWeek(Number(e.target.value)); handleSlide(); }}
                className="w-full cursor-pointer accent-[var(--cta)]"
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="band flex flex-col justify-between p-6 sm:p-10" aria-live="polite">
          <div>
            <p className="text-sm font-medium text-band-muted">Estimated monthly savings</p>
            <p className="mt-2 font-display text-5xl font-semibold tabular-nums tracking-[-0.03em] text-white sm:text-6xl">
              ${monthlySavings.toLocaleString()}
            </p>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div className="flex flex-col-reverse">
              <dt className="text-sm text-band-muted">saved / week</dt>
              <dd className="font-display text-2xl font-semibold tabular-nums text-white">{hoursSavedPerWeek}h</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-sm text-band-muted">saved / year</dt>
              <dd className="font-display text-2xl font-semibold tabular-nums text-white">{hoursSavedPerYear.toLocaleString()}h</dd>
            </div>
          </dl>
          <TrackedLink
            href="/book-demo"
            event="cta_roi_calculator"
            eventData={{ teamSize, hoursPerWeek, monthlySavings }}
            className="btn btn-primary btn-lg mt-8 w-full"
          >
            Get My Personalized Plan <ArrowRight aria-hidden className="h-4 w-4" />
          </TrackedLink>
        </div>
      </div>
      <p className="border-t border-border px-6 py-4 text-center text-[13px] text-text-muted sm:px-10">
        Estimate only — based on average automation impact across Flacron customers.
      </p>
    </div>
  );
}
