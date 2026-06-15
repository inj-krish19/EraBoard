"use client";

import { motion } from "framer-motion";
import { FadeUp, ScaleIn } from "@/components/shared/Animations";

const BOARDS = [
    {
        era: "Dark Academia Era",
        bio: "romanticizing the suffering of reading too many books ✦",
        colors: ["#2d1b4e", "#5c3d8f", "#8b6bc7", "#c4a8e8", "#f0e6ff"],
        images: [
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&q=80",
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&q=80",
        ],
        accent: "#8b6bc7",
        tag: "intellectual · mysterious · poetic",
    },
    {
        era: "Soft Girl Era",
        bio: "main character energy with a pastel filter on everything 🌸",
        colors: ["#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6"],
        images: [
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=200&q=80",
            "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=200&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80",
            "https://images.unsplash.com/photo-1502230831726-fe5549140034?w=200&q=80",
        ],
        accent: "#f472b6",
        tag: "dreamy · soft · romanticized",
    },
    {
        era: "Coastal Granddaughter Era",
        bio: "salt in the hair, sunsets in the feed, unbothered 🌊",
        colors: ["#ecfeff", "#cffafe", "#a5f3fc", "#67e8f9", "#22d3ee"],
        images: [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80",
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&q=80",
            "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&q=80",
            "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=200&q=80",
        ],
        accent: "#22d3ee",
        tag: "free · effortless · golden hour",
    },
];

function BoardCard({ board, index }: { board: (typeof BOARDS)[0]; index: number }) {
    return (
        <ScaleIn delay={index * 0.15}>
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-2xl overflow-hidden border border-border/30 glass group cursor-pointer"
            >
                {/* Image grid */}
                <div className="grid grid-cols-2 gap-0.5 p-0.5 bg-border/20">
                    {board.images.map((img, i) => (
                        <div key={i} className="aspect-square overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>

                {/* Card info */}
                <div className="p-4">
                    {/* Era name */}
                    <h3
                        className="font-display text-base font-semibold mb-1"
                        style={{ color: board.accent }}
                    >
                        {board.era}
                    </h3>

                    {/* Bio */}
                    <p className="font-body text-text-secondary text-xs leading-relaxed mb-3">
                        {board.bio}
                    </p>

                    {/* Color palette */}
                    <div className="flex gap-1.5 mb-3">
                        {board.colors.map((c, i) => (
                            <div
                                key={i}
                                className="w-5 h-5 rounded-full border border-white/10"
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>

                    {/* Tag */}
                    <p
                        className="font-ui text-[10px] uppercase tracking-widest opacity-60"
                        style={{ color: board.accent }}
                    >
                        {board.tag}
                    </p>
                </div>
            </motion.div>
        </ScaleIn>
    );
}

export function ExampleBoards() {
    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <FadeUp className="text-center mb-16">
                    <span className="font-ui text-xs text-accent uppercase tracking-[0.2em] mb-4 block">
                        example boards
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary">
                        which one is{" "}
                        <span className="gradient-text">lowkey you?</span>
                    </h2>
                    <p className="mt-4 text-text-secondary font-body max-w-md mx-auto">
                        20+ aesthetic profiles waiting to describe your whole personality.
                    </p>
                </FadeUp>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {BOARDS.map((board, i) => (
                        <BoardCard key={i} board={board} index={i} />
                    ))}
                </div>

                {/* More hint */}
                <FadeUp delay={0.3} className="text-center mt-10">
                    <p className="font-ui text-sm text-text-muted">
                        + 17 more aesthetics including villaincore, cottagecore, y2k, indie sleaze & more
                    </p>
                </FadeUp>
            </div>
        </section>
    );
}