import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/auth/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://eraboard.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: {
    default: "EraBoard — Find Your Aesthetic Era",
    template: "%s | EraBoard",
  },
  description:
    "Discover your current aesthetic era in 60 seconds. Answer 10 visual questions and get a stunning moodboard, your color palette, and a shareable era card.",
  keywords: [
    "aesthetic quiz", "moodboard generator", "aesthetic era",
    "dark academia", "soft girl era", "cottagecore", "that girl",
    "coastal granddaughter", "villain era", "genz aesthetic",
    "personality quiz", "aesthetic board",
  ],
  authors: [{ name: "EraBoard", url: APP_URL }],
  creator: "EraBoard",
  applicationName: "EraBoard",

  // ── Icons — all pointing to YOUR files in /public ──
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
    shortcut: "/icon.svg",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "EraBoard",
    title: "EraBoard — Find Your Aesthetic Era",
    description:
      "Discover your current aesthetic era in 60 seconds. Take the quiz, get your moodboard.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EraBoard — Find Your Aesthetic Era",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EraBoard — Find Your Aesthetic Era",
    description: "Discover your current aesthetic era in 60 seconds.",
    images: ["/og-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark h-full antialiased",
        inter.variable,
        playfair.variable,
        spaceGrotesk.variable,
        geistMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        {/* Explicit favicon link tags — overrides any Next.js defaults */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}