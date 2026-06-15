"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Music2, ExternalLink } from "lucide-react";
import { BlurIn, FadeUp, ScaleIn } from "@/components/shared/Animations";
import { MoodGrid } from "@/components/board/MoodGrid";
import { ColorPalette } from "@/components/board/ColorPalette";
import { EraCard } from "@/components/board/EraCard";
import { ShareActions } from "@/components/board/ShareActions";

interface BoardProfile {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
}

interface Board {
    board_id: string;
    aesthetic_name: string;
    era_name: string;
    bio: string;
    colors: string[];
    images: string[];
    tags: string[];
    created_at: string;
    playlist?: string | null;
    affirmation?: string | null;
    era_month?: string | null;
    profiles?: BoardProfile | null;
}

interface Props {
    board: Board;
    boardId: string;
}

export function BoardDetailClient({ board, boardId }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [revealed, setRevealed] = useState(false);

    // Try to enrich board data from sessionStorage
    // (set by QuizContainer right after generation — has affirmation, era_month etc)
    const [enriched, setEnriched] = useState<Board>(board);

    useEffect(() => {
        const key = `era_result_${boardId}`;
        const stored = sessionStorage.getItem(key);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Merge sessionStorage data (has Gemini extras) with DB data
                setEnriched((prev) => ({
                    ...prev,
                    affirmation: parsed.affirmation ?? prev.affirmation,
                    era_month: parsed.era_month ?? prev.era_month,
                    playlist: parsed.playlist ?? prev.playlist,
                }));
                // Clean up after reading
                sessionStorage.removeItem(key);
            } catch {
                // ignore parse errors
            }
        }
        setTimeout(() => setRevealed(true), 300);
    }, [boardId]);

    const b = enriched;
    const primaryColor = b.colors[0] ?? "#c084fc";
    const accentColor = b.colors[2] ?? "#67e8f9";
    const profile = b.profiles;

    const date = new Date(b.created_at).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
    });

    const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/result/${boardId}`;

    return (
        <div className="max-w-5xl mx-auto">

            {/* ── Back nav ── */}
            <FadeUp className="mb-8">
                <div className="flex items-center gap-3">
                    {profile?.username ? (
                        <Link
                            href={`/era/${profile.username}`}
                            className="inline-flex items-center gap-2 font-ui text-sm text-text-muted hover:text-text-secondary transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {profile.display_name ?? profile.username}'s eras
                        </Link>
                    ) : (
                        <Link
                            href="/quiz"
                            className="inline-flex items-center gap-2 font-ui text-sm text-text-muted hover:text-text-secondary transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            take the quiz
                        </Link>
                    )}
                </div>
            </FadeUp>

            {/* ── Header ── */}
            <BlurIn className="text-center mb-12">
                {/* Creator info */}
                {profile && (
                    <div className="flex items-center justify-center gap-2 mb-5">
                        {profile.avatar_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={profile.avatar_url}
                                alt={profile.display_name ?? ""}
                                className="w-7 h-7 rounded-full object-cover border border-border/40"
                            />
                        )}
                        <span className="font-ui text-sm text-text-muted">
                            {profile.display_name ?? profile.username}'s era
                        </span>
                        {profile.username && (
                            <Link
                                href={`/era/${profile.username}`}
                                className="inline-flex items-center gap-1 font-ui text-xs text-primary hover:opacity-80 transition-opacity"
                            >
                                <ExternalLink className="w-3 h-3" />
                                view all eras
                            </Link>
                        )}
                    </div>
                )}

                {/* Aesthetic badge */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5 font-ui text-xs uppercase tracking-widest"
                    style={{
                        color: primaryColor,
                        borderColor: `${primaryColor}30`,
                        background: `${primaryColor}10`,
                    }}
                >
                    <Sparkles className="w-3 h-3" />
                    {b.aesthetic_name}
                </div>

                {/* Era name */}
                <h1
                    className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4"
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    {b.era_name}
                </h1>

                <p className="font-body text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
                    {b.bio}
                </p>
                <p className="font-ui text-xs text-text-muted mt-3">{date}</p>
            </BlurIn>

            {/* ── Main grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

                {/* Moodboard */}
                <FadeUp delay={0.1}>
                    <div className="space-y-4">
                        <p className="font-ui text-xs text-text-muted uppercase tracking-widest">
                            moodboard
                        </p>
                        {revealed && <MoodGrid images={b.images} />}
                    </div>
                </FadeUp>

                {/* Details */}
                <FadeUp delay={0.2}>
                    <div className="space-y-5">

                        {/* Color palette */}
                        <div className="p-5 rounded-2xl glass border border-border/30">
                            <p className="font-ui text-xs text-text-muted uppercase tracking-widest mb-3">palette</p>
                            <ColorPalette colors={b.colors} />
                        </div>

                        {/* Tags */}
                        <div className="p-5 rounded-2xl glass border border-border/30">
                            <p className="font-ui text-xs text-text-muted uppercase tracking-widest mb-3">vibe tags</p>
                            <div className="flex flex-wrap gap-2">
                                {b.tags.map((tag, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + i * 0.06 }}
                                        className="px-3 py-1 rounded-full font-ui text-xs"
                                        style={{
                                            color: primaryColor,
                                            background: `${primaryColor}12`,
                                            border: `1px solid ${primaryColor}25`,
                                        }}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Playlist */}
                        {b.playlist && (
                            <div className="p-5 rounded-2xl glass border border-border/30 flex items-center gap-3">
                                <Music2 className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                                <div>
                                    <p className="font-ui text-xs text-text-muted uppercase tracking-widest mb-0.5">sounds like</p>
                                    <p className="font-body text-text-secondary text-sm">{b.playlist}</p>
                                </div>
                            </div>
                        )}

                        {/* Affirmation */}
                        {b.affirmation && (
                            <div
                                className="p-5 rounded-2xl text-center"
                                style={{
                                    background: `linear-gradient(135deg, ${primaryColor}10, transparent)`,
                                    border: `1px solid ${primaryColor}20`,
                                }}
                            >
                                <p className="font-display text-base italic" style={{ color: primaryColor }}>
                                    ✦ {b.affirmation}
                                </p>
                            </div>
                        )}

                        {/* Era month */}
                        {b.era_month && (
                            <div className="p-5 rounded-2xl glass border border-border/30">
                                <p className="font-ui text-xs text-text-muted uppercase tracking-widest mb-1">era started</p>
                                <p className="font-display text-lg text-text-primary">{b.era_month}</p>
                            </div>
                        )}
                    </div>
                </FadeUp>
            </div>

            {/* ── Share card ── */}
            <ScaleIn delay={0.3}>
                <div className="mb-8">
                    <p className="font-ui text-xs text-text-muted uppercase tracking-widest text-center mb-5">
                        your share card
                    </p>
                    <EraCard
                        ref={cardRef}
                        aestheticName={b.aesthetic_name}
                        eraName={b.era_name}
                        bio={b.bio}
                        affirmation={b.affirmation ?? "this era belongs to you."}
                        eraMonth={b.era_month ?? date}
                        colors={b.colors}
                        images={b.images}
                        tags={b.tags}
                    />
                </div>
            </ScaleIn>

            {/* ── Actions ── */}
            <FadeUp delay={0.4}>
                <ShareActions
                    cardRef={cardRef}
                    eraName={b.era_name}
                    shareUrl={shareUrl}
                />
            </FadeUp>

            {/* ── CTA ── */}
            <FadeUp delay={0.5} className="text-center mt-16 pt-10 border-t border-border/20">
                <p className="font-body text-text-secondary mb-4">what's your era?</p>
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