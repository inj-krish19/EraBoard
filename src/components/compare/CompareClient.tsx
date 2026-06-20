// src/components/compare/CompareClient.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowLeftRight, Sparkles, X, ExternalLink } from "lucide-react";
import { BlurIn } from "@/components/shared/Animations";

interface UserEra {
    username: string;
    display_name?: string;
    avatar_url?: string;
    latest_board?: {
        board_id: string;
        aesthetic_name: string;
        era_name: string;
        bio: string;
        colors: string[];
        images: string[];
        tags: string[];
    } | null;
}

async function fetchUserEra(username: string): Promise<UserEra | null> {
    const res = await fetch(`/api/compare-user?username=${encodeURIComponent(username)}`);
    if (!res.ok) return null;
    return res.json();
}

function calculateCompatibility(a: UserEra, b: UserEra): number {
    if (!a.latest_board || !b.latest_board) return 0;

    const tagsA = new Set(a.latest_board.tags.map((t) => t.toLowerCase()));
    const tagsB = new Set(b.latest_board.tags.map((t) => t.toLowerCase()));
    const sharedTags = [...tagsA].filter((t) => tagsB.has(t)).length;
    const tagScore = tagsA.size + tagsB.size > 0
        ? (sharedTags * 2) / (tagsA.size + tagsB.size)
        : 0;

    const sameAesthetic =
        a.latest_board.aesthetic_name.toLowerCase() ===
        b.latest_board.aesthetic_name.toLowerCase();

    const baseScore = Math.round((tagScore * 60 + (sameAesthetic ? 40 : 0)));
    // Keep it feeling real — floor at 30
    return Math.max(30, Math.min(99, baseScore + 30));
}

function getCompatibilityLabel(score: number): { label: string; color: string; emoji: string } {
    if (score >= 85) return { label: "Twin Flames", color: "text-purple-300", emoji: "🔮" };
    if (score >= 70) return { label: "Aesthetic Soulmates", color: "text-cyan-300", emoji: "✨" };
    if (score >= 55) return { label: "Vibe Aligned", color: "text-pink-300", emoji: "💫" };
    if (score >= 40) return { label: "Opposite Energies", color: "text-amber-300", emoji: "⚡" };
    return { label: "Parallel Universes", color: "text-white/60", emoji: "🌌" };
}

