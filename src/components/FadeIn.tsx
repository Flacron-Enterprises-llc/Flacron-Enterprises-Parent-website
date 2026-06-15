"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function FadeIn({ children, className, delay = 0, direction = "up" }: FadeInProps) {
  const initial =
    direction === "up"    ? { opacity: 0, y: 32 } :
    direction === "left"  ? { opacity: 0, x: -24 } :
    direction === "right" ? { opacity: 0, x: 24 } :
                            { opacity: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
