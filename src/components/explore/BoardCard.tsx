// src/components/explore/BoardCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Eye, Sparkles } from "lucide-react";

interface BoardCardProps {
    board: {
        board_id: string;
        aesthetic_name: string;
        era_name: string;
        bio: string;
        colors: string[];
        images: string[];
        tags: string[];
        created_at: string;
        view_count?: number;
        profiles?: {
            username?: string;
            display_name?: string;
            avatar_url?: string;
        } | null;
    };
    index: number;
}

export default function BoardCard({ board, index }: BoardCardProps) {
    const previewImages = board.images?.slice(0, 4) || [];
    const colors = board.colors?.slice(0, 5) || [];
    const primaryColor = colors[0] || "#c084fc";

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
            className="break-inside-avoid mb-4"
        >
            {/* Outer wrapper is a plain div — no nested <a> tags */}
            <div className="relative rounded-2xl overflow-hidden border border-border/30 glass group">

                {/* Hero image mosaic — the clickable area */}
                <Link href={`/result/${board.board_id}`}>
                    <div className="relative h-44 overflow-hidden">
                        {previewImages.length > 0 ? (
                            <div className="grid grid-cols-2 grid-rows-2 gap-0.5 h-full bg-black/40">
                                {previewImages.map((img, i) => (
                                    <div key={i} className="relative overflow-hidden">
                                        <Image
                                            src={img}
                                            alt=""
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 50vw, 20vw"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="w-full h-full"
                                style={{ background: `linear-gradient(135deg, ${primaryColor}30, transparent)` }}
                            />
                        )}
                        {/* Gradient overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: "linear-gradient(to bottom, transparent 40%, #0a0a0f 100%)" }}
                        />
                        {/* View count badge */}
                        {board.view_count != null && board.view_count > 0 && (
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-xl px-2 py-1 border border-white/10 flex items-center gap-1">
                                <Eye className="w-3 h-3 text-white/50" />
                                <span className="font-ui text-[10px] text-white/60">
                                    {board.view_count >= 1000
                                        ? `${(board.view_count / 1000).toFixed(1)}k`
                                        : board.view_count}
                                </span>
                            </div>
                        )}
                    </div>
                </Link>

                {/* Card body */}
                <div className="p-4">
                    {/* Era name */}
                    <Link href={`/result/${board.board_id}`}>
                        <h3
                            className="font-display text-base font-bold mb-0.5 leading-tight hover:opacity-80 transition-opacity"
                            style={{ color: primaryColor }}
                        >
                            {board.era_name}
                        </h3>
                    </Link>

                    <p className="font-ui text-[10px] text-text-muted uppercase tracking-wider mb-2">
                        {board.aesthetic_name}
                    </p>

                    <p className="font-body text-text-secondary text-xs leading-relaxed line-clamp-2 mb-3">
                        {board.bio}
                    </p>

                    {/* Color swatches */}
                    {colors.length > 0 && (
                        <div className="flex gap-1 mb-3">
                            {colors.map((color, i) => (
                                <div
                                    key={i}
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: color, border: "1px solid rgba(255,255,255,0.1)" }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Tags */}
                    {board.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {board.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="font-ui text-[10px] text-text-muted bg-surface-elevated border border-border/30 rounded-full px-2 py-0.5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Author — plain div, NOT a Link, to avoid hydration error from nested <a> */}
                    {board.profiles?.username && (
                        <div className="flex items-center gap-2 pt-3 border-t border-border/20">
                            {board.profiles.avatar_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={board.profiles.avatar_url}
                                    alt={board.profiles.display_name || ""}
                                    width={18}
                                    height={18}
                                    className="rounded-full w-[18px] h-[18px] object-cover"
                                />
                            ) : (
                                <div className="w-[18px] h-[18px] rounded-full bg-surface-elevated border border-border/30 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-2.5 h-2.5 text-text-muted" />
                                </div>
                            )}
                            <span
                                className="font-ui text-[10px] text-text-muted"
                                title={`@${board.profiles.username}`}
                            >
                                @{board.profiles.username}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}