function UserSearchInput({
    label,
    value,
    onChange,
    user,
    loading,
    error,
    onClear,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    user: UserEra | null;
    loading: boolean;
    error: string;
    onClear: () => void;
}) {
    return (
        <div className="flex-1">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">{label}</p>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">@</span>
                <input
                    type="text"
                    placeholder="username"
                    value={value}
                    onChange={(e) => onChange(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-8 pr-10 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 transition-all"
                />
                {value && (
                    <button
                        onClick={onClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            {loading && (
                <p className="text-xs text-white/40 mt-2 flex items-center gap-1.5">
                    <span className="w-3 h-3 border border-purple-500/40 border-t-purple-500 rounded-full animate-spin inline-block" />
                    Looking up…
                </p>
            )}
            {error && <p className="text-xs text-red-400/80 mt-2">{error}</p>}
            {user && (
                <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center gap-2"
                >
                    {user.avatar_url ? (
                        <Image src={user.avatar_url} alt="" width={24} height={24} className="rounded-full" />
                    ) : (
                        <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-purple-300" />
                        </div>
                    )}
                    <span className="text-white/60 text-xs">{user.display_name || user.username}</span>
                    {user.latest_board && (
                        <span className="text-[10px] text-purple-300/60 bg-purple-500/10 border border-purple-500/20 rounded-full px-2 py-0.5">
                            {user.latest_board.aesthetic_name}
                        </span>
                    )}
                </motion.div>
            )}
        </div>
    );
}

function EraPanel({ user, side }: { user: UserEra; side: "left" | "right" }) {
    const board = user.latest_board;
    if (!board) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
        >
            <div className="glass rounded-3xl overflow-hidden border border-white/5">
                {/* Images grid */}
                {board.images?.length > 0 && (
                    <div className="grid grid-cols-3 gap-0.5 aspect-square bg-black/20">
                        {board.images.slice(0, 9).map((img, i) => (
                            <div key={i} className="relative overflow-hidden">
                                <Image
                                    src={img}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    sizes="20vw"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="p-5">
                    {/* User */}
                    <div className="flex items-center gap-2 mb-4">
                        {user.avatar_url ? (
                            <Image src={user.avatar_url} alt="" width={28} height={28} className="rounded-full" />
                        ) : (
                            <div className="w-7 h-7 rounded-full bg-purple-500/30 flex items-center justify-center">
                                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                            </div>
                        )}
                        <div>
                            <p className="text-white/70 text-sm font-medium">
                                {user.display_name || user.username}
                            </p>
                            <p className="text-white/30 text-xs">@{user.username}</p>
                        </div>
                    </div>

                    {/* Era */}
                    <p className="text-xs text-purple-300/60 uppercase tracking-wide font-medium mb-0.5">
                        {board.aesthetic_name}
                    </p>
                    <h3
                        className="text-xl font-bold text-white mb-2"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        {board.era_name}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-3">{board.bio}</p>

                    {/* Colors */}
                    {board.colors?.length > 0 && (
                        <div className="flex gap-1.5 mb-4">
                            {board.colors.slice(0, 5).map((color, i) => (
                                <div
                                    key={i}
                                    className="size-5 rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Tags */}
                    {board.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {board.tags.slice(0, 4).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] text-purple-300/60 bg-purple-500/10 border border-purple-500/20 rounded-full px-2 py-0.5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <Link
                        href={`/result/${board.board_id}`}
                        target="_blank"
                        className="flex items-center gap-1.5 text-xs text-white/30 hover:text-purple-300 transition-colors"
                    >
                        View full board <ExternalLink className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default function CompareClient() {
    const [usernameA, setUsernameA] = useState("");
    const [usernameB, setUsernameB] = useState("");
    const [userA, setUserA] = useState<UserEra | null>(null);
    const [userB, setUserB] = useState<UserEra | null>(null);
    const [loadingA, setLoadingA] = useState(false);
    const [loadingB, setLoadingB] = useState(false);
    const [errorA, setErrorA] = useState("");
    const [errorB, setErrorB] = useState("");
    const [compared, setCompared] = useState(false);

    const handleLookup = async (
        username: string,
        setUser: (u: UserEra | null) => void,
        setLoading: (v: boolean) => void,
        setError: (v: string) => void
    ) => {
        if (!username || username.length < 2) return;
        setLoading(true);
        setError("");
        const user = await fetchUserEra(username);
        if (!user) setError(`@${username} not found`);
        else setUser(user);
        setLoading(false);
    };

    const handleCompare = async () => {
        const promises = [];
        if (usernameA && !userA) {
            promises.push(
                handleLookup(usernameA, setUserA, setLoadingA, setErrorA)
            );
        }
        if (usernameB && !userB) {
            promises.push(
                handleLookup(usernameB, setUserB, setLoadingB, setErrorB)
            );
        }
        await Promise.all(promises);
        setCompared(true);
    };

    const compatibility =
        userA && userB ? calculateCompatibility(userA, userB) : null;
    const compatLabel = compatibility ? getCompatibilityLabel(compatibility) : null;

    return (
        <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24">
            <BlurIn>
                <div className="mb-2">
                    <span className="text-xs tracking-widest uppercase text-purple-400/60 font-medium">
                        Era Comparison
                    </span>
                </div>
                <h1
                    className="text-4xl sm:text-5xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    Compare{" "}
                    <span className="gradient-text">Vibes</span>
                </h1>
                <p className="text-white/50 text-lg max-w-lg">
                    Enter two usernames to see your aesthetic compatibility and how your eras stack up.
                </p>
            </BlurIn>

            {/* Input row */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                <UserSearchInput
                    label="First person"
                    value={usernameA}
                    onChange={(v) => { setUsernameA(v); setUserA(null); setErrorA(""); setCompared(false); }}
                    user={userA}
                    loading={loadingA}
                    error={errorA}
                    onClear={() => { setUsernameA(""); setUserA(null); setErrorA(""); setCompared(false); }}
                />

                <div className="flex-shrink-0 pb-1 self-center sm:mb-0">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <ArrowLeftRight className="w-4 h-4 text-white/30" />
                    </div>
                </div>

                <UserSearchInput
                    label="Second person"
                    value={usernameB}
                    onChange={(v) => { setUsernameB(v); setUserB(null); setErrorB(""); setCompared(false); }}
                    user={userB}
                    loading={loadingB}
                    error={errorB}
                    onClear={() => { setUsernameB(""); setUserB(null); setErrorB(""); setCompared(false); }}
                />
            </div>

            <button
                onClick={handleCompare}
                disabled={!usernameA || !usernameB || loadingA || loadingB}
                className="mt-6 px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
                Compare Eras
            </button>

            {/* Comparison result */}
            <AnimatePresence>
                {compared && userA && userB && compatibility !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-12"
                    >
                        {/* Compatibility score */}
                        <div className="flex flex-col items-center mb-10">
                            <motion.div
                                initial={{ scale: 0.6, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="relative w-28 h-28 mb-4"
                            >
                                {/* Circle ring */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                    <motion.circle
                                        cx="50" cy="50" r="44"
                                        fill="none"
                                        stroke="url(#compatGrad)"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={`${2 * Math.PI * 44}`}
                                        initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                                        animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - compatibility / 100) }}
                                        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                                    />
                                    <defs>
                                        <linearGradient id="compatGrad" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#c084fc" />
                                            <stop offset="100%" stopColor="#67e8f9" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-white">{compatibility}%</span>
                                </div>
                            </motion.div>

                            <p className={`text-xl font-semibold ${compatLabel?.color}`} style={{ fontFamily: "var(--font-playfair)" }}>
                                {compatLabel?.emoji} {compatLabel?.label}
                            </p>
                            <p className="text-white/40 text-sm mt-1">aesthetic compatibility</p>
                        </div>

                        {/* Side by side panels */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <EraPanel user={userA} side="left" />
                            <EraPanel user={userB} side="right" />
                        </div>

                        {/* Shared tags */}
                        {(() => {
                            const tagsA = new Set((userA.latest_board?.tags || []).map((t) => t.toLowerCase()));
                            const tagsB = new Set((userB.latest_board?.tags || []).map((t) => t.toLowerCase()));
                            const shared = [...tagsA].filter((t) => tagsB.has(t));
                            if (shared.length === 0) return null;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-6 glass rounded-2xl p-5 border border-white/5"
                                >
                                    <p className="text-xs text-white/40 uppercase tracking-wider mb-3 font-medium">
                                        Shared vibes
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {shared.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs text-purple-300 bg-purple-500/15 border border-purple-500/25 rounded-full px-3 py-1"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}