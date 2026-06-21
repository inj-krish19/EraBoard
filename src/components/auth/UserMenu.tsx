"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LogOut,
    User,
    Sparkles,
    ExternalLink,
    Settings,
    Compass,
    ArrowLeftRight,
    Info,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "./AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { resolveAvatar, AvatarType } from "@/lib/avatars";

interface ProfileData {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
    avatar_type: AvatarType | null;
}

export function UserMenu() {
    const { user } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user) return;
        const supabase = createClient();
        supabase
            .from("profiles")
            .select("username, display_name, avatar_url, avatar_type")
            .eq("id", user.id)
            .single()
            .then(({ data }) => setProfile(data));
    }, [user]);

    useEffect(() => {
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    if (!user) return null;

    const googleAvatar = profile?.avatar_url ?? (user.user_metadata?.avatar_url as string | undefined) ?? null;
    const avatarSrc = resolveAvatar(profile?.avatar_type ?? null, googleAvatar);

    const name =
        profile?.display_name ??
        (user.user_metadata?.full_name as string | undefined) ??
        "you";
    const initials = name.charAt(0).toUpperCase();
    const username = profile?.username;

    async function handleSignOut() {
        setOpen(false);
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
    }

    const close = () => setOpen(false);

    return (
        <div ref={ref} className="relative">
            {/* Avatar button */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 group"
            >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-colors">
                    {avatarSrc ? (
                        <Image
                            src={avatarSrc}
                            alt={name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black text-xs font-ui font-bold">
                            {initials}
                        </div>
                    )}
                </div>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute right-0 top-11 w-56 rounded-2xl glass border border-border/40 p-2 z-50"
                    >
                        {/* User info */}
                        <div className="px-3 py-2.5 mb-1 flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0 border border-border/30">
                                {avatarSrc ? (
                                    <Image
                                        src={avatarSrc}
                                        alt={name}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black text-xs font-ui font-bold">
                                        {initials}
                                    </div>
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="font-ui text-xs font-semibold text-text-primary truncate">
                                    {name}
                                </p>
                                {username ? (
                                    <p className="font-ui text-[10px] text-text-muted truncate">
                                        @{username}
                                    </p>
                                ) : (
                                    <Link
                                        href="/setup"
                                        onClick={close}
                                        className="font-ui text-[10px] text-primary hover:opacity-80 transition-opacity"
                                    >
                                        + claim your @username
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="h-px bg-border/40 mb-1" />

                        {username && (
                            <Link
                                href={`/era/${username}`}
                                onClick={close}
                                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all font-ui text-sm"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                my era page
                            </Link>
                        )}

                        <Link
                            href="/profile"
                            onClick={close}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all font-ui text-sm"
                        >
                            <User className="w-3.5 h-3.5" />
                            my boards
                        </Link>

                        <Link
                            href="/quiz"
                            onClick={close}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all font-ui text-sm"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            new era quiz
                        </Link>

                        <div className="h-px bg-border/40 my-1" />

                        <Link
                            href="/explore"
                            onClick={close}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all font-ui text-sm"
                        >
                            <Compass className="w-3.5 h-3.5" />
                            explore boards
                        </Link>

                        <Link
                            href="/compare"
                            onClick={close}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all font-ui text-sm"
                        >
                            <ArrowLeftRight className="w-3.5 h-3.5" />
                            compare eras
                        </Link>

                        <Link
                            href="/about"
                            onClick={close}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all font-ui text-sm"
                        >
                            <Info className="w-3.5 h-3.5" />
                            about
                        </Link>

                        <div className="h-px bg-border/40 my-1" />

                        <Link
                            href="/profile?tab=settings"
                            onClick={close}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all font-ui text-sm"
                        >
                            <Settings className="w-3.5 h-3.5" />
                            settings
                        </Link>

                        <div className="h-px bg-border/40 my-1" />

                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-muted hover:text-warm hover:bg-warm/5 transition-all font-ui text-sm"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            sign out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}