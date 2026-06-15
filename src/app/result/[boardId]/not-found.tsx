import Link from "next/link";
import { GlowBackground } from "@/components/shared/GlowBackground";
import { Navbar } from "@/components/shared/Navbar";
import { Sparkles } from "lucide-react";

export default function BoardNotFound() {
    return (
        <>
            <GlowBackground />
            <Navbar />
            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
                <div className="text-6xl mb-6">🌙</div>

                <h1 className="font-display text-5xl font-bold text-text-primary mb-3">
                    era not found
                </h1>

                <p className="font-body text-text-secondary max-w-sm mb-2 leading-relaxed">
                    this board doesn't exist or has been made private.
                </p>
                <p className="font-body text-text-muted text-sm mb-10">
                    maybe the link is wrong, or the girl deleted her era.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/quiz"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-ui font-semibold text-sm glow-strong hover:opacity-90 transition-opacity"
                    >
                        <Sparkles className="w-4 h-4" />
                        find my era
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-border/60 glass text-text-secondary font-ui text-sm hover:border-primary/30 hover:text-text-primary transition-all"
                    >
                        go home
                    </Link>
                </div>
            </main>
        </>
    );
}