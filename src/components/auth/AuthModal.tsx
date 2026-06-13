"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { GoogleSignInButton } from "./GoogleSignInButton";

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    redirectTo?: string;
    reason?: "save" | "share" | "required";
}

const REASONS = {
    save: {
        title: "save your era ✦",
        desc: "sign in to save your moodboard to your profile and get a shareable /era page.",
    },
    share: {
        title: "claim your era page",
        desc: "sign in to get your own /era/username link to share everywhere.",
    },
    required: {
        title: "sign in first 🌙",
        desc: "you need to be signed in to access this page.",
    },
};

export function AuthModal({
    open,
    onClose,
    redirectTo = "/",
    reason = "save",
}: AuthModalProps) {
    const content = REASONS[reason];

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.34, 1.1, 0.64, 1] }}
                        className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm px-4"
                    >
                        <div className="relative rounded-3xl glass border border-border/40 p-8">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Icon */}
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-purple mb-5">
                                <Sparkles className="w-6 h-6 text-black" />
                            </div>

                            {/* Content */}
                            <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
                                {content.title}
                            </h2>
                            <p className="font-body text-text-secondary text-sm leading-relaxed mb-6">
                                {content.desc}
                            </p>

                            {/* Google button */}
                            <GoogleSignInButton redirectTo={redirectTo} />

                            {/* Fine print */}
                            <p className="mt-4 text-center font-ui text-[11px] text-text-muted">
                                no passwords. no spam. just your google account. ✦
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}