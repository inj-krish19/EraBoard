// src/components/about/AboutClient.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlurIn, FadeUp } from "@/components/shared/Animations";
import { Sparkles, Palette, Share2, Users } from "lucide-react";

const FEATURES = [
    {
        icon: Sparkles,
        title: "10 visual questions",
        description:
            "No text prompts. Just images. You react, we read the vibe. It takes about 2 minutes.",
    },
    {
        icon: Palette,
        title: "AI-generated identity",
        description:
            "Gemini AI synthesizes your picks into a unique era name, color palette, moodboard, and bio that actually sounds like you.",
    },
    {
        icon: Share2,
        title: "Shareable card",
        description:
            "Download a gorgeous card for your story or copy a link to your public board. Your era, on your terms.",
    },
    {
        icon: Users,
        title: "Community gallery",
        description:
            "Explore thousands of eras from real people. Filter by aesthetic, compare vibes with friends, and find your aesthetic family.",
    },
];

const FAQS = [
    {
        q: "Is EraBoard free?",
        a: "Yes, completely. Take the quiz, get your board, share it — no account required. Creating an account lets you save your history and claim your /era/username page.",
    },
    {
        q: "How does the AI work?",
        a: "Your quiz answers are mapped to an aesthetic profile, then passed to Gemini AI which generates a custom era name, bio, affirmation, and playlist suggestion tuned to your specific combination of picks.",
    },
    {
        q: "Can I retake the quiz?",
        a: "As many times as you want. Each result is saved separately, so you can watch your aesthetic evolve over time on your profile timeline.",
    },
    {
        q: "Who can see my board?",
        a: "Boards are public by default so anyone with the link can view them. You can make a board private from your profile at any time.",
    },
    {
        q: "What aesthetics does EraBoard cover?",
        a: "The quiz is trained on 6 core aesthetic profiles — Cottagecore, Dark Academia, Y2K, Ethereal, Grunge, and Soft Girl — but Gemini's era names and bios go far beyond those buckets.",
    },
];

export default function AboutClient() {
    return (
        <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-24">
            {/* Hero */}
            <BlurIn>
                <span className="text-xs tracking-widest uppercase text-purple-400/60 font-medium">
                    About
                </span>
                <h1
                    className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    Every era tells a{" "}
                    <span className="gradient-text">story</span>
                </h1>
                <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                    EraBoard is a visual personality quiz that turns your image instincts
                    into a full aesthetic identity — a moodboard, a color palette, an era
                    name, and a bio that actually sounds like you.
                </p>
                <p className="text-white/40 text-base mt-4 max-w-2xl leading-relaxed">
                    We built it for the people who describe their vibe in aesthetics, not
                    adjectives. The ones who know exactly which photo on Pinterest is
                    &ldquo;them&rdquo; before they can explain why.
                </p>
            </BlurIn>

            {/* Features */}
            <FadeUp delay={0.1}>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.07 }}
                            className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center mb-4">
                                <f.icon className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3
                                className="text-white font-semibold mb-2"
                                style={{ fontFamily: "var(--font-playfair)" }}
                            >
                                {f.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
                        </motion.div>
                    ))}
                </div>
            </FadeUp>

            {/* Manifesto */}
            <FadeUp delay={0.3}>
                <div className="mt-16 glass rounded-3xl p-8 sm:p-10 border border-purple-500/10">
                    <p className="text-xs tracking-widest uppercase text-purple-400/50 font-medium mb-4">
                        Why we built this
                    </p>
                    <blockquote
                        className="text-2xl sm:text-3xl font-medium text-white leading-snug"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        &ldquo;Aesthetic isn&apos;t a filter you apply. It&apos;s the
                        pattern that was already there.&rdquo;
                    </blockquote>
                    <p className="text-white/40 text-sm mt-6 leading-relaxed max-w-2xl">
                        Personality quizzes ask what you think about yourself. EraBoard asks
                        what you&apos;re drawn to — and finds the pattern beneath the picks.
                        The result isn&apos;t a type. It&apos;s a mirror.
                    </p>
                </div>
            </FadeUp>

            {/* FAQ */}
            <FadeUp delay={0.4}>
                <div className="mt-16">
                    <h2
                        className="text-2xl font-bold text-white mb-8"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Questions
                    </h2>
                    <div className="space-y-4">
                        {FAQS.map((faq, i) => (
                            <motion.div
                                key={faq.q}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 + i * 0.06 }}
                                className="glass rounded-2xl p-5 border border-white/5"
                            >
                                <p className="text-white font-medium text-sm mb-2">{faq.q}</p>
                                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </FadeUp>

            {/* CTA */}
            <FadeUp delay={0.5}>
                <div className="mt-16 flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/quiz"
                        className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm text-center hover:opacity-90 transition-opacity"
                    >
                        Take the quiz
                    </Link>
                    <Link
                        href="/explore"
                        className="px-8 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-semibold text-sm text-center hover:bg-white/10 transition-colors"
                    >
                        Explore boards
                    </Link>
                </div>
            </FadeUp>
        </div>
    );
}