"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { canLoadGrowthEngine, installGrowthEngineQueue, loadGrowthEngineSdk } from "@/lib/growth-engine";

/**
 * Loads the Flacron Growth Engine SDK (analytics, lead popup, support chat — all configured in the Growth Engine
 * dashboard). Renders nothing. Skipped on /admin and when NEXT_PUBLIC_FCGE_DISABLED=true. The SDK tracks client-side
 * navigations itself, so there are no manual page() calls here.
 */
export default function GrowthEngine() {
  const pathname = usePathname();
  const allowed = canLoadGrowthEngine(pathname);

  useEffect(() => {
    if (!allowed) return;
    installGrowthEngineQueue();
    loadGrowthEngineSdk();
  }, [allowed]);

  return null;
}
