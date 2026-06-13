"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeUp } from "@/components/shared/Animations";

export function FinalCTA() {
    return (
        <section className="py-24 px-6 relative">
            {/* Glow blob behind CTA */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
            >
                <div
                    className="w-[600px] h-[300px] rounded-full opacity-20 animate-glow-pulse"
                    style={{
                        background:
                            "radial-gradient(ellipse, #a855f7 0%, #c084fc 40%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            <div className="max-w-2xl mx-auto text-center relative z-10">
                <FadeUp>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 font-ui text-xs text-primary tracking-widest uppercase mb-8">
                        <Sparkles className="w-3 h-3" />
                        free · no sign up · takes 60 seconds
                    </div>
                </FadeUp>

                <FadeUp delay={0.1}>
                    <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-[1.05] mb-6">
                        you're in your{" "}
                        <span className="gradient-text text-glow">era.</span>
                        <br />
                        <span className="text-text-secondary text-4xl sm:text-5xl">own it.</span>
                    </h2>
                </FadeUp>

                <FadeUp delay={0.2}>
                    <p className="font-body text-text-secondary text-lg leading-relaxed mb-10">
                        stop trying to explain your vibe in your bio. let your era card do it for you.
                    </p>
                </FadeUp>

                <FadeUp delay={0.3}>
                    <Link
                        href="/quiz"
                        className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-black font-ui font-bold text-base hover:opacity-90 transition-all duration-200 glow-strong hover:scale-[1.04] active:scale-[0.98]"
                    >
                        find my era now
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                        >
                            <ArrowRight className="w-5 h-5" />
                        </motion.span>
                    </Link>
                </FadeUp>

                <FadeUp delay={0.4} className="mt-6">
                    <p className="font-ui text-xs text-text-muted">
                        takes 60 seconds · free forever · no cringe email required
                    </p>
                </FadeUp>
            </div>
        </section>
    );
}