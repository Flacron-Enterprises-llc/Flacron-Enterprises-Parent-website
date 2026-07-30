"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import TrackedLink from "@/components/TrackedLink";

export default function StickyDemoCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const hidden = pathname?.startsWith("/admin") || pathname === "/book-demo";

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
          <TrackedLink
            href="/book-demo"
            event="cta_sticky_side"
            className="ripple-btn flex items-center gap-2 rounded-l-2xl bg-[#FE4705] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(254, 71, 5,0.35)] hover:bg-[#D83C04] hover:pr-5 transition-all"
          >
            <CalendarCheck className="h-4 w-4" />
            <span style={{ writingMode: "horizontal-tb" }}>Book a Demo</span>
          </TrackedLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
