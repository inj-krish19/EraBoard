"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface QuizOptionProps {
    id: string;
    label: string;
    image: string;
    selected: boolean;
    onSelect: () => void;
    index: number;
}

export function QuizOption({
    label,
    image,
    selected,
    onSelect,
    index,
}: QuizOptionProps) {
    return (
        <motion.button
            onClick={onSelect}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 cursor-pointer group
        ${selected
                    ? "border-primary shadow-[0_0_30px_rgba(192,132,252,0.4)]"
                    : "border-border/30 hover:border-primary/40"
                }`}
        >
            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={image}
                alt={label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div
                className={`absolute inset-0 transition-all duration-200
          ${selected
                        ? "bg-primary/20"
                        : "bg-black/30 group-hover:bg-black/20"
                    }`}
            />

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-ui text-xs text-white font-medium leading-tight">
                    {label}
                </p>
            </div>

            {/* Selected checkmark */}
            {selected && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2, ease: [0.34, 1.3, 0.64, 1] }}
                    className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                    <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                </motion.div>
            )}
        </motion.button>
    );
}