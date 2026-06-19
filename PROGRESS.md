# EraBoard — Context Prompt for New Chat

---

## 🎨 Project Overview

**EraBoard** is a GenZ-targeted aesthetic personality quiz app. Users answer 10 visual (image-based) questions, get a personalized moodboard, aesthetic identity, color palette, era name, bio, and a shareable card. Target audience: Gen Z girls & teens.

**Live URL:** `https://eraboard.vercel.app` (deployed on Vercel, custom domain active)
**Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS, Framer Motion, Supabase (PostgreSQL + Auth), Google OAuth, Gemini AI (quiz result generation), Zustand, html-to-image

---

## 📁 Folder Structure

```
eraboard/
├── public/
│   ├── icon.svg          # App icon (custom, replaces vercel.svg)
│   ├── logo.svg          # Full logo
│   ├── banner.svg        # Banner
│   ├── og-image.png      # Static OG fallback
│   └── manifest.json     # PWA manifest
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                        # Root layout, fonts, metadata, AuthProvider
│   │   ├── page.tsx                          # Landing page /
│   │   ├── globals.css                       # Theme variables, dark mode, animations
│   │   ├── opengraph-image.tsx               # Dynamic OG for homepage
│   │   ├── sitemap.ts                        # Auto-generated sitemap
│   │   ├── robots.ts                         # Robots.txt
│   │   │
│   │   ├── quiz/
│   │   │   └── page.tsx                      # /quiz
│   │   │
│   │   ├── result/
│   │   │   ├── page.tsx                      # Redirects to /quiz (deprecated)
│   │   │   └── [boardId]/
│   │   │       ├── page.tsx                  # /result/[boardId] — main result page
│   │   │       └── not-found.tsx             # 404 for invalid boardId
│   │   │
│   │   ├── era/
│   │   │   └── [username]/
│   │   │       ├── page.tsx                  # /era/[username] — public profile
│   │   │       └── not-found.tsx             # 404 for invalid username
│   │   │
│   │   ├── setup/
│   │   │   └── page.tsx                      # /setup — username claim after first login
│   │   │
│   │   ├── profile/
│   │   │   └── page.tsx                      # /profile — user dashboard
│   │   │
│   │   └── api/
│   │       ├── generate-era/route.ts         # POST — calls Gemini, returns era data
│   │       ├── save-board/route.ts           # POST — saves board to Supabase
│   │       ├── update-profile/route.ts       # POST — saves username/display_name
│   │       ├── check-username/route.ts       # GET — checks username availability
│   │       ├── proxy-image/route.ts          # GET — proxies Unsplash images for canvas export
│   │       └── og/board/route.tsx            # GET — dynamic OG image per board (edge, .tsx)
│   │
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Animations.tsx                # BlurIn, SplitText, FadeUp, ScaleIn
│   │   │   ├── GlowBackground.tsx            # Fixed ambient purple/cyan orbs
│   │   │   ├── Navbar.tsx                    # Scroll-aware, auth-aware navbar
│   │   │   ├── Footer.tsx                    # Simple footer
│   │   │   └── Logo.tsx                      # Logo component using /public/icon.svg
│   │   │
│   │   ├── landing/
│   │   │   ├── Hero.tsx                      # Hero with SplitText + floating pills
│   │   │   ├── HowItWorks.tsx                # 3-step section
│   │   │   ├── ExampleBoards.tsx             # 3 example era boards
│   │   │   ├── Testimonials.tsx              # Infinite marquee testimonials
│   │   │   └── FinalCTA.tsx                  # Bottom CTA section
│   │   │
│   │   ├── quiz/
│   │   │   ├── QuizContainer.tsx             # Main quiz logic, auto-advance, loading screen
│   │   │   ├── QuizOption.tsx                # Image card with select animation
│   │   │   └── QuizProgress.tsx              # Progress bar + dots
│   │   │
│   │   ├── board/
│   │   │   ├── MoodGrid.tsx                  # 9-image staggered grid
│   │   │   ├── ColorPalette.tsx              # Color swatches with copy-hex
│   │   │   ├── EraCard.tsx                   # Exportable share card (forwardRef)
│   │   │   └── ShareActions.tsx              # Download / copy link / retake
│   │   │
│   │   ├── era/
│   │   │   ├── EraProfileClient.tsx          # Public profile page client component
│   │   │   └── BoardDetailClient.tsx         # Board detail client component
│   │   │
│   │   ├── profile/
│   │   │   └── ProfileClient.tsx             # Profile dashboard (boards + settings tabs)
│   │   │
│   │   ├── auth/
│   │   │   ├── AuthProvider.tsx              # Context provider, useAuth() hook
│   │   │   ├── AuthModal.tsx                 # Google sign in modal
│   │   │   ├── GoogleSignInButton.tsx        # Google OAuth button (browser client)
│   │   │   └── UserMenu.tsx                  # Avatar dropdown with all nav links
│   │   │
│   │   └── ui/
│   │       └── Skeletons.tsx                 # Loading skeletons for all pages
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                     # Browser Supabase client
│   │   │   └── server.ts                     # Server Supabase client (next/headers)
│   │   ├── quiz-questions.ts                 # 10 questions with Unsplash image options
│   │   ├── aesthetics-data.ts                # 6 aesthetic profiles (colors, images, keywords)
│   │   ├── scoring.ts                        # Maps quiz answers → aesthetic profile
│   │   └── utils.ts                          # cn() helper
│   │
│   ├── store/
│   │   └── quiz-store.ts                     # Zustand + persist middleware (localStorage resume)
│   │
│   └── types/
│       └── database.ts                       # Full Supabase DB types (profiles + boards tables)
│
├── middleware.ts                             # Lightweight route protection (no @supabase/ssr)
├── .env.local                                # Local env vars
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## 🗄️ Database Schema (Supabase / PostgreSQL)

```sql
-- profiles (auto-created on Google OAuth signup via trigger)
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text unique,           -- claimed at /setup, used for /era/[username]
  display_name  text,
  avatar_url    text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- boards (saved after every quiz completion)
