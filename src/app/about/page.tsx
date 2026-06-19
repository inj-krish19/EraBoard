// src/app/about/page.tsx
import { Metadata } from "next";
import { GlowBackground } from "@/components/shared/GlowBackground";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import AboutClient from "@/components/about/AboutClient";

export const metadata: Metadata = {
    title: "About — EraBoard",
    description:
        "EraBoard is a Gen Z aesthetic identity experience. Take 10 visual questions, get a personalized moodboard, era name, and a shareable card that captures your vibe.",
    openGraph: {
        title: "About EraBoard",
        description:
            "A visual personality quiz that gives you an aesthetic identity. 10 questions. Infinite eras.",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/about`,
    },
};

export default function AboutPage() {
    return (
        <>
            <GlowBackground />
            <Navbar />
            <main>
                <AboutClient />
            </main>
            <Footer />
        </>
    );
}