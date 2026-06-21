// src/components/profile/ProfileClient.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Sparkles, ExternalLink, Settings, Calendar,
    Eye, EyeOff, Trash2, Plus, Copy, Check,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { BlurIn, FadeUp, ScaleIn } from "@/components/shared/Animations";
import { createClient } from "@/lib/supabase/client";
import AvatarSettings from "@/components/profile/AvatarSettings";
import { resolveAvatar, AvatarType } from "@/lib/avatars";

interface Profile {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
    avatar_type: AvatarType | null;
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
    is_public: boolean;
}

interface Props {
    user: User;
    profile: Profile | null;
    boards: Board[];
}

function BoardCard({
    board,
    index,
    isLatest,
    onDelete,
    onTogglePublic,
}: {
    board: Board;
    index: number;
    isLatest: boolean;
    onDelete: (id: string) => void;
    onTogglePublic: (id: string, current: boolean) => void;
}) {
    const [copied, setCopied] = useState(false);
    const primaryColor = board.colors[0] ?? "#c084fc";
    const date = new Date(board.created_at).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });

    function handleCopyLink() {
        navigator.clipboard.writeText(
            `${window.location.origin}/result/${board.board_id}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <ScaleIn delay={index * 0.08}>
            <div className="relative rounded-2xl overflow-hidden border border-border/30 glass group">
                {/* Latest badge */}
                {isLatest && (
                    <div
                        className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-[10px] font-ui font-semibold uppercase tracking-widest"
                        style={{
                            background: `${primaryColor}20`,
                            border: `1px solid ${primaryColor}40`,
                            color: primaryColor,
                        }}
                    >
                        current ✦
                    </div>
                )}

                {/* Hero image */}
                <Link href={`/result/${board.board_id}`}>
                    <div className="relative h-36 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={board.images[0]}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(to bottom, transparent 40%, #0a0a0f 100%)" }}
                        />
                    </div>
                </Link>

                <div className="p-4">
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

                    <p className="font-body text-text-secondary text-xs leading-relaxed mb-3 line-clamp-2">
                        {board.bio}
                    </p>

                    {/* Colors */}
                    <div className="flex gap-1 mb-3">
                        {board.colors.slice(0, 5).map((c, i) => (
                            <div
                                key={i}
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: c, border: "1px solid rgba(255,255,255,0.1)" }}
                            />
                        ))}
                    </div>

                    {/* Date + actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-text-muted">
                            <Calendar className="w-3 h-3" />
                            <span className="font-ui text-[10px]">{date}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleCopyLink}
                                title="Copy share link"
                                className="p-1.5 rounded-lg text-text-muted hover:text-text-secondary hover:bg-surface-elevated transition-all"
                            >
                                {copied
                                    ? <Check className="w-3.5 h-3.5 text-primary" />
                                    : <Copy className="w-3.5 h-3.5" />
                                }
                            </button>

                            <button
                                onClick={() => onTogglePublic(board.id, board.is_public)}
                                title={board.is_public ? "Make private" : "Make public"}
                                className="p-1.5 rounded-lg text-text-muted hover:text-text-secondary hover:bg-surface-elevated transition-all"
                            >
                                {board.is_public
                                    ? <Eye className="w-3.5 h-3.5" />
                                    : <EyeOff className="w-3.5 h-3.5" />
                                }
                            </button>

                            <button
                                onClick={() => onDelete(board.id)}
                                title="Delete board"
                                className="p-1.5 rounded-lg text-text-muted hover:text-warm hover:bg-warm/5 transition-all"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ScaleIn>
    );
}

export function ProfileClient({ user, profile: initialProfile, boards: initialBoards }: Props) {
    const router = useRouter();
    const [boards, setBoards] = useState<Board[]>(initialBoards);
    const [profile, setProfile] = useState<Profile | null>(initialProfile);
    const [tab, setTab] = useState<"boards" | "settings">("boards");
    const [displayName, setDisplayName] = useState(initialProfile?.display_name ?? "");
    const [savingName, setSavingName] = useState(false);
    const [nameSaved, setNameSaved] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const name = profile?.display_name ?? user.user_metadata?.full_name ?? "you";
    const username = profile?.username;
    const primaryColor = boards[0]?.colors[0] ?? "#c084fc";

    // Resolve avatar: era avatar takes priority over Google avatar
    const resolvedAvatar = resolveAvatar(
        profile?.avatar_type ?? null,
        profile?.avatar_url ?? (user.user_metadata?.avatar_url as string | undefined) ?? null
    );

    async function handleTogglePublic(boardId: string, current: boolean) {
        const supabase = createClient();
        await supabase
            .from("boards")
            .update({ is_public: !current })
            .eq("id", boardId);
        setBoards((prev) =>
            prev.map((b) => b.id === boardId ? { ...b, is_public: !current } : b)
        );
    }

    async function handleDelete(boardId: string) {
        if (deleteConfirm !== boardId) {
            setDeleteConfirm(boardId);
            setTimeout(() => setDeleteConfirm(null), 3000);
            return;
        }
        const supabase = createClient();
        await supabase.from("boards").delete().eq("id", boardId);
        setBoards((prev) => prev.filter((b) => b.id !== boardId));
        setDeleteConfirm(null);
    }

    async function handleSaveName() {
        setSavingName(true);
        await fetch("/api/update-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: profile?.username,
                display_name: displayName,
            }),
        });
        setSavingName(false);
        setNameSaved(true);
        setProfile((p) => p ? { ...p, display_name: displayName } : p);
        setTimeout(() => setNameSaved(false), 2000);
    }

    return (
        <div className="max-w-4xl mx-auto">

            {/* ── Profile header ── */}
            <BlurIn className="mb-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {/* Avatar */}
                    <div
                        className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2"
                        style={{ borderColor: `${primaryColor}40` }}
                    >
                        {resolvedAvatar ? (
                            <Image
                                src={resolvedAvatar}
                                alt={name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center font-display text-2xl font-bold"
                                style={{ background: `${primaryColor}20`, color: primaryColor }}
                            >
                                {name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="font-display text-3xl font-bold text-text-primary mb-1">{name}</h1>
                        {username ? (
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                                <span className="font-ui text-sm text-text-muted">@{username}</span>
                                <Link
                                    href={`/era/${username}`}
                                    className="inline-flex items-center gap-1 font-ui text-xs text-primary hover:opacity-80 transition-opacity"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    public page
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href="/setup"
                                className="inline-flex items-center gap-1.5 font-ui text-sm text-primary hover:opacity-80 transition-opacity mb-3"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                claim your @username
                            </Link>
                        )}
                        <p className="font-ui text-xs text-text-muted">
                            {boards.length} era{boards.length !== 1 ? "s" : ""} · {user.email}
                        </p>
                    </div>

                    {/* New quiz CTA */}
                    <Link
                        href="/quiz"
                        className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-ui text-sm hover:bg-primary/20 transition-all"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        new era
                    </Link>
                </div>
            </BlurIn>

            {/* ── Tabs ── */}
            <FadeUp className="mb-8">
                <div className="flex gap-1 p-1 rounded-2xl bg-surface-elevated border border-border/30 w-fit">
                    {(["boards", "settings"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className="relative px-5 py-2 rounded-xl font-ui text-sm transition-colors"
                            style={{ color: tab === t ? "#f1f0ff" : "#5a5470" }}
                        >
                            {tab === t && (
                                <motion.div
                                    layoutId="tab-indicator"
                                    className="absolute inset-0 rounded-xl"
                                    style={{ background: "rgba(192,132,252,0.15)", border: "1px solid rgba(192,132,252,0.2)" }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                            <span className="relative z-10 capitalize">{t}</span>
                        </button>
                    ))}
                </div>
            </FadeUp>

            {/* ── Tab content ── */}
            <AnimatePresence mode="wait">

                {/* Boards tab */}
                {tab === "boards" && (
                    <motion.div
                        key="boards"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {boards.length === 0 ? (
                            <div className="text-center py-20">
                                <Settings className="w-10 h-10 text-text-muted mx-auto mb-4 opacity-40" />
                                <p className="font-display text-2xl text-text-primary mb-2">no eras yet</p>
                                <p className="font-body text-text-secondary mb-6">take the quiz to find your first era</p>
                                <Link
                                    href="/quiz"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-ui font-semibold text-sm"
                                >
                                    <Sparkles className="w-4 h-4" /> find my era
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {boards.map((board, i) => (
                                    <div key={board.id} className="relative">
                                        <AnimatePresence>
                                            {deleteConfirm === board.id && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0 z-20 rounded-2xl flex flex-col items-center justify-center gap-3 p-4"
                                                    style={{ background: "rgba(10,10,15,0.9)", border: "1px solid rgba(253,164,175,0.3)" }}
                                                >
                                                    <p className="font-ui text-sm text-text-primary text-center">delete this era?</p>
                                                    <p className="font-body text-xs text-text-muted text-center">tap delete again to confirm</p>
                                                    <button
                                                        onClick={() => handleDelete(board.id)}
                                                        className="px-4 py-2 rounded-full bg-warm/20 border border-warm/30 text-warm font-ui text-xs hover:bg-warm/30 transition-all"
                                                    >
                                                        yes, delete it
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirm(null)}
                                                        className="font-ui text-xs text-text-muted hover:text-text-secondary"
                                                    >
                                                        cancel
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <BoardCard
                                            board={board}
                                            index={i}
                                            isLatest={i === 0}
                                            onDelete={handleDelete}
                                            onTogglePublic={handleTogglePublic}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Settings tab */}
                {tab === "settings" && (
                    <motion.div
                        key="settings"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="max-w-md space-y-5"
                    >
                        {/* Avatar */}
                        <div className="p-5 rounded-2xl glass border border-border/30">
                            <AvatarSettings
                                currentAvatarType={profile?.avatar_type ?? null}
                                googleAvatarUrl={profile?.avatar_url ?? (user.user_metadata?.avatar_url as string | undefined) ?? null}
                                username={username ?? name.charAt(0)}
                                onSaved={(newType) =>
                                    setProfile((p) => p ? { ...p, avatar_type: newType } : p)
                                }
                            />
                        </div>

                        {/* Display name */}
                        <div className="p-5 rounded-2xl glass border border-border/30">
                            <p className="font-ui text-xs text-text-muted uppercase tracking-widest mb-3">display name</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="your name"
                                    maxLength={40}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-border/60 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/40 transition-all"
                                />
                                <button
                                    onClick={handleSaveName}
                                    disabled={savingName}
                                    className="px-4 py-2.5 rounded-xl font-ui text-sm transition-all disabled:opacity-50"
                                    style={{
                                        background: nameSaved ? "rgba(134,239,172,0.15)" : "rgba(192,132,252,0.15)",
                                        border: nameSaved ? "1px solid rgba(134,239,172,0.3)" : "1px solid rgba(192,132,252,0.3)",
                                        color: nameSaved ? "#86efac" : "#c084fc",
                                    }}
                                >
                                    {nameSaved ? "saved ✓" : savingName ? "..." : "save"}
                                </button>
                            </div>
                        </div>

                        {/* Username */}
                        <div className="p-5 rounded-2xl glass border border-border/30">
                            <p className="font-ui text-xs text-text-muted uppercase tracking-widest mb-3">username</p>
                            {username ? (
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-ui text-sm text-text-primary">@{username}</p>
                                        <p className="font-ui text-xs text-text-muted mt-0.5">
                                            {process.env.NEXT_PUBLIC_APP_URL}/era/{username}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/era/${username}`}
                                        className="inline-flex items-center gap-1 font-ui text-xs text-primary hover:opacity-80"
                                    >
                                        <ExternalLink className="w-3 h-3" /> view
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <p className="font-ui text-sm text-text-muted">not set yet</p>
                                    <Link
                                        href="/setup"
                                        className="font-ui text-xs text-primary hover:opacity-80 flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> claim it
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="p-5 rounded-2xl glass border border-border/30">
                            <p className="font-ui text-xs text-text-muted uppercase tracking-widest mb-2">email</p>
                            <p className="font-body text-sm text-text-secondary">{user.email}</p>
                        </div>

                        {/* Sign out */}
                        <button
                            onClick={async () => {
                                const supabase = createClient();
                                await supabase.auth.signOut();
                                router.push("/");
                            }}
                            className="w-full py-3 rounded-2xl border border-warm/20 text-warm font-ui text-sm hover:bg-warm/5 transition-all"
                        >
                            sign out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}