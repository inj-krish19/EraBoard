// src/components/explore/AestheticFilter.tsx
"use client";

import { motion } from "framer-motion";

const AESTHETICS = [
    { label: "All Eras", value: "all" },
    { label: "Cottagecore", value: "Cottagecore" },
    { label: "Dark Academia", value: "Dark Academia" },
    { label: "Y2K", value: "Y2K" },
    { label: "Soft Girl", value: "Soft Girl" },
    { label: "Grunge", value: "Grunge" },
    { label: "Coastal Grandmother", value: "Coastal Grandmother" },
    { label: "Ethereal", value: "Ethereal" },
    { label: "Vintage", value: "Vintage" },
    { label: "Minimalist", value: "Minimalist" },
    { label: "Maximalist", value: "Maximalist" },
    { label: "Coquette", value: "Coquette" },
    { label: "Indie", value: "Indie" },
    { label: "Goth", value: "Goth" },
];

interface AestheticFilterProps {
    selected: string;
    onChange: (value: string) => void;
}

export default function AestheticFilter({
    selected,
    onChange,
}: AestheticFilterProps) {
    return (
        <div className="relative">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {AESTHETICS.map((a, i) => {
                    const isSelected = selected === a.value;
                    return (
                        <motion.button
                            key={a.value}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => onChange(a.value)}
                            className={`
                relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 whitespace-nowrap
                ${isSelected
                                    ? "text-white"
                                    : "text-white/50 hover:text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                                }
              `}
                        >
                            {isSelected && (
                                <motion.div
                                    layoutId="activeAesthetic"
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                                    style={{ zIndex: -1 }}
                                />
                            )}
                            {a.label}
                        </motion.button>
                    );
                })}
            </div>
            {/* fade edges */}
            <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
        </div>
    );
}