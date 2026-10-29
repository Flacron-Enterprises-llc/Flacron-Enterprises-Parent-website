import type { Metadata } from "next";

// Sign-in page: keep it out of search results. Deliberately not in robots.txt Disallow, so crawlers can read this tag.
export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: true },
};

export default function DashboardLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
