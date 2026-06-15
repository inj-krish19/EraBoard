"use client";

import { motion } from "framer-motion";

interface QuizProgressProps {
    current: number;
    total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
    const percent = (current / total) * 100;

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-2">
                <span className="font-ui text-xs text-text-muted uppercase tracking-widest">
                    question {current + 1} of {total}
                </span>
                <span className="font-ui text-xs text-primary">
                    {Math.round(percent)}%
                </span>
            </div>

            {/* Track */}
            <div className="h-1 w-full bg-border/40 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                />
            </div>

            {/* Dots */}
            <div className="flex justify-between mt-2">
                {Array.from({ length: total }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={`w-1 h-1 rounded-full transition-colors duration-300 ${i <= current ? "bg-primary" : "bg-border/40"
                            }`}
                        animate={{ scale: i === current ? 1.5 : 1 }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>
        </div>
    );
}