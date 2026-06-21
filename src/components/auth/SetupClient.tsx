// src/components/auth/SetupClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import AvatarSelector from "@/components/shared/AvatarSelector";
import { AvatarType, resolveAvatar } from "@/lib/avatars";
import Image from "next/image";

interface SetupClientProps {
    googleAvatarUrl: string | null;
}

export default function SetupClient({ googleAvatarUrl }: SetupClientProps) {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);

    // Step 1
    const [username, setUsername] = useState("");
    const [usernameStatus, setUsernameStatus] = useState<
        "idle" | "checking" | "available" | "taken" | "invalid"
    >("idle");
    const [checkTimer, setCheckTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    // Step 2
    const [avatarType, setAvatarType] = useState<AvatarType | null>(null);

    // Submit
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // ── Username check ──────────────────────────────────────────────────────────
    function handleUsernameChange(val: string) {
        const cleaned = val.toLowerCase().replace(/[^a-z0-9_]/g, "");
        setUsername(cleaned);
        setUsernameStatus("idle");

        if (checkTimer) clearTimeout(checkTimer);
        if (cleaned.length < 2) return;
        if (!/^[a-z0-9_]{2,30}$/.test(cleaned)) {
            setUsernameStatus("invalid");
            return;
        }

        setUsernameStatus("checking");
        const t = setTimeout(async () => {
            const res = await fetch(`/api/check-username?username=${cleaned}`);
            const data = await res.json();
            setUsernameStatus(data.available ? "available" : "taken");
        }, 500);
        setCheckTimer(t);
    }

    // ── Step 1 → 2 ─────────────────────────────────────────────────────────────
    function handleNextStep() {
        if (usernameStatus !== "available") return;
        setStep(2);
    }

    // ── Final submit ────────────────────────────────────────────────────────────
    async function handleSubmit() {
        setSaving(true);
        setError("");

        const res = await fetch("/api/update-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                avatar_type: avatarType,
            }),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error || "Something went wrong.");
            setSaving(false);
            return;
        }

        router.push(`/era/${username}`);
    }

    const resolvedAvatar = resolveAvatar(avatarType, googleAvatarUrl);

    return (
        <div className="w-full max-w-md">
            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-8">
                {[1, 2].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-ui font-semibold transition-all ${step === s
                                ? "bg-primary text-black"
                                : s < step
                                    ? "bg-primary/30 text-primary"
                                    : "bg-surface-elevated text-text-muted border border-border/30"
                                }`}
                        >
                            {s < step ? <Check className="w-3 h-3" /> : s}
                        </div>
                        {s < 2 && (
                            <div
                                className={`w-8 h-px transition-all ${step > s ? "bg-primary/40" : "bg-border/30"
                                    }`}
                            />
                        )}
                    </div>
                ))}
                <span className="ml-2 font-ui text-xs text-text-muted">
                    {step === 1 ? "Claim your username" : "Pick your avatar"}
                </span>
            </div>

            <AnimatePresence mode="wait">
                {/* ── Step 1: Username ── */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                    >
                        <h1
                            className="text-3xl font-bold text-white mb-2"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Claim your{" "}
                            <span className="gradient-text">era</span>
                        </h1>
                        <p className="text-text-muted text-sm mb-8">
                            This becomes your public page at{" "}
                            <span className="text-text-secondary">eraboard.app/era/</span>
                            <span className="text-primary">{username || "username"}</span>
                        </p>

                        <div className="space-y-4">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-ui text-sm">
                                    @
                                </span>
                                <input
                                    type="text"
                                    placeholder="yourname"
                                    value={username}
                                    onChange={(e) => handleUsernameChange(e.target.value)}
                                    maxLength={30}
                                    className="w-full bg-white/5 border border-border/30 rounded-2xl pl-8 pr-12 py-3.5 text-white placeholder-text-muted font-ui text-sm focus:outline-none focus:border-primary/50 transition-all"
                                />
                                {/* Status icon */}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    {usernameStatus === "checking" && (
                                        <Loader2 className="w-4 h-4 text-text-muted animate-spin" />
                                    )}
                                    {usernameStatus === "available" && (
                                        <Check className="w-4 h-4 text-green-400" />
                                    )}
                                    {(usernameStatus === "taken" || usernameStatus === "invalid") && (
                                        <span className="text-red-400 text-xs font-ui">✕</span>
                                    )}
                                </div>
                            </div>

                            {/* Status message */}
                            <AnimatePresence>
                                {usernameStatus === "taken" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="font-ui text-xs text-red-400"
                                    >
                                        That username is taken.
                                    </motion.p>
                                )}
                                {usernameStatus === "invalid" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="font-ui text-xs text-red-400"
                                    >
                                        Lowercase letters, numbers, underscores only.
                                    </motion.p>
                                )}
                                {usernameStatus === "available" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="font-ui text-xs text-green-400"
                                    >
                                        @{username} is available ✦
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={handleNextStep}
                                disabled={usernameStatus !== "available"}
                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-ui font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* ── Step 2: Avatar ── */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            {/* Live preview */}
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/30 flex-shrink-0">
                                {resolvedAvatar ? (
                                    <Image
                                        src={resolvedAvatar}
                                        alt="Your avatar"
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black text-xl font-bold">
                                        {username.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h2
                                    className="text-2xl font-bold text-white"
                                    style={{ fontFamily: "var(--font-playfair)" }}
                                >
                                    Your face,{" "}
                                    <span className="gradient-text">your era</span>
                                </h2>
                                <p className="text-text-muted text-xs mt-0.5">
                                    You can change this anytime in settings.
                                </p>
                            </div>
                        </div>

                        <AvatarSelector
                            selected={avatarType}
                            onChange={setAvatarType}
                            googleAvatarUrl={googleAvatarUrl}
                            showGoogleOption={!!googleAvatarUrl}
                        />

                        {error && (
                            <p className="mt-4 font-ui text-xs text-red-400">{error}</p>
                        )}

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setStep(1)}
                                className="px-5 py-3 rounded-2xl bg-white/5 border border-border/30 text-text-muted font-ui text-sm hover:bg-white/10 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-ui font-semibold text-sm disabled:opacity-50 hover:opacity-90 transition-opacity"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Setting up…
                                    </>
                                ) : (
                                    <>
                                        Enter my era
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}