import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/auth/AuthProvider";

/* ─── Fonts ─── */
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

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: {
    default: "EraBoard — Find Your Aesthetic Era",
    template: "%s | EraBoard",
  },
  description:
    "Discover your current aesthetic era. Answer a few visual questions and get a stunning moodboard that captures exactly who you are right now.",
  keywords: [
    "aesthetic",
    "moodboard",
    "era",
    "vibe",
    "personality",
    "genz",
    "aesthetic quiz",
    "aesthetic board",
  ],
  authors: [{ name: "EraBoard" }],
  creator: "EraBoard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "EraBoard",
    title: "EraBoard — Find Your Aesthetic Era",
    description:
      "Discover your current aesthetic era in 60 seconds. Take the quiz, get your moodboard.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "EraBoard — Find Your Aesthetic Era",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EraBoard — Find Your Aesthetic Era",
    description:
      "Discover your current aesthetic era in 60 seconds. Take the quiz, get your moodboard.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── Root Layout ─── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* Force dark class so .dark CSS variables always apply */
      className={cn(
        "dark h-full antialiased",
        inter.variable,
        playfair.variable,
        spaceGrotesk.variable,
        geistMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}