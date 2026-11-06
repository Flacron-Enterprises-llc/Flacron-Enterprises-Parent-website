import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { getApps } from "@/lib/apps-data";
import { SITE_NAME, SITE_URL, OG_IMAGE, absoluteUrl } from "@/lib/site";
import { productWebsites } from "@/data/product-websites";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Flacron Enterprises LLC is a Brooklyn, New York software company that builds AI-powered apps, including FlacronAI, FlacronCV, Flacron Game Zone, Being Tchitaka OS and Flacron API Engine.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "About | Flacron Enterprises",
    url: "/about",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "About — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "About | Flacron Enterprises", images: [OG_IMAGE] },
};

const STATUS_LABELS: Record<string, string> = { live: "Live", beta: "Beta", "coming-soon": "Coming Soon", internal: "Internal" };

const values = [
  { title: "Industry First", desc: "We build products that solve real, specific industry problems — not generic tools dressed up as AI." },
  { title: "Ecosystem Thinking", desc: "Our products are designed to work together. Each new solution strengthens the whole platform." },
  { title: "Accessible AI", desc: "Enterprise-grade AI shouldn't require a huge team to use. We make powerful technology usable." },
  { title: "Long-Term Partnership", desc: "We build for the long run. We keep improving every product after launch." },
];

export default async function AboutPage() {
  const apps = [...(await getApps())].sort((a, b) => a.name.localeCompare(b.name));
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#webpage`,
    url: absoluteUrl("/about"),
    name: "About Flacron Enterprises",
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      name: "Products by Flacron Enterprises LLC",
      itemListElement: apps.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.name,
        url: absoluteUrl(`/apps/${a.slug}`),
      })),
    },
  };
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      {/* Hero */}
      <section className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#FE4705]">About Us</p>
          <h1 className="text-3xl font-black leading-tight text-flacron-navy sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
            One company. One ecosystem.{" "}
            <span className="text-[#FE4705]">Many solutions.</span>
          </h1>
          <p className="mt-4 text-base text-slate-500 leading-relaxed max-w-2xl mx-auto sm:mt-6 sm:text-xl">
            Flacron Enterprises LLC is a software company based in Brooklyn, New York. We build and run a family of AI-powered apps for construction, insurance, business, finance, security, sports and personal growth. Every product listed below is made by Flacron Enterprises LLC. Our official website is flacronenterprises.com.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="What We Build" title="Our products" centered />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((a) => {
              const website = productWebsites[a.slug];
              return (
                <div key={a.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-flacron-navy">{a.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {a.category} · {STATUS_LABELS[a.status] ?? a.status}
                  </p>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">{a.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                    <Link href={`/apps/${a.slug}`} className="text-[#FE4705] hover:text-[#D83C04] transition-colors">Product page</Link>
                    {website && (
                      <a href={website} target="_blank" rel="noopener" className="text-[#FE4705] hover:text-[#D83C04] transition-colors">Official website</a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <SectionHeader eyebrow="Our Mission" title="Technology that serves real people." />
              <p className="text-slate-500 leading-relaxed">
                We started Flacron Enterprises with a single belief: the best software is built around the people who use it, not the other way around. Too many businesses are forced to adapt their workflows to fit rigid software. We build the other way — starting with the problems industries actually face and working backwards to the technology.
              </p>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Today, our ecosystem spans construction, insurance, cybersecurity, business growth, sports engagement, and personal development. Tomorrow, it will grow further. Every product we build shares the same foundation: AI-powered intelligence, enterprise reliability, and genuine user value.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { value: `${apps.length}`, label: "Products" },
                { value: `${apps.filter((a) => a.status === "live").length}`, label: "Live" },
                { value: `${new Set(apps.map((a) => a.category)).size}`, label: "Industries" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <p className="text-4xl font-black text-[#FE4705]" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>{s.value}</p>
                  <p className="mt-2 text-sm font-medium text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 sm:py-20 bg-flacron-navy">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Our Vision" title="The ecosystem of the future." light centered />
          <p className="text-center text-slate-300 max-w-2xl mx-auto -mt-6 mb-12">
            We envision a world where every business — regardless of size or industry — has access to the same quality of AI-powered tools that only the largest enterprises could previously afford.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader eyebrow="Join Us" title="Be part of the ecosystem." centered />
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link href="/ecosystem" className="rounded-xl bg-[#FE4705] px-6 py-3 text-sm font-semibold text-white hover:bg-[#D83C04] transition-colors shadow-sm text-center sm:px-8 sm:py-4 sm:text-base">
              Explore Products
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-flacron-navy hover:border-[#FE4705] hover:text-[#FE4705] transition-colors sm:px-8 sm:py-4 sm:text-base">
              Get In Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
