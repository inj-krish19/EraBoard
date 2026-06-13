"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

/* ─── BlurIn ─── */
interface BlurInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export function BlurIn({
    children,
    delay = 0,
    duration = 0.6,
    className,
    once = true,
}: BlurInProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ─── SplitText — word-by-word stagger ─── */
interface SplitTextProps {
    text: string;
    className?: string;
    wordClassName?: string;
    delay?: number;
    stagger?: number;
    once?: boolean;
}

export function SplitText({
    text,
    className,
    wordClassName,
    delay = 0,
    stagger = 0.07,
    once = true,
}: SplitTextProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once });
    const words = text.split(" ");

    const container: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: stagger, delayChildren: delay },
        },
    };

    const word: Variants = {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] },
        },
    };

    return (
        <motion.span
            ref={ref}
            className={className}
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {words.map((w, i) => (
                <motion.span
                    key={i}
                    variants={word}
                    className={`inline-block mr-[0.25em] ${wordClassName ?? ""}`}
                >
                    {w}
                </motion.span>
            ))}
        </motion.span>
    );
}

/* ─── FadeUp — generic scroll-triggered fade ─── */
interface FadeUpProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    once?: boolean;
}

export function FadeUp({ children, delay = 0, className, once = true }: FadeUpProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ─── ScaleIn — for cards / images ─── */
interface ScaleInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export function ScaleIn({ children, delay = 0, className }: ScaleInProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.34, 1.2, 0.64, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}