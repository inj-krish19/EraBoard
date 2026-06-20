// src/components/profile/EraTimeline.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Sparkles } from "lucide-react";

interface Board {
    board_id: string;
    aesthetic_name: string;
    era_name: string;
    bio: string;
    colors: string[];
    images: string[];
    created_at: string;
}

interface EraTimelineProps {
    boards: Board[];
}

export default function EraTimeline({ boards }: EraTimelineProps) {
    if (boards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <Sparkles className="w-8 h-8 text-purple-400/40 mb-3" />
                <p className="text-white/40">
                    Take the quiz to start your aesthetic timeline.
                </p>
            </div>
        );
    }

    // Sort oldest → newest for the timeline
    const sorted = [...boards].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    return (
        <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-6 bottom-6 w-px bg-gradient-to-b from-purple-500/40 via-cyan-500/20 to-transparent" />

            <div className="space-y-6">
                {sorted.map((board, i) => {
                    const isLatest = i === sorted.length - 1;
                    const previewImg = board.images?.[0];

                    return (
                        <motion.div
                            key={board.board_id}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="flex gap-4"
                        >
                            {/* Node */}
                            <div className="relative flex-shrink-0 w-11 flex items-start justify-center">
                                <div
                                    className={`
                                        w-[18px] h-[18px] mt-1 rounded-full border-2 z-10 transition-all
                                        ${isLatest
                                            ? "bg-purple-500 border-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.6)]"
                                            : "bg-[#0a0a0f] border-purple-500/40"
                                        }
                                    `}
                                />
                            </div>

                            {/* Card */}
                            <Link
                                href={`/result/${board.board_id}`}
                                className="flex-1 group"
                            >
                                <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/25 transition-all duration-300 flex gap-0">
                                    {/* Thumbnail */}
                                    {previewImg && (
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                                            <Image
                                                src={previewImg}
                                                alt={board.era_name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                unoptimized
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="flex-1 p-3 sm:p-4 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <div>
                                                <p className="text-xs text-purple-300/60 font-medium uppercase tracking-wide">
                                                    {board.aesthetic_name}
                                                </p>
                                                <h3
                                                    className="text-white font-semibold text-sm sm:text-base leading-tight"
                                                    style={{ fontFamily: "var(--font-playfair)" }}
                                                >
                                                    {board.era_name}
                                                </h3>
                                            </div>
                                            {isLatest && (
                                                <span className="flex-shrink-0 text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full px-2 py-0.5 font-medium">
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-white/40 text-xs line-clamp-2 mb-2">
                                            {board.bio}
                                        </p>

                                        {/* Palette strip */}
                                        {board.colors?.length > 0 && (
                                            <div className="flex gap-1">
                                                {board.colors.slice(0, 5).map((color, ci) => (
                                                    <div
                                                        key={ci}
                                                        className="h-2 flex-1 rounded-full max-w-[24px]"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Date */}
                                    <div className="flex-shrink-0 pr-4 flex items-center">
                                        <span className="text-[10px] text-white/25 whitespace-nowrap">
                                            {format(new Date(board.created_at), "MMM d, yyyy")}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}