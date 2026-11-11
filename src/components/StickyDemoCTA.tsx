"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import TrackedLink from "@/components/TrackedLink";

/** Side tab offering a demo once the visitor has scrolled a while (desktop only). */
export default function StickyDemoCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const hidden =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard") ||
    pathname === "/book-demo" ||
    pathname?.startsWith("/ai-engine/login");

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 900);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
          <TrackedLink
            href="/book-demo"
            event="cta_sticky_side"
            className="flex items-center gap-2 rounded-l-xl bg-cta py-3 pl-4 pr-3.5 text-sm font-semibold text-on-cta shadow-lg transition-[background-color,padding] hover:bg-cta-hover hover:pr-5"
          >
            <CalendarCheck className="h-4 w-4" />
            Book a demo
          </TrackedLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
