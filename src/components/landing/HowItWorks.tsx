"use client";

import { motion } from "framer-motion";
import { FadeUp, ScaleIn } from "@/components/shared/Animations";

const STEPS = [
    {
        number: "01",
        emoji: "🖼️",
        title: "pick your visuals",
        desc: "10 image-based questions about your mood, vibe, and current energy. no boring text quizzes here, just pure ~aesthetic~.",
        color: "#c084fc",
    },
    {
        number: "02",
        emoji: "✨",
        title: "we read your vibe",
        desc: "our algorithm maps your picks to one of 20 aesthetic profiles — dark academia, soft girl, coastal, goblincore, and more.",
        color: "#67e8f9",
    },
    {
        number: "03",
        emoji: "🎨",
        title: "get your era card",
        desc: "a full moodboard drops — curated images, your color palette, a one-liner bio, and your official era name. save it, post it, live in it.",
        color: "#f0abfc",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-24 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Section label */}
                <FadeUp className="text-center mb-16">
                    <span className="font-ui text-xs text-primary uppercase tracking-[0.2em] mb-4 block">
                        how it works
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary leading-tight">
                        your era in{" "}
                        <span className="gradient-text">60 seconds</span>
                    </h2>
                    <p className="mt-4 text-text-secondary font-body max-w-md mx-auto">
                        no sign up. no overthinking. just you and your vibe.
                    </p>
                </FadeUp>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {STEPS.map((step, i) => (
                        <ScaleIn key={i} delay={i * 0.15}>
                            <motion.div
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="relative p-6 rounded-2xl glass border border-border/40 overflow-hidden group cursor-default"
                            >
                                {/* Glow on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                    style={{
                                        background: `radial-gradient(circle at 50% 0%, ${step.color}15, transparent 70%)`,
                                    }}
                                />

                                {/* Step number */}
                                <div
                                    className="font-display text-6xl font-bold mb-4 opacity-10 leading-none"
                                    style={{ color: step.color }}
                                >
                                    {step.number}
                                </div>

                                {/* Emoji */}
                                <div className="text-3xl mb-3">{step.emoji}</div>

                                {/* Title */}
                                <h3
                                    className="font-ui font-semibold text-lg mb-2"
                                    style={{ color: step.color }}
                                >
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="font-body text-text-secondary text-sm leading-relaxed">
                                    {step.desc}
                                </p>

                                {/* Connector line for desktop */}
                                {i < STEPS.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-border to-transparent z-10" />
                                )}
                            </motion.div>
                        </ScaleIn>
                    ))}
                </div>
            </div>
        </section>
    );
}