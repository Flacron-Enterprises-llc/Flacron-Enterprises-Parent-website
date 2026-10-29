"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface CountUpProps {
  value: string;
  className?: string;
}

function parseValue(raw: string) {
  const match = raw.match(/^([^\d.]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw, decimals: 0 };
  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, number: parseFloat(numStr), suffix, decimals };
}

export default function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { prefix, number, suffix, decimals } = parseValue(value);
  // The server HTML and first client render show the real final value. Only counters that are still
  // below the fold after hydration get armed to count up, so nothing visible ever jumps back to 0.
  const [display, setDisplay] = useState(number.toFixed(decimals));
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setDisplay((0).toFixed(decimals));
    setArmed(true);
  }, [decimals]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, number, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [armed, inView, number, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
