"use client";

import { ReactNode, useEffect, useRef } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Kept for API compatibility; every reveal is a short rise. */
  direction?: "up" | "left" | "right" | "none";
}

/**
 * Gentle reveal on scroll. The markup is identical on server and client and only CSS hides it (and only when JS runs,
 * see `.js-reveal` in globals.css), so content is never stuck invisible; reduced-motion visitors see it immediately.
 */
export default function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal="" className={className} style={{ ["--reveal-delay" as string]: `${Math.round(Math.min(delay, 0.3) * 1000)}ms` }}>
      {children}
    </div>
  );
}
