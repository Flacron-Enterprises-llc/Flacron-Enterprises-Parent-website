import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { getApps } from "@/lib/apps-data";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Breadcrumbs from "@/components/Breadcrumbs";
import StickyDemoCTA from "@/components/StickyDemoCTA";
import GrowthEngine from "@/components/GrowthEngine";
import BrandLogo from "@/components/BrandLogo";
import NewsletterSignup from "@/components/NewsletterSignup";
import SocialLinks from "@/components/SocialLinks";
import OrganizationSchema from "@/components/OrganizationSchema";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap", preload: true });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap", preload: true });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050d1c" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Flacron Enterprises — AI Apps for a Smarter World",
    template: "%s | Flacron Enterprises",
  },
  description:
    "Flacron Enterprises builds AI-powered apps that transform business across construction, insurance, sales, cybersecurity, sports, and personal growth.",
  keywords: ["AI", "technology", "construction", "insurance", "cybersecurity", "SaaS", "Flacron"],
  authors: [{ name: "Flacron Enterprises" }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Flacron Enterprises — AI Apps for a Smarter World",
    description: "Flacron Enterprises builds AI-powered apps that transform business across construction, insurance, sales, cybersecurity, sports, and personal growth.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Flacron Enterprises — AI Apps for a Smarter World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flacron Enterprises — AI Apps for a Smarter World",
    description: "AI-powered apps that transform business across construction, insurance, sales, cybersecurity, sports, and personal growth.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const apps = await getApps();
  const footerColumns = {
    Company: footerLinks.Company,
    Products: apps.map((a) => ({ label: a.name, href: `/apps/${a.slug}` })),
    Explore: footerLinks.Explore,
    Legal: footerLinks.Legal,
  };
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} h-full`}>
      <head>
        {/* Applies the saved or system theme before first paint (no flash). Must stay the first thing in <head>. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Script id="oaiq-pixel" strategy="beforeInteractive">
          {`!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"Mj8SzpYToZ9K41QXQgB4pg",debug:true});`}
        </Script>
        <Script id="gtm-init" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5VNG2BZ9');`}
        </Script>
      </head>
      <body className="flex min-h-full flex-col bg-bg text-text antialiased">
        <OrganizationSchema />
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
            <main id="main" className="flex-1">{children}</main>
            <BackToTop />
            <StickyDemoCTA />
            <GrowthEngine />

            <footer className="band overflow-hidden">
              <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-70" />
              <div className="container-page pb-10 pt-16 sm:pt-20">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16">
                  {/* Brand + newsletter */}
                  <div className="max-w-md">
                    <BrandLogo inverse />
                    <p className="mt-5 text-[15px] leading-relaxed text-band-muted">
                      AI Apps for a Smarter World. Building intelligent solutions for business growth, automation, and digital transformation.
                    </p>
                    <address className="mt-5 space-y-1 text-sm not-italic text-band-muted">
                      <p>410 E 95th St, Brooklyn, NY 11212</p>
                      <p>
                        <a href="tel:+19294441275" className="hover:text-white">929-444-1275</a>
                        <span aria-hidden className="mx-2 opacity-50">/</span>
                        <a href="mailto:Contact@flacronenterprises.com" className="hover:text-white">Contact@flacronenterprises.com</a>
                      </p>
                    </address>
                    <SocialLinks className="mt-6" />

                    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="font-display text-base font-semibold text-white">Stay in the loop</p>
                      <p className="mb-4 mt-1 text-sm leading-relaxed text-band-muted">Product updates and new AI launches, straight to your inbox.</p>
                      <NewsletterSignup />
                    </div>
                  </div>

                  {/* Link columns */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
                    {Object.entries(footerColumns).map(([group, links]) => (
                      <nav key={group} aria-label={group}>
                        <p className="mb-4 text-sm font-semibold text-white">{group}</p>
                        <ul className="space-y-2.5">
                          {links.map(({ label, href }) => (
                            <li key={`${group}-${href}`}>
                              <Link href={href} className="text-sm text-band-muted transition-colors hover:text-white">{label}</Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    ))}
                  </div>
                </div>

                <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-sm text-band-muted sm:flex-row sm:items-center">
                  <p>© 2026 Flacron Enterprises LLC. All rights reserved.</p>
                  <p>Microsoft Partner · IBM Certified · ISO 27001 Aligned</p>
                </div>
              </div>
            </footer>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
