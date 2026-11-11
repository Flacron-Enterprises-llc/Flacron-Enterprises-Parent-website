"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { safeHttpUrl } from "@/lib/app-display";

interface AppLogoProps {
  name: string;
  /** https URL of a transparent product mark. Initials are shown when missing or when the image fails to load. */
  logoUrl?: string;
  size?: number;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    // "FlacronBuild" -> "FB": use capitals inside a camel-cased single word when there are two or more.
    const caps = parts[0].match(/[A-Z]/g);
    if (caps && caps.length >= 2) return (caps[0] + caps[1]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/**
 * Product mark on a rounded tile. A real logo sits on a soft light tile (legible in both themes, whatever the logo's
 * colours); without one, the initials sit on a brand-orange gradient.
 */
export default function AppLogo({ name, logoUrl, size = 48, className }: AppLogoProps) {
  const src = safeHttpUrl(logoUrl);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = !!src && failedSrc !== src;
  const radius = Math.round(size * 0.28);

  if (showImage) {
    const pad = Math.max(4, Math.round(size * 0.14));
    return (
      <span
        className={cn("logo-tile inline-flex shrink-0 items-center justify-center overflow-hidden", className)}
        style={{ width: size, height: size, borderRadius: radius, padding: pad }}
      >
        {/* Plain <img>: product logos are hosted on many product domains, so next/image remotePatterns can't list them. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${name} logo`}
          width={size - pad * 2}
          height={size - pad * 2}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailedSrc(src)}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={name}
      className={cn("inline-flex shrink-0 select-none items-center justify-center font-display font-semibold text-white", className)}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        fontSize: Math.round(size * 0.36),
        letterSpacing: "-0.02em",
        background: "linear-gradient(140deg, #ff6a2b 0%, #fe4705 45%, #c73804 100%)",
        boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.25), inset 0 -1px 0 rgb(0 0 0 / 0.12)",
      }}
    >
      {getInitials(name)}
    </span>
  );
}
