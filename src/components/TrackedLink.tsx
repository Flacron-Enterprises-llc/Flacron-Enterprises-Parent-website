"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";
import { handleCursorGlow } from "@/lib/cursorGlow";
import { cn } from "@/lib/utils";

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  event: string;
  eventData?: Record<string, unknown>;
  glow?: boolean;
}

export default function TrackedLink({ event, eventData, onClick, glow = false, className, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      className={cn(glow && "cursor-glow", className)}
      onMouseMove={glow ? handleCursorGlow : undefined}
      onClick={(e) => {
        track(event, eventData);
        onClick?.(e);
      }}
    />
  );
}
