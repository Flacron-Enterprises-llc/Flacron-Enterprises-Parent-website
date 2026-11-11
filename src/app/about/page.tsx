import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import AppLogo from "@/components/AppLogo";
import StatusBadge from "@/components/StatusBadge";
import { getApps } from "@/lib/apps-data";
import { getAppWebsite } from "@/lib/app-display";
import { SITE_NAME, SITE_URL, OG_IMAGE, absoluteUrl } from "@/lib/site";

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
  const stats = [
    { value: `${apps.length}`, label: "Products" },
    { value: `${apps.filter((a) => a.status === "live").length}`, label: "Live" },
    { value: `${new Set(apps.map((a) => a.category)).size}`, label: "Industries" },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <PageHero
        eyebrow="About us"
        title="One company. One ecosystem. Many solutions."
        description="Flacron Enterprises LLC is a software company based in Brooklyn, New York. We build and run a family of AI-powered apps for construction, insurance, business, finance, security, sports and personal growth. Every product listed below is made by Flacron Enterprises LLC. Our official website is flacronenterprises.com."
      />

      {/* Products */}
      <section className="section border-t border-border bg-surface-muted">
        <div className="container-page">
          <SectionHeader eyebrow="What we build" title="Our products" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((a) => {
              const website = getAppWebsite(a);
              return (
                <li key={a.slug} className="card flex flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <AppLogo name={a.name} logoUrl={a.logoUrl} size={44} />
                    <StatusBadge status={a.status} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-text">{a.name}</h3>
                  <p className="mt-0.5 text-[13px] font-medium text-text-muted">{a.category}</p>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-secondary">{a.shortDescription}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm">
                    <Link href={`/apps/${a.slug}`} className="link-accent inline-flex items-center gap-1">
                      Product page <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                    </Link>
                    {website && (
                      <a href={website} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-medium text-text-secondary hover:text-text">
                        Official website <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader eyebrow="Our mission" title="Technology that serves real people." className="mb-6 sm:mb-8" />
            <div className="max-w-xl space-y-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              <p>
                We started Flacron Enterprises with a single belief: the best software is built around the people who use it, not the other way around. Too many businesses are forced to adapt their workflows to fit rigid software. We build the other way — starting with the problems industries actually face and working backwards to the technology.
              </p>
              <p>
                Today, our ecosystem spans construction, insurance, cybersecurity, business growth, sports engagement, and personal development. Tomorrow, it will grow further. Every product we build shares the same foundation: AI-powered intelligence, enterprise reliability, and genuine user value.
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse px-3 py-8 text-center sm:px-6 sm:py-10">
                <dt className="mt-2 text-sm font-medium text-text-muted">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Vision */}
      <section className="band section overflow-hidden">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page">
          <SectionHeader
            eyebrow="Our vision"
            title="The ecosystem of the future."
            description="We envision a world where every business — regardless of size or industry — has access to the same quality of AI-powered tools that only the largest enterprises could previously afford."
            light
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="bg-band p-6 sm:p-7">
                <h3 className="font-display text-lg font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-band-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-page flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader eyebrow="Join us" title="Be part of the ecosystem." className="mb-0 sm:mb-0" />
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/ecosystem" className="btn btn-primary btn-lg">Explore Products</Link>
            <Link href="/contact" className="btn btn-secondary btn-lg">
              Get In Touch <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
