"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SplitText, BlurIn } from "@/components/shared/Animations";

/* Floating aesthetic pill badges */
const PILLS = [
    { label: "dark academia", color: "#c084fc", delay: 0.2, x: "-80%", y: "-60%" },
    { label: "soft girl era ✦", color: "#f0abfc", delay: 0.35, x: "110%", y: "-80%" },
    { label: "coastal granddaughter", color: "#67e8f9", delay: 0.5, x: "150%", y: "60%" },
    { label: "goblincore", color: "#86efac", delay: 0.65, x: "105%", y: "70%" },
    { label: "villain era 🖤", color: "#fda4af", delay: 0.8, x: "-60%", y: "120%" },
    { label: "that girl", color: "#fde68a", delay: 0.45, x: "60%", y: "125%" },
];

/* Floating card preview */
const PREVIEW_CARDS = [
    {
        img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300&q=80",
        rotate: -6,
        x: -180,
        y: 20,
        delay: 0.6,
    },
    {
        img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80",
        rotate: 3,
        x: 0,
        y: -30,
        delay: 0.75,
    },
    {
        img: "https://images.unsplash.com/photo-1490750967868-88df5691cc27?w=300&q=80",
        rotate: 8,
        x: 180,
        y: 10,
        delay: 0.9,
    },
];

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
            {/* ── Badge ── */}
            <BlurIn delay={0.1} className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 font-ui text-xs text-primary tracking-widest uppercase">
                    <Sparkles className="w-3 h-3" />
                    aesthetic quiz · moodboard generator
                </div>
            </BlurIn>

            {/* ── Headline ── */}
            <h1 className="font-display text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-4xl mb-6">
                <SplitText
                    text="what's your"
                    className="block text-text-secondary"
                    delay={0.2}
                    stagger={0.06}
                />
                <SplitText
                    text="current era?"
                    className="block  text-glow"
                    delay={0.2}
                    stagger={0.07}
                />
            </h1>

            {/* ── Subheading ── */}
            <BlurIn delay={0.7} className="mb-10 max-w-xl text-center">
                <p className="font-body text-text-secondary text-lg leading-relaxed">
                    answer 10 visual questions. get a{" "}
                    <span className="text-text-primary font-medium">stunning moodboard</span>,
                    your aesthetic identity, and a{" "}
                    <span className="text-primary font-medium">shareable era card</span> that
                    hits different.
                </p>
            </BlurIn>

            {/* ── CTAs ── */}
            <BlurIn delay={0.9} className="flex flex-col sm:flex-row gap-3 mb-20 z-10">
                <Link
                    href="/quiz"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-ui font-semibold text-sm hover:opacity-90 transition-all duration-200 glow-strong hover:scale-[1.03] active:scale-[0.98]"
                >
                    find my era
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                    href="#how-it-works"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border/60 text-text-secondary font-ui text-sm hover:border-primary/30 hover:text-text-primary transition-all duration-200 glass"
                >
                    see how it works
                </Link>
            </BlurIn>

            {/* ── Floating preview cards ── */}
            <div className="relative w-full max-w-lg h-56 pointer-events-none select-none mx-auto">
                {PREVIEW_CARDS.map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, rotate: 0 }}
                        animate={{ opacity: 1, y: 0, rotate: card.rotate }}
                        transition={{ delay: card.delay, duration: 0.7, ease: [0.34, 1.1, 0.64, 1] }}
                        style={{ x: card.x, rotate: card.rotate }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-36 sm:w-36 sm:h-44 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={card.img}
                            alt=""
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </motion.div>
                ))}

                {/* Aesthetic pills floating around */}
                {PILLS.map((pill, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: pill.delay, duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
                        className="relative z-10"
                        style={{
                            x: pill.x,
                            y: pill.y,
                            animationDelay: `${i * 0.8}s`,
                        }}
                    >
                        <span
                            className="inline-block px-3 py-1 rounded-full text-[10px] font-ui font-medium border whitespace-nowrap"
                            style={{
                                color: pill.color,
                                borderColor: `${pill.color}30`,
                                background: `${pill.color}10`,
                            }}
                        >
                            {pill.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* ── Social proof ── */}
            <BlurIn delay={1.1} className="mt-10 text-center z-10">
                <p className="font-ui text-xs text-text-muted tracking-wide uppercase">
                    already vibing with{" "}
                    <span className="text-text-secondary font-semibold">12,000+</span> girls finding their era
                </p>
            </BlurIn>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="font-ui text-[10px] text-text-muted uppercase tracking-widest">scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
                />
            </motion.div>
        </section>
    );
}