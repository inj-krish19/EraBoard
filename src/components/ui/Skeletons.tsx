"use client";

import { motion } from "framer-motion";

function Shimmer({ className }: { className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-surface-elevated rounded-lg ${className}`}>
            <motion.div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, rgba(192,132,252,0.06) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% center", "-200% center"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}

export function BoardCardSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden border border-border/30 glass">
            <Shimmer className="h-40 w-full rounded-none" />
            <div className="p-4 space-y-3">
                <Shimmer className="h-5 w-3/4" />
                <Shimmer className="h-3 w-1/3" />
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-2/3" />
                <div className="flex gap-1.5 pt-1">
                    {[...Array(5)].map((_, i) => (
                        <Shimmer key={i} className="w-4 h-4 rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function BoardGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(count)].map((_, i) => (
                <BoardCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function ResultSkeleton() {
    return (
        <div className="max-w-5xl mx-auto pt-24 pb-20 px-4">
            {/* Header */}
            <div className="text-center mb-12 space-y-4">
                <Shimmer className="h-6 w-48 rounded-full mx-auto" />
                <Shimmer className="h-16 w-3/4 mx-auto" />
                <Shimmer className="h-5 w-1/2 mx-auto" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Moodboard skeleton */}
                <div className="grid grid-cols-3 gap-1.5">
                    {[...Array(9)].map((_, i) => (
                        <Shimmer key={i} className="aspect-square rounded-xl" />
                    ))}
                </div>

                {/* Details skeleton */}
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="p-5 rounded-2xl glass border border-border/30 space-y-2">
                            <Shimmer className="h-3 w-1/4" />
                            <Shimmer className="h-5 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function ProfileSkeleton() {
    return (
        <div className="max-w-4xl mx-auto pt-24 pb-20 px-4">
            {/* Header */}
            <div className="flex items-center gap-5 mb-10">
                <Shimmer className="w-20 h-20 rounded-full flex-shrink-0" />
                <div className="space-y-2 flex-1">
                    <Shimmer className="h-8 w-1/3" />
                    <Shimmer className="h-4 w-1/4" />
                    <Shimmer className="h-3 w-1/5" />
                </div>
            </div>
            <BoardGridSkeleton count={6} />
        </div>
    );
}

export function EraProfileSkeleton() {
    return (
        <div className="max-w-4xl mx-auto pt-24 pb-20 px-4">
            {/* Profile header */}
            <div className="text-center mb-14 space-y-4">
                <Shimmer className="w-20 h-20 rounded-full mx-auto" />
                <Shimmer className="h-10 w-1/3 mx-auto" />
                <Shimmer className="h-4 w-1/4 mx-auto" />
                <Shimmer className="h-8 w-48 rounded-full mx-auto" />
            </div>
            <BoardGridSkeleton count={3} />
        </div>
    );
}