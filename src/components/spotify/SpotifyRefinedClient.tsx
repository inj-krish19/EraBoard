// src/components/spotify/SpotifyRefinedClient.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Music2, Sparkles } from "lucide-react";
import { BlurIn, FadeUp, ScaleIn } from "@/components/shared/Animations";
import { MoodGrid } from "@/components/board/MoodGrid";
import { ColorPalette } from "@/components/board/ColorPalette";

function SpotifyIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
    );
}

interface RefinedEra {
    refined_era_name: string;
    refined_bio: string;
    spotify_influence: string;
    playlist_vibe: string;
    affirmation: string;
}

interface SpotifyData {
    topArtists: string[];
    topGenres: string[];
    mood: string;
}

interface Board {
    board_id: string;
    era_name: string;
    aesthetic_name: string;
    bio: string;
    colors: string[];
    images: string[];
    tags: string[];
}

interface Props {
    board: Board;
    refined: RefinedEra;
    spotify: SpotifyData;
}

export default function SpotifyRefinedClient({ board, refined, spotify }: Props) {
    const primaryColor = board.colors[0] ?? "#c084fc";
    const accentColor = board.colors[2] ?? "#67e8f9";

    return (
        <div className="max-w-5xl mx-auto">

            {/* Back */}
            <FadeUp className="mb-8">
                <Link
                    href={`/result/${board.board_id}`}
                    className="inline-flex items-center gap-2 font-ui text-sm text-text-muted hover:text-text-secondary transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    back to original era
                </Link>
            </FadeUp>

            {/* Header */}
            <BlurIn className="text-center mb-12">
                {/* Spotify + Aesthetic badge */}
                <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-ui text-xs"
                        style={{ color: "#1DB954", borderColor: "#1DB95430", background: "#1DB95410" }}
                    >
                        <SpotifyIcon className="w-3 h-3" />
                        sonic refined
                    </div>
                    <span className="text-text-muted font-ui text-xs">×</span>
                    <div
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-ui text-xs uppercase tracking-widest"
                        style={{ color: primaryColor, borderColor: `${primaryColor}30`, background: `${primaryColor}10` }}
                    >
                        <Sparkles className="w-3 h-3" />
                        {board.aesthetic_name}
                    </div>
                </div>

                {/* Refined era name */}
                <h1
                    className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4"
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    {refined.refined_era_name}
                </h1>

                <p className="font-ui text-xs text-text-muted mb-4">
                    original era: <span className="text-text-secondary">{board.era_name}</span>
                </p>

                <p className="font-body text-text-secondary text-lg max-w-lg mx-auto leading-relaxed">
                    {refined.refined_bio}
                </p>
            </BlurIn>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

                {/* Moodboard — same images, era is sonic layer */}
                <FadeUp delay={0.1}>
                    <div className="space-y-4">
                        <p className="font-ui text-xs text-text-muted uppercase tracking-widest">
                            visual soul
                        </p>
                        <MoodGrid images={board.images} />
                    </div>
                </FadeUp>

                {/* Details */}
                <FadeUp delay={0.2}>
                    <div className="space-y-5">

                        {/* Palette */}
                        <div className="p-5 rounded-2xl glass border border-border/30">
                            <p className="font-ui text-xs text-text-muted uppercase tracking-widest mb-3">palette</p>
                            <ColorPalette colors={board.colors} />
                        </div>

                        {/* Spotify influence */}
                        <div
                            className="p-5 rounded-2xl border"
                            style={{ background: "#1DB95408", borderColor: "#1DB95425" }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <SpotifyIcon className="w-3.5 h-3.5 text-[#1DB954]" />
                                <p className="font-ui text-xs text-[#1DB954]/70 uppercase tracking-widest">
                                    your music says
                                </p>
                            </div>
                            <p className="font-body text-text-secondary text-sm leading-relaxed">
                                {refined.spotify_influence}
                            </p>
                        </div>

                        {/* Playlist vibe */}
                        <div className="p-5 rounded-2xl glass border border-border/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Music2 className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                                <p className="font-ui text-xs text-text-muted uppercase tracking-widest">
                                    playlist vibe
                                </p>
                            </div>
                            <p className="font-body text-text-secondary text-sm italic leading-relaxed">
                                &ldquo;{refined.playlist_vibe}&rdquo;
                            </p>
                        </div>

                        {/* Affirmation */}
                        <div
                            className="p-5 rounded-2xl text-center"
                            style={{
                                background: `linear-gradient(135deg, ${primaryColor}10, transparent)`,
                                border: `1px solid ${primaryColor}20`,
                            }}
                        >
                            <p className="font-display text-base italic" style={{ color: primaryColor }}>
                                ✦ {refined.affirmation}
                            </p>
                        </div>

                        {/* Sonic fingerprint */}
                        <div className="p-5 rounded-2xl glass border border-border/30 space-y-3">
                            <p className="font-ui text-xs text-text-muted uppercase tracking-widest">
                                sonic fingerprint
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {spotify.topArtists.map((a) => (
                                    <span
                                        key={a}
                                        className="font-ui text-[10px] rounded-full px-2 py-0.5"
                                        style={{
                                            color: "#1DB954",
                                            background: "#1DB95410",
                                            border: "1px solid #1DB95425",
                                        }}
                                    >
                                        {a}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {spotify.topGenres.map((g) => (
                                    <span
                                        key={g}
                                        className="font-ui text-[10px] text-text-muted bg-surface-elevated border border-border/30 rounded-full px-2 py-0.5"
                                    >
                                        {g}
                                    </span>
                                ))}
                            </div>
                            <p className="font-ui text-[10px] text-text-muted">
                                mood: <span className="text-text-secondary">{spotify.mood}</span>
                            </p>
                        </div>

                        {/* Original tags */}
                        <div className="p-5 rounded-2xl glass border border-border/30">
                            <p className="font-ui text-xs text-text-muted uppercase tracking-widest mb-3">vibe tags</p>
                            <div className="flex flex-wrap gap-2">
                                {board.tags.map((tag, i) => (
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
                    </div>
                </FadeUp>
            </div>

            {/* CTAs */}
            <ScaleIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10 pt-10 border-t border-border/20">
                    <Link
                        href={`/result/${board.board_id}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-border/30 text-text-muted font-ui text-sm hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        original era
                    </Link>
                    <Link
                        href="/quiz"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-black font-ui font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                        <Sparkles className="w-4 h-4" />
                        take quiz again
                    </Link>
                </div>
            </ScaleIn>
        </div>
    );
}