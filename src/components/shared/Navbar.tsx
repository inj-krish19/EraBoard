"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { UserMenu } from "@/components/auth/UserMenu";
import { AuthModal } from "@/components/auth/AuthModal";

export function Navbar() {
    const { scrollY } = useScroll();
    const bg = useTransform(
        scrollY,
        [0, 80],
        ["rgba(10,10,15,0)", "rgba(10,10,15,0.88)"]
    );
    const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(20px)"]);

    const { user, loading } = useAuth();
    const [showAuth, setShowAuth] = useState(false);

    return (
        <>
            <motion.header
                style={{ backgroundColor: bg, backdropFilter: blur }}
                className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between">

                    {/* ── Logo ── */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-purple">
                            <Sparkles className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-display text-lg font-semibold text-text-primary tracking-tight">
                            EraBoard
                        </span>
                    </Link>

                    {/* ── Right side ── */}
                    <div className="flex items-center gap-3 h-9">

                        {/* Loading skeleton — same size as the buttons so layout never shifts */}
                        {loading && (
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:block w-14 h-4 rounded-full bg-white/5 animate-pulse" />
                                <div className="w-28 h-9 rounded-full bg-white/5 animate-pulse" />
                            </div>
                        )}

                        {/* Logged in */}
                        {!loading && user && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <UserMenu />
                            </motion.div>
                        )}

                        {/* Logged out */}
                        {!loading && !user && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.25 }}
                                className="flex items-center gap-3"
                            >
                                <button
                                    onClick={() => setShowAuth(true)}
                                    className="hidden sm:block font-ui text-sm text-text-muted hover:text-text-secondary transition-colors"
                                >
                                    sign in
                                </button>
                                <Link
                                    href="/quiz"
                                    className="font-ui text-sm px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 hover:border-primary/40 transition-all duration-200 whitespace-nowrap"
                                >
                                    find my era ✦
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.header>

            <AuthModal
                open={showAuth}
                onClose={() => setShowAuth(false)}
                redirectTo="/"
                reason="save"
            />
        </>
    );
}