"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import TrackedLink from "@/components/TrackedLink";
import CountUp from "@/components/CountUp";
import HeroAIGraphic from "@/components/HeroAIGraphic";

const customers = ["BuildRight Ltd", "NovaSales", "TrustLayer Inc", "Apex Fieldworks", "Coverline Insurance"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stats = [
  { value: "9+", label: "AI Products" },
  { value: "6", label: "Industries" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "2×", label: "Faster Ops" },
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const graphicY = useTransform(scrollY, [0, 600], [0, -60]);
  const graphicOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-4">

      {/* Animated aurora layer */}
      <div className="pointer-events-none absolute inset-0 hero-aurora" />

      {/* Particle dot grid */}
      <div className="pointer-events-none absolute inset-0 particle-grid opacity-30" />

      {/* Soft vignette — very subtle so particles stay visible */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_50%,rgba(255,255,255,0.6)_100%)]" />

      {/* Blue accent */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] bg-[radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.07)_0%,transparent_65%)]" />

      {/* Content — pt clears the fixed navbar */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left — content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full text-center lg:text-left"
          >
            {/* Eyebrow */}
            <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 sm:mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#FE4705]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FE4705] animate-pulse" />
                AI Apps for a Smarter World
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={item}
              className="text-4xl font-black leading-[1.05] tracking-tight text-flacron-navy sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl"
              style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
            >
              One Ecosystem.{" "}
              <span className="text-[#FE4705]">Multiple</span>{" "}
              <br className="hidden sm:block" />
              AI-Powered{" "}
              <span className="text-[#FE4705]">Solutions.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={item}
              className="mx-auto mt-5 max-w-2xl text-base text-slate-600 leading-relaxed sm:mt-6 sm:text-lg md:text-xl lg:mx-0"
            >
              Discover Flacron Enterprises&apos; ecosystem of intelligent applications for
              construction, insurance, lead generation, cybersecurity, sports, and personal growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center lg:justify-start"
            >
              <TrackedLink
                href="/ecosystem"
                event="cta_explore_ecosystem_hero"
                className="ripple-btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FE4705] px-8 py-4 text-sm font-semibold text-white hover:bg-[#D83C04] transition-colors shadow-[0_4px_20px_rgba(254, 71, 5,0.3)] sm:w-auto sm:text-base"
              >
                Explore Ecosystem <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/book-demo"
                event="cta_book_demo_hero"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-flacron-navy hover:border-[#FE4705] hover:text-[#FE4705] transition-colors sm:w-auto sm:text-base"
              >
                Book a Demo
              </TrackedLink>
            </motion.div>

            {/* Customer logos — above the fold social proof */}
            <motion.div variants={item} className="mt-7 sm:mt-8">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 sm:text-xs">Trusted by teams at</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
                {customers.map((c) => (
                  <span key={c} className="text-sm font-bold text-slate-400 sm:text-base">{c}</span>
                ))}
              </div>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={item}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:mt-12"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-3 shadow-sm"
                >
                  <CountUp
                    value={s.value}
                    className="block text-xl font-black text-[#FE4705] sm:text-2xl"
                  />
                  <p className="text-xs font-medium text-slate-500">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 sm:gap-6 sm:text-sm lg:justify-start"
            >
              {["Microsoft Partner", "IBM Certified", "ISO 27001 Aligned", "Enterprise Ready"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#FE4705]" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — abstract AI graphic */}
          <motion.div
            style={{ y: graphicY, opacity: graphicOpacity }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <HeroAIGraphic />
          </motion.div>
        </div>

        {/* Scroll indicator — only on tall viewports */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="text-slate-300"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
