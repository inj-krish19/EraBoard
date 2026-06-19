// src/app/quiz/error.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function QuizError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => { console.error(error); }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center mb-5 mx-auto">
                    <RefreshCw className="w-7 h-7 text-purple-400" />
                </div>
                <h2
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    The quiz hit a snag
                </h2>
                <p className="text-white/50 text-sm max-w-xs mx-auto mb-6">
                    Your answers are safe. Click retry to pick up where you left off.
                </p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                        Retry
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-semibold text-sm hover:bg-white/10 transition-colors"
                    >
                        Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}