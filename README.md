# DevFlow — SaaS Developer Tool Dashboard

A fully responsive, highly interactive landing page for a fictional developer
platform. Built with a modern dark-mode aesthetic — glowing borders, radial
background gradients, crisp typography, and Bento-box layouts.

> Optimized for a zero-config, instant deploy to [Vercel](https://vercel.com).

## Tech stack

| Layer      | Choice                                    |
| ---------- | ----------------------------------------- |
| Framework  | Next.js 14 (App Router)                   |
| Language   | TypeScript (strict, no `any`)             |
| Styling    | Tailwind CSS 3.4                          |
| Icons      | lucide-react + inline brand SVGs          |
| Fonts      | Inter + JetBrains Mono (`next/font`)      |

## Interactive features

- **Live terminal** — a typewriter simulation that types real CLI commands on a
  cancellable, cleanup-safe animation loop.
- **Interactive Bento grid** — feature cards with a mouse-tracking spotlight glow
  and scale-on-hover iconography.
- **Tabbed dashboard** — switch between **Analytics**, **Logs**, and **Security**
  views with live mock data updating on an interval.
- **Glassmorphism navbar** — sticky, `backdrop-blur`, scroll-aware, with a fully
  functional mobile hamburger menu.
- **Animated CTAs** — gradient buttons with a shimmer sweep and glow on hover.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

```bash
npm run dev        # start the dev server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (next/core-web-vitals + next/typescript)
npm run typecheck  # tsc --noEmit
```

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — no configuration required. Click **Deploy**.

## Project structure

```
devflow-landing/
├── app/
│   ├── globals.css        # Tailwind layers, utilities, theme
│   ├── layout.tsx         # fonts, metadata, ambient background
│   ├── page.tsx           # page composition
│   └── icon.svg           # favicon
├── components/
│   ├── Navbar.tsx         # sticky glass nav + mobile menu
│   ├── Hero.tsx           # headline, CTAs, stats
│   ├── LiveTerminal.tsx   # typewriter terminal
│   ├── BentoGrid.tsx      # feature grid layout
│   ├── DashboardShowcase.tsx  # tabbed live dashboard
│   ├── SpotlightCard.tsx  # mouse-tracking glow card
│   ├── MiniChart.tsx      # animated sparkline
│   ├── GlowButton.tsx     # animated CTA button
│   ├── SocialIcons.tsx    # inline brand SVGs
│   ├── LogoCloud.tsx      # trusted-by strip
│   ├── CTASection.tsx     # closing call to action
│   └── Footer.tsx         # footer
└── public/
    └── robots.txt
```
