# Flacron Enterprises — Parent Website

The official marketing and ecosystem hub for [Flacron Enterprises](https://flacron.com). Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **Framer Motion** — featuring a Firebase-backed CMS, a protected admin dashboard, and a full PWA manifest.

---

## Table of Contents

- [Overview](#overview)
- [Pages & Routes](#pages--routes)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Admin Dashboard](#admin-dashboard)
- [Data Layer](#data-layer)
- [Deployment](#deployment)

---

## Overview

This site serves as the primary marketing presence for Flacron Enterprises — showcasing the full product ecosystem, industry solutions, partners, and providing a Book-a-Demo funnel. It is designed to be:

- **Fast** — ISR (Incremental Static Regeneration) with a 60-second revalidation window on every route
- **SEO-ready** — per-page metadata, Open Graph tags, Twitter cards, and a generated `sitemap.ts`
- **CMS-backed** — app content can be managed via Firebase Firestore through the `/admin` dashboard; falls back to static data if Firebase is not configured
- **PWA-ready** — ships a `manifest.json` for installability

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage — hero, app grid, differentiators, how-it-works, testimonials |
| `/about` | Company story and team |
| `/apps/[slug]` | Dynamic product detail page for each Flacron app |
| `/ecosystem` | Full ecosystem overview |
| `/solutions` | Solution categories |
| `/industries` | Target industry breakdown |
| `/partners` | Microsoft & IBM partner credentials |
| `/contact` | Contact form |
| `/book-demo` | Demo booking form |
| `/ai-engine` | AI Engine technology showcase |
| `/admin` | Protected CMS dashboard (apps CRUD + lead inbox) |
| `/admin/login` | Admin login page |
| `/api/admin/apps` | REST endpoint — list / create / update apps |
| `/api/admin/seed` | Seeds Firestore with static app data |
| `/api/book-demo` | Handles demo booking form submissions |
| `/sitemap.xml` | Auto-generated sitemap |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS v4 + `tw-animate-css` |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| CMS / DB | Firebase Admin SDK (Firestore) — optional |
| Auth | HMAC-SHA256 cookie token (Edge-compatible) |
| Font | Inter + Space Grotesk (Google Fonts via `next/font`) |
| PWA | `public/manifest.json` |

---

## Project Structure

```
flacron-hub/
├── public/
│   └── manifest.json           # PWA manifest
├── src/
│   ├── app/
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout (Navbar, Footer, Providers)
│   │   ├── globals.css         # Tailwind base + custom tokens
│   │   ├── about/
│   │   ├── ai-engine/
│   │   ├── apps/[slug]/        # Dynamic product pages
│   │   ├── book-demo/
│   │   ├── contact/
│   │   ├── ecosystem/
│   │   ├── industries/
│   │   ├── partners/
│   │   ├── solutions/
│   │   ├── sitemap.ts          # Auto sitemap
│   │   ├── admin/              # CMS dashboard (protected)
│   │   └── api/                # Route handlers
│   ├── components/
│   │   ├── HeroSection.tsx     # Aurora gradient hero
│   │   ├── AppGrid.tsx         # Product card grid
│   │   ├── GlassCard.tsx       # 3D-tilt glass card
│   │   ├── Navbar.tsx          # Responsive nav + search trigger
│   │   ├── SearchModal.tsx     # Command-palette search
│   │   ├── ThemeProvider.tsx   # Dark mode context
│   │   ├── ToastProvider.tsx   # Toast notification system
│   │   ├── WaveDivider.tsx     # SVG wave section dividers
│   │   ├── ScrollProgress.tsx  # Reading progress bar
│   │   ├── BackToTop.tsx       # Floating back-to-top button
│   │   ├── Breadcrumbs.tsx     # Automatic route breadcrumbs
│   │   ├── FadeIn.tsx          # Intersection-observer fade wrapper
│   │   ├── SectionHeader.tsx   # Reusable section heading
│   │   └── admin/              # Admin-only UI components
│   ├── data/
│   │   └── apps.ts             # Static app definitions (fallback)
│   └── lib/
│       ├── apps-data.ts        # Data layer (Firebase → static fallback)
│       ├── firebase-server.ts  # Firebase Admin initializer
│       ├── admin-auth.ts       # HMAC token generation / verification
│       ├── seo.ts              # SEO helpers
│       └── utils.ts            # Shared utilities
├── middleware.ts               # Admin route protection
└── AGENTS.md                   # Claude Code agent instructions
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or yarn / pnpm / bun)

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

---

## Environment Variables

Create a `.env.local` file at the project root. All variables are optional — the site runs fully off static data without Firebase.

```env
# Firebase Admin (optional — enables CMS features)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Admin dashboard password (optional — defaults to insecure fallback)
ADMIN_SECRET=your-strong-random-secret
```

> **Note:** `FIREBASE_PRIVATE_KEY` must preserve literal `\n` escape sequences in the `.env.local` file — the app replaces them at runtime.

---

## Admin Dashboard

The admin panel lives at `/admin` and is protected by an HMAC-SHA256 cookie token derived from `ADMIN_SECRET`.

**Login:** navigate to `/admin/login` and enter the `ADMIN_SECRET` value.

Features:
- **Apps CRUD** — create, edit, and delete product entries in Firestore
- **Lead inbox** — view demo booking submissions
- **Seed endpoint** — `POST /api/admin/seed` pre-populates Firestore from the static `apps.ts` fallback

If `FIREBASE_*` env vars are not set, the admin dashboard still loads but all mutations are no-ops and the site serves static data.

---

## Data Layer

`src/lib/apps-data.ts` exports three async functions used across the app:

| Function | Description |
|---|---|
| `getApps()` | Returns all app definitions |
| `getAppBySlug(slug)` | Returns a single app by URL slug |
| `getAllSlugs()` | Returns all slugs for `generateStaticParams` |

Each function tries Firestore first and silently falls back to `src/data/apps.ts` if Firebase is unconfigured or the collection is empty. All public pages use `export const revalidate = 60` so content refreshes without a redeploy.

---

## Deployment

### Vercel (recommended)

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Add the environment variables from the table above in the Vercel dashboard
3. Deploy — Vercel auto-detects Next.js and sets the correct build command

### Self-hosted

```bash
npm run build
npm run start          # listens on port 3000 by default
```

Set environment variables in your host's secret manager or a `.env.production.local` file.

---

## License

Copyright © 2026 Flacron Enterprises LLC. All rights reserved.
