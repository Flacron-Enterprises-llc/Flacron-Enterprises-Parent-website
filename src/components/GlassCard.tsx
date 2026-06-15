"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  priority?: "default" | "featured";
  tilt?: boolean;
}

export default function GlassCard({ children, className, priority = "default", tilt = true }: GlassCardProps) {
  const isFeatured = priority === "featured";
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transition: "transform 0.18s ease" }}
      className={cn(
        "relative rounded-2xl border bg-white transition-shadow duration-300",
        isFeatured
          ? "border-[#F97316]/30 shadow-[0_8px_40px_rgba(249,115,22,0.12)]"
          : "border-slate-200 shadow-sm hover:border-[#F97316]/30 hover:shadow-[0_8px_32px_rgba(249,115,22,0.1)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
