"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ColorPaletteProps {
    colors: string[];
}

export function ColorPalette({ colors }: ColorPaletteProps) {
    const [copied, setCopied] = useState<string | null>(null);

    function handleCopy(hex: string) {
        navigator.clipboard.writeText(hex);
        setCopied(hex);
        setTimeout(() => setCopied(null), 1500);
    }

    return (
        <div className="flex gap-2 items-center">
            {colors.map((color, i) => (
                <motion.button
                    key={i}
                    onClick={() => handleCopy(color)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.07, duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
                    whileHover={{ scale: 1.2, y: -4 }}
                    title={copied === color ? "copied!" : color}
                    className="relative group"
                >
                    <div
                        className="w-8 h-8 rounded-full border-2 border-white/10 shadow-lg"
                        style={{ backgroundColor: color }}
                    />
                    {copied === color && (
                        <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-surface-elevated border border-border/40 text-[10px] font-ui text-text-secondary whitespace-nowrap"
                        >
                            copied!
                        </motion.div>
                    )}
                </motion.button>
            ))}
        </div>
    );
}