"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({ eyebrow, title, description, centered = false, light = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" as const }}
      className={cn("mb-8 sm:mb-12", centered && "text-center")}
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#F97316] sm:mb-3 sm:text-sm">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-2xl font-black leading-tight sm:text-3xl lg:text-4xl",
          light ? "text-white" : "text-flacron-navy"
        )}
        style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
      >
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base lg:text-lg",
          centered && "mx-auto max-w-2xl",
          light ? "text-slate-300" : "text-slate-500"
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
