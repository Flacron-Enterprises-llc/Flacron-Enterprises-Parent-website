import type { NextConfig } from "next";

// Old WordPress-style URLs that Search Console reports as 404. "{/}?" matches the path with or without a
// trailing slash in one rule, so there is no slash-strip hop before the redirect.
const legacyRedirects: Array<[string, string]> = [
  ["/home", "/"],
  ["/about-us", "/about"],
  ["/contact-us", "/contact"],
  ["/terms-conditions", "/terms"],
  ["/privacy-policy-2", "/privacy"],
  ["/flacronbuild", "/apps/flacronbuild"],
  ["/flacronconnect-ai", "/apps/flacronconnect-ai"],
  ["/rapidclaimpro", "/apps/rapidclaimpro"],
  ["/flacronsport", "/apps/flacronsport"],
  ["/flacronsport-daily", "/apps/flacronsport"],
  ["/tchitaka-growth", "/apps/beingtchitaka"],
  ["/cryptopilot-ai", "/apps/cryptopilotai"],
  ["/flacroncv", "/apps/flacroncv"],
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return legacyRedirects.map(([from, to]) => ({
      source: `${from}{/}?`,
      destination: to,
      permanent: true,
    }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
