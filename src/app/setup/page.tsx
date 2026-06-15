"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, Check, X, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { GlowBackground } from "@/components/shared/GlowBackground";
import { BlurIn } from "@/components/shared/Animations";

type UsernameStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export default function SetupPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [status, setStatus] = useState<UsernameStatus>("idle");
    const [statusMsg, setStatusMsg] = useState("");
    const [saving, setSaving] = useState(false);

    // Pre-fill display name from Google
    useEffect(() => {
        if (user?.user_metadata?.full_name) {
            setDisplayName(user.user_metadata.full_name);
        }
    }, [user]);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) router.push("/");
    }, [user, loading, router]);

    const checkUsername = useCallback(async (value: string) => {
        if (!value || value.length < 3) {
            setStatus("idle");
            return;
        }
        setStatus("checking");

        try {
            const res = await fetch(`/api/check-username?username=${encodeURIComponent(value)}`);
            const data = await res.json();

            if (data.error) {
                setStatus("invalid");
                setStatusMsg(data.error);
            } else if (data.available) {
                setStatus("available");
                setStatusMsg("looks good ✦");
            } else {
                setStatus("taken");
                setStatusMsg("already taken — try another");
            }
        } catch {
            setStatus("idle");
        }
    }, []);

    // Debounce username check
    useEffect(() => {
        if (!username) { setStatus("idle"); return; }
        const timer = setTimeout(() => checkUsername(username), 500);
        return () => clearTimeout(timer);
    }, [username, checkUsername]);

    async function handleSubmit() {
        if (status !== "available" || saving) return;
        setSaving(true);

        try {
            const res = await fetch("/api/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, display_name: displayName }),
            });

            const data = await res.json();

            if (data.success) {
                // Redirect to their new era page
                router.push(`/era/${data.username}`);
            } else {
                setStatus("taken");
                setStatusMsg(data.error ?? "Something went wrong");
                setSaving(false);
            }
        } catch {
            setSaving(false);
        }
    }

    const statusColors: Record<UsernameStatus, string> = {
        idle: "#5a5470",
        checking: "#a09ab8",
        available: "#86efac",
        taken: "#fda4af",
        invalid: "#fda4af",
    };

    const StatusIcon = () => {
        if (status === "checking") return <Loader2 className="w-4 h-4 animate-spin" style={{ color: statusColors.checking }} />;
        if (status === "available") return <Check className="w-4 h-4" style={{ color: statusColors.available }} />;
        if (status === "taken" || status === "invalid") return <X className="w-4 h-4" style={{ color: statusColors.taken }} />;
        return null;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <>
            <GlowBackground />
            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
                <BlurIn className="w-full max-w-md">

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-strong">
                            <Sparkles className="w-7 h-7 text-black" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
                            claim your era page
                        </h1>
                        <p className="font-body text-text-secondary text-sm leading-relaxed">
                            pick a username for your shareable{" "}
                            <span className="text-primary font-medium">eraboard.vercel.app/era/you</span> page.
                            this is where all your eras live.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">

                        {/* Display name */}
                        <div>
                            <label className="font-ui text-xs text-text-muted uppercase tracking-widest mb-2 block">
                                display name
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="how you want to appear"
                                maxLength={40}
                                className="w-full px-4 py-3.5 rounded-2xl bg-surface-elevated border border-border/60 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:bg-surface transition-all"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="font-ui text-xs text-text-muted uppercase tracking-widest mb-2 block">
                                username
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 font-ui text-sm text-text-muted pointer-events-none">
                                    @
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                                    placeholder="yourusername"
                                    maxLength={24}
                                    className="w-full pl-8 pr-12 py-3.5 rounded-2xl bg-surface-elevated border border-border/60 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:bg-surface transition-all"
                                    style={{
                                        borderColor: status === "available"
                                            ? "rgba(134,239,172,0.4)"
                                            : status === "taken" || status === "invalid"
                                                ? "rgba(253,164,175,0.4)"
                                                : undefined,
                                    }}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <StatusIcon />
                                </div>
                            </div>

                            {/* Status message */}
                            <AnimatePresence mode="wait">
                                {statusMsg && status !== "idle" && (
                                    <motion.p
                                        key={statusMsg}
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-2 font-ui text-xs"
                                        style={{ color: statusColors[status] }}
                                    >
                                        {statusMsg}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            {/* Preview URL */}
                            {username && status === "available" && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-2 font-ui text-xs text-text-muted"
                                >
                                    your page → {process.env.NEXT_PUBLIC_APP_URL}/era/{username}
                                </motion.p>
                            )}
                        </div>

                        {/* Submit */}
                        <motion.button
                            onClick={handleSubmit}
                            disabled={status !== "available" || saving}
                            whileHover={{ scale: status === "available" ? 1.02 : 1 }}
                            whileTap={{ scale: status === "available" ? 0.98 : 1 }}
                            className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-ui font-bold text-sm mt-2 disabled:opacity-40 disabled:cursor-not-allowed glow-strong hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <><Loader2 className="w-4 h-4 animate-spin" />setting up your era...</>
                            ) : (
                                <>claim my era page ✦</>
                            )}
                        </motion.button>

                        {/* Skip */}
                        <button
                            onClick={() => router.push("/")}
                            className="w-full text-center font-ui text-xs text-text-muted hover:text-text-secondary transition-colors py-2"
                        >
                            skip for now (you can set this in profile later)
                        </button>
                    </div>
                </BlurIn>
            </main>
        </>
    );
}