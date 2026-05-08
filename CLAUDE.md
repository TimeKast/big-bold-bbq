@AGENTS.md

# Chef Dee's Big Bold BBQ — Project Notes

> Handoff document for future Claude sessions. Read this before touching code.

## What this project is

Premium ($100K design feel) marketing site for **Chef Dee's Big Bold BBQ**, a Las Vegas Southern/Creole/Cajun BBQ catering business. The lead-generation goal is to beat `bigsmoketrailers.com` (the client's reference site, ~5–8 leads/week on a basic WordPress build) by stacking premium motion design on top of the same proven conversion architecture (sticky phone, click-to-call, multi-step quote form, multi-channel CTAs).

## Core docs

| File | What |
|---|---|
| `/Users/bob/.claude/plans/users-bob-downloads-chef-dee-s-big-bold-purring-hellman.md` | Full master plan (skin, narrative, tech, milestones, adversarial review). Source of truth for design + architecture decisions. |
| `PENDING.md` | Single-source list of items waiting on the client. Update as items resolve. |
| `/Users/bob/Downloads/Chef Dee's Big Bold BBQ Website Copy Workshop.pdf` | Client-supplied copy + brand guidelines. Authoritative for copy, palette, fonts, logo, voice. |

## Stack (locked decisions)

- **Next.js 16 App Router** + **React 19** + **TypeScript**
- **Tailwind CSS v4** with `@theme` brand tokens in `app/globals.css`
- **Turbopack** dev + build, **pnpm** package manager
- Animations: **GSAP + ScrollTrigger** (scroll, M3+), **Framer Motion** (modal/funnel), CSS for hovers
- Forms: **react-hook-form + zod**, icons: **lucide-react**
- `cn()` in `lib/utils.ts` (clsx + tailwind-merge), variants via **class-variance-authority**

Planned for later (NOT installed yet): Supabase, Resend, Twilio, Cloudflare Turnstile, Upstash, Sentry — wire in M5. `/api/quote` will run on **Node runtime** (not Edge — Twilio SDK incompat).

## Brand tokens

CSS variables in `app/globals.css → @theme` block. Tailwind v4 auto-generates utilities (`bg-parchment`, `text-firebrick`, etc.):

| Token | Hex | Use |
|---|---|---|
| `parchment` | `#F4E6CF` | Light bg |
| `firebrick` | `#9E2F23` | CTAs, accents |
| `hickory` | `#3A2A1E` | Body text on light |
| `warmgold` | `#D6A25A` | Hover, badges, dividers (NEVER body text on cream) |
| `charcoal` | `#2B1E16` | Dark sections (Hero, Final CTA, Footer) |

Fonts via `next/font` in `app/layout.tsx`: **Roboto Slab** (display) + **Inter** (body).

## What's NOT done yet (V1 placeholders)

- **Hero video / scroll-scrub** — gradient placeholder. Real Seedance clips via `~/.claude/skills/segmind-video`, encoded GOP=1 per `scroll-scrubbed-video` skill. Wire in M3.
- **Chef Dee real portrait** — placeholder card. **Bloqueado** PENDING.md P0 #4.
- **Form backend** — `QuoteFunnelStub` validates with zod and console.logs. M5 wires backend.
- **GSAP scrollytelling** — components are static reveals. M3 layers GSAP.
- **Mapbox** — using SVG illustrated map for now (Codex flagged Mapbox overkill for 5 fixed cities).
- **Blog posts** — stub page. M6 adds `@next/mdx` + `gray-matter`.
- **Analytics** — `gtag('phone_click')` calls present but GA4 not wired. M7.
- **Award badge JSON-LD** — gated, **Bloqueado** PENDING.md P1 #7.
- **`AggregateRating` JSON-LD** — gated on `site.googleReviews.show=false`. **Bloqueado** PENDING.md P1 #8.

## Conventions

- **Server components by default.** Add `"use client"` only when needed.
- **Class merging:** always `cn()` from `lib/utils.ts`.
- **Phone numbers:** always via `<PhoneLink source="...">`.
- **CTAs:** always via `<CtaButton variant="...">`.
- **Reveal animations:** wrap with `<Reveal>` — respects `prefers-reduced-motion`.
- **NO** stock BBQ photos · **NO** chalkboard fonts · **NO** "authentic" more than 2× per page · **NO** AI-generated portraits of Chef Dee.

## Local dev

```bash
pnpm install
pnpm dev      # localhost:3000
pnpm build
pnpm lint
```

## Deploy

- Vercel, owner `timekast`. Project: `big-bold-bbq`.
- Production branch: `main`. Preview deploys on every PR.
- GitHub: `github.com/TimeKast/big-bold-bbq`.
