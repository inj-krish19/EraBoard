// src/components/spotify/RefinedEraCard.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Sparkles, Loader2, ChevronDown, ChevronUp } from "lucide-react";

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

interface RefinedEraCardProps {
    boardId: string;
    isSpotifyConnected: boolean;
    primaryColor?: string;
}

export default function RefinedEraCard({
    boardId,
    isSpotifyConnected,
    primaryColor = "#c084fc",
}: RefinedEraCardProps) {
    const [loading, setLoading] = useState(false);
    const [refined, setRefined] = useState<RefinedEra | null>(null);
    const [spotify, setSpotify] = useState<SpotifyData | null>(null);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState(true);

    async function handleRefine() {
        setLoading(true);
        setError("");

        const res = await fetch("/api/spotify/refine", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ boardId }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error || "Something went wrong.");
            return;
        }

        setRefined(data.refined);
        setSpotify(data.spotify);
    }

    // Not connected — show a soft prompt
    if (!isSpotifyConnected) {
        return (
            <div className="glass rounded-2xl p-5 border border-border/20">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-surface-elevated border border-border/30 flex items-center justify-center">
                        <SpotifyIcon className="w-4 h-4 text-text-muted" />
                    </div>
                    <div>
                        <p className="font-ui text-sm text-text-primary font-medium">
                            Sonic Era Refinement
                        </p>
                        <p className="font-ui text-xs text-text-muted">
                            Connect Spotify to go deeper
                        </p>
                    </div>
                </div>
                <p className="font-ui text-xs text-text-muted leading-relaxed mb-3">
                    Your visual era is just one layer. Connect Spotify in your profile
                    settings to blend your listening history into a richer aesthetic identity.
                </p>
                <a
                    href="/profile?tab=settings"
                    className="inline-flex items-center gap-1.5 font-ui text-xs text-primary hover:opacity-80 transition-opacity"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    Connect in settings
                </a>
            </div>
        );
    }

    // Connected — show refine button or result
    return (
        <div className="glass rounded-2xl border border-border/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1DB954]/15 border border-[#1DB954]/25 flex items-center justify-center">
                        <SpotifyIcon className="w-4 h-4 text-[#1DB954]" />
                    </div>
                    <div>
                        <p className="font-ui text-sm text-text-primary font-medium">
                            Sonic Era Refinement
                        </p>
                        <p className="font-ui text-xs text-text-muted">
                            {refined ? "Your music-blended identity" : "Blend your music taste into your era"}
                        </p>
                    </div>
                </div>
                {refined && (
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="text-text-muted hover:text-text-secondary transition-colors"
                    >
                        {expanded
                            ? <ChevronUp className="w-4 h-4" />
                            : <ChevronDown className="w-4 h-4" />
                        }
                    </button>
                )}
            </div>

            <AnimatePresence>
                {(!refined || expanded) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 space-y-4">
                            {!refined ? (
                                <>
                                    {error && (
                                        <p className="font-ui text-xs text-red-400">{error}</p>
                                    )}
                                    <button
                                        onClick={handleRefine}
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-ui text-sm font-semibold text-black disabled:opacity-50 hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: "#1DB954" }}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Reading your music soul…
                                            </>
                                        ) : (
                                            <>
                                                <Music2 className="w-4 h-4" />
                                                Refine my era with Spotify
                                            </>
                                        )}
                                    </button>
                                    <p className="font-ui text-[10px] text-text-muted text-center">
                                        Analyzes your top artists, genres & tracks · Takes ~5 seconds
                                    </p>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    {/* Refined era name */}
                                    <div>
                                        <p className="font-ui text-[10px] text-text-muted uppercase tracking-wider mb-1">
                                            Refined era
                                        </p>
                                        <h3
                                            className="font-display text-xl font-bold"
                                            style={{ color: primaryColor }}
                                        >
                                            {refined.refined_era_name}
                                        </h3>
                                    </div>

                                    {/* Refined bio */}
                                    <div>
                                        <p className="font-ui text-[10px] text-text-muted uppercase tracking-wider mb-1">
                                            Who you are
                                        </p>
                                        <p className="font-body text-sm text-text-secondary leading-relaxed">
                                            {refined.refined_bio}
                                        </p>
                                    </div>

                                    {/* Spotify influence */}
                                    <div
                                        className="rounded-xl p-3 border"
                                        style={{
                                            backgroundColor: "#1DB95408",
                                            borderColor: "#1DB95425",
                                        }}
                                    >
                                        <p className="font-ui text-[10px] text-[#1DB954]/70 uppercase tracking-wider mb-1">
                                            Your music says
                                        </p>
                                        <p className="font-body text-xs text-text-secondary leading-relaxed">
                                            {refined.spotify_influence}
                                        </p>
                                    </div>

                                    {/* Playlist vibe */}
                                    <div>
                                        <p className="font-ui text-[10px] text-text-muted uppercase tracking-wider mb-1">
                                            Playlist vibe
                                        </p>
                                        <p className="font-body text-xs text-text-secondary italic leading-relaxed">
                                            &ldquo;{refined.playlist_vibe}&rdquo;
                                        </p>
                                    </div>

                                    {/* Affirmation */}
                                    <div
                                        className="rounded-xl p-3 text-center border"
                                        style={{
                                            backgroundColor: `${primaryColor}08`,
                                            borderColor: `${primaryColor}20`,
                                        }}
                                    >
                                        <p
                                            className="font-display text-sm font-semibold"
                                            style={{ color: primaryColor }}
                                        >
                                            {refined.affirmation}
                                        </p>
                                    </div>

                                    {/* Top artists + genres */}
                                    {spotify && (
                                        <div className="space-y-2">
                                            <p className="font-ui text-[10px] text-text-muted uppercase tracking-wider">
                                                Sonic fingerprint
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {spotify.topArtists.map((a) => (
                                                    <span
                                                        key={a}
                                                        className="font-ui text-[10px] text-[#1DB954]/70 bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-full px-2 py-0.5"
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
                                                Overall mood: <span className="text-text-secondary">{spotify.mood}</span>
                                            </p>
                                        </div>
                                    )}

                                    {/* Re-refine */}
                                    <button
                                        onClick={handleRefine}
                                        disabled={loading}
                                        className="w-full py-2.5 rounded-xl font-ui text-xs text-text-muted border border-border/30 hover:border-border/60 hover:text-text-secondary transition-all disabled:opacity-40"
                                    >
                                        {loading ? "Refining…" : "Regenerate"}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}