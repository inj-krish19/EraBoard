import { GlowBackground } from "@/components/shared/GlowBackground";
import { Navbar } from "@/components/shared/Navbar";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Find Your Era — Quiz",
    description: "10 visual questions to discover your current aesthetic era.",
};

export default function QuizPage() {
    return (
        <>
            <GlowBackground />
            <Navbar />
            <main className="relative z-10">
                <QuizContainer />
            </main>
        </>
    );
}