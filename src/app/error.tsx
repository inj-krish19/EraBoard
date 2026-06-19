// src/app/error.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap } from "lucide-react";
import { GlowBackground } from "@/components/shared/GlowBackground";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <GlowBackground />
                <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/15 flex items-center justify-center mb-6 mx-auto">
                            <Zap className="w-8 h-8 text-purple-400" />
                        </div>
                        <h1
                            className="text-3xl sm:text-4xl font-bold text-white mb-3"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Something went{" "}
                            <span className="gradient-text">off-script</span>
                        </h1>
                        <p className="text-white/50 text-base max-w-sm mx-auto mb-8">
                            The universe glitched for a second. Let&apos;s try that again.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={reset}
                                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                            >
                                Try again
                            </button>
                            <Link
                                href="/"
                                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-semibold text-sm hover:bg-white/10 transition-colors"
                            >
                                Go home
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </body>
        </html>
    );
}