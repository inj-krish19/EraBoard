"use client";

import { motion } from "framer-motion";

interface MoodGridProps {
    images: string[];
}

export function MoodGrid({ images }: MoodGridProps) {
    const displayed = images.slice(0, 9);

    return (
        <div className="grid grid-cols-3 gap-1.5 rounded-2xl overflow-hidden">
            {displayed.map((img, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.1 + i * 0.06,
                        duration: 0.5,
                        ease: [0.34, 1.1, 0.64, 1],
                    }}
                    className="aspect-square overflow-hidden"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>
            ))}
        </div>
    );
}