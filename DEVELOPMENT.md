# Folder Structure

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

# Navigation Flow

```
/ (Landing)
│
│  → Hero with animated example boards
│  → "Find Your Era" CTA button
│
↓
/quiz
│
│  → Question 1 of 10 (image-based, tap to select)
│  → Auto-advances after selection (0.4s delay)
│  → Progress bar fills smoothly
│  → Last question → loading screen ("Crafting your era...")
│
↓
/result/[boardId]
│
│  → Reveal animation (board builds piece by piece)
│  → Full era board displayed
│  → Actions: Download card / Copy link / Retake
│  → "Share your era" nudge
│
↓
/era/[username]  (optional, if they save with name)
│
│  → Public, beautiful share page
│  → OG image auto-generated for link previews
│  → "Make yours" button → back to /quiz
```
