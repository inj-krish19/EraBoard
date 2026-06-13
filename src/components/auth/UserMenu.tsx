"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";

export function UserMenu() {
    const { user, signOut } = useAuth();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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

    const avatar = user.user_metadata?.avatar_url as string | undefined;
    const name = (user.user_metadata?.full_name as string | undefined) ?? "your era";
    const initials = name.charAt(0).toUpperCase();

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 group"
            >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-colors">
                    {avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={avatar} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black text-xs font-ui font-bold">
                            {initials}
                        </div>
                    )}
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute right-0 top-11 w-52 rounded-2xl glass border border-border/40 p-2 z-50"
                    >
                        <div className="px-3 py-2 mb-1">
                            <p className="font-ui text-xs font-semibold text-text-primary truncate">{name}</p>
                            <p className="font-ui text-[10px] text-text-muted truncate">{user.email}</p>
                        </div>

                        <div className="h-px bg-border/40 mb-1" />

                        <Link
                            href="/profile"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all font-ui text-sm"
                        >
                            <User className="w-3.5 h-3.5" /> my boards
                        </Link>

                        <Link
                            href="/quiz"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all font-ui text-sm"
                        >
                            <Sparkles className="w-3.5 h-3.5" /> new era quiz
                        </Link>

                        <div className="h-px bg-border/40 my-1" />

                        <button
                            onClick={() => { setOpen(false); signOut(); }}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-text-muted hover:text-warm hover:bg-warm/5 transition-all font-ui text-sm"
                        >
                            <LogOut className="w-3.5 h-3.5" /> sign out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}