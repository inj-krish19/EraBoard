"use client";

import Image from "next/image";
import { forwardRef } from "react";

interface EraCardProps {
    aestheticName: string;
    eraName: string;
    bio: string;
    affirmation: string;
    eraMonth: string;
    colors: string[];
    images: string[];
    tags: string[];
}

// forwardRef so parent can pass ref for html-to-image export
export const EraCard = forwardRef<HTMLDivElement, EraCardProps>(
    ({ aestheticName, eraName, bio, affirmation, eraMonth, colors, images, tags }, ref) => {
        const heroImage = images[0];
        const gridImages = images.slice(1, 5);
        const primaryColor = colors[0] ?? "#c084fc";
        const accentColor = colors[2] ?? "#67e8f9";

        return (
            <div
                ref={ref}
                className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden"
                style={{ background: "#0a0a0f", fontFamily: "sans-serif" }}
            >
                {/* Hero image */}
                <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={heroImage}
                        alt=""
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to bottom, transparent 30%, #0a0a0f 100%)`,
                        }}
                    />
                    {/* Aesthetic badge */}
                    <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                            background: `${primaryColor}20`,
                            border: `1px solid ${primaryColor}40`,
                            color: primaryColor,
                        }}
                    >
                        {aestheticName}
                    </div>
                    {/* Logo */}
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                        <Image src="/icon.svg" width={12} height={12} alt="EraBoard" style={{ color: primaryColor }} />
                        <span className="text-[10px] text-white/60 font-semibold">EraBoard</span>
                    </div>
                </div>

                {/* Content */}
                <div className="px-5 pb-5 -mt-2">
                    {/* Era name */}
                    <h2
                        className="text-xl font-bold leading-tight mb-1"
                        style={{
                            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        {eraName}
                    </h2>

                    {/* Era month */}
                    <p className="text-[11px] mb-3" style={{ color: "#5a5470" }}>
                        {eraMonth}
                    </p>

                    {/* Bio */}
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "#a09ab8" }}>
                        {bio}
                    </p>

                    {/* Mini image grid */}
                    <div className="grid grid-cols-4 gap-1 rounded-xl overflow-hidden mb-3">
                        {gridImages.map((img, i) => (
                            <div key={i} className="aspect-square overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    crossOrigin="anonymous"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Color palette */}
                    <div className="flex gap-1.5 mb-3">
                        {colors.map((c, i) => (
                            <div
                                key={i}
                                className="w-5 h-5 rounded-full"
                                style={{ backgroundColor: c, border: "1.5px solid rgba(255,255,255,0.1)" }}
                            />
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {tags.slice(0, 4).map((tag, i) => (
                            <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-full"
                                style={{
                                    color: primaryColor,
                                    background: `${primaryColor}12`,
                                    border: `1px solid ${primaryColor}25`,
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Affirmation */}
                    <p
                        className="text-[11px] italic text-center pt-3"
                        style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            color: "#5a5470",
                        }}
                    >
                        ✦ {affirmation}
                    </p>
                </div>
            </div>
        );
    }
);

EraCard.displayName = "EraCard";