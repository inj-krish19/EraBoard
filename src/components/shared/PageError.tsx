"use client"; import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { type LucideIcon, AlertTriangle } from "lucide-react";

interface PageErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
    icon?: LucideIcon;
    title?: string;
    description?: string;
}

export default function PageError({
    error,
    reset,
    icon: Icon = AlertTriangle,
    title = "Something went wrong",
    description = "An unexpected error occurred. Please try again.",
}: PageErrorProps) {
    useEffect(() => { console.error(error); }, [error]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center mb-5 mx-auto">
                    <Icon className="w-7 h-7 text-purple-400" />
                </div>
                <h2
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    {title}
                </h2>
                <p className="text-white/50 text-sm max-w-sm mx-auto mb-6">{description}</p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-semibold text-sm hover:bg-white/10 transition-colors"
                    >
                        Go home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
