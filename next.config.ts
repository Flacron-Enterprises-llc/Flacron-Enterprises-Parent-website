import type { NextConfig } from "next";

// Old WordPress-style URLs that Search Console reports as 404. Next strips trailing slashes before custom
// redirects run, so "/about-us/" reaches the destination via "/about-us" (two 308s).
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
    return [
      ...legacyRedirects.map(([from, to]) => ({
        source: from,
        destination: to,
        permanent: true,
      })),
      // Document verification links in the "/verify/CODE" form land on the verify page with the code filled in.
      { source: "/verify/:code([A-Za-z0-9]{6,32})", destination: "/verify?code=:code", permanent: false },
    ];
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
