import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { getApps } from "@/lib/apps-data";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import StickyDemoCTA from "@/components/StickyDemoCTA";
import LiveChatWidget from "@/components/LiveChatWidget";
import NewsletterSignup from "@/components/NewsletterSignup";
import SocialLinks from "@/components/SocialLinks";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
    { label: "Cancellation & Refunds", href: "/refund-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Cookies Policy", href: "/cookies" },
  ],
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const apps = await getApps();
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full`}>
      <head>
        <Script id="gtm-init" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5VNG2BZ9');`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-flacron-navy antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5VNG2BZ9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
        <ThemeProvider>
          <ToastProvider>
            <ScrollProgress />
            <Navbar apps={apps} />
            <Breadcrumbs />
            <main className="flex-1">{children}</main>
            <BackToTop />
            <StickyDemoCTA />
            <LeadCapturePopup />
            <LiveChatWidget />

            <footer className="bg-flacron-navy text-white">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Top */}
                <div className="flex flex-col gap-12 lg:flex-row">
                  {/* Brand */}
                  <div className="lg:w-64 shrink-0">
                    <Link href="/" className="flex items-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-1.5">
                        <Image src="/logo.png" alt="Flacron Enterprises" width={48} height={48} className="h-full w-full object-contain" />
                      </span>
                    </Link>
                    <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                      AI Apps for a Smarter World. Building intelligent solutions for business growth, automation, and digital transformation.
                    </p>
                    <p className="mt-4 text-xs text-slate-500">410 E 95th St, Brooklyn, NY 11212</p>
                    <p className="mt-1 text-xs text-slate-500">929-444-1275 · Contact@flacronenterprises.com</p>
                    <SocialLinks className="mt-5" />
                  </div>

                  {/* Newsletter */}
                  <div className="lg:w-72 shrink-0">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Stay in the loop</p>
                    <p className="mb-3 text-sm text-slate-400 leading-relaxed">Product updates and new AI launches, straight to your inbox.</p>
                    <NewsletterSignup />
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
                  <p className="text-sm text-slate-500">© 2026 Flacron Enterprises LLC. All rights reserved.</p>
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
