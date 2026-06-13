# Folder Structure

```
eraboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout, fonts, metadata
│   │   ├── page.tsx                    # Landing page (/)
│   │   ├── globals.css                 # Theme variables, base styles
│   │   │
│   │   ├── quiz/
│   │   │   └── page.tsx                # Quiz flow (/quiz)
│   │   │
│   │   ├── result/
│   │   │   └── [boardId]/
│   │   │       └── page.tsx            # Result board (/result/abc123)
│   │   │
│   │   ├── era/
│   │   │   └── [username]/
│   │   │       └── page.tsx            # Public share page (/era/username)
│   │   │
│   │   └── api/
│   │       ├── generate-era/
│   │       │   └── route.ts            # Claude API call → era name + bio
│   │       └── save-board/
│   │           └── route.ts            # Save board to Supabase
│   │
│   ├── components/
│   │   ├── ui/                         # shadcn auto-generated
│   │   │
│   │   ├── landing/
│   │   │   ├── Hero.tsx                # Hero section
│   │   │   ├── HowItWorks.tsx         # 3-step explainer
│   │   │   └── ExampleBoards.tsx      # Sample output previews
│   │   │
│   │   ├── quiz/
│   │   │   ├── QuizContainer.tsx       # Manages quiz state
│   │   │   ├── QuizQuestion.tsx        # Single question UI
│   │   │   ├── QuizOption.tsx          # Image option card
│   │   │   ├── QuizProgress.tsx        # Progress bar
│   │   │   └── QuizTransition.tsx      # Animated transitions
│   │   │
│   │   ├── board/
│   │   │   ├── EraBoard.tsx            # Full result board
│   │   │   ├── MoodGrid.tsx            # 9-image moodboard grid
│   │   │   ├── AestheticBadge.tsx      # Aesthetic name display
│   │   │   ├── ColorPalette.tsx        # Color swatches
│   │   │   ├── EraCard.tsx             # Shareable card (exported as image)
│   │   │   └── ShareActions.tsx        # Download / copy link / share
│   │   │
│   │   └── shared/
│   │       ├── Navbar.tsx
│   │       ├── PageTransition.tsx
│   │       └── GlowBackground.tsx      # Ambient gradient bg
│   │
│   ├── lib/
│   │   ├── aesthetics.ts               # All 20 aesthetic profiles + mappings
│   │   ├── quiz-questions.ts           # All questions + options data
│   │   ├── scoring.ts                  # Answer → aesthetic algorithm
│   │   ├── supabase.ts                 # Supabase client
│   │   ├── generate-board.ts           # Board assembly logic
│   │   └── utils.ts                    # cn(), helpers
│   │
│   ├── store/
│   │   └── quiz-store.ts               # Zustand store for quiz state
│   │
│   ├── types/
│   │   └── index.ts                    # All TypeScript types
│   │
│   └── constants/
│       ├── aesthetics-data.ts          # Images, colors per aesthetic
│       └── site.ts                     # App name, URLs, metadata
│
├── public/
│   ├── fonts/                          # Any local fonts
│   ├── og-image.png                    # Open Graph image
│   └── logo.svg
│
├── .env.local                          # Secrets
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
