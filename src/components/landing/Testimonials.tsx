"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/shared/Animations";

const TESTIMONIALS = [
    {
        handle: "@sofiavibes__",
        text: "bestie i took this 3 times because my era keeps shifting and it's accurate EVERY time 😭✨",
        aesthetic: "dark academia girlie",
        color: "#c084fc",
    },
    {
        handle: "@lunaaesthetic",
        text: "the color palette it gave me is now literally my whole instagram grid theme. no notes.",
        aesthetic: "soft girl era",
        color: "#f0abfc",
    },
    {
        handle: "@zara.not.the.store",
        text: "i sent my era card to my whole friend group and now we're all obsessed. this is so fun omg",
        aesthetic: "coastal granddaughter",
        color: "#67e8f9",
    },
    {
        handle: "@etherealgirlclub",
        text: "the one-liner bio it wrote for me is going in my twitter bio forever. scary accurate lol",
        aesthetic: "cottagecore villain",
        color: "#86efac",
    },
    {
        handle: "@moodboardmaven",
        text: "i've been trying to articulate my vibe for months and this quiz did it in 60 seconds. crying",
        aesthetic: "indie sleaze",
        color: "#fda4af",
    },
    {
        handle: "@aestheticmindset",
        text: "took it with my situationship and our results said we're in completely diff eras. explains everything.",
        aesthetic: "villain era 🖤",
        color: "#fde68a",
    },
];

/* Infinite marquee row */
function MarqueeRow({
    items,
    reverse = false,
}: {
    items: typeof TESTIMONIALS;
    reverse?: boolean;
}) {
    const doubled = [...items, ...items];

    return (
        <div className="overflow-hidden py-2">
            <motion.div
                animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
                transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex gap-4 w-max"
            >
                {doubled.map((t, i) => (
                    <div
                        key={i}
                        className="w-72 flex-shrink-0 p-4 rounded-2xl glass border border-border/30"
                    >
                        <p className="font-body text-text-secondary text-sm leading-relaxed mb-3">
                            "{t.text}"
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="font-ui text-xs text-text-muted">{t.handle}</span>
                            <span
                                className="font-ui text-[10px] px-2 py-0.5 rounded-full"
                                style={{
                                    color: t.color,
                                    background: `${t.color}15`,
                                    border: `1px solid ${t.color}25`,
                                }}
                            >
                                {t.aesthetic}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export function Testimonials() {
    const row1 = TESTIMONIALS.slice(0, 3);
    const row2 = TESTIMONIALS.slice(3);

    return (
        <section className="py-24 overflow-hidden">
            <FadeUp className="text-center mb-12 px-6">
                <span className="font-ui text-xs text-warm uppercase tracking-[0.2em] mb-4 block">
                    the girlies are talking
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary">
                    girls are{" "}
                    <span className="gradient-text">obsessed</span>
                </h2>
            </FadeUp>

            <div className="space-y-4">
                <MarqueeRow items={row1} />
                <MarqueeRow items={row2} reverse />
            </div>
        </section>
    );
}