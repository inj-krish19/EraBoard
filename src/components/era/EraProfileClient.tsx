"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import { BlurIn, FadeUp, ScaleIn } from "@/components/shared/Animations";

interface Profile {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
}

interface Board {
    id: string;
    board_id: string;
    aesthetic_name: string;
    era_name: string;
    bio: string;
    colors: string[];
    images: string[];
    tags: string[];
    created_at: string;
}

interface Props {
    profile: Profile;
    boards: Board[];
    username: string;
}

function BoardCard({ board, index, isLatest }: { board: Board; index: number; isLatest: boolean }) {
    const primaryColor = board.colors[0] ?? "#c084fc";
    const accentColor = board.colors[2] ?? "#67e8f9";
    const heroImage = board.images[0];
    const previewImages = board.images.slice(1, 4);

    const date = new Date(board.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <ScaleIn delay={index * 0.1}>
            <Link href={`/result/${board.board_id}`}>
                <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative rounded-2xl overflow-hidden border border-border/30 glass group cursor-pointer"
                >
                    {/* Latest badge */}
                    {isLatest && (
                        <div
                            className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] font-ui font-semibold uppercase tracking-widest"
                            style={{
                                background: `${primaryColor}20`,
                                border: `1px solid ${primaryColor}40`,
                                color: primaryColor,
                            }}
                        >
                            current era ✦
                        </div>
                    )}

                    {/* Hero image */}
                    <div className="relative h-40 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={heroImage}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(to bottom, transparent 40%, #0a0a0f 100%)`,
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {/* Era name */}
                        <h3
                            className="font-display text-lg font-bold mb-1 leading-tight"
                            style={{
                                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            {board.era_name}
                        </h3>

                        {/* Aesthetic */}
                        <p className="font-ui text-xs text-text-muted mb-2 uppercase tracking-wider">
                            {board.aesthetic_name}
                        </p>

                        {/* Bio */}
                        <p className="font-body text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
                            {board.bio}
                        </p>

                        {/* Preview images */}
                        <div className="flex gap-1 mb-3">
                            {previewImages.map((img, i) => (
                                <div key={i} className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>

                        {/* Colors + date */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-1.5">
                                {board.colors.slice(0, 4).map((c, i) => (
                                    <div
                                        key={i}
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                            backgroundColor: c,
                                            border: "1px solid rgba(255,255,255,0.1)",
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-1 text-text-muted">
                                <Calendar className="w-3 h-3" />
                                <span className="font-ui text-[10px]">{date}</span>
                            </div>
                        </div>
                    </div>

                    {/* Hover arrow */}
                    <div
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ArrowRight className="w-4 h-4" style={{ color: primaryColor }} />
                    </div>
                </motion.div>
            </Link>
        </ScaleIn>
    );
}

export function EraProfileClient({ profile, boards, username }: Props) {
    const name = profile.display_name ?? username;
    const latestBoard = boards[0];
    const primaryColor = latestBoard?.colors[0] ?? "#c084fc";

    return (
        <div className="max-w-4xl mx-auto">

            {/* ── Profile header ── */}
            <BlurIn className="text-center mb-14">
                {/* Avatar */}
                <div className="flex justify-center mb-5">
                    <div
                        className="w-20 h-20 rounded-full overflow-hidden border-2"
                        style={{ borderColor: `${primaryColor}50` }}
                    >
                        {profile.avatar_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={profile.avatar_url}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center text-2xl font-display font-bold"
                                style={{
                                    background: `linear-gradient(135deg, ${primaryColor}30, transparent)`,
                                    color: primaryColor,
                                }}
                            >
                                {name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>

                {/* Name */}
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-2">
                    {name}
                </h1>

                {/* Username */}
                <p className="font-ui text-sm text-text-muted mb-4">
                    @{username} · {process.env.NEXT_PUBLIC_APP_URL}/era/{username}
                </p>

                {/* Current era pill */}
                {latestBoard && (
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-ui"
                        style={{
                            background: `${primaryColor}10`,
                            border: `1px solid ${primaryColor}25`,
                            color: primaryColor,
                        }}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        currently in: {latestBoard.era_name}
                    </div>
                )}
            </BlurIn>

            {/* ── Boards ── */}
            {boards.length === 0 ? (
                <FadeUp className="text-center py-20">
                    <p className="text-6xl mb-4">🌙</p>
                    <p className="font-display text-2xl text-text-primary mb-2">
                        no eras yet
                    </p>
                    <p className="font-body text-text-secondary">
                        this girl hasn't found her era yet.
                    </p>
                </FadeUp>
            ) : (
                <>
                    <FadeUp className="mb-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-ui text-xs text-text-muted uppercase tracking-widest">
                                all eras · {boards.length} total
                            </h2>
                        </div>
                    </FadeUp>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {boards.map((board, i) => (
                            <BoardCard
                                key={board.board_id}
                                board={board}
                                index={i}
                                isLatest={i === 0}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* ── CTA for visitors ── */}
            <FadeUp delay={0.3} className="text-center mt-16 pt-10 border-t border-border/20">
                <p className="font-body text-text-secondary mb-4">
                    what's your era?
                </p>
                <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-ui font-semibold text-sm glow-strong hover:opacity-90 transition-opacity"
                >
                    <Sparkles className="w-4 h-4" />
                    find out now
                </Link>
            </FadeUp>
        </div>
    );
}