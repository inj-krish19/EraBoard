Tech stack & Dependancy:

### 1. Create Next.js app

npx create-next-app@latest eraboard --typescript --tailwind --eslint --app --src-dir --import-alias "@/\*"

### 2. Navigate into project

cd eraboard

### 3. Install core dependencies

npm install framer-motion @radix-ui/react-progress lucide-react clsx tailwind-merge

### 4. Install image export

npm install html-to-image

### 5. Install fonts (next/font handles this, but also install)

npm install @next/font

### 6. Install Supabase

npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

### 7. Install Clerk for auth (optional V1)

npm install @clerk/nextjs

### 8. Install utility libraries

npm install zustand nanoid date-fns

### 9. Install shadcn/ui

npx shadcn@latest init

### 10. Add shadcn components you'll need

npx shadcn@latest add button card progress badge sheet dialog

### 11. Run dev server

npm run dev

---

## _*globals.css*_

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-inter);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-playfair);
  --font-ui: var(--font-space-grotesk);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);

  /* EraBoard custom tokens */
  --color-surface: var(--surface);
  --color-surface-elevated: var(--surface-elevated);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-primary-glow: var(--primary-glow);
  --color-warm: var(--warm);
}

/* ─── LIGHT MODE (EraBoard always uses dark, but light is defined as fallback) ─── */
:root {
  /* Shadcn required tokens — light fallback */
  --background: #0a0a0f;
  --foreground: #f1f0ff;
  --card: #12121a;
  --card-foreground: #f1f0ff;
  --popover: #1a1a26;
  --popover-foreground: #f1f0ff;
  --primary: #c084fc;
  --primary-foreground: #0a0a0f;
  --secondary: #1a1a26;
  --secondary-foreground: #f1f0ff;
  --muted: #1a1a26;
  --muted-foreground: #a09ab8;
  --accent: #67e8f9;
  --accent-foreground: #0a0a0f;
  --destructive: oklch(0.704 0.191 22.216);
  --border: #2a2a3d;
  --input: #2a2a3d;
  --ring: #c084fc;
  --radius: 0.75rem;

  /* Chart tokens */
  --chart-1: #c084fc;
  --chart-2: #67e8f9;
  --chart-3: #f0abfc;
  --chart-4: #fda4af;
  --chart-5: #a855f7;

  /* Sidebar */
  --sidebar: #12121a;
  --sidebar-foreground: #f1f0ff;
  --sidebar-primary: #c084fc;
  --sidebar-primary-foreground: #0a0a0f;
  --sidebar-accent: #1a1a26;
  --sidebar-accent-foreground: #f1f0ff;
  --sidebar-border: #2a2a3d;
  --sidebar-ring: #c084fc;

  /* EraBoard brand tokens */
  --surface: #12121a;
  --surface-elevated: #1a1a26;
  --primary-glow: #a855f7;
  --warm: #fda4af;
  --text-primary: #f1f0ff;
  --text-secondary: #a09ab8;
  --text-muted: #5a5470;

  /* Gradients */
  --gradient-hero: linear-gradient(
    135deg,
    #1a0533 0%,
    #0a0a0f 50%,
    #001a2c 100%
  );
  --gradient-card: linear-gradient(145deg, #1a1a26, #12121a);
  --gradient-primary: linear-gradient(135deg, #c084fc, #67e8f9);
}

/* ─── DARK MODE — same palette, slightly deeper ─── */
.dark {
  --background: #07070d;
  --foreground: #f1f0ff;
  --card: #0f0f18;
  --card-foreground: #f1f0ff;
  --popover: #161620;
  --popover-foreground: #f1f0ff;
  --primary: #c084fc;
  --primary-foreground: #07070d;
  --secondary: #161620;
  --secondary-foreground: #f1f0ff;
  --muted: #161620;
  --muted-foreground: #a09ab8;
  --accent: #67e8f9;
  --accent-foreground: #07070d;
  --destructive: oklch(0.704 0.191 22.216);
  --border: #252538;
  --input: #252538;
  --ring: #c084fc;

  /* Chart tokens */
  --chart-1: #c084fc;
  --chart-2: #67e8f9;
  --chart-3: #f0abfc;
  --chart-4: #fda4af;
  --chart-5: #a855f7;

  /* Sidebar */
  --sidebar: #0f0f18;
  --sidebar-foreground: #f1f0ff;
  --sidebar-primary: #c084fc;
  --sidebar-primary-foreground: #07070d;
  --sidebar-accent: #161620;
  --sidebar-accent-foreground: #f1f0ff;
  --sidebar-border: #252538;
  --sidebar-ring: #c084fc;

  /* EraBoard brand tokens */
  --surface: #0f0f18;
  --surface-elevated: #161620;
  --primary-glow: #a855f7;
  --warm: #fda4af;
  --text-primary: #f1f0ff;
  --text-secondary: #a09ab8;
  --text-muted: #5a5470;

  /* Gradients */
  --gradient-hero: linear-gradient(
    135deg,
    #150228 0%,
    #07070d 50%,
    #001520 100%
  );
  --gradient-card: linear-gradient(145deg, #161620, #0f0f18);
  --gradient-primary: linear-gradient(135deg, #c084fc, #67e8f9);
}

/* ─── BASE LAYER ─── */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  html {
    @apply h-full antialiased;
    /* Always force dark mode for EraBoard */
    color-scheme: dark;
  }

  body {
    @apply min-h-full flex flex-col bg-background text-foreground;
    font-family: var(--font-inter), sans-serif;
  }

  h1,
  h2,
  h3 {
    font-family: var(--font-playfair), serif;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--background);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-glow);
  }

  /* Text selection */
  ::selection {
    background: rgba(192, 132, 252, 0.25);
    color: var(--text-primary);
  }
}

/* ─── UTILITY CLASSES ─── */
@layer utilities {
  /* Glassmorphism card */
  .glass {
    background: rgba(26, 26, 38, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  /* Glow effects */
  .glow-purple {
    box-shadow: 0 0 40px rgba(192, 132, 252, 0.15);
  }
  .glow-cyan {
    box-shadow: 0 0 40px rgba(103, 232, 249, 0.15);
  }
  .glow-strong {
    box-shadow: 0 0 60px rgba(192, 132, 252, 0.3);
  }
  .text-glow {
    text-shadow: 0 0 30px rgba(192, 132, 252, 0.5);
  }

  /* Gradient text */
  .gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Hero background */
  .bg-hero {
    background: var(--gradient-hero);
  }

  /* Surface backgrounds */
  .bg-surface {
    background: var(--surface);
  }
  .bg-surface-elevated {
    background: var(--surface-elevated);
  }

  /* Font helpers */
  .font-display {
    font-family: var(--font-playfair), serif;
  }
  .font-ui {
    font-family: var(--font-space-grotesk), sans-serif;
  }
}

/* ─── ANIMATIONS ─── */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@layer utilities {
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-glow-pulse {
    animation: glow-pulse 3s ease-in-out infinite;
  }
  .animate-fade-up {
    animation: fade-up 0.5s ease forwards;
  }
  .animate-shimmer {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(192, 132, 252, 0.1),
      transparent
    );
    background-size: 200% auto;
    animation: shimmer 2s linear infinite;
  }
}
```

---
