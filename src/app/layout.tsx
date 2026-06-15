import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getApps } from "@/lib/apps-data";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Breadcrumbs from "@/components/Breadcrumbs";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap", preload: true });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap", preload: true });

export const metadata: Metadata = {
  title: {
    default: "Flacron Enterprises — AI Apps for a Smarter World",
    template: "%s | Flacron Enterprises",
  },
  description:
    "Flacron Enterprises builds AI-powered apps that transform business across construction, insurance, sales, cybersecurity, sports, and personal growth.",
  keywords: ["AI", "technology", "construction", "insurance", "cybersecurity", "SaaS", "Flacron"],
  authors: [{ name: "Flacron Enterprises" }],
  metadataBase: new URL("https://flacron.com"),
  openGraph: {
    type: "website",
    siteName: "Flacron Enterprises",
    title: "Flacron Enterprises — AI Apps for a Smarter World",
    description: "Flacron Enterprises builds AI-powered apps that transform business across construction, insurance, sales, cybersecurity, sports, and personal growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flacron Enterprises — AI Apps for a Smarter World",
    description: "AI-powered apps that transform business across construction, insurance, sales, cybersecurity, sports, and personal growth.",
  },
  manifest: "/manifest.json",
};

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Demo", href: "/book-demo" },
  ],
  Products: [
    { label: "FlacronBuild", href: "/apps/flacronbuild" },
    { label: "FlacronConnect AI", href: "/apps/flacronconnect-ai" },
    { label: "RapidClaimPro", href: "/apps/rapidclaimpro" },
    { label: "FlacronSport", href: "/apps/flacronsport" },
    { label: "Tchitaka Growth", href: "/apps/beingtchitaka" },
    { label: "FlacronSecure AI", href: "/apps/flacronsecure-ai" },
  ],
  Explore: [
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "AI Engine", href: "/ai-engine" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const revalidate = 60;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const apps = await getApps();
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-flacron-navy antialiased">
        <ThemeProvider>
          <ToastProvider>
            <ScrollProgress />
            <Navbar apps={apps} />
            <Breadcrumbs />
            <main className="flex-1">{children}</main>
            <BackToTop />

            <footer className="bg-flacron-navy text-white">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Top */}
                <div className="flex flex-col gap-12 lg:flex-row">
                  {/* Brand */}
                  <div className="lg:w-64 shrink-0">
                    <Link href="/">
                      <span className="text-2xl font-black tracking-wider text-[#F97316]">FLACRON</span>
                      <span className="ml-2 text-sm font-medium text-slate-400">Enterprises</span>
                    </Link>
                    <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                      AI Apps for a Smarter World. Building intelligent solutions for business growth, automation, and digital transformation.
                    </p>
                    <p className="mt-4 text-xs text-slate-500">410 E 95th St, Brooklyn, NY 11212</p>
                    <p className="mt-1 text-xs text-slate-500">929-444-1275 · Contact@flacronenterprises.com</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {[
                        { label: "LinkedIn", href: "https://linkedin.com/company/flacronenterprises" },
                        { label: "Instagram", href: "https://instagram.com/flacronenterprises" },
                        { label: "X", href: "https://x.com/flacronenterprises" },
                        { label: "Facebook", href: "https://facebook.com/flacronenterprises" },
                        { label: "TikTok", href: "https://tiktok.com/@flacronenterprises" },
                        { label: "YouTube", href: "https://youtube.com/@flacronenterprises" },
                      ].map(({ label, href }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:border-white/30 transition-colors">
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                    {Object.entries(footerLinks).map(([group, links]) => (
                      <div key={group}>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{group}</p>
                        <ul className="space-y-2.5">
                          {links.map(({ label, href }) => (
                            <li key={label}>
                              <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <p className="text-sm text-slate-500">© 2026 Flacron Enterprises. All rights reserved.</p>
                  <p className="text-xs text-slate-600">Microsoft Partner · IBM Certified · ISO 27001 Aligned</p>
                </div>
              </div>
            </footer>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