create table public.boards (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references public.profiles(id) on delete set null,
  board_id       text unique not null,  -- nanoid(10), used in /result/[boardId]
  aesthetic_name text not null,
  era_name       text not null,
  bio            text not null,
  affirmation    text,
  era_month      text,
  playlist       text,
  colors         text[] not null,
  images         text[] not null,
  tags           text[] not null,
  quiz_answers   jsonb not null,
  is_public      boolean default true,
  created_at     timestamptz default now()
);

-- RLS enabled on both tables
-- Boards: public read if is_public=true, owner full access, anon insert allowed
-- Profiles: owner read/update only
```

---

## 📦 Dependencies

### Frontend / Full-stack

```json
{
  "next": "^15",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^4",
  "framer-motion": "latest",
  "zustand": "latest",
  "html-to-image": "latest",
  "nanoid": "latest",
  "lucide-react": "latest",
  "date-fns": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest",
  "shadcn/ui": "latest"
}
```

### Backend / Auth / DB

```json
{
  "@supabase/supabase-js": "latest",
  "@supabase/ssr": "latest"
}
```

### Fonts (next/font/google)

- `Inter` → body (`--font-inter`)
- `Playfair_Display` → headings (`--font-playfair`)
- `Space_Grotesk` → UI elements (`--font-space-grotesk`)
- `Geist_Mono` → mono (`--font-geist-mono`)

---

## 🌍 Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=   # same value as ANON_KEY (both used as fallback)
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
NEXT_PUBLIC_APP_URL=                    # http://localhost:3000 dev / https://eraboard.vercel.app prod
```

---

## ✅ Phases Completed

| Phase | Description                                                                                                | Status  |
| ----- | ---------------------------------------------------------------------------------------------------------- | ------- |
| 1     | Landing page — Hero, HowItWorks, ExampleBoards, Testimonials, FinalCTA                                     | ✅ Done |
| 2     | Supabase setup + Google OAuth + DB schema + RLS                                                            | ✅ Done |
| 3     | Quiz engine (Gemini AI) + Result board + DB save + card download + localStorage resume                     | ✅ Done |
| 4     | Public share pages — `/result/[boardId]` + `/era/[username]` + not-found pages                             | ✅ Done |
| 5     | Username setup flow + Profile dashboard + UserMenu with full nav                                           | ✅ Done |
| 6     | Polish + SEO — OG images (dynamic per board), sitemap, robots.txt, PWA manifest, Logo component, Skeletons | ✅ Done |
| 7     | Deployment — Vercel + custom domain `eraboard.app` + production env vars + Supabase prod                   | ✅ Done |

---

## 📋 Remaining Phases

| Phase | Description                                                                      | Priority  |
| ----- | -------------------------------------------------------------------------------- | --------- |
| 8     | **Community Gallery** `/explore` — browse all public boards, filter by aesthetic | 🔥 High   |
| 8     | **Era Timeline** on profile — visual timeline of aesthetic evolution             | Medium    |
| 8     | **Friend Comparison** — compare two users' eras side by side                     | Medium    |
| 8     | **Spotify Integration** — analyze listening history to refine aesthetic          | Low       |
| 9     | **Monetization** — premium aesthetics, custom card themes                        | Future    |
| —     | Error boundaries (`error.tsx` per route)                                         | Quick win |
| —     | Rate limiting on `/api/generate-era`                                             | Quick win |
| —     | Analytics (Vercel Analytics / Plausible)                                         | Quick win |
| —     | About page `/about`                                                              | Quick win |

---

## 🎨 Design System

**Theme:** Always dark. Deep space black `#0a0a0f`, purple primary `#c084fc`, cyan accent `#67e8f9`.

**Key CSS classes:**

- `.glass` — glassmorphism card
- `.gradient-text` — purple→cyan gradient text
- `.glow-purple` / `.glow-strong` — box shadow glows
- `.bg-hero` — hero gradient background
- `.animate-float` / `.animate-glow-pulse` — keyframe animations

**Animation pattern:** `BlurIn` + `SplitText` word stagger for headlines, `FadeUp` for sections, `ScaleIn` for cards, infinite marquee for testimonials.

---

## 🔄 Key User Flow

```
/ (landing) → /quiz (10 questions, auto-advance)
→ loading screen (Gemini + DB save)
→ /result/[boardId] (shareable from the start)
→ download card / copy link / view on /era/[username]

First login → Google OAuth → /auth/callback
→ no username? → /setup → /era/[username]
→ has username? → / (home)
```

---

## ⚠️ Known Notes

- `@supabase/ssr` cannot be used in edge runtime — OG image routes use plain `fetch` to Supabase REST API instead
- `middleware.ts` is lightweight — checks cookie existence only, no `@supabase/ssr` import
- Supabase `.single()` returns `never` type without explicit casting — all server pages use `as TypeName | null` pattern
- Card download uses image proxy at `/api/proxy-image` to bypass CORS on Unsplash images
- Quiz store uses Zustand `persist` middleware — saves to `localStorage` key `eraboard-quiz`, expires after 24h
- Both `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` set to same value for compatibility
