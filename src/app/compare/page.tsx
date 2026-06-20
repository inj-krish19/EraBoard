// src/app/compare/page.tsx
import { Metadata } from "next";
import CompareClient from "@/components/compare/CompareClient";
import { GlowBackground } from "@/components/shared/GlowBackground";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
    title: "Compare Eras — EraBoard",
    description: "See how your aesthetic era compares to a friend's. Discover your vibe compatibility.",
};

export default function ComparePage() {
    return (
        <>
            <GlowBackground />
            <Navbar />
            <main>
                <CompareClient />
            </main>
            <Footer />
        </>
    );
